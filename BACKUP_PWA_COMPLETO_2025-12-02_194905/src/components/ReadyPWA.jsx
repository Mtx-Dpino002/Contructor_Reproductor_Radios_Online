import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { exportToZip } from '../lib/zipExport'

function ReadyPWA({ config, files, onReset }) {
  const handleDownload = async () => {
    try {
      await exportToZip(files, config.name)
    } catch (err) {
      console.error('Error al descargar:', err)
      alert('Error al descargar el archivo ZIP')
    }
  }

  // URL de ejemplo (en producción sería la URL real donde se desplegó)
  const appUrl = 'https://tudominio.com/tu-radio-app'

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Celebración */}
      <div className="text-center mb-8">
        <div className="inline-block p-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
          <span className="text-6xl">🎉</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          ¡Tu PWA está lista!
        </h1>
        <p className="text-xl text-gray-600">
          Tu aplicación para radio ha sido generada exitosamente
        </p>
      </div>

      {/* Resumen de la app */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">📱</span>
          Resumen de tu App
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vista previa */}
          <div className="space-y-4">
            {config.logo && (
              <div className="flex justify-center">
                <img 
                  src={config.logo} 
                  alt={config.name}
                  className="w-32 h-32 rounded-2xl shadow-lg object-cover"
                />
              </div>
            )}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">{config.name}</h3>
              <p className="text-gray-600 text-sm mt-1">Aplicación PWA de Radio</p>
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎨</span>
              <div>
                <p className="text-sm text-gray-600">Tema</p>
                <p className="font-semibold text-gray-800 capitalize">{config.theme}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎨</span>
              <div>
                <p className="text-sm text-gray-600">Colores</p>
                <div className="flex space-x-2">
                  <div 
                    className="w-8 h-8 rounded-lg shadow-md"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <div 
                    className="w-8 h-8 rounded-lg shadow-md"
                    style={{ backgroundColor: config.secondaryColor }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌐</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600">URL del Stream</p>
                <p className="font-mono text-xs text-gray-800 truncate">{config.streamUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Descargar ZIP */}
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-center mb-4">
            <span className="text-5xl">📦</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Descargar Archivos
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Obtén todos los archivos de tu PWA en un ZIP
          </p>
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white 
                       px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 
                       transition-all duration-200 active:scale-95 shadow-lg"
          >
            📥 Descargar ZIP
          </button>
        </div>

        {/* QR Code */}
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="text-center mb-4">
            <span className="text-5xl">📱</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Instalar PWA
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Escanea el QR para instalar en tu móvil
          </p>
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <QRCodeSVG 
              value={appUrl} 
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Una vez desplegado, actualiza esta URL
          </p>
        </div>
      </div>

      {/* Siguiente pasos */}
      <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-3xl mr-3">🚀</span>
          Próximos Pasos
        </h3>
        <ol className="space-y-3 list-decimal list-inside text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <div>
              <strong>Descargar archivos:</strong> Descarga el ZIP con todos los archivos de tu PWA
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <div>
              <strong>Subir a tu servidor:</strong> Descomprime y sube los archivos a tu hosting (debe tener HTTPS)
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <div>
              <strong>Instalar PWA:</strong> Abre la URL desde un navegador móvil y selecciona "Añadir a pantalla de inicio"
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <div>
              <strong>Convertir a APK:</strong> Usa Bubblewrap o PWABuilder.com para crear un APK para Google Play
            </div>
          </li>
        </ol>
      </div>

      {/* Archivos generados */}
      <div className="card mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-3xl mr-3">📄</span>
          Archivos Generados
        </h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="space-y-1">
            {files && Object.keys(files).map((fileName, index) => (
              <div key={index} className="flex items-center">
                <span className="text-blue-400 mr-2">📄</span>
                <span>{fileName}</span>
                <span className="ml-auto text-gray-500">
                  {(files[fileName].length / 1024).toFixed(1)} KB
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón para crear otra app */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                     px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 
                     transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl
                     inline-flex items-center space-x-2"
        >
          <span>✨</span>
          <span>Crear otra PWA</span>
        </button>
      </div>
    </div>
  )
}

export default ReadyPWA
