import Image from "next/image";
import Link from "next/link";

/**
 * Shared site header.
 *
 * `variant="overlay"` — transparent, white text; for pages with a full-bleed
 * hero behind the header (the landing page).
 * `variant="solid"` — opaque background with a hairline border; sticky, for
 * all inner pages.
 *
 * The About submenu is CSS-only (hover / focus-within) so the header can stay
 * a server component.
 */

const primaryNav = [
  { label: "Resources", href: "/resources" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
];

const aboutNav = [
  { label: "Services", href: "/about/services" },
  { label: "Contact", href: "/about/contact" },
];

export default function SiteHeader({
  variant = "solid",
}: {
  variant?: "overlay" | "solid";
}) {
  const overlay = variant === "overlay";

  const linkCls = overlay
    ? "hover:text-accent"
    : "text-muted hover:text-primary";

  return (
    <header
      className={
        overlay
          ? "relative"
          : "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur"
      }
    >
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/coa-si.webp"
            alt="Solomon Islands coat of arms"
            width={48}
            height={48}
            className="h-12 w-auto shrink-0"
          />
          <span className="flex flex-col leading-tight">
            <span
              className={`text-sm font-semibold ${
                overlay ? "" : "text-foreground"
              }`}
            >
              iResource
            </span>
            <span
              className={`text-xs ${overlay ? "text-white/70" : "text-muted"}`}
            >
              Ministry of Education &amp; Human Resources Development
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className={linkCls}>
              {item.label}
            </Link>
          ))}

          {/* About — CSS-only dropdown */}
          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className={`flex items-center gap-1.5 ${linkCls} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
            >
              About
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="invisible absolute right-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-44 rounded-xl border border-border bg-background p-1.5 shadow-lg shadow-black/10">
                {aboutNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3.5 py-2 text-sm font-medium text-foreground hover:bg-surface hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </nav>
      </div>
    </header>
  );
}
