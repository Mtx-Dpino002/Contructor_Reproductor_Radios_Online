import React from 'react'

function Header() {
  return (
    <header className="bg-gray-800 shadow-2xl sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PWA Builder</h1>
              <p className="text-sm text-gray-300">Constructor de Apps para Radios</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-300">✨ Sin código · 🚀 Rápido · 📱 PWA</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
