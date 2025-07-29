import React from 'react';

const Gallery: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-logo mb-4">Gallery</h2>
        <p className="text-xl text-gray-700">See Draw2Dev in action</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example 1 */}
        <div className="bg-white border-4 border-black p-4 space-y-4" 
             style={{ clipPath: 'polygon(1% 0%, 99% 2%, 98% 100%, 2% 98%)' }}>
          <h3 className="font-logo text-xl">Login Form</h3>
          <div className="space-y-2">
            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-4 text-center">
              <p className="text-sm text-gray-600">📝 Hand-drawn sketch</p>
              <div className="mt-2 space-y-1">
                <div className="h-2 bg-gray-300 rounded mx-8"></div>
                <div className="h-2 bg-gray-300 rounded mx-6"></div>
                <div className="h-6 bg-gray-400 rounded mx-12 mt-3"></div>
              </div>
            </div>
            <div className="text-center text-2xl">↓</div>
            <div className="bg-blue-50 border-2 border-blue-200 p-4">
              <p className="text-sm text-blue-600 mb-2">Generated Code</p>
              <div className="space-y-2">
                <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded text-sm" />
                <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded text-sm" />
                <button className="w-full bg-blue-500 text-white p-2 rounded text-sm">Login</button>
              </div>
            </div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="bg-white border-4 border-black p-4 space-y-4" 
             style={{ clipPath: 'polygon(2% 1%, 98% 0%, 99% 99%, 0% 98%)' }}>
          <h3 className="font-logo text-xl">Dashboard</h3>
          <div className="space-y-2">
            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-4 text-center">
              <p className="text-sm text-gray-600">📊 Chart sketch</p>
              <div className="mt-2 flex justify-center space-x-1">
                <div className="w-3 h-8 bg-gray-300"></div>
                <div className="w-3 h-12 bg-gray-300"></div>
                <div className="w-3 h-6 bg-gray-300"></div>
                <div className="w-3 h-10 bg-gray-300"></div>
              </div>
            </div>
            <div className="text-center text-2xl">↓</div>
            <div className="bg-green-50 border-2 border-green-200 p-4">
              <p className="text-sm text-green-600 mb-2">Generated Chart</p>
              <div className="flex justify-center space-x-1">
                <div className="w-4 h-12 bg-green-400 rounded-t"></div>
                <div className="w-4 h-16 bg-green-500 rounded-t"></div>
                <div className="w-4 h-8 bg-green-300 rounded-t"></div>
                <div className="w-4 h-14 bg-green-600 rounded-t"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Example 3 */}
        <div className="bg-white border-4 border-black p-4 space-y-4" 
             style={{ clipPath: 'polygon(0% 2%, 98% 1%, 100% 98%, 1% 99%)' }}>
          <h3 className="font-logo text-xl">Mobile App</h3>
          <div className="space-y-2">
            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-4 text-center">
              <p className="text-sm text-gray-600">📱 App mockup</p>
              <div className="mt-2 mx-8">
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-8 bg-gray-300 rounded"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            <div className="text-center text-2xl">↓</div>
            <div className="bg-purple-50 border-2 border-purple-200 p-4">
              <p className="text-sm text-purple-600 mb-2">Mobile UI</p>
              <div className="mx-4">
                <div className="bg-purple-200 p-2 rounded mb-2 text-xs text-center">Header</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-purple-300 p-3 rounded text-xs text-center">Card 1</div>
                  <div className="bg-purple-300 p-3 rounded text-xs text-center">Card 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More examples */}
        <div className="bg-white border-4 border-black p-4 text-center" 
             style={{ clipPath: 'polygon(1% 1%, 99% 0%, 98% 99%, 0% 100%)' }}>
          <h3 className="font-logo text-xl mb-4">Navigation Menu</h3>
          <p className="text-sm text-gray-600">From sidebar sketch to responsive nav</p>
        </div>

        <div className="bg-white border-4 border-black p-4 text-center" 
             style={{ clipPath: 'polygon(2% 0%, 100% 1%, 99% 98%, 1% 99%)' }}>
          <h3 className="font-logo text-xl mb-4">E-commerce Card</h3>
          <p className="text-sm text-gray-600">Product layout to component</p>
        </div>

        <div className="bg-white border-4 border-black p-4 text-center" 
             style={{ clipPath: 'polygon(0% 1%, 99% 2%, 100% 99%, 2% 98%)' }}>
          <h3 className="font-logo text-xl mb-4">Form Layouts</h3>
          <p className="text-sm text-gray-600">Complex forms made simple</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg font-handwriting text-gray-600">
          ✨ More examples coming soon! Each sketch becomes production-ready code in seconds.
        </p>
      </div>
    </div>
  );
};

export default Gallery;