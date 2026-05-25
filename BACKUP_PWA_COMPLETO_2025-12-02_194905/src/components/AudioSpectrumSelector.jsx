import React from 'react'
import LottieAnimation from './LottieAnimation'

// Animaciones Lottie gratuitas de espectro de audio
// URLs de LottieFiles públicas y gratuitas
// URLs de animaciones de espectro de audio de LottieFiles
const AUDIO_ANIMATIONS = [
  {
    id: 'none',
    name: 'Sin Animación',
    url: null,
    preview: '🚫'
  },
  {
    id: 'wave1',
    name: 'Ondas Espectro',
    url: 'https://lottie.host/65bdc551-1b46-4e4d-9632-afd407a806a9/ycah2IOiJ4.json',
    preview: '🌊'
  },
  {
    id: 'bars',
    name: 'Barras Audio',
    url: 'https://lottie.host/90053377-ef9e-43f6-a8d8-db8c0f033d88/4VPZmgBwuJ.json',
    preview: '📊'
  },
  {
    id: 'circle',
    name: 'Círculo Pulso',
    url: 'https://lottie.host/0a63acb0-52b5-4a6d-a4bb-2e86d355891d/waSx6mPxpD.json',
    preview: '⭕'
  },
  {
    id: 'equalizer',
    name: 'Ecualizador',
    url: 'https://lottie.host/bc7b7478-d2fc-46be-bc36-844acebdc22c/8tw048pvs2.json',
    preview: '🎚️'
  },
  {
    id: 'wave2',
    name: 'Ondas Fluidas',
    url: 'https://lottie.host/9b11a792-745b-4a35-8481-adaeef9a365a/EygS7ja1GR.json',
    preview: '〰️'
  },
  {
    id: 'pulse',
    name: 'Pulso Radial',
    url: 'https://lottie.host/2068b9f1-0489-4129-8330-b2229832f2b9/qPGKsbWydS.json',
    preview: '💓'
  },
  {
    id: 'wave3',
    name: 'Wave 7',
    url: 'https://lottie.host/4ef098c0-e070-4a33-9ac5-70704ecf8f9a/qZQvTTlSXY.json',
    preview: '🎵'
  },
  {
    id: 'wave4',
    name: 'Wave 8',
    url: 'https://lottie.host/2d7fa7d9-1904-48cf-8687-fd975ba597a7/zpt0RnFvQJ.json',
    preview: '🎶'
  }
]

function AudioSpectrumSelector({ config, onChange }) {
  const handleSelectAnimation = (animationId) => {
    const animation = AUDIO_ANIMATIONS.find(a => a.id === animationId)
    onChange({ 
      audioAnimation: animationId,
      audioAnimationUrl: animation?.url || null
    })
  }

  const selectedAnimation = config.audioAnimation || 'none'

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        Selecciona una animación de espectro de audio para tu aplicación
      </p>

      <div className="grid grid-cols-3 gap-2">
        {AUDIO_ANIMATIONS.map((animation, index) => (
          <button
            key={animation.id}
            onClick={() => handleSelectAnimation(animation.id)}
            className={`
              relative p-2 rounded-lg border transition-all flex flex-col items-center
              ${selectedAnimation === animation.id 
                ? 'border-cyan-500 bg-cyan-500/10 shadow-lg' 
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }
            `}
          >
            {animation.id === 'none' ? (
              <div className="w-16 h-12 flex items-center justify-center text-gray-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-12 flex items-center justify-center">
                <LottieAnimation 
                  animationUrl={animation.url}
                  width={60}
                  height={30}
                  loop={true}
                  autoplay={true}
                />
              </div>
            )}
            <span className="text-[10px] font-semibold text-gray-300 mt-1">
              {animation.id === 'none' ? 'Ninguna' : `Wave ${index}`}
            </span>
            {selectedAnimation === animation.id && (
              <div className="absolute -top-1 -right-1">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedAnimation !== 'none' && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-400">
              Tamaño
            </label>
            <span className="text-xs font-semibold text-cyan-400">
              {config.audioAnimationSize || 120}px
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="300"
            step="10"
            value={config.audioAnimationSize || 120}
            onChange={(e) => onChange({ audioAnimationSize: parseInt(e.target.value) })}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((config.audioAnimationSize || 120) - 60) / 240 * 100}%, #374151 ${((config.audioAnimationSize || 120) - 60) / 240 * 100}%, #374151 100%)`
            }}
          />
          <p className="text-[10px] text-gray-500 italic">
            La animación aparecerá sobre los iconos de redes sociales
          </p>
        </div>
      )}
    </div>
  )
}

export default AudioSpectrumSelector
export { AUDIO_ANIMATIONS }
