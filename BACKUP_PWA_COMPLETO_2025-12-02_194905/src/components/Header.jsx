import React, { useRef } from 'react'

function Header({ config, onLoadConfig, onNewProject, onSaveProject }) {
  const fileInputRef = useRef(null)

  const handleLoadProject = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.pwacfg')) {
      alert('Por favor selecciona un archivo de proyecto válido (.pwacfg)')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target.result)
        if (!projectData.config) throw new Error('Archivo inválido')
        onLoadConfig(projectData.config)
        alert('✅ Proyecto cargado exitosamente')
      } catch (error) {
        alert('❌ Error al cargar el proyecto')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleNewProject = () => {
    if (confirm('¿Estás seguro? Se perderán los cambios no guardados.')) {
      onNewProject()
    }
  }

  return (
    <header className="bg-gray-800 shadow-2xl sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PWA Builder</h1>
              <p className="text-sm text-gray-300">Constructor de Apps para Radios</p>
            </div>
          </div>
          
          {/* Botones de gestión */}
          <div className="flex items-center space-x-2">
            {/* Botón Nuevo */}
            <button
              onClick={handleNewProject}
              className="group flex items-center space-x-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all duration-200 hover:scale-105"
              title="Nuevo Proyecto"
            >
              <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-gray-300 group-hover:text-white font-medium text-sm hidden sm:inline transition-colors">Nuevo</span>
            </button>

            {/* Botón Abrir */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group flex items-center space-x-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all duration-200 hover:scale-105"
              title="Abrir Proyecto"
            >
              <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
              <span className="text-gray-300 group-hover:text-white font-medium text-sm hidden sm:inline transition-colors">Abrir</span>
            </button>

            {/* Botón Guardar */}
            <button
              onClick={onSaveProject}
              className="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/20"
              title="Guardar Proyecto"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span className="text-white font-semibold text-sm hidden sm:inline">Guardar</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pwacfg"
              onChange={handleLoadProject}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
