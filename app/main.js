// BharatNumbers router and controls. Hash routes only — no network, no build
// step. Every control on every page works: metric and range switchers, the
// year and sector toggles, state search / filter / sort / CSV, the UPI range,
// the compare pickers, the sources filter and the header search.

import { SITE, STATES, SEARCH_INDEX } from "./data.js";
import {
  renderOverview, renderPeople, renderEconomy, renderDigital, renderHealth,
  renderCompare, renderSources, overviewChart, yearKpis, sectorChart,
  stateTable, stateRows, sourceRows, compareBars,
} from "./views.js";

const view = document.getElementById("view");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const searchInput = document.getElementById("site-search");
const searchResults = document.getElementById("search-results");

const state = {
  route: "#/",
  metric: "population",
  range: "all",
  year: "2024-25",
  sectorView: "share",
  upiRange: "all",
  q: "",
  region: "All",
  sortKey: "pop",
  sortDir: -1,
  compareA: "Uttar Pradesh",
  compareB: "Kerala",
  sourceQ: "",
};

const ROUTES = {
  "#/": { render: () => renderOverview(state), title: "Overview" },
  "#/people": { render: () => renderPeople(state), title: "People" },
  "#/economy": { render: () => renderEconomy(state), title: "Economy" },
  "#/digital": { render: () => renderDigital(state), title: "Digital India" },
  "#/health": { render: () => renderHealth(), title: "Health & education" },
  "#/compare": { render: () => renderCompare(state), title: "Compare" },
  "#/sources": { render: () => renderSources(state), title: "Sources & methods" },
};

function route() {
  const hash = location.hash || "#/";
  const key = ROUTES[hash] ? hash : "#/";
  state.route = key;
  view.innerHTML = ROUTES[key].render();
  document.title = `${ROUTES[key].title} — ${SITE.name}: ${SITE.tagline}`;
  for (const a of navLinks) {
    if (a.getAttribute("href") === key) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  window.scrollTo(0, 0);
}

function rerenderCompare() {
  const a = STATES.find((s) => s.name === state.compareA) || STATES[0];
  const b = STATES.find((s) => s.name === state.compareB) || STATES[1];
  route();
  void a; void b;
}

function downloadCsv() {
  const rows = STATES.filter((s) => (state.region === "All" || s.region === state.region) &&
    s.name.toLowerCase().includes(state.q.toLowerCase()));
  const head = "State,Region,Population (millions, 2024 projection),Density (per km2, Census 2011),Literacy % (NSO 2017-18),Capital\n";
  const body = rows.map((s) => `"${s.name}",${s.region},${s.pop},${s.density},${s.literacy},"${s.capital}"`).join("\n");
  const blob = new Blob([head + body + "\n"], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bharatnumbers-states.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// One delegated listener for every button on the site.
document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-wrap")) searchResults.hidden = true;
  const metricBtn = event.target.closest("[data-metric]");
  if (metricBtn) {
    state.metric = metricBtn.dataset.metric;
    route();
    return;
  }
  const rangeBtn = event.target.closest("[data-range]");
  if (rangeBtn) {
    state.range = rangeBtn.dataset.range;
    document.getElementById("metric-chart").innerHTML = overviewChart(state.metric, state.range);
    document.querySelectorAll("[data-range]").forEach((b) => b.setAttribute("aria-pressed", String(b === rangeBtn)));
    return;
  }
  const yearBtn = event.target.closest("[data-year]");
  if (yearBtn) {
    state.year = yearBtn.dataset.year;
    document.getElementById("year-kpis").innerHTML = yearKpis(state.year);
    document.querySelectorAll("[data-year]").forEach((b) => b.setAttribute("aria-pressed", String(b === yearBtn)));
    return;
  }
  const sectorBtn = event.target.closest("[data-sector-view]");
  if (sectorBtn) {
    state.sectorView = sectorBtn.dataset.sectorView;
    document.getElementById("sector-chart").innerHTML = sectorChart(state.sectorView);
    document.querySelectorAll("[data-sector-view]").forEach((b) => b.setAttribute("aria-pressed", String(b === sectorBtn)));
    return;
  }
  const upiBtn = event.target.closest("[data-upi-range]");
  if (upiBtn) {
    state.upiRange = upiBtn.dataset.upiRange;
    route();
    return;
  }
  const csvBtn = event.target.closest("[data-csv]");
  if (csvBtn) { downloadCsv(); return; }
  const sortBtn = event.target.closest("[data-sort]");
  if (sortBtn) {
    const key = sortBtn.dataset.sort;
    if (state.sortKey === key) state.sortDir = -state.sortDir;
    else { state.sortKey = key; state.sortDir = key === "name" || key === "region" ? 1 : -1; }
    document.getElementById("state-table").innerHTML = stateTable(state);
    const input = document.getElementById("state-search");
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "state-search") {
    state.q = event.target.value;
    const body = document.getElementById("state-body");
    if (body) body.innerHTML = stateRows(state);
  }
  if (event.target.id === "source-search") {
    state.sourceQ = event.target.value;
    const body = document.getElementById("source-body");
    if (body) body.innerHTML = sourceRows(state.sourceQ);
  }
  if (event.target.id === "site-search") {
    const q = event.target.value.trim().toLowerCase();
    if (q.length < 2) { searchResults.hidden = true; return; }
    const hits = SEARCH_INDEX.filter((t) => t.label.toLowerCase().includes(q)).slice(0, 6);
    if (!hits.length) {
      searchResults.innerHTML = `<a href="#/sources">No match — browse Sources &amp; methods</a>`;
    } else {
      searchResults.innerHTML = hits.map((t) => `<a href="${t.route}">${t.label}</a>`).join("");
    }
    searchResults.hidden = false;
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "region-filter") {
    state.region = event.target.value;
    document.getElementById("state-table").innerHTML = stateTable(state);
  }
  if (event.target.id === "compare-a") { state.compareA = event.target.value; rerenderCompare(); }
  if (event.target.id === "compare-b") { state.compareB = event.target.value; rerenderCompare(); }
});

window.addEventListener("hashchange", route);
route();
