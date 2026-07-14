# Proyecto SEO + GEO Rollershow

Branch: `proyecto-seo-geo` (worktree en `Desktop\rollershow-seo`, repo = rollershow). No mergear a main sin OK de Agus.

## Objetivo
1. Que la gente encuentre a Rollershow rápido cuando busca cortinas en Argentina (SEO clásico + local).
2. Que ChatGPT/Gemini/Perplexity recomienden a Rollershow (GEO).
3. Preparar el terreno para capitalizar la futura app de reviews con fotos de clientes (UGC → blog/páginas de reviews con schema).

## Estructura
- `AUDITORIA.md` — estado actual (sitio vivo, SERPs, activos digitales).
- `RESEARCH.md` — mejores/peores prácticas SEO+GEO con fuentes.
- `PLAN.md` — plan por etapas, Pareto-first.
- `EJECUCION.md` — el plan reordenado por dependencia de acceso: qué se puede hacer ya vs qué espera a que Nico dé acceso al repo/CMS del sitio.
- `assets/` — código listo para pegar (robots.txt, JSON-LD) el día que haya acceso; sin research pendiente, es pura ejecución.
- `contenido/` — 4 guías + 2 páginas de local + esqueleto de página de precios, listos para publicar. Grounded en datos reales de la API pública (`/api/v2/familias`, `/api/v2/colecciones`) y `llms.txt`, nunca inventados.

## Bloqueante actual
No tenemos acceso de edición al sitio (rollershow.com.ar corre en un CMS/plataforma propia, distinta de frontend-lab de Nico). Hasta que Nico dé acceso, todo lo de Fase 0/2 del PLAN.md queda preparado en `assets/` pero sin deployar. Ver `EJECUCION.md` para el detalle de qué SÍ se puede avanzar mientras tanto (GBP, reviews, contenido, GEO monitoring).

## Estado
- 2026-07-14: kickoff. Auditoría + research completos. Assets técnicos listos en `assets/`. Contenido (4 guías + 2 páginas de local + esqueleto de precios) escrito y en `contenido/`. Baseline de monitoreo GEO corrida en `_informes/geo-monitoreo-baseline.md` (hallazgo: Casa Roller ya tiene más reseñas que Rollershow, 10k+ vs 7.2k+). Pitch de PR borrador en `contenido/pitch-digital-pr.md`. Pendientes bloqueados por terceros: ver bloque "Pedidos manuales acumulados" en `EJECUCION.md` (login GBP, precios reales de Marcelo, datos internos para PR, acceso de Nico al sitio).
