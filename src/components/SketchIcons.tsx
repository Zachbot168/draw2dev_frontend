import React from 'react';

// Hand-drawn pencil SVG with animation
export const AnimatedPencil: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 120 120" className={`inline-block ${className}`}>
    {/* Paper/sketch pad background */}
    <rect 
      x="5" 
      y="60" 
      width="90" 
      height="50" 
      fill="#FAFAFA" 
      stroke="#DDD" 
      strokeWidth="1"
      rx="2"
    />
    
    {/* Paper lines */}
    <line x1="10" y1="70" x2="90" y2="70" stroke="#E0E0E0" strokeWidth="0.5" />
    <line x1="10" y1="80" x2="90" y2="80" stroke="#E0E0E0" strokeWidth="0.5" />
    <line x1="10" y1="90" x2="90" y2="90" stroke="#E0E0E0" strokeWidth="0.5" />
    <line x1="10" y1="100" x2="90" y2="100" stroke="#E0E0E0" strokeWidth="0.5" />
    
    {/* Sketched drawings on paper */}
    <g className="sketch-drawings">
      <rect x="15" y="65" width="25" height="15" fill="none" stroke="#666" strokeWidth="1.5" rx="2" className="sketch-box" />
      <circle cx="55" cy="75" r="8" fill="none" stroke="#666" strokeWidth="1.5" className="sketch-circle" />
      <path d="M70,68 L85,68 M70,75 L80,75 M70,82 L85,82" stroke="#666" strokeWidth="1.5" className="sketch-lines" />
    </g>
    
    <g className="pencil-group">
      {/* Pencil body - wooden part */}
      <path 
        d="M20,20 L25,18 L70,18 L75,20 L75,25 L70,27 L25,27 Z" 
        fill="#D2691E" 
        stroke="#8B4513" 
        strokeWidth="1.5"
        className="pencil-body"
      />
      
      {/* Metal ferrule */}
      <path 
        d="M70,18 L78,19 L79,26 L70,27 Z" 
        fill="#C0C0C0" 
        stroke="#808080" 
        strokeWidth="1"
      />
      
      {/* Eraser */}
      <path 
        d="M78,19 L85,20 C87,20 87,25 85,25 L78,26 Z" 
        fill="#FFB6C1" 
        stroke="#CD5C5C" 
        strokeWidth="1"
      />
      
      {/* Pencil tip */}
      <path 
        d="M20,20 L15,22.5 L20,25 Z" 
        fill="#2F4F4F" 
        stroke="#000" 
        strokeWidth="1"
      />
      
      {/* Wood grain lines */}
      <line x1="30" y1="20" x2="30" y2="25" stroke="#8B4513" strokeWidth="0.5" opacity="0.7" />
      <line x1="40" y1="20" x2="40" y2="25" stroke="#8B4513" strokeWidth="0.5" opacity="0.7" />
      <line x1="50" y1="20" x2="50" y2="25" stroke="#8B4513" strokeWidth="0.5" opacity="0.7" />
      <line x1="60" y1="20" x2="60" y2="25" stroke="#8B4513" strokeWidth="0.5" opacity="0.7" />
      
      {/* Writing motion lines */}
      <g className="writing-lines" opacity="0">
        <path d="M10,35 Q20,40 30,35" stroke="#666" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        <path d="M15,45 Q25,40 35,45" stroke="#666" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        <path d="M12,55 Q22,50 32,55" stroke="#666" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      </g>
    </g>
    
    <style jsx>{`
      .pencil-group {
        transform-origin: center;
        animation: pencilWrite 3s ease-in-out infinite;
      }
      
      .writing-lines {
        animation: showWriting 3s ease-in-out infinite;
      }
      
      .sketch-drawings .sketch-box {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: drawSketch 2s ease-out 0.5s forwards;
      }
      
      .sketch-drawings .sketch-circle {
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
        animation: drawSketch 1.5s ease-out 1.2s forwards;
      }
      
      .sketch-drawings .sketch-lines {
        stroke-dasharray: 60;
        stroke-dashoffset: 60;
        animation: drawSketch 1.8s ease-out 1.8s forwards;
      }
      
      @keyframes drawSketch {
        to {
          stroke-dashoffset: 0;
        }
      }
      
      @keyframes pencilWrite {
        0%, 70% { transform: rotate(0deg) translateY(0px); }
        10%, 60% { transform: rotate(-5deg) translateY(2px); }
        20%, 50% { transform: rotate(5deg) translateY(-1px); }
        30%, 40% { transform: rotate(-3deg) translateY(1px); }
      }
      
      @keyframes showWriting {
        0%, 20% { opacity: 0; }
        30%, 70% { opacity: 0.8; }
        80%, 100% { opacity: 0; }
      }
    `}</style>
  </svg>
);

// Hand-drawn computer/monitor SVG with typing animation
export const AnimatedComputer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`inline-block ${className}`}>
    <g className="computer-group">
      {/* Monitor screen */}
      <path 
        d="M15,20 L85,22 C87,22 87,24 85,24 L87,60 C87,62 85,62 83,62 L17,60 C15,60 13,58 13,56 L15,24 C15,22 15,20 17,20 Z" 
        fill="#1a1a1a" 
        stroke="#000" 
        strokeWidth="2"
      />
      
      {/* Screen bezel */}
      <path 
        d="M10,15 L90,17 C93,17 93,19 90,19 L92,65 C92,68 89,68 86,68 L14,66 C11,66 8,63 8,60 L10,19 C10,17 10,15 13,15 Z" 
        fill="#2F2F2F" 
        stroke="#000" 
        strokeWidth="2"
      />
      
      {/* Monitor stand */}
      <path 
        d="M45,68 L55,70 L53,75 L47,73 Z" 
        fill="#666" 
        stroke="#000" 
        strokeWidth="1.5"
      />
      
      {/* Monitor base */}
      <path 
        d="M35,75 L65,77 C67,77 67,79 65,79 L35,77 C33,77 33,75 35,75 Z" 
        fill="#444" 
        stroke="#000" 
        strokeWidth="1.5"
      />
      
      {/* Code lines on screen */}
      <g className="code-lines">
        <rect x="20" y="28" width="0" height="3" fill="#00ff00" className="code-line-1" />
        <rect x="20" y="35" width="0" height="3" fill="#00ff00" className="code-line-2" />
        <rect x="20" y="42" width="0" height="3" fill="#00ff00" className="code-line-3" />
        <rect x="20" y="49" width="0" height="3" fill="#00ff00" className="code-line-4" />
      </g>
      
      {/* Blinking cursor */}
      <rect x="25" y="56" width="2" height="3" fill="#00ff00" className="cursor" />
      
      {/* Screen reflection */}
      <path 
        d="M18,25 L40,27 C35,35 25,45 18,50 Z" 
        fill="rgba(255,255,255,0.1)" 
      />
    </g>
    
    <style jsx>{`
      .code-line-1 {
        animation: typeLine 0.8s ease-out 0.5s forwards;
      }
      .code-line-2 {
        animation: typeLine 1.2s ease-out 1.3s forwards;
      }
      .code-line-3 {
        animation: typeLine 0.9s ease-out 2.5s forwards;
      }
      .code-line-4 {
        animation: typeLine 1.1s ease-out 3.4s forwards;
      }
      
      .cursor {
        animation: blink 1s infinite;
      }
      
      @keyframes typeLine {
        from { width: 0; }
        to { width: 45px; }
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `}</style>
  </svg>
);

// Animated arrow that jitters
export const AnimatedArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`inline-block ${className}`}>
    <g className="arrow-group">
      {/* Arrow shaft */}
      <path 
        d="M20,48 L70,50 C72,50 72,52 70,52 L20,50 C18,50 18,48 20,48 Z" 
        fill="none" 
        stroke="#000" 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Arrow head */}
      <path 
        d="M65,40 L80,50 L65,60 Z" 
        fill="none" 
        stroke="#000" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Motion lines */}
      <g className="motion-lines" opacity="0.6">
        <path d="M10,45 L15,45" stroke="#666" strokeWidth="2" strokeDasharray="3,3" />
        <path d="M8,50" stroke="#666" strokeWidth="2" strokeDasharray="3,3" />
        <path d="M10,55 L15,55" stroke="#666" strokeWidth="2" strokeDasharray="3,3" />
      </g>
    </g>
    
    <style jsx>{`
      .arrow-group {
        transform-origin: center;
        animation: arrowJitter 2s ease-in-out infinite;
      }
      
      .motion-lines {
        animation: motionPulse 2s ease-in-out infinite;
      }
      
      @keyframes arrowJitter {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        10% { transform: translateX(2px) rotate(1deg); }
        20% { transform: translateX(-2px) rotate(-1deg); }
        30% { transform: translateX(1px) rotate(0.5deg); }
        40% { transform: translateX(-1px) rotate(-0.5deg); }
        50% { transform: translateX(0px) rotate(0deg); }
      }
      
      @keyframes motionPulse {
        0%, 50% { opacity: 0.6; }
        25% { opacity: 1; }
        75% { opacity: 0.3; }
        100% { opacity: 0.6; }
      }
    `}</style>
  </svg>
);