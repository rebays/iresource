import Link from "next/link";
import Image from "next/image";
import TraditionalWatermark from "../components/traditional-watermark";

/* ------------------------------------------------------------------ */
/*  Config — the ONLY thing that differs between the two systems.      */
/*  Markup below is identical for both; colours and fonts resolve      */
/*  from the `data-theme` wrapper via tokens in globals.css.           */
/* ------------------------------------------------------------------ */

export type Swatch = {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  /** border the chip when the fill is very light */
  ring?: boolean;
  /** text colour rendered on top of the swatch for contrast */
  on?: "light" | "dark";
};

export type ShowcaseConfig = {
  themeKey: "classic";
  name: string;
  tagline: string;
  chips: string[];
  colorIntro: string;
  typographyIntro: string;
  principles: string[];
  fonts: { display: string; body: string; mono: string };
  neutrals: Swatch[];
  brand: Swatch[];
  semantic: Swatch[];
  typeSpecs: Record<
    "display" | "h1" | "h2" | "h3" | "lead" | "body" | "small" | "eyebrow",
    string
  >;
  deep: string;
};

/* ------------------------------------------------------------------ */
/*  Static scales — shared, identical across both systems             */
/* ------------------------------------------------------------------ */

const spacing = [
  ["1", "4"], ["2", "8"], ["3", "12"], ["4", "16"], ["5", "20"],
  ["6", "24"], ["8", "32"], ["10", "40"], ["12", "48"], ["16", "64"], ["24", "96"],
];

const radii = [
  { name: "sm", cls: "rounded-sm", px: "2px" },
  { name: "md", cls: "rounded-md", px: "6px" },
  { name: "lg", cls: "rounded-lg", px: "8px" },
  { name: "xl", cls: "rounded-xl", px: "12px" },
  { name: "2xl", cls: "rounded-2xl", px: "16px" },
  { name: "full", cls: "rounded-full", px: "∞" },
];

const elevation = [
  { name: "shadow-sm", cls: "shadow-sm", note: "Resting cards" },
  { name: "shadow-md", cls: "shadow-md", note: "Hover lift" },
  { name: "shadow-lg", cls: "shadow-lg", note: "Popovers" },
  { name: "shadow-xl", cls: "shadow-xl", note: "Card hover, modals" },
];

const breakpoints = [
  { prefix: "–", range: "0–639px", label: "mobile (primary)" },
  { prefix: "sm:", range: "640–767px", label: "large phone" },
  { prefix: "md:", range: "768–1023px", label: "tablet" },
  { prefix: "lg:", range: "1024–1279px", label: "desktop" },
  { prefix: "xl:", range: "1280px +", label: "wide" },
];

const anchors = [
  ["colors", "Colors"],
  ["typography", "Typography"],
  ["foundations", "Foundations"],
  ["components", "Components"],
  ["iconography", "Iconography"],
  ["accessibility", "Accessibility"],
] as const;

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="mx-auto w-full max-w-8xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/70">
      {children}
    </h3>
  );
}

function SwatchCard({ s }: { s: Swatch }) {
  const textColor = s.on === "dark" ? "text-foreground" : "text-white";
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div
        className={`flex h-24 items-end p-3 ${s.ring ? "ring-1 ring-inset ring-border" : ""}`}
        style={{ backgroundColor: s.hex }}
      >
        <span className={`font-serif text-lg ${textColor}`}>{s.name}</span>
      </div>
      <div className="space-y-1 p-3">
        <p className="font-mono text-xs uppercase text-foreground">{s.hex}</p>
        <p className="font-mono text-[11px] text-muted">{s.rgb}</p>
        <p className="pt-1 text-[13px] leading-snug text-muted">{s.usage}</p>
      </div>
    </div>
  );
}

function Btn({
  variant = "primary",
  size = "md",
  children,
  disabled,
}: {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
  }[size];
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    secondary: "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
    ghost: "text-primary hover:bg-surface-2",
    accent: "bg-accent text-accent-foreground hover:brightness-95",
  }[variant];
  return (
    <button type="button" disabled={disabled} className={`${base} ${sizes} ${variants}`}>
      {children}
    </button>
  );
}

function Badge({
  tone = "primary",
  children,
}: {
  tone?: "primary" | "accent" | "success" | "warning" | "error" | "neutral";
  children: React.ReactNode;
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-[color:var(--accent-ink)]",
    success: "bg-success/12 text-success",
    warning: "bg-warning/12 text-warning",
    error: "bg-error/12 text-error",
    neutral: "bg-surface-2 text-muted",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones}`}>
      {children}
    </span>
  );
}

/* Icons — line only, 1.5px stroke, 24px grid, round caps */
const Ic = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  document: "M7 3h7l4 4v14H7V3ZM14 3v4h4M9.5 13h5M9.5 16.5h5",
  report: "M5 21V5a2 2 0 0 1 2-2h7l5 5v13H5ZM8 14v3M12 11v6M16 13v4",
  video: "M4 6h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4V6ZM17 10l4-2v8l-4-2",
  book: "M5 4h9a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4ZM16 6v14",
  graduation: "M12 4 2 9l10 5 10-5-10-5ZM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  download: "M12 4v11M8 11l4 4 4-4M5 20h14",
  external: "M14 5h5v5M19 5l-8 8M18 14v5H5V6h5",
  calendar: "M4 6h16v14H4V6ZM8 3v4M16 3v4M4 10h16",
  mail: "M4 6h16v12H4V6ZM4 7l8 6 8-6",
  phone: "M6 3l3 1 1 4-2 2a11 11 0 0 0 5 5l2-2 4 1 1 3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 1-2Z",
  filter: "M4 5h16l-6 7v6l-4 2v-8L4 5Z",
  chevron: "M9 6l6 6-6 6",
  check: "M5 12l4 4 10-10",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  arrow: "M5 12h14M13 6l6 6-6 6",
  star: "M12 4l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8L12 4Z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.4 3.5 5.6 3.5 9s-1 6.6-3.5 9c-2.5-2.4-3.5-5.6-3.5-9S9.5 5.4 12 3Z",
  bookmark: "M6 3h12v18l-6-4-6 4V3Z",
  share: "M7 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM22 6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM22 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM7 12l10-5.5M7 12l10 5.5",
  print: "M7 8V3h10v5M7 18H5v-6h14v6h-2M8 14h8v6H8v-6Z",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v6M12 7.5v.5",
};

function Icon({ path, className = "" }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  The showcase — identical markup for every theme                   */
/* ------------------------------------------------------------------ */

export default function SystemShowcase({ config }: { config: ShowcaseConfig }) {
  const typeRows = [
    { label: "Display / Hero", spec: config.typeSpecs.display, cls: "font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl", sample: "Building a brighter future through learning." },
    { label: "H1", spec: config.typeSpecs.h1, cls: "font-serif text-4xl leading-tight tracking-tight sm:text-5xl", sample: "Find what you need, by category." },
    { label: "H2", spec: config.typeSpecs.h2, cls: "font-serif text-3xl leading-tight", sample: "Reports & data across the sector" },
    { label: "H3", spec: config.typeSpecs.h3, cls: "font-serif text-xl", sample: "National Education Action Plan 2022–2026" },
    { label: "Lead", spec: config.typeSpecs.lead, cls: "text-lg leading-8 text-muted", sample: "The central hub for policies, reports, videos, and learning resources from the Ministry of Education." },
    { label: "Body", spec: config.typeSpecs.body, cls: "text-[15px] leading-relaxed text-muted", sample: "Every document on the hub is published by the Ministry. We record the source office, publication date, and file format so you always know what you are reading." },
    { label: "Small", spec: config.typeSpecs.small, cls: "text-[13px] leading-5 text-muted", sample: "Published 3 days ago · PDF · 2.4 MB" },
    { label: "Eyebrow", spec: config.typeSpecs.eyebrow, cls: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", sample: "Browse the hub" },
  ];

  return (
    <div data-theme={config.themeKey} className="flex flex-1 flex-col bg-background">
      {/* ---------- Sticky header ---------- */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/coa-si.webp"
              alt="Solomon Islands coat of arms"
              width={36}
              height={36}
              className="h-9 w-auto shrink-0"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">iResource</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                Design System · {config.name}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
              {anchors.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="hover:text-primary">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ---------- Intro ---------- */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <TraditionalWatermark id={`wm-ds-${config.themeKey}`} corners={["top-right", "bottom-left"]} />
        <div className="mx-auto w-full max-w-8xl px-6 py-20 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            iResource · {config.name} system
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Design System
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{config.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {config.chips.map((c) => (
              <Badge key={c} tone="neutral">{c}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Colors ---------- */}
      <Section
        id="colors"
        eyebrow="Foundations"
        title="Color system"
        intro={config.colorIntro}
      >
        <SubHead>Neutrals</SubHead>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {config.neutrals.map((s) => (
            <SwatchCard key={s.name} s={s} />
          ))}
        </div>

        <div className="mt-12">
          <SubHead>Brand</SubHead>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {config.brand.map((s) => (
              <SwatchCard key={s.name} s={s} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Semantic</SubHead>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {config.semantic.map((s) => (
              <SwatchCard key={s.name} s={s} />
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Typography ---------- */}
      <Section
        id="typography"
        eyebrow="Foundations"
        title="Typography"
        intro={config.typographyIntro}
      >
        <div className="divide-y divide-border rounded-2xl border border-border">
          {typeRows.map((t) => (
            <div key={t.label} className="grid gap-3 p-6 sm:grid-cols-[180px_1fr] sm:gap-8">
              <div className="shrink-0">
                <p className="text-sm font-semibold text-foreground">{t.label}</p>
                <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">{t.spec}</p>
              </div>
              <p className={t.cls}>{t.sample}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <SubHead>Pairing principles</SubHead>
          <ul className="grid gap-2 text-[15px] leading-relaxed text-muted sm:grid-cols-2">
            {config.principles.map((p) => (
              <li key={p}>· {p}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Foundations ---------- */}
      <Section
        id="foundations"
        eyebrow="Foundations"
        title="Spacing, shape & elevation"
        intro="A 4pt base keeps rhythm consistent, paired with generous whitespace. Corners are soft; elevation is used sparingly and only to signal interaction. These scales are shared across both systems."
      >
        <SubHead>Spacing scale (px)</SubHead>
        <div className="flex flex-wrap items-end gap-4">
          {spacing.map(([step, px]) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className="rounded bg-primary" style={{ width: `${px}px`, height: `${px}px` }} />
              <span className="font-mono text-[11px] text-muted">{step}</span>
              <span className="font-mono text-[10px] text-muted/70">{px}</span>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <SubHead>Border radius</SubHead>
          <div className="flex flex-wrap gap-5">
            {radii.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 border border-primary/40 bg-primary/10 ${r.cls}`} />
                <span className="font-mono text-[11px] text-foreground">{r.name}</span>
                <span className="font-mono text-[10px] text-muted">{r.px}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Elevation</SubHead>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {elevation.map((e) => (
              <div key={e.name} className="flex flex-col items-center gap-3">
                <div className={`flex h-24 w-full items-center justify-center rounded-xl bg-background ${e.cls}`}>
                  <span className="font-mono text-[11px] text-muted">{e.name}</span>
                </div>
                <span className="text-[13px] text-muted">{e.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Breakpoints</SubHead>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-[15px]">
              <tbody className="divide-y divide-border">
                {breakpoints.map((b) => (
                  <tr key={b.range}>
                    <td className="w-20 px-6 py-3 font-mono text-sm text-primary">{b.prefix}</td>
                    <td className="px-6 py-3 font-mono text-sm text-foreground">{b.range}</td>
                    <td className="px-6 py-3 text-muted">{b.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ---------- Components ---------- */}
      <Section
        id="components"
        eyebrow="Library"
        title="Components"
        intro="Buttons, inputs, badges, search, and the resource card that anchors the hub. Every control below is built from the same tokens — swap the theme and the whole library re-skins."
      >
        <SubHead>Buttons — variants</SubHead>
        <div className="flex flex-wrap items-center gap-4">
          <Btn variant="primary">
            <Icon path={Ic.download} className="h-4 w-4" />
            Download PDF
          </Btn>
          <Btn variant="secondary">Preview</Btn>
          <Btn variant="ghost">
            <Icon path={Ic.share} className="h-4 w-4" />
            Share
          </Btn>
          <Btn variant="accent">
            Apply for a scholarship
            <Icon path={Ic.external} className="h-4 w-4" />
          </Btn>
        </div>

        <div className="mt-10">
          <SubHead>Buttons — sizes & states</SubHead>
          <div className="flex flex-wrap items-center gap-4">
            <Btn size="sm">Small</Btn>
            <Btn size="md">Medium</Btn>
            <Btn size="lg">Large</Btn>
            <Btn disabled>Disabled</Btn>
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Text inputs</SubHead>
          <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Full name</span>
              <input
                className="h-11 w-full rounded-lg border border-border bg-background px-4 text-[15px] text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="e.g. Joshua Zobule"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
              <input
                className="h-11 w-full rounded-lg border border-border bg-background px-4 text-[15px] text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@education.gov.sb"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Select category</span>
              <select className="h-11 w-full rounded-lg border border-border bg-background px-4 text-[15px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>Policies &amp; Documents</option>
                <option>Reports &amp; Data</option>
                <option>Videos &amp; Media</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Phone</span>
              <input
                aria-invalid
                className="h-11 w-full rounded-lg border border-error bg-background px-4 text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-error/30"
                placeholder="+677 …"
              />
              <span role="alert" className="mt-1.5 block text-[13px] text-error">
                A valid Solomon Islands number is required.
              </span>
            </label>
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Badges & status</SubHead>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="success">
              <Icon path={Ic.check} className="h-3.5 w-3.5" />
              Published
            </Badge>
            <Badge tone="primary">Policy</Badge>
            <Badge tone="accent">New · 2 days</Badge>
            <Badge tone="warning">Pending review</Badge>
            <Badge tone="error">Archived</Badge>
            <Badge tone="neutral">PDF · 2.4 MB</Badge>
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Search bar</SubHead>
          <form role="search" className="flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Icon path={Ic.search} className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                aria-label="Search the resource hub"
                placeholder="Search documents, reports, videos…"
                className="h-12 w-full rounded-lg border border-border bg-background pl-12 pr-4 text-[15px] text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <Btn size="lg" variant="primary">Search</Btn>
          </form>
        </div>

        <div className="mt-12">
          <SubHead>Resource cards</SubHead>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* document card */}
            <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon path={Ic.document} className="h-5 w-5" />
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone="primary">Policy</Badge>
                  <Badge tone="success">
                    <Icon path={Ic.check} className="h-3.5 w-3.5" />
                    Published
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary">
                  National Education Action Plan 2022–2026
                </h4>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                  The Ministry&apos;s medium-term strategy for access, quality, and management across the sector.
                </p>
                <p className="mt-4 font-mono text-[12px] text-muted">Published 12 Mar 2026 · PDF · 3.1 MB</p>
                <div className="mt-4 flex items-center gap-2">
                  <Btn size="sm" variant="primary">
                    <Icon path={Ic.download} className="h-4 w-4" />
                    Download
                  </Btn>
                  <Btn size="sm" variant="ghost">Preview</Btn>
                </div>
              </div>
            </article>

            {/* report card */}
            <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-[color:var(--accent-ink)]">
                  <Icon path={Ic.report} className="h-5 w-5" />
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone="accent">Report</Badge>
                  <Badge tone="accent">New · 2 days</Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary">
                  Performance Assessment Report 2025
                </h4>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                  Enrolment, completion, and literacy indicators across all nine provinces and Honiara.
                </p>
                <p className="mt-4 font-mono text-[12px] text-muted">Published 28 Jun 2026 · PDF · 8.7 MB</p>
                <div className="mt-4 flex items-center gap-2">
                  <Btn size="sm" variant="primary">
                    <Icon path={Ic.download} className="h-4 w-4" />
                    Download
                  </Btn>
                  <Btn size="sm" variant="ghost">Preview</Btn>
                </div>
              </div>
            </article>

            {/* video card */}
            <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              <div className="relative flex aspect-[16/9] items-center justify-center" style={{ backgroundColor: config.deep }}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-transform group-hover:scale-110">
                  <Icon path={Ic.video} className="h-6 w-6" />
                </span>
                <span className="absolute bottom-3 right-3 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[11px] text-white">
                  12:04
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex gap-1.5">
                  <Badge tone="primary">Video</Badge>
                </div>
                <h4 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary">
                  Teacher training: the new primary curriculum
                </h4>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                  A recorded session for teachers rolling out the updated Standard 1–3 materials.
                </p>
                <p className="mt-4 font-mono text-[12px] text-muted">Recorded 05 May 2026 · 12 min</p>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-12">
          <SubHead>Navigation — header</SubHead>
          <div className="space-y-4">
            {/* solid */}
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center justify-between gap-4 bg-background px-6 py-4">
                <div className="flex items-center gap-3">
                  <Image src="/coa-si.webp" alt="" width={32} height={32} className="h-8 w-auto" />
                  <span className="text-sm font-semibold text-foreground">iResource</span>
                </div>
                <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
                  <span className="text-primary">Resources</span>
                  <span className="hover:text-primary">Publications</span>
                  <span className="hover:text-primary">News</span>
                  <span className="inline-flex items-center gap-1.5">
                    About
                    <Icon path={Ic.chevron} className="h-3.5 w-3.5 rotate-90" />
                  </span>
                </nav>
              </div>
            </div>
            {/* transparent over hero */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex items-center justify-between gap-4 px-6 py-4 text-white"
                style={{ backgroundColor: config.deep }}
              >
                <div className="flex items-center gap-3">
                  <Image src="/coa-si.webp" alt="" width={32} height={32} className="h-8 w-auto" />
                  <span className="text-sm font-semibold">iResource</span>
                </div>
                <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
                  <span className="text-white">Resources</span>
                  <span className="hover:text-accent">Publications</span>
                  <span className="hover:text-accent">News</span>
                  <span className="inline-flex items-center gap-1.5">
                    About
                    <Icon path={Ic.chevron} className="h-3.5 w-3.5 rotate-90" />
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- Iconography ---------- */}
      <Section
        id="iconography"
        eyebrow="Library"
        title="Iconography"
        intro="Line only · 1.5px stroke · 24px grid · round caps and joins. Icons stay unfilled and inherit currentColor so they read correctly on any surface, in either theme."
      >
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-6 lg:grid-cols-8">
          {Object.entries(Ic).map(([name, path]) => (
            <div key={name} className="flex flex-col items-center gap-2 bg-background py-6 text-foreground">
              <Icon path={path} className="h-6 w-6" />
              <span className="font-mono text-[10px] text-muted">{name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <SubHead>Motion principles</SubHead>
          <ul className="grid gap-2 text-[15px] leading-relaxed text-muted sm:grid-cols-2">
            <li>· Subtle by default — 120–200ms hover, 240–320ms panels. Ease cubic-bezier(.2,.7,.3,1).</li>
            <li>· Photographs lead — hero images fade in over ~300ms with a 2% scale.</li>
            <li>· Cards lift on hover (−4px translate + shadow-xl), never on load.</li>
            <li>· Under prefers-reduced-motion, transitions drop to 0ms; nothing breaks.</li>
          </ul>
        </div>
      </Section>

      {/* ---------- Accessibility ---------- */}
      <Section
        id="accessibility"
        eyebrow="Principles"
        title="Accessibility"
        intro="The hub serves the whole public. Contrast, focus, and clear labelling are non-negotiable — and hold in both themes."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "All text meets WCAG 2.2 AA contrast on the canvas (ink 4.5:1+).",
            "Focus rings are a 2px primary outline with 2px offset — never removed.",
            "Tap targets are at least 44×44px on mobile (button size ≥ md).",
            "Status is never colour-only — badges always pair colour with a text label.",
            "Images carry descriptive alt text; decorative images use empty alt.",
            "Form errors are announced via role=\"alert\", not colour alone.",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-border bg-background p-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                <Icon path={Ic.check} className="h-4 w-4" />
              </span>
              <span className="text-[15px] leading-relaxed text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border text-white" style={{ backgroundColor: config.deep }}>
        <div className="mx-auto flex w-full max-w-8xl flex-col gap-2 px-6 py-10">
          <p className="font-serif text-lg">iResource · {config.name} Design System</p>
          <p className="text-sm text-white/60">
            Ministry of Education &amp; Human Resources Development, Solomon Islands Government.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-white">
              <Icon path={Ic.arrow} className="h-4 w-4 rotate-180" />
              Back to the hub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
