import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { getNewsPost, news } from "../../lib/content";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const more = news.filter((n) => n.slug !== post.slug).slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* article hero — full-width image with title overlay */}
      <section className="relative isolate flex min-h-[46svh] items-end text-white">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(8,20,40,0.92),rgba(8,20,40,0.45)_55%,rgba(8,20,40,0.25))]" />
        <div className="mx-auto w-full max-w-8xl px-6 pb-12 pt-28">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/60">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href="/news" className="hover:text-accent">
                  News
                </Link>
              </li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      <main className="flex-1 bg-background">
        <article className="mx-auto w-full max-w-8xl px-6 py-14">
          <div className="max-w-2xl">
            <p className="border-l-2 border-accent pl-5 font-serif text-xl leading-8 text-foreground">
              {post.excerpt}
            </p>
            <div className="mt-8 space-y-6">
              {post.body.map((para, i) => (
                <p key={i} className="text-base leading-8 text-muted">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
              Media enquiries:{" "}
              <Link
                href="/about/contact"
                className="font-semibold text-primary hover:underline"
              >
                Media &amp; Communications Unit
              </Link>
            </div>
          </div>
        </article>

        {/* more news */}
        <section className="bg-surface">
          <div className="mx-auto w-full max-w-8xl px-6 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Newsroom
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-foreground">
                  More news.
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                All news
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {more.map((n) => (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <p className="text-xs text-muted">
                    {n.category} · {n.date}
                  </p>
                  <h3 className="mt-2 flex-1 font-serif text-lg leading-snug text-foreground group-hover:text-primary">
                    {n.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
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
