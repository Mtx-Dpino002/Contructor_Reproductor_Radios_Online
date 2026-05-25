# ⚡ INICIO RÁPIDO - PWA BUILDER

## 🚀 3 Pasos para empezar

### 1️⃣ Abrir PowerShell en esta carpeta
Presiona `Shift + Click Derecho` en esta carpeta → "Abrir PowerShell aquí"

### 2️⃣ Ejecutar script de instalación (OPCIÓN 1)
```powershell
.\instalar.ps1
```
*Si aparece error de permisos, ejecuta:*
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\instalar.ps1
```

### 3️⃣ O instalar manualmente (OPCIÓN 2)
```powershell
npm install
npm run dev
```

---

## 🌐 Acceder a la aplicación

Una vez iniciado el servidor, abre tu navegador en:
```
http://localhost:3000
```

---

## ⚙️ Comandos útiles

```powershell
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 📱 Crear tu primera PWA

1. **Completa el formulario:**
   - Nombre de tu radio
   - URL del stream
   - Sube logo e icono

2. **Personaliza colores:**
   - Elige una paleta o crea la tuya

3. **Vista previa:**
   - Prueba el reproductor

4. **Exportar:**
   - Click en "Generar PWA"
   - Click en "Descargar ZIP"

---

## 🆘 ¿Problemas?

### Node.js no instalado
Descarga desde: https://nodejs.org/

### Puerto ocupado
El servidor elegirá otro puerto automáticamente

### Error al instalar
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📚 Más información

- `README.md` - Documentación completa
- `INSTRUCCIONES.md` - Guía detallada
- `RESUMEN_PROYECTO.md` - Información del proyecto

---

¡Listo para crear PWAs! 🎉
