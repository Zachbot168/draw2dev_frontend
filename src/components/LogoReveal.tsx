import React, { useEffect, useRef, useMemo } from 'react';
import anime from 'animejs';

interface LogoRevealProps {
  className?: string;
  onComplete?: () => void;
}

const LogoReveal: React.FC<LogoRevealProps> = ({ className = '', onComplete }) => {
  // Refs for each letter path
  const drawRef = useRef<SVGPathElement>(null);
  const rawRef = useRef<SVGPathElement>(null);
  const twoRef = useRef<SVGPathElement>(null);
  const devDRef = useRef<SVGPathElement>(null);
  const devERef = useRef<SVGPathElement>(null);
  const devVRef = useRef<SVGPathElement>(null);
  
  // Ref for erase rectangle
  const eraseRef = useRef<SVGRectElement>(null);
  
  // Animation timeline reference
  const timelineRef = useRef<any>(null);

  // Hand-drawn style SVG paths for "Draw2Dev" in Jeju Hallasan style
  const paths = useMemo(() => ({
    // "D" - curved and hand-drawn with imperfections
    D: "M12,26 C11,18 16,12 26,13 C34,12 44,17 45,27 L44,63 C45,73 36,78 26,79 C16,78 11,72 12,64 Z M12,26 L13,64",
    
    // "raw" - lowercase, flowing script with natural curves
    raw: "M58,46 C57,37 62,32 68,36 C71,39 72,44 69,48 M68,36 C74,33 81,37 79,44 C77,51 74,54 71,49 M86,32 C88,30 91,31 89,36 L84,54 C83,59 81,58 83,54 M96,37 C99,34 104,36 102,43 C100,49 96,51 93,46 L94,56",
    
    // "2" - hand-drawn number with natural wobble
    "2": "M118,32 C126,27 134,31 133,41 C132,49 124,53 117,58 L132,59 L118,64 L133,65",
    
    // "Dev" - mixed case, stylized
    // "D" - slightly different from first D
    devD: "M148,27 C147,17 152,13 161,12 C169,13 178,18 179,28 L178,62 C179,72 170,77 161,78 C152,77 147,71 148,63 Z M148,27 L149,63",
    
    // "e" - rounded with hand-drawn imperfections
    devE: "M193,46 C192,38 197,33 206,34 C214,33 218,38 217,46 C218,54 213,58 206,59 C197,58 192,54 193,46 M193,46 L217,47",
    
    // "v" - slightly curved for natural look
    devV: "M233,32 C236,45 238,58 241,61 C244,58 246,45 249,32"
  }), []);

  // Memoized animation timeline
  const createAnimationTimeline = useMemo(() => {
    return () => {
      const tl = anime.timeline();

      // Get all path elements
      const pathElements = [
        drawRef.current,
        rawRef.current,
        twoRef.current,
        devDRef.current,
        devERef.current,
        devVRef.current
      ].filter(Boolean) as SVGPathElement[];

      // Set up initial states - calculate path lengths and set stroke-dasharray/offset
      pathElements.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
      });

      // Initial state for erase rectangle
      if (eraseRef.current) {
        eraseRef.current.style.width = '0';
        eraseRef.current.style.opacity = '0';
      }

      // Animation sequence: Draw each letter with stroke-dashoffset
      pathElements.forEach((path, index) => {
        tl.add({
          targets: path,
          strokeDashoffset: 0,
          duration: 2000,
          easing: 'easeOutCubic',
          delay: index * 100
        }, 0);
      });

      // Auto-erase with white overlay rectangle after 2s delay
      if (eraseRef.current) {
        tl.add({
          targets: eraseRef.current,
          width: '100%',
          opacity: 1,
          duration: 1000,
          easing: 'easeOutCubic',
          complete: () => {
            onComplete?.();
          }
        }, 3000); // Start after 3 seconds (2s animation + 1s delay)
      }

      return tl;
    };
  }, [onComplete]);

  useEffect(() => {
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
  }, [createAnimationTimeline]);

  return (
    <div className={`logo-reveal ${className}`} aria-label="Draw2Dev logo animation">
      <svg 
        viewBox="0 0 400 100" 
        className="w-full max-w-md mx-auto"
        style={{ overflow: 'visible' }}
      >
        <g stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* D */}
          <path ref={drawRef} d={paths.D} />
          
          {/* raw */}
          <path ref={rawRef} d={paths.raw} />
          
          {/* 2 */}
          <path ref={twoRef} d={paths["2"]} />
          
          {/* D (in Dev) */}
          <path ref={devDRef} d={paths.devD} />
          
          {/* e */}
          <path ref={devERef} d={paths.devE} />
          
          {/* v */}
          <path ref={devVRef} d={paths.devV} />
        </g>
        
        {/* White overlay rectangle for erasing effect */}
        <rect 
          ref={eraseRef}
          x="0"
          y="0"
          height="100"
          fill="#FAFAFA"
          style={{ 
            width: '0',
            opacity: '0',
            transformOrigin: 'left center'
          }}
        />
      </svg>
    </div>
  );
};

export default LogoReveal;