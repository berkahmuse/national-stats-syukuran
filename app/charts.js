// BharatNumbers charts — hand-rolled SVG, no library. Every chart is drawn
// from the data in data.js and nothing is fetched.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

// Vertical bar chart. series: [{year, value}], opts: {unit, color, negative}
export function barChart(series, opts = {}) {
  const w = 720, h = 300, padL = 52, padB = 30, padT = 14, padR = 8;
  const vals = series.map((d) => d.value);
  const lo = Math.min(0, ...vals), hi = Math.max(...vals);
  const max = niceMax(Math.max(Math.abs(hi), Math.abs(lo)) || 1);
  const top = hi > 0 ? max : 0, bot = lo < 0 ? -max : 0;
  const y = (v) => padT + ((top - v) / (top - bot || 1)) * (h - padT - padB);
  const bw = (w - padL - padR) / series.length;
  let bars = "";
  for (let i = 0; i < series.length; i++) {
    const d = series[i];
    const x = padL + i * bw + 3;
    const y0 = y(Math.max(0, d.value)), y1 = y(Math.min(0, d.value));
    const fill = d.value < 0 ? "#b3402e" : (opts.color || "#c75b12");
    bars += `<rect x="${x.toFixed(1)}" y="${Math.min(y0, y1).toFixed(1)}" width="${(bw - 6).toFixed(1)}" height="${Math.max(1, Math.abs(y1 - y0)).toFixed(1)}" rx="2" fill="${fill}"><title>${esc(d.year)}: ${d.value}${opts.unit || ""}</title></rect>`;
    bars += `<text x="${(x + (bw - 6) / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5c6470">${esc(d.year)}</text>`;
  }
  const grid = [0.25, 0.5, 0.75, 1].map((f) => {
    const v = bot + (top - bot) * f;
    return `<line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${w - padR}" y2="${y(v).toFixed(1)}" stroke="#e3ddd2" stroke-width="1"/><text x="${padL - 6}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c6470">${v}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart" class="chart">${grid}${bars}<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - padR}" y2="${y(0).toFixed(1)}" stroke="#8a8478" stroke-width="1"/></svg>`;
}

// Line chart with area fill. series: [{year, value}]
export function lineChart(series, opts = {}) {
  const w = 720, h = 300, padL = 52, padB = 30, padT = 14, padR = 8;
  const vals = series.map((d) => d.value);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const span = hi - lo || 1;
  const ymin = lo - span * 0.12, ymax = hi + span * 0.12;
  const x = (i) => padL + (i / (series.length - 1)) * (w - padL - padR);
  const y = (v) => padT + ((ymax - v) / (ymax - ymin)) * (h - padT - padB);
  const pts = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  const area = `${padL},${y(ymin).toFixed(1)} ${pts} ${x(series.length - 1).toFixed(1)},${y(ymin).toFixed(1)}`;
  let dots = "", labels = "";
  for (let i = 0; i < series.length; i++) {
    const d = series[i];
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" fill="${opts.color || "#1e7a4c"}"><title>${esc(d.year)}: ${d.value}${opts.unit || ""}</title></circle>`;
    const anchor = i === 0 ? "start" : i === series.length - 1 ? "end" : "middle";
    labels += `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="${anchor}" font-size="11" fill="#5c6470">${esc(d.year)}</text>`;
  }
  const grid = [0, 0.5, 1].map((f) => {
    const v = ymin + (ymax - ymin) * f;
    return `<line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${w - padR}" y2="${y(v).toFixed(1)}" stroke="#e3ddd2" stroke-width="1"/><text x="${padL - 6}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c6470">${Math.round(v).toLocaleString("en-IN")}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" class="chart">${grid}<polygon points="${area}" fill="${opts.color || "#1e7a4c"}" opacity="0.12"/><polyline points="${pts}" fill="none" stroke="${opts.color || "#1e7a4c"}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

// Horizontal bars for shares. rows: [{name, value}]
export function hbarChart(rows, opts = {}) {
  const w = 720, rh = 44, padL = 170, padR = 64, padT = 8;
  const h = padT + rows.length * rh + 8;
  const max = niceMax(Math.max(...rows.map((r) => r.value)));
  let out = "";
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i], y = padT + i * rh;
    const bw = ((w - padL - padR) * r.value) / max;
    out += `<text x="${padL - 10}" y="${y + 22}" text-anchor="end" font-size="13" fill="#16233f">${esc(r.name)}</text>`;
    out += `<rect x="${padL}" y="${y + 8}" width="${Math.max(2, bw).toFixed(1)}" height="20" rx="3" fill="${opts.color || "#1e2a4a"}"><title>${esc(r.name)}: ${r.value}%</title></rect>`;
    out += `<text x="${(padL + Math.max(2, bw) + 8).toFixed(1)}" y="${y + 23}" font-size="13" font-weight="700" fill="#16233f">${r.value}%</text>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Horizontal bar chart" class="chart">${out}</svg>`;
}

// Age pyramid: rows [{band, m, f}] as % of total population.
export function pyramid(rows) {
  const w = 720, rh = 26, padT = 26, padB = 8, mid = 360;
  const h = padT + rows.length * rh + padB;
  const max = 5;
  let out = `<text x="${mid - 70}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#1e2a4a">Male</text><text x="${mid + 70}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#c75b12">Female</text>`;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i], y = padT + i * rh;
    const mw = (r.m / max) * 300, fw = (r.f / max) * 300;
    out += `<text x="${mid}" y="${y + 17}" text-anchor="middle" font-size="11" fill="#5c6470">${esc(r.band)}</text>`;
    out += `<rect x="${(mid - 24 - mw).toFixed(1)}" y="${y + 4}" width="${mw.toFixed(1)}" height="16" rx="2" fill="#1e2a4a"><title>${esc(r.band)} male: ${r.m}%</title></rect>`;
    out += `<rect x="${(mid + 24).toFixed(1)}" y="${y + 4}" width="${fw.toFixed(1)}" height="16" rx="2" fill="#c75b12"><title>${esc(r.band)} female: ${r.f}%</title></rect>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Age pyramid 2024" class="chart">${out}</svg>`;
}
