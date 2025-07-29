import React, { useState, useEffect } from 'react';
import NavButtonSimple from './NavButton-simple';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-paper border-4 border-black p-8 max-w-md w-full mx-4 shadow-2xl animate-modal-in"
           style={{ clipPath: 'polygon(2% 0%, 98% 1%, 99% 99%, 1% 98%)' }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>
        
        {/* Title */}
        <h2 className="text-2xl font-logo mb-6 text-center">
          {title}
        </h2>
        
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

// Waitlist Modal
export const WaitlistModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Waitlist signup:', { email, name });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setName('');
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <SimpleModal isOpen={isOpen} onClose={onClose} title="Success!">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <p className="text-lg">Thanks! We'll notify you when Draw2Dev launches.</p>
        </div>
      </SimpleModal>
    );
  }

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title="Join the Waitlist">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-handwriting mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border-2 border-black bg-paper font-handwriting focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="your@email.com"
            style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 98%, 0% 100%)' }}
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-handwriting mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black bg-paper font-handwriting focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your name"
            style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 98%, 0% 100%)' }}
          />
        </div>
        
        <div className="pt-4">
          <NavButtonSimple 
            type="submit" 
            className="w-full bg-ink text-paper justify-center"
            disabled={!email}
          >
            Join Waitlist
          </NavButtonSimple>
        </div>
      </form>
    </SimpleModal>
  );
};

// Contact Modal
export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <SimpleModal isOpen={isOpen} onClose={onClose} title="Message Sent!">
        <div className="text-center space-y-4">
          <div className="text-6xl">📧</div>
          <p className="text-lg">Message sent! We'll get back to you soon.</p>
        </div>
      </SimpleModal>
    );
  }

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title="Contact Us">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-handwriting mb-2">
            Name *
          </label>
          <input
            type="text"
            id="contact-name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="w-full px-3 py-2 border-2 border-black bg-paper font-handwriting focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your name"
            style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 98%, 0% 100%)' }}
          />
        </div>
        
        <div>
          <label htmlFor="contact-email" className="block text-sm font-handwriting mb-2">
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="w-full px-3 py-2 border-2 border-black bg-paper font-handwriting focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="your@email.com"
            style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 98%, 0% 100%)' }}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-handwriting mb-2">
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
            rows={4}
            className="w-full px-3 py-2 border-2 border-black bg-paper font-handwriting focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Tell us about your project..."
            style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 98%, 0% 100%)' }}
          />
        </div>
        
        <div className="pt-4">
          <NavButtonSimple 
            type="submit" 
            className="w-full bg-ink text-paper justify-center"
            disabled={!formData.name || !formData.email || !formData.message}
          >
            Send Message
          </NavButtonSimple>
        </div>
      </form>
    </SimpleModal>
  );
};