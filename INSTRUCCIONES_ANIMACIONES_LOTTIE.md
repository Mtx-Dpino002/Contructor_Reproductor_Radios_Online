# Cómo Agregar Animaciones Lottie Reales

## URLs Actuales (Placeholder)
Las URLs en `AudioSpectrumSelector.jsx` son actualmente placeholders y necesitan ser reemplazadas con animaciones reales de LottieFiles.

## Pasos para Obtener Animaciones Reales de LottieFiles:

### Opción 1: Usar LottieFiles.com (Recomendado)

1. **Visita LottieFiles**: Ve a https://lottiefiles.com/
2. **Busca animaciones**: Busca "audio spectrum", "equalizer", "sound wave", etc.
3. **Filtra por gratuitas**: Usa el filtro "Free" en la barra lateral
4. **Selecciona una animación**: Haz clic en la animación que te guste
5. **Obtén el enlace embed**:
   - Haz clic en el botón "Embed"
   - Copia la URL JSON directa (termina en .json)
   - O usa la URL de LottieFiles Host que aparece
6. **Reemplaza en el código**: Pega la URL en el array `AUDIO_ANIMATIONS`

### Opción 2: Subir tu Propia Animación

1. Crea o descarga un archivo .json de Lottie
2. Sube a LottieFiles.com (necesitas cuenta gratuita)
3. Obtén la URL pública
4. Agrégala al array

### Ejemplo de URLs Reales:

```javascript
// Ejemplos de URLs reales de LottieFiles:
{
  id: 'wave1',
  name: 'Ondas Simples',
  url: 'https://lottie.host/4c5e5c5e-8b8b-4b8b-8b8b-4b8b4b8b4b8b/abc123def.json',
  preview: '🌊'
}
```

## Archivos a Modificar:

- **`src/components/AudioSpectrumSelector.jsx`**: Líneas 5-43
  - Reemplaza las URLs en el array `AUDIO_ANIMATIONS`
  - Mantén el formato: `{ id, name, url, preview }`

## Búsquedas Sugeridas en LottieFiles:

- "audio spectrum"
- "sound wave"
- "music equalizer"
- "audio visualizer"
- "sound bars"
- "music pulse"
- "frequency wave"

## Notas Importantes:

1. **Asegúrate de que sean gratuitas**: Verifica la licencia
2. **Tamaño de archivo**: Animaciones pequeñas cargan más rápido
3. **Colores**: Preferiblemente con colores que combinen con el tema
4. **Loop**: La mayoría deben configurarse con loop para reproducción continua

## Alternativa: Usar URLs de Raw GitHub

Si tienes archivos Lottie propios:
1. Sube el .json a un repositorio GitHub público
2. Usa la URL raw: `https://raw.githubusercontent.com/usuario/repo/main/animation.json`

## Testing:

Después de agregar URLs reales:
1. Inicia el proyecto: `npm run dev`
2. Ve a la sección "Animación de Audio"
3. Selecciona cada animación
4. Verifica que se muestre correctamente en la vista previa
5. Exporta una PWA de prueba
6. Confirma que la animación aparece en la app exportada
