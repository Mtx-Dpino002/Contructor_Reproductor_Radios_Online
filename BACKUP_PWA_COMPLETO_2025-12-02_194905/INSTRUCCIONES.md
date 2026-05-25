# 🚀 INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN

## ⚡ Inicio Rápido

### 1. Abrir Terminal en la carpeta del proyecto
```powershell
cd "c:\Users\darin\OneDrive\Desktop\Proyectos Programacion\_PWA Constructor\pwa-builder"
```

### 2. Instalar dependencias
```powershell
npm install
```

### 3. Iniciar el servidor de desarrollo
```powershell
npm run dev
```

### 4. Abrir en el navegador
El proyecto se abrirá automáticamente en `http://localhost:3000`

---

## 📋 Comandos Disponibles

```powershell
# Desarrollo
npm run dev        # Inicia servidor de desarrollo

# Producción
npm run build      # Compila para producción
npm run preview    # Vista previa de la compilación
```

---

## ✅ Verificación de Instalación

Después de ejecutar `npm install`, verifica que se hayan instalado:

✓ React 18.2
✓ Vite 5.0
✓ TailwindCSS 3.3
✓ JSZip 3.10.1
✓ File-saver 2.0.5
✓ QRCode.react 3.1.0

---

## 🎯 Uso del PWA Builder

1. **Llenar el formulario:**
   - Nombre de la emisora
   - URL del streaming (debe ser una URL válida de audio)
   - Subir logo
   - Subir icono de la app

2. **Personalizar colores:**
   - Elegir paleta predefinida o personalizar
   - Ajustar colores primario, secundario y del reproductor

3. **Vista previa:**
   - Ver la app en tiempo real
   - Probar el reproductor con tu stream

4. **Generar y exportar:**
   - Click en "Generar PWA"
   - Click en "Descargar ZIP"
   - Descomprimir y subir a tu servidor

---

## 🐛 Solución de Problemas

### Error al instalar dependencias
```powershell
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
npm install
```

### Puerto 3000 ocupado
```powershell
# El servidor usará automáticamente otro puerto disponible
# O puedes especificar uno diferente en vite.config.js
```

### Problemas con TailwindCSS
```powershell
# Verificar que PostCSS esté instalado
npm install -D postcss autoprefixer
```

---

## 📱 Requisitos del Sistema

- **Node.js**: 16.0 o superior
- **npm**: 7.0 o superior
- **Navegador**: Chrome, Firefox, Safari o Edge (última versión)
- **Sistema Operativo**: Windows 10/11, macOS, Linux

---

## 🌐 Desplegar la PWA Generada

Una vez que hayas generado y descargado el ZIP:

1. **Descomprimir** el archivo ZIP
2. **Subir** todos los archivos a tu servidor web
3. **Requisito**: El servidor DEBE tener **HTTPS** habilitado
4. **Abrir** la URL en un navegador móvil
5. **Instalar** desde el navegador (opción "Añadir a pantalla de inicio")

---

## 🎨 Archivos Principales del Proyecto

```
pwa-builder/
├── src/
│   ├── components/      # Todos los componentes React
│   ├── lib/            # Lógica de generación y exportación
│   ├── assets/         # Recursos estáticos
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   └── styles.css      # Estilos globales
├── index.html          # HTML principal
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
└── package.json       # Dependencias
```

---

## 💡 Consejos

1. **URL del stream**: Asegúrate de que sea una URL directa al archivo de audio
2. **Imágenes**: Usa PNG o JPG para mejores resultados
3. **Íconos**: Tamaño recomendado 512x512 píxeles
4. **HTTPS**: Es obligatorio para PWAs
5. **Prueba primero**: Verifica el reproductor en la vista previa antes de exportar

---

## 🎉 ¡Listo!

Tu proyecto PWA Builder está completamente configurado y listo para usar.

**Siguiente paso:** Ejecuta `npm install` y luego `npm run dev`
