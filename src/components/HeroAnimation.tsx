import React, { useEffect, useRef, useMemo, useState } from 'react';
const anime = require('animejs');

interface HeroAnimationProps {
  className?: string;
  onComplete?: () => void;
}

const HeroAnimation: React.FC<HeroAnimationProps> = ({ 
  className = '', 
  onComplete 
}) => {
  // Refs for animation elements
  const penRef = useRef<SVGGElement>(null);
  const sketchRef = useRef<SVGGElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const monitorRef = useRef<SVGGElement>(null);
  const codeTextRef = useRef<HTMLDivElement>(null);
  
  // Animation timeline reference
  const timelineRef = useRef<any>(null);
  
  // State for arrow jitter effect
  const [currentArrowPath, setCurrentArrowPath] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Hand-drawn SVG paths for the sketch elements
  const sketchPaths = useMemo(() => ({
    // App container rectangle - imperfect hand-drawn
    container: "M50,80 L280,82 C285,82 285,87 280,88 L282,180 C282,185 277,185 272,185 L58,183 C53,183 48,178 48,173 L50,88 C50,83 53,80 58,80 Z",
    
    // Button circle - slightly wobbly
    button: "M120,120 C135,118 150,125 152,140 C150,155 135,162 120,160 C105,162 90,155 88,140 C90,125 105,118 120,120 Z",
    
    // Text lines - hand-drawn straight-ish lines
    textLine1: "M70,100 L200,102",
    textLine2: "M70,200 L180,202",
    textLine3: "M70,220 L220,222"
  }), []);

  // Multiple arrow path variations for jitter effect
  const arrowPaths = useMemo(() => [
    // Arrow path variation 1
    "M300,140 C320,138 340,142 360,140 M350,130 L360,140 L350,150",
    // Arrow path variation 2  
    "M302,142 C322,140 342,144 362,142 M352,132 L362,142 L352,152",
    // Arrow path variation 3
    "M298,138 C318,136 338,140 358,138 M348,128 L358,138 L348,148",
    // Arrow path variation 4
    "M301,141 C321,139 341,143 361,141 M351,131 L361,141 L351,151"
  ], []);

  // Monitor SVG paths - rough, hand-drawn computer monitor
  const monitorPaths = useMemo(() => ({
    // Monitor screen - slightly imperfect rectangle
    screen: "M400,60 L600,62 C605,62 605,67 600,68 L602,180 C602,185 597,185 592,185 L408,183 C403,183 398,178 398,173 L400,68 C400,63 403,60 408,60 Z",
    
    // Monitor base - simple stand
    base: "M480,185 L520,187 M490,187 L510,200 C505,205 495,205 490,200 L510,200",
    
    // Screen border for depth
    border: "M395,55 L605,57 C610,57 610,62 605,63 L607,185 C607,190 602,190 597,190 L403,188 C398,188 393,183 393,178 L395,63 C395,58 398,55 403,55 Z"
  }), []);

  // Code content to be "typed"
  const codeContent = `function App() {
  return (
    <div className="app">
      <button>Click me</button>
    </div>
  );
}`;

  // Memoized animation timeline
  const createAnimationTimeline = useMemo(() => {
    return () => {
      const tl = anime.timeline({
        complete: () => {
          onComplete?.();
          // Auto-restart after completion
          setTimeout(() => {
            if (timelineRef.current) {
              timelineRef.current.restart();
            }
          }, 1000);
        }
      });

      // Get sketch path elements
      const sketchPaths = sketchRef.current?.querySelectorAll('path') || [];
      
      // Set up initial states for sketch paths
      sketchPaths.forEach(path => {
        const pathElement = path as SVGPathElement;
        const length = pathElement.getTotalLength();
        pathElement.style.strokeDasharray = length.toString();
        pathElement.style.strokeDashoffset = length.toString();
      });

      // Hide all elements initially
      if (penRef.current) penRef.current.style.opacity = '0';
      if (arrowRef.current) arrowRef.current.style.opacity = '0';
      if (monitorRef.current) monitorRef.current.style.opacity = '0';

      // Stage 1: Pen Writing (0-2s)
      // Show pen and animate it "drawing"
      tl.add({
        targets: penRef.current,
        opacity: 1,
        duration: 200,
        easing: 'easeOutQuad'
      }, 0);

      // Animate pen movement along sketch path
      tl.add({
        targets: penRef.current,
        translateX: [0, 50, 100, 150, 200],
        translateY: [0, -10, 5, -5, 10],
        rotate: [0, -5, 5, -3, 0],
        duration: 2000,
        easing: 'easeInOutQuad'
      }, 200);

      // Draw sketch paths sequentially
      sketchPaths.forEach((path, index) => {
        tl.add({
          targets: path,
          strokeDashoffset: 0,
          duration: 400,
          easing: 'easeOutCubic'
        }, 400 + index * 300);
      });

      // Stage 2: Arrow Jitter (2-4s)
      // Show arrow and start jitter effect
      tl.add({
        targets: arrowRef.current,
        opacity: 1,
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => {
          // Start arrow jitter effect
          const jitterInterval = setInterval(() => {
            setCurrentArrowPath(prev => (prev + 1) % arrowPaths.length);
          }, 150);
          
          // Stop jitter after 2 seconds
          setTimeout(() => {
            clearInterval(jitterInterval);
          }, 2000);
        }
      }, 2000);

      // Stage 3: Code Monitor (4-6s)
      // Show monitor
      tl.add({
        targets: monitorRef.current,
        opacity: 1,
        duration: 300,
        easing: 'easeOutQuad'
      }, 4000);

      // Start typing effect
      tl.add({
        targets: {},
        duration: 1,
        complete: () => {
          setShowTyping(true);
        }
      }, 4300);

      return tl;
    };
  }, [arrowPaths.length, onComplete]);

  // Typing animation effect
  useEffect(() => {
    if (!showTyping || !codeTextRef.current) return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= codeContent.length) {
        if (codeTextRef.current) {
          codeTextRef.current.textContent = codeContent.slice(0, currentIndex);
        }
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setShowTyping(false);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [showTyping, codeContent]);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show final state without animation for reduced motion
      if (sketchRef.current) sketchRef.current.style.opacity = '1';
      if (arrowRef.current) arrowRef.current.style.opacity = '1';
      if (monitorRef.current) monitorRef.current.style.opacity = '1';
      if (codeTextRef.current) codeTextRef.current.textContent = codeContent;
      return;
    }

    // Create and start animation
    const timeline = createAnimationTimeline();
    timelineRef.current = timeline;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      timeline.play();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.pause();
        timelineRef.current = null;
      }
    };
  }, [createAnimationTimeline, prefersReducedMotion, codeContent]);

  return (
    <div 
      className={`hero-animation ${className}`} 
      aria-label="Draw2Dev concept animation showing sketch to code transformation"
    >
      <svg 
        viewBox="0 0 800 400" 
        className="w-full max-w-4xl mx-auto"
        style={{ overflow: 'visible' }}
        role="img"
        aria-describedby="animation-description"
      >
        <desc id="animation-description">
          Animation showing a pen drawing a mockup sketch, followed by an arrow pointing to a computer monitor displaying code
        </desc>
        
        {/* Stage 1: Pen + Sketch */}
        <g ref={penRef} className="pen-group">
          {/* Hand-drawn pen/pencil */}
          <g transform="translate(30, 50)">
            {/* Pen body */}
            <path 
              d="M0,0 L-20,-40 C-21,-45 -19,-47 -15,-46 L5,-44 C9,-45 11,-43 10,-38 L0,0 Z" 
              fill="#FFD700" 
              stroke="#000" 
              strokeWidth="2"
            />
            {/* Pen tip */}
            <path 
              d="M0,0 L2,8 C1,10 -1,10 -2,8 Z" 
              fill="#000"
            />
            {/* Pen details */}
            <circle cx="-7" cy="-25" r="2" fill="#000" opacity="0.3" />
          </g>
        </g>

        <g ref={sketchRef} className="sketch-group">
          <g stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* App container */}
            <path d={sketchPaths.container} />
            
            {/* Button */}
            <path d={sketchPaths.button} />
            
            {/* Text lines */}
            <path d={sketchPaths.textLine1} />
            <path d={sketchPaths.textLine2} />
            <path d={sketchPaths.textLine3} />
          </g>
        </g>

        {/* Stage 2: Animated Arrow */}
        <g ref={arrowRef} className="arrow-group">
          <g stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={arrowPaths[currentArrowPath]} />
          </g>
        </g>

        {/* Stage 3: Monitor */}
        <g ref={monitorRef} className="monitor-group">
          <g stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Monitor border (for depth) */}
            <path d={monitorPaths.border} fill="#E5E5E5" />
            
            {/* Monitor screen */}
            <path d={monitorPaths.screen} fill="#1a1a1a" />
            
            {/* Monitor base */}
            <path d={monitorPaths.base} />
          </g>
          
          {/* Code text area */}
          <foreignObject x="410" y="75" width="180" height="100">
            <div 
              ref={codeTextRef}
              className="text-green-400 font-mono text-xs leading-tight p-2 whitespace-pre-wrap"
              style={{ 
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: '10px',
                color: '#4ADE80'
              }}
            />
            <div 
              className="typing-cursor"
              style={{
                display: showTyping ? 'inline-block' : 'none',
                width: '8px',
                height: '12px',
                backgroundColor: '#4ADE80'
              }}
            />
          </foreignObject>
        </g>
      </svg>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes hero-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          
          .hero-animation {
            background: #FAFAFA;
            border-radius: 8px;
            padding: 20px;
          }
          
          .typing-cursor {
            animation: hero-blink 1s infinite;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .hero-animation * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default HeroAnimation;