import React, { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

function LottieAnimation({ animationUrl, width = 100, height = 100, loop = true, autoplay = true }) {
  const [animationData, setAnimationData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!animationUrl) {
      setAnimationData(null)
      return
    }

    // Extraer el ID de la animación de LottieFiles
    // De: https://lottie.host/bc29d99a-c6fd-410f-93a0-eaf14d7b52bd/vk8EXq56xZ.lottie
    // A: https://lottie.host/bc29d99a-c6fd-410f-93a0-eaf14d7b52bd/vk8EXq56xZ.json
    let url = animationUrl
    
    // Si es formato .lottie, usar el embed endpoint
    if (animationUrl.includes('.lottie')) {
      // Cambiar a .json
      url = animationUrl.replace('.lottie', '.json')
    }
    
    console.log('Loading Lottie animation from:', url)

    // Cargar la animación desde la URL
    fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log('Lottie response status:', response.status)
        if (!response.ok) {
          // Intentar con el formato embed alternativo
          const parts = animationUrl.split('/')
          const id = parts[parts.length - 2]
          const altUrl = `https://lottie.host/${id}.json`
          console.log('Trying alternative URL:', altUrl)
          return fetch(altUrl, { mode: 'cors' })
        }
        return response
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to load animation')
        return response.json()
      })
      .then(data => {
        console.log('Lottie animation loaded successfully')
        setAnimationData(data)
        setError(false)
      })
      .catch(err => {
        console.error('Error loading Lottie animation:', err)
        setError(true)
      })
  }, [animationUrl])

  if (!animationUrl) return null
  if (error) return (
    <div style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '12px'
    }}>
      🎵
    </div>
  )
  if (!animationData) return (
    <div style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="spinner"></div>
    </div>
  )

  return (
    <Lottie 
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`
      }}
    />
  )
}

export default LottieAnimation
