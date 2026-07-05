import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/page-header";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { publications, type PublicationType } from "../lib/content";

export const metadata: Metadata = {
  title: "Policies & publications",
  description:
    "Official policies, sector reports, and guidelines published by the Ministry of Education and Human Resources Development.",
};

const typeChip: Record<PublicationType, string> = {
  Policy: "bg-primary/10 text-primary",
  Report: "bg-emerald-600/10 text-emerald-700",
  Guideline: "bg-amber-500/15 text-amber-800",
};

export default function PublicationsIndexPage() {
  const [featured, ...rest] = publications;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <PageHeader
        id="wm-publications"
        eyebrow="Policies & publications"
        title="The Ministry's official record."
        lead="National policies, sector performance reports, and guidelines — each with a summary page and the full document available to download."
        crumbs={[{ label: "Publications" }]}
      />

      <main className="flex-1 bg-background">
        <div className="mx-auto w-full max-w-8xl px-6 py-16">
          {/* featured */}
          <article className="grid gap-8 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeChip[featured.type]}`}
                >
                  {featured.type}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-ink">
                  Latest
                </span>
                <span aria-hidden>·</span>
                <span>{featured.date}</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-snug text-foreground sm:text-4xl">
                <Link
                  href={`/publications/${featured.slug}`}
                  className="hover:text-primary"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                {featured.summary}
              </p>
              <Link
                href={`/publications/${featured.slug}`}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Read the summary
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="mx-auto flex aspect-[3/4] w-full max-w-[220px] flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md">
                <span className="h-8 w-8 rounded-full bg-primary/15" />
                <div>
                  <p className="font-serif text-sm leading-snug text-foreground">
                    {featured.title}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-muted">
                    {featured.format} · {featured.size}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* full list */}
          <div className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <h2 className="font-serif text-2xl text-foreground">
                All publications
              </h2>
              <p className="text-sm text-muted">
                {publications.length} publications
              </p>
            </div>
            <ul className="mt-2 divide-y divide-border">
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/publications/${p.slug}`}
                    className="group grid gap-2 py-6 transition-colors sm:grid-cols-[110px_1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <span
                      className={`justify-self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeChip[p.type]}`}
                    >
                      {p.type}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-xl leading-snug text-foreground group-hover:text-primary">
                        {p.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-6 text-muted">
                        {p.summary}
                      </span>
                      <span className="mt-2 block text-xs text-muted">
                        {p.date} · {p.format} · {p.size} · {p.office}
                      </span>
                    </span>
                    <span
                      className="hidden text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary sm:block"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
