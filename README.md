# RealFont

Calculadora de escalas tipográficas para diseño web.

## Características

- 🎨 Calculadora interactiva de escalas tipográficas
- 📱 Vista previa en múltiples dispositivos (Lista, Escritorio, Móvil)
- 🔤 17 tipografías disponibles (Google Fonts + fuentes del sistema)
- 📊 Múltiples ratios de escala (Golden Ratio, Perfect Fourth, etc.)
- 💾 Exportación a CSS y Tailwind CSS
- ⚖️ Selector de unidades (px, rem, pt)
- 🎯 Control de peso de fuente

## Uso Local

### Opción 1: Abrir directamente
Simplemente abre `index.html` en tu navegador.

### Opción 2: Servidor local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve
```

## Uso con Docker

### Construir y ejecutar
```bash
docker-compose up -d
```

La aplicación estará disponible en: http://localhost:8080

### Detener
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f
```

## Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox)
- JavaScript (Vanilla)
- Google Fonts API
- Nginx (para Docker)

## Licencia

MIT
