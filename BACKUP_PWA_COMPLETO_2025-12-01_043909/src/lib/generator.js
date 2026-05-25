/**
 * Generador de archivos PWA
 * Genera todos los archivos necesarios para la PWA de radio
 */

export async function generatePWA(config) {
  const files = {}
  
  // 1. Generar manifest.json
  files['manifest.json'] = generateManifest(config)
  
  // 2. Generar service worker
  files['sw.js'] = generateServiceWorker(config)
  
  // 3. Generar index.html
  files['index.html'] = generateIndexHTML(config)
  
  // 4. Generar app.js (lógica de la app)
  files['app.js'] = generateAppJS(config)
  
  // 5. Generar styles.css
  files['styles.css'] = generateStyles(config)
  
  // 6. Generar íconos (si están disponibles)
  if (config.icon) {
    files['icon-192.png'] = config.icon
    files['icon-512.png'] = config.icon
  }
  
  if (config.logo) {
    files['logo.png'] = config.logo
  }
  
  // 7. Generar README
  files['README.md'] = generateReadme(config)
  
  return files
}

function generateManifest(config) {
  const manifest = {
    name: config.name,
    short_name: config.name.substring(0, 12),
    description: `Aplicación móvil de ${config.name}`,
    start_url: '/',
    display: 'standalone',
    background_color: config.transparentMode ? 'transparent' : '#1e293b',
    theme_color: config.headerColor || '#667eea',
    orientation: 'portrait',
    icons: [
      {
        src: 'icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: 'icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    categories: ['music', 'entertainment'],
    lang: 'es'
  }
  
  return JSON.stringify(manifest, null, 2)
}

function generateServiceWorker(config) {
  return `// Service Worker para ${config.name}
const CACHE_NAME = '${config.name.toLowerCase().replace(/\\s+/g, '-')}-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/logo.png',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antigua');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  // No cachear peticiones de streaming
  if (event.request.url.includes('stream')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
`
}

function generateIndexHTML(config) {
  // Usar colores personalizados
  const bgColor = config.transparentMode ? 'transparent' : '#1e293b'
  const textColor = config.textColor || '#ffffff'
  const headerBg = config.transparentMode ? 'transparent' : (config.headerColor || '#667eea')
  const footerBg = config.transparentMode ? 'transparent' : (config.footerColor || '#764ba2')
  const overlayStyle = config.overlayOpacity > 0 ? `
    position: fixed;
    inset: 0;
    background-color: ${config.overlayColor || '#000000'};
    opacity: ${(config.overlayOpacity || 0) / 100};
    pointer-events: none;
    z-index: 1;
  ` : ''
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${config.name} - Tu radio favorita">
  <meta name="theme-color" content="${config.headerColor || '#667eea'}">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="${config.name}">
  
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
  <link rel="apple-touch-icon" href="/icon-192.png">
  
  <title>${config.name}</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body style="background-color: ${bgColor}; color: ${textColor};">
  ${config.overlayOpacity > 0 ? `<div style="${overlayStyle}"></div>` : ''}
  <div class="app-container" style="position: relative; z-index: 2;">
    <!-- Header -->
    <header class="app-header" style="background-color: ${headerBg}; color: ${textColor};">
      <img src="/logo.png" alt="${config.name}" class="app-logo" onerror="this.style.display='none'">
      <h1 class="app-title" style="color: ${textColor};">${config.name}</h1>
      <p class="app-subtitle" style="color: ${textColor};">Tu radio favorita siempre contigo</p>
    </header>
    
    ${config.metadataPanelType && config.metadataPanelType !== 'none' ? `
    <!-- Metadatos de la canción -->
    <div class="metadata-container" style="text-align: center; padding: 1rem; color: ${textColor};">
      <h2 class="song-title" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Esperando metadatos...</h2>
      <p class="song-artist" style="font-size: 1rem; opacity: 0.8;">-</p>
    </div>
    ` : ''}
    
    <!-- Player -->
    <div class="player-container" style="background-color: ${footerBg};">
      <div class="player-status">
        <div id="statusIcon" class="status-icon">▶️</div>
        <p id="statusText" class="status-text" style="color: ${textColor};">Presiona play para escuchar</p>
      </div>
      
      <div class="player-controls">
        <button id="playBtn" class="play-button" style="background-color: ${config.headerColor || '#667eea'};">
          <svg id="playIcon" width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      
      <div class="volume-control">
        <span class="volume-icon" style="color: ${textColor};">🔈</span>
        <input type="range" id="volumeSlider" min="0" max="100" value="70" class="volume-slider">
        <span class="volume-icon" style="color: ${textColor};">🔊</span>
      </div>
      
      <div class="stream-info">
        <p style="color: ${textColor}; opacity: 0.7;">Transmisión en vivo · 24/7</p>
      </div>
    </div>
    
    <!-- Audio element -->
    <audio id="audioPlayer" preload="none" src="${config.streamUrl}"></audio>
  </div>
  
  <script src="/app.js"></script>
  <script>
    // Registro del Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('Service Worker registrado', reg))
          .catch(err => console.log('Error al registrar SW', err));
      });
    }
  </script>
</body>
</html>
`
}

function generateAppJS(config) {
  const hasMetadata = config.metadataPanelType && config.metadataPanelType !== 'none' && config.metadataApiUrl
  
  return `// App JavaScript para ${config.name}

let isPlaying = false;
let audioPlayer = null;
${hasMetadata ? 'let metadataInterval = null;' : ''}

document.addEventListener('DOMContentLoaded', () => {
  audioPlayer = document.getElementById('audioPlayer');
  const playBtn = document.getElementById('playBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const statusIcon = document.getElementById('statusIcon');
  const statusText = document.getElementById('statusText');
  const playIcon = document.getElementById('playIcon');
  
  // Set initial volume
  audioPlayer.volume = volumeSlider.value / 100;
  
  // Play/Pause button
  playBtn.addEventListener('click', togglePlay);
  
  // Volume control
  volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
  });
  
  // Audio events
  audioPlayer.addEventListener('playing', () => {
    statusIcon.textContent = '🎵';
    statusText.textContent = 'Reproduciendo en vivo';
    playIcon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
  });
  
  audioPlayer.addEventListener('pause', () => {
    statusIcon.textContent = '▶️';
    statusText.textContent = 'Presiona play para escuchar';
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  });
  
  audioPlayer.addEventListener('waiting', () => {
    statusIcon.textContent = '⏳';
    statusText.textContent = 'Cargando...';
  });
  
  audioPlayer.addEventListener('error', () => {
    statusIcon.textContent = '❌';
    statusText.textContent = 'Error al cargar el stream';
    isPlaying = false;
  });

  ${hasMetadata ? `
  // Iniciar obtención de metadatos
  startMetadataFetch();
  metadataInterval = setInterval(startMetadataFetch, 10000);
  ` : ''}
});

function togglePlay() {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
  } else {
    audioPlayer.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.error('Error al reproducir:', err);
      alert('No se pudo reproducir el stream. Verifica la URL.');
    });
  }
}

${hasMetadata ? generateMetadataFunctions(config) : ''}

// Detectar si la app está instalada
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  console.log('PWA lista para instalar');
});

window.addEventListener('appinstalled', () => {
  console.log('PWA instalada exitosamente');
});
`
}

function generateMetadataFunctions(config) {
  return `
// Sistema de metadatos
async function startMetadataFetch() {
  const panelType = '${config.metadataPanelType}';
  const apiUrl = '${config.metadataApiUrl}';
  const artworkUrl = '${config.metadataArtworkUrl || ''}';
  
  try {
    const metadata = await fetchMetadata(panelType, apiUrl, artworkUrl);
    if (metadata) {
      updateMetadataUI(metadata);
    }
  } catch (error) {
    console.error('Error al obtener metadatos:', error);
  }
}

async function fetchMetadata(panelType, apiUrl, artworkUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return null;
    
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return parseMetadataByPanel(panelType, data, artworkUrl);
    } else if (contentType && (contentType.includes('xml') || contentType.includes('text/xml'))) {
      // Para RadioBoss XML
      const xmlText = await response.text();
      return parseMetadataByPanel(panelType, xmlText, artworkUrl);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching metadata:', error);
function parseMetadataByPanel(panelType, data, artworkUrl) {
  switch(panelType) {
    case 'azuracast':

function parseMetadataByPanel(panelType, data) {
  switch(panelType) {
    case 'azuracast':
      const nowPlaying = data.now_playing || data;
      return {
        title: nowPlaying.song?.title || nowPlaying.title || 'Desconocido',
        artist: nowPlaying.song?.artist || nowPlaying.artist || 'Desconocido',
        artwork: nowPlaying.song?.art || nowPlaying.art || null
      };
    
    case 'shoutcast':
    case 'icecast':
      let songTitle = data.songtitle || data.title || data.currenttrack || '';
      const parts = songTitle.split(' - ');
      return {
        title: parts.length > 1 ? parts[1].trim() : songTitle,
        artist: parts.length > 1 ? parts[0].trim() : 'Desconocido',
        artwork: data.artwork || data.albumart || null
      };
    
    case 'centova':
      const track = data.track || data.song || data.title || '';
      const trackParts = track.split(' - ');
      return {
        title: trackParts.length > 1 ? trackParts[1].trim() : track,
        artist: trackParts.length > 1 ? trackParts[0].trim() : 'Desconocido',
        artwork: data.artwork || data.albumart || null
      };
    
    case 'sonic':
      // Sonic Panel estructura
      let sonicTitle = data.title || data.song_title || data.track || '';
      let sonicArtist = data.artist || data.song_artist || 'Desconocido';
      
      // Si viene en formato "Artist - Title"
      if (!data.artist && sonicTitle.includes(' - ')) {
        const sonicParts = sonicTitle.split(' - ');
        sonicArtist = sonicParts[0].trim();
        sonicTitle = sonicParts[1].trim();
      }
      
      return {
        title: sonicTitle,
        artist: sonicArtist,
        artwork: data.artwork || data.cover_url || data.album_art || null
      };
    
    case 'castfm':
      // Cast.FM estructura moderna
      const current = data.current_track || data.now_playing || data;
      return {
        title: current.title || current.song || 'Desconocido',
        artist: current.artist || current.performer || 'Desconocido',
        artwork: current.artwork_url || current.cover || current.image || null
      };
    
    case 'radioboss':
      // RadioBoss puede venir como JSON o necesitar parseo de XML en el cliente
      let rbTitle = 'Desconocido';
      let rbArtist = 'Desconocido';
      let rbArtwork = null;
      
      if (typeof data === 'object' && !data.documentElement) {
        // JSON
        const track = Array.isArray(data) ? data[0] : data;
        rbTitle = track.title || track.TITLE || 'Desconocido';
        rbArtist = track.artist || track.ARTIST || 'Desconocido';
        rbArtwork = track.cover || track.artwork || track.albumart || track.art || null;
      } else if (typeof data === 'string') {
        // XML como string - parsear en cliente
        try {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, 'text/xml');
          const currentTrack = xml.querySelector('CurrentTrack TRACK, Info CurrentTrack TRACK');
          
          if (currentTrack) {
            rbTitle = currentTrack.getAttribute('TITLE') || 'Desconocido';
            rbArtist = currentTrack.getAttribute('ARTIST') || 'Desconocido';
          }
        } catch (e) {
          console.error('Error parsing RadioBoss XML:', e);
        }
      }
      
      // Detectar URL base de RadioBoss para artwork automático
      let baseUrl = apiUrl;
      if (apiUrl.includes('/xml/')) {
        baseUrl = apiUrl.split('/xml/')[0];
      } else if (apiUrl.includes('/played')) {
        baseUrl = apiUrl.split('/played')[0];
      } else if (apiUrl.includes('/currentsong')) {
        baseUrl = apiUrl.split('/currentsong')[0];
      }
      
      // Extraer parámetros query si existen
      let queryParams = '';
      if (baseUrl.includes('?')) {
        const parts = baseUrl.split('?');
        baseUrl = parts[0];
        queryParams = '?' + parts[1];
      }
      
      // URL automática de artwork de RadioBoss
      const autoArtworkUrl = queryParams 
        ? baseUrl + queryParams + '&action=trackartwork'
        : baseUrl + '?action=trackartwork';
      
      // Asignar artwork
      if (!rbArtwork) {
        if (artworkUrl) {
          // Usuario proporcionó URL personalizada con variables
          rbArtwork = artworkUrl
            .replace('{artist}', encodeURIComponent(rbArtist))
            .replace('{title}', encodeURIComponent(rbTitle))
            .replace('{ARTIST}', encodeURIComponent(rbArtist))
            .replace('{TITLE}', encodeURIComponent(rbTitle));
        } else {
          // Usar endpoint automático de RadioBoss
          rbArtwork = autoArtworkUrl;
        }
      }
      
      return {
        title: rbTitle,
        artist: rbArtist,
        artwork: rbArtwork
      };
    
    default:
      return null;
      return null;
  }
}

function updateMetadataUI(metadata) {
  // Actualizar carátula si existe
  const logoElement = document.querySelector('.app-logo');
  if (metadata.artwork && logoElement) {
    logoElement.src = metadata.artwork;
  }
  
  // Actualizar título de la canción
  const titleElement = document.querySelector('.song-title');
  if (titleElement) {
    titleElement.textContent = metadata.title;
  }
  
  // Actualizar artista
  const artistElement = document.querySelector('.song-artist');
  if (artistElement) {
    artistElement.textContent = metadata.artist;
  }
}
`
}

function generateStyles(config) {
  const isDark = config.theme === 'dark'
  const bgColor = isDark ? '#1e293b' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#1e293b'
  
  return `/* Estilos para ${config.name} */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${bgColor};
  color: ${textColor};
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 2rem;
  text-align: center;
  color: white;
}

.app-logo {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  object-fit: cover;
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.player-container {
  flex: 1;
  padding: 2rem;
  border-radius: 30px 30px 0 0;
  margin-top: -20px;
  box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.2);
}

.player-status {
  text-align: center;
  margin-bottom: 2rem;
}

.status-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.status-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.player-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button:active {
  transform: scale(0.95);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.volume-icon {
  font-size: 1.5rem;
}

.volume-slider {
  flex: 1;
  height: 8px;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${config.primaryColor};
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.volume-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${config.primaryColor};
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: none;
}

.stream-info {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .app-title {
    font-size: 1.5rem;
  }
  
  .app-logo {
    width: 100px;
    height: 100px;
  }
  
  .play-button {
    width: 70px;
    height: 70px;
  }
}
`
}

function generateReadme(config) {
  return `# ${config.name} - Aplicación PWA

Esta es una Progressive Web App (PWA) generada automáticamente para ${config.name}.

## 🚀 Características

- ✅ Instalable en dispositivos móviles
- ✅ Funciona offline (caché de recursos)
- ✅ Reproductor de audio en streaming
- ✅ Diseño responsive
- ✅ Control de volumen
- ✅ Interfaz moderna y limpia

## 📱 Instalación

### En el navegador web:
1. Abre la aplicación desde tu navegador móvil (requiere HTTPS)
2. Busca la opción "Añadir a pantalla de inicio" o "Instalar aplicación"
3. Confirma la instalación

### Como APK para Android:
Puedes convertir esta PWA a APK usando:

**Opción 1: Bubblewrap CLI**
\`\`\`bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://tudominio.com/manifest.json
bubblewrap build
\`\`\`

**Opción 2: PWABuilder.com**
1. Ve a https://www.pwabuilder.com/
2. Ingresa la URL de tu PWA
3. Descarga el paquete para Android

## 🔧 Configuración

- **Nombre:** ${config.name}
- **URL del Stream:** ${config.streamUrl}
- **Tema:** ${config.theme}
- **Color Primario:** ${config.primaryColor}
- **Color Secundario:** ${config.secondaryColor}

## 📦 Archivos incluidos

- \`index.html\` - Página principal
- \`manifest.json\` - Configuración de la PWA
- \`sw.js\` - Service Worker para funcionalidad offline
- \`app.js\` - Lógica de la aplicación
- \`styles.css\` - Estilos
- \`icon-192.png\` y \`icon-512.png\` - Íconos de la app
- \`logo.png\` - Logo de la emisora

## 🌐 Despliegue

Sube todos los archivos a tu servidor web. Requisitos:
- Servidor con HTTPS (obligatorio para PWA)
- Todos los archivos en el mismo directorio

## 📝 Licencia

Generado con PWA Builder
`
}
