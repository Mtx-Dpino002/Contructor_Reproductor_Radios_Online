# PWA Builder - Constructor de Apps para Radios Online

![PWA Builder](https://img.shields.io/badge/PWA-Builder-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)

## 📱 Descripción

**PWA Builder** es una aplicación web que permite crear Progressive Web Apps (PWAs) para radios online sin necesidad de escribir código. Genera aplicaciones móviles instalables y listas para convertir a APK de Android.

## ✨ Características

- 🎨 **Constructor Visual**: Interfaz drag-and-drop intuitiva tipo builder
- 📱 **Vista Previa en Tiempo Real**: Ve cómo quedará tu app mientras la construyes
- 🎨 **Personalización Completa**: Colores, temas, logos e íconos personalizables
- 🎵 **Reproductor Integrado**: Reproductor de audio con soporte para MP3, AAC, OGG
- 📦 **Exportación a ZIP**: Descarga todos los archivos de tu PWA listos para desplegar
- 🚀 **PWA Lista**: Aplicación instalable desde el navegador
- 📱 **Conversión a APK**: Instrucciones para convertir tu PWA a aplicación Android
- 🌓 **Temas Claro/Oscuro**: Soporta ambos modos de visualización
- 🎨 **Paletas Predefinidas**: 6 paletas de colores listas para usar

## 🛠️ Tecnologías

- **React 18.2** - Framework de UI
- **Vite 5.0** - Build tool y dev server
- **TailwindCSS 3.3** - Framework de estilos
- **JSZip** - Generación de archivos ZIP
- **QRCode.react** - Generación de códigos QR
- **File-saver** - Descarga de archivos

## 🚀 Instalación

### Requisitos previos
- Node.js 16 o superior
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
```bash
cd pwa-builder
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
pwa-builder/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Cabecera de la aplicación
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── RadioForm.jsx        # Formulario de configuración
│   │   ├── ThemeSelector.jsx    # Selector de temas y colores
│   │   ├── AppPreview.jsx       # Vista previa en tiempo real
│   │   ├── ExportPanel.jsx      # Panel de exportación
│   │   └── ReadyPWA.jsx         # Vista de PWA generada
│   │
│   ├── lib/
│   │   ├── generator.js         # Lógica de generación de archivos
│   │   └── zipExport.js         # Exportación a ZIP
│   │
│   ├── assets/
│   │   └── default-logo.png     # Logo por defecto
│   │
│   ├── App.jsx                  # Componente principal
│   ├── main.jsx                 # Punto de entrada
│   └── styles.css               # Estilos globales
│
├── index.html                   # HTML principal
├── manifest.json                # Manifest de la PWA
├── sw.js                        # Service Worker
├── package.json                 # Dependencias
├── vite.config.js              # Configuración de Vite
├── tailwind.config.js          # Configuración de Tailwind
├── postcss.config.js           # Configuración de PostCSS
└── README.md                   # Este archivo
```

## 🎯 Uso

### 1. Configurar tu Radio

1. **Nombre de la emisora**: Ingresa el nombre de tu radio
2. **URL del streaming**: Agrega la URL de tu stream (MP3, AAC, OGG)
3. **Logo**: Sube el logo de tu emisora
4. **Icono**: Sube el icono de la aplicación (512x512 recomendado)
5. **Tema**: Selecciona entre claro u oscuro

### 2. Personalizar Colores

- Elige una paleta predefinida
- O personaliza tus propios colores:
  - Color primario
  - Color secundario
  - Color del reproductor

### 3. Vista Previa

- Ve la aplicación en tiempo real en el panel derecho
- Prueba el reproductor con tu stream
- Ajusta el volumen y verifica el funcionamiento

### 4. Generar y Exportar

1. Click en **"Generar PWA"** para crear los archivos
2. Click en **"Descargar ZIP"** para obtener tu aplicación
3. Descomprime el ZIP en tu servidor web

### 5. Desplegar

- Sube los archivos a tu servidor (debe tener HTTPS)
- Los usuarios podrán instalar la app desde el navegador
- La app funcionará offline gracias al Service Worker

## 📱 Convertir a APK

### Opción 1: Bubblewrap CLI

```bash
# Instalar Bubblewrap
npm install -g @bubblewrap/cli

# Inicializar
bubblewrap init --manifest https://tudominio.com/manifest.json

# Compilar APK
bubblewrap build
```

### Opción 2: PWABuilder.com

1. Ve a https://www.pwabuilder.com/
2. Ingresa la URL de tu PWA desplegada
3. Descarga el paquete para Android
4. Sigue las instrucciones para publicar en Google Play

## 🧩 Componentes Principales

### RadioForm
Formulario para configurar los datos básicos de la radio:
- Nombre
- URL del stream
- Logo e icono
- Tema

### ThemeSelector
Selector de colores con:
- 6 paletas predefinidas
- Selector de color personalizado (RGB/HEX)
- Vista previa instantánea

### AppPreview
Vista previa en tiempo real que muestra:
- Diseño de la app en un dispositivo simulado
- Reproductor funcional
- Efectos visuales según el tema

### ExportPanel
Panel de exportación con:
- Botón para generar PWA
- Botón para descargar ZIP
- Instrucciones de despliegue
- Guía para convertir a APK

### ReadyPWA
Vista final que muestra:
- Resumen de la app creada
- Código QR para instalación
- Botón de descarga
- Lista de archivos generados

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Preview de la build de producción
```

## 📦 Archivos Generados

La PWA generada incluye:

- `index.html` - Página principal
- `manifest.json` - Configuración de la PWA
- `sw.js` - Service Worker para offline
- `app.js` - Lógica de la aplicación
- `styles.css` - Estilos
- `icon-192.png` - Icono 192x192
- `icon-512.png` - Icono 512x512
- `logo.png` - Logo de la emisora
- `README.md` - Documentación

## 🌐 Requisitos para PWA

Para que la PWA funcione correctamente necesitas:

- ✅ HTTPS (obligatorio)
- ✅ Manifest.json válido
- ✅ Service Worker registrado
- ✅ Íconos en múltiples tamaños
- ✅ Diseño responsive

## 🎨 Personalización Avanzada

### Modificar Estilos

Edita `src/styles.css` para cambiar estilos globales:
- Colores
- Fuentes
- Animaciones
- Efectos

### Añadir Funcionalidades

1. Crea nuevos componentes en `src/components/`
2. Importa y usa en `App.jsx`
3. Añade la lógica en `src/lib/`

## 🐛 Solución de Problemas

### El stream no se reproduce
- Verifica que la URL sea correcta
- Asegúrate de que el servidor del stream tenga CORS habilitado
- Verifica el formato del audio (MP3, AAC, OGG)

### La PWA no se instala
- Verifica que estés usando HTTPS
- Revisa que el manifest.json sea válido
- Asegúrate de que el Service Worker esté registrado

### El ZIP no se descarga
- Verifica que tengas imágenes cargadas
- Revisa la consola del navegador por errores
- Asegúrate de que jszip y file-saver estén instalados

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 👨‍💻 Autor

Creado con ❤️ para la comunidad de radio online

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- Crea un issue en GitHub
- Revisa la documentación
- Consulta los ejemplos en la carpeta de ejemplos

## 🎉 Características Futuras

- [ ] Más templates de diseño
- [ ] Editor de código en línea
- [ ] Integración con servicios de hosting
- [ ] Analytics integrados
- [ ] Notificaciones push
- [ ] Modo offline mejorado
- [ ] Soporte para podcasts
- [ ] Reproductor de video
- [ ] Chat integrado

## 📚 Recursos

- [Documentación de PWA](https://web.dev/progressive-web-apps/)
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)

---

**¡Disfruta construyendo tus PWAs! 🚀📱**
