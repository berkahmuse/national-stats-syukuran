# BharatNumbers — India in figures

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/syukuran/national-stats-syukuran/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/syukuran/national-stats-syukuran/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An independent national statistics site for India — population, economy,
digital payments, health and education — with every figure sourced and
dated. Built for the [make.fun bounty “Make the best national statistics
site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

A working statistics site that runs entirely from its own files: no build
step, no network requests, on desktop and on a phone. Seven sections, all
reachable by links:

- **Overview** — the country at a glance, with a switchable chart
  (population 1950–2024, GDP growth, inflation) and a 5-year range toggle.
- **People** — age structure and the 2024 age pyramid, plus a sortable,
  searchable, filterable table of the 20 largest states, with CSV download.
- **Economy** — headline indicators by financial year, GDP by sector
  (share or value), trade, and ten years of growth and inflation.
- **Digital** — UPI, the world's largest real-time payments system, with
  a volume chart and connectivity figures.
- **Health & education** — life expectancy, mortality, fertility,
  literacy, schooling and infrastructure.
- **Compare** — pick any two states and compare them side by side, plus
  India against the world on seven measures.
- **Sources & methods** — every dataset with its publisher and year,
  filterable, with notes on financial years, rounding and units.

A header search box finds any topic on the site and jumps to its section.
Every figure names its publisher and year where it appears. Sources
include the United Nations, the IMF, the World Bank, UNDP, MoSPI, the
RBI, NPCI, TRAI and the Census of India. The site is not affiliated with
the Government of India or any publisher named here.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8083
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the vendored `vendor/makefun-frontend.ts`
library.

## License

MIT — see [LICENSE](LICENSE).
