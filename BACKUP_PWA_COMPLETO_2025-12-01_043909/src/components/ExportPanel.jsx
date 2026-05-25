import React, { useState } from 'react'
import { generatePWA } from '../lib/generator'
import { exportToZip } from '../lib/zipExport'

function ExportPanel({ config, onGenerated }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const validateConfig = () => {
    if (!config.name || config.name.trim() === '') {
      return 'Por favor, ingresa el nombre de la emisora'
    }
    if (!config.streamUrl || config.streamUrl.trim() === '') {
      return 'Por favor, ingresa la URL del streaming'
    }
    return null
  }

  const handleGeneratePWA = async () => {
    const validationError = validateConfig()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generar archivos PWA
      const files = await generatePWA(config)
      
      // Notificar que se generó correctamente
      if (onGenerated) {
        onGenerated(files)
      }
      
    } catch (err) {
      setError('Error al generar la PWA: ' + err.message)
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadZip = async () => {
    const validationError = validateConfig()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generar archivos PWA
      const files = await generatePWA(config)
      
      // Exportar como ZIP
      await exportToZip(files, config.name)
      
      setError(null)
      
    } catch (err) {
      setError('Error al exportar: ' + err.message)
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-primary-500/30">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="text-3xl mr-3">🚀</span>
        Exportar tu PWA
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm">❌ {error}</p>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleGeneratePWA}
          disabled={isGenerating}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="spinner border-white w-5 h-5"></div>
              <span>Generando...</span>
            </>
          ) : (
            <>
              <span>🎯</span>
              <span>Generar PWA</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadZip}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white 
                     px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 
                     transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl 
                     flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="spinner border-white w-5 h-5"></div>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>📦</span>
              <span>Descargar ZIP</span>
            </>
          )}
        </button>
      </div>

      {/* Instrucciones */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="font-bold text-gray-200 mb-2 flex items-center">
          <span className="mr-2">📋</span>
          Instrucciones
        </h3>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li>Haz clic en "Generar PWA" para crear tu aplicación</li>
          <li>Descarga el archivo ZIP con todos los archivos</li>
          <li>Descomprime el ZIP en tu servidor web</li>
          <li>La app será instalable desde el navegador</li>
        </ol>
      </div>

      {/* Convertir a APK */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
        <h3 className="font-bold text-gray-200 mb-2 flex items-center">
          <span className="mr-2">📱</span>
          Convertir a APK para Android
        </h3>
        <p className="text-sm text-gray-300 mb-3">
          Usa <strong>Bubblewrap</strong> para convertir tu PWA a APK:
        </p>
        <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto">
          <div>npm install -g @bubblewrap/cli</div>
          <div>bubblewrap init --manifest https://tudominio.com/manifest.json</div>
          <div>bubblewrap build</div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          💡 También puedes usar <strong>PWABuilder.com</strong> para generar el APK
        </p>
      </div>
    </div>
  )
}

export default ExportPanel
