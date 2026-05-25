# Script de instalación y ejecución del PWA Builder
# Para Windows PowerShell

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  PWA BUILDER - INSTALADOR" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    Read-Host "Presiona Enter para salir"
    exit
}

Write-Host ""

# Verificar si npm está instalado
Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "✗ npm no está instalado" -ForegroundColor Red
    Write-Host ""
    Read-Host "Presiona Enter para salir"
    exit
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan

# Preguntar si desea instalar dependencias
Write-Host ""
$install = Read-Host "¿Deseas instalar las dependencias? (S/N)"

if ($install -eq "S" -or $install -eq "s") {
    Write-Host ""
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    Write-Host "Esto puede tomar algunos minutos..." -ForegroundColor Gray
    Write-Host ""
    
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
        Write-Host ""
        Read-Host "Presiona Enter para salir"
        exit
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan

# Preguntar si desea iniciar el servidor
Write-Host ""
$run = Read-Host "¿Deseas iniciar el servidor de desarrollo? (S/N)"

if ($run -eq "S" -or $run -eq "s") {
    Write-Host ""
    Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Yellow
    Write-Host "El navegador se abrirá automáticamente en http://localhost:3000" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Para detener el servidor, presiona Ctrl+C" -ForegroundColor Gray
    Write-Host ""
    
    npm run dev
} else {
    Write-Host ""
    Write-Host "Para iniciar el servidor más tarde, ejecuta:" -ForegroundColor Yellow
    Write-Host "npm run dev" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✓ Instalación completada" -ForegroundColor Green
    Write-Host ""
    Read-Host "Presiona Enter para salir"
}
