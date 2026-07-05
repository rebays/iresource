import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/page-header";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import {
  getPublication,
  publications,
  resourceHref,
  getResource,
} from "../../lib/content";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) return {};
  return { title: pub.title, description: pub.summary };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const libraryItem = pub.resource
    ? getResource(pub.resource.category, pub.resource.slug)
    : undefined;
  const related = publications
    .filter((p) => p.slug !== pub.slug)
    .slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <PageHeader
        id={`wm-pub-${pub.slug}`}
        eyebrow={pub.type}
        title={pub.title}
        crumbs={[
          { label: "Publications", href: "/publications" },
          { label: pub.title },
        ]}
      >
        <p className="mt-5 text-sm text-white/70">
          {pub.date} · {pub.office}
        </p>
      </PageHeader>

      <main className="flex-1 bg-background">
        <div className="mx-auto grid w-full max-w-8xl gap-10 px-6 py-14 lg:grid-cols-[1fr_320px]">
          {/* summary body */}
          <article>
            <p className="max-w-2xl border-l-2 border-accent pl-5 font-serif text-xl leading-8 text-foreground">
              {pub.summary}
            </p>
            <div className="mt-8 max-w-2xl space-y-6">
              {pub.body.map((para, i) => (
                <p key={i} className="text-base leading-8 text-muted">
                  {para}
                </p>
              ))}
            </div>
          </article>

          {/* download sidebar */}
          <aside className="lg:pt-1">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Get the document
              </p>
              <a
                href="#"
                aria-disabled
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  aria-hidden
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12M7 11l5 4 5-4M5 21h14" />
                </svg>
                Download {pub.format}
                <span className="font-normal opacity-75">· {pub.size}</span>
              </a>
              <dl className="mt-6 space-y-3.5">
                {(
                  [
                    ["Type", pub.type],
                    ["Published", pub.date],
                    ["Format", `${pub.format} · ${pub.size}`],
                    ["Source office", pub.office],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-border/70 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                      {label}
                    </dt>
                    <dd className="text-right font-mono text-sm text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              {libraryItem && (
                <Link
                  href={resourceHref(libraryItem)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  View in the resource library
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </aside>
        </div>

        {/* related publications */}
        <section className="bg-surface">
          <div className="mx-auto w-full max-w-8xl px-6 py-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Keep reading
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-foreground">
              Related publications.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/publications/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {p.type}
                  </span>
                  <h3 className="mt-3 flex-1 font-serif text-lg leading-snug text-foreground group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-xs text-muted">
                    {p.date} · {p.format} · {p.size}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
