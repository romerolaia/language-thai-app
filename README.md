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

### Simulado todavía (siguiente fase = backend)
- Segmentación real de palabras deducida por contexto (PyThaiNLP / deepcut + IA).
- Diccionario real (Lexitron + Wiktionary) enriquecido con IA.
- Subtítulos automáticos por IA (Whisper) con caché para vídeos sin subtítulos.
- Catálogo real vía API de datos de YouTube (solo tailandés).

## Publicar en la web (GitHub Pages)
1. En GitHub → **Settings → Pages**.
2. En *Build and deployment* → *Source*: **Deploy from a branch**.
3. Elige la rama y la carpeta **/ (root)**, y guarda.
4. En un minuto tendrás una URL pública (`https://<usuario>.github.io/language-thai-app/`)
   que abre `index.html` con reproducción real, ideal para el iPhone en Safari.
