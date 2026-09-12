# Bai — Thai Immersion (web)

Aprender tailandés por inmersión a partir de vídeos de YouTube (dramas/lakorn,
BL, vlogs, música), con subtítulos interactivos. **Empezamos por la web** (el
hover del ratón para ver los cortes de palabra luce mejor y se prueba al
instante); más adelante se envuelve como app de iPhone reaprovechando el código.

## Probarla
Abre `index.html` en un navegador. Con el proyecto publicado en la web
(GitHub Pages, ver abajo) la reproducción de YouTube y las miniaturas funcionan
de verdad.

### Qué hace ahora (prototipo)
- **BaiTube**: buscador (con búsqueda "inteligente" tolerante a acentos/relleno),
  fila de canales y catálogo. Solo contenido en tailandés.
- **Pegar enlace**: pega cualquier URL de YouTube y se abre el reproductor real
  con subtítulos tailandeses activados.
- **Reproductor real** de YouTube (embed) con subtítulos TH.
- **Lectura interactiva** (sobre frases de demostración): el subtítulo se muestra
  sin espacios; al pasar el cursor / activar "แยกคำ" cada palabra se resalta en un
  color distinto; al tocar una palabra sale su ficha (pronunciación con tono,
  significado, explicación IA de ejemplo, guardar, audio TTS).
- **Tema claro/oscuro** según preferencia del sistema, con conmutador manual.

### Motor de subtítulos (backend)
`netlify/functions/subtitles.mjs` es una función serverless que, dado un ID de
vídeo, devuelve sus subtítulos tailandeses con tiempos. El front-end los segmenta
en palabras con `Intl.Segmenter('th')` y los muestra **en directo, sincronizados**
en la caja "Línea actual" (los subtítulos de YouTube quedan ocultos en el vídeo).

### Simulado / pendiente
- Diccionario real (Lexitron + Wiktionary) enriquecido con IA → significado al tocar.
- Subtítulos por IA (Whisper) con caché para vídeos sin subtítulos.
- Catálogo real vía API de datos de YouTube (solo tailandés).

## Publicar en la web (Netlify — recomendado, con backend)
La web + la función se despliegan juntas:
1. Crea una cuenta gratis en netlify.com y pulsa **Add new site → Import an existing project**.
2. Conecta **GitHub** y elige el repo `language-thai-app` (rama `main`).
3. Deja los valores por defecto (ya hay `netlify.toml`) y **Deploy**.
4. Tendrás una URL `https://<algo>.netlify.app` con reproducción real **y** el motor
   de subtítulos activo en `/.netlify/functions/subtitles`.

> GitHub Pages también sirve la web (Settings → Pages → rama `main` → `/root`),
> pero **no** ejecuta la función de subtítulos; para la sincronización real usa Netlify.
