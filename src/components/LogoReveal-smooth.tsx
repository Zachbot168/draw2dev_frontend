import React, { useEffect, useState } from 'react';
import AnimatedEraser from './AnimatedEraser';

interface LogoRevealProps {
  className?: string;
  onComplete?: () => void;
}

const LogoRevealSmooth: React.FC<LogoRevealProps> = ({ className = '', onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'erasing' | 'complete'>('drawing');
  const [pencilPosition, setPencilPosition] = useState({ x: 20, y: 45 });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  // Hand-drawn paths for each letter - these will be drawn sequentially (even faster timing)
  const letterPaths = [
    // D
    { 
      path: "M20,20 L20,80 M20,20 C20,15 25,15 30,15 L50,15 C65,15 75,25 75,40 C75,55 65,65 50,65 L30,65 C25,65 20,65 20,60 L20,20",
      duration: 400,
      startPos: { x: 20, y: 20 },
      endPos: { x: 75, y: 40 }
    },
    // r
    { 
      path: "M85,45 L85,80 M85,45 C85,35 95,35 95,45",
      duration: 250,
      startPos: { x: 85, y: 45 },
      endPos: { x: 95, y: 45 }
    },
    // a
    { 
      path: "M110,60 C110,45 125,45 125,60 L125,80 M110,65 L125,65",
      duration: 300,
      startPos: { x: 110, y: 60 },
      endPos: { x: 125, y: 80 }
    },
    // w
    { 
      path: "M140,45 L145,80 L150,60 L155,80 L160,45",
      duration: 350,
      startPos: { x: 140, y: 45 },
      endPos: { x: 160, y: 45 }
    },
    // 2
    { 
      path: "M180,45 C190,35 210,35 210,50 C210,65 180,70 180,70 L210,70",
      duration: 380,
      startPos: { x: 180, y: 45 },
      endPos: { x: 210, y: 70 }
    },
    // D (second)
    { 
      path: "M230,20 L230,80 M230,20 C230,15 235,15 240,15 L260,15 C275,15 285,25 285,40 C285,55 275,65 260,65 L240,65 C235,65 230,65 230,60 L230,20",
      duration: 400,
      startPos: { x: 230, y: 20 },
      endPos: { x: 285, y: 40 }
    },
    // e
    { 
      path: "M300,60 C300,45 320,45 320,60 C320,75 300,75 300,60 M300,60 L320,60",
      duration: 300,
      startPos: { x: 300, y: 60 },
      endPos: { x: 320, y: 60 }
    },
    // v
    { 
      path: "M335,45 L345,80 L355,45",
      duration: 220,
      startPos: { x: 335, y: 45 },
      endPos: { x: 355, y: 45 }
    }
  ];

  useEffect(() => {
    let letterIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const drawNextLetter = () => {
      if (letterIndex >= letterPaths.length) {
        // All letters drawn, move pencil away and then start erasing
        setPencilPosition({ x: 400, y: 10 }); // Move pencil off screen to the right
        
        setTimeout(() => {
          setPhase('erasing');
        }, 400);
        
        setTimeout(() => {
          setPhase('complete');
          onComplete?.();
        }, 1800);
        return;
      }

      const currentLetter = letterPaths[letterIndex];
      
      // Move pencil to start position
      setPencilPosition(currentLetter.startPos);
      
      // Animate pencil to end position and reveal letter
      setTimeout(() => {
        setPencilPosition(currentLetter.endPos);
        setCurrentLetterIndex(letterIndex + 1);
        
        letterIndex++;
        timeoutId = setTimeout(drawNextLetter, currentLetter.duration + 40);
      }, 30);
    };

    // Start drawing after brief delay
    setTimeout(drawNextLetter, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
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
        
        {/* Animated Pencil */}
        <div 
          className="absolute z-20 transition-all duration-300 ease-in-out pointer-events-none"
          style={{
            left: `${(pencilPosition.x / 400) * 100}%`,
            top: `${((pencilPosition.y - 10) / 100) * 100}%`,
            transform: 'translate(-50%, -100%)',
            opacity: phase === 'drawing' ? 1 : 0
          }}
        >
          <svg viewBox="0 0 50 35" className="w-12 h-8">
            <g className="pencil-shake">
              {/* Thicker Pencil body */}
              <path 
                d="M5,10 L8,5 L35,5 L38,10 L38,18 L35,23 L8,23 Z" 
                fill="#D2691E" 
                stroke="#8B4513" 
                strokeWidth="1.5"
              />
              
              {/* Brand text on pencil */}
              <text 
                x="23" 
                y="16" 
                fontSize="4" 
                textAnchor="middle" 
                fill="#8B4513" 
                fontFamily="Arial, sans-serif"
                opacity="0.8"
              >
                #2
              </text>
              
              {/* Metal ferrule */}
              <path 
                d="M35,5 L45,6 L46,22 L35,23 Z" 
                fill="#C0C0C0" 
                stroke="#808080" 
                strokeWidth="1.2"
              />
              
              {/* Ferrule bands */}
              <line x1="35" y1="9" x2="46" y2="9" stroke="#999" strokeWidth="0.6" />
              <line x1="35" y1="19" x2="46" y2="19" stroke="#999" strokeWidth="0.6" />
              
              {/* Thicker Eraser */}
              <ellipse 
                cx="40.5" 
                cy="14" 
                rx="5" 
                ry="4" 
                fill="#FFB6C1" 
                stroke="#CD5C5C" 
                strokeWidth="1.2"
              />
              
              {/* Eraser highlight */}
              <ellipse 
                cx="38.5" 
                cy="12" 
                rx="2" 
                ry="1.5" 
                fill="#FFC0CB" 
                opacity="0.7"
              />
              
              {/* Pencil tip (wood) - wider */}
              <path 
                d="M5,10 L2,14 L5,18 Z" 
                fill="#DEB887" 
                stroke="#8B4513" 
                strokeWidth="1.2"
              />
              
              {/* Lead tip - thicker */}
              <circle 
                cx="2" 
                cy="14" 
                r="1.5" 
                fill="#2F2F2F" 
                stroke="#000" 
                strokeWidth="1"
              />
              
              {/* Sharp lead point */}
              <path 
                d="M0.5,14 L0,14" 
                stroke="#000" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              
              {/* Wood grain lines - more spaced */}
              <line x1="12" y1="10" x2="12" y2="18" stroke="#8B4513" strokeWidth="0.6" opacity="0.6" />
              <line x1="18" y1="10" x2="18" y2="18" stroke="#8B4513" strokeWidth="0.6" opacity="0.6" />
              <line x1="24" y1="10" x2="24" y2="18" stroke="#8B4513" strokeWidth="0.6" opacity="0.6" />
              <line x1="30" y1="10" x2="30" y2="18" stroke="#8B4513" strokeWidth="0.6" opacity="0.6" />
              
              {/* Pencil highlight - wider */}
              <path 
                d="M8,5 L32,5 L32,10 L8,10 Z" 
                fill="rgba(255,255,255,0.4)"
              />
            </g>
          </svg>
        </div>

        {/* SVG with letters being revealed */}
        <svg 
          viewBox="0 0 400 100" 
          className="w-full max-w-md"
          style={{ overflow: 'visible' }}
        >
          <g stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {letterPaths.map((letter, index) => (
              <path
                key={index}
                d={letter.path}
                className={`letter-path ${index < currentLetterIndex ? 'draw-letter' : 'hidden-letter'} ${phase === 'erasing' ? 'fade-out' : ''}`}
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: index < currentLetterIndex ? '0' : '1000',
                  transition: `stroke-dashoffset ${letter.duration}ms ease-out`,
                  transitionDelay: '100ms'
                }}
              />
            ))}
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
        .pencil-shake {
          animation: pencilShake 0.3s ease-in-out infinite alternate;
        }

        @keyframes pencilShake {
          0% { transform: rotate(-1deg) translateX(0px); }
          100% { transform: rotate(1deg) translateX(1px); }
        }

        .letter-path {
          opacity: 1;
        }

        .hidden-letter {
          opacity: 0;
        }

        .draw-letter {
          opacity: 1;
          stroke-dashoffset: 0 !important;
        }

        .fade-out {
          animation: fadeOut 1.5s ease-in-out forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0.1; }
        }

        @keyframes erase {
          from { width: 0; }
          to { width: 100%; }
        }

        .erase-rect {
          width: 0;
        }
      `}</style>
    </div>
  );
};

export default LogoRevealSmooth;