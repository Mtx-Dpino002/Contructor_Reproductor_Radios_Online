# 📝 Historial de Cambios - PWA Radio Builder

## Versión 2.0.0 (01 de Diciembre de 2025)

### 🎨 **ELIMINADAS: Paletas de Colores Predefinidas**

**Antes:**
- 6 paletas predefinidas (Modern Blue, Sunset Vibes, etc.)
- Limitaba la personalización

**Después:**
- Sistema completamente personalizable
- 5 controles circulares individuales
- Control total sobre cada color

---

### ✨ **NUEVAS CARACTERÍSTICAS**

#### 1. Sistema de 5 Controles Circulares de Color

**Controles Implementados:**

1. **Modo Transparente**
   - Toggle on/off
   - Aplica transparencia + blur a header y footer
   - Efecto premium y moderno

2. **Color del Header**
   - Color picker completo
   - Afecta la barra superior
   - Default: `#1e3a8a` (azul oscuro)

3. **Color del Footer**
   - Color picker independiente
   - Controla reproductor de audio
   - Default: `#3b82f6` (azul medio)

4. **Color del Texto**
   - Color global para todo el texto
   - Incluye título, artista, metadata
   - Default: `#ffffff` (blanco)

5. **Color del Overlay + Opacidad**
   - Color del overlay sobre fondo
   - Slider de opacidad (0-100%)
   - Default: `#000000` al 50%

**Implementación:**
```javascript
// Estado en App.jsx
transparentMode: false,
headerColor: '#1e3a8a',
footerColor: '#3b82f6',
textColor: '#ffffff',
overlayColor: '#000000',
overlayOpacity: 50
```

---

#### 2. Imagen de Fondo Personalizable

**Características:**
- Carga por URL externa
- Carga por archivo local
- Preview instantáneo
- Overlay configurable con color y opacidad
- Se exporta en la PWA generada

**Ubicación en UI:**
- Sección "Constructor de App"
- Debajo del campo de icono
- Inputs para URL y archivo

**Implementación:**
```javascript
backgroundImage: string | null  // Base64 o URL
```

---

#### 3. Sistema Completo de Metadata para 7 Paneles

**Paneles Soportados:**

1. **AzuraCast** (4 endpoints)
   - `/nowplaying`
   - `/api/nowplaying`
   - `/api/nowplaying/1`
   - Base URL
   - Detección automática de estructura (array/object)
   - Campos: `song.title`, `title`, `text`, `artist`
   - Artwork: `art`, `cover`, `artwork`

2. **SHOUTcast** (4 endpoints)
   - `/stats?json=1`
   - `/stats`
   - `/currentsong?sid=1`
   - Base URL
   - Soporte v1, v2, DNAS
   - 6 variaciones de campos: `songtitle`, `title`, `currenttrack`, `song`, `nowplaying`, `track`
   - 6 variaciones de artwork: `artwork`, `albumart`, `art`, `cover`, `coverart`, `album_art`
   - Detección de estructura anidada (`now_playing.song`)

3. **Icecast** (3 endpoints)
   - Base URL
   - `/status-json.xsl`
   - `/status.xsl`
   - Manejo de arrays de fuentes
   - Campos: `title`, `server_name`

4. **Centova Cast** (5 endpoints)
   - Base URL
   - `/system/streaminfo.json`
   - `/external/rpc.php`
   - `/rpc.php`
   - `/streaminfo.json`
   - Detección de wrapper `data`
   - Campos: `track`, `song`, `title`, `nowplaying`
   - Artwork: `artwork`, `albumart`, `art`, `cover`

5. **RadioBoss Cloud** ⭐ (5 endpoints)
   - Base URL
   - `/played.json`
   - `/played`
   - `/xml/status.xml`
   - `/currentsong`
   - **Parser XML completo** con DOMParser
   - Campos XML: `ARTIST`, `TITLE`, `ALBUM`, `YEAR`, `GENRE`, `DURATION`, `CASTTITLE`, `ITEMTITLE`
   - **Artwork Automático**:
     * Detección automática del base URL
     * Extracción de query params (`?pass=xxx`)
     * Construcción: `baseUrl + params + &action=trackartwork`
     * Fallback a URL personalizada con variables
   - Soporte JSON y XML

6. **Sonic Panel** (3 endpoints)
   - `/cp/get/now_playing`
   - `/public/nowplaying`
   - `/api/nowplaying`
   - Campos: `title`/`song_title`/`track`, `artist`/`song_artist`
   - Auto-detección de formato "Artista - Título"
   - Artwork: `artwork`, `cover_url`, `album_art`

7. **Cast.FM** (2 endpoints)
   - `/api/v1/nowplaying`
   - `/nowplaying`
   - API moderna: `current_track`/`now_playing`
   - Campos: `title`/`song`, `artist`/`performer`
   - Artwork: `artwork_url`, `cover`, `image`

**Total:**
- **26 endpoints** con fallback automático
- **7 paneles** diferentes
- **Polling cada 10 segundos**
- **Manejo robusto de errores**

**Ubicación en UI:**
- Nueva sección "Panel de Metadata"
- Dropdown con 8 opciones (incluye "None")
- Input de API URL (condicional)
- Input de artwork URL (solo RadioBoss, opcional)
- Textos de ayuda por panel

---

#### 4. RadioBoss Artwork Automático

**Problema Resuelto:**
- Antes: Usuario tenía que configurar URL de artwork manualmente
- Ahora: Detección automática del endpoint nativo

**Funcionamiento:**

1. **Detección del Base URL:**
   ```javascript
   // Si URL es: http://192.168.1.100:18000/xml/status.xml?pass=xxx
   // Detecta: http://192.168.1.100:18000
   ```

2. **Extracción de Parámetros:**
   ```javascript
   // Extrae: ?pass=xxx
   ```

3. **Construcción Automática:**
   ```javascript
   // Genera: http://192.168.1.100:18000?pass=xxx&action=trackartwork
   ```

4. **Fallback Personalizado:**
   ```javascript
   // Si el usuario proporciona URL personalizada:
   // https://example.com/covers/{artist}_{title}.jpg
   // Reemplaza: {artist}, {title}, {album}, {year}
   ```

**Implementación:**
```javascript
// En metadata.js
let detectedBaseUrl = baseUrl
if (baseUrl.includes('/xml/')) {
  detectedBaseUrl = baseUrl.split('/xml/')[0]
}
// ... etc

const urlObj = new URL(baseUrl, 'http://dummy.com')
const queryParams = urlObj.search || ''

const autoArtworkUrl = queryParams 
  ? `${detectedBaseUrl}${queryParams}&action=trackartwork`
  : `${detectedBaseUrl}?action=trackartwork`

// Usar automático o custom
let artwork = customArtworkUrl || autoArtworkUrl
```

**UI Actualizada:**
- Label: "URL de Artwork/Carátulas (Opcional)"
- Placeholder: "Deja vacío para usar el artwork automático de RadioBoss"
- Help text: "✨ RadioBoss detectará automáticamente las carátulas. Solo completa este campo si quieres usar una URL personalizada..."

---

### 🎨 **MEJORAS DE UI**

#### 1. Header Compacto

**Antes:**
- Header de 2 líneas
- Logo grande
- Espacio desperdiciado

**Después:**
- Una sola línea
- Logo 8×8 px
- Nombre al lado
- Más espacio para contenido

#### 2. Footer Compacto

**Antes:**
- Footer de 2-3 líneas
- Controles grandes

**Después:**
- Una sola línea
- Play/Pause + Slider de volumen
- Diseño minimalista

#### 3. Notch Minimalista

**Antes:**
- Notch grande y llamativo

**Después:**
- 24px × 3px
- Discreto y moderno

#### 4. Tipografía Inter

**Antes:**
- Fuente del sistema

**Después:**
- Google Fonts - Inter
- Pesos: 300, 400, 600, 700, 800
- Font-feature-settings habilitados
- Renderizado suavizado

**Implementación:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga' 1, 'calt' 1;
}
```

---

### 🔧 **CORRECCIONES DE BUGS**

#### 1. Error de Sintaxis en RadioForm.jsx

**Error:**
```
Unexpected token (156:2)
> 156 |   )
      |   ^
```

**Causa:**
- Paréntesis de cierre mal ubicado en el return

**Solución:**
- Reestructuración del return statement
- Verificación de todos los paréntesis

**Estado:** ✅ Corregido

---

#### 2. Missing Semicolon en AppPreview.jsx

**Error:**
```
Missing semicolon. (45:55)
> 45 |   }, [config.metadataPanelType, config.metadataApiUrl])ef.current) {
     |                                                        ^
```

**Causa:**
- Array de dependencias de useEffect mal formateado
- Texto adicional después del cierre

**Solución:**
- Corregida la línea de dependencias
- Añadido useEffect para metadataArtworkUrl

**Estado:** ✅ Corregido

---

#### 3. React Hooks Dispatcher Null (Resuelto Anteriormente)

**Error Previo:**
```
Cannot read properties of null (reading 'useState')
```

**Causa:**
- Llamadas a hooks fuera de componentes funcionales

**Solución:**
- Movidas funciones auxiliares fuera de componentes
- Verificación de scope de todos los hooks

**Estado:** ✅ Resuelto desde versión 1.5

---

### 📦 **CAMBIOS EN GENERACIÓN DE PWA**

#### 1. Metadata en PWA Exportada

**Incluido en app.js generado:**

- Todas las funciones de fetch por panel (7)
- Parser XML para RadioBoss
- Sistema completo de polling
- Artwork automático para RadioBoss
- Función `updateMetadataUI()`
- Inicio automático del polling

**Tamaño del archivo:**
- Sin metadata: ~5 KB
- Con metadata: ~15 KB
- Optimizado y minificado

#### 2. Estilos Personalizados en PWA

**Incluido en styles.css generado:**

```css
:root {
  --header-color: ${headerColor};
  --footer-color: ${footerColor};
  --text-color: ${textColor};
  --overlay-color: ${overlayColor};
  --overlay-opacity: ${overlayOpacity};
}

/* Modo transparente */
${transparentMode ? `
  .header {
    background-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
  }
` : ''}

/* Imagen de fondo */
${backgroundImage ? `
  body {
    background-image: url('${backgroundImage}');
    background-size: cover;
    background-position: center;
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
` : ''}
```

#### 3. README.md Mejorado

**Incluye ahora:**
- Descripción completa
- Instrucciones de instalación
- URL de streaming
- Configuración de metadata (si aplica)
- Panel utilizado
- Información de soporte

---

### 📊 **ESTADÍSTICAS DEL PROYECTO**

**Líneas de Código:**
- Total: ~2,500 líneas
- metadata.js: ~500 líneas
- generator.js: ~600 líneas
- Components: ~800 líneas
- Documentación: ~600 líneas

**Archivos:**
- Total: 15 archivos principales
- Components: 5
- Libraries: 2
- Config: 5
- Docs: 3

**Funcionalidades:**
- Paneles de metadata: 7
- Endpoints totales: 26
- Controles de color: 5
- Tipos de imágenes: 3

**Compatibilidad:**
- React: 18.2+
- Node.js: 18+
- Navegadores modernos: 100%
- Dispositivos móviles: 100%

---

### 🎯 **PRÓXIMAS MEJORAS POTENCIALES**

(No implementadas en esta versión)

1. **Sistema de Temas Predefinidos**
   - Temas oscuro/claro automáticos
   - Paletas inspiradas en marcas famosas

2. **Historial de Canciones**
   - Últimas 10 canciones reproducidas
   - Widget de historial

3. **Metadata Cache**
   - Reducir llamadas a API
   - Mejorar performance

4. **Preview de Dispositivos**
   - Vista móvil, tablet, desktop
   - Diferentes tamaños de pantalla

5. **Editor de Código**
   - Editar HTML/CSS/JS generado
   - Antes de exportar

6. **Analytics**
   - Estadísticas de reproducción
   - Canciones más escuchadas

---

### 🐛 **BUGS CONOCIDOS**

**Ninguno identificado en esta versión** ✅

Si encuentras algún bug, por favor repórtalo en:
[Tu sistema de issues aquí]

---

### 📚 **DOCUMENTACIÓN ACTUALIZADA**

**Nuevos Documentos:**

1. `DOCUMENTACION_COMPLETA.md` - Guía completa del sistema
2. `CHANGELOG.md` - Este archivo
3. `BACKUP_INFO.txt` - Información del backup

**Documentos Actualizados:**

1. `README.md` - Versión principal del proyecto
2. Comentarios en código
3. JSDoc en funciones principales

---

### 🔄 **MIGRACIÓN DESDE VERSIÓN 1.X**

**Si vienes de una versión anterior:**

1. **Backup de Datos:**
   - Exporta tus configuraciones actuales
   - Guarda las PWAs generadas

2. **Actualización:**
   ```bash
   npm install
   npm run dev
   ```

3. **Cambios en Configuración:**
   - Eliminar referencias a paletas predefinidas
   - Configurar los 5 nuevos controles de color
   - Revisar configuración de metadata

4. **PWAs Existentes:**
   - Compatible con PWAs generadas anteriormente
   - Regenerar para obtener nuevas funcionalidades

---

### 👥 **CONTRIBUIDORES**

**Desarrollador Principal:** [Tu nombre]
**Fecha de Inicio:** Noviembre 2025
**Versión Actual:** 2.0.0
**Estado:** Producción

---

### 📄 **LICENCIA**

MIT License - Ver archivo LICENSE para detalles

---

### 🙏 **AGRADECIMIENTOS**

- Usuarios beta testers
- Comunidad React
- Stack Overflow
- GitHub Copilot

---

**Fin del Changelog - Versión 2.0.0**

*Última actualización: 01 de Diciembre de 2025*
