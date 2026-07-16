# Rollershow — hub del ecosistema (CLAUDE.md = fuente de verdad)

Esta carpeta es la **landing legacy vanilla** de Rollershow Y el **hub de sesión** desde donde se coordina todo el ecosistema Rollershow del Desktop. `AGENTS.md` es un stub espejo de este archivo — editar solo acá.

## ⚠️ Reglas críticas antes de tocar nada

1. **NUNCA pushear `main` local a `origin/main`**: el remote (`AgusLaboral/rollershow-landing`) es un snapshot de deploy Astro que ya NO comparte historia con este repo. Backup de main local → rama `backup/main-local`. Publicar a Pages → worktree sobre FETCH_HEAD + fast-forward de archivos sueltos.
2. **No mover ni renombrar las carpetas hermanas**: varias son git worktrees con paths absolutos (`rollershow-seo` es worktree de ESTE repo; `rollershow-src-promo` y `rollershow-simulador` lo son de `rollershow-src`). Moverlas rompe git y los scripts de deploy.
3. **Repos con otras sesiones activas** (reviews, cortina-viva, src): no hacer `git switch` ni tocar su working tree desde acá. Pushear commits ya hechos está OK; para trabajar en una rama, worktree aparte.
4. `index.html` de esta carpeta es el **diseño fuente** que Nico porta a `landing.astro` en frontend-lab. No crear repos nuevos por página: gracias/landing/simulador son rutas Astro de UN repo GitLab.

## Mapa del ecosistema (Desktop)

| Carpeta | Qué es | Git | Estado (jul-2026) |
|---|---|---|---|
| `rollershow` (esta) | Landing legacy vanilla + hub | repo → `AgusLaboral/rollershow-landing` (⚠️ regla 1) | activo |
| `rollershow-seo` | Proyecto SEO/GEO | **worktree de esta**, rama `proyecto-seo-geo` | en pausa |
| `rollershow-src` | frontend-lab Astro (fuente REAL del sitio nuevo, repo de Nico, multi-dev) | repo → GitLab `rollershow/frontend-lab` + backup GitHub `rollershow-src` | ACTIVO — leer su CLAUDE.md antes de tocar |
| `rollershow-src-promo` | Landings promo | worktree de src, rama `landing-promo` | activo |
| `rollershow-simulador` | Simulador (viejo) | worktree de src, rama `feat/simulador` | superado por rama `todos-los-tipos-de-cortina` de src |
| `rollershow-brand-manual` | **Manual de marca — fuente de verdad de la marca** | repo propio + Pages | activo; su AGENTS.md manda |
| `rollershow-cortina-viva` | Landing 3D cortinas tradicionales | repo propio | activo (Codex también trabaja ahí) |
| `rollershow-reviews` | App UGC reviews + sorteo | repo propio + Pages | muy activo |
| `rollershow-gracias` | Build estático de /gracias (NO fuente; nunca borrar/recrear) | repo propio | artefacto de deploy |
| `rollershow-stock-mayorista` | Estrategia B2B mayorista (docs/data) | repo propio (backup privado) | inactivo desde may-2026 |
| `rollershow-cultui` | Scratch Next.js cult-ui | repo local | abandonado (jun-2026) |
| `RolHub` | Assets creativos/video campaña RolHub | sin git | archivo muerto (abr-2026), candidato a Drive |

Fuente-vs-build: `rollershow-src` (fuente) → deploys a Pages en `rollershow-gracias`, `rollershow-simulador` (link estable `aguslaboral.github.io/rollershow-simulador/`), maquetas en `rollershow-landing` Pages.

## Convención para proyectos NUEVOS de Rollershow

- Carpeta `Desktop\rollershow-<tema>` (kebab-case, tema en una palabra si se puede).
- Repo propio privado `AgusLaboral/rollershow-<tema>` desde el día 1 (skill `github-backup`).
- UNA fuente de verdad de docs (`CLAUDE.md` o `AGENTS.md`) + el otro como stub espejo.
- Lo efímero (screenshots, capturas, scripts one-off) va en `_scratch/` (ignorado). Prefijo `_` = no-entregable.
- Alinear todo entregable visual con el manual de marca (`rollershow-brand-manual`, Rojo Teja `#C63A21`).
- Registrar el proyecto nuevo en la tabla de arriba.

## Esta carpeta en particular

- Variantes de landing coexistentes (A/B vivas, no basura): `index.html` (canónica), `index-cotizador.html` (multistep → API), `index-fase1.html` (ronda feedback). `prototipo-tearable.html` = experimento estancado (may-2026).
- `index-standalone.html` se regenera con `python _make-singlefile.py` — no versionado, borrable.
- Estructura y convención `_scratch/` documentadas en `README.md`.
- `.claude/launch.json`: dev servers `landing` (:8099), `gracias` (:4321), `promo` (:4322).

## Secretos

- Único secreto del ecosistema: `API_TOKEN` (prefijo `rs_`) en `.env` de src y src-promo (ignorados por git, nunca commiteados). No hay otras keys sueltas.
- `rollershow-src/docs/api-auth.md` contiene un token de EJEMPLO (`rs_aB3…`) publicado en GitLab/GitHub — pendiente confirmación de Agus de que es ficticio (auditoría 2026-07-16).

## Historial de orden

- 2026-07-16: auditoría plena + este mapa. Informe completo en vault `90-Claude/Rollershow-auditoria-orden-carpetas-2026-07-16.md`.
