// BharatNumbers views — one function per route. All figures come from
// data.js and name their source and year where they appear.

import {
  SITE, HEADLINE, POPULATION, GDP_GROWTH, INFLATION, YEAR_HEADLINES,
  AGE_STRUCTURE, PYRAMID_2024, STATES, SECTORS, UPI, TRADE, WORLD,
  HEALTH_EDU, DIGITAL, INFRA, SOURCES,
} from "./data.js";
import { barChart, lineChart, hbarChart, pyramid } from "./charts.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function kpiCards(items) {
  return `<div class="kpis">${items.map((k) => `<div class="kpi"><div class="k-label">${esc(k.label)}</div><div class="k-value">${esc(k.value)}</div><div class="k-sub">${esc(k.sub)}</div><div class="k-src">Source: ${esc(k.source)}</div></div>`).join("")}</div>`;
}

function hero(title, lede) {
  return `<div class="hero" style="margin:0 -20px 22px;padding-left:20px;padding-right:20px"><h1>${esc(title)}</h1><p class="lede">${esc(lede)}</p><p class="updated">Figures last checked ${esc(SITE.updated)} · ${esc(SITE.note)}</p></div>`;
}

// ---- Overview -------------------------------------------------------------
export function overviewChart(metric, range) {
  if (metric === "growth") {
    const s = range === "recent" ? GDP_GROWTH.slice(-5) : GDP_GROWTH;
    return barChart(s, { unit: "%", color: "#c75b12" });
  }
  if (metric === "inflation") {
    const s = range === "recent" ? INFLATION.slice(-5) : INFLATION;
    return barChart(s, { unit: "%", color: "#1e7a4c" });
  }
  return lineChart(POPULATION, { unit: "m", color: "#1e2a4a" });
}

export function renderOverview(state) {
  const metric = state.metric;
  const desc = {
    population: "Total population, millions. Source: United Nations, World Population Prospects 2024.",
    growth: "Real GDP growth, % year on year, financial year. Source: MoSPI, National Accounts.",
    inflation: "Consumer price inflation, % year on year, financial year. Source: MoSPI, CPI.",
  }[metric];
  return `${hero("India in figures", "The world's most populous country — 1,451 million people, the fifth-largest economy, and the fastest-growing large economy — in numbers, each with its source and year.")}
  ${kpiCards(HEADLINE)}
  <section class="card" aria-label="Chart">
    <h2>India at a glance</h2>
    <div class="controls" role="group" aria-label="Choose a series">
      <button class="btn" data-metric="population" aria-pressed="${metric === "population"}">Population</button>
      <button class="btn" data-metric="growth" aria-pressed="${metric === "growth"}">GDP growth</button>
      <button class="btn" data-metric="inflation" aria-pressed="${metric === "inflation"}">Inflation</button>
      <span style="flex:1"></span>
      <button class="btn" data-range="all" aria-pressed="${metric !== "population" && state.range === "all"}" ${metric === "population" ? "disabled" : ""}>2015-16 – 2024-25</button>
      <button class="btn" data-range="recent" aria-pressed="${metric !== "population" && state.range === "recent"}" ${metric === "population" ? "disabled" : ""}>Last 5 years</button>
    </div>
    <div id="metric-chart">${overviewChart(metric, state.range)}</div>
    <p class="src">${esc(desc)}</p>
  </section>
  <section class="card">
    <h2>India in one minute</h2>
    <ul class="fact-list">
      <li><span>Population, 2024 <span class="s">UN WPP 2024</span></span><span class="v">1,451 million — 1st in the world</span></li>
      <li><span>Median age, 2024 <span class="s">UN WPP 2024</span></span><span class="v">28.4 years</span></li>
      <li><span>Urban population, 2024 <span class="s">UN WPP 2024</span></span><span class="v">36.6%</span></li>
      <li><span>GDP, 2024 <span class="s">IMF WEO, Oct 2024</span></span><span class="v">$3.91 trillion — 5th</span></li>
      <li><span>GDP (PPP), 2024 <span class="s">IMF WEO, Oct 2024</span></span><span class="v">$14.6 trillion — 3rd</span></li>
      <li><span>UPI payments, FY 2024-25 <span class="s">NPCI</span></span><span class="v">18,587 crore transactions</span></li>
      <li><span>Human Development Index <span class="s">UNDP, 2023-24</span></span><span class="v">0.685 — rank 134</span></li>
    </ul>
    <p class="note">New here? Start with <a href="#/people">People</a> for who India is, <a href="#/economy">Economy</a> for how it earns, and <a href="#/digital">Digital</a> for the payments revolution no other large country matches.</p>
  </section>`;
}

// ---- People ---------------------------------------------------------------
export function stateRows(state) {
  let rows = STATES.filter((s) => (state.region === "All" || s.region === state.region) &&
    s.name.toLowerCase().includes(state.q.toLowerCase()));
  const key = state.sortKey, dir = state.sortDir;
  rows = [...rows].sort((a, b) => {
    const av = a[key], bv = b[key];
    return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * dir;
  });
  if (!rows.length) return `<tr><td colspan="5" class="empty">No state matches “${esc(state.q)}” in this region.</td></tr>`;
  return rows.map((s) => `<tr><td>${esc(s.name)}</td><td>${esc(s.region)}</td><td class="num">${s.pop.toFixed(1)}</td><td class="num">${s.density.toLocaleString("en-IN")}</td><td class="num">${s.literacy.toFixed(1)}%</td></tr>`).join("");
}

export function stateTable(state) {
  const arrow = (k) => state.sortKey === k ? (state.sortDir === 1 ? " ▲" : " ▼") : "";
  return `<table class="data"><thead><tr>
    <th><button data-sort="name">State${arrow("name")}</button></th>
    <th><button data-sort="region">Region${arrow("region")}</button></th>
    <th class="num"><button data-sort="pop">Population, m${arrow("pop")}</button></th>
    <th class="num"><button data-sort="density">Density /km²${arrow("density")}</button></th>
    <th class="num"><button data-sort="literacy">Literacy${arrow("literacy")}</button></th>
  </tr></thead><tbody id="state-body">${stateRows(state)}</tbody></table>`;
}

export function renderPeople(state) {
  return `${hero("People", "1,451 million people in 2024 — more than any other country — and still young: a median age of 28.4 and a quarter of the population under 15.")}
  <section class="card">
    <h2>Age structure, 2024</h2>
    ${hbarChart(AGE_STRUCTURE.map((a) => ({ name: `Aged ${a.band}`, value: a.value })), { color: "#1e2a4a" })}
    <p class="src">Share of total population, %. Source: United Nations, World Population Prospects 2024. Median age 28.4 years.</p>
    <h3>Age pyramid, 2024</h3>
    ${pyramid(PYRAMID_2024)}
    <p class="src">Each bar is the share of the whole population in that 5-year band, %. Source: UN WPP 2024; shares rounded.</p>
  </section>
  <section class="card">
    <h2>States and union territories</h2>
    <p>The 20 largest by population, 2024 projections. Uttar Pradesh alone — 241 million people — would be the world's sixth-largest country.</p>
    <div class="controls">
      <label class="field" for="state-search">Search</label>
      <input type="search" id="state-search" placeholder="State name" value="${esc(state.q)}" autocomplete="off">
      <label class="field" for="region-filter">Region</label>
      <select id="region-filter">
        ${["All", "North", "South", "East", "West", "Central", "North-East"].map((r) => `<option ${state.region === r ? "selected" : ""}>${r}</option>`).join("")}
      </select>
      <button class="btn primary" data-csv="states">Download table (CSV)</button>
    </div>
    <div id="state-table">${stateTable(state)}</div>
    <p class="src">Population: 2024 projections, Registrar General of India. Density: persons per km², Census 2011. Literacy (7+): NSO, 2017-18. Capitals are in the <a href="#/compare">compare tool</a>.</p>
  </section>`;
}

// ---- Economy --------------------------------------------------------------
export function yearKpis(year) {
  return kpiCards(YEAR_HEADLINES[year]);
}

export function sectorChart(view) {
  if (view === "value") {
    const gdp = 330.7; // ₹ lakh crore, nominal GDP FY 2024-25 (MoSPI)
    return hbarChart(SECTORS.map((s) => ({ name: s.name, value: Math.round((s.value / 100) * gdp) })), { color: "#c75b12", unit: " ₹ lakh cr" });
  }
  return hbarChart(SECTORS, { color: "#c75b12" });
}

export function renderEconomy(state) {
  return `${hero("Economy", "The fifth-largest economy at $3.91 trillion in 2024, and the fastest-growing of the world's large economies — 6.5% in FY 2024-25 after 8.2% the year before.")}
  <section class="card">
    <h2>By financial year</h2>
    <div class="controls" role="group" aria-label="Choose a financial year">
      ${Object.keys(YEAR_HEADLINES).map((y) => `<button class="btn" data-year="${y}" aria-pressed="${state.year === y}">FY ${y}</button>`).join("")}
    </div>
    <div id="year-kpis">${yearKpis(state.year)}</div>
  </section>
  <section class="card">
    <h2>What India makes</h2>
    <div class="controls" role="group" aria-label="Sector view">
      <button class="btn" data-sector-view="share" aria-pressed="${state.sectorView === "share"}">Share of GVA</button>
      <button class="btn" data-sector-view="value" aria-pressed="${state.sectorView === "value"}">Value, ₹ lakh crore</button>
    </div>
    <div id="sector-chart">${sectorChart(state.sectorView)}</div>
    <p class="src">${state.sectorView === "value" ? "Value = share × nominal GDP ₹330.7 lakh crore, FY 2024-25 (MoSPI)." : "Share of gross value added, FY 2023-24. Source: MoSPI."}</p>
    <h3>Trade, FY 2024-25</h3>
    <ul class="fact-list">
      ${TRADE.map((t) => `<li><span>${esc(t.label)} <span class="s">Ministry of Commerce and Industry</span></span><span class="v">$${t.value.toFixed(1)}bn</span></li>`).join("")}
      <li><span>Total exports (goods + services) <span class="s">Ministry of Commerce and Industry — components rounded; total as published</span></span><span class="v">$824.9bn</span></li>
    </ul>
  </section>
  <section class="card">
    <h2>Growth and prices, 2015-16 – 2024-25</h2>
    <h3>Real GDP growth, %</h3>
    ${barChart(GDP_GROWTH, { unit: "%", color: "#c75b12" })}
    <h3>Consumer inflation, %</h3>
    ${barChart(INFLATION, { unit: "%", color: "#1e7a4c" })}
    <p class="src">Financial years, April to March. Source: MoSPI, National Accounts and CPI. The 2020-21 fall of 5.8% is the pandemic year; growth rebounded to 9.7% in 2021-22.</p>
  </section>`;
}

// ---- Digital --------------------------------------------------------------
export function renderDigital(state) {
  return `${hero("Digital India", "The world's largest real-time payments system: UPI handled 18,587 crore transactions worth ₹261 lakh crore in FY 2024-25 — more than fifteen times its FY 2019-20 volume.")}
  ${kpiCards(DIGITAL.map((d) => ({ label: d.label, value: d.value, sub: "", source: d.source })))}
  <section class="card">
    <h2>UPI transactions, crore per year</h2>
    <div class="controls" role="group" aria-label="UPI range">
      <button class="btn" data-upi-range="all" aria-pressed="${state.upiRange === "all"}">FY 2019-20 – 2024-25</button>
      <button class="btn" data-upi-range="recent" aria-pressed="${state.upiRange === "recent"}">Last 3 years</button>
    </div>
    <div id="upi-chart">${barChart(state.upiRange === "recent" ? UPI.slice(-3) : UPI, { unit: " cr", color: "#1e2a4a" })}</div>
    <p class="src">Unified Payments Interface transactions, crore (10 million). Source: National Payments Corporation of India (NPCI). Value in FY 2024-25: ₹261 lakh crore.</p>
    <div class="two-col">
      <div>
        <h3>Connectivity</h3>
        <ul class="fact-list">
          <li><span>Internet subscribers <span class="s">TRAI, March 2025</span></span><span class="v">969m</span></li>
          <li><span>Telephone subscribers <span class="s">TRAI, March 2025</span></span><span class="v">1.20bn</span></li>
          <li><span>Jan Dhan bank accounts <span class="s">PMJDY, August 2025</span></span><span class="v">55.9 crore</span></li>
        </ul>
      </div>
      <div>
        <h3>Why it matters</h3>
        <p>UPI, Aadhaar and Jan Dhan accounts form India's digital public infrastructure: a person can open a bank account, prove their identity and pay a street vendor from a phone, with no card and no fee for the payer. Direct benefit transfers ride the same rails.</p>
      </div>
    </div>
  </section>`;
}

// ---- Health & education ---------------------------------------------------
export function renderHealth() {
  return `${hero("Health & education", "Life expectancy 67.7 years, infant mortality down to 25 per 1,000 births, and a literacy rate of 77.7% — with Kerala at 96.2% and Rajasthan at 69.7% showing how wide the gaps still are.")}
  <section class="card">
    <h2>Health and schooling</h2>
    <ul class="fact-list">
      ${HEALTH_EDU.map((h) => `<li><span>${esc(h.label)} <span class="s">${esc(h.source)}</span></span><span class="v">${esc(h.value)}</span></li>`).join("")}
    </ul>
    <p class="note">The fertility rate of 2.0 children per woman (UN WPP 2024, 2023) is at replacement level — India will keep growing for decades on population momentum, then level off: the UN projects a peak near 1.7 billion in the early 2060s.</p>
  </section>
  <section class="card">
    <h2>Infrastructure that carries it</h2>
    <ul class="fact-list">
      ${INFRA.map((i) => `<li><span>${esc(i.label)} <span class="s">${esc(i.source)}</span></span><span class="v">${esc(i.value)}</span></li>`).join("")}
    </ul>
  </section>`;
}

// ---- Compare --------------------------------------------------------------
export function compareBars(a, b) {
  const rows = [
    { name: "Population (m)", av: a.pop, bv: b.pop },
    { name: "Density (/km²)", av: a.density, bv: b.density },
    { name: "Literacy (%)", av: a.literacy, bv: b.literacy },
  ];
  return rows.map((r) => {
    const rowMax = Math.max(r.av, r.bv) || 1;
    const aw = (r.av / rowMax) * 100, bw = (r.bv / rowMax) * 100;
    return `<div style="margin:10px 0"><div style="font-size:13px;color:var(--muted)">${esc(r.name)}</div>
      <div style="display:flex;align-items:center;gap:8px"><span style="width:120px;text-align:right;font-size:13px">${esc(a.name)}</span><div style="flex:1;background:#eef0f4;border-radius:4px"><div style="width:${aw.toFixed(1)}%;background:#1e2a4a;height:16px;border-radius:4px"></div></div><b>${r.av.toLocaleString("en-IN")}</b></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:4px"><span style="width:120px;text-align:right;font-size:13px">${esc(b.name)}</span><div style="flex:1;background:#eef0f4;border-radius:4px"><div style="width:${bw.toFixed(1)}%;background:#c75b12;height:16px;border-radius:4px"></div></div><b>${r.bv.toLocaleString("en-IN")}</b></div></div>`;
  }).join("");
}

export function renderCompare(state) {
  const a = STATES.find((s) => s.name === state.compareA) || STATES[0];
  const b = STATES.find((s) => s.name === state.compareB) || STATES[1];
  const opts = (sel) => STATES.map((s) => `<option ${s.name === sel ? "selected" : ""}>${esc(s.name)}</option>`).join("");
  return `${hero("Compare", "Two states, side by side — and India against the world. Pick any two of the 20 largest states and see how they differ.")}
  <section class="card">
    <h2>Two states, side by side</h2>
    <div class="controls">
      <label class="field" for="compare-a">State A</label>
      <select id="compare-a">${opts(a.name)}</select>
      <label class="field" for="compare-b">State B</label>
      <select id="compare-b">${opts(b.name)}</select>
    </div>
    ${a.name === b.name ? `<p class="note">Pick two different states to compare them.</p>` : `<div id="compare-bars">${compareBars(a, b)}</div>`}
    <div class="compare-grid" style="margin-top:14px">
      <div class="compare-card a"><h3>${esc(a.name)}</h3><p>Capital: ${esc(a.capital)} · Region: ${esc(a.region)}</p><p>Population ${a.pop.toFixed(1)}m · Density ${a.density.toLocaleString("en-IN")}/km² · Literacy ${a.literacy.toFixed(1)}%</p></div>
      <div class="compare-card b"><h3>${esc(b.name)}</h3><p>Capital: ${esc(b.capital)} · Region: ${esc(b.region)}</p><p>Population ${b.pop.toFixed(1)}m · Density ${b.density.toLocaleString("en-IN")}/km² · Literacy ${b.literacy.toFixed(1)}%</p></div>
    </div>
    <p class="src">Population: 2024 projections, Registrar General of India. Density: Census 2011. Literacy (7+): NSO, 2017-18.</p>
  </section>
  <section class="card">
    <h2>India against the world, 2024</h2>
    <table class="data"><thead><tr><th>Measure</th><th>India</th><th>Rest of the world</th><th>Source</th></tr></thead>
    <tbody>${WORLD.map((w) => `<tr><td>${esc(w.measure)}</td><td><b>${esc(w.india)}</b></td><td>${esc(w.world)}</td><td>${esc(w.source)}</td></tr>`).join("")}</tbody></table>
  </section>`;
}

// ---- Sources --------------------------------------------------------------
export function sourceRows(q) {
  const rows = SOURCES.filter((s) => !q ||
    (s.dataset + s.publisher + s.covers).toLowerCase().includes(q.toLowerCase()));
  if (!rows.length) return `<tr><td colspan="4" class="empty">No source matches “${esc(q)}”.</td></tr>`;
  return rows.map((s) => `<tr><td>${esc(s.dataset)}</td><td>${esc(s.publisher)}</td><td>${esc(s.year)}</td><td>${esc(s.covers)}</td></tr>`).join("");
}

export function renderSources(state) {
  return `${hero("Sources & methods", "Every figure on this site names its publisher and year where it appears. This page lists every dataset behind it, so any number can be checked at its source.")}
  <section class="card">
    <h2>All datasets</h2>
    <div class="controls">
      <label class="field" for="source-search">Filter sources</label>
      <input type="search" id="source-search" placeholder="Try “MoSPI” or “Digital”" value="${esc(state.sourceQ)}" autocomplete="off">
    </div>
    <table class="data"><thead><tr><th>Dataset</th><th>Publisher</th><th>Year</th><th>Covers</th></tr></thead>
    <tbody id="source-body">${sourceRows(state.sourceQ)}</tbody></table>
    <h3>Methods and notes</h3>
    <p><b>Financial years</b> run April to March and are written “2024-25”. Calendar years are written as the year alone.</p>
    <p><b>Population</b> figures are the United Nations World Population Prospects 2024 medium variant, except state populations, which are the Registrar General of India's 2024 projections.</p>
    <p><b>Rounding:</b> shares are rounded to one decimal place and may not sum to exactly 100. State populations are rounded to 0.1 million.</p>
    <p><b>Crore and lakh:</b> 1 crore = 10 million; 1 lakh = 100,000; 1 lakh crore = 1 trillion rupees.</p>
    <p><b>What this site is not:</b> an official publication. It is an independent compilation of published official statistics, made for people looking up India's numbers.</p>
  </section>`;
}
