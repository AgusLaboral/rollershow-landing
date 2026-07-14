# Ejecución sin acceso al sitio — qué se puede hacer ya vs qué espera a Nico

El plan completo está en [PLAN.md](PLAN.md). Este documento lo reordena por **dependencia de acceso**, no por fase, para saber qué arrancar hoy mismo.

## Distinción clave

- **"Acceso a la web"** = poder editar/deployar el código del sitio (robots.txt, HTML, JSON-LD, redirects). Eso lo tiene Nico (o quien administre el CMS de rollershow.com.ar — no es frontend-lab, es una plataforma distinta, con CSS/JS propios y sin templates Astro).
- **Google Business Profile** es una cuenta de Google, **no depende de Nico**. Si nadie del equipo tiene el login, hay que recuperarlo/reclamarlo — es un trámite de Google, no de desarrollo.
- **WhatsApp, contenido, copy, research** no dependen de ningún acceso técnico.

## 🔴 Bloqueado — necesita que Nico dé acceso al repo/CMS del sitio

Todo lo que implica tocar código o deployar en rollershow.com.ar:

- robots.txt real (Fase 0.1)
- Fix `/cotizar` → redirect + retitular `/cotizar/principal` (Fase 0.2)
- H1 en templates (Fase 0.3)
- `alt` en imágenes (Fase 0.4)
- Todo el schema JSON-LD (Fase 1.9, Fase 2.10)
- Páginas de precio, local, guías publicadas en el sitio (Fase 2)
- Consolidar CSS, redirects de migración (Fase 2.14-15)

**Para no perder tiempo cuando llegue el acceso**, ya dejé armados los assets listos para copiar/pegar en `assets/`:
- [`assets/robots.txt`](assets/robots.txt) — listo para subir tal cual.
- [`assets/schema-organization.json`](assets/schema-organization.json)
- [`assets/schema-localbusiness-caba.json`](assets/schema-localbusiness-caba.json)
- [`assets/schema-localbusiness-carlospaz.json`](assets/schema-localbusiness-carlospaz.json) — ambos con datos reales sacados de `llms.txt` (direcciones y horarios verificados). **Pendiente de completar por quien tenga acceso**: coordenadas lat/long exactas (Google Maps) y teléfono directo por local si existe uno distinto al 0800 general.
- [`assets/schema-faqpage-TEMPLATE.md`](assets/schema-faqpage-TEMPLATE.md) — patrón para envolver el contenido que ya existe en `/preguntas-frecuentes` en `FAQPage` schema (no hace falta escribir preguntas nuevas, solo marcar las que ya están).

Apenas tengas acceso, avisame y lo implemento directo — no hay research pendiente para esta parte, es puramente ejecución.

## 🟢 Ejecutable ya — sin ningún acceso técnico

### 1. Google Business Profile (el de mayor impacto de todo el plan) — ⏳ pendiente de acceso a la cuenta
No encontré una ficha de Maps de Rollershow claramente posicionada en las búsquedas — señal de que está débil, no reclamada, o duplicada/desactualizada. Esto **no lo pude ejecutar yo**: reclamar/auditar un GBP requiere login de Google del negocio, que no tengo. Queda en el bloque de pedidos manuales al final de este documento.

### 2. Pedido sistemático de reviews de Google — ✅ plantilla lista
[`assets/whatsapp-pedido-review.md`](assets/whatsapp-pedido-review.md) — falta solo pegarle el link de reseña de cada local (se genera desde el GBP una vez reclamado, punto 1).

### 3. Contenido escrito — ✅ ejecutado (2026-07-14)
Todo en [`contenido/`](contenido/), grounded en datos reales de la API pública de Rollershow (`/api/v2/familias`, `/api/v2/colecciones`) y en `llms.txt`, no en cifras inventadas:
- [`contenido/guia-como-medir-cortinas-roller.md`](contenido/guia-como-medir-cortinas-roller.md)
- [`contenido/guia-blackout-vs-sunscreen.md`](contenido/guia-blackout-vs-sunscreen.md)
- [`contenido/glosario-telas-cortinas-roller.md`](contenido/glosario-telas-cortinas-roller.md)
- [`contenido/pagina-local-carlos-paz.md`](contenido/pagina-local-carlos-paz.md)
- [`contenido/pagina-local-caba.md`](contenido/pagina-local-caba.md)
- [`contenido/pagina-precios.md`](contenido/pagina-precios.md) — **esqueleto sin números**: la API confirma que no devuelve precios ("el vendedor cotiza por sus canales"), así que esto no lo puedo completar yo. Ver pedidos manuales.

Cada pieza tiene marcados `[COMPLETAR: ...]` puntuales donde faltaba un dato que no debía inventar (ver bloque de pedidos manuales). Todo revisado contra las reglas de voz del proyecto (voseo, sin tells de IA, sin repetición, CTA verbo+beneficio).

### 4. GEO — monitoreo manual — ✅ baseline corrida (2026-07-14)
Primera foto en [`_informes/geo-monitoreo-baseline.md`](_informes/geo-monitoreo-baseline.md) vía WebSearch (aproxima Google/AI Overviews). Hallazgo clave: **Casa Roller ya tiene más reseñas que Rollershow (10k+ vs 7.2k+)** — refuerza la urgencia del punto 2. Para ChatGPT/Gemini/Perplexity como chatbot puntual no tengo acceso directo a esas interfaces — eso lo tiene que correr alguien del equipo a mano una vez por mes (prompts completos en RESEARCH.md).

### 5. Digital PR — ✅ borrador listo
[`contenido/pitch-digital-pr.md`](contenido/pitch-digital-pr.md) — pitch de email armado con el dato público (+402.000 instalaciones, +10 años). Los ángulos con más gancho (qué tela elige cada provincia, evolución de instalaciones en Carlos Paz) necesitan un cruce de datos internos que no tengo — ver pedidos manuales.

---

## 📋 Pedidos manuales acumulados — para Agus/equipo

Todo lo que quedó bloqueado por depender de una cuenta, un dato interno, o una decisión que no me corresponde tomar:

1. **Google Business Profile** — confirmar si alguien del equipo ya tiene el login de las cuentas de Google de los 2 locales (Carlos Paz / CABA). Si no, iniciar el reclamo en business.google.com (verificación por código postal o llamada). Es el ítem de mayor impacto de todo el plan y está 100% frenado sin esto.
2. **Precios reales** (Marcelo/ventas) — necesito precio "desde" por familia de producto y 3-4 ejemplos de cotización por medida típica, para terminar `contenido/pagina-precios.md`. La API pública no devuelve precios, así que no hay forma de sacarlo sin este dato.
3. **Datos internos para el pitch de prensa** (Noe/administración o CRM de ventas) — confirmar si existe algún cruce de datos tipo "qué tela elige cada provincia" o "evolución de instalaciones en Carlos Paz por año". Sin esto, el pitch de PR queda con el ángulo institucional (más débil).
4. **Coordenadas exactas y teléfono directo por local** (si existe uno distinto al 0800) — para completar `assets/schema-localbusiness-*.json`.
5. **Puntos de referencia de cada showroom** (cómo llegar, transporte público cercano) — para terminar las 2 páginas de local sin inventar cruces de calle.
6. **Margen de superposición recomendado** (cm) para instalación por fuera del marco, y si existe diferencia de precio entre colecciones Liviana/Intermedia/Pesada — para cerrar los `[COMPLETAR]` de las guías de medición y glosario.
7. **Acceso al repo/CMS del sitio** (Nico) — sigue siendo el bloqueante de fondo para todo lo de Fase 0/2 del PLAN.md.

## Siguiente paso sugerido
De estos 7, el de mayor impacto/menor esfuerzo es el **punto 1 (GBP)** — no depende de Nico ni de research adicional, solo de encontrar o iniciar el login.
