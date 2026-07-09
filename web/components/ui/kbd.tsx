import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Inline keyboard-shortcut hint (e.g. the "F" that focuses a search field).
 * Hidden below `sm` since it points at a physical key, not a touch target.
 */
function Kbd({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <kbd
      aria-hidden
      className={cn(
        "pointer-events-none hidden h-5 min-w-5 select-none items-center justify-center rounded-md border px-1.5 font-mono text-[11px] font-medium sm:flex",
        className
      )}
    >
      {children}
    </kbd>
  )
}

export { Kbd }
