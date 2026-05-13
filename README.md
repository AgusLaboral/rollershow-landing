# Rollershow — Landing

Landing page de Rollershow. Single-page HTML con assets optimizados.

## Estructura

```
.
├── index.html              # Landing principal (servir esto)
├── prototipo-tearable.html # Prototipo experimental
├── img/                    # Assets optimizados (versionados)
├── scripts/                # Utilidades (screenshots Playwright, etc.)
├── _make-singlefile.py     # Build a single-file con assets inlined
└── package.json            # Dependencias dev (Playwright)
```

## Desarrollo

```bash
# Instalar deps
npm install

# Screenshot mobile
npm run shot

# Generar build single-file (HTML con todo inlined)
python _make-singlefile.py
```

Salida del build: `index-standalone.html` (ignorado por git, se regenera).

## Assets fuente

Los archivos pesados (`_assets-originales/`, `_screenshots/`, `_checkpoints/`, `*.zip`) están ignorados por git. Mantener backup externo (Drive/S3) si se necesita versionar.

## Stack

- HTML/CSS/JS vanilla
- Playwright para captura mobile
- Python para build single-file

## Licencia

Privado.
