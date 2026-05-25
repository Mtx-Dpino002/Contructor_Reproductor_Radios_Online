import React from 'react'

function ThemeSelector({ config, onChange }) {
  const handleColorChange = (field, value) => {
    onChange({ [field]: value })
  }

  const handleToggle = (field) => {
    onChange({ [field]: !config[field] })
  }

  const handleOpacityChange = (value) => {
    onChange({ overlayOpacity: parseInt(value) })
  }

  const handleFontChange = (value) => {
    onChange({ fontFamily: value })
  }

  // Fuentes disponibles de Google Fonts
  const availableFonts = [
    { name: 'Inter', category: 'Sans-serif moderna' },
    { name: 'Roboto', category: 'Sans-serif clásica' },
    { name: 'Poppins', category: 'Sans-serif redondeada' },
    { name: 'Montserrat', category: 'Sans-serif elegante' },
    { name: 'Open Sans', category: 'Sans-serif versátil' },
    { name: 'Lato', category: 'Sans-serif suave' },
    { name: 'Raleway', category: 'Sans-serif refinada' },
    { name: 'Nunito', category: 'Sans-serif amigable' },
    { name: 'Playfair Display', category: 'Serif elegante' },
    { name: 'Merriweather', category: 'Serif tradicional' },
    { name: 'Oswald', category: 'Sans-serif condensada' },
    { name: 'Ubuntu', category: 'Sans-serif moderna' },
    { name: 'Mukta', category: 'Sans-serif limpia' },
    { name: 'Quicksand', category: 'Sans-serif redondeada' },
    { name: 'Work Sans', category: 'Sans-serif geométrica' },
    { name: 'Rubik', category: 'Sans-serif redondeada' },
    { name: 'Barlow', category: 'Sans-serif moderna' },
    { name: 'Noto Sans', category: 'Sans-serif universal' },
    { name: 'Josefin Sans', category: 'Sans-serif vintage' },
    { name: 'Bebas Neue', category: 'Sans-serif display' },
    { name: 'PT Sans', category: 'Sans-serif humanista' },
    { name: 'Karla', category: 'Sans-serif grotesca' },
    { name: 'Source Sans Pro', category: 'Sans-serif clásica' },
    { name: 'DM Sans', category: 'Sans-serif geométrica' },
    { name: 'Manrope', category: 'Sans-serif moderna' },
    { name: 'Outfit', category: 'Sans-serif redondeada' },
    { name: 'Space Grotesk', category: 'Sans-serif display' },
    { name: 'Cabin', category: 'Sans-serif humanista' },
    { name: 'Exo 2', category: 'Sans-serif futurista' },
    { name: 'Hind', category: 'Sans-serif industrial' },
    { name: 'Titillium Web', category: 'Sans-serif display' },
    { name: 'Anton', category: 'Sans-serif impacto' },
    { name: 'Fjalla One', category: 'Sans-serif condensada' },
    { name: 'Kanit', category: 'Sans-serif geométrica' },
    { name: 'Oxygen', category: 'Sans-serif universal' },
    { name: 'IBM Plex Sans', category: 'Sans-serif corporativa' },
    { name: 'Libre Franklin', category: 'Sans-serif grotesca' },
    { name: 'Epilogue', category: 'Sans-serif moderna' },
    { name: 'Lexend', category: 'Sans-serif legible' },
    { name: 'Plus Jakarta Sans', category: 'Sans-serif geométrica' },
    { name: 'Red Hat Display', category: 'Sans-serif display' },
    { name: 'Sora', category: 'Sans-serif geométrica' },
    { name: 'Archivo', category: 'Sans-serif grotesca' },
    { name: 'Heebo', category: 'Sans-serif versátil' },
    { name: 'Questrial', category: 'Sans-serif moderna' },
    { name: 'Comfortaa', category: 'Sans-serif redondeada' },
    { name: 'Varela Round', category: 'Sans-serif redondeada' },
    { name: 'Arimo', category: 'Sans-serif humanista' },
    { name: 'Asap', category: 'Sans-serif contemporánea' },
    { name: 'Mulish', category: 'Sans-serif minimalista' },
    { name: 'Jost', category: 'Sans-serif geométrica' },
    { name: 'Overpass', category: 'Sans-serif grotesca' },
    { name: 'Public Sans', category: 'Sans-serif grotesca' },
    { name: 'Commissioner', category: 'Sans-serif grotesca' },
    { name: 'Alata', category: 'Sans-serif geométrica' },
    { name: 'Catamaran', category: 'Sans-serif moderna' },
    { name: 'Chakra Petch', category: 'Sans-serif display' },
    { name: 'Urbanist', category: 'Sans-serif geométrica' },
    { name: 'Readex Pro', category: 'Sans-serif moderna' },
    { name: 'Sen', category: 'Sans-serif geométrica' },
    { name: 'Satoshi', category: 'Sans-serif moderna' },
    { name: 'Figtree', category: 'Sans-serif geométrica' },
    { name: 'Kumbh Sans', category: 'Sans-serif geométrica' },
    { name: 'Darker Grotesque', category: 'Sans-serif grotesca' },
    { name: 'Encode Sans', category: 'Sans-serif versátil' },
    { name: 'Saira', category: 'Sans-serif display' },
    { name: 'Nanum Gothic', category: 'Sans-serif universal' },
    { name: 'Fira Sans', category: 'Sans-serif humanista' },
    { name: 'Maven Pro', category: 'Sans-serif geométrica' },
    { name: 'Signika', category: 'Sans-serif humanista' },
    { name: 'Yantramanav', category: 'Sans-serif geométrica' },
    { name: 'Alice', category: 'Serif clásica' },
    { name: 'Lora', category: 'Serif contemporánea' },
    { name: 'Crimson Text', category: 'Serif tradicional' },
    { name: 'Libre Baskerville', category: 'Serif clásica' },
    { name: 'EB Garamond', category: 'Serif clásica' },
    { name: 'Cormorant Garamond', category: 'Serif elegante' },
    { name: 'Bitter', category: 'Serif contemporánea' },
    { name: 'Spectral', category: 'Serif moderna' },
    { name: 'Cardo', category: 'Serif clásica' },
    { name: 'Vollkorn', category: 'Serif tradicional' },
    { name: 'Alegreya', category: 'Serif humanista' },
    { name: 'PT Serif', category: 'Serif transicional' },
    { name: 'Arvo', category: 'Serif geométrica' },
    { name: 'Neuton', category: 'Serif tradicional' },
    { name: 'Zilla Slab', category: 'Slab serif moderna' },
    { name: 'Rokkitt', category: 'Slab serif display' },
    { name: 'Roboto Slab', category: 'Slab serif mecánica' },
    { name: 'IBM Plex Serif', category: 'Serif corporativa' },
    { name: 'Source Serif Pro', category: 'Serif clásica' },
    { name: 'Merriweather Sans', category: 'Sans-serif humanista' }
  ]

  return (
    <div className="space-y-6">
      {/* Controles circulares elegantes */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Controles de Personalización
        </label>
        <div className="grid grid-cols-5 gap-4">
          {/* Botón Transparente ON/OFF */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleToggle('transparentMode')}
              className={`w-16 h-16 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
                config.transparentMode
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 ring-4 ring-blue-400/50'
                  : 'bg-gradient-to-br from-gray-700 to-gray-800 ring-2 ring-gray-600'
              } flex items-center justify-center`}
            >
              {config.transparentMode ? (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </button>
            <span className="text-xs text-gray-400 mt-2 text-center">Transparente</span>
          </div>

          {/* Botón Color Header */}
          <div className="flex flex-col items-center">
            <label className="relative w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer ring-2 ring-gray-600 hover:ring-primary-500">
              <input
                type="color"
                value={config.headerColor}
                onChange={(e) => handleColorChange('headerColor', e.target.value)}
                className="w-full h-full rounded-full cursor-pointer opacity-0 absolute inset-0"
              />
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.headerColor }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </label>
            <span className="text-xs text-gray-400 mt-2 text-center">Header</span>
          </div>

          {/* Botón Color Footer */}
          <div className="flex flex-col items-center">
            <label className="relative w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer ring-2 ring-gray-600 hover:ring-primary-500">
              <input
                type="color"
                value={config.footerColor}
                onChange={(e) => handleColorChange('footerColor', e.target.value)}
                className="w-full h-full rounded-full cursor-pointer opacity-0 absolute inset-0"
              />
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.footerColor }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </label>
            <span className="text-xs text-gray-400 mt-2 text-center">Footer</span>
          </div>

          {/* Botón Color Texto */}
          <div className="flex flex-col items-center">
            <label className="relative w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer ring-2 ring-gray-600 hover:ring-primary-500">
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="w-full h-full rounded-full cursor-pointer opacity-0 absolute inset-0"
              />
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.textColor }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
            </label>
            <span className="text-xs text-gray-400 mt-2 text-center">Texto</span>
          </div>

          {/* Botón Color Overlay */}
          <div className="flex flex-col items-center">
            <label className="relative w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer ring-2 ring-gray-600 hover:ring-primary-500">
              <input
                type="color"
                value={config.overlayColor}
                onChange={(e) => handleColorChange('overlayColor', e.target.value)}
                className="w-full h-full rounded-full cursor-pointer opacity-0 absolute inset-0"
              />
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.overlayColor }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </label>
            <span className="text-xs text-gray-400 mt-2 text-center">Overlay</span>
          </div>
        </div>
      </div>

      {/* Slider de Opacidad del Overlay */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Opacidad del Overlay: {config.overlayOpacity}%
        </label>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-400">0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={config.overlayOpacity}
            onChange={(e) => handleOpacityChange(e.target.value)}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${config.overlayColor} 0%, ${config.overlayColor} ${config.overlayOpacity}%, #374151 ${config.overlayOpacity}%, #374151 100%)`
            }}
          />
          <span className="text-xs text-gray-400">100%</span>
        </div>
        <div className="mt-3 p-3 rounded-lg" style={{ 
          backgroundColor: config.overlayColor,
          opacity: config.overlayOpacity / 100
        }}>
          <p className="text-center text-sm" style={{ color: config.textColor }}>
            Vista previa del overlay
          </p>
        </div>
      </div>

      {/* Selector de Fuente */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Fuente de Texto
        </label>
        <select
          value={config.fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-100
                     focus:border-primary-500 focus:outline-none cursor-pointer"
          style={{ fontFamily: config.fontFamily }}
        >
          {availableFonts.map((font) => (
            <option 
              key={font.name} 
              value={font.name}
              style={{ fontFamily: font.name }}
            >
              {font.name} - {font.category}
            </option>
          ))}
        </select>
        <div className="mt-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p 
            className="text-center text-base mb-2" 
            style={{ fontFamily: config.fontFamily, color: config.textColor }}
          >
            Vista previa de la fuente
          </p>
          <p 
            className="text-center text-sm opacity-80" 
            style={{ fontFamily: config.fontFamily, color: config.textColor }}
          >
            Así se verá el texto en tu aplicación
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
