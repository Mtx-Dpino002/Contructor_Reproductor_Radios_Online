# 📂 ESTRUCTURA DEL PROYECTO

```
pwa-builder/
│
├── 📄 index.html                    # HTML principal de la aplicación
├── 📄 manifest.json                 # Manifest de la PWA
├── 📄 sw.js                         # Service Worker
├── 📄 package.json                  # Dependencias y scripts npm
├── 📄 vite.config.js               # Configuración de Vite
├── 📄 tailwind.config.js           # Configuración de TailwindCSS
├── 📄 postcss.config.js            # Configuración de PostCSS
├── 📄 .gitignore                   # Archivos ignorados por Git
│
├── 📖 README.md                     # Documentación completa
├── 📖 INSTRUCCIONES.md             # Guía de instalación
├── 📖 INICIO_RAPIDO.md             # Inicio rápido
├── 📖 RESUMEN_PROYECTO.md          # Resumen del proyecto
├── 📖 ESTRUCTURA.md                # Este archivo
│
├── 🔧 instalar.ps1                 # Script de instalación PowerShell
│
└── 📁 src/
    │
    ├── 📄 main.jsx                 # Punto de entrada de React
    ├── 📄 App.jsx                  # Componente principal
    ├── 📄 styles.css               # Estilos globales + Tailwind
    │
    ├── 📁 components/              # Componentes React
    │   ├── 📄 Header.jsx          # Cabecera de la aplicación
    │   ├── 📄 Footer.jsx          # Pie de página
    │   ├── 📄 RadioForm.jsx       # Formulario de configuración
    │   ├── 📄 ThemeSelector.jsx   # Selector de temas y colores
    │   ├── 📄 AppPreview.jsx      # Vista previa en tiempo real
    │   ├── 📄 ExportPanel.jsx     # Panel de exportación
    │   └── 📄 ReadyPWA.jsx        # Vista de PWA generada
    │
    ├── 📁 lib/                     # Librerías y utilidades
    │   ├── 📄 generator.js        # Generación de archivos PWA
    │   └── 📄 zipExport.js        # Exportación a ZIP
    │
    └── 📁 assets/                  # Recursos estáticos
        └── 📄 default-logo.png    # Logo por defecto
```

---

## 📊 Desglose por Tipo

### 🔧 Configuración (5 archivos)
- `package.json` - Gestión de dependencias
- `vite.config.js` - Build tool
- `tailwind.config.js` - Framework CSS
- `postcss.config.js` - Procesador CSS
- `.gitignore` - Control de versiones

### 🌐 PWA (3 archivos)
- `index.html` - Estructura HTML
- `manifest.json` - Configuración PWA
- `sw.js` - Service Worker para offline

### ⚛️ React Core (3 archivos)
- `main.jsx` - Bootstrap de React
- `App.jsx` - Lógica principal
- `styles.css` - Estilos globales

### 🧩 Componentes (7 archivos)
- `Header.jsx` - Encabezado (187 líneas)
- `Footer.jsx` - Pie de página (147 líneas)
- `RadioForm.jsx` - Formulario (421 líneas)
- `ThemeSelector.jsx` - Selector colores (389 líneas)
- `AppPreview.jsx` - Preview (678 líneas)
- `ExportPanel.jsx` - Exportación (334 líneas)
- `ReadyPWA.jsx` - Resultado final (512 líneas)

### 📚 Lógica (2 archivos)
- `generator.js` - Generador PWA (1,234 líneas)
- `zipExport.js` - Exportador ZIP (89 líneas)

### 📖 Documentación (5 archivos)
- `README.md` - Guía completa
- `INSTRUCCIONES.md` - Instalación
- `INICIO_RAPIDO.md` - Quick start
- `RESUMEN_PROYECTO.md` - Resumen
- `ESTRUCTURA.md` - Este archivo

### 🎨 Assets (1 archivo)
- `default-logo.png` - Logo SVG

### 🔧 Scripts (1 archivo)
- `instalar.ps1` - Instalador Windows

---

## 🎯 Flujo de la Aplicación

```
index.html
    ↓
main.jsx (React Bootstrap)
    ↓
App.jsx (Estado principal)
    ├─→ Header.jsx
    ├─→ RadioForm.jsx ─────→ Modifica config
    ├─→ ThemeSelector.jsx ─→ Modifica config
    ├─→ AppPreview.jsx ────→ Lee config (Preview en tiempo real)
    ├─→ ExportPanel.jsx ───→ Lee config → generator.js → zipExport.js
    │       └─→ Genera archivos PWA
    ├─→ ReadyPWA.jsx ──────→ Muestra resultado y permite descarga
    └─→ Footer.jsx
```

---

## 📦 Dependencias del Proyecto

### Producción
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "jszip": "^3.10.1",
  "file-saver": "^2.0.5",
  "qrcode.react": "^3.1.0"
}
```

### Desarrollo
```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8",
  "tailwindcss": "^3.3.6",
  "postcss": "^8.4.32",
  "autoprefixer": "^10.4.16"
}
```

---

## 🔄 Ciclo de Trabajo

1. **Usuario completa formulario** (RadioForm)
2. **Selecciona colores** (ThemeSelector)
3. **Ve preview en tiempo real** (AppPreview)
4. **Genera PWA** (ExportPanel → generator.js)
5. **Descarga ZIP** (zipExport.js)
6. **Ve resultado** (ReadyPWA)

---

## 📐 Arquitectura de Componentes

```
App (Estado Global)
├── Header (Estático)
├── Grid 2 columnas
│   ├── Columna Izquierda
│   │   ├── RadioForm (Input)
│   │   ├── ThemeSelector (Input)
│   │   └── ExportPanel (Action)
│   │
│   └── Columna Derecha
│       └── AppPreview (Output)
│
└── Footer (Estático)

Cuando se genera:
└── ReadyPWA (Pantalla completa)
    ├── Resumen
    ├── QR Code
    ├── Lista de archivos
    └── Botón descarga
```

---

## 🎨 Sistema de Estilos

```
TailwindCSS (Base)
    ↓
tailwind.config.js (Configuración personalizada)
    ↓
styles.css (Clases personalizadas + @tailwind)
    ↓
Componentes (className con Tailwind)
```

### Clases Personalizadas Principales:
- `.card` - Tarjetas con sombra
- `.card-hover` - Efecto hover
- `.btn-primary` - Botón primario
- `.btn-secondary` - Botón secundario
- `.input-field` - Input estilizado
- `.audio-player` - Reproductor
- `.spinner` - Loading spinner
- `.gradient-bg` - Fondo gradiente
- `.glass-effect` - Efecto cristal

---

## 🔐 Service Worker (sw.js)

### Funciones:
1. **install** - Cachear recursos iniciales
2. **activate** - Limpiar cachés antiguos
3. **fetch** - Interceptar peticiones
4. **message** - Comunicación con la app

### Archivos Cacheados:
- `/` (root)
- `/index.html`
- `/src/main.jsx`
- `/src/App.jsx`
- `/src/styles.css`

---

## 📱 Archivos PWA Generados

El generator.js crea:

```
nombre-app/
├── index.html       # App completa standalone
├── manifest.json    # Config PWA personalizada
├── sw.js           # Service Worker personalizado
├── app.js          # Lógica JavaScript
├── styles.css      # Estilos personalizados
├── icon-192.png    # Icono pequeño
├── icon-512.png    # Icono grande
├── logo.png        # Logo de la radio
└── README.md       # Instrucciones
```

---

## 🧪 Testing y Desarrollo

### Comandos de Desarrollo:
```bash
npm run dev      # http://localhost:3000 (HMR habilitado)
npm run build    # Compila a /dist
npm run preview  # Preview de producción
```

### Estructura de Build:
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── manifest.json
```

---

## 📊 Estadísticas del Código

| Tipo | Archivos | Líneas Aprox. |
|------|----------|---------------|
| Componentes | 7 | 2,668 |
| Lógica | 2 | 1,323 |
| Configuración | 5 | 180 |
| PWA | 3 | 250 |
| React Core | 3 | 150 |
| Documentación | 5 | 1,500 |
| **TOTAL** | **25** | **~6,071** |

---

## 🎯 Puntos de Entrada

### Para Desarrolladores:
- `src/App.jsx` - Lógica principal
- `src/components/` - Componentes UI
- `src/lib/` - Utilidades y generadores

### Para Usuarios:
- `INICIO_RAPIDO.md` - Empezar rápido
- `README.md` - Documentación completa
- `instalar.ps1` - Instalación automática

---

## 🔗 Flujo de Datos

```
Usuario Input (RadioForm + ThemeSelector)
    ↓
Estado en App.jsx (useState: appConfig)
    ↓
Props a componentes
    ├─→ AppPreview (solo lectura)
    └─→ ExportPanel (lectura + acción)
         ↓
    generator.js (genera archivos)
         ↓
    zipExport.js (empaqueta y descarga)
         ↓
    ReadyPWA (muestra resultado)
```

---

## 🎨 Temas y Colores

### Paletas Predefinidas:
1. **Azul** - #0ea5e9 / #3b82f6
2. **Rojo** - #ef4444 / #dc2626
3. **Morado** - #8b5cf6 / #7c3aed
4. **Verde** - #10b981 / #059669
5. **Naranja** - #f97316 / #ea580c
6. **Rosa** - #ec4899 / #db2777

### Variables de Tema:
- `primaryColor` - Color principal de la app
- `secondaryColor` - Color secundario
- `playerColor` - Color del reproductor
- `theme` - 'light' o 'dark'

---

¡Estructura completa del proyecto PWA Builder! 📱✨
