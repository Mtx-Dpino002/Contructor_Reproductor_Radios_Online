import React, { useState, useEffect } from 'react'
import { PANEL_TYPES, PANEL_LABELS } from '../lib/metadata'

function RadioForm({ config, onChange }) {
  const [logoPreview, setLogoPreview] = useState(config.logo)
  const [iconPreview, setIconPreview] = useState(config.icon)

  // Sincronizar previews con config
  useEffect(() => {
    setLogoPreview(config.logo)
  }, [config.logo])

  useEffect(() => {
    setIconPreview(config.icon)
  }, [config.icon])

  const handleInputChange = (field, value) => {
    onChange({ [field]: value })
  }

  const handleFileChange = (field, file) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (field === 'logo') {
          setLogoPreview(reader.result)
        } else if (field === 'icon') {
          setIconPreview(reader.result)
        }
        onChange({ [field]: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Nombre de la emisora */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Nombre de la Emisora
        </label>
        <input
          type="text"
          value={config.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Ej: Radio FM 100.5"
          className="input-field"
        />
      </div>
      {/* URL del streaming */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          URL del Streaming
        </label>
        <input
          type="url"
          value={config.streamUrl}
          onChange={(e) => handleInputChange('streamUrl', e.target.value)}
          placeholder="https://streaming.radio.com/stream.mp3"
          className="input-field"
        />
        <p className="text-xs text-gray-400 mt-1">
          Formatos soportados: MP3, AAC, OGG
        </p>
      </div>

      {/* Configuración de metadatos */}
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="text-sm font-bold text-gray-200 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          Metadatos en Tiempo Real (Opcional)
        </h3>
        
        {/* Tipo de panel */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Tipo de Panel de Radio
          </label>
          <select
            value={config.metadataPanelType || PANEL_TYPES.NONE}
            onChange={(e) => handleInputChange('metadataPanelType', e.target.value)}
            className="input-field"
          >
            {Object.entries(PANEL_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Selecciona el panel que usa tu servidor de streaming
          </p>
        </div>

        {/* URL de la API de metadatos */}
        {config.metadataPanelType && config.metadataPanelType !== PANEL_TYPES.NONE && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                URL de la API de Metadatos
              </label>
              <input
                type="url"
                value={config.metadataApiUrl || ''}
                onChange={(e) => handleInputChange('metadataApiUrl', e.target.value)}
                placeholder={getPlaceholderByPanel(config.metadataPanelType)}
                className="input-field"
              />
              <p className="text-xs text-gray-400 mt-1">
                {getHelpTextByPanel(config.metadataPanelType)}
              </p>
            </div>

            {/* Campo adicional para artwork de RadioBoss */}
            {config.metadataPanelType === PANEL_TYPES.RADIOBOSS && (
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  URL de Artwork/Carátulas (Opcional)
                </label>
                <input
                  type="url"
                  value={config.metadataArtworkUrl || ''}
                  onChange={(e) => handleInputChange('metadataArtworkUrl', e.target.value)}
                  placeholder="Deja vacío para usar el artwork automático de RadioBoss"
                  className="input-field"
                />
                <p className="text-xs text-gray-400 mt-1">
                  ✨ RadioBoss detectará automáticamente las carátulas. Solo completa este campo si quieres usar una URL personalizada con variables: {'{artist}'}, {'{title}'}, {'{album}'}, {'{year}'}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Logo de la emisora */}
      {/* Logo de la emisora */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Logo de la Emisora
        </label>
        <div className="flex items-center space-x-4">
          <label className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
                            text-white text-sm font-medium rounded-lg cursor-pointer 
                            hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Seleccionar imagen
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('logo', e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
          {logoPreview && (
            <img 
              src={logoPreview} 
              alt="Logo preview" 
              className="w-16 h-16 object-cover shadow-md"
              style={{ borderRadius: `${config.logoRoundness}%` }}
            />
          )}
        </div>
        
        {/* Slider de redondez del logo */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Redondez del Logo: {config.logoRoundness}%
          </label>
          <div className="flex items-center space-x-3 max-w-xs">
            <span className="text-xs text-gray-400">0%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={config.logoRoundness}
              onChange={(e) => handleInputChange('logoRoundness', parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #667eea 0%, #667eea ${config.logoRoundness}%, #374151 ${config.logoRoundness}%, #374151 100%)`
              }}
            />
            <span className="text-xs text-gray-400">100%</span>
          </div>
        </div>
      </div>

      {/* Icono de la aplicación */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Icono de la App (512x512 recomendado)
        </label>
        <div className="flex items-center space-x-4">
          <label className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 
                            text-white text-sm font-medium rounded-lg cursor-pointer 
                            hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Seleccionar icono
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('icon', e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
          {iconPreview && (
            <img 
              src={iconPreview} 
              alt="Icon preview" 
              className="w-16 h-16 rounded-lg object-cover shadow-md"
            />
          )}
        </div>
      </div>

      {/* Imagen de fondo de la app */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Imagen de Fondo de la App (Opcional)
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={config.backgroundImage || ''}
            onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
            placeholder="https://ejemplo.com/fondo.jpg o carga una imagen"
            className="input-field"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          O sube una imagen desde tu computadora:
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <label className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                            text-white text-sm font-medium rounded-lg cursor-pointer 
                            hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Subir fondo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('backgroundImage', e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
          {config.backgroundImage && (
            <img 
              src={config.backgroundImage} 
              alt="Background preview" 
              className="w-20 h-16 rounded-lg object-cover shadow-md"
            />
          )}
        </div>
      </div>

    </div>
  )
}

// Funciones auxiliares para los placeholders y textos de ayuda
function getPlaceholderByPanel(panelType) {
  const placeholders = {
    [PANEL_TYPES.AZURACAST]: 'https://turadio.com/api/nowplaying/1',
    [PANEL_TYPES.SHOUTCAST]: 'https://turadio.com:8000/stats?json=1',
    [PANEL_TYPES.ICECAST]: 'https://turadio.com:8000/status-json.xsl',
    [PANEL_TYPES.CENTOVA]: 'https://turadio.com/system/streaminfo.json',
    [PANEL_TYPES.RADIOBOSS]: 'http://192.168.1.100:18000/xml/status.xml',
    [PANEL_TYPES.SONIC]: 'https://turadio.com/cp/get/now_playing',
    [PANEL_TYPES.CASTFM]: 'https://turadio.com/api/v1/nowplaying'
  }
  return placeholders[panelType] || 'https://turadio.com/api'
}

function getHelpTextByPanel(panelType) {
  const helpTexts = {
    [PANEL_TYPES.AZURACAST]: 'Endpoint de AzuraCast: /api/nowplaying/{station_id} (detecta múltiples variaciones)',
    [PANEL_TYPES.SHOUTCAST]: 'Endpoint de SHOUTcast: /stats?json=1 o /currentsong (soporta v1 y v2)',
    [PANEL_TYPES.ICECAST]: 'Endpoint de Icecast: /status-json.xsl',
    [PANEL_TYPES.CENTOVA]: 'Endpoint de Centova: /system/streaminfo.json o /external/rpc.php',
    [PANEL_TYPES.RADIOBOSS]: 'Endpoint de RadioBoss: /xml/status.xml (extrae ARTIST, TITLE, ALBUM, YEAR, GENRE, DURATION)',
    [PANEL_TYPES.SONIC]: 'Endpoint de Sonic Panel: /cp/get/now_playing o /public/nowplaying',
    [PANEL_TYPES.CASTFM]: 'Endpoint de Cast.FM: /api/v1/nowplaying'
  }
  return helpTexts[panelType] || 'Ingresa la URL de tu API de metadatos'
}

export default RadioForm
