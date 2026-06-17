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

## Convenciones (para mantener el repo ordenado)

**Regla del prefijo `_`** — el guion bajo marca lo que NO es el entregable:

| Patrón | Qué es | ¿Git? |
|---|---|---|
| `index.html`, `img/`, `prototipo-*.html` | Entregable real | ✅ versionado |
| `_make-singlefile.py` | Herramienta de build (excepción histórica) | ✅ versionado |
| `_scratch/` | **Todo lo efímero**: scripts de captura, screenshots, video fuente | ❌ ignorado |
| `_assets-originales/`, `_screenshots/`, `_checkpoints/` | Material pesado/legacy | ❌ ignorado |

**Al crear archivos de trabajo (capturas, debug, pruebas), guardarlos en:**

```
_scratch/
├── scripts/      # scripts de captura/debug one-off (.mjs, .js)
├── shots/        # screenshots intermedios (.png)
└── video-src/    # material de video fuente (.mp4, .webm)
```

Nombrá los scripts de captura describiendo qué capturan: `capture-hero.mjs`, `check-fold.mjs` — no `_v8.mjs`. Nada de `_scratch/` se commitea: es local y descartable. Si algo de ahí pasa a ser entregable, moverlo fuera y sacarle el prefijo.

## Stack

- HTML/CSS/JS vanilla
- Playwright para captura mobile
- Python para build single-file

## Licencia

Privado.
