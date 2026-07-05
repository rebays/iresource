import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/page-header";
import ResourceList from "../components/resource-list";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import TraditionalWatermark from "../components/traditional-watermark";
import { categories, resources } from "../lib/content";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Browse policies, reports, videos, and learning resources published by the Ministry of Education and Human Resources Development.",
};

export default function ResourceIndexPage() {
  const recent = resources.slice(0, 6);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <PageHeader
        id="wm-resources"
        eyebrow="Resource library"
        title="Every official resource, in one place."
        lead="Policies, reports, videos, and learning materials published by the Ministry — organised by category and searchable across the whole library."
        crumbs={[{ label: "Resources" }]}
      >
        <form
          action="/search"
          role="search"
          className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="search"
            name="q"
            placeholder="Search the library…"
            aria-label="Search the resource library"
            className="h-12 flex-1 rounded-lg border border-white/20 bg-white/95 px-4 text-base text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="h-12 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            Search
          </button>
        </form>
      </PageHeader>

      <main className="flex-1">
        {/* categories */}
        <section className="relative isolate overflow-hidden bg-background">
          <TraditionalWatermark id="wm-resources-cats" />
          <div className="mx-auto w-full max-w-8xl px-6 py-16 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Categories
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              Browse by category.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/resources/${c.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur">
                      {c.count}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                      {c.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Browse
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* recently added */}
        <section className="bg-surface">
          <div className="mx-auto w-full max-w-8xl px-6 py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Just published
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
                  Recently added.
                </h2>
              </div>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Search the full library
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-8">
              <ResourceList items={recent} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
