import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import RadioForm from './components/RadioForm'
import ThemeSelector from './components/ThemeSelector'
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
    metadataArtworkUrl: ''
  })

  const [isPWAGenerated, setIsPWAGenerated] = useState(false)
  const [generatedFiles, setGeneratedFiles] = useState(null)

  const handleConfigChange = (newConfig) => {
    setAppConfig({ ...appConfig, ...newConfig })
  }

  const handlePWAGenerated = (files) => {
    setGeneratedFiles(files)
    setIsPWAGenerated(true)
  }

  const handleReset = () => {
    setIsPWAGenerated(false)
    setGeneratedFiles(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <ExportPanel config={appConfig} />
          </div>

          <div>
            <AppPreview config={appConfig} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
