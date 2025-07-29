import React, { useState } from 'react';
import LogoReveal from '../components/LogoReveal';
import NavButton from '../components/NavButton';

const HomeSimple: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink font-handwriting">
      <div className="container mx-auto px-4 py-8">
        {/* Logo Section */}
        <div className="mb-8">
          <LogoReveal 
            className="mb-8" 
            onComplete={() => setShowContent(true)}
          />
        </div>

        {/* Main Content */}
        {showContent && (
          <div className="space-y-8 fade-in">
            {/* Navigation */}
            <nav className="flex justify-center space-x-4 mb-8">
              <NavButton onClick={() => console.log('About')}>
                About
              </NavButton>
              <NavButton onClick={() => console.log('Gallery')}>
                Gallery
              </NavButton>
              <NavButton onClick={() => console.log('Team')}>
                Team
              </NavButton>
            </nav>

            {/* Hero Text */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-logo">
                Turn Sketches into Code
              </h2>
              <p className="text-xl max-w-2xl mx-auto">
                Transform your hand-drawn mockups into production-ready code instantly with Draw2Dev.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <NavButton onClick={() => console.log('Waitlist')}>
                Join Waitlist
              </NavButton>
              <NavButton onClick={() => console.log('Contact')}>
                Contact Us
              </NavButton>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HomeSimple;