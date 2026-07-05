"use client";

import Link from "next/link";
import { useState } from "react";

type PubType = "Policy" | "Report" | "Video";

type Publication = {
  title: string;
  type: PubType;
  date: string;
  format: string;
  size: string;
  excerpt: string;
  href: string;
};

const publications: Publication[] = [
  {
    title: "National Education Action Plan 2026–2030",
    type: "Policy",
    date: "12 May 2026",
    format: "PDF",
    size: "3.2 MB",
    excerpt:
      "The Ministry's five-year strategy for improving access, quality, and equity across the education sector.",
    href: "/documents/neap-2026-2030",
  },
  {
    title: "Education Sector Annual Performance Report 2025",
    type: "Report",
    date: "28 Apr 2026",
    format: "PDF",
    size: "5.1 MB",
    excerpt:
      "Enrolment, completion, and learning-outcome data measured against national education targets.",
    href: "/reports/annual-performance-2025",
  },
  {
    title: "Teacher Professional Development Series",
    type: "Video",
    date: "9 Mar 2026",
    format: "MP4",
    size: "14 min",
    excerpt:
      "Recorded training supporting classroom practice and the rollout of the national curriculum.",
    href: "/videos/tpd-series",
  },
  {
    title: "National Curriculum Framework — Primary",
    type: "Policy",
    date: "2 Mar 2026",
    format: "PDF",
    size: "2.4 MB",
    excerpt:
      "Learning standards and subject outcomes for primary schools across the Solomon Islands.",
    href: "/documents/curriculum-framework-primary",
  },
  {
    title: "Early Childhood Education Statistics 2025",
    type: "Report",
    date: "30 Jan 2026",
    format: "PDF",
    size: "4.7 MB",
    excerpt:
      "Provincial enrolment and access data for early childhood education providers.",
    href: "/reports/ece-statistics-2025",
  },
  {
    title: "School Infrastructure Grants — Guidelines",
    type: "Policy",
    date: "18 Jan 2026",
    format: "PDF",
    size: "1.1 MB",
    excerpt:
      "Eligibility criteria and the application process for the 2026 school infrastructure grant round.",
    href: "/documents/infrastructure-grants-guidelines",
  },
];

const typeMeta: Record<
  PubType,
  { tint: string; iconWrap: string; chip: string; bar: string; action: string }
> = {
  Policy: {
    tint: "text-primary",
    iconWrap: "bg-primary/10",
    chip: "bg-primary/10 text-primary",
    bar: "bg-primary",
    action: "Download",
  },
  Report: {
    tint: "text-emerald-700",
    iconWrap: "bg-emerald-600/10",
    chip: "bg-emerald-600/10 text-emerald-700",
    bar: "bg-emerald-600",
    action: "Download",
  },
  Video: {
    tint: "text-amber-700",
    iconWrap: "bg-amber-500/15",
    chip: "bg-amber-500/15 text-amber-800",
    bar: "bg-amber-500",
    action: "Watch",
  },
};

const filters: { label: string; value: "All" | PubType }[] = [
  { label: "All", value: "All" },
  { label: "Policies", value: "Policy" },
  { label: "Reports", value: "Report" },
  { label: "Videos", value: "Video" },
];

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function TypeIcon({ type, className }: { type: PubType; className?: string }) {
  if (type === "Report") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
        <path d="M3 3v18h18" />
        <path d="M7 16v-4M12 16V8M17 16v-7" />
      </svg>
    );
  }
  if (type === "Video") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </svg>
  );
}

function ActionIcon({ type }: { type: PubType }) {
  if (type === "Video") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="m7 5 12 7-12 7z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...stroke}>
      <path d="M12 3v12M7 11l5 4 5-4M5 21h14" />
    </svg>
  );
}

export default function Publications() {
  const [active, setActive] = useState<"All" | PubType>("All");

  const filtered =
    active === "All"
      ? publications
      : publications.filter((p) => p.type === active);
  const list = filtered.slice(0, 4);
  const [featured, ...rest] = list;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Recently published
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
            Latest publications.
          </h2>
        </div>
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Browse the full library
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* filter bar */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {filters.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-foreground hover:bg-surface-2"
              }`}
            >
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? "publication" : "publications"}
        </span>
      </div>

      {/* featured lead */}
      {featured && (
        <article className="mt-6 grid gap-8 rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-7 lg:grid-cols-[180px_1fr]">
          {/* document thumbnail */}
          <div className="mx-auto flex aspect-[3/4] w-32 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm lg:w-full lg:max-w-[180px]">
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <TypeIcon
                type={featured.type}
                className={`h-12 w-12 ${typeMeta[featured.type].tint}`}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {featured.format}
              </span>
            </div>
          </div>

          {/* content */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeMeta[featured.type].chip}`}
              >
                {featured.type}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-foreground/70">
                Featured
              </span>
              <span aria-hidden>·</span>
              <span>{featured.date}</span>
              <span aria-hidden>·</span>
              <span>
                {featured.format} · {featured.size}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
              <Link
                href={featured.href}
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
              {featured.excerpt}
            </p>
            <div className="mt-auto pt-5">
              <Link
                href={featured.href}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ActionIcon type={featured.type} />
                {typeMeta[featured.type].action}
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* scannable list */}
      {rest.length > 0 && (
        <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
          {rest.map((item) => {
            const m = typeMeta[item.type];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-6"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${m.iconWrap}`}
                  >
                    <TypeIcon type={item.type} className={`h-5 w-5 ${m.tint}`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-serif text-lg text-foreground group-hover:text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-muted">
                      {item.type} · {item.date} · {item.format} · {item.size}
                    </p>
                  </div>
                  <span className="hidden text-xs font-semibold uppercase tracking-wide text-muted sm:inline">
                    {item.format}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden
                    {...stroke}
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
