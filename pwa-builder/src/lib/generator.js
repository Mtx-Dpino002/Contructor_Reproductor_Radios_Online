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

/**
 * Genera paquete de archivos adicionales para conversión a APK
 * Incluye configuración de Bubblewrap y assetlinks.json
 */
export async function generateAPKPackage(config) {
  const files = {}
  
  // 1. Generar configuración de Bubblewrap
  files['bubblewrap.config.json'] = generateBubblewrapConfig(config)
  
  // 2. Generar assetlinks.json
  files['assetlinks.json'] = generateAssetLinks(config)
  
  // 3. Generar script de build
  files['build-apk.sh'] = generateBuildScript(config)
  files['build-apk.bat'] = generateBuildScriptWindows(config)
  
  // 4. Generar README específico para APK
  files['README-APK.md'] = generateAPKReadme(config)
  
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
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${(config.fontFamily || 'Inter').replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Lottie Web para animaciones -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
  
  <title>${config.name}</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body style="background-color: ${bgColor}; color: ${textColor}; font-family: '${config.fontFamily || 'Inter'}', sans-serif;">
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
    <div class="metadata-container" style="text-align: center; padding: 1.5rem 1rem; color: ${textColor};">
      <h2 class="song-title" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Esperando metadatos...</h2>
      <p class="song-artist" style="font-size: 1rem; opacity: 0.8;">-</p>
    </div>
    ` : ''}
    
    <!-- Player -->
    <div class="player-container" style="background-color: ${footerBg}; position: relative;">
      
      <!-- Animación de Audio Lottie -->
      ${(config.audioAnimation && config.audioAnimation !== 'none' && config.audioAnimationUrl) ? `
      <div id="audioAnimation" class="audio-animation-container"></div>
      ` : ''}
      
      <!-- Redes Sociales - Flotando sobre el footer -->
      ${(config.socialFacebook || config.socialX || config.socialInstagram || config.socialTelegram || config.socialTiktok || config.socialWebsite) ? `
      <div class="social-links-floating">
        ${config.socialFacebook ? `
        <a href="${config.socialFacebook}" target="_blank" rel="noopener noreferrer" class="social-icon-floating social-facebook" title="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        ` : ''}
        ${config.socialX ? `
        <a href="${config.socialX}" target="_blank" rel="noopener noreferrer" class="social-icon-floating social-x" title="X (Twitter)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        ` : ''}
        ${config.socialInstagram ? `
        <a href="${config.socialInstagram}" target="_blank" rel="noopener noreferrer" class="social-icon-floating social-instagram" title="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        ` : ''}
        ${config.socialTelegram ? `
        <a href="${config.socialTelegram}" target="_blank" rel="noopener noreferrer" class="social-icon-floating social-telegram" title="Telegram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
        ` : ''}
        ${config.socialTiktok ? `
        <a href="${config.socialTiktok}" target="_blank" rel="noopener noreferrer" class="social-icon-floating social-tiktok" title="TikTok">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        </a>
        ` : ''}
        ${config.socialWebsite ? `
        <a href="${config.socialWebsite}" target="_blank" rel="noopener noreferrer" class="social-icon-floating social-website" title="Página Web">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </a>
        ` : ''}
      </div>
      ` : ''}
    
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
    
    // Inicializar animación Lottie si existe
    ${(config.audioAnimation && config.audioAnimation !== 'none' && config.audioAnimationUrl) ? `
    if (typeof lottie !== 'undefined') {
      const animationContainer = document.getElementById('audioAnimation');
      if (animationContainer) {
        lottie.loadAnimation({
          container: animationContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '${config.audioAnimationUrl}'
        });
      }
    }
    ` : ''}
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
  const fontFamily = config.fontFamily || 'Inter'
  
  return `/* Estilos para ${config.name} */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
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
  border-radius: ${config.logoRoundness}%;
  margin-bottom: 2rem;
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
  margin-top: -40px;
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

.audio-animation-container {
  position: absolute;
  top: -208px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  width: ${config.audioAnimationSize || 120}px;
  height: ${(config.audioAnimationSize || 120) / 2}px;
  margin: 0 auto;
}

.social-links-floating {
  position: absolute;
  top: -64px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  z-index: 10;
  padding: 0 1rem;
}

.social-icon-floating {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.social-icon-floating:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.social-facebook {
  background: linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%);
}

.social-x {
  background: linear-gradient(135deg, #1f2937 0%, #000000 100%);
}

.social-instagram {
  background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%);
}

.social-telegram {
  background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);
}

.social-tiktok {
  background: linear-gradient(135deg, #111827 0%, #4b5563 100%);
}

.social-website {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
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
    border-radius: ${config.logoRoundness}%;
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

// ============================================
// FUNCIONES PARA GENERACIÓN DE APK
// ============================================

function generateBubblewrapConfig(config) {
  const appName = config.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const packageName = `com.radio.${appName}`
  
  const bubblewrapConfig = {
    packageId: packageName,
    host: 'tudominio.com',
    name: config.name,
    launcherName: config.name,
    display: 'standalone',
    themeColor: config.headerColor || '#667eea',
    backgroundColor: config.transparentMode ? '#ffffff' : '#1e293b',
    startUrl: '/',
    iconUrl: 'https://tudominio.com/icon-512.png',
    maskableIconUrl: 'https://tudominio.com/icon-512.png',
    monochromeIconUrl: 'https://tudominio.com/icon-192.png',
    includeNotification: false,
    shortcuts: [],
    signing: {
      file: './android.keystore',
      alias: 'android'
    },
    fallbackType: 'customtabs',
    enableNotifications: true,
    enableLocationDelegation: false,
    webManifestUrl: 'https://tudominio.com/manifest.json',
    splashScreenFadeOutDuration: 300
  }
  
  return JSON.stringify(bubblewrapConfig, null, 2)
}

function generateAssetLinks(config) {
  const appName = config.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const packageName = `com.radio.${appName}`
  
  const assetLinks = [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: packageName,
      sha256_cert_fingerprints: [
        'REEMPLAZAR_CON_SHA256_DEL_CERTIFICADO'
      ]
    }
  }]
  
  return JSON.stringify(assetLinks, null, 2)
}

function generateBuildScript(config) {
  const appName = config.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  return `#!/bin/bash

# Script de compilación APK para ${config.name}
# Asegúrate de tener Bubblewrap instalado: npm install -g @bubblewrap/cli

echo "🚀 Iniciando compilación de APK para ${config.name}"

# Verificar si Bubblewrap está instalado
if ! command -v bubblewrap &> /dev/null
then
    echo "❌ Bubblewrap no está instalado"
    echo "📦 Instalando Bubblewrap..."
    npm install -g @bubblewrap/cli
fi

# Verificar dependencias
echo "🔍 Verificando dependencias..."
bubblewrap doctor

# Construir APK
echo "🔨 Compilando APK..."
bubblewrap build

# Verificar si se generó el APK
if [ -f "./app-release-signed.apk" ]; then
    echo "✅ APK generado exitosamente: ./app-release-signed.apk"
    echo "📱 Puedes instalar este APK en dispositivos Android"
else
    echo "❌ Error al generar el APK"
    exit 1
fi

echo "🎉 Proceso completado"
`
}

function generateBuildScriptWindows(config) {
  const appName = config.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  return `@echo off
REM Script de compilacion APK para ${config.name}
REM Asegurate de tener Bubblewrap instalado: npm install -g @bubblewrap/cli

echo.
echo ================================
echo   Compilacion APK - ${config.name}
echo ================================
echo.

REM Verificar si Bubblewrap esta instalado
where bubblewrap >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Bubblewrap no esta instalado
    echo [+] Instalando Bubblewrap...
    call npm install -g @bubblewrap/cli
)

REM Verificar dependencias
echo [i] Verificando dependencias...
call bubblewrap doctor

REM Construir APK
echo [+] Compilando APK...
call bubblewrap build

REM Verificar si se genero el APK
if exist "app-release-signed.apk" (
    echo [OK] APK generado exitosamente: app-release-signed.apk
    echo [i] Puedes instalar este APK en dispositivos Android
) else (
    echo [X] Error al generar el APK
    exit /b 1
)

echo.
echo [OK] Proceso completado
pause
`
}

function generateAPKReadme(config) {
  const appName = config.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const packageName = `com.radio.${appName}`
  
  return `# Guía de Conversión a APK - ${config.name}

Este paquete contiene todo lo necesario para convertir tu PWA en una aplicación Android (APK).

## 📋 Requisitos Previos

1. **Node.js y npm** instalados
2. **Java JDK 11+** instalado
3. **Android SDK** configurado
4. Tu PWA subida a un servidor con **HTTPS**

## 🚀 Método 1: Bubblewrap CLI (Recomendado)

### Paso 1: Instalar Bubblewrap
\`\`\`bash
npm install -g @bubblewrap/cli
\`\`\`

### Paso 2: Verificar dependencias
\`\`\`bash
bubblewrap doctor
\`\`\`

Este comando verificará que tengas Java JDK y Android SDK instalados correctamente.

### Paso 3: Inicializar proyecto
\`\`\`bash
bubblewrap init --manifest https://tudominio.com/manifest.json
\`\`\`

**Configuración sugerida:**
- Package Name: \`${packageName}\`
- App Name: \`${config.name}\`
- Theme Color: \`${config.headerColor || '#667eea'}\`
- Background Color: \`${config.transparentMode ? '#ffffff' : '#1e293b'}\`

### Paso 4: Compilar APK
\`\`\`bash
bubblewrap build
\`\`\`

El APK se generará en: \`./app-release-signed.apk\`

### Uso de scripts incluidos:
**Linux/Mac:**
\`\`\`bash
chmod +x build-apk.sh
./build-apk.sh
\`\`\`

**Windows:**
\`\`\`cmd
build-apk.bat
\`\`\`

## 🌐 Método 2: PWABuilder (Sin instalación)

1. Sube tu PWA a: \`https://tudominio.com\`
2. Ve a: https://www.pwabuilder.com/
3. Ingresa tu URL y analiza
4. Descarga el paquete Android
5. Listo para publicar en Google Play Store

## 📱 Método 3: Android Studio (Avanzado)

### Paso 1: Crear proyecto
1. New Project > Empty Activity
2. Package name: \`${packageName}\`
3. Language: Kotlin/Java
4. Minimum SDK: API 21

### Paso 2: Agregar dependencia TWA
En \`build.gradle (app)\`:
\`\`\`gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
\`\`\`

### Paso 3: Configurar Manifest
\`\`\`xml
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
\`\`\`

### Paso 4: Configurar Digital Asset Links

Crea en tu servidor: \`https://tudominio.com/.well-known/assetlinks.json\`

Contenido (usa el archivo \`assetlinks.json\` incluido):
\`\`\`json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "${packageName}",
    "sha256_cert_fingerprints": ["TU_SHA256_AQUI"]
  }
}]
\`\`\`

Para obtener tu SHA256:
\`\`\`bash
keytool -list -v -keystore android.keystore -alias android -storepass password
\`\`\`

## 🔑 Firma del APK

### Crear keystore (primera vez):
\`\`\`bash
keytool -genkey -v -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

**Guarda bien la contraseña**, la necesitarás para actualizar la app.

### Firmar APK manualmente:
\`\`\`bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore android.keystore app-release-unsigned.apk android
zipalign -v 4 app-release-unsigned.apk ${appName}.apk
\`\`\`

## 📦 Archivos Incluidos

- \`bubblewrap.config.json\` - Configuración de Bubblewrap
- \`assetlinks.json\` - Verificación de dominio para TWA
- \`build-apk.sh\` - Script de compilación (Linux/Mac)
- \`build-apk.bat\` - Script de compilación (Windows)
- \`README-APK.md\` - Este archivo

## ✅ Checklist de Publicación

- [ ] PWA subida a servidor HTTPS
- [ ] Manifest.json accesible
- [ ] Service Worker funcionando
- [ ] Íconos 192x192 y 512x512 incluidos
- [ ] assetlinks.json en \`/.well-known/\`
- [ ] APK firmado con keystore
- [ ] Probado en dispositivo real
- [ ] Screenshots preparados (Google Play)
- [ ] Descripción y metadatos listos

## 🐛 Solución de Problemas

**Error: "Android SDK not found"**
- Instala Android Studio o Android SDK Command Line Tools
- Configura variable \`ANDROID_HOME\`

**Error: "Java not found"**
- Instala Java JDK 11 o superior
- Configura variable \`JAVA_HOME\`

**Error: "Manifest not found"**
- Verifica que tu PWA esté accesible vía HTTPS
- Comprueba que \`manifest.json\` esté en la raíz

**APK no instala en Android**
- Activa "Orígenes desconocidos" en Configuración
- Verifica firma del APK

## 📚 Recursos Adicionales

- [Documentación Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- [PWABuilder](https://www.pwabuilder.com/)
- [Trusted Web Activities](https://developers.google.com/web/android/trusted-web-activity)
- [Google Play Console](https://play.google.com/console/)

## 💡 Información de tu App

- **Nombre:** ${config.name}
- **Package:** ${packageName}
- **Dominio:** https://tudominio.com (actualizar con tu dominio)
- **Theme Color:** ${config.headerColor || '#667eea'}
- **Background:** ${config.transparentMode ? '#ffffff' : '#1e293b'}

---

**Generado con PWA Constructor v2.0**
`
}
