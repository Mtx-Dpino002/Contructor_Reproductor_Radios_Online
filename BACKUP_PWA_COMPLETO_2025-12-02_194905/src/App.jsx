import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import RadioForm from './components/RadioForm'
import ThemeSelector from './components/ThemeSelector'
import SocialLinks from './components/SocialLinks'
import AudioSpectrumSelector from './components/AudioSpectrumSelector'
import AppPreview from './components/AppPreview'
import ExportPanel from './components/ExportPanel'
import ReadyPWA from './components/ReadyPWA'

function App() {
  const [appConfig, setAppConfig] = useState({
    name: 'Mi Radio Online',
    logo: null,
    streamUrl: '',
    primaryColor: '#0ea5e9',
    secondaryColor: '#8b5cf6',
    playerColor: '#1e293b',
    icon: null,
    transparentMode: false,
    headerColor: '#667eea',
    footerColor: '#764ba2',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0,
    backgroundImage: null,
    metadataPanelType: 'none',
    metadataApiUrl: '',
    metadataArtworkUrl: '',
    logoRoundness: 0,
    fontFamily: 'Inter',
    socialFacebook: '',
    socialX: '',
    socialInstagram: '',
    socialTelegram: '',
    socialTiktok: '',
    socialWebsite: '',
    audioAnimation: 'none',
    audioAnimationUrl: null,
    audioAnimationSize: 120
  })

  const [isPWAGenerated, setIsPWAGenerated] = useState(false)
  const [generatedFiles, setGeneratedFiles] = useState(null)

  const handleConfigChange = (newConfig) => {
    setAppConfig({ ...appConfig, ...newConfig })
  }

  const handleLoadConfig = (loadedConfig) => {
    setAppConfig(loadedConfig)
  }

  const handleNewProject = () => {
    setAppConfig({
      name: 'Mi Radio Online',
      logo: null,
      streamUrl: '',
      primaryColor: '#0ea5e9',
      secondaryColor: '#8b5cf6',
      playerColor: '#1e293b',
      icon: null,
      transparentMode: false,
      headerColor: '#667eea',
      footerColor: '#764ba2',
      textColor: '#ffffff',
      overlayColor: '#000000',
      overlayOpacity: 0,
      backgroundImage: null,
      metadataPanelType: 'none',
      metadataApiUrl: '',
      metadataArtworkUrl: '',
      logoRoundness: 0,
      fontFamily: 'Inter',
      socialFacebook: '',
      socialX: '',
      socialInstagram: '',
      socialTelegram: '',
      socialTiktok: '',
      socialWebsite: '',
      audioAnimation: 'none',
      audioAnimationUrl: null,
      audioAnimationSize: 120
    })
  }

  const handlePWAGenerated = (files) => {
    setGeneratedFiles(files)
    setIsPWAGenerated(true)
  }

  const handleReset = () => {
    setIsPWAGenerated(false)
    setGeneratedFiles(null)
  }

  const handleSaveProject = () => {
    const projectData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      config: appConfig
    }
    const jsonString = JSON.stringify(projectData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const defaultName = appConfig.name ? appConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'mi-radio'
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${defaultName}-proyecto.pwacfg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header 
        config={appConfig}
        onLoadConfig={handleLoadConfig}
        onNewProject={handleNewProject}
        onSaveProject={handleSaveProject}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Constructor de App</h2>
              <RadioForm 
                config={appConfig} 
                onChange={handleConfigChange} 
              />
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Personalización de Tema</h2>
              <ThemeSelector 
                config={appConfig} 
                onChange={handleConfigChange} 
              />
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Redes Sociales
              </h2>
              <SocialLinks 
                config={appConfig} 
                onChange={handleConfigChange} 
              />
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Animación de Audio
              </h2>
              <AudioSpectrumSelector 
                config={appConfig} 
                onChange={handleConfigChange} 
              />
            </div>

            <ExportPanel config={appConfig} />
          </div>

          <div className="lg:sticky lg:top-4">
            <AppPreview config={appConfig} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
