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
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          📻 Nombre de la Emisora
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
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          🌐 URL del Streaming
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
          <span className="mr-2">🎵</span>
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
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          🖼️ Logo de la Emisora
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('logo', e.target.files[0])}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-primary-50 file:text-primary-700 
                       hover:file:bg-primary-100 cursor-pointer"
          />
          {logoPreview && (
            <img 
              src={logoPreview} 
              alt="Logo preview" 
              className="w-16 h-16 rounded-lg object-cover shadow-md"
            />
          )}
        </div>
      </div>

      {/* Icono de la aplicación */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          📱 Icono de la App (512x512 recomendado)
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('icon', e.target.files[0])}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-primary-50 file:text-primary-700 
                       hover:file:bg-primary-100 cursor-pointer"
          />
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
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          🎨 Imagen de Fondo de la App (Opcional)
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('backgroundImage', e.target.files[0])}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-primary-50 file:text-primary-700 
                       hover:file:bg-primary-100 cursor-pointer"
          />
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
