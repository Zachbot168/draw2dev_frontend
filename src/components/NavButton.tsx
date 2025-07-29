import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
  disabled?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  children,
  onClick,
  className = '',
  'aria-label': ariaLabel,
  disabled = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Memoize rough instance to prevent recreation
  const roughInstance = useMemo(() => {
    if (canvasRef.current) {
      return rough.canvas(canvasRef.current);
    }
    return null;
  }, [canvasRef.current]);

  // Handle canvas resizing
  const updateDimensions = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const newWidth = Math.ceil(rect.width);
      const newHeight = Math.ceil(rect.height);
      
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [dimensions.width, dimensions.height]);

  // Draw rectangle with rough.js
  const drawRectangle = useCallback((rough: RoughCanvas, width: number, height: number, hovered: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
    }

    try {
      const options = {
        roughness: 2,
        strokeWidth: 2,
        fill: hovered ? '#000' : 'transparent',
        stroke: hovered ? '#fff' : '#000',
        fillStyle: 'solid',
        seed: 42 // Consistent seed for stable appearance
      };

      // Draw rectangle with some padding to account for stroke width
      const padding = 2;
      rough.rectangle(
        padding,
        padding,
        width - padding * 2,
        height - padding * 2,
        options
      );
    } catch (error) {
      console.warn('Failed to draw rough rectangle:', error);
    }
  }, []);

  // Update canvas when dimensions or hover state changes
  useEffect(() => {
    if (roughInstance && dimensions.width > 0 && dimensions.height > 0) {
      drawRectangle(roughInstance, dimensions.width, dimensions.height, isHovered);
    }
  }, [roughInstance, dimensions.width, dimensions.height, isHovered, drawRectangle]);

  // Set up canvas dimensions and draw initial rectangle
  useEffect(() => {
    updateDimensions();

    const canvas = canvasRef.current;
    if (canvas && dimensions.width > 0 && dimensions.height > 0) {
      // Set canvas size to match button dimensions
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;
    }
  }, [dimensions.width, dimensions.height, updateDimensions]);

  // Handle resize observer for responsive design
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(button);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  // Handle mouse events
  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
    }
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled && onClick) {
        onClick();
      }
    }
  }, [disabled, onClick]);

  const handleClick = useCallback((_event: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <button
      ref={buttonRef}
      className={`
        relative inline-block transition-colors duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={0}
      role="button"
    >
      {/* Canvas for rough.js background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%'
        }}
        aria-hidden="true"
      />
      
      {/* Button content */}
      <span
        className={`
          relative z-10 px-4 py-2 block transition-colors duration-200 ease-out
          ${isHovered && !disabled ? 'text-white' : 'text-black'}
        `}
      >
        {children}
      </span>
    </button>
  );
};

export default NavButton;