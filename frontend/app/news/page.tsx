import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/page-header";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { news, type NewsCategory } from "../lib/content";

export const metadata: Metadata = {
  title: "News",
  description:
    "Announcements, press releases, and events from the Ministry of Education and Human Resources Development.",
};

const categoryChip: Record<NewsCategory, string> = {
  Announcement: "bg-primary/10 text-primary",
  "Press release": "bg-emerald-600/10 text-emerald-700",
  Event: "bg-amber-500/15 text-amber-800",
};

export default function NewsIndexPage() {
  const [featured, ...rest] = news;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <PageHeader
        id="wm-news"
        eyebrow="Newsroom"
        title="News from the Ministry."
        lead="Announcements, press releases, and events from across the education sector."
        crumbs={[{ label: "News" }]}
      />

      <main className="flex-1 bg-background">
        <div className="mx-auto w-full max-w-8xl px-6 py-16">
          {/* featured story */}
          <Link
            href={`/news/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all hover:border-primary hover:shadow-xl lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryChip[featured.category]}`}
                >
                  {featured.category}
                </span>
                <span>{featured.date}</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-snug text-foreground group-hover:text-primary sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read the story
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* the rest */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold backdrop-blur ${categoryChip[post.category]}`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-muted">{post.date}</p>
                  <h3 className="mt-2 flex-1 font-serif text-xl leading-snug text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
