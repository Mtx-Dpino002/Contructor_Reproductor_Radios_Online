# 📦 GUÍA PARA CREAR BACKUPS - PWA Constructor

**Versión:** 2.0  
**Fecha:** 2 de diciembre de 2025

---

## 🎯 Cuándo Crear un Backup

### Situaciones que requieren backup:

1. ✅ **Después de implementar funcionalidades importantes**
   - Nueva feature completa
   - Sistema completo (como gestión de proyectos)
   - Integración de librerías nuevas

2. ✅ **Antes de cambios grandes**
   - Refactorización importante
   - Cambio de arquitectura
   - Actualización de dependencias mayores

3. ✅ **Periódicamente**
   - Cada semana si hay desarrollo activo
   - Cada mes si está en mantenimiento
   - Antes de vacaciones/períodos sin trabajo

4. ✅ **Hitos del proyecto**
   - Fin de sprint
   - Release de versión
   - Entrega a cliente

---

## 🚀 Proceso de Backup (10 minutos)

### Paso 1: Preparación (2 min)
```powershell
# Verificar que todo funciona
cd pwa-builder
npm run dev
# Probar en localhost:3000
# Cerrar servidor: Ctrl+C
```

### Paso 2: Crear Carpeta de Backup (1 min)
```powershell
# Generar nombre con timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupName = "BACKUP_PWA_COMPLETO_$timestamp"
$backupPath = "c:\Users\darin\OneDrive\Desktop\Proyectos Programacion\_PWA Constructor\$backupName"

# Crear carpeta
New-Item -ItemType Directory -Path $backupPath -Force
Write-Host "✅ Carpeta creada: $backupName"
```

### Paso 3: Copiar Archivos (2 min)
```powershell
# Copiar todo excepto node_modules, dist, .vite
Copy-Item -Path "pwa-builder\*" `
          -Destination $backupPath `
          -Recurse `
          -Exclude "node_modules","dist",".vite" `
          -Force

Write-Host "✅ Archivos copiados"
```

### Paso 4: Crear Documentación del Backup (5 min)

#### A) BACKUP_INFO.md
Copiar y modificar del backup anterior:
- Actualizar fecha y hora
- Actualizar versión si cambió
- Actualizar lista de funcionalidades
- Actualizar dependencias si hay nuevas
- Actualizar estadísticas (líneas, archivos)

#### B) CHANGELOG.md
Agregar nueva entrada con:
- Fecha
- Versión
- Nuevas características
- Archivos modificados
- Archivos nuevos
- Correcciones de bugs
- Cambios breaking (si hay)

#### C) RESTAURACION_RAPIDA.md
Revisar y actualizar si:
- Cambió proceso de instalación
- Hay nuevas dependencias
- Hay nuevos pasos de configuración
- Hay nuevos problemas conocidos

#### D) LEEME_BACKUP.md
Actualizar:
- Fecha del backup
- Resumen de novedades
- Comandos si cambiaron

### Paso 5: Verificación (3 min)
```powershell
# Contar archivos copiados
$fileCount = (Get-ChildItem -Path $backupPath -Recurse -File | 
              Where-Object { $_.Name -notlike "*.lock" }).Count
Write-Host "📊 Total de archivos: $fileCount"

# Verificar archivos críticos
$criticalFiles = @(
    "package.json",
    "src\App.jsx",
    "src\components\Header.jsx",
    "src\lib\generator.js"
)

foreach ($file in $criticalFiles) {
    $exists = Test-Path "$backupPath\$file"
    if ($exists) {
        Write-Host "✅ $file"
    } else {
        Write-Host "❌ FALTA: $file"
    }
}
```

---

## 📋 Checklist de Backup

Antes de dar por finalizado el backup, verificar:

### Archivos
- [ ] package.json copiado
- [ ] package-lock.json copiado
- [ ] src/ completo (componentes, lib, assets)
- [ ] public/ completo (sw, manifest, icons)
- [ ] Archivos de configuración (vite, tailwind, postcss)
- [ ] index.html
- [ ] .gitignore
- [ ] README.md (original del proyecto)

### Documentación
- [ ] BACKUP_INFO.md creado/actualizado
- [ ] CHANGELOG.md actualizado
- [ ] RESTAURACION_RAPIDA.md revisado
- [ ] LEEME_BACKUP.md actualizado
- [ ] INDICE_DOCUMENTACION.md actualizado (si existe)
- [ ] VERIFICACION_BACKUP.md creado (opcional)

### Verificación
- [ ] Archivos críticos presentes
- [ ] Total de archivos correcto (~45-50)
- [ ] Tamaño razonable (~2 MB sin node_modules)
- [ ] Documentación completa
- [ ] Fecha y hora correctas en todos los docs

### Metadata
- [ ] Nombre del backup con timestamp
- [ ] Versión correcta indicada
- [ ] Estado del proyecto indicado (desarrollo/producción)
- [ ] Funcionalidades listadas
- [ ] Dependencias documentadas

---

## 📝 Template de CHANGELOG para Nuevo Backup

```markdown
## Versión X.Y - "Nombre Descriptivo" (DD de Mes de 2025)

### 🎉 NUEVAS CARACTERÍSTICAS

#### **1. [Nombre de Feature]**
- Descripción breve
- Características principales
- Archivos modificados
- Código importante

### 🔧 MEJORAS Y CAMBIOS

#### **[Nombre de Archivo]**
- Cambio 1
- Cambio 2
- Líneas añadidas: +XX

### 🐛 CORRECCIONES

- Bug 1 solucionado
- Bug 2 solucionado

### 📦 NUEVOS ARCHIVOS CREADOS

1. **ruta/archivo.ext** (XX líneas)
   - Propósito
   - Características

### 🗑️ ARCHIVOS MODIFICADOS

1. **ruta/archivo.ext**: +XX líneas
   - Cambios específicos

### ⚠️ PROBLEMAS CONOCIDOS

- Problema 1
- Problema 2

### 📊 ESTADÍSTICAS

**Antes (vX.Y-1):**
- Métrica 1: valor

**Ahora (vX.Y):**
- Métrica 1: valor (+X%)

**Incremento:** +X% de funcionalidad
```

---

## 🔄 Script Automático de Backup

Guardar como `crear-backup.ps1`:

```powershell
# Script para crear backup automático de PWA Constructor
# Uso: .\crear-backup.ps1

Write-Host "🎯 Iniciando proceso de backup..." -ForegroundColor Cyan

# 1. Timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupName = "BACKUP_PWA_COMPLETO_$timestamp"
$sourcePath = "pwa-builder"
$backupPath = "..\$backupName"

# 2. Crear carpeta
Write-Host "📁 Creando carpeta de backup..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

# 3. Copiar archivos
Write-Host "📦 Copiando archivos..." -ForegroundColor Yellow
Copy-Item -Path "$sourcePath\*" `
          -Destination $backupPath `
          -Recurse `
          -Exclude "node_modules","dist",".vite","*.log" `
          -Force

# 4. Contar archivos
$fileCount = (Get-ChildItem -Path $backupPath -Recurse -File).Count
Write-Host "✅ Copiados $fileCount archivos" -ForegroundColor Green

# 5. Verificar críticos
Write-Host "🔍 Verificando archivos críticos..." -ForegroundColor Yellow
$critical = @(
    "package.json",
    "src\App.jsx",
    "src\components\Header.jsx"
)

$allPresent = $true
foreach ($file in $critical) {
    if (Test-Path "$backupPath\$file") {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ FALTA: $file" -ForegroundColor Red
        $allPresent = $false
    }
}

# 6. Resultado
if ($allPresent) {
    Write-Host "`n🎉 Backup completado exitosamente!" -ForegroundColor Green
    Write-Host "📂 Ubicación: $backupPath" -ForegroundColor Cyan
    Write-Host "`n⚠️  RECORDAR:" -ForegroundColor Yellow
    Write-Host "  1. Actualizar BACKUP_INFO.md con fecha y cambios"
    Write-Host "  2. Actualizar CHANGELOG.md con nueva versión"
    Write-Host "  3. Revisar RESTAURACION_RAPIDA.md"
} else {
    Write-Host "`n❌ Backup incompleto - faltan archivos críticos" -ForegroundColor Red
}
```

### Usar el script:
```powershell
# Dar permisos de ejecución (solo primera vez)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# Ejecutar
.\crear-backup.ps1
```

---

## 🗂️ Organización de Backups

### Estructura recomendada:
```
Proyectos Programacion/
└── _PWA Constructor/
    ├── pwa-builder/                    ← Proyecto activo
    ├── BACKUP_PWA_COMPLETO_2025-12-01_043909/
    ├── BACKUP_PWA_COMPLETO_2025-12-02_194905/
    └── BACKUP_PWA_COMPLETO_2025-12-XX_XXXXXX/  ← Próximo
```

### Nombrado:
- **Formato:** `BACKUP_PWA_COMPLETO_YYYY-MM-DD_HHMMSS`
- **Ejemplo:** `BACKUP_PWA_COMPLETO_2025-12-02_194905`
- **Por qué:** Orden cronológico automático, identificación única

### Retención:
- **Último mes:** Todos los backups
- **Último año:** 1 backup por mes
- **Más de 1 año:** 1 backup por trimestre
- **Backups de versiones mayores:** Mantener siempre (v1.0, v2.0, v3.0)

---

## 💾 Backup en la Nube

### Opciones recomendadas:

#### 1. OneDrive (Ya en uso)
```powershell
# La carpeta ya está en OneDrive, se sincroniza automáticamente
# Ventajas:
# - Automático
# - Sin configuración extra
# - Acceso desde cualquier dispositivo
```

#### 2. GitHub (Repositorio privado)
```powershell
# Inicializar Git en carpeta de backup
cd $backupPath
git init
git add .
git commit -m "Backup v2.0 - 2025-12-02"

# Crear repo en GitHub y push
git remote add origin https://github.com/usuario/pwa-constructor-backup.git
git push -u origin main
```

#### 3. Compresión ZIP
```powershell
# Comprimir backup para enviar/almacenar
Compress-Archive -Path $backupPath `
                 -DestinationPath "$backupPath.zip" `
                 -Force

Write-Host "✅ Backup comprimido: $backupPath.zip"
```

---

## 🔐 Seguridad de Backups

### Qué incluir:
- ✅ Todo el código fuente
- ✅ Configuraciones
- ✅ Assets
- ✅ Documentación

### Qué NO incluir:
- ❌ node_modules (se instalan después)
- ❌ .env (si contiene secretos)
- ❌ Credenciales o API keys
- ❌ Datos de usuarios (si aplica)
- ❌ Archivos temporales (.vite, dist)

### Verificar antes de compartir:
```powershell
# Buscar posibles secretos
Select-String -Path $backupPath -Pattern "API_KEY|SECRET|PASSWORD" -Recurse
```

---

## 📊 Métricas de Backup

### Registrar en cada backup:

1. **Fecha y hora** (timestamp automático)
2. **Versión del proyecto** (manual)
3. **Total de archivos** (script)
4. **Tamaño del backup** (verificar)
5. **Funcionalidades totales** (contar manualmente)
6. **Líneas de código** (estimar o contar)
7. **Estado** (desarrollo/producción)

### Tabla de historial:
```markdown
| Fecha | Versión | Archivos | Tamaño | Funcionalidades | Estado |
|-------|---------|----------|--------|-----------------|---------|
| 2025-12-01 | 1.0 | 40 | 1.8 MB | 8 | Producción |
| 2025-12-02 | 2.0 | 47 | 2.0 MB | 11 | Producción |
```

---

## ✅ Resultado Final

Después de seguir esta guía, deberías tener:

1. ✅ Carpeta de backup con timestamp
2. ✅ Todos los archivos copiados (sin node_modules)
3. ✅ Documentación completa actualizada
4. ✅ Verificación de archivos críticos
5. ✅ Changelog actualizado
6. ✅ Backup seguro y organizado

**Tiempo total:** 10-15 minutos  
**Resultado:** Backup completo y documentado

---

*Guía creada: 2 de diciembre de 2025*  
*PWA Constructor v2.0*
