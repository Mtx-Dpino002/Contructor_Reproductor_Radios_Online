import React, { useState, useRef, useEffect } from 'react'
import { fetchMetadata, startMetadataPolling } from '../lib/metadata'
import LottieAnimation from './LottieAnimation'

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

  // Cargar fuente de Google Fonts dinámicamente
  useEffect(() => {
    const fontName = config.fontFamily || 'Inter'
    const linkId = 'google-font-preview'
    
    // Remover link anterior si existe
    const existingLink = document.getElementById(linkId)
    if (existingLink) {
      existingLink.remove()
    }
    
    // Crear nuevo link para la fuente
    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`
    document.head.appendChild(link)
    
    return () => {
      const linkToRemove = document.getElementById(linkId)
      if (linkToRemove) {
        linkToRemove.remove()
      }
    }
  }, [config.fontFamily])

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
        <svg className="w-7 h-7 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
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
              backgroundRepeat: 'no-repeat',
              fontFamily: config.fontFamily || 'Inter'
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
                  className="w-8 h-8 shadow object-cover"
                  style={{ borderRadius: `${config.logoRoundness}%` }}
                />
              ) : (
                <div 
                  className="w-8 h-8 bg-white bg-opacity-20 shadow flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: `${config.logoRoundness}%` }}
                >
                  <span className="text-lg">🎙️</span>
                </div>
              )}
              <h1 className="text-sm font-bold truncate" style={{ color: textColorFinal }}>
                {config.name || 'Mi Radio Online'}
              </h1>
            </div>

            {/* Contenido central */}
            <div className="flex-1 relative z-[2] flex items-center justify-center p-4 pb-20">
              <div className="text-center w-full max-w-xs">
                {/* Carátula: metadata artwork o logo por defecto */}
                {metadata?.artwork ? (
                  <img 
                    src={metadata.artwork} 
                    alt="Carátula"
                    className="w-40 h-40 mx-auto shadow-2xl mb-6 object-cover"
                    style={{ borderRadius: `${config.logoRoundness}%` }}
                  />
                ) : config.logo ? (
                  <img 
                    src={config.logo} 
                    alt={config.name}
                    className="w-32 h-32 mx-auto shadow-lg mb-6 object-cover"
                    style={{ borderRadius: `${config.logoRoundness}%` }}
                  />
                ) : (
                  <div 
                    className="w-32 h-32 mx-auto bg-white bg-opacity-10 shadow-lg mb-6 flex items-center justify-center"
                    style={{ borderRadius: `${config.logoRoundness}%` }}
                  >
                    <span className="text-6xl">🎙️</span>
                  </div>
                )}

                {/* Información de la canción actual */}
                {metadata ? (
                  <div className="mb-4">
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
          {/* Animación de audio sobre redes sociales */}
          {config.audioAnimation && config.audioAnimation !== 'none' && config.audioAnimationUrl && (
            <div className="absolute -top-52 left-0 right-0 flex items-center justify-center z-20">
              <LottieAnimation 
                animationUrl={config.audioAnimationUrl} 
                width={config.audioAnimationSize || 120} 
                height={(config.audioAnimationSize || 120) / 2}
                loop={true}
                autoplay={true}
              />
            </div>
          )}              {/* Redes Sociales - Flotando sobre el footer */}
              {(config.socialFacebook || config.socialX || config.socialInstagram || config.socialTelegram || config.socialTiktok || config.socialWebsite) && (
                <div className="absolute -top-16 left-0 right-0 flex items-center justify-center space-x-2 z-10 px-3">
                  {config.socialFacebook && (
                    <a 
                      href={config.socialFacebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
                      title="Facebook"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  
                  {config.socialX && (
                    <a 
                      href={config.socialX} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
                      title="X (Twitter)"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  
                  {config.socialInstagram && (
                    <a 
                      href={config.socialInstagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
                      title="Instagram"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  
                  {config.socialTelegram && (
                    <a 
                      href={config.socialTelegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
                      title="Telegram"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                  )}
                  
                  {config.socialTiktok && (
                    <a 
                      href={config.socialTiktok} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
                      title="TikTok"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </a>
                  )}
                  
                  {config.socialWebsite && (
                    <a 
                      href={config.socialWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
                      title="Página Web"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
              
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
        <p className="text-sm text-blue-300 text-center flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Esta es una vista previa en tiempo real de tu app
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
