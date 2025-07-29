import React from 'react';

const About: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-logo mb-4">About Draw2Dev</h2>
        <p className="text-xl text-gray-700">Bridging the gap between design and development</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white border-4 border-black p-6" 
             style={{ clipPath: 'polygon(2% 0%, 98% 1%, 99% 99%, 1% 98%)' }}>
          <h3 className="text-2xl font-logo mb-4">Our Mission</h3>
          <p className="font-handwriting text-lg leading-relaxed">
            We believe the best ideas start with a simple sketch. Draw2Dev transforms 
            your hand-drawn mockups into clean, production-ready code, making 
            development as intuitive as drawing on paper.
          </p>
        </div>

        {/* How it Works */}
        <div className="bg-white border-4 border-black p-6" 
             style={{ clipPath: 'polygon(1% 2%, 99% 0%, 98% 98%, 2% 100%)' }}>
          <h3 className="text-2xl font-logo mb-4">How It Works</h3>
          <div className="space-y-3 font-handwriting text-lg">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✏️</span>
              <span>Sketch your UI idea on paper</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📸</span>
              <span>Upload a photo of your drawing</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🤖</span>
              <span>AI analyzes and understands your design</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚡</span>
              <span>Get clean React/HTML/CSS code</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white border-4 border-black p-6" 
             style={{ clipPath: 'polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)' }}>
          <h3 className="text-2xl font-logo mb-4">Features</h3>
          <ul className="space-y-2 font-handwriting text-lg">
            <li>✨ Supports React, Vue, HTML/CSS</li>
            <li>📱 Responsive design generation</li>
            <li>🎨 Component-based architecture</li>
            <li>🔧 Tailwind CSS integration</li>
            <li>⚡ Lightning-fast processing</li>
            <li>🔄 Iterative refinement</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="bg-white border-4 border-black p-6" 
             style={{ clipPath: 'polygon(2% 1%, 98% 0%, 99% 98%, 1% 99%)' }}>
          <h3 className="text-2xl font-logo mb-4">Our Vision</h3>
          <p className="font-handwriting text-lg leading-relaxed">
            A world where anyone can turn their creative ideas into functional 
            applications, regardless of their coding experience. We're democratizing 
            software development, one sketch at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;