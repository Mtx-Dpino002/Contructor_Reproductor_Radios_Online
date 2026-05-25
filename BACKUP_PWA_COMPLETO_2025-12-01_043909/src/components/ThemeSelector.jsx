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

  return (
    <div className="space-y-6">
      {/* Controles circulares elegantes */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-4">
          🎨 Controles de Personalización
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
              <span className="text-2xl">
                {config.transparentMode ? '🔓' : '🔒'}
              </span>
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
                <span className="text-2xl">📱</span>
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
                <span className="text-2xl">⬇️</span>
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
                <span className="text-2xl">📝</span>
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
                <span className="text-2xl">🎭</span>
              </div>
            </label>
            <span className="text-xs text-gray-400 mt-2 text-center">Overlay</span>
          </div>
        </div>
      </div>

      {/* Slider de Opacidad del Overlay */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          🎭 Opacidad del Overlay: {config.overlayOpacity}%
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
    </div>
  )
}

export default ThemeSelector
