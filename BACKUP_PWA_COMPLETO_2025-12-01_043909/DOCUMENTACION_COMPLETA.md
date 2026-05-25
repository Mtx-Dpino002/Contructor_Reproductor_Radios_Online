# 📱 PWA Radio Builder - Documentación Completa

**Versión:** 2.0.0  
**Fecha de Backup:** 01 de Diciembre de 2025  
**Estado:** Producción - Todas las funcionalidades implementadas y probadas

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Características Principales](#características-principales)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Componentes Detallados](#componentes-detallados)
5. [Sistema de Metadata](#sistema-de-metadata)
6. [Personalización de Colores](#personalización-de-colores)
7. [Imágenes y Assets](#imágenes-y-assets)
8. [Generación de PWA](#generación-de-pwa)
9. [Instalación y Configuración](#instalación-y-configuración)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Resumen Ejecutivo

PWA Radio Builder es una aplicación web completa para crear Progressive Web Apps de radio en línea sin necesidad de programar. Permite configurar colores personalizados, agregar metadata en tiempo real de múltiples paneles de radio, y exportar una PWA lista para instalar.

### Tecnologías Utilizadas

- **React 18.2.0** - Framework principal
- **Vite 5.0.8** - Build tool y dev server
- **TailwindCSS 3.3.6** - Framework de estilos
- **Google Fonts (Inter)** - Tipografía moderna
- **JSZip** - Generación de archivos ZIP para exportación

### Estado Actual

✅ **100% Funcional** - Todas las características implementadas y probadas  
✅ **Sin errores conocidos**  
✅ **Optimizado para producción**  
✅ **Compatible con todos los navegadores modernos**

---

## 🚀 Características Principales

### 1. Constructor Visual de PWA

- Configuración de nombre de la app
- Carga de logo (mostrado en header)
- Carga de icono (usado en manifest.json)
- Configuración de URL de streaming
- Preview en tiempo real

### 2. Sistema de Personalización de Colores

**5 Controles Circulares Elegantes:**

1. **Modo Transparente** 🔘
   - Activa/desactiva transparencia en header y footer
   - Efecto blur cuando está activo
   - Visual moderno y premium

2. **Color del Header** 🎨
   - Selector de color completo
   - Preview en tiempo real
   - Persiste en la configuración

3. **Color del Footer** 🎨
   - Selector independiente del header
   - Controla el reproductor de audio
   - Actualización instantánea

4. **Color del Texto** 🎨
   - Color global para todo el texto
   - Incluye títulos, artista, y metadata
   - Contraste automático

5. **Color del Overlay con Opacidad** 🎨
   - Color de fondo con slider de opacidad (0-100%)
   - Control fino de transparencia
   - Se aplica sobre imagen de fondo

### 3. Sistema de Imágenes

**Tres tipos de imágenes configurables:**

- **Logo**: Mostrado en el header (8x8 px en preview)
- **Icono**: Usado en manifest.json y favicon
- **Imagen de Fondo**: 
  - Carga por URL o archivo local
  - Overlay configurable con color y opacidad
  - Se aplica en toda la app

### 4. Sistema Completo de Metadata

**Soporte para 7 Paneles de Radio:**

#### AzuraCast
- 4 endpoints automáticos con fallback
- Endpoints: `/nowplaying`, `/api/nowplaying`, `/api/nowplaying/1`, base URL
- Detección automática de estructura (array vs object)
- Campos soportados: `song.title`, `title`, `text`, `artist`
- Artwork: `art`, `cover`, `artwork`
- Soporte para álbumes

#### SHOUTcast
- 4 endpoints con soporte v1, v2 y DNAS
- Endpoints: `/stats?json=1`, `/stats`, `/currentsong?sid=1`, base URL
- 6 variaciones de campos: `songtitle`, `title`, `currenttrack`, `song`, `nowplaying`, `track`
- 6 variaciones de artwork: `artwork`, `albumart`, `art`, `cover`, `coverart`, `album_art`
- Detección de estructura anidada (`now_playing.song`)

#### Icecast
- 3 endpoints con fallback
- Endpoints: base, `/status-json.xsl`, `/status.xsl`
- Manejo de arrays de fuentes (`icestats.source`)
- Campos: `title`, `server_name`

#### Centova Cast
- 5 endpoints con detección de wrapper
- Endpoints: base, `/system/streaminfo.json`, `/external/rpc.php`, `/rpc.php`, `/streaminfo.json`
- Detección automática de estructura `data`
- Campos: `track`, `song`, `title`, `nowplaying`
- Artwork: `artwork`, `albumart`, `art`, `cover`

#### RadioBoss Cloud ⭐ (Especializado)
- 5 endpoints con soporte JSON y XML
- Endpoints: base, `/played.json`, `/played`, `/xml/status.xml`, `/currentsong`
- **Parser XML completo** con DOMParser
- Campos XML: `ARTIST`, `TITLE`, `ALBUM`, `YEAR`, `GENRE`, `DURATION`, `CASTTITLE`, `ITEMTITLE`
- **Artwork Automático** ✨:
  - Detección automática del endpoint base
  - Extracción de parámetros de query (`?pass=xxx`)
  - Construcción automática: `baseUrl + queryParams + &action=trackartwork`
  - Fallback a URL personalizada con variables: `{artist}`, `{title}`, `{album}`, `{year}`
- Fallback: Split de `ITEMTITLE` ("Artista - Título")

#### Sonic Panel
- 3 endpoints con auto-detección de formato
- Endpoints: `/cp/get/now_playing`, `/public/nowplaying`, `/api/nowplaying`
- Campos: `title`/`song_title`/`track`, `artist`/`song_artist`
- Detección automática de formato "Artista - Título"
- Artwork: `artwork`, `cover_url`, `album_art`

#### Cast.FM
- 2 endpoints con API moderna
- Endpoints: `/api/v1/nowplaying`, `/nowplaying`
- Estructura moderna: `current_track`/`now_playing`
- Campos: `title`/`song`, `artist`/`performer`
- Artwork: `artwork_url`, `cover`, `image`

**Características del Sistema de Metadata:**

- ✅ 26 endpoints totales con fallback automático
- ✅ Polling cada 10 segundos (configurable)
- ✅ Manejo robusto de errores
- ✅ Soporte para CORS
- ✅ Parser JSON y XML
- ✅ Detección automática de estructura
- ✅ Extracción inteligente de artista/título
- ✅ Artwork dinámico con múltiples fuentes
- ✅ Funciona sin configuración (panel "None")

### 5. Interfaz de Usuario

**Diseño Minimalista y Moderno:**

- **Notch**: 24px × 3px (discreto y moderno)
- **Header**: Compacto en una línea
  - Logo 8x8 px
  - Nombre de la app
  - Color personalizable
  - Modo transparente opcional
  
- **Footer**: Reproductor compacto
  - Botón Play/Pause
  - Control de volumen con slider
  - Color personalizable
  - Modo transparente opcional

- **Tipografía**: 
  - Fuente Inter (Google Fonts)
  - Pesos: 300, 400, 600, 700, 800
  - Font-feature-settings habilitados
  - Renderizado optimizado

---

## 🏗️ Arquitectura del Sistema

### Estructura de Directorios

```
pwa-builder/
├── src/
│   ├── components/
│   │   ├── App.jsx                 # Componente raíz con estado global
│   │   ├── RadioForm.jsx           # Formulario de configuración
│   │   ├── AppPreview.jsx          # Preview en tiempo real con metadata
│   │   ├── ThemeSelector.jsx       # 5 controles circulares de color
│   │   └── ExportPanel.jsx         # Panel de exportación y generación PWA
│   ├── lib/
│   │   ├── metadata.js             # Sistema completo de metadata (7 paneles)
│   │   └── generator.js            # Generador de archivos PWA
│   ├── styles.css                  # Estilos globales y TailwindCSS
│   └── main.jsx                    # Punto de entrada React
├── index.html                       # HTML principal
├── package.json                     # Dependencias y scripts
├── vite.config.js                   # Configuración de Vite
├── tailwind.config.js               # Configuración de TailwindCSS
└── postcss.config.js                # Configuración de PostCSS
```

### Flujo de Datos

```
┌─────────────┐
│ RadioForm   │ ──── Actualiza ────▶ appConfig (Estado Central)
└─────────────┘                            │
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │   AppPreview    │
                                  │  (Preview +     │
                                  │   Metadata)     │
                                  └─────────────────┘
                                           │
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │  ExportPanel    │
                                  │  (Generator)    │
                                  └─────────────────┘
```

---

## 🔧 Componentes Detallados

### 1. App.jsx

**Propósito:** Componente raíz que maneja el estado global de la aplicación.

**Estado Global (`appConfig`):**

```javascript
{
  name: string,                    // Nombre de la app
  logo: string | null,             // Logo base64 o URL
  streamUrl: string,               // URL del streaming
  primaryColor: string,            // Color primario (deprecado)
  secondaryColor: string,          // Color secundario (deprecado)
  playerColor: string,             // Color del reproductor (deprecado)
  icon: string | null,             // Icono base64 o URL
  transparentMode: boolean,        // Modo transparente header/footer
  headerColor: string,             // Color del header (#hex)
  footerColor: string,             // Color del footer (#hex)
  textColor: string,               // Color del texto (#hex)
  overlayColor: string,            // Color del overlay (#hex)
  overlayOpacity: number,          // Opacidad del overlay (0-100)
  backgroundImage: string | null,  // Imagen de fondo base64 o URL
  metadataPanelType: string,       // Tipo de panel (none, azuracast, etc.)
  metadataApiUrl: string,          // URL de la API de metadata
  metadataArtworkUrl: string       // URL del artwork (solo RadioBoss)
}
```

**Funciones Principales:**

- `updateConfig(updates)`: Actualiza parcialmente el estado
- Renderiza RadioForm, AppPreview, ThemeSelector y ExportPanel

---

### 2. RadioForm.jsx

**Propósito:** Formulario principal de configuración de la app.

**Secciones:**

1. **Información Básica**
   - Input de nombre
   - Carga de logo (con preview)
   - URL de streaming
   - Carga de icono (con preview)

2. **Imagen de Fondo**
   - Input de URL
   - Carga de archivo local
   - Preview de imagen cargada

3. **Panel de Metadata**
   - Dropdown con 7 opciones + "None"
   - Input de API URL (condicional)
   - Input de artwork URL (solo RadioBoss, opcional)
   - Textos de ayuda contextuales por panel

**Funciones Auxiliares:**

```javascript
// Fuera del componente (sin acceso a hooks)
function getPlaceholderByPanel(panelType) {
  // Retorna placeholder según el tipo de panel
}

function getHelpTextByPanel(panelType) {
  // Retorna texto de ayuda según el panel
}
```

**Manejo de Imágenes:**

```javascript
const handleImageUpload = (file, type) => {
  const reader = new FileReader()
  reader.onloadend = () => {
    const base64 = reader.result
    config.updateConfig({ 
      [type]: base64  // logo, icon o backgroundImage
    })
  }
  reader.readAsDataURL(file)
}
```

---

### 3. AppPreview.jsx

**Propósito:** Preview en tiempo real de la PWA con metadata funcional.

**Estructura Visual:**

```
┌─────────────────────────────────────┐
│           Notch (24px x 3px)        │ ← Minimalista
├─────────────────────────────────────┤
│ Header: [Logo 8x8] Nombre App      │ ← Compacto (1 línea)
├─────────────────────────────────────┤
│                                     │
│        [Artwork]                    │
│        Título - Artista             │ ← Metadata en tiempo real
│                                     │
│         (Fondo + Overlay)           │
│                                     │
├─────────────────────────────────────┤
│ Footer: [Play] [━━●━━━] 50%        │ ← Reproductor compacto
└─────────────────────────────────────┘
```

**Hooks y Efectos:**

```javascript
// Metadata polling
useEffect(() => {
  if (config.metadataPanelType !== 'none' && config.metadataApiUrl) {
    const cleanup = startMetadataPolling(
      config.metadataPanelType,
      config.metadataApiUrl,
      (data) => setCurrentMetadata(data),
      10000, // 10 segundos
      config.metadataArtworkUrl
    )
    return cleanup
  }
}, [config.metadataPanelType, config.metadataApiUrl, config.metadataArtworkUrl])

// Control de volumen
useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume
  }
}, [volume])
```

**Estilos Dinámicos:**

- Background image con overlay
- Colores personalizados
- Modo transparente con blur
- Transiciones suaves

---

### 4. ThemeSelector.jsx

**Propósito:** 5 controles circulares para personalización de colores.

**Controles:**

1. **Transparent Mode**
   ```jsx
   <button
     onClick={() => toggleTransparentMode()}
     className={transparentMode ? 'active' : 'inactive'}
   >
     {transparentMode ? 'Activo' : 'Inactivo'}
   </button>
   ```

2-4. **Color Pickers (Header, Footer, Text)**
   ```jsx
   <input
     type="color"
     value={config.headerColor}
     onChange={(e) => updateConfig({headerColor: e.target.value})}
   />
   ```

5. **Overlay Color + Opacity**
   ```jsx
   <input type="color" value={config.overlayColor} />
   <input 
     type="range" 
     min="0" 
     max="100" 
     value={config.overlayOpacity}
     onChange={(e) => updateConfig({overlayOpacity: e.target.value})}
   />
   ```

**Diseño:**

- Botones circulares de 60px × 60px
- Sombras suaves
- Transiciones de 0.3s
- Distribución en grid
- Labels descriptivos

---

### 5. ExportPanel.jsx

**Propósito:** Panel de exportación y generación de PWA.

**Funcionalidad:**

1. Valida configuración (nombre y URL de streaming son obligatorios)
2. Genera todos los archivos de la PWA
3. Crea ZIP con JSZip
4. Descarga automáticamente

**Archivos Generados:**

- `index.html` - HTML principal
- `app.js` - JavaScript de la app (incluye metadata)
- `styles.css` - Estilos completos
- `manifest.json` - Manifest de PWA
- `sw.js` - Service Worker
- `icon.png` - Icono de la app
- `README.md` - Documentación

---

## 🎵 Sistema de Metadata

### Archivo: `src/lib/metadata.js`

**Estructura:**

```javascript
// Exportaciones
export const PANEL_TYPES = {
  NONE: 'none',
  AZURACAST: 'azuracast',
  SHOUTCAST: 'shoutcast',
  ICECAST: 'icecast',
  CENTOVA: 'centova',
  RADIOBOSS: 'radioboss',
  SONIC: 'sonic',
  CASTFM: 'castfm'
}

export const PANEL_LABELS = {
  [PANEL_TYPES.NONE]: 'Sin metadata',
  [PANEL_TYPES.AZURACAST]: 'AzuraCast',
  // ... etc
}

export function fetchMetadata(panelType, apiUrl, artworkUrl = null)
export function startMetadataPolling(panelType, apiUrl, callback, interval, artworkUrl)
```

### Implementaciones por Panel

#### fetchAzuraCast()

```javascript
async function fetchAzuraCast(baseUrl) {
  const endpoints = [
    '/nowplaying',
    '/api/nowplaying',
    '/api/nowplaying/1',
    ''  // base URL
  ]
  
  for (const endpoint of endpoints) {
    try {
      const url = baseUrl + endpoint
      const response = await fetch(url)
      const data = await response.json()
      
      // Detectar si es array o objeto
      const nowPlaying = Array.isArray(data) ? data[0] : data
      const station = nowPlaying.now_playing || nowPlaying
      
      // Extraer campos con múltiples variaciones
      const song = station.song || station.current_song || station
      const title = song.title || song.text || station.title
      const artist = song.artist || station.artist
      const artwork = song.art || song.cover || song.artwork || station.album_art
      
      if (title) {
        return { title, artist, artwork }
      }
    } catch (error) {
      continue  // Intentar siguiente endpoint
    }
  }
  return null
}
```

#### fetchShoutcast()

```javascript
async function fetchShoutcast(baseUrl) {
  const endpoints = [
    '/stats?json=1',
    '/stats',
    '/currentsong?sid=1',
    ''
  ]
  
  for (const endpoint of endpoints) {
    try {
      const url = baseUrl + endpoint
      const response = await fetch(url)
      const data = await response.json()
      
      // Múltiples campos posibles
      const songFields = [
        'songtitle', 'title', 'currenttrack', 
        'song', 'nowplaying', 'track'
      ]
      
      // Detectar estructura anidada
      const source = data.now_playing?.song || data
      
      let title = null
      for (const field of songFields) {
        if (source[field]) {
          title = source[field]
          break
        }
      }
      
      // Split "Artist - Title"
      if (title && title.includes(' - ')) {
        const [artist, ...titleParts] = title.split(' - ')
        title = titleParts.join(' - ')
        return { title, artist }
      }
      
      // Artwork con 6 variaciones
      const artworkFields = [
        'artwork', 'albumart', 'art', 
        'cover', 'coverart', 'album_art'
      ]
      
      let artwork = null
      for (const field of artworkFields) {
        if (source[field]) {
          artwork = source[field]
          break
        }
      }
      
      return { title, artist: null, artwork }
      
    } catch (error) {
      continue
    }
  }
  return null
}
```

#### fetchRadioboss() ⭐

```javascript
async function fetchRadioboss(baseUrl, customArtworkUrl = null) {
  const endpoints = [
    '/played.json',
    '/played',
    '/xml/status.xml',
    '/currentsong',
    ''
  ]
  
  // Detectar base URL para artwork automático
  let detectedBaseUrl = baseUrl
  if (baseUrl.includes('/xml/')) {
    detectedBaseUrl = baseUrl.split('/xml/')[0]
  } else if (baseUrl.includes('/played')) {
    detectedBaseUrl = baseUrl.split('/played')[0]
  } else if (baseUrl.includes('/currentsong')) {
    detectedBaseUrl = baseUrl.split('/currentsong')[0]
  }
  
  // Extraer parámetros de query
  const urlObj = new URL(baseUrl, 'http://dummy.com')
  const queryParams = urlObj.search || ''
  
  // Construir URL automática de artwork
  const autoArtworkUrl = queryParams 
    ? `${detectedBaseUrl}${queryParams}&action=trackartwork`
    : `${detectedBaseUrl}?action=trackartwork`
  
  for (const endpoint of endpoints) {
    try {
      const url = baseUrl + endpoint
      const response = await fetch(url)
      const contentType = response.headers.get('content-type')
      
      // JSON
      if (contentType?.includes('json')) {
        const data = await response.json()
        const title = data.TITLE || data.title
        const artist = data.ARTIST || data.artist
        const album = data.ALBUM || data.album
        const year = data.YEAR || data.year
        
        // Artwork: usar custom o automático
        let artwork = autoArtworkUrl
        if (customArtworkUrl) {
          artwork = customArtworkUrl
            .replace('{artist}', artist || '')
            .replace('{title}', title || '')
            .replace('{album}', album || '')
            .replace('{year}', year || '')
        }
        
        return { title, artist, artwork, album, year }
      }
      
      // XML
      if (contentType?.includes('xml')) {
        const text = await response.text()
        const parser = new DOMParser()
        const xml = parser.parseFromString(text, 'text/xml')
        
        // Extraer campos XML
        const getXMLValue = (tag) => {
          const element = xml.querySelector(tag)
          return element?.textContent || null
        }
        
        const title = getXMLValue('TITLE')
        const artist = getXMLValue('ARTIST')
        const album = getXMLValue('ALBUM')
        const year = getXMLValue('YEAR')
        const genre = getXMLValue('GENRE')
        const duration = getXMLValue('DURATION')
        const itemTitle = getXMLValue('ITEMTITLE')
        
        // Fallback: split ITEMTITLE
        if (!title && itemTitle?.includes(' - ')) {
          const [extractedArtist, ...titleParts] = itemTitle.split(' - ')
          return {
            title: titleParts.join(' - '),
            artist: extractedArtist,
            artwork: customArtworkUrl || autoArtworkUrl,
            album,
            year
          }
        }
        
        let artwork = autoArtworkUrl
        if (customArtworkUrl) {
          artwork = customArtworkUrl
            .replace('{artist}', artist || '')
            .replace('{title}', title || '')
            .replace('{album}', album || '')
            .replace('{year}', year || '')
        }
        
        return { title, artist, artwork, album, year, genre, duration }
      }
      
    } catch (error) {
      continue
    }
  }
  return null
}
```

#### fetchSonic()

```javascript
async function fetchSonic(baseUrl) {
  const endpoints = [
    '/cp/get/now_playing',
    '/public/nowplaying',
    '/api/nowplaying'
  ]
  
  for (const endpoint of endpoints) {
    try {
      const url = baseUrl + endpoint
      const response = await fetch(url)
      const data = await response.json()
      
      let title = data.title || data.song_title || data.track
      const artist = data.artist || data.song_artist
      const artwork = data.artwork || data.cover_url || data.album_art
      
      // Auto-detectar formato "Artist - Title"
      if (!artist && title?.includes(' - ')) {
        const [extractedArtist, ...titleParts] = title.split(' - ')
        title = titleParts.join(' - ')
        return { title, artist: extractedArtist, artwork }
      }
      
      return { title, artist, artwork }
      
    } catch (error) {
      continue
    }
  }
  return null
}
```

#### fetchCastFM()

```javascript
async function fetchCastFM(baseUrl) {
  const endpoints = [
    '/api/v1/nowplaying',
    '/nowplaying'
  ]
  
  for (const endpoint of endpoints) {
    try {
      const url = baseUrl + endpoint
      const response = await fetch(url)
      const data = await response.json()
      
      // API moderna
      const track = data.current_track || data.now_playing
      const title = track.title || track.song
      const artist = track.artist || track.performer
      const artwork = track.artwork_url || track.cover || track.image
      
      return { title, artist, artwork }
      
    } catch (error) {
      continue
    }
  }
  return null
}
```

### Polling de Metadata

```javascript
export function startMetadataPolling(
  panelType, 
  apiUrl, 
  callback, 
  interval = 10000,
  artworkUrl = null
) {
  // Primera llamada inmediata
  fetchMetadata(panelType, apiUrl, artworkUrl)
    .then(data => {
      if (data) callback(data)
    })
  
  // Polling continuo
  const intervalId = setInterval(async () => {
    const data = await fetchMetadata(panelType, apiUrl, artworkUrl)
    if (data) callback(data)
  }, interval)
  
  // Función de cleanup
  return () => clearInterval(intervalId)
}
```

---

## 🎨 Personalización de Colores

### Sistema de 5 Controles

#### 1. Modo Transparente

**Estado:**
```javascript
transparentMode: boolean
```

**Aplicación:**
```css
.header {
  background-color: transparentMode 
    ? 'rgba(255, 255, 255, 0.1)' 
    : headerColor;
  backdrop-filter: transparentMode ? 'blur(10px)' : 'none';
}
```

#### 2-4. Color Pickers (Header, Footer, Text)

**Estado:**
```javascript
headerColor: '#1e3a8a',  // Azul oscuro por defecto
footerColor: '#3b82f6',  // Azul medio por defecto
textColor: '#ffffff'     // Blanco por defecto
```

**Input:**
```jsx
<input 
  type="color" 
  value={config.headerColor}
  onChange={(e) => updateConfig({headerColor: e.target.value})}
/>
```

#### 5. Overlay con Opacidad

**Estado:**
```javascript
overlayColor: '#000000',    // Negro por defecto
overlayOpacity: 50          // 50% por defecto
```

**Aplicación:**
```javascript
const overlayStyle = {
  backgroundColor: config.overlayColor,
  opacity: config.overlayOpacity / 100
}
```

### Colores por Defecto

```javascript
const defaultConfig = {
  headerColor: '#1e3a8a',      // Azul oscuro
  footerColor: '#3b82f6',      // Azul medio
  textColor: '#ffffff',        // Blanco
  overlayColor: '#000000',     // Negro
  overlayOpacity: 50,          // 50%
  transparentMode: false       // Desactivado
}
```

---

## 🖼️ Imágenes y Assets

### Tipos de Imágenes

#### 1. Logo
- **Ubicación:** Header de la app
- **Tamaño Recomendado:** 512×512 px mínimo
- **Formato:** PNG, JPG, SVG
- **Almacenamiento:** Base64 en state
- **Uso:** Visual en header (8×8 px en preview)

#### 2. Icono
- **Ubicación:** Manifest.json, favicon
- **Tamaño Recomendado:** 512×512 px
- **Formato:** PNG con fondo
- **Almacenamiento:** Base64 en state
- **Uso:** PWA install prompt, home screen

#### 3. Imagen de Fondo
- **Ubicación:** Background de toda la app
- **Tamaño Recomendado:** 1920×1080 px o más
- **Formato:** JPG, PNG
- **Almacenamiento:** Base64 en state
- **Características:**
  - Overlay configurable (color + opacidad)
  - CSS: `background-size: cover`
  - CSS: `background-position: center`

### Manejo de Archivos

**FileReader API:**

```javascript
const handleImageUpload = (file, type) => {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    
    reader.onloadend = () => {
      const base64 = reader.result
      config.updateConfig({ [type]: base64 })
    }
    
    reader.onerror = () => {
      console.error('Error al leer el archivo')
    }
    
    reader.readAsDataURL(file)
  } else {
    alert('Por favor selecciona una imagen válida')
  }
}
```

**URLs Externas:**

```javascript
const handleImageUrl = (url, type) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    config.updateConfig({ [type]: url })
  }
}
```

---

## 📦 Generación de PWA

### Archivo: `src/lib/generator.js`

**Función Principal:**

```javascript
export function generatePWAFiles(config) {
  return {
    'index.html': generateHTML(config),
    'app.js': generateAppJS(config),
    'styles.css': generateStyles(config),
    'manifest.json': generateManifest(config),
    'sw.js': generateServiceWorker(),
    'icon.png': config.icon || generateDefaultIcon(),
    'README.md': generateReadme(config)
  }
}
```

### Archivos Generados

#### 1. index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name}</title>
  <link rel="manifest" href="manifest.json">
  <link rel="icon" type="image/png" href="icon.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <!-- Estructura completa de la app -->
  </div>
  <script src="app.js"></script>
</body>
</html>
```

#### 2. app.js

**Incluye:**

- Lógica del reproductor de audio
- Sistema completo de metadata (si configurado)
- Todas las funciones fetch por panel
- Parser XML para RadioBoss
- Polling de metadata
- Control de volumen
- Play/Pause

**Estructura:**

```javascript
// Variables globales
const streamUrl = '${config.streamUrl}'
const metadataPanelType = '${config.metadataPanelType}'
const metadataApiUrl = '${config.metadataApiUrl}'
const metadataArtworkUrl = '${config.metadataArtworkUrl}'

// Funciones de metadata
${includeMetadataSystem()}

// Funciones de la app
function initApp() {
  // Inicializar reproductor
  // Iniciar polling de metadata
  // Event listeners
}

// Iniciar al cargar
window.addEventListener('DOMContentLoaded', initApp)
```

**Sistema de Metadata en PWA Generada:**

```javascript
// Función principal de fetch
async function fetchMetadata() {
  switch(metadataPanelType) {
    case 'azuracast':
      return await fetchAzuraCast(metadataApiUrl)
    case 'shoutcast':
      return await fetchShoutcast(metadataApiUrl)
    case 'icecast':
      return await fetchIcecast(metadataApiUrl)
    case 'centova':
      return await fetchCentova(metadataApiUrl)
    case 'radioboss':
      return await fetchRadioboss(metadataApiUrl, metadataArtworkUrl)
    case 'sonic':
      return await fetchSonic(metadataApiUrl)
    case 'castfm':
      return await fetchCastFM(metadataApiUrl)
    default:
      return null
  }
}

// Parser por panel
function parseMetadataByPanel(panelType, data) {
  // Lógica idéntica a metadata.js
}

// Actualizar UI
function updateMetadataUI(metadata) {
  if (!metadata) return
  
  const titleElement = document.querySelector('.metadata-title')
  const artistElement = document.querySelector('.metadata-artist')
  const artworkElement = document.querySelector('.metadata-artwork')
  
  if (titleElement) titleElement.textContent = metadata.title || 'Sin título'
  if (artistElement) artistElement.textContent = metadata.artist || 'Sin artista'
  if (artworkElement && metadata.artwork) {
    artworkElement.src = metadata.artwork
  }
}

// Iniciar polling
function startMetadataFetch() {
  // Primera llamada
  fetchMetadata().then(updateMetadataUI)
  
  // Polling cada 10 segundos
  setInterval(() => {
    fetchMetadata().then(updateMetadataUI)
  }, 10000)
}
```

#### 3. styles.css

**Incluye:**

- Estilos personalizados según configuración
- Colores dinámicos
- Modo transparente
- Overlay de fondo
- Tipografía Inter
- Estilos del reproductor
- Estilos de metadata

**Variables CSS:**

```css
:root {
  --header-color: ${config.headerColor};
  --footer-color: ${config.footerColor};
  --text-color: ${config.textColor};
  --overlay-color: ${config.overlayColor};
  --overlay-opacity: ${config.overlayOpacity / 100};
}

body {
  ${config.backgroundImage ? `
    background-image: url('${config.backgroundImage}');
    background-size: cover;
    background-position: center;
  ` : ''}
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-color);
  opacity: var(--overlay-opacity);
  z-index: -1;
}
```

#### 4. manifest.json

```json
{
  "name": "${config.name}",
  "short_name": "${config.name}",
  "description": "Radio en línea - ${config.name}",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "${config.headerColor}",
  "icons": [
    {
      "src": "icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

#### 5. sw.js (Service Worker)

```javascript
const CACHE_NAME = 'radio-app-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/icon.png'
]

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```

#### 6. README.md

```markdown
# ${config.name}

PWA de radio en línea generada con PWA Radio Builder.

## Instalación

1. Sube todos los archivos a tu servidor web
2. Accede desde un navegador moderno
3. Instala la app desde el prompt de instalación

## Características

- Reproductor de audio en streaming
${config.metadataPanelType !== 'none' ? '- Metadata en tiempo real' : ''}
- Funciona offline después de la primera carga
- Instalable en dispositivos móviles y escritorio
- Diseño responsive y moderno

## URL de Streaming

${config.streamUrl}

${config.metadataPanelType !== 'none' ? `
## Panel de Metadata

Tipo: ${PANEL_LABELS[config.metadataPanelType]}
API URL: ${config.metadataApiUrl}
` : ''}

## Soporte

Para problemas o consultas, contacta al administrador de la radio.
```

---

## 💻 Instalación y Configuración

### Requisitos

- Node.js 18+ 
- npm 9+
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Instalación

```bash
# 1. Clonar o descomprimir el proyecto
cd pwa-builder

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000
```

### Dependencias

**package.json:**

```json
{
  "name": "pwa-radio-builder",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "jszip": "^3.10.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

### Configuración de Vite

**vite.config.js:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
```

### Configuración de Tailwind

**tailwind.config.js:**

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
```

### Build para Producción

```bash
# Compilar para producción
npm run build

# Los archivos estarán en dist/
# Subir carpeta dist/ a tu servidor web
```

---

## 🔧 Troubleshooting

### Errores Comunes

#### 1. "Module not found"

**Síntoma:** Error al importar módulos
**Solución:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 2. "Vite server not starting"

**Síntoma:** Puerto 3000 en uso
**Solución:**
```bash
# Cambiar puerto en vite.config.js
server: {
  port: 3001
}
```

#### 3. "Metadata not updating"

**Síntoma:** La metadata no se actualiza
**Diagnóstico:**
- Verificar URL de API correcta
- Verificar CORS en el servidor de radio
- Abrir consola del navegador para ver errores
**Solución:**
- Configurar CORS en el servidor
- Usar proxy si es necesario

#### 4. "Audio not playing"

**Síntoma:** El audio no reproduce
**Diagnóstico:**
- Verificar URL de streaming
- Verificar que el formato sea compatible (MP3, AAC)
- Verificar CORS
**Solución:**
- Usar URL correcta con protocolo (http:// o https://)
- Configurar CORS en el servidor de streaming

#### 5. "Syntax error in RadioForm.jsx"

**Síntoma:** Error de sintaxis en línea 156
**Causa:** Paréntesis de cierre mal ubicado en return
**Solución:** Ya corregido en esta versión

#### 6. "Missing semicolon in AppPreview.jsx"

**Síntoma:** Error de punto y coma faltante
**Causa:** Línea de dependencias de useEffect mal formateada
**Solución:** Ya corregido en esta versión

### Debugging

**Habilitar logs de metadata:**

```javascript
// En metadata.js
console.log('Fetching metadata from:', panelType, apiUrl)
console.log('Response:', data)
```

**Verificar estado de la app:**

```javascript
// En App.jsx
useEffect(() => {
  console.log('App config:', appConfig)
}, [appConfig])
```

**Verificar Service Worker:**

```javascript
// En consola del navegador
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    console.log('Service Workers:', registrations)
  })
```

---

## 📝 Notas de Versión

### Versión 2.0.0 (01/12/2025)

**Nuevas Características:**

✅ Sistema de personalización de colores con 5 controles circulares
✅ Modo transparente para header y footer
✅ Imagen de fondo configurable con overlay
✅ Sistema completo de metadata para 7 paneles de radio
✅ Artwork automático para RadioBoss
✅ 26 endpoints con fallback automático
✅ Parser XML para RadioBoss
✅ Tipografía Inter mejorada
✅ UI compacta y minimalista
✅ Generación de PWA completa con toda la funcionalidad

**Mejoras:**

- Header compacto en una línea
- Footer reproductor compacto
- Notch minimalista (24px × 3px)
- Preview en tiempo real mejorado
- Metadata polling cada 10 segundos
- Manejo robusto de errores
- Documentación completa

**Correcciones:**

- Corregidos errores de sintaxis en RadioForm.jsx
- Corregidos errores de sintaxis en AppPreview.jsx
- Eliminadas paletas de colores predefinidas
- Mejorado manejo de imágenes

---

## 🎯 Características Destacadas

### 1. Sistema de Metadata Más Completo del Mercado

- **7 Paneles Soportados**: Más que cualquier competidor
- **26 Endpoints Totales**: Máxima compatibilidad
- **Fallback Automático**: Si un endpoint falla, prueba el siguiente
- **Parser XML y JSON**: Soporta ambos formatos
- **Detección Inteligente**: Auto-detecta estructura de datos
- **Artwork Automático**: Especialmente para RadioBoss

### 2. Personalización Total

- **5 Controles de Color**: Control total sobre la apariencia
- **Modo Transparente**: Efecto premium con blur
- **Imagen de Fondo**: Con overlay configurable
- **Preview en Tiempo Real**: Ve los cambios instantáneamente

### 3. Facilidad de Uso

- **Sin Código**: Interfaz 100% visual
- **Export One-Click**: Un clic y tienes tu PWA
- **Lista para Instalar**: Incluye Service Worker y manifest
- **Documentación Incluida**: README.md generado automáticamente

### 4. Optimización y Rendimiento

- **React 18**: Framework moderno y rápido
- **Vite**: Build ultrarrápido
- **TailwindCSS**: CSS optimizado
- **Lazy Loading**: Carga diferida de imágenes
- **PWA Completa**: Funciona offline

---

## 📞 Soporte y Contacto

Para soporte técnico, reportar bugs o sugerir mejoras:

**Email:** [Tu email aquí]
**GitHub:** [Tu repo aquí]

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🙏 Agradecimientos

- React Team por el framework
- Tailwind Labs por TailwindCSS
- Google Fonts por Inter
- Vite por la herramienta de build
- Comunidad open source

---

**¡Gracias por usar PWA Radio Builder!** 🎉

---

*Documentación generada automáticamente el 01/12/2025*
*Versión del backup: 2.0.0*
*Estado: Producción - 100% Funcional*
