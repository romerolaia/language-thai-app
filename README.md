# Bai — Thai Immersion (prototipo)

Aprender tailandés por inmersión a partir de vídeos de YouTube (dramas/lakorn, BL,
vlogs), con subtítulos interactivos. Enfocada a iPhone, usable también en web.

## Estado
Prototipo de la **función estrella**: subtítulo tailandés escrito sin espacios
(como se lee de verdad) donde puedes:

- **Pasar el cursor / activar "แยกคำ"** → cada palabra se resalta en un color
  distinto, así ves los límites de palabra sin romper la lectura natural.
- **Tocar una palabra** → ficha con pronunciación (con tono), categoría,
  significado, "explícamelo en contexto" (IA) y guardar en tu vocabulario.
- Escuchar la palabra (text-to-speech), navegar entre líneas, ver/ocultar la
  traducción.

Abre `prototype/index.html` en el navegador (o en el móvil) para probarlo.

## Próximos pasos (ver conversación)
- Segmentación real de palabras (PyThaiNLP / deepcut) en lugar de datos fijos.
- Diccionario con fuentes libres (Lexitron + Wiktionary) enriquecido con IA.
- Catálogo de vídeos vía **embed** oficial de YouTube (nunca descarga/rehospedaje).
- App iOS + web con base compartida (Expo / React Native + react-native-web).
