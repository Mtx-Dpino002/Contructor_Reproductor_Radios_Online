# 🔄 GUÍA DE RESTAURACIÓN RÁPIDA

**Backup:** PWA Constructor v2.0  
**Fecha:** 2 de diciembre de 2025, 19:49:05  
**Versión:** 2.0 - Con Gestión de Proyectos y Animaciones Lottie

---

## ⚡ RESTAURACIÓN EN 5 PASOS

### **PASO 1: Copiar Archivos**
```powershell
# Abrir PowerShell en la carpeta del backup
cd "c:\Users\darin\OneDrive\Desktop\Proyectos Programacion\_PWA Constructor"

# Crear carpeta destino
New-Item -ItemType Directory -Path "pwa-builder-restaurado" -Force

# Copiar todo el contenido
Copy-Item -Path "BACKUP_PWA_COMPLETO_2025-12-02_194905\*" `
          -Destination "pwa-builder-restaurado\" `
          -Recurse -Force

Write-Host "✅ Archivos copiados exitosamente"
```

### **PASO 2: Instalar Dependencias**
```powershell
# Navegar a la carpeta
cd pwa-builder-restaurado

# Instalar todas las dependencias
npm install

Write-Host "✅ Dependencias instaladas"
```

**Dependencias principales instaladas:**
- react: 18.2.0
- react-dom: 18.2.0
- lottie-react: 2.4.1 ⭐
- jszip: 3.10.1
- file-saver: 2.0.5
- qrcode.react: 3.1.0
- vite: 5.0.8
- tailwindcss: 3.3.6

### **PASO 3: Verificar Instalación**
```powershell
# Verificar que lottie-react está instalado
npm list lottie-react

# Debe mostrar:
# pwa-builder@1.0.0
# └── lottie-react@2.4.1

# Verificar Node.js
node --version  # Debe ser v16 o superior

# Verificar npm
npm --version   # Debe ser v8 o superior
```

### **PASO 4: Iniciar Desarrollo**
```powershell
# Ejecutar servidor de desarrollo
npm run dev

# Debe abrir en: http://localhost:3000
```

**Salida esperada:**
```
VITE v5.4.21  ready in XXXms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### **PASO 5: Verificar Funcionalidad**
Abrir http://localhost:3000 y verificar:

✅ **Interfaz cargada correctamente**
- Header con título "PWA Builder"
- 3 botones en header: Nuevo, Abrir, Guardar
- Formulario de configuración
- Vista previa tipo iPhone a la derecha

✅ **Gestión de Proyectos**
- Click en "Guardar" → descarga .pwacfg
- Click en "Abrir" → carga archivo .pwacfg
- Click en "Nuevo" → confirma y reinicia

✅ **Animaciones Lottie**
- Pestaña "Animación Audio" visible
- Grid 3x3 con 9 opciones (Ninguna + 8 waves)
- Miniaturas animadas cargando
- Slider de tamaño funcional (60-300px)

✅ **Redes Sociales**
- Pestaña "Redes Sociales" visible
- 6 campos: Facebook, X, Instagram, Telegram, TikTok, Website
- Iconos con colores correctos

✅ **Vista Previa**
- Cambios se reflejan instantáneamente
- Animación aparece cuando se selecciona
- Iconos sociales aparecen si hay URLs
- Logo se ajusta con slider de redondez

✅ **Exportación**
- Botón "Generar PWA" funciona
- Descarga ZIP con 5 archivos
- PWA exportada funciona standalone

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### **Error: "Cannot find module 'lottie-react'"**
```powershell
# Reinstalar lottie-react específicamente
npm install lottie-react --save

# O reinstalar todo
Remove-Item -Path node_modules -Recurse -Force
Remove-Item -Path package-lock.json -Force
npm install
```

### **Error: "Port 3000 already in use"**
```powershell
# Opción 1: Usar otro puerto
npm run dev -- --port 3001

# Opción 2: Matar proceso en puerto 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### **Animaciones no cargan (aparece 🎵)**
**Causa:** Problema de CORS o URL inválida  
**Solución:** Las URLs de lottie.host son correctas. Verificar conexión a internet.

```javascript
// Verificar en consola del navegador (F12)
// Debe mostrar:
// "Loading Lottie animation from: https://lottie.host/..."
// "Lottie animation loaded successfully"

// Si falla, verificar CORS en Network tab
```

### **Botones de Header no responden**
**Causa:** Props no se pasaron correctamente  
**Solución:** Verificar App.jsx tiene estas líneas:

```jsx
// En App.jsx alrededor de línea 115
<Header 
  config={appConfig}
  onLoadConfig={handleLoadConfig}
  onNewProject={handleNewProject}
  onSaveProject={handleSaveProject}
/>

// Verificar que existen las 4 funciones:
// handleLoadConfig, handleNewProject, handleSaveProject
```

### **Hot Module Reload warnings**
**Mensaje:** "Could not Fast Refresh (AUDIO_ANIMATIONS export is incompatible)"  
**Impacto:** Solo visual, no afecta funcionalidad  
**Solución:** Ignorar warning. Es porque AUDIO_ANIMATIONS se exporta como constante.

### **Vista previa no se actualiza**
```powershell
# Limpiar cache de Vite
Remove-Item -Path .vite -Recurse -Force
npm run dev
```

---

## 📦 ESTRUCTURA DEL BACKUP

```
BACKUP_PWA_COMPLETO_2025-12-02_194905/
├── 📄 DOCUMENTACION_COMPLETA_V2.md     ← Documentación extensa
├── 📄 RESTAURACION_RAPIDA.md            ← Este archivo
├── 📄 CHANGELOG_V2.md                   ← Historial de cambios
├── 📄 BACKUP_INFO.md                    ← Info del backup
├── 📄 package.json                      ← Dependencias
├── 📄 package-lock.json                 ← Lock de versiones
├── 📄 vite.config.js                    ← Config Vite
├── 📄 tailwind.config.js                ← Config Tailwind
├── 📄 postcss.config.js                 ← Config PostCSS
├── 📄 index.html                        ← HTML base
├── 📄 .gitignore                        ← Git ignore
├── 📁 src/
│   ├── 📄 App.jsx                       ← ⭐ Root component
│   ├── 📄 main.jsx                      ← Entry point
│   ├── 📄 styles.css                    ← Estilos globales
│   ├── 📁 components/
│   │   ├── 📄 Header.jsx                ← ⭐ Con botones gestión
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 RadioForm.jsx
│   │   ├── 📄 ThemeSelector.jsx
│   │   ├── 📄 SocialLinks.jsx           ← ⭐ 6 redes sociales
│   │   ├── 📄 AudioSpectrumSelector.jsx ← ⭐ 9 animaciones
│   │   ├── 📄 LottieAnimation.jsx       ← ⭐ Player Lottie
│   │   ├── 📄 ProjectManager.jsx        ← ⚠️ Deprecado
│   │   ├── 📄 AppPreview.jsx            ← ⭐ Con animaciones
│   │   ├── 📄 ExportPanel.jsx
│   │   └── 📄 ReadyPWA.jsx
│   ├── 📁 lib/
│   │   ├── 📄 generator.js              ← ⭐ Con Lottie + Social
│   │   ├── 📄 zipExport.js
│   │   └── 📄 metadata.js
│   └── 📁 assets/
│       └── 🖼️ default-logo.png
└── 📁 public/
    ├── 📄 sw.js                         ← Service Worker
    ├── 📄 manifest.json                 ← PWA Manifest
    ├── 🖼️ icon-192.svg
    └── 🖼️ icon-512.svg
```

**Archivos críticos marcados con ⭐**

---

## 🔍 VERIFICACIÓN POST-RESTAURACIÓN

Ejecutar estos comandos para verificar que todo está OK:

```powershell
# 1. Verificar estructura de archivos
Get-ChildItem -Recurse -Include "*.jsx","*.js","*.json" | Measure-Object
# Debe mostrar ~35 archivos

# 2. Verificar dependencias instaladas
npm list --depth=0
# Debe listar todas sin errores

# 3. Verificar que no hay vulnerabilidades críticas
npm audit
# Idealmente 0 vulnerabilities

# 4. Probar build de producción
npm run build
# Debe crear carpeta dist/ sin errores

# 5. Verificar que build funciona
npm run preview
# Debe abrir en http://localhost:4173
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

Marcar cada ítem después de verificar:

### **Instalación**
- [ ] Node.js v16+ instalado
- [ ] npm v8+ instalado
- [ ] Archivos copiados correctamente
- [ ] node_modules/ creado con npm install
- [ ] Sin errores en consola al instalar

### **Desarrollo**
- [ ] `npm run dev` ejecuta sin errores
- [ ] Abre en http://localhost:3000
- [ ] Sin errores en consola del navegador
- [ ] Vista previa se muestra
- [ ] Hot Module Reload funciona

### **Gestión de Proyectos**
- [ ] Botón "Guardar" visible y funciona
- [ ] Descarga archivo .pwacfg
- [ ] Botón "Abrir" visible y funciona
- [ ] Carga archivo .pwacfg correctamente
- [ ] Botón "Nuevo" visible y funciona
- [ ] Muestra confirmación antes de reiniciar

### **Animaciones Lottie**
- [ ] Pestaña "Animación Audio" visible
- [ ] Grid muestra 9 opciones
- [ ] Miniaturas se cargan (puede tardar 2-3s)
- [ ] Miniaturas se reproducen en loop
- [ ] Selección marca con checkmark cyan
- [ ] Slider aparece al seleccionar animación
- [ ] Slider actualiza valor (60-300px)
- [ ] Animación aparece en preview en tiempo real
- [ ] Posición correcta (sobre iconos sociales)

### **Redes Sociales**
- [ ] Pestaña "Redes Sociales" visible
- [ ] 6 campos de input presentes
- [ ] Cada campo tiene icono y color correcto
- [ ] Placeholders con ejemplos de URLs
- [ ] Iconos aparecen en preview al ingresar URL
- [ ] Iconos tienen hover effect
- [ ] Posición correcta (abajo del footer)

### **Exportación**
- [ ] Formulario permite ingresar todos los datos
- [ ] Preview se actualiza en tiempo real
- [ ] Botón "Generar PWA" funciona
- [ ] Descarga archivo ZIP
- [ ] ZIP contiene 5 archivos
- [ ] HTML incluye configuración correcta
- [ ] Manifest.json válido
- [ ] Service Worker presente
- [ ] Iconos PNG generados

### **PWA Exportada**
- [ ] Descomprimir ZIP funciona
- [ ] Abrir index.html en navegador
- [ ] Radio se muestra correctamente
- [ ] Logo se ve (si se configuró)
- [ ] Colores aplicados correctamente
- [ ] Animación Lottie se reproduce
- [ ] Iconos sociales presentes (si se configuraron)
- [ ] Links sociales funcionan
- [ ] PWA instalable en Chrome (desktop)
- [ ] Service Worker se registra
- [ ] Funciona offline después de primera carga

---

## 🎯 TESTING RÁPIDO DE 2 MINUTOS

```
1. npm run dev                           [15s]
2. Cambiar nombre de radio               [5s]
3. Seleccionar animación Wave 1          [10s]
4. Ingresar URL de Facebook              [10s]
5. Ver cambios en preview                [5s]
6. Click "Guardar"                       [5s]
7. Click "Nuevo" (cancelar)              [5s]
8. Click "Abrir" (cargar .pwacfg)        [10s]
9. Verificar que se restauró config      [5s]
10. Click "Generar PWA"                  [30s]
11. Verificar descarga ZIP               [5s]
12. Descomprimir y abrir HTML            [15s]
                                    TOTAL: 2min
```

Si todos estos pasos funcionan → **✅ Restauración exitosa**

---

## 💾 BACKUP DE SEGURIDAD

Después de restaurar exitosamente, crear backup local:

```powershell
# Comprimir carpeta restaurada
Compress-Archive -Path "pwa-builder-restaurado\*" `
                 -DestinationPath "pwa-builder-restaurado-$(Get-Date -Format 'yyyy-MM-dd').zip" `
                 -Force

Write-Host "✅ Backup de seguridad creado"
```

---

## 📞 SOPORTE

Si encuentras problemas no resueltos en esta guía:

1. Revisar **DOCUMENTACION_COMPLETA_V2.md** (sección "Problemas Conocidos")
2. Verificar **CHANGELOG_V2.md** para cambios recientes
3. Consultar consola del navegador (F12) para errores JavaScript
4. Verificar logs de terminal para errores de Node/npm
5. Comparar archivos modificados con este backup

---

## ⚠️ NOTAS IMPORTANTES

- **No eliminar node_modules/**: Ocupa espacio pero es necesario
- **No modificar package-lock.json**: Asegura versiones exactas
- **Hacer commit antes de cambios grandes**: Git es tu amigo
- **Probar en localhost antes de producción**: Siempre
- **Mantener backups periódicos**: Cada semana o después de features importantes

---

## 🎓 ARCHIVOS PARA LEER

Orden recomendado de lectura:

1. **BACKUP_INFO.md** - Info básica del backup (3 min)
2. **CHANGELOG_V2.md** - Qué cambió en v2.0 (5 min)
3. **DOCUMENTACION_COMPLETA_V2.md** - Documentación extensa (30 min)
4. **package.json** - Ver dependencias (2 min)
5. **src/App.jsx** - Entender estructura (10 min)

---

## ✅ RESTAURACIÓN COMPLETADA

Si llegaste aquí y todo funciona:

🎉 **¡Felicitaciones!** El proyecto PWA Constructor v2.0 está completamente restaurado y funcional.

Ahora puedes:
- Crear nuevas radios online
- Guardar y cargar proyectos
- Configurar animaciones Lottie
- Integrar redes sociales
- Exportar PWAs listas para producción

---

*Guía de Restauración Rápida - PWA Constructor v2.0*  
*Última actualización: 2 de diciembre de 2025*
