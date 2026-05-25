# 🔧 Guía de Restauración - PWA Radio Builder

## 📋 Información del Backup

**Fecha de Creación:** 01 de Diciembre de 2025, 04:39:09
**Versión:** 2.0.0
**Estado:** Producción - 100% Funcional
**Razón del Backup:** Punto de restauración antes de nuevos cambios

---

## 📦 Contenido del Backup

Este backup contiene la versión completa y funcional de PWA Radio Builder con todas las características implementadas hasta la fecha.

### Archivos Incluidos

```
BACKUP_PWA_COMPLETO_2025-12-01_043909/
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   ├── RadioForm.jsx
│   │   ├── AppPreview.jsx
│   │   ├── ThemeSelector.jsx
│   │   └── ExportPanel.jsx
│   ├── lib/
│   │   ├── metadata.js
│   │   └── generator.js
│   ├── styles.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── node_modules/ (si está incluido)
├── DOCUMENTACION_COMPLETA.md ← Documentación técnica completa
├── CHANGELOG.md ← Historial de cambios
└── RESTAURACION.md ← Este archivo
```

---

## 🚀 Cómo Restaurar

### Método 1: Restauración Completa (Recomendado)

**Caso de uso:** El proyecto actual está completamente roto o perdido.

```bash
# 1. Navegar a la ubicación deseada
cd "c:\Users\darin\OneDrive\Desktop\Proyectos Programacion\"

# 2. Copiar todo el backup a una nueva carpeta
Copy-Item -Path "\_PWA Constructor\BACKUP_PWA_COMPLETO_2025-12-01_043909" -Destination ".\pwa-builder-restaurado" -Recurse

# 3. Navegar a la carpeta restaurada
cd pwa-builder-restaurado

# 4. Instalar dependencias (si node_modules no está incluido)
npm install

# 5. Iniciar servidor de desarrollo
npm run dev

# 6. Verificar en navegador
# http://localhost:3000
```

### Método 2: Restauración Selectiva

**Caso de uso:** Solo necesitas restaurar archivos específicos.

```bash
# Restaurar un componente específico
Copy-Item -Path "BACKUP_PWA_COMPLETO_2025-12-01_043909\src\components\RadioForm.jsx" -Destination "pwa-builder\src\components\" -Force

# Restaurar el sistema de metadata
Copy-Item -Path "BACKUP_PWA_COMPLETO_2025-12-01_043909\src\lib\metadata.js" -Destination "pwa-builder\src\lib\" -Force

# Restaurar el generador
Copy-Item -Path "BACKUP_PWA_COMPLETO_2025-12-01_043909\src\lib\generator.js" -Destination "pwa-builder\src\lib\" -Force
```

### Método 3: Comparación y Merge

**Caso de uso:** Quieres comparar versiones antes de restaurar.

```bash
# Usar herramienta de diff (VS Code, Beyond Compare, etc.)
code --diff "pwa-builder\src\components\RadioForm.jsx" "BACKUP_PWA_COMPLETO_2025-12-01_043909\src\components\RadioForm.jsx"
```

---

## ✅ Verificación Post-Restauración

### 1. Verificar Instalación de Dependencias

```bash
npm list
```

**Esperado:**
```
pwa-radio-builder@2.0.0
├── react@18.2.0
├── react-dom@18.2.0
├── jszip@3.10.1
├── @vitejs/plugin-react@4.2.1
├── vite@5.0.8
├── tailwindcss@3.3.6
└── ... (otras dependencias)
```

### 2. Verificar Servidor de Desarrollo

```bash
npm run dev
```

**Esperado:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 3. Verificar Funcionalidades en el Navegador

**Checklist:**

- [ ] La aplicación carga correctamente
- [ ] RadioForm renderiza sin errores
- [ ] AppPreview muestra el preview
- [ ] ThemeSelector muestra los 5 controles circulares
- [ ] ExportPanel está visible
- [ ] Los colores se actualizan en tiempo real
- [ ] El modo transparente funciona
- [ ] La carga de imágenes funciona (logo, icono, fondo)
- [ ] El dropdown de paneles muestra 8 opciones
- [ ] La metadata se actualiza (si configuras un panel)
- [ ] El botón de exportar genera el ZIP

### 4. Verificar Consola del Navegador

**No debe haber errores de:**
- React hooks
- Imports de módulos
- Sintaxis de JavaScript
- CORS (si pruebas metadata local)

### 5. Probar Generación de PWA

```bash
# 1. Configurar app en la UI
# 2. Click en "Exportar PWA"
# 3. Verificar descarga de ZIP
# 4. Extraer ZIP
# 5. Abrir index.html en navegador
# 6. Verificar que funciona
```

---

## 🐛 Troubleshooting de Restauración

### Problema: "Cannot find module"

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Port 3000 already in use"

**Solución:**
```bash
# Opción 1: Cerrar proceso en puerto 3000
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Opción 2: Cambiar puerto en vite.config.js
# server: { port: 3001 }
```

### Problema: "Syntax error after restoration"

**Causa:** Archivos dañados durante la copia

**Solución:**
```bash
# Verificar integridad
Get-FileHash -Path "BACKUP_PWA_COMPLETO_2025-12-01_043909\src\components\RadioForm.jsx" -Algorithm SHA256

# Re-copiar archivo específico
Copy-Item -Path "..." -Destination "..." -Force
```

### Problema: "Tailwind styles not working"

**Solución:**
```bash
# Reinstalar dependencias de Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Problema: "Metadata not fetching"

**Causa:** CORS o URL incorrecta

**Solución:**
1. Verificar URL de API correcta
2. Verificar CORS en servidor de radio
3. Usar proxy si es necesario
4. Revisar consola del navegador

---

## 📊 Características de Esta Versión

### ✅ Funcionalidades Confirmadas

- **Sistema de Personalización de Colores**
  - 5 controles circulares
  - Modo transparente
  - Overlay configurable

- **Sistema de Imágenes**
  - Logo, icono, fondo
  - Carga por URL y archivo
  - Preview en tiempo real

- **Sistema de Metadata**
  - 7 paneles soportados
  - 26 endpoints con fallback
  - Artwork automático para RadioBoss
  - Parser XML y JSON

- **UI Mejorada**
  - Header compacto
  - Footer compacto
  - Notch minimalista
  - Tipografía Inter

- **Generación de PWA**
  - Incluye toda la funcionalidad
  - Service Worker completo
  - Manifest.json configurado
  - README.md generado

### 🔄 Diferencias con Versiones Anteriores

**Versión 2.0.0 vs 1.X:**

| Característica | v1.X | v2.0.0 |
|---------------|------|--------|
| Paletas predefinidas | 6 | 0 (eliminadas) |
| Controles de color | 3 | 5 |
| Paneles de metadata | 5 | 7 |
| Endpoints totales | 12 | 26 |
| Artwork automático | No | Sí (RadioBoss) |
| Parser XML | No | Sí |
| Imagen de fondo | No | Sí |
| Modo transparente | No | Sí |

---

## 📁 Archivos Críticos

### No Modificar Sin Respaldo

Estos archivos son esenciales y cualquier cambio debe hacerse con cuidado:

1. **metadata.js**
   - Sistema completo de metadata
   - 7 funciones de fetch
   - Parser XML
   - Artwork automático

2. **generator.js**
   - Generación de PWA
   - Incluye metadata en código generado
   - Service Worker
   - Manifest

3. **App.jsx**
   - Estado global
   - Centralización de configuración
   - No mover hooks

4. **RadioForm.jsx**
   - Todas las funciones auxiliares deben estar fuera del componente
   - Cuidado con el scope de funciones

5. **AppPreview.jsx**
   - useEffect de metadata
   - Dependencias correctas
   - Cleanup de polling

### Archivos Configurables

Puedes modificar sin riesgo:

- `vite.config.js` - Configuración de Vite
- `tailwind.config.js` - Colores y temas de Tailwind
- `styles.css` - Estilos globales adicionales

---

## 🔐 Validación de Integridad

### Checksums de Archivos Críticos

Para verificar que los archivos no están corruptos:

```powershell
# Generar checksums
Get-ChildItem -Path "BACKUP_PWA_COMPLETO_2025-12-01_043909\src" -Recurse -File | 
  ForEach-Object {
    $hash = Get-FileHash $_.FullName -Algorithm SHA256
    "$($_.Name): $($hash.Hash)"
  } | Out-File checksums.txt
```

### Verificación Manual

**metadata.js:**
- Debe tener 7 funciones de fetch
- Debe exportar PANEL_TYPES y PANEL_LABELS
- Debe tener función startMetadataPolling

**generator.js:**
- Debe tener función generatePWAFiles
- Debe incluir generación de metadata si está configurado
- Debe generar 7 archivos (HTML, JS, CSS, manifest, SW, icon, README)

**App.jsx:**
- Debe tener estado appConfig con 15 campos
- Debe renderizar 5 componentes
- No debe tener hooks fuera del componente

---

## 📞 Soporte

Si tienes problemas con la restauración:

1. **Revisa esta guía completa**
2. **Lee DOCUMENTACION_COMPLETA.md**
3. **Revisa CHANGELOG.md**
4. **Verifica los checksums**
5. **Contacta soporte** si el problema persiste

---

## 💾 Crear Nuevo Backup

Para crear un nuevo backup después de hacer cambios:

```powershell
# Crear carpeta con timestamp
$backupName = "BACKUP_PWA_COMPLETO_$(Get-Date -Format 'yyyy-MM-dd_HHmmss')"
New-Item -ItemType Directory -Path $backupName

# Copiar archivos
Copy-Item -Path "pwa-builder\*" -Destination $backupName -Recurse -Exclude "node_modules","dist"

# Copiar documentación
Copy-Item -Path "DOCUMENTACION_COMPLETA.md" -Destination "$backupName\"
Copy-Item -Path "CHANGELOG.md" -Destination "$backupName\"
Copy-Item -Path "RESTAURACION.md" -Destination "$backupName\"

Write-Host "Backup creado en: $backupName"
```

---

## ⚠️ IMPORTANTE

**Antes de Hacer Cambios Importantes:**

1. ✅ Crea un nuevo backup
2. ✅ Documenta tus cambios
3. ✅ Prueba en desarrollo primero
4. ✅ Verifica que no rompiste nada
5. ✅ Actualiza la documentación

**Este backup es tu punto de restauración seguro. No lo modifiques.**

---

**Fin de la Guía de Restauración**

*Backup creado: 01/12/2025 04:39:09*
*Versión: 2.0.0*
*Estado: Producción*
