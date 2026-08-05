export type Stat = {
  value: string;
  label: string;
  accent?: boolean;
};

export type ExperienceEntry = {
  id: string;
  tier: "case-study" | "archive";
  company: string;
  role: string;
  dateRange: string;
  duration: string;
  location: string;
  oneLiner: string;
  narrative?: string;
  stats?: Stat[];
  contributions?: string[];
  detail?: string[];
};

/**
 * Reverse-chronological. Filtering by tier === "case-study" preserves this
 * order (Willdom -> Mudafy -> Mercado Libre Analyst), which is the intended
 * order for the 02/WORK section. Archive renders the full list as-is.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "willdom",
    tier: "case-study",
    company: "Willdom",
    role: "Product Manager @ Wave CRM",
    dateRange: "Jul 2024 — Present",
    duration: "2 yr 2 mo",
    location: "Fort Lauderdale, FL, US",
    oneLiner:
      "Own the full roadmap for a B2B SaaS CRM, working with 11 engineers.",
    narrative:
      "Leading product strategy and delivery for Wave CRM, a B2B SaaS platform built to improve pipeline visibility, sales operations, and data-driven decision-making for distributed teams. I own the full product roadmap working with a cross-functional team of 11 engineers — from discovery to shipping features that change how commercial teams find customers, manage opportunities, and act on data.",
    stats: [
      { value: "94%", label: "WAU growth — 141 → 273", accent: true },
      { value: "24%", label: "MAU growth over 9 months" },
      { value: "80%+", label: "week-1 retention, key cohorts" },
      {
        value: "566K+",
        label: "events — 53% of platform interactions",
      },
      { value: "263", label: "unique Time Tracker users" },
      { value: "55K+", label: "sessions, 6.5 min median" },
    ],
    contributions: [
      "Shipped pipeline management: activity logs, follow-up workflows, recontact management, time-in-stage tracking",
      "Introduced dashboards, KPI widgets, and scoring systems for data-driven commercial decisions",
      "Prototyped AI-assisted capabilities and automation to surface smarter recommendations",
      "Improved role management and architecture to support multi-team, multi-org usage at scale",
    ],
  },
  {
    id: "magoya",
    tier: "archive",
    company: "Magoya",
    role: "Group Product Manager",
    dateRange: "Dec 2023 — Jul 2024",
    duration: "8 mo",
    location: "Argentina",
    oneLiner:
      "Group PM for 3 simultaneous enterprise clients in digital agriculture — Xarvio (BASF EU), Bayer US, Bayer Cono Sur.",
    detail: [
      "Xarvio (BASF EU): led discovery — 10+ farmer interviews in the US, competitive benchmarking, market research presented to Xarvio US C-level; delivered wireframes and an upsell/cross-sell strategic map.",
      "Bayer US / Climate FieldView: built internal applications on the world's largest field data platform, focused on wheat and corn.",
      "Bayer Cono Sur: led full development cycle of Cultivio and Experto Bayer, consolidating 10+ dispersed internal tools into one platform.",
    ],
  },
  {
    id: "novolabs",
    tier: "archive",
    company: "Novolabs",
    role: "Product Manager — Partner for Startups Incubators & Accelerators",
    dateRange: "Feb 2023 — Dec 2023",
    duration: "11 mo",
    location: "Comunidad Valenciana, Spain",
    oneLiner:
      "Led 2 projects end-to-end, 95% success rate, 10+ features shipped across a 40+ item backlog.",
    detail: [
      "Coordinated 10+ stakeholders across clients and project teams; tracked 20+ risks and issues.",
      "Prioritized and managed a product backlog of 40+ items aligned to customer needs and strategy.",
    ],
  },
  {
    id: "mudafy",
    tier: "case-study",
    company: "Mudafy",
    role: "Product Manager @ CRM Team",
    dateRange: "Oct 2022 — Jan 2023",
    duration: "4 mo",
    location: "Argentina",
    oneLiner:
      "YC S19 proptech — built the internal CRM behind a market with historically -40 NPS.",
    narrative:
      "PM at a YC-backed proptech with $200M in annualized transaction value and a mission to make agents 5x more efficient than the industry average — in a market where the sector's historical NPS is -40. That efficiency isn't achieved with great agents alone; it's achieved with tools that eliminate operational friction at every step.",
    stats: [
      { value: "$200M", label: "annualized transaction value", accent: true },
      { value: "50,000+", label: "active properties managed" },
      { value: "1M", label: "monthly active users" },
      { value: "50+", label: "user interviews conducted" },
    ],
    contributions: [
      "Built the internal CRM for visit and client feedback management across 50,000+ properties and 1M MAUs",
      "Developed Data Studio dashboards for real-time ops visibility, replacing manual reports",
      "Built a WhatsApp chatbot (MessageBird) to automate first contact and cut lead response time",
      "Created and tracked OKRs for 5 initiatives across IT, UX, and Sales Ops",
    ],
  },
  {
    id: "paisanos",
    tier: "archive",
    company: "Paisanos.io",
    role: "Product Manager",
    dateRange: "Jun 2022 — Nov 2022",
    duration: "6 mo",
    location: "Argentina",
    oneLiner:
      "Sole PM across 4+ simultaneous products in insurtech, retail, and gaming.",
    detail: [
      "RUS (insurtech): replaced manual broker quoting with a self-assisted flow issuing real-time policies via Nación Seguros API — 30% faster quotation in 6 months.",
      "Grido Club (retail): led discovery-to-production of a loyalty app for one of Argentina's largest ice cream chains.",
    ],
  },
  {
    id: "meli-coordinator",
    tier: "archive",
    company: "Mercado Libre",
    role: "Product Commerce Coordinator — Autoparts, Motoparts & Agro + Apparel & Sports",
    dateRange: "Nov 2021 — Apr 2022",
    duration: "6 mo",
    location: "Buenos Aires, Argentina",
    oneLiner:
      "Built the Fashion Size Guide from scratch across a vertical with 329M active listings.",
    detail: [
      "Normalized AR/US/EU sizing systems across brands, reducing incorrect-size returns in a vertical growing 40% YoY (Q1 2022).",
      "Designed automatic validation that pauses listings with incomplete data before reaching the buyer; drove adoption directly with top brands.",
      "Managed a cross-regional team across Argentina, Mexico, and Brazil; set OKRs across 3 locations.",
    ],
  },
  {
    id: "meli-analyst",
    tier: "case-study",
    company: "Mercado Libre",
    role: "Product Commerce Analyst — Autoparts, Motoparts & Agro",
    dateRange: "Sep 2018 — Oct 2021",
    duration: "3 yr 2 mo",
    location: "Greater Buenos Aires, Argentina",
    oneLiner:
      "Built compatibility, shipping, and taxonomy infrastructure for two of MELI's most technically complex verticals.",
    narrative:
      "Built foundational product infrastructure for two of MELI's most technically complex verticals over 3 years, coordinating across IT, UX, Marketing, and BI to ship initiatives with measurable impact.",
    stats: [
      { value: "329M", label: "active listings in the vertical", accent: true },
      { value: "7→1", label: "duplicate SKUs reduced per listing" },
      { value: "6%→13%", label: "LATAM auto parts market penetration" },
      { value: "38%→80%+", label: "Mercado Envíos coverage, Tires (6 mo)" },
      { value: "10K+", label: "listings migrated, Agro L1 launch" },
    ],
    contributions: [
      "Led construction of the Auto Parts compatibility system from scratch — 85% of buyers are non-specialists",
      "Designed vehicle catalog and attribute structure (brand, model, year, version, position)",
      "Took Tires' Mercado Envíos coverage from 38% to 80%+ in 6 months for the top 15 brands",
      "Launched Agro as a standalone L1 vertical: full taxonomy, 10K+ listings migrated, new technical attributes built from scratch",
    ],
  },
  {
    id: "ford",
    tier: "archive",
    company: "Ford Argentina",
    role: "Customer Success Analyst — Aftermarket",
    dateRange: "Mar 2017 — Sep 2018",
    duration: "1 yr 7 mo",
    location: "Gran Buenos Aires, Argentina",
    oneLiner:
      "Managed 4 customer segments; +20% operational efficiency, +15% satisfaction.",
    detail: [
      "Executed 10+ commercial campaigns tailored to assigned customer portfolios.",
      "Tracked and reported on 5+ special customer initiatives.",
    ],
  },
  {
    id: "meli-cx",
    tier: "archive",
    company: "Mercadolibre.com",
    role: "Customer Experience Representative Jr",
    dateRange: "Nov 2016 — Mar 2017",
    duration: "5 mo",
    location: "CABA, Argentina",
    oneLiner:
      "Mercado Envíos support across 5 LATAM carriers; NPS +10%, recontact −15%.",
    detail: [
      "Managed 100+ inbound cases monthly via Salesforce CRM.",
      "Maintained commercial contact with Servientrega (Col), OCA (Arg), OCASA (Arg), Chilexpress (Chi), DHL (Mex).",
    ],
  },
  {
    id: "frigorifico",
    tier: "archive",
    company: "Frigorífico Rioplatense S.A.I.C.I.F",
    role: "Sales Intern",
    dateRange: "Jun 2015 — Nov 2016",
    duration: "1 yr 6 mo",
    location: "Gran Buenos Aires, Argentina",
    oneLiner: "Indirect sales through distributors; managed assigned commercial portfolio.",
  },
];

export const caseStudies = experience.filter((e) => e.tier === "case-study");
export const archiveEntries = experience;
