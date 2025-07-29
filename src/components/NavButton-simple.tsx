import React, { useState } from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
  disabled?: boolean;
}

const NavButtonSimple: React.FC<NavButtonProps> = ({
  children,
  onClick,
  className = '',
  'aria-label': ariaLabel,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`
        relative inline-block px-6 py-3 font-handwriting text-lg
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className.includes('bg-ink') ? 'bg-ink text-paper' : (isHovered && !disabled ? 'bg-ink text-paper' : 'bg-transparent text-ink')}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
      disabled={disabled}
      style={{
        border: '3px solid #000',
        borderRadius: '0',
        // Hand-drawn style border using CSS
        clipPath: isHovered 
          ? 'polygon(2% 0%, 98% 1%, 99% 99%, 1% 98%)' 
          : 'polygon(1% 2%, 99% 0%, 98% 98%, 0% 99%)'
      }}
    >
      {children}
    </button>
  );
};

export default NavButtonSimple;