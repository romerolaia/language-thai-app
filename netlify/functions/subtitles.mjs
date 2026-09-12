// Motor de subtítulos de Bai.
// Dado un ID de vídeo de YouTube (?v=XXXXXXXXXXX) devuelve sus subtítulos
// tailandeses con tiempos: { ok, lang, auto, count, lines:[{start,dur,text}] }.
// La segmentación en palabras se hace en el navegador (Intl.Segmenter 'th').
//
// Nota honesta: YouTube a veces bloquea peticiones desde servidores o cambia el
// formato de la página; por eso hay dos intentos (página watch + API timedtext)
// y errores claros. Si un vídeo no tiene subtítulos tailandeses, ok=false.

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400"
};
const json = (obj) => ({ statusCode: 200, headers: CORS, body: JSON.stringify(obj) });

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  const v = (event.queryStringParameters && event.queryStringParameters.v) || "";
  if (!/^[A-Za-z0-9_-]{11}$/.test(v))
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ ok: false, reason: "bad_id" }) };

  try {
    const tracks = await getTracks(v);
    if (!tracks.length) return json({ ok: false, reason: "no_captions" });

    // Preferir tailandés manual → tailandés automático → cualquiera.
    const pick =
      tracks.find(t => t.lang === "th" && t.kind !== "asr") ||
      tracks.find(t => t.lang === "th") ||
      tracks.find(t => t.lang.startsWith("th")) ||
      tracks[0];

    const lines = await getLines(pick.baseUrl);
    if (!lines.length) return json({ ok: false, reason: "empty_track" });

    return json({
      ok: true,
      lang: pick.lang,
      auto: pick.kind === "asr",
      count: lines.length,
      lines
    });
  } catch (e) {
    return json({ ok: false, reason: "error", detail: String((e && e.message) || e) });
  }
};

// Extrae la lista de pistas de subtítulos de la página del vídeo.
async function getTracks(v) {
  const r = await fetch("https://www.youtube.com/watch?v=" + v + "&hl=th&bpctr=9999999999", {
    headers: { "User-Agent": UA, "Accept-Language": "th,en;q=0.8" }
  });
  const html = await r.text();
  const m = html.match(/"captionTracks":(\[.*?\])/);
  if (!m) return [];
  let arr;
  try { arr = JSON.parse(m[1].replace(/\\u0026/g, "&")); } catch { return []; }
  return (arr || [])
    .filter(t => t && t.baseUrl)
    .map(t => ({
      baseUrl: t.baseUrl.replace(/\\u0026/g, "&"),
      lang: (t.languageCode || "").toLowerCase(),
      kind: t.kind || ""
    }));
}

// Descarga una pista y la convierte en líneas {start, dur, text}.
async function getLines(baseUrl) {
  const url = baseUrl + (baseUrl.includes("fmt=") ? "" : "&fmt=json3");
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const out = [];
  for (const ev of (j.events || [])) {
    if (!ev.segs) continue;
    const text = ev.segs.map(s => s.utf8 || "").join("").replace(/\s+/g, " ").trim();
    if (!text) continue;
    out.push({
      start: Math.round((ev.tStartMs || 0)) / 1000,
      dur: Math.round((ev.dDurationMs || 0)) / 1000,
      text
    });
  }
  return out;
}
