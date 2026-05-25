import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">PWA Builder</h3>
            <p className="text-gray-400 text-sm">
              Constructor de aplicaciones móviles para radios online sin necesidad de código.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Características</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>✓ Constructor visual</li>
              <li>✓ Exportación PWA</li>
              <li>✓ Compatible con Android</li>
              <li>✓ Instalable desde el navegador</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-xs">React</span>
              <span className="bg-purple-600 px-3 py-1 rounded-full text-xs">Vite</span>
              <span className="bg-cyan-600 px-3 py-1 rounded-full text-xs">TailwindCSS</span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-xs">PWA</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} PWA Builder. Creado con ❤️ para la comunidad de radio online.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
