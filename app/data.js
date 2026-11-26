// BharatNumbers — the numbers behind India.
// Every figure names its publisher and year where it is shown. Figures are
// as published by the source named beside them. Financial-year figures (FY)
// run April to March; calendar-year figures are marked with the year alone.
// Population figures are the United Nations World Population Prospects 2024
// medium variant unless another publisher is named.

export const SITE = {
  name: "BharatNumbers",
  tagline: "India in figures",
  country: "India",
  updated: "26 November 2026",
  note: "An independent statistics site. Not affiliated with the Government of India, the United Nations or any publisher named here.",
};

export const HEADLINE = [
  { label: "Population", value: "1,451m", sub: "largest in the world since 2023", source: "UN WPP 2024" },
  { label: "GDP", value: "$3.91tn", sub: "5th largest economy", source: "IMF WEO, Oct 2024" },
  { label: "GDP per capita", value: "$2,698", sub: "current US$, 2024", source: "IMF WEO, Oct 2024" },
  { label: "Real GDP growth", value: "6.5%", sub: "FY 2024-25", source: "MoSPI, 2025" },
  { label: "Consumer inflation", value: "4.6%", sub: "CPI, FY 2024-25", source: "MoSPI, 2025" },
  { label: "Life expectancy", value: "67.7 yrs", sub: "at birth", source: "World Bank WDI, 2023" },
];

// Population, millions. UN World Population Prospects 2024.
export const POPULATION = [
  { year: 1950, value: 362 }, { year: 1960, value: 445 }, { year: 1970, value: 555 },
  { year: 1980, value: 700 }, { year: 1990, value: 871 }, { year: 2000, value: 1058 },
  { year: 2010, value: 1234 }, { year: 2015, value: 1327 }, { year: 2020, value: 1396 },
  { year: 2024, value: 1451 },
];

// Real GDP growth, % year on year, financial year. Ministry of Statistics and
// Programme Implementation (MoSPI), National Accounts.
export const GDP_GROWTH = [
  { year: "2015-16", value: 8.0 }, { year: "2016-17", value: 8.3 }, { year: "2017-18", value: 6.8 },
  { year: "2018-19", value: 6.5 }, { year: "2019-20", value: 3.9 }, { year: "2020-21", value: -5.8 },
  { year: "2021-22", value: 9.7 }, { year: "2022-23", value: 7.0 }, { year: "2023-24", value: 8.2 },
  { year: "2024-25", value: 6.5 },
];

// CPI inflation, % year on year, financial year. MoSPI.
export const INFLATION = [
  { year: "2015-16", value: 4.9 }, { year: "2016-17", value: 4.5 }, { year: "2017-18", value: 3.6 },
  { year: "2018-19", value: 3.4 }, { year: "2019-20", value: 4.8 }, { year: "2020-21", value: 6.2 },
  { year: "2021-22", value: 5.5 }, { year: "2022-23", value: 6.7 }, { year: "2023-24", value: 5.4 },
  { year: "2024-25", value: 4.6 },
];

// Headline indicators by financial year.
export const YEAR_HEADLINES = {
  "2022-23": [
    { label: "Real GDP growth", value: "7.0%", sub: "year on year", source: "MoSPI, 2022-23" },
    { label: "CPI inflation", value: "6.7%", sub: "year on year", source: "MoSPI, 2022-23" },
    { label: "Nominal GDP", value: "₹269.5 lakh cr", sub: "current prices", source: "MoSPI, 2022-23" },
    { label: "Unemployment", value: "3.2%", sub: "15+, usual status", source: "PLFS, 2022-23" },
    { label: "Merchandise exports", value: "$451.1bn", sub: "goods", source: "Min. of Commerce, 2022-23" },
    { label: "Forex reserves", value: "$578.4bn", sub: "end-March 2023", source: "RBI, 2023" },
  ],
  "2023-24": [
    { label: "Real GDP growth", value: "8.2%", sub: "year on year", source: "MoSPI, 2023-24" },
    { label: "CPI inflation", value: "5.4%", sub: "year on year", source: "MoSPI, 2023-24" },
    { label: "Nominal GDP", value: "₹295.4 lakh cr", sub: "current prices", source: "MoSPI, 2023-24" },
    { label: "Unemployment", value: "3.2%", sub: "15+, usual status", source: "PLFS, 2023-24" },
    { label: "Merchandise exports", value: "$437.1bn", sub: "goods", source: "Min. of Commerce, 2023-24" },
    { label: "Forex reserves", value: "$646.4bn", sub: "end-March 2024", source: "RBI, 2024" },
  ],
  "2024-25": [
    { label: "Real GDP growth", value: "6.5%", sub: "year on year", source: "MoSPI, 2024-25" },
    { label: "CPI inflation", value: "4.6%", sub: "year on year", source: "MoSPI, 2024-25" },
    { label: "Nominal GDP", value: "₹330.7 lakh cr", sub: "current prices", source: "MoSPI, 2024-25" },
    { label: "Unemployment", value: "3.2%", sub: "15+, usual status", source: "PLFS, 2023-24" },
    { label: "Merchandise exports", value: "$437.4bn", sub: "goods", source: "Min. of Commerce, 2024-25" },
    { label: "Forex reserves", value: "$665.4bn", sub: "end-March 2025", source: "RBI, 2025" },
  ],
};

// Age structure, 2024, % of population. UN WPP 2024.
export const AGE_STRUCTURE = [
  { band: "0-14", value: 25.3 }, { band: "15-64", value: 67.8 }, { band: "65+", value: 6.9 },
];

// Age pyramid, 2024: share of total population in each 5-year band, %.
// UN WPP 2024; bands are scaled to the same source as AGE_STRUCTURE, so
// they sum to 100.0 and group to 0-14 = 25.3, 15-64 = 67.8, 65+ = 6.9.
export const PYRAMID_2024 = [
  { band: "0-4", m: 4.2, f: 3.9 }, { band: "5-9", m: 4.4, f: 4.1 }, { band: "10-14", m: 4.5, f: 4.2 },
  { band: "15-19", m: 4.9, f: 4.4 }, { band: "20-24", m: 4.7, f: 4.3 }, { band: "25-29", m: 4.5, f: 4.2 },
  { band: "30-34", m: 4.1, f: 3.9 }, { band: "35-39", m: 3.8, f: 3.6 }, { band: "40-44", m: 3.4, f: 3.1 },
  { band: "45-49", m: 2.9, f: 2.8 }, { band: "50-54", m: 2.6, f: 2.5 }, { band: "55-59", m: 2.2, f: 2.2 },
  { band: "60-64", m: 1.8, f: 1.9 }, { band: "65-69", m: 1.2, f: 1.3 }, { band: "70-74", m: 0.9, f: 0.9 },
  { band: "75-79", m: 0.5, f: 0.7 }, { band: "80+", m: 0.4, f: 1.0 },
];

// States and union territories with the largest populations. Population is the
// 2024 projection (Registrar General of India / Census projections); density
// is persons per km² at Census 2011; literacy is the 7+ rate, NSO 2017-18.
export const STATES = [
  { name: "Uttar Pradesh", region: "North", pop: 240.9, density: 828, literacy: 73.0, capital: "Lucknow" },
  { name: "Bihar", region: "East", pop: 129.7, density: 1106, literacy: 70.9, capital: "Patna" },
  { name: "Maharashtra", region: "West", pop: 128.5, density: 365, literacy: 84.8, capital: "Mumbai" },
  { name: "West Bengal", region: "East", pop: 101.8, density: 1029, literacy: 80.5, capital: "Kolkata" },
  { name: "Madhya Pradesh", region: "Central", pop: 87.7, density: 236, literacy: 70.6, capital: "Bhopal" },
  { name: "Rajasthan", region: "North", pop: 82.5, density: 201, literacy: 69.7, capital: "Jaipur" },
  { name: "Tamil Nadu", region: "South", pop: 79.3, density: 555, literacy: 82.9, capital: "Chennai" },
  { name: "Gujarat", region: "West", pop: 71.6, density: 308, literacy: 82.4, capital: "Gandhinagar" },
  { name: "Karnataka", region: "South", pop: 69.2, density: 319, literacy: 77.2, capital: "Bengaluru" },
  { name: "Andhra Pradesh", region: "South", pop: 53.5, density: 304, literacy: 73.4, capital: "Amaravati" },
  { name: "Odisha", region: "East", pop: 47.2, density: 269, literacy: 77.3, capital: "Bhubaneswar" },
  { name: "Jharkhand", region: "East", pop: 40.1, density: 414, literacy: 74.3, capital: "Ranchi" },
  { name: "Telangana", region: "South", pop: 39.2, density: 312, literacy: 72.8, capital: "Hyderabad" },
  { name: "Kerala", region: "South", pop: 35.8, density: 859, literacy: 96.2, capital: "Thiruvananthapuram" },
  { name: "Assam", region: "North-East", pop: 35.6, density: 398, literacy: 85.9, capital: "Dispur" },
  { name: "Punjab", region: "North", pop: 30.9, density: 551, literacy: 83.7, capital: "Chandigarh" },
  { name: "Haryana", region: "North", pop: 29.8, density: 573, literacy: 80.4, capital: "Chandigarh" },
  { name: "Chhattisgarh", region: "Central", pop: 29.6, density: 189, literacy: 77.3, capital: "Raipur" },
  { name: "Delhi", region: "North", pop: 22.4, density: 11320, literacy: 88.7, capital: "New Delhi" },
  { name: "Jammu & Kashmir", region: "North", pop: 14.0, density: 56, literacy: 77.3, capital: "Srinagar" },
];

// GVA shares, FY 2023-24. MoSPI.
export const SECTORS = [
  { name: "Services", value: 54.5 },
  { name: "Industry", value: 27.3 },
  { name: "Agriculture & allied", value: 18.2 },
];

// UPI transactions, crore (10 million) per financial year. NPCI.
export const UPI = [
  { year: "2019-20", value: 1252 }, { year: "2020-21", value: 2232 }, { year: "2021-22", value: 4597 },
  { year: "2022-23", value: 8376 }, { year: "2023-24", value: 13116 }, { year: "2024-25", value: 18587 },
];

// Trade, FY 2024-25, US$ billion. Ministry of Commerce and Industry.
export const TRADE = [
  { label: "Merchandise exports", value: 437.4 },
  { label: "Services exports", value: 387.6 },
  { label: "Merchandise imports", value: 720.2 },
  { label: "Services imports", value: 195.9 },
];

// India against the world, 2024.
export const WORLD = [
  { measure: "Population", india: "1,451m — 1st", world: "China 1,419m — 2nd", source: "UN WPP 2024" },
  { measure: "GDP, nominal", india: "$3.91tn — 5th", world: "US $29.2tn — 1st", source: "IMF WEO, Oct 2024" },
  { measure: "GDP, PPP", india: "$14.6tn — 3rd", world: "China $38.2tn — 1st", source: "IMF WEO, Oct 2024" },
  { measure: "Real GDP growth", india: "6.5% — fastest of the G20's large economies", world: "World 3.2%", source: "IMF WEO, Oct 2024" },
  { measure: "Median age", india: "28.4 years", world: "World 30.4 years", source: "UN WPP 2024" },
  { measure: "Life expectancy", india: "67.7 years", world: "World 71.4 years", source: "World Bank WDI, 2023" },
  { measure: "Human Development Index", india: "0.685 — rank 134", world: "World 0.739", source: "UNDP, 2023-24" },
];

// Health and education, each with publisher and year.
export const HEALTH_EDU = [
  { label: "Life expectancy at birth", value: "67.7 years", source: "World Bank WDI, 2023" },
  { label: "Infant mortality", value: "25 per 1,000 live births", source: "Sample Registration System, 2022" },
  { label: "Maternal mortality", value: "93 per 100,000 live births", source: "Sample Registration System, 2019-21" },
  { label: "Total fertility rate", value: "2.0 children per woman", source: "UN WPP 2024 (2023)" },
  { label: "Sex ratio", value: "1,020 females per 1,000 males", source: "NFHS-5, 2019-21" },
  { label: "Multidimensional poverty", value: "11.3% of people", source: "NITI Aayog MPI, 2022-23" },
  { label: "Literacy rate (7+)", value: "77.7%", source: "NSO, 2017-18" },
  { label: "Higher-education enrolment (GER)", value: "28.4%", source: "AISHE, 2021-22" },
  { label: "Schools", value: "14.7 lakh", source: "UDISE+, 2023-24" },
  { label: "School enrolment", value: "24.8 crore children", source: "UDISE+, 2023-24" },
];

// Digital India.
export const DIGITAL = [
  { label: "Internet subscribers", value: "969m", source: "TRAI, March 2025" },
  { label: "Telephone subscribers", value: "1.20bn", source: "TRAI, March 2025" },
  { label: "UPI transactions, FY 2024-25", value: "18,587 crore", source: "NPCI, 2024-25" },
  { label: "UPI value, FY 2024-25", value: "₹261 lakh crore", source: "NPCI, 2024-25" },
  { label: "Jan Dhan bank accounts", value: "55.9 crore", source: "PMJDY, August 2025" },
];

// Infrastructure.
export const INFRA = [
  { label: "National highway length", value: "146,195 km", source: "MoRTH, 2024" },
  { label: "Railway route length", value: "68,584 km", source: "Indian Railways, 2023-24" },
  { label: "Installed power capacity", value: "476 GW", source: "Central Electricity Authority, June 2025" },
  { label: "Non-fossil share of capacity", value: "50.8%", source: "Central Electricity Authority, June 2025" },
  { label: "General govt. gross debt", value: "81.6% of GDP", source: "IMF WEO, Oct 2024" },
  { label: "Forex reserves", value: "$665.4bn", source: "RBI, end-March 2025" },
];

// Sources page: every dataset, its publisher, year and what it covers.
export const SOURCES = [
  { dataset: "Population, age structure, median age, urban share", publisher: "United Nations, World Population Prospects 2024", year: "2024", covers: "People" },
  { dataset: "GDP, GDP per capita, PPP, government debt, world growth", publisher: "IMF World Economic Outlook", year: "Oct 2024", covers: "Economy" },
  { dataset: "National accounts: GDP growth, GVA shares, nominal GDP", publisher: "Ministry of Statistics and Programme Implementation (MoSPI)", year: "FY 2015-16 to 2024-25", covers: "Economy" },
  { dataset: "Consumer price inflation", publisher: "MoSPI, Consumer Price Index", year: "FY 2015-16 to 2024-25", covers: "Economy" },
  { dataset: "Labour force and unemployment", publisher: "Periodic Labour Force Survey (PLFS)", year: "2022-23 / 2023-24", covers: "Work" },
  { dataset: "State populations (projections)", publisher: "Registrar General of India, Census projections", year: "2024", covers: "People" },
  { dataset: "State density", publisher: "Census of India 2011", year: "2011", covers: "People" },
  { dataset: "Literacy rates", publisher: "National Statistical Office (NSO)", year: "2017-18", covers: "Education" },
  { dataset: "Life expectancy", publisher: "World Bank, World Development Indicators", year: "2023", covers: "Health" },
  { dataset: "Infant and maternal mortality", publisher: "Sample Registration System (SRS)", year: "2019-22", covers: "Health" },
  { dataset: "Fertility rate", publisher: "United Nations, World Population Prospects 2024", year: "2023", covers: "Health" },
  { dataset: "Sex ratio", publisher: "National Family Health Survey (NFHS-5)", year: "2019-21", covers: "Health" },
  { dataset: "Multidimensional poverty", publisher: "NITI Aayog, National MPI", year: "2022-23", covers: "Health" },
  { dataset: "Human Development Index", publisher: "UNDP, Human Development Report", year: "2023-24", covers: "Health" },
  { dataset: "School enrolment and schools", publisher: "UDISE+", year: "2023-24", covers: "Education" },
  { dataset: "Higher-education enrolment", publisher: "All India Survey on Higher Education (AISHE)", year: "2021-22", covers: "Education" },
  { dataset: "UPI transactions and value", publisher: "National Payments Corporation of India (NPCI)", year: "FY 2019-20 to 2024-25", covers: "Digital" },
  { dataset: "Internet and telephone subscribers", publisher: "Telecom Regulatory Authority of India (TRAI)", year: "March 2025", covers: "Digital" },
  { dataset: "Jan Dhan accounts", publisher: "Pradhan Mantri Jan Dhan Yojana (PMJDY)", year: "August 2025", covers: "Digital" },
  { dataset: "Trade: exports and imports", publisher: "Ministry of Commerce and Industry", year: "FY 2022-23 to 2024-25", covers: "Economy" },
  { dataset: "Foreign exchange reserves", publisher: "Reserve Bank of India (RBI)", year: "March 2023-25", covers: "Economy" },
  { dataset: "National highways", publisher: "Ministry of Road Transport and Highways (MoRTH)", year: "2024", covers: "Infrastructure" },
  { dataset: "Railways", publisher: "Indian Railways", year: "2023-24", covers: "Infrastructure" },
  { dataset: "Power capacity", publisher: "Central Electricity Authority (CEA)", year: "June 2025", covers: "Infrastructure" },
];

// Header search index: topic -> route.
export const SEARCH_INDEX = [
  { label: "Population trend 1950-2024", route: "#/" },
  { label: "GDP growth by year", route: "#/economy" },
  { label: "Inflation (CPI)", route: "#/economy" },
  { label: "Age pyramid 2024", route: "#/people" },
  { label: "States by population", route: "#/people" },
  { label: "Compare two states", route: "#/compare" },
  { label: "UPI digital payments", route: "#/digital" },
  { label: "Internet subscribers", route: "#/digital" },
  { label: "Life expectancy", route: "#/health" },
  { label: "Infant mortality", route: "#/health" },
  { label: "Literacy and schools", route: "#/health" },
  { label: "India vs the world", route: "#/compare" },
  { label: "Exports and imports", route: "#/economy" },
  { label: "Forex reserves", route: "#/economy" },
  { label: "Sources and methods", route: "#/sources" },
];
