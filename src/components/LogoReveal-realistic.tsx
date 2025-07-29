import React, { useEffect, useState, useRef } from 'react';
import AnimatedEraser from './AnimatedEraser';

interface LogoRevealProps {
  className?: string;
  onComplete?: () => void;
}

const LogoRevealRealistic: React.FC<LogoRevealProps> = ({ className = '', onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'erasing' | 'complete'>('drawing');
  const [currentPath, setCurrentPath] = useState('');
  const [pencilPosition, setPencilPosition] = useState({ x: 20, y: 45 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Define the drawing paths for each letter with stroke-by-stroke breakdown
  const drawingSequence = [
    // D - draw in realistic strokes
    { path: 'M20,20 L20,80', duration: 800, pencilEnd: { x: 20, y: 80 } },
    { path: 'M20,20 C20,15 25,15 30,15 L50,15 C65,15 75,25 75,40 C75,55 65,65 50,65 L30,65 C25,65 20,65 20,60', duration: 1200, pencilEnd: { x: 20, y: 60 } },
    
    // r - simple strokes
    { path: 'M85,45 L85,80', duration: 600, pencilEnd: { x: 85, y: 80 } },
    { path: 'M85,45 C85,35 95,35 95,45', duration: 400, pencilEnd: { x: 95, y: 45 } },
    
    // a - natural letter formation
    { path: 'M110,60 C110,45 125,45 125,60 L125,80', duration: 900, pencilEnd: { x: 125, y: 80 } },
    { path: 'M110,65 L125,65', duration: 300, pencilEnd: { x: 125, y: 65 } },
    
    // w - connect the strokes naturally
    { path: 'M140,45 L145,80', duration: 500, pencilEnd: { x: 145, y: 80 } },
    { path: 'M145,80 L150,60', duration: 400, pencilEnd: { x: 150, y: 60 } },
    { path: 'M150,60 L155,80', duration: 400, pencilEnd: { x: 155, y: 80 } },
    { path: 'M155,80 L160,45', duration: 500, pencilEnd: { x: 160, y: 45 } },
    
    // 2 - curved number
    { path: 'M180,45 C190,35 210,35 210,50', duration: 600, pencilEnd: { x: 210, y: 50 } },
    { path: 'M210,50 C210,65 180,70 180,70', duration: 700, pencilEnd: { x: 180, y: 70 } },
    { path: 'M180,70 L210,70', duration: 400, pencilEnd: { x: 210, y: 70 } },
    
    // D (second)
    { path: 'M230,20 L230,80', duration: 800, pencilEnd: { x: 230, y: 80 } },
    { path: 'M230,20 C230,15 235,15 240,15 L260,15 C275,15 285,25 285,40 C285,55 275,65 260,65 L240,65 C235,65 230,65 230,60', duration: 1200, pencilEnd: { x: 230, y: 60 } },
    
    // e - natural formation
    { path: 'M300,60 C300,45 320,45 320,60', duration: 600, pencilEnd: { x: 320, y: 60 } },
    { path: 'M320,60 C320,75 300,75 300,60', duration: 600, pencilEnd: { x: 300, y: 60 } },
    { path: 'M300,60 L320,60', duration: 300, pencilEnd: { x: 320, y: 60 } },
    
    // v - simple strokes
    { path: 'M335,45 L345,80', duration: 500, pencilEnd: { x: 345, y: 80 } },
    { path: 'M345,80 L355,45', duration: 500, pencilEnd: { x: 355, y: 45 } },
  ];

  useEffect(() => {
    let currentStroke = 0;
    let accumulatedPath = '';
    
    const drawNextStroke = () => {
      if (currentStroke >= drawingSequence.length) {
        // All strokes complete, start erasing
        setTimeout(() => {
          setPhase('erasing');
        }, 500);
        
        setTimeout(() => {
          setPhase('complete');
          onComplete?.();
        }, 2000);
        return;
      }

      const stroke = drawingSequence[currentStroke];
      
      // Move pencil to start of stroke
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('d', stroke.path);
      const pathLength = pathElement.getTotalLength();
      
      // Animate the pencil moving and drawing
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / stroke.duration, 1);
        
        // Update pencil position along the path
        const point = pathElement.getPointAtLength(progress * pathLength);
        setPencilPosition({ x: point.x, y: point.y });
        
        // Update the drawn path
        const currentPathLength = progress * pathLength;
        const partialPath = getPartialPath(stroke.path, progress);
        
        if (progress < 1) {
          accumulatedPath = getAccumulatedPath(currentStroke, partialPath);
          setCurrentPath(accumulatedPath);
          requestAnimationFrame(animate);
        } else {
          // Stroke complete
          accumulatedPath = getAccumulatedPath(currentStroke + 1, '');
          setCurrentPath(accumulatedPath);
          setPencilPosition(stroke.pencilEnd);
          
          currentStroke++;
          setTimeout(drawNextStroke, 100); // Brief pause between strokes
        }
      };
      
      requestAnimationFrame(animate);
    };

    const getPartialPath = (fullPath: string, progress: number) => {
      // For simplicity, we'll use the full path and rely on stroke-dasharray for partial reveal
      return fullPath;
    };

    const getAccumulatedPath = (strokeIndex: number, currentPartial: string) => {
      let path = '';
      for (let i = 0; i < strokeIndex; i++) {
        path += drawingSequence[i].path + ' ';
      }
      if (currentPartial) {
        path += currentPartial;
      }
      return path;
    };

    // Start drawing after a brief delay
    setTimeout(drawNextStroke, 500);

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
          className="absolute z-20 transition-all duration-100 ease-linear"
          style={{
            left: `${(pencilPosition.x / 400) * 100}%`,
            top: `${(pencilPosition.y / 100) * 100}%`,
            transform: 'translate(-50%, -100%)',
            opacity: phase === 'drawing' ? 1 : 0
          }}
        >
          <svg viewBox="0 0 30 60" className="w-6 h-12">
            {/* Pencil body */}
            <path 
              d="M10,10 L12,8 L18,8 L20,10 L20,15 L18,17 L12,17 Z" 
              fill="#D2691E" 
              stroke="#8B4513" 
              strokeWidth="1"
            />
            
            {/* Metal ferrule */}
            <path 
              d="M18,8 L22,9 L23,16 L18,17 Z" 
              fill="#C0C0C0" 
              stroke="#808080" 
              strokeWidth="0.5"
            />
            
            {/* Eraser */}
            <path 
              d="M22,9 L26,10 C27,10 27,15 26,15 L22,16 Z" 
              fill="#FFB6C1" 
              stroke="#CD5C5C" 
              strokeWidth="0.5"
            />
            
            {/* Pencil tip */}
            <path 
              d="M10,10 L8,12 L10,15 Z" 
              fill="#2F4F4F" 
              stroke="#000" 
              strokeWidth="0.5"
            />
            
            {/* Wood grain */}
            <line x1="14" y1="10" x2="14" y2="15" stroke="#8B4513" strokeWidth="0.3" opacity="0.7" />
            <line x1="16" y1="10" x2="16" y2="15" stroke="#8B4513" strokeWidth="0.3" opacity="0.7" />
          </svg>
        </div>

        {/* SVG with hand-drawn style paths */}
        <svg 
          ref={svgRef}
          viewBox="0 0 400 100" 
          className="w-full max-w-md"
          style={{ overflow: 'visible' }}
        >
          {/* Hand-drawn text paths */}
          <path
            d={currentPath}
            stroke="#000" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={phase === 'erasing' ? 'fade-out' : ''}
          />
          
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
        @keyframes erase {
          from { width: 0; }
          to { width: 100%; }
        }

        .fade-out {
          animation: fadeOut 1.5s ease-in-out forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0.1; }
        }

        .erase-rect {
          width: 0;
        }
      `}</style>
    </div>
  );
};

export default LogoRevealRealistic;