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

### 1. Google Business Profile (el de mayor impacto de todo el plan)
No encontré una ficha de Maps de Rollershow claramente posicionada en las búsquedas — señal de que está débil, no reclamada, o duplicada/desactualizada. Acción inmediata:
- Verificar en https://business.google.com quién tiene el perfil de cada local (Carlos Paz: Av. San Martín 1919; CABA: Av. Roseti 1674, Villa Ortúzar) — si nadie del equipo tiene acceso, reclamarlo es un trámite de Google (verificación por código postal/llamada), no depende de Nico.
- Completar categoría, horarios (L-V 10-19, Sáb 10-13 — confirmado en llms.txt), fotos reales.
- Esto lo puede accionar directamente Ornella/Cami sin tocar código.

### 2. Arrancar el pedido sistemático de reviews de Google
Armé la plantilla de mensaje en [`assets/whatsapp-pedido-review.md`](assets/whatsapp-pedido-review.md) — falta pegarle el link de reseña de cada local (se genera desde el GBP una vez reclamado, punto 1). Circuito: técnico/vendedor lo manda por WhatsApp justo después de la instalación, mencionando su propio nombre.

### 3. Contenido escrito, listo para publicar cuando haya acceso
Puedo escribir ya los textos completos (no requieren el sitio):
- Página de precios (rangos "desde $X/m²")
- Las 4 guías core: cómo medir, blackout vs sunscreen, precios, glosario de telas
- Copy de las 2 páginas de local (Carlos Paz / CABA)

Todavía no los escribí — decime si querés que arranque con alguno en particular o los voy armando todos.

### 4. GEO — monitoreo manual
Puedo correr ya la batería de ~20 prompts contra buscadores (vía WebSearch, que aproxima Google/AI Overviews) para tener una primera foto. Para ChatGPT/Gemini/Perplexity puntual como chatbot no tengo acceso directo a esas interfaces — eso lo tiene que correr alguien del equipo a mano una vez por mes (5 minutos, prompts ya definidos en RESEARCH.md).

### 5. Digital PR
Puedo redactar el pitch para medios locales (Carlos Paz/Córdoba) usando el dato de +400.000 instalaciones — no depende de nadie más para arrancar el borrador.

---

## Siguiente paso sugerido
Lo de mayor impacto/menor esfuerzo que se puede arrancar HOY sin esperar a nadie: **reclamar/auditar los 2 Google Business Profile**. Decime si ya existen logins del equipo para esas cuentas o si hay que iniciar el reclamo de cero.
