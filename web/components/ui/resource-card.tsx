import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"

import { Badge, type badgeVariants } from "@/components/ui/badge"
import { Icon, type IconName } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

type ResourceCardBadge = {
  label: string
  tone?: VariantProps<typeof badgeVariants>["variant"]
  icon?: IconName
}

type ResourceCardBase = {
  title: string
  description: string
  meta: string
  badges: ResourceCardBadge[]
  className?: string
  style?: CSSProperties
  /** Wraps the title in a link, e.g. to a detail page. */
  href?: string
}

type ResourceCardProps = ResourceCardBase &
  (
    | { variant: "document" | "report"; image: string }
    | { variant: "video"; duration: string }
    /** A shelved textbook: portrait cover, spine, and a catalog-style call number in place of the description. */
    | { variant: "textbook"; image: string; author?: string; callNumber: string }
  )

/**
 * The hub's core listing unit — documents, reports, and videos share this
 * shell. The card's single action is navigation: when `href` is set the
 * whole card is clickable via the stretched title link (an `after`
 * overlay). Downloads deliberately live on the detail page, where a
 * multi-file resource can present each file with context.
 */
function ResourceCard(props: ResourceCardProps) {
  const { title, description, meta, badges, className, style, href } = props

  if (props.variant === "textbook") {
    const Wrapper = href ? Link : "div"
    const wrapperProps = href ? { href, "aria-label": title } : {}

    return (
      <article
        style={style}
        className={cn(
          "group relative flex flex-col transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-1",
          "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary has-[a:focus-visible]:ring-offset-2",
          className
        )}
      >
        {/* @ts-expect-error -- href/aria-label only present when Wrapper is Link */}
        <Wrapper {...wrapperProps} className="flex flex-1 flex-col focus-visible:outline-none">
          <div className="relative aspect-2/3 overflow-hidden rounded-r-md rounded-l-sm bg-deep shadow-md ring-1 ring-black/10 transition-shadow duration-300 group-hover:shadow-2xl">
            <Image
              src={props.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            {/* spine shadow */}
            <div className="absolute inset-y-0 left-0 w-3 bg-linear-to-r from-black/50 via-black/15 to-transparent" />
            {/* fore-edge page lines */}
            <div className="absolute inset-y-1.5 right-0 w-1 bg-linear-to-l from-white/60 via-white/20 to-transparent" />
            {/* gold ribbon bookmark */}
            <span className="absolute right-4 top-0 h-7 w-3.5 bg-accent shadow-sm [clip-path:polygon(0_0,100%_0,100%_100%,50%_70%,0_100%)]" />
            {/* title overlay — frosted, darkened strip so it reads over any cover art */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/50 to-transparent px-3 pb-2.5 pt-8 backdrop-blur-[2px]">
              <h4 className="font-serif text-base leading-snug text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.5)] line-clamp-3 group-hover:underline">
                {title}
              </h4>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1 pt-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {props.callNumber}
            </p>
            {props.author && <p className="text-[13px] italic text-muted">{props.author}</p>}
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {badges.map((b) => (
                <Badge key={b.label} variant={b.tone}>
                  {b.icon && <Icon name={b.icon} className="h-3.5 w-3.5" />}
                  {b.label}
                </Badge>
              ))}
            </div>
            <p className="font-mono text-[11px] text-muted">{meta}</p>
          </div>
        </Wrapper>
      </article>
    )
  }

  return (
    <article
      style={style}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary has-[a:focus-visible]:ring-offset-2",
        className
      )}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-deep">
        {props.variant === "video" ? (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-transform group-hover:scale-110">
              <Icon name="video" className="h-6 w-6" />
            </span>
            <span className="absolute bottom-3 right-3 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[11px] text-white">
              {props.duration}
            </span>
          </>
        ) : (
          <Image
            src={props.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <Badge key={b.label} variant={b.tone}>
              {b.icon && <Icon name={b.icon} className="h-3.5 w-3.5" />}
              {b.label}
            </Badge>
          ))}
        </div>
        <h4 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary">
          {href ? (
            <Link
              href={href}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h4>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{description}</p>
        <p className="mt-4 font-mono text-[12px] text-muted">{meta}</p>
      </div>
    </article>
  )
}

export { ResourceCard }
export type { ResourceCardProps, ResourceCardBadge }
