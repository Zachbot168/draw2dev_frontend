import React, { useEffect, useState } from 'react';
import AnimatedEraser from './AnimatedEraser';

interface LogoRevealProps {
  className?: string;
  onComplete?: () => void;
}

const LogoRevealDraw: React.FC<LogoRevealProps> = ({ className = '', onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'erasing' | 'complete'>('drawing');

  useEffect(() => {
    // Drawing phase: 2 seconds
    const drawTimer = setTimeout(() => {
      setPhase('erasing');
    }, 2500);

    // Erasing phase: 1 second after drawing
    const eraseTimer = setTimeout(() => {
      setPhase('complete');
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(eraseTimer);
    };
  }, [onComplete]);

  return (
    <div className={`logo-reveal ${className}`} aria-label="Draw2Dev logo animation">
      <div className="relative flex items-center justify-center min-h-[200px]">
        {/* Animated Eraser */}
        <AnimatedEraser 
          isErasing={phase === 'erasing'} 
          className="z-10"
        />
        {/* SVG with hand-drawn style paths */}
        <svg 
          viewBox="0 0 400 100" 
          className="w-full max-w-md"
          style={{ overflow: 'visible' }}
        >
          {/* Simple hand-drawn style text paths */}
          <g stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* D */}
            <path 
              d="M20,20 L20,80 L45,80 C60,80 70,70 70,50 C70,30 60,20 45,20 Z"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '200' : 'none',
                strokeDashoffset: phase === 'drawing' ? '200' : '0',
                animation: phase === 'drawing' ? 'draw 0.8s ease-out forwards' : 'none'
              }}
            />
            
            {/* r */}
            <path 
              d="M85,45 L85,80 M85,45 C85,35 95,35 95,45"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '100' : 'none',
                strokeDashoffset: phase === 'drawing' ? '100' : '0',
                animation: phase === 'drawing' ? 'draw 0.6s ease-out 0.3s forwards' : 'none'
              }}
            />
            
            {/* a */}
            <path 
              d="M110,60 C110,45 125,45 125,60 L125,80 M110,65 L125,65"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '120' : 'none',
                strokeDashoffset: phase === 'drawing' ? '120' : '0',
                animation: phase === 'drawing' ? 'draw 0.7s ease-out 0.5s forwards' : 'none'
              }}
            />
            
            {/* w */}
            <path 
              d="M140,45 L145,80 L150,60 L155,80 L160,45"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '150' : 'none',
                strokeDashoffset: phase === 'drawing' ? '150' : '0',
                animation: phase === 'drawing' ? 'draw 0.8s ease-out 0.7s forwards' : 'none'
              }}
            />
            
            {/* 2 */}
            <path 
              d="M180,45 C190,35 210,35 210,50 C210,65 180,70 180,70 L210,70"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '180' : 'none',
                strokeDashoffset: phase === 'drawing' ? '180' : '0',
                animation: phase === 'drawing' ? 'draw 0.9s ease-out 0.9s forwards' : 'none'
              }}
            />
            
            {/* D */}
            <path 
              d="M230,20 L230,80 L255,80 C270,80 280,70 280,50 C280,30 270,20 255,20 Z"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '200' : 'none',
                strokeDashoffset: phase === 'drawing' ? '200' : '0',
                animation: phase === 'drawing' ? 'draw 0.8s ease-out 1.1s forwards' : 'none'
              }}
            />
            
            {/* e */}
            <path 
              d="M300,60 C300,45 320,45 320,60 C320,75 300,75 300,60 M300,60 L320,60"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '140' : 'none',
                strokeDashoffset: phase === 'drawing' ? '140' : '0',
                animation: phase === 'drawing' ? 'draw 0.7s ease-out 1.3s forwards' : 'none'
              }}
            />
            
            {/* v */}
            <path 
              d="M335,45 L345,80 L355,45"
              className={`${phase === 'drawing' ? 'draw-animation' : 'drawn'} ${phase === 'erasing' ? 'erase-animation' : ''}`}
              style={{
                strokeDasharray: phase === 'drawing' ? '100' : 'none',
                strokeDashoffset: phase === 'drawing' ? '100' : '0',
                animation: phase === 'drawing' ? 'draw 0.6s ease-out 1.5s forwards' : 'none'
              }}
            />
          </g>
          
          {/* Erasing rectangle */}
          <rect 
            x="0" 
            y="0" 
            width="0" 
            height="100" 
            fill="#FAFAFA"
            className={phase === 'erasing' ? 'erase-rect' : ''}
            style={{
              animation: phase === 'erasing' ? 'erase 1.5s ease-in-out forwards' : 'none'
            }}
          />
        </svg>

        {/* Status indicator */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-center opacity-50">
            {phase === 'drawing' && 'Drawing...'}
            {phase === 'erasing' && 'Erasing...'}
            {phase === 'complete' && 'Complete!'}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          from {
            stroke-dashoffset: var(--dash-length);
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes erase {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .draw-animation {
          stroke-dashoffset: var(--dash-length);
        }

        .drawn {
          stroke-dasharray: none;
          stroke-dashoffset: 0;
        }

        .erase-animation {
          opacity: 1;
        }

        .erase-rect {
          width: 0;
        }
      `}</style>
    </div>
  );
};

export default LogoRevealDraw;