import React, { useState, useEffect, useCallback } from 'react';
import LogoReveal from '../components/LogoReveal';
import NavButton from '../components/NavButton';
import HeroAnimation from '../components/HeroAnimation';
import Modal from '../components/Modal';

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className = '' }) => {
  // Modal state management
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    variant: 'waitlist' | 'contact';
  }>({
    isOpen: false,
    variant: 'waitlist'
  });

  // Animation phase state
  const [animationPhase, setAnimationPhase] = useState<{
    logoComplete: boolean;
    layoutVisible: boolean;
    heroStarted: boolean;
  }>({
    logoComplete: false,
    layoutVisible: false,
    heroStarted: false
  });

  // Animation coordination - follows the exact timing requirements
  useEffect(() => {
    // Phase 1: LogoReveal draws and erases (0-3s)
    // The LogoReveal component handles this internally
    
    // Phase 2: Main layout fades in at 3s
    const layoutTimer = setTimeout(() => {
      setAnimationPhase(prev => ({
        ...prev,
        logoComplete: true,
        layoutVisible: true
      }));
    }, 3000);

    // Phase 3: HeroAnimation starts at 3.5s
    const heroTimer = setTimeout(() => {
      setAnimationPhase(prev => ({
        ...prev,
        heroStarted: true
      }));
    }, 3500);

    // Cleanup timers
    return () => {
      clearTimeout(layoutTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  // Modal handlers
  const openModal = useCallback((variant: 'waitlist' | 'contact') => {
    setModalState({ isOpen: true, variant });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Animation class helpers
  const getLayoutAnimationClasses = (baseClasses: string) => {
    return `${baseClasses} transition-all duration-1000 ease-out ${
      animationPhase.layoutVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    }`;
  };

  const getStaggeredAnimationClasses = (baseClasses: string, _delay: number) => {
    return `${baseClasses} transition-all duration-1000 ease-out ${
      animationPhase.layoutVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    }`;
  };

  return (
    <div className={`min-h-screen bg-paper paper-texture ${className}`}>
      <div 
        className="container mx-auto px-4 py-8"
        role="main"
        aria-label="Draw2Dev home page"
      >
        {/* Logo Reveal Section - Always visible during animation */}
        <section 
          className={`relative z-10 mb-16 transition-opacity duration-500 ${
            animationPhase.logoComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Logo animation"
        >
          <div className="flex justify-center items-center min-h-[200px]">
            <LogoReveal className="max-w-lg" />
          </div>
        </section>

        {/* Main Content - Fades in after logo completes */}
        <div 
          className={`relative z-5 ${
            animationPhase.layoutVisible ? 'block' : 'hidden'
          }`}
        >
          {/* Navigation Section */}
          <nav 
            className={getLayoutAnimationClasses('mb-12')}
            aria-label="Main navigation"
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex justify-center items-center gap-8 flex-wrap md:flex-row flex-col md:gap-8 gap-4">
              <NavButton
                onClick={() => {/* TODO: Navigate to About */}}
                aria-label="Learn about Draw2Dev"
                className="text-lg font-handwriting px-6 py-3"
              >
                About
              </NavButton>
              
              <NavButton
                onClick={() => {/* TODO: Navigate to Gallery */}}
                aria-label="View example gallery"
                className="text-lg font-handwriting px-6 py-3"
              >
                Gallery
              </NavButton>
              
              <NavButton
                onClick={() => {/* TODO: Navigate to Team */}}
                aria-label="Meet the team"
                className="text-lg font-handwriting px-6 py-3"
              >
                Team
              </NavButton>
            </div>
          </nav>

          {/* Hero Animation Section */}
          <section 
            className={getStaggeredAnimationClasses('mb-16', 200)}
            aria-label="Draw2Dev concept demonstration"
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex justify-center items-center">
              {animationPhase.heroStarted && (
                <HeroAnimation 
                  className="w-full max-w-5xl"
                  onComplete={() => {
                    // Optional: Handle hero animation completion
                    console.log('Hero animation completed');
                  }}
                />
              )}
            </div>
            
            {/* Hero Description Text */}
            <div 
              className={getStaggeredAnimationClasses('text-center mt-8', 400)}
              style={{ transitionDelay: '400ms' }}
            >
              <h2 className="text-3xl font-logo text-ink mb-4">
                Turn Sketches into Code
              </h2>
              <p className="text-xl font-handwriting text-ink max-w-2xl mx-auto leading-relaxed">
                Draw your ideas on paper, snap a photo, and watch as Draw2Dev transforms your sketches into working code.
              </p>
            </div>
          </section>

          {/* Action Buttons Section */}
          <section 
            className={getStaggeredAnimationClasses('text-center', 600)}
            aria-label="Get started with Draw2Dev"
            style={{ transitionDelay: '600ms' }}
          >
            <div className="flex justify-center items-center gap-6 flex-wrap md:flex-row flex-col md:gap-6 gap-4">
              <NavButton
                onClick={() => openModal('waitlist')}
                aria-label="Join the Draw2Dev waitlist"
                className="text-xl font-handwriting px-8 py-4 transform hover:-translate-y-1 transition-all duration-200"
              >
                Join Waitlist
              </NavButton>
              
              <NavButton
                onClick={() => openModal('contact')}
                aria-label="Contact the Draw2Dev team"
                className="text-xl font-handwriting px-8 py-4 transform hover:-translate-y-1 transition-all duration-200"
              >
                Contact Us
              </NavButton>
            </div>

            {/* Additional Info */}
            <div 
              className={getStaggeredAnimationClasses('mt-8', 800)}
              style={{ transitionDelay: '800ms' }}
            >
              <p className="text-lg font-handwriting text-ink opacity-80">
                Coming soon • Be the first to know when we launch
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        variant={modalState.variant}
        className="backdrop-blur-sm"
      />

    </div>
  );
};

export default Home;