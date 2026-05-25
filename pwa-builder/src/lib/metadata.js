/**
 * Sistema de obtención de metadatos para diferentes paneles de radio
 */

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
  [PANEL_TYPES.NONE]: 'Sin metadatos',
  [PANEL_TYPES.AZURACAST]: 'AzuraCast',
  [PANEL_TYPES.SHOUTCAST]: 'SHOUTcast',
  [PANEL_TYPES.ICECAST]: 'Icecast',
  [PANEL_TYPES.CENTOVA]: 'Centova Cast',
  [PANEL_TYPES.RADIOBOSS]: 'RadioBoss Cloud',
  [PANEL_TYPES.SONIC]: 'Sonic Panel',
  [PANEL_TYPES.CASTFM]: 'Cast.FM'
}

/**
 * Obtener metadatos desde AzuraCast
 */
async function fetchAzuraCast(apiUrl) {
  try {
    // AzuraCast tiene varios endpoints posibles
    const endpoints = [
      apiUrl,
      `${apiUrl}/nowplaying`,
      `${apiUrl}/api/nowplaying`,
      `${apiUrl}/api/nowplaying/1`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const data = await response.json()
        
        // Detectar estructura: puede ser objeto directo o array de estaciones
        let nowPlaying = null
        
        if (Array.isArray(data)) {
          // Array de estaciones, tomar la primera
          nowPlaying = data[0]?.now_playing || data[0]
        } else if (data.now_playing) {
          // Objeto con now_playing
          nowPlaying = data.now_playing
        } else {
          // Objeto directo
          nowPlaying = data
        }
        
        if (nowPlaying) {
          // Extraer información de la canción (puede estar en song o directo)
          const song = nowPlaying.song || nowPlaying
          
          return {
            title: song.title || song.text || nowPlaying.title || 'Desconocido',
            artist: song.artist || nowPlaying.artist || 'Desconocido',
            artwork: song.art || song.cover || song.artwork || nowPlaying.art || null,
            album: song.album || nowPlaying.album || null
          }
        }
      } catch (e) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error AzuraCast:', error)
    return null
  }
}

/**
 * Obtener metadatos desde SHOUTcast
 */
async function fetchShoutcast(apiUrl) {
  try {
    // Intenta diferentes endpoints comunes de SHOUTcast
    const endpoints = [
      apiUrl,
      `${apiUrl}/stats?json=1`,
      `${apiUrl}/stats`,
      `${apiUrl}/currentsong?sid=1`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const contentType = response.headers.get('content-type')
        
        if (contentType?.includes('application/json')) {
          const data = await response.json()
          
          // Parsear diferentes estructuras de SHOUTcast (v1, v2, DNAS)
          let songTitle = data.songtitle || data.title || data.currenttrack || 
                          data.song || data.nowplaying || data.track || ''
          
          // Algunos paneles usan estructura anidada
          if (!songTitle && data.now_playing) {
            songTitle = data.now_playing.song || data.now_playing.title || ''
          }
          
          if (songTitle) {
            const parts = songTitle.split(' - ')
            return {
              title: parts.length > 1 ? parts[1].trim() : songTitle,
              artist: parts.length > 1 ? parts[0].trim() : 'Desconocido',
              artwork: data.artwork || data.albumart || data.art || data.cover ||
                       data.coverart || data.album_art || null,
              album: data.album || null
            }
          }
        } else {
          // Respuesta de texto plano
          const text = await response.text()
          if (text) {
            const parts = text.split(' - ')
            return {
              title: parts.length > 1 ? parts[1].trim() : text,
              artist: parts.length > 1 ? parts[0].trim() : 'Desconocido',
              artwork: null,
              album: null
            }
          }
        }
      } catch (e) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error SHOUTcast:', error)
    return null
  }
}

/**
 * Obtener metadatos desde Icecast
 */
async function fetchIcecast(apiUrl) {
  try {
    // Intenta endpoint JSON de Icecast
    const endpoints = [
      apiUrl,
      `${apiUrl}/status-json.xsl`,
      `${apiUrl}/status.xsl`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const data = await response.json()
        const source = data.icestats?.source || data.source
        
        if (source) {
          const sourceData = Array.isArray(source) ? source[0] : source
          const title = sourceData.title || sourceData.server_name || ''
          
          const parts = title.split(' - ')
          return {
            title: parts.length > 1 ? parts[1].trim() : title,
            artist: parts.length > 1 ? parts[0].trim() : 'Desconocido',
            artwork: null,
            album: null
          }
        }
      } catch (e) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error Icecast:', error)
    return null
  }
}

/**
 * Obtener metadatos desde Centova Cast
 */
async function fetchCentova(apiUrl) {
  try {
    const endpoints = [
      apiUrl,
      `${apiUrl}/system/streaminfo.json`,
      `${apiUrl}/external/rpc.php?m=streaminfo.get`,
      `${apiUrl}/rpc.php`,
      `${apiUrl}/streaminfo.json`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const data = await response.json()
        
        // Centova puede tener diferentes estructuras
        let track = ''
        let artwork = null
        let album = null
        
        if (data.data) {
          // Estructura con data wrapper
          const streamData = data.data
          track = streamData.track || streamData.song || streamData.title || ''
          artwork = streamData.artwork || streamData.cover || null
          album = streamData.album || null
        } else {
          // Estructura directa
          track = data.track || data.song || data.title || data.nowplaying || ''
          artwork = data.artwork || data.albumart || data.art || data.cover || null
          album = data.album || null
        }
        
        if (track) {
          const parts = track.split(' - ')
          return {
            title: parts.length > 1 ? parts[1].trim() : track,
            artist: parts.length > 1 ? parts[0].trim() : 'Desconocido',
            artwork: artwork,
            album: album
          }
        }
      } catch (e) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error Centova:', error)
    return null
  }
}

/**
 * Obtener metadatos desde Sonic Panel
 * Sonic Panel es similar a Centova pero con estructura propia
 */
async function fetchSonic(apiUrl) {
  try {
    const endpoints = [
      apiUrl,
      `${apiUrl}/cp/get/now_playing`,
      `${apiUrl}/public/nowplaying`,
      `${apiUrl}/api/nowplaying`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const data = await response.json()
        
        // Sonic Panel estructura típica
        let title = data.title || data.song_title || data.track || ''
        let artist = data.artist || data.song_artist || 'Desconocido'
        let artwork = data.artwork || data.cover_url || data.album_art || null
        let album = data.album || null
        
        // Si viene en formato "Artist - Title"
        if (!artist || artist === 'Desconocido') {
          const fullTitle = title || data.now_playing || ''
          const parts = fullTitle.split(' - ')
          if (parts.length > 1) {
            artist = parts[0].trim()
            title = parts[1].trim()
          }
        }
        
        if (title) {
          return {
            title: title,
            artist: artist,
            artwork: artwork,
            album: album
          }
        }
      } catch (e) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error Sonic Panel:', error)
    return null
  }
}

/**
 * Obtener metadatos desde Cast.FM
 * Cast.FM es un panel moderno con API bien estructurada
 */
async function fetchCastFM(apiUrl) {
  try {
    const endpoints = [
      apiUrl,
      `${apiUrl}/api/v1/nowplaying`,
      `${apiUrl}/nowplaying`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const data = await response.json()
        
        // Cast.FM estructura moderna
        const current = data.current_track || data.now_playing || data
        
        return {
          title: current.title || current.song || 'Desconocido',
          artist: current.artist || current.performer || 'Desconocido',
          artwork: current.artwork_url || current.cover || current.image || null,
          album: current.album || null
        }
      } catch (e) {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error Cast.FM:', error)
    return null
  }
}

/**
 * Obtener metadatos desde RadioBoss Cloud
 */
async function fetchRadioboss(apiUrl, artworkUrl = null) {
  try {
    // Detectar URL base de RadioBoss (antes de /xml/status.xml u otros paths)
    let baseUrl = apiUrl
    if (apiUrl.includes('/xml/')) {
      baseUrl = apiUrl.split('/xml/')[0]
    } else if (apiUrl.includes('/played')) {
      baseUrl = apiUrl.split('/played')[0]
    } else if (apiUrl.includes('/currentsong')) {
      baseUrl = apiUrl.split('/currentsong')[0]
    }
    
    // Si tiene parámetros query (ej: ?pass=xxx), los extraemos
    let queryParams = ''
    if (baseUrl.includes('?')) {
      const parts = baseUrl.split('?')
      baseUrl = parts[0]
      queryParams = '?' + parts[1]
    }
    
    // URL automática de artwork de RadioBoss (si no se proporciona una personalizada)
    const autoArtworkUrl = queryParams 
      ? `${baseUrl}${queryParams}&action=trackartwork`
      : `${baseUrl}?action=trackartwork`
    
    const endpoints = [
      apiUrl,
      `${apiUrl}/played.json`,
      `${apiUrl}/played`,
      `${apiUrl}/xml/status.xml`,
      `${apiUrl}/currentsong`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) continue
        
        const contentType = response.headers.get('content-type')
        let metadata = null
        
        if (contentType?.includes('application/json')) {
          const data = await response.json()
          
          // RadioBoss puede devolver array o objeto
          const track = Array.isArray(data) ? data[0] : data
          
          metadata = {
            title: track.title || track.TITLE || track.songtitle || 'Desconocido',
            artist: track.artist || track.ARTIST || track.songartist || 'Desconocido',
            artwork: track.cover || track.artwork || track.albumart || track.art || null,
            album: track.album || track.ALBUM || null,
            duration: track.duration || track.DURATION || null,
            year: track.year || track.YEAR || null,
            genre: track.genre || track.GENRE || null
          }
        } else if (contentType?.includes('xml') || endpoint.includes('.xml')) {
          const text = await response.text()
          const parser = new DOMParser()
          const xml = parser.parseFromString(text, 'text/xml')
          
          // RadioBoss estructura: <Info><CurrentTrack><TRACK ARTIST="..." TITLE="..." />
          const currentTrack = xml.querySelector('CurrentTrack TRACK, CURRENTTRACK TRACK, Info CurrentTrack TRACK')
          
          if (currentTrack) {
            const artist = currentTrack.getAttribute('ARTIST') || ''
            const title = currentTrack.getAttribute('TITLE') || ''
            const album = currentTrack.getAttribute('ALBUM') || ''
            const year = currentTrack.getAttribute('YEAR') || ''
            const genre = currentTrack.getAttribute('GENRE') || ''
            const duration = currentTrack.getAttribute('DURATION') || ''
            const castTitle = currentTrack.getAttribute('CASTTITLE') || ''
            const itemTitle = currentTrack.getAttribute('ITEMTITLE') || ''
            
            metadata = {
              title: title || itemTitle.split(' - ')[1]?.trim() || 'Desconocido',
              artist: artist || itemTitle.split(' - ')[0]?.trim() || 'Desconocido',
              artwork: null,
              album: album || null,
              duration: duration || null,
              year: year || null,
              genre: genre || null,
              castTitle: castTitle || null,
              itemTitle: itemTitle || null
            }
          } else {
            // Fallback: buscar cualquier elemento TRACK
            const track = xml.querySelector('TRACK')
            if (track) {
              metadata = {
                title: track.getAttribute('TITLE') || 'Desconocido',
                artist: track.getAttribute('ARTIST') || 'Desconocido',
                artwork: null,
                album: track.getAttribute('ALBUM') || null,
                duration: track.getAttribute('DURATION') || null,
                year: track.getAttribute('YEAR') || null,
                genre: track.getAttribute('GENRE') || null
              }
            }
          }
        } else {
          // Texto plano - formato: Artist - Title
          const text = await response.text()
          if (text) {
            const parts = text.split(' - ')
            metadata = {
              title: parts.length > 1 ? parts[1].trim() : text.trim(),
              artist: parts.length > 1 ? parts[0].trim() : 'Desconocido',
              artwork: null,
              album: null,
              duration: null,
              year: null,
              genre: null
            }
          }
        }
        
        // Asignar artwork según disponibilidad
        if (metadata && !metadata.artwork) {
          if (artworkUrl) {
            // Usuario proporcionó URL personalizada con variables
            metadata.artwork = artworkUrl
              .replace('{artist}', encodeURIComponent(metadata.artist))
              .replace('{title}', encodeURIComponent(metadata.title))
              .replace('{ARTIST}', encodeURIComponent(metadata.artist))
              .replace('{TITLE}', encodeURIComponent(metadata.title))
              .replace('{album}', encodeURIComponent(metadata.album || ''))
              .replace('{ALBUM}', encodeURIComponent(metadata.album || ''))
              .replace('{year}', metadata.year || '')
              .replace('{YEAR}', metadata.year || '')
          } else {
            // Usar endpoint automático de RadioBoss para artwork
            metadata.artwork = autoArtworkUrl
          }
        }
        
        if (metadata) return metadata
      } catch (e) {
        console.error('Error en endpoint:', e)
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error('Error RadioBoss:', error)
    return null
  }
}

/**
 * Función principal para obtener metadatos según el tipo de panel
 */
export async function fetchMetadata(panelType, apiUrl, artworkUrl = null) {
  if (!apiUrl || panelType === PANEL_TYPES.NONE) {
    return null
  }
  
  try {
    switch (panelType) {
      case PANEL_TYPES.AZURACAST:
        return await fetchAzuraCast(apiUrl)
      
      case PANEL_TYPES.SHOUTCAST:
        return await fetchShoutcast(apiUrl)
      
      case PANEL_TYPES.ICECAST:
        return await fetchIcecast(apiUrl)
      
      case PANEL_TYPES.CENTOVA:
        return await fetchCentova(apiUrl)
      
      case PANEL_TYPES.RADIOBOSS:
        return await fetchRadioboss(apiUrl, artworkUrl)
      
      case PANEL_TYPES.SONIC:
        return await fetchSonic(apiUrl)
      
      case PANEL_TYPES.CASTFM:
        return await fetchCastFM(apiUrl)
      
      default:
        return null
    }
  } catch (error) {
    console.error('Error al obtener metadatos:', error)
    return null
  }
}

/**
 * Hook para actualización automática de metadatos
 */
export function startMetadataPolling(panelType, apiUrl, callback, interval = 10000, artworkUrl = null) {
  if (!apiUrl || panelType === PANEL_TYPES.NONE) {
    return null
  }
  
  // Primera carga inmediata
  fetchMetadata(panelType, apiUrl, artworkUrl).then(callback)
  
  // Polling periódico
  const intervalId = setInterval(() => {
    fetchMetadata(panelType, apiUrl, artworkUrl).then(callback)
  }, interval)
  
  return intervalId
}
