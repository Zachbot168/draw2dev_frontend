import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useSpring, useTransition, animated, config } from '@react-spring/web';
import rough from 'roughjs';
import NavButton from './NavButton';

// TypeScript interfaces
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'waitlist' | 'contact';
  className?: string;
}

interface WaitlistFormData {
  email: string;
  name?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  message?: string;
}

// Form validation utilities
const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return undefined;
};

const validateRequired = (value: string, fieldName: string): string | undefined => {
  if (!value.trim()) return `${fieldName} is required`;
  return undefined;
};

// Close button component with rough.js styling
const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const roughInstance = useMemo(() => {
    if (canvasRef.current) {
      return rough.canvas(canvasRef.current);
    }
    return null;
  }, [canvasRef.current]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rough = roughInstance;
    if (!canvas || !rough) return;

    canvas.width = 32;
    canvas.height = 32;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 32, 32);
    }

    const options = {
      roughness: 1.5,
      strokeWidth: 2,
      stroke: isHovered ? '#666' : '#000',
      seed: 42
    };

    // Draw X shape
    rough.line(8, 8, 24, 24, options);
    rough.line(24, 8, 8, 24, options);
  }, [roughInstance, isHovered]);

  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-opacity duration-200"
      aria-label="Close modal"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        width={32}
        height={32}
      />
    </button>
  );
};

// Form input component with sketch-style borders
const FormInput: React.FC<{
  type: 'text' | 'email' | 'textarea';
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  rows?: number;
}> = ({ type, name, value, onChange, placeholder, required, error, rows = 3 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const roughInstance = useMemo(() => {
    if (canvasRef.current) {
      return rough.canvas(canvasRef.current);
    }
    return null;
  }, [canvasRef.current]);

  const updateDimensions = useCallback(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const newWidth = Math.ceil(rect.width);
      const newHeight = Math.ceil(rect.height);
      
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rough = roughInstance;
    if (!canvas || !rough || dimensions.width === 0 || dimensions.height === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    }

    const options = {
      roughness: 1.5,
      strokeWidth: isFocused ? 2.5 : 2,
      stroke: error ? '#dc2626' : (isFocused ? '#000' : '#666'),
      fill: 'transparent',
      seed: 42
    };

    const padding = 2;
    rough.rectangle(
      padding,
      padding,
      dimensions.width - padding * 2,
      dimensions.height - padding * 2,
      options
    );
  }, [roughInstance, dimensions, isFocused, error]);

  useEffect(() => {
    updateDimensions();
    
    const input = inputRef.current;
    if (!input) return;

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(input);

    return () => resizeObserver.disconnect();
  }, [updateDimensions]);

  const commonProps = {
    ref: inputRef as any,
    name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    placeholder,
    required,
    className: `
      relative z-10 w-full px-3 py-2 bg-transparent border-none outline-none
      font-handwriting text-lg text-ink placeholder-gray-500
      resize-none
    `,
    'aria-describedby': error ? `${name}-error` : undefined,
    'aria-invalid': error ? true : false
  };

  return (
    <div className="relative">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        {type === 'textarea' ? (
          <textarea {...commonProps} rows={rows} />
        ) : (
          <input {...commonProps} type={type} />
        )}
      </div>
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600 font-handwriting"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Waitlist form component
const WaitlistForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<WaitlistFormData>({ email: '', name: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (error) {
      setErrors({ email: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="waitlist-name" className="block text-lg font-handwriting text-ink mb-2">
          Name (optional)
        </label>
        <FormInput
          type="text"
          name="waitlist-name"
          value={formData.name || ''}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Your name"
          error={errors.name}
        />
      </div>

      <div>
        <label htmlFor="waitlist-email" className="block text-lg font-handwriting text-ink mb-2">
          Email *
        </label>
        <FormInput
          type="email"
          name="waitlist-email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          placeholder="your@email.com"
          required
          error={errors.email}
        />
      </div>

      <div className="pt-2">
        <NavButton
          disabled={isSubmitting}
          aria-label={isSubmitting ? 'Joining waitlist...' : 'Join waitlist'}
          className="w-full"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </NavButton>
      </div>
    </form>
  );
};

// Contact form component
const ContactForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    const nameError = validateRequired(formData.name, 'Name');
    const emailError = validateEmail(formData.email);
    const messageError = validateRequired(formData.message, 'Message');

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (messageError) newErrors.message = messageError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (error) {
      setErrors({ message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="block text-lg font-handwriting text-ink mb-2">
          Name *
        </label>
        <FormInput
          type="text"
          name="contact-name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Your name"
          required
          error={errors.name}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-lg font-handwriting text-ink mb-2">
          Email *
        </label>
        <FormInput
          type="email"
          name="contact-email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          placeholder="your@email.com"
          required
          error={errors.email}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-lg font-handwriting text-ink mb-2">
          Message *
        </label>
        <FormInput
          type="textarea"
          name="contact-message"
          value={formData.message}
          onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
          placeholder="Tell us what you're thinking..."
          required
          error={errors.message}
          rows={4}
        />
      </div>

      <div className="pt-2">
        <NavButton
          disabled={isSubmitting}
          aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </NavButton>
      </div>
    </form>
  );
};

// Success message component
const SuccessMessage: React.FC<{ variant: 'waitlist' | 'contact'; onClose: () => void }> = ({ 
  variant, 
  onClose 
}) => {
  const message = variant === 'waitlist' 
    ? "Thanks! We'll notify you when Draw2Dev launches."
    : "Message sent! We'll get back to you soon.";

  return (
    <div className="text-center space-y-6">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-2xl font-logo text-ink mb-4">Success!</h3>
      <p className="text-lg font-handwriting text-ink mb-6">{message}</p>
      <NavButton onClick={onClose} className="mx-auto">
        Close
      </NavButton>
    </div>
  );
};

// Main Modal component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, variant, className = '' }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the modal after animation completes
      setTimeout(() => {
        modalRef.current?.focus();
      }, 350);
    } else {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      setShowSuccess(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  // Backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Success handler
  const handleSuccess = () => {
    setShowSuccess(true);
  };

  // Modal content animation
  const modalSpring = useSpring({
    transform: isOpen ? 'scale(1)' : 'scale(0.8)',
    opacity: isOpen ? 1 : 0,
    config: isOpen ? config.gentle : { ...config.gentle, duration: 200 }
  });

  // Backdrop transition
  const backdropTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle
  });

  const title = variant === 'waitlist' ? 'Join the Waitlist' : 'Get in Touch';

  return backdropTransition(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            aria-hidden="true"
          />
          
          {/* Modal content */}
          <animated.div
            ref={modalRef}
            style={modalSpring}
            className={`
              relative bg-paper paper-texture rounded-lg shadow-2xl 
              w-full max-w-md max-h-[90vh] overflow-y-auto
              p-8 ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            <CloseButton onClose={onClose} />
            
            {!showSuccess ? (
              <>
                <div className="mb-8">
                  <h2 
                    id="modal-title"
                    className="text-3xl font-logo text-ink text-center"
                  >
                    {title}
                  </h2>
                </div>

                {variant === 'waitlist' ? (
                  <WaitlistForm onSuccess={handleSuccess} />
                ) : (
                  <ContactForm onSuccess={handleSuccess} />
                )}
              </>
            ) : (
              <SuccessMessage variant={variant} onClose={onClose} />
            )}
          </animated.div>
        </animated.div>
      )
  );
};

export default Modal;