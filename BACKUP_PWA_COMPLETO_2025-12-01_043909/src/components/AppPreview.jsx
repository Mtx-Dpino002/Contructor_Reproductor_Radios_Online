import React, { useState, useRef, useEffect } from 'react'
import { fetchMetadata, startMetadataPolling } from '../lib/metadata'

function AppPreview({ config }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [error, setError] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const audioRef = useRef(null)
  const metadataIntervalRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Efecto para obtener metadatos en tiempo real
  useEffect(() => {
    // Limpiar intervalo anterior
    if (metadataIntervalRef.current) {
      clearInterval(metadataIntervalRef.current)
    }

    // Iniciar polling de metadatos si está configurado
    if (config.metadataPanelType && config.metadataPanelType !== 'none' && config.metadataApiUrl) {
      metadataIntervalRef.current = startMetadataPolling(
        config.metadataPanelType,
        config.metadataApiUrl,
        (data) => {
          if (data) {
            setMetadata(data)
          }
        },
        10000, // Actualizar cada 10 segundos
        config.metadataArtworkUrl || null // URL de artwork para RadioBoss
      )
    } else {
      setMetadata(null)
    }

    // Cleanup
    return () => {
      if (metadataIntervalRef.current) {
        clearInterval(metadataIntervalRef.current)
      }
    }
  }, [config.metadataPanelType, config.metadataApiUrl, config.metadataArtworkUrl])

  const handlePlayPause = async () => {
    if (!config.streamUrl) {
      setError('Por favor, ingresa una URL de streaming')
      return
    }

    try {
      setError(null)
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        await audioRef.current.play()
        setIsPlaying(true)
        setIsLoading(false)
      }
    } catch (err) {
      setError('Error al reproducir el stream')
      setIsLoading(false)
      console.error(err)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  // Calcular colores basados en transparentMode - USAR SOLO COLORES PERSONALIZADOS
  const bgColor = config.transparentMode ? 'transparent' : '#1e293b'
  const textColorFinal = config.textColor || '#ffffff'
  const headerBg = config.transparentMode ? 'transparent' : (config.headerColor || '#667eea')
  const footerBg = config.transparentMode ? 'transparent' : (config.footerColor || '#764ba2')

  // Debug: Log de configuración
  console.log('AppPreview Config:', {
    transparentMode: config.transparentMode,
    headerColor: config.headerColor,
    footerColor: config.footerColor,
    textColor: config.textColor,
    overlayColor: config.overlayColor,
    overlayOpacity: config.overlayOpacity
  })

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="text-3xl mr-3">📱</span>
        Vista Previa en Tiempo Real
      </h2>

      {/* Simulación de dispositivo móvil */}
      <div className="relative mx-auto max-w-sm">
        {/* Marco del dispositivo - Diseño moderno */}
        <div className="relative rounded-[2.5rem] border-[8px] border-gray-700 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black ring-2 ring-primary-500/30 ring-offset-2 ring-offset-gray-800">
          {/* Notch minimalista y delgado */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-black rounded-b-xl z-10 flex items-center justify-center">
            <div className="w-10 h-0.5 bg-gray-800 rounded-full"></div>
            <div className="absolute right-1.5 top-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
          
          {/* Pantalla */}
          <div 
            className="relative aspect-[9/19.5] flex flex-col"
            style={{ 
              backgroundColor: bgColor,
              color: textColorFinal,
              backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay si está configurado */}
            {config.overlayOpacity > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                  backgroundColor: config.overlayColor || '#000000',
                  opacity: (config.overlayOpacity || 0) / 100
                }}
              />
            )}

            {/* Header de la app - compacto en una línea */}
            <div 
              className="px-6 py-2 relative z-[2] flex-shrink-0 flex items-center space-x-3"
              style={{ 
                backgroundColor: headerBg
              }}
            >
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt={config.name}
                  className="w-8 h-8 rounded-lg shadow object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg shadow flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎙️</span>
                </div>
              )}
              <h1 className="text-sm font-bold truncate" style={{ color: textColorFinal }}>
                {config.name || 'Mi Radio Online'}
              </h1>
            </div>

            {/* Contenido central */}
            <div className="flex-1 relative z-[2] flex items-center justify-center p-4">
              <div className="text-center w-full max-w-xs">
                {/* Carátula: metadata artwork o logo por defecto */}
                {metadata?.artwork ? (
                  <img 
                    src={metadata.artwork} 
                    alt="Carátula"
                    className="w-40 h-40 mx-auto rounded-2xl shadow-2xl mb-4 object-cover"
                  />
                ) : config.logo ? (
                  <img 
                    src={config.logo} 
                    alt={config.name}
                    className="w-32 h-32 mx-auto rounded-2xl shadow-lg mb-4 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto bg-white bg-opacity-10 rounded-2xl shadow-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🎙️</span>
                  </div>
                )}

                {/* Información de la canción actual */}
                {metadata ? (
                  <div className="mb-3">
                    <h2 className="text-base font-bold mb-1 truncate" style={{ color: textColorFinal }}>
                      {metadata.title}
                    </h2>
                    <p className="text-sm opacity-80 truncate" style={{ color: textColorFinal }}>
                      {metadata.artist}
                    </p>
                    {metadata.album && (
                      <p className="text-xs opacity-60 truncate mt-1" style={{ color: textColorFinal }}>
                        {metadata.album}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm opacity-70 mb-3" style={{ color: textColorFinal }}>
                    Transmisión en vivo · 24/7
                  </p>
                )}
                
                {/* Mensaje de error */}
                {error && (
                  <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-lg">
                    <p className="text-red-300 text-xs">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Reproductor compacto en una línea */}
            <div 
              className="px-3 py-2 relative z-[2] flex-shrink-0"
              style={{ backgroundColor: footerBg }}
            >
              {/* Controles en una sola línea */}
              <div className="flex items-center space-x-3">
                  {/* Botón Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center 
                               transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex-shrink-0"
                    style={{ backgroundColor: config.headerColor || '#667eea' }}
                  >
                    {isLoading ? (
                      <div className="spinner border-white w-4 h-4"></div>
                    ) : isPlaying ? (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Control de volumen con icono */}
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-sm flex-shrink-0" style={{ color: textColorFinal }}>🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${config.headerColor || '#667eea'} 0%, ${config.headerColor || '#667eea'} ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`
                      }}
                    />
                    <span className="text-xs w-8 text-right flex-shrink-0" style={{ color: textColorFinal }}>{Math.round(volume * 100)}%</span>
                  </div>

                  {/* Indicador de estado */}
                  {isPlaying && (
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
                  )}
                </div>
            </div>
          </div>
        </div>

        {/* Audio element (oculto) */}
        <audio
          ref={audioRef}
          src={config.streamUrl}
          preload="none"
          onError={() => {
            setError('No se pudo cargar el stream')
            setIsLoading(false)
            setIsPlaying(false)
          }}
        />
      </div>

      {/* Indicador de configuración */}
      <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
        <p className="text-sm text-blue-300 text-center">
          ℹ️ Esta es una vista previa en tiempo real de tu app
        </p>
      </div>

      {/* Simulación de icono en pantalla de inicio */}
      {config.icon && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-200 mb-3 text-center">
            📱 Así se verá el icono en la pantalla de inicio
          </h3>
          <div className="flex justify-center items-center space-x-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl shadow-lg overflow-hidden mb-2 mx-auto">
                <img 
                  src={config.icon} 
                  alt="App icon" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-400 max-w-[64px] truncate">
                {config.name || 'Mi Radio'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppPreview
