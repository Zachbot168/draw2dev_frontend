import React, { useEffect, useState } from 'react';

interface LogoRevealProps {
  className?: string;
  onComplete?: () => void;
}

const LogoRevealSimple: React.FC<LogoRevealProps> = ({ className = '', onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'erasing' | 'complete'>('drawing');

  useEffect(() => {
    // Drawing phase: 2 seconds
    const drawTimer = setTimeout(() => {
      setPhase('erasing');
    }, 2000);

    // Erasing phase: 1 second after drawing
    const eraseTimer = setTimeout(() => {
      setPhase('complete');
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(eraseTimer);
    };
  }, [onComplete]);

  return (
    <div className={`logo-reveal ${className}`} aria-label="Draw2Dev logo animation">
      <div className="relative">
        {/* Simple text that fades in, then fades out */}
        <h1 
          className={`text-6xl font-logo transition-opacity duration-1000 ${
            phase === 'drawing' ? 'opacity-100' : 
            phase === 'erasing' ? 'opacity-50' : 
            'opacity-0'
          }`}
          style={{
            background: phase === 'erasing' ? 'linear-gradient(90deg, transparent 0%, #FAFAFA 50%, #FAFAFA 100%)' : 'none',
            backgroundClip: phase === 'erasing' ? 'text' : 'unset',
            WebkitBackgroundClip: phase === 'erasing' ? 'text' : 'unset',
            WebkitTextFillColor: phase === 'erasing' ? 'transparent' : '#000'
          }}
        >
          Draw2Dev
        </h1>
        
        {/* Status indicator */}
        <p className="text-sm mt-4 text-center opacity-50">
          {phase === 'drawing' && 'Drawing...'}
          {phase === 'erasing' && 'Erasing...'}
          {phase === 'complete' && 'Complete!'}
        </p>
      </div>
    </div>
  );
};

export default LogoRevealSimple;