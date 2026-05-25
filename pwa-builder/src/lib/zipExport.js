/**
 * Exportador de archivos a ZIP
 * Utiliza JSZip para crear archivos ZIP descargables
 */

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export async function exportToZip(files, appName) {
  try {
    const zip = new JSZip()
    
    // Nombre de la carpeta dentro del ZIP
    const folderName = appName.toLowerCase().replace(/\s+/g, '-')
    
    // Agregar cada archivo al ZIP
    for (const [fileName, content] of Object.entries(files)) {
      // Si es una imagen en base64, convertirla correctamente
      if (fileName.includes('.png') || fileName.includes('.jpg')) {
        if (content.startsWith('data:image')) {
          // Extraer solo el base64 sin el prefijo
          const base64Data = content.split(',')[1]
          zip.file(`${folderName}/${fileName}`, base64Data, { base64: true })
        } else {
          zip.file(`${folderName}/${fileName}`, content)
        }
      } else {
        // Archivos de texto (HTML, CSS, JS, JSON, etc.)
        zip.file(`${folderName}/${fileName}`, content)
      }
    }
    
    // Generar el ZIP
    const blob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9
      }
    })
    
    // Descargar el archivo
    const zipFileName = `${folderName}-pwa.zip`
    saveAs(blob, zipFileName)
    
    return true
    
  } catch (error) {
    console.error('Error al crear el ZIP:', error)
    throw new Error('No se pudo crear el archivo ZIP: ' + error.message)
  }
}

/**
 * Convierte un archivo a base64
 * Útil para procesar imágenes antes de agregarlas al ZIP
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Valida que todos los archivos necesarios estén presentes
 */
export function validateFiles(files) {
  const requiredFiles = [
    'index.html',
    'manifest.json',
    'sw.js',
    'app.js',
    'styles.css'
  ]
  
  for (const file of requiredFiles) {
    if (!files[file]) {
      throw new Error(`Archivo requerido faltante: ${file}`)
    }
  }
  
  return true
}

/**
 * Calcula el tamaño total de los archivos
 */
export function calculateTotalSize(files) {
  let totalSize = 0
  
  for (const content of Object.values(files)) {
    if (typeof content === 'string') {
      totalSize += content.length
    }
  }
  
  // Convertir a KB
  return (totalSize / 1024).toFixed(2)
}
