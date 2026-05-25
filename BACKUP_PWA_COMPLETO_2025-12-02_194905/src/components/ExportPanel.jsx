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
        <svg className="w-7 h-7 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
        </svg>
        Exportar tu PWA
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {error}
          </p>
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Descargar ZIP</span>
            </>
          )}
        </button>
      </div>

      {/* Instrucciones */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="font-bold text-gray-200 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
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
          <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
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
        <p className="text-xs text-gray-400 mt-2 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          También puedes usar <strong>PWABuilder.com</strong> para generar el APK
        </p>
      </div>
    </div>
  )
}

export default ExportPanel
