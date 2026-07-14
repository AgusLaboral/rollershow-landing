# Auditoría SEO — rollershow.com.ar (14/07/2026)

## Resumen ejecutivo
El sitio tiene buena base de titles/canonicals/OG, pero presenta **fallas técnicas graves**: no existe robots.txt (soft-404 con HTML), **cero datos estructurados (JSON-LD) en todo el sitio**, **cero H1 en todas las páginas auditadas**, sin blog ni páginas locales, y la home tiene solo ~175 palabras de texto visible. La sorpresa positiva: **llms.txt existe y es excelente** (mejor que el SEO clásico del sitio).

---

## 1. robots.txt — 🔴 CRÍTICO
- `https://www.rollershow.com.ar/robots.txt` y la variante sin www **devuelven un HTML de página 404 del CMS** (contiene `window.error404 = "1"`, GTM, analytics). El servidor lo sirve como página, no como texto plano.
- WebFetch lo reporta como HTTP 404; curl recibe el HTML completo del sitio.
- **Consecuencia**: no hay directivas para ningún bot. GPTBot, ClaudeBot, Google-Extended, PerplexityBot y CCBot **no están ni permitidos ni bloqueados explícitamente** (por defecto pueden crawlear todo). Tampoco hay referencia al sitemap desde robots.txt.
- Riesgo extra: si Google pide robots.txt y recibe HTML con código ambiguo, puede degradar el crawling.

## 2. sitemap.xml — 🟢 OK (con matices)
- Existe: `https://www.rollershow.com.ar/sitemap.xml`, **172 URLs**, sitemap único.
- Tipos: home, guías (`/como-instalar/roller`, `/como-medir/roller`), info (preguntas-frecuentes, garantía, showrooms, catálogos, privacidad) y fichas de tela por familia (`/roller/black-out-liviana-natural`, `/verticales/velvet-solarcool-celeste`, `/tradicionales/gasa-cala-natural`).
- 🟡 Medio: no está referenciado desde robots.txt (porque robots.txt no existe).

## 3. On-page por página (evidencia curl del HTML crudo)

| Página | Title | Meta desc | H1 | Canonical | JSON-LD |
|---|---|---|---|---|---|
| `/` (home) | "RollerShow \| Cotizá tu cortina online en 2 minutos" ✅ | ✅ | **0** ❌ | ✅ self | **0** ❌ |
| `/roller` | "Cortinas Roller \| RollerShow" ✅ | "Más de 101 telas disponibles. ¡Cotizá online!" (pobre, 45 chars) 🟡 | **0** ❌ | ✅ | **0** ❌ |
| `/roller/black-out-liviana-natural` | ✅ | **ausente** ❌ | **0** ❌ | ✅ | **0** ❌ (sin Product schema) |
| `/showrooms` | ✅ | ✅ | **0** ❌ | ✅ | **0** ❌ (sin LocalBusiness) |
| `/preguntas-frecuentes` | ✅ | ✅ | **0** ❌ | ✅ | **0** ❌ (sin FAQPage) |
| `/cotizar` | — | — | — | — | **HTTP 404** ❌ (el cotizador real es `/cotizar/principal`, title genérico "Cortinas Roller - Innovación y estética") |

- **hreflang: 0 en todas** (aceptable, sitio mono-mercado; medio).
- **Open Graph completo en home** (og:title/description/image/url/site_name + twitter) ✅.
- `<meta name="robots" content="">` vacía en home — inocua pero sucia.
- Severidad: **Alto** — sin H1 en ningún template y sin ningún schema (Organization, LocalBusiness, Product, FAQ, Review — todos ausentes) el sitio regala rich results y relevancia semántica. Las "7.200+ opiniones" no tienen AggregateRating markup.

## 4. Indexación (Google via WebSearch)
- `site:rollershow.com.ar` devuelve la home, /catalogos, /roller, /showrooms, /garantia, /preguntas-frecuentes, fichas de tela (`/duo/leaf-segmentos-translucidos-y-opacos-sand`), **más subdominios**: `soporte.rollershow.com.ar` (repuestos) y `tienda.rollershow.com.ar` ("Tienda Online de **intercortinas**" — título de otra marca, 🟡 señal confusa).
- Indexada `https://www.rollershow.com.ar/cotizar/principal` con título débil "Cortinas Roller - Innovación y estética" — la página de conversión principal está mal titulada. 🔴 Alto.
- Para "cortinas roller a medida argentina" el sitio rankea con home, /roller, /como-medir/roller, /roller/black-out, /roller/sun-screen. Compite con blackandsun.com.ar y Sodimac.
- Patrón de titles consistente "X | RollerShow", sin duplicados evidentes salvo el cotizador.

## 5. Arquitectura y contenido — 🔴 ALTO
- URLs limpias y jerárquicas (`/roller/black-out`, `/como-instalar/roller`) ✅.
- **No hay blog** (`/blog` → 404) y el sitemap no muestra contenido editorial. Cero captación informacional.
- **No hay páginas locales** dedicadas ("cortinas roller Carlos Paz", "cortinas CABA") — solo /showrooms genérica. Oportunidad local SEO grande teniendo dos locales físicos.
- **Home: solo ~175 palabras visibles** (medido quitando script/style). Sitio extremadamente visual, casi sin texto indexable.
- Imágenes: en home **19 de 20 `<img>` sin atributo `alt`**. 🔴

## 6. E-E-A-T — 🟡 MEDIO
- Teléfono visible: "0800-220-4010 - Todos los días las 24 horas" ✅.
- "7.200+ opiniones positivas" 5/5 y "+10 años de experiencia" — pero **reviews no verificables ni marcadas con schema**, sin link a fuente externa (Google Business Profile).
- Direcciones físicas: **no en la home**; sí en llms.txt (Av. Roseti 1674 Villa Ortúzar CABA; Av. San Martín 1919 VCP) y presumiblemente en /showrooms. Sin página "quiénes somos" en el sitemap.

## 7. Performance (a ojo) — 🟡 MEDIO
- Home: HTML de 62 KB, 8 scripts, 8 hojas `rel="stylesheet"` en head (roller: 9, ficha: 11) — **CSS render-bloqueante múltiple**.
- GA4 + GTM inline al tope del `<head>` antes que todo.
- Viewport correcto, mobile OK a nivel meta.

## 8. llms.txt — 🟢 EXISTE Y ES SOBRESALIENTE
- `https://www.rollershow.com.ar/llms.txt` devuelve markdown completo: descripción de la empresa, ambos showrooms con direcciones y horarios, las 5 familias con plazos, servicios, **API v2 documentada** (familias/colecciones/telas/fotos) y el endpoint `POST /api/v2/cotizar` con ejemplo. También referencia `llms-full.txt` y `/api/v2/openapi`.
- 🟡 Detalle: los links internos usan `http://` en vez de `https://`.

---

## Prioridades
1. 🔴 Crear robots.txt real en texto plano (Allow all + `Sitemap:`; decidir política de bots IA — hoy todo abierto por defecto).
2. 🔴 Agregar H1 a todos los templates y JSON-LD: Organization+LocalBusiness (con las 2 sucursales), Product en fichas de tela, FAQPage en /preguntas-frecuentes, AggregateRating con las 7.200 opiniones.
3. 🔴 Arreglar title/meta de `/cotizar/principal` (página de conversión indexada con branding viejo) y redirigir `/cotizar` → `/cotizar/principal` (hoy 404).
4. 🔴 Alt text en imágenes (19/20 sin alt en home) + meta description en fichas de producto.
5. 🟡 Páginas locales (CABA / Carlos Paz) y contenido editorial: la home con 175 palabras y cero blog deja todo el tráfico informacional a la competencia.
6. 🟡 Consolidar CSS (8-11 stylesheets bloqueantes) y revisar el subdominio `tienda.` con título "intercortinas".
