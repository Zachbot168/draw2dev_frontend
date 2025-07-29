
import { useState } from 'react';
import LogoRevealSmooth from './components/LogoReveal-smooth';
import NavButtonSimple from './components/NavButton-simple';
import { AnimatedPencil, AnimatedComputer, AnimatedArrow } from './components/SketchIcons';
import { WaitlistModal, ContactModal } from './components/SimpleModal';
import About from './sections/About';
import Gallery from './sections/Gallery';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'about' | 'gallery' | 'updates' | 'team'>('home');
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink font-handwriting">
      <div className="container mx-auto px-4 py-8">
        {!showContent ? (
          <div className="flex items-center justify-center min-h-screen">
            <LogoRevealSmooth onComplete={() => setShowContent(true)} />
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            {/* Navigation */}
            <nav className="flex justify-center space-x-6 mb-8">
              <NavButtonSimple 
                onClick={() => setCurrentSection('home')} 
                aria-label="Go to Home"
                className={currentSection === 'home' ? 'bg-ink text-paper' : ''}
              >
                Home
              </NavButtonSimple>
              <NavButtonSimple 
                onClick={() => setCurrentSection('about')} 
                aria-label="About Draw2Dev"
                className={currentSection === 'about' ? 'bg-ink text-paper' : ''}
              >
                About
              </NavButtonSimple>
              <NavButtonSimple 
                onClick={() => setCurrentSection('gallery')} 
                aria-label="View Gallery"
                className={currentSection === 'gallery' ? 'bg-ink text-paper' : ''}
              >
                Gallery
              </NavButtonSimple>
              <NavButtonSimple 
                onClick={() => setCurrentSection('updates')} 
                aria-label="Latest Updates"
                className={currentSection === 'updates' ? 'bg-ink text-paper' : ''}
              >
                Updates
              </NavButtonSimple>
              <NavButtonSimple 
                onClick={() => setCurrentSection('team')} 
                aria-label="Meet the Team"
                className={currentSection === 'team' ? 'bg-ink text-paper' : ''}
              >
                Team
              </NavButtonSimple>
            </nav>

            {/* Content Area */}
            {currentSection === 'home' && (
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl font-logo">
                    Draw2Dev
                  </h1>
                  <p className="text-2xl text-gray-700">
                    Turn Sketches into Code
                  </p>
                </div>

                {/* Hero Animation Area */}
                <div className="bg-white border-4 border-black border-dashed p-8 mx-auto max-w-4xl" 
                     style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 100%, 2% 98%)' }}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-12">
                      <div className="w-24 h-24 flex items-center justify-center">
                        <AnimatedPencil className="w-20 h-20" />
                      </div>
                      <div className="w-16 h-16 flex items-center justify-center">
                        <AnimatedArrow className="w-12 h-12" />
                      </div>
                      <div className="w-24 h-24 flex items-center justify-center">
                        <AnimatedComputer className="w-20 h-20" />
                      </div>
                    </div>
                    <p className="text-xl font-handwriting">
                      Draw a mockup, get production code instantly
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>✏️ Sketch your UI concept on paper</p>
                      <p>📸 Take a photo or upload your drawing</p>
                      <p>⚡ Get clean, responsive code in seconds</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="max-w-3xl mx-auto space-y-4">
                  <p className="text-xl">
                    Transform your hand-drawn mockups into production-ready code instantly.
                  </p>
                  <p className="text-lg text-gray-600">
                    Sketch your UI ideas on paper, take a photo, and watch as Draw2Dev 
                    generates clean, responsive code using the latest web technologies.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-6 pt-8">
                  <NavButtonSimple 
                    onClick={() => setShowWaitlistModal(true)} 
                    aria-label="Join the waitlist"
                    className="bg-ink text-paper"
                  >
                    Join Waitlist
                  </NavButtonSimple>
                  <NavButtonSimple 
                    onClick={() => setShowContactModal(true)} 
                    aria-label="Contact us"
                  >
                    Contact Us
                  </NavButtonSimple>
                </div>
              </div>
            )}

            {currentSection === 'about' && <About />}
            {currentSection === 'gallery' && <Gallery />}
            {currentSection === 'updates' && (
              <div className="text-center space-y-8">
                <h2 className="text-4xl font-logo">Updates</h2>
                <div className="bg-white border-4 border-black p-8 max-w-2xl mx-auto"
                     style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 100%, 2% 98%)' }}>
                  <p className="text-xl font-handwriting">
                    🚀 Coming Soon! We're working hard to bring you the latest updates and features.
                  </p>
                </div>
              </div>
            )}
            {currentSection === 'team' && (
              <div className="text-center space-y-8">
                <h2 className="text-4xl font-logo">Team</h2>
                <div className="bg-white border-4 border-black p-8 max-w-2xl mx-auto"
                     style={{ clipPath: 'polygon(2% 0%, 98% 1%, 99% 99%, 1% 98%)' }}>
                  <p className="text-xl font-handwriting">
                    👋 Meet the team behind Draw2Dev - passionate developers and designers working to bridge the gap between creativity and code.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Modals */}
      <WaitlistModal 
        isOpen={showWaitlistModal} 
        onClose={() => setShowWaitlistModal(false)} 
      />
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
}

export default App