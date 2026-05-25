import React, { useRef } from 'react'

function ProjectManager({ config, onLoadConfig, onNewProject }) {
  const fileInputRef = useRef(null)

  const handleSaveProject = () => {
    // Crear objeto con toda la configuración
    const projectData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      config: config
    }

    // Convertir a JSON
    const jsonString = JSON.stringify(projectData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    
    // Crear nombre de archivo por defecto
    const defaultName = config.name ? 
      config.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 
      'mi-radio'
    
    // Crear link de descarga
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${defaultName}-proyecto.pwacfg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleLoadProject = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Verificar extensión
    if (!file.name.endsWith('.pwacfg')) {
      alert('Por favor selecciona un archivo de proyecto válido (.pwacfg)')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target.result)
        
        // Validar estructura
        if (!projectData.config) {
          throw new Error('Archivo de proyecto inválido')
        }

        // Cargar configuración
        onLoadConfig(projectData.config)
        
        alert('✅ Proyecto cargado exitosamente')
      } catch (error) {
        console.error('Error loading project:', error)
        alert('❌ Error al cargar el proyecto. Archivo corrupto o inválido.')
      }
    }
    reader.readAsText(file)
    
    // Limpiar input para permitir cargar el mismo archivo nuevamente
    event.target.value = ''
  }

  const handleNewProject = () => {
    if (confirm('¿Estás seguro? Se perderán todos los cambios no guardados.')) {
      onNewProject()
      alert('✅ Nuevo proyecto iniciado')
    }
  }

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <svg className="w-7 h-7 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        Gestión de Proyecto
      </h2>

      <p className="text-sm text-gray-400 mb-6">
        Guarda tu progreso, carga proyectos anteriores o inicia desde cero
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Botón Guardar */}
        <button
          onClick={handleSaveProject}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span>Guardar Proyecto</span>
        </button>

        {/* Botón Abrir */}
        <button
          onClick={handleOpenFileDialog}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>
          <span>Abrir Proyecto</span>
        </button>

        {/* Botón Nuevo */}
        <button
          onClick={handleNewProject}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      {/* Input oculto para seleccionar archivo */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pwacfg"
        onChange={handleLoadProject}
        style={{ display: 'none' }}
      />

      <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
        <p className="text-xs text-purple-300">
          💡 Los proyectos se guardan con extensión <code className="bg-purple-800/50 px-1 rounded">.pwacfg</code> y contienen toda tu configuración
        </p>
      </div>
    </div>
  )
}

export default ProjectManager
