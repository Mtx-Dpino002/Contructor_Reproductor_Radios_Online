import React, { useState } from 'react'

/**
 * Componente para generar paquetes APK desde PWA
 * Ofrece 3 métodos: PWABuilder API, Bubblewrap CLI, y Manual
 */
function APKBuilder({ config, isEnabled }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedInstructions, setGeneratedInstructions] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState('pwabuilder')

  const validateConfig = () => {
    if (!config.name || !config.streamUrl) {
      alert('⚠️ Debes configurar el nombre y URL del stream primero')
      return false
    }
    return true
  }

  const generateBubblewrapScript = () => {
    const appName = config.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const packageName = `com.radio.${appName}`
    const manifestUrl = 'https://tudominio.com/manifest.json' // Usuario debe reemplazar

    return `# Script de generación APK con Bubblewrap
# Paso 1: Instalar Bubblewrap CLI (una sola vez)
npm install -g @bubblewrap/cli

# Paso 2: Sube tu PWA a un servidor HTTPS y actualiza la URL del manifest
# Reemplaza 'https://tudominio.com' con tu dominio real

# Paso 3: Inicializar proyecto APK
bubblewrap init --manifest ${manifestUrl}

# Configuración recomendada:
# - Package Name: ${packageName}
# - App Name: ${config.name}
# - Theme Color: ${config.headerColor || '#667eea'}
# - Background Color: ${config.transparentMode ? 'transparent' : '#1e293b'}

# Paso 4: Compilar APK
bubblewrap build

# Paso 5: El APK estará en:
# ./app-release-signed.apk

# NOTA: Necesitas Java JDK 11+ y Android SDK instalados
# Para instalar dependencias: bubblewrap doctor
`
  }

  const generatePWABuilderInstructions = () => {
    return `# Generación de APK con PWABuilder (Recomendado - Más Fácil)

## Paso 1: Subir tu PWA a un servidor
1. Exporta tu PWA usando el botón "Generar PWA" de arriba
2. Sube TODOS los archivos a tu servidor web con HTTPS
3. Asegúrate que la URL funcione: https://tudominio.com

## Paso 2: Usar PWABuilder
1. Ve a: https://www.pwabuilder.com/
2. Ingresa la URL de tu PWA: https://tudominio.com
3. Click en "Start" para analizar tu PWA
4. Espera a que termine el análisis

## Paso 3: Generar APK
1. Click en la pestaña "Package"
2. Selecciona "Android" en las opciones
3. Configura los detalles:
   - App Name: ${config.name}
   - Package ID: com.radio.${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
   - Host: tudominio.com
   - Start URL: /
4. Click en "Generate Package"
5. Descarga el archivo .apk generado

## Paso 4: Instalar en Android
1. Activa "Orígenes desconocidos" en Configuración > Seguridad
2. Transfiere el APK a tu dispositivo
3. Abre el archivo e instala

## Ventajas de PWABuilder:
✅ No requiere instalación de software
✅ Proceso 100% en la web
✅ APK listo en minutos
✅ Compatible con Google Play Store

## Información de tu App:
- Nombre: ${config.name}
- Package sugerido: com.radio.${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
- Color del tema: ${config.headerColor || '#667eea'}
- Color de fondo: ${config.transparentMode ? 'transparent' : '#1e293b'}
- URL Stream: ${config.streamUrl}
`
  }

  const generateManualInstructions = () => {
    return `# Conversión Manual a APK con Android Studio

## Requisitos Previos:
- Android Studio instalado
- Java JDK 11+
- Tu PWA ya subida a un servidor HTTPS

## Paso 1: Crear proyecto Android
1. Abre Android Studio
2. New Project > Empty Activity
3. Nombre: ${config.name}
4. Package: com.radio.${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
5. Language: Kotlin o Java
6. Minimum SDK: API 21 (Android 5.0)

## Paso 2: Configurar Trusted Web Activity (TWA)
Agrega en build.gradle (app):

dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}

## Paso 3: Configurar AndroidManifest.xml
<activity
    android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
    android:theme="@style/Theme.AppCompat.NoActionBar">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>

<meta-data
    android:name="android.support.customtabs.trusted.DEFAULT_URL"
    android:value="https://tudominio.com" />

## Paso 4: Agregar assetlinks.json
Crea en tu servidor: https://tudominio.com/.well-known/assetlinks.json

[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.radio.${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}",
    "sha256_cert_fingerprints": ["TU_SHA256_AQUI"]
  }
}]

## Paso 5: Compilar APK
1. Build > Build Bundle(s) / APK(s) > Build APK(s)
2. Espera a que termine la compilación
3. El APK estará en: app/build/outputs/apk/release/

## Información de tu App:
- URL: https://tudominio.com (reemplazar con tu dominio)
- Package: com.radio.${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
- Nombre: ${config.name}
`
  }

  const handleGenerateAPK = async () => {
    if (!validateConfig()) return

    setIsGenerating(true)

    // Simular generación de instrucciones
    setTimeout(() => {
      let instructions = ''
      
      switch (selectedMethod) {
        case 'pwabuilder':
          instructions = generatePWABuilderInstructions()
          break
        case 'bubblewrap':
          instructions = generateBubblewrapScript()
          break
        case 'manual':
          instructions = generateManualInstructions()
          break
        default:
          instructions = generatePWABuilderInstructions()
      }

      setGeneratedInstructions(instructions)
      setIsGenerating(false)
    }, 500)
  }

  const handleDownloadInstructions = () => {
    const blob = new Blob([generatedInstructions], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    const methodNames = {
      pwabuilder: 'PWABuilder',
      bubblewrap: 'Bubblewrap',
      manual: 'Manual'
    }
    
    link.download = `${config.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-apk-${selectedMethod}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedInstructions)
      .then(() => alert('✅ Instrucciones copiadas al portapapeles'))
      .catch(() => alert('❌ Error al copiar'))
  }

  if (!isEnabled) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-bold text-white">Generación de APK para Android</h3>
        </div>
        <p className="text-gray-400 mb-4">
          Convierte tu PWA en una aplicación Android instalable (APK).
        </p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-yellow-300 text-sm">
            ⚠️ Primero genera tu PWA usando el botón de arriba
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-bold text-white">Conversión a APK para Android</h3>
      </div>

      <p className="text-gray-300 mb-6">
        Elige un método para convertir tu PWA en una aplicación Android instalable.
      </p>

      {/* Selector de método */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Método de conversión:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedMethod('pwabuilder')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === 'pwabuilder'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 bg-gray-700/50 hover:border-blue-400'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-semibold text-white">PWABuilder</div>
              <div className="text-xs text-gray-400 mt-1">Recomendado</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('bubblewrap')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === 'bubblewrap'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-600 bg-gray-700/50 hover:border-purple-400'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">💻</div>
              <div className="font-semibold text-white">Bubblewrap CLI</div>
              <div className="text-xs text-gray-400 mt-1">Avanzado</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('manual')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === 'manual'
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-600 bg-gray-700/50 hover:border-orange-400'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🛠️</div>
              <div className="font-semibold text-white">Manual</div>
              <div className="text-xs text-gray-400 mt-1">Android Studio</div>
            </div>
          </button>
        </div>
      </div>

      {/* Descripción del método seleccionado */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        {selectedMethod === 'pwabuilder' && (
          <div>
            <h4 className="font-semibold text-white mb-2">✨ PWABuilder (Más Fácil)</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ Proceso 100% en línea</li>
              <li>✅ No requiere instalación de software</li>
              <li>✅ APK listo en minutos</li>
              <li>✅ Compatible con Google Play Store</li>
            </ul>
          </div>
        )}
        {selectedMethod === 'bubblewrap' && (
          <div>
            <h4 className="font-semibold text-white mb-2">⚡ Bubblewrap CLI (Avanzado)</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ Control total sobre la compilación</li>
              <li>✅ Automatización con scripts</li>
              <li>⚠️ Requiere Node.js, Java JDK, Android SDK</li>
              <li>⚠️ Configuración más compleja</li>
            </ul>
          </div>
        )}
        {selectedMethod === 'manual' && (
          <div>
            <h4 className="font-semibold text-white mb-2">🔧 Manual con Android Studio</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ Máximo control y personalización</li>
              <li>✅ Ideal para desarrolladores Android</li>
              <li>⚠️ Requiere Android Studio instalado</li>
              <li>⚠️ Proceso más largo y técnico</li>
            </ul>
          </div>
        )}
      </div>

      {/* Botón de generación */}
      <button
        onClick={handleGenerateAPK}
        disabled={isGenerating}
        className={`w-full py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
          isGenerating
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generando instrucciones...
          </span>
        ) : (
          '📱 Generar Instrucciones para APK'
        )}
      </button>

      {/* Panel de instrucciones generadas */}
      {generatedInstructions && (
        <div className="mt-6 bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <h4 className="font-semibold text-white">📋 Instrucciones Generadas</h4>
            <div className="flex gap-2">
              <button
                onClick={handleCopyToClipboard}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                📋 Copiar
              </button>
              <button
                onClick={handleDownloadInstructions}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
              >
                💾 Descargar
              </button>
            </div>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {generatedInstructions}
            </pre>
          </div>
        </div>
      )}

      {/* Info adicional */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="font-semibold text-blue-300 mb-2">💡 Información Importante</h4>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Necesitas subir tu PWA a un servidor con HTTPS primero</li>
          <li>• El APK será una envoltura de tu PWA (Trusted Web Activity)</li>
          <li>• Funciona igual que una app nativa en Android</li>
          <li>• Compatible con Google Play Store</li>
        </ul>
      </div>
    </div>
  )
}

export default APKBuilder
