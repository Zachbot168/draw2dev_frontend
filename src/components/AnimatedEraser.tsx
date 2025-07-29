import React from 'react';

interface AnimatedEraserProps {
  isErasing: boolean;
  className?: string;
}

const AnimatedEraser: React.FC<AnimatedEraserProps> = ({ isErasing, className = '' }) => (
  <div className={`absolute top-1/2 transform -translate-y-1/2 ${className}`}>
    <svg 
      viewBox="0 0 80 30" 
      className={`w-16 h-8 ${isErasing ? 'eraser-active' : 'eraser-hidden'}`}
    >
      {/* Eraser body */}
      <path 
        d="M5,8 L65,10 C68,10 68,12 65,12 L67,18 C67,20 65,20 62,20 L8,18 C5,18 3,16 3,14 L5,12 C5,10 5,8 8,8 Z" 
        fill="#FFB6C1" 
        stroke="#CD5C5C" 
        strokeWidth="1.5"
      />
      
      {/* Eraser label */}
      <rect 
        x="25" 
        y="11" 
        width="20" 
        height="6" 
        fill="white" 
        stroke="#CD5C5C" 
        strokeWidth="0.5"
        rx="1"
      />
      
      {/* Brand text */}
      <text 
        x="35" 
        y="16" 
        fontSize="4" 
        textAnchor="middle" 
        fill="#CD5C5C" 
        fontFamily="Arial, sans-serif"
      >
        ERASE
      </text>
      
      {/* Eraser crumbs */}
      <g className="eraser-crumbs">
        <circle cx="70" cy="12" r="1" fill="#FFB6C1" opacity="0.7" className="crumb-1" />
        <circle cx="68" cy="16" r="0.5" fill="#FFB6C1" opacity="0.8" className="crumb-2" />
        <circle cx="72" cy="14" r="0.8" fill="#FFB6C1" opacity="0.6" className="crumb-3" />
        <circle cx="69" cy="10" r="0.6" fill="#FFB6C1" opacity="0.9" className="crumb-4" />
      </g>
      
      {/* Motion lines */}
      <g className="motion-lines" opacity="0.5">
        <path d="M2,10 L0,10" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M2,14 L0,14" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M2,18 L0,18" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
      </g>
    </svg>
    
    <style jsx>{`
      .eraser-hidden {
        opacity: 0;
        transform: translateX(-100px);
        transition: all 0.3s ease-out;
      }
      
      .eraser-active {
        opacity: 1;
        transform: translateX(0);
        animation: eraseMotion 1.0s ease-in-out forwards;
      }
      
      @keyframes eraseMotion {
        0% { 
          transform: translateX(-50px);
          opacity: 1;
        }
        20% { 
          transform: translateX(0px) rotate(-2deg);
          opacity: 1;
        }
        40% { 
          transform: translateX(50px) rotate(1deg);
          opacity: 1;
        }
        60% { 
          transform: translateX(100px) rotate(-1deg);
          opacity: 1;
        }
        80% { 
          transform: translateX(200px) rotate(0deg);
          opacity: 0.8;
        }
        100% { 
          transform: translateX(350px);
          opacity: 0;
        }
      }
      
      .eraser-crumbs .crumb-1 {
        animation: crumbFall 1.5s ease-in 0.3s forwards;
      }
      .eraser-crumbs .crumb-2 {
        animation: crumbFall 1.5s ease-in 0.5s forwards;
      }
      .eraser-crumbs .crumb-3 {
        animation: crumbFall 1.5s ease-in 0.7s forwards;
      }
      .eraser-crumbs .crumb-4 {
        animation: crumbFall 1.5s ease-in 0.4s forwards;
      }
      
      @keyframes crumbFall {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.8;
        }
        50% {
          transform: translateY(15px) scale(0.8);
          opacity: 0.6;
        }
        100% {
          transform: translateY(25px) scale(0.3);
          opacity: 0;
        }
      }
      
      .motion-lines {
        animation: motionBlur 1.5s ease-in-out infinite;
      }
      
      @keyframes motionBlur {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.8; }
      }
    `}</style>
  </div>
);

export default AnimatedEraser;