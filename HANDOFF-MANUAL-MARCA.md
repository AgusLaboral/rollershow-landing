# Manual de Marca RollerShow — handoff para continuar con otro agente

Este documento es la memoria que Claude Code tenía en sesión. Léelo entero antes de tocar nada: el manual pasó por varias rondas de corrección y varias de esas correcciones no son obvias mirando solo el código.

## Dónde está todo

- **Archivo fuente**: `manual-marca.html` (raíz de este repo, `Desktop/rollershow/`). Single-file HTML, ~1600 líneas, cero dependencias externas salvo Google Fonts (Bricolage Grotesque + Manrope) y el logo SVG que se carga por `<img>` desde `https://assets.rollershow.com.ar/2021/img/rs_logo_animado_b.svg` (CDN de producción real, no inventar otro).
- **Repo local**: `AgusLaboral/rollershow-landing` en GitHub (remote `origin` de este mismo repo). El `main` local NO se pushea nunca directo — ver sección de deploy abajo, es importante.
- **URL viva**: https://aguslaboral.github.io/rollershow-landing/manual-marca.html — este es el link que se le pasa a Agus.

## ⚠️ Cómo deployar (leer antes de pushear cualquier cosa)

El repo de GitHub Pages (`AgusLaboral/rollershow-landing`, rama `main` remota) **NO comparte historia** con este repo local. Otra automatización sube ahí builds de una landing distinta (`deploy landing + promo`) y cada vez que lo hace, **pisa el árbol completo y borra `manual-marca.html`** si no se lo vuelve a copiar encima.

Flujo correcto para publicar un cambio (PowerShell, Windows):

```powershell
cd C:\Users\Agus\Desktop\rollershow
git add manual-marca.html
git commit -m "mensaje"
$token = & "$env:USERPROFILE\.claude\skills\github-backup\scripts\Get-AgusLaboralToken.ps1"
$url = "https://x-access-token:$token@github.com/AgusLaboral/rollershow-landing.git"
git fetch $url main
git worktree add ..\_wt-pages-manual FETCH_HEAD
Copy-Item manual-marca.html ..\_wt-pages-manual\manual-marca.html -Force
cd ..\_wt-pages-manual
git add manual-marca.html
git commit -m "mensaje"
git push $url HEAD:main
cd ..\rollershow
git worktree remove ..\_wt-pages-manual --force
```

Si no tenés acceso al token de `Get-AgusLaboralToken.ps1` (es de la cuenta AgusLaboral de Agus), pedile a Agus que lo corra él o que te pase un token con permiso de push a ese repo. **Nunca hagas `git push origin main` a secas**: es non-fast-forward contra la historia real y vas a intentar force-pushear sin querer.

Después de cada deploy, verificar en vivo con `curl` sobre la URL (esperar 15-30s de propagación de GitHub Pages) antes de darlo por hecho.

## Estructura del documento (11 capítulos + tokens)

00 Cómo leer el manual (convenciones, las 7 máximas de criterio) · 01 Marca (logo, zona de seguridad, tamaños mínimos) · 02 Color (paleta + Rojo Teja + matriz de contraste WCAG medida) · 03 Tipografía (escala real, jerarquía en composición) · 04 Espaciado y retícula (radios con rol fijo, sombras, grilla 12 columnas, sangrado 3mm, escala de espaciado base-4) · 05 Voz y copy (principios, biblioteca de CTAs, ortotipografía de números/precios) · 06 Componentes web (botones con 5 estados, campos de texto, foco) · 07 Presupuesto y papelería (anatomía, tratamiento del total, firma de email, tarjeta personal, membrete graficado) · 08 Redes y avisos (formatos, zonas seguras graficadas, plantilla de post y de story) · 09 Fotografía (reglas de toma, grado de color, espacio negativo graficado) · 10 Materia y efectos (fondos de marca con nombre, elementos recurrentes, iconografía propia, catálogo sí/no de 16+ filas) · 11 Tokens (bloque `<script type="application/json">` con TODOS los valores del manual, colapsado en un `<details>` para que un humano no tenga que leerlo).

## Reglas de fondo que costó establecer (no las rompas)

1. **El manual es agnóstico de aplicaciones.** No menciona bots, archivos ni proyectos específicos (se sacó "Ulises", `index.html`, `rollershow-reviews`, un aparato "confirmado/propuesto", y dos secciones que trackeaban bugs de implementación). Si algo de una pieza real contradice al manual, **se corrige la pieza, no el manual** (regla 00.1.3). Cualquier hallazgo de bug real en otro proyecto va a la memoria/tasks de Agus, nunca al manual.
2. **Cero tells de diseño-IA**: nada de eyebrows (etiqueta chica antes de un título — el numeral va FUNDIDO en el mismo renglón del título, `<span class="spec__title-num">`), nada de cajas-dentro-de-cajas (todo separador es hairline de 1px, nunca fondo+borde+sombra), nada de middots `·` ni em-dashes `—` en prosa propia (regla 05.3.1 — el documento mismo se audita contra esto), nada de pills verdes de WhatsApp genéricas, nada de dots de color "online" pulsantes, nada de checks/estrellas ASCII.
3. **Un solo color de acción**: Rojo Teja `#C63A21` (glow `#D2451E`, profundo `#97290F`). El terracota `#B8662C` es acento de apoyo, nunca acción. El verde solo existe en el botón del canal de mensajes — la marca no tiene "verde de éxito" en ningún otro lado (confirmación de éxito es texto en Tinta).
4. **`.clauses li` usa sangría colgante (`position:absolute` en el número), NUNCA `display:grid`/`flex`.** Esto rompió el documento entero una vez: si una cláusula mezcla `<b>`/`<code>`/`<a>` con texto plano y el `<li>` es un grid de columnas fijas, CSS Grid trata cada fragmento inline como un ítem aparte y destroza el texto en una palabra por línea. Si agregás un componente nuevo con número+texto, copiá el patrón de `.clauses`, no inventes uno con grid.
5. **Verificación mobile real**: el preset "mobile" de algunas herramientas de browser puede reportar un `innerWidth` que no es el `clientWidth` real (pasó: reportaba 525 en vez de 375). Antes de dar por buena una verificación de overflow, medí `document.documentElement.clientWidth` y `scrollWidth` directamente por JS, no confíes en el preset.
6. **Imágenes del logo con altura fija rompen a viewports angostos** (el SVG tiene proporción 11.5:1, a `height:36px` mide ~415px de ancho, más que un viewport de 375px). Toda instancia usa `width:min(100%, Npx); height:auto`.

## Pendiente (necesita algo de Agus, no se puede resolver solo)

- **Capítulo 07.3 "Especimen completo"**: dice explícitamente "Pendiente" porque Agus va a mandar un presupuesto viejo real como referencia de formato. Cuando llegue: reconstruir el componente `.paper` (ya existe en el CSS, se sacó del HTML pero la clase sigue definida) con los datos y el formato reales, y sacar la nota de pendiente. **No inventar un presupuesto de ejemplo de nuevo** — ya se hizo una vez y se pidió sacarlo.
- **Bug real detectado en producción (fuera del manual)**: `index.html` de este mismo repo, líneas ~242-250, tiene un punto verde pulsante (`::before` con `border-radius:50%` + `animation:pulse`) junto al pill de teléfono del header — viola la regla anti-"dot online" que el propio manual documenta. Hay una chip de tarea abierta para esto en la sesión de Claude Code (task_fcc05861); si no la ves disponible, es solo un fix de CSS de una línea en `index.html`, no del manual.

## Cómo verificar cambios (dado que no hay screenshot fiable en este entorno)

No confíes en "se ve bien" sin evidencia. Patrón usado toda la sesión:

```js
// Ejemplo: chequear overflow horizontal real
const vw = document.documentElement.clientWidth;
JSON.stringify({vw, scrollW: document.documentElement.scrollWidth,
  over: [...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > vw + 2).length})
```

Y para bugs de layout tipo "texto partido raro", medir alturas de elementos repetidos (`getBoundingClientRect().height`) y buscar outliers, no solo contar cuántos hay.

## Validaciones rápidas antes de cada commit

```bash
python3 -c "
import re, json
s = open('manual-marca.html', encoding='utf-8').read()
for tag in ['section','div','ul']:
    o = len(re.findall(r'<'+tag+r'(?:\s[^>]*)?>', s)); c = len(re.findall(r'</'+tag+r'>', s))
    assert o==c, (tag,o,c)
m = re.search(r'<script type=\"application/json\"[^>]*>(.*?)</script>', s, re.S)
json.loads(m.group(1))
print('OK')
"
```

Esto no reemplaza la verificación visual/geométrica en vivo, solo cacha roturas de sintaxis.
