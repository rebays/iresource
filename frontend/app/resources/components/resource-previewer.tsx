"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { CurriculumResource } from "../../lib/curriculum";

type PreviewKind = "pdf" | "slides" | "video" | "generic";
type Stage = "loading" | "embed-fallback" | "failed" | "ready";

function getPreviewKind(format: string): PreviewKind {
  const f = format.toUpperCase();
  if (f === "PDF") return "pdf";
  if (f === "PPTX" || f === "PPT") return "slides";
  if (f === "MP4") return "video";
  return "generic";
}

function Frame({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border sm:aspect-video",
        dark ? "bg-deep" : "bg-surface"
      )}
    >
      {children}
    </div>
  );
}

function Skeleton({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex animate-pulse flex-col items-center justify-center gap-3 bg-surface" aria-hidden>
      <div className="h-10 w-10 rounded-full bg-surface-2" />
      <div className="h-3 w-48 rounded bg-surface-2" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

function EmbedFallbackMessage({ resource }: { resource: CurriculumResource }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
      <Icon name="document" className="h-10 w-10 text-muted" />
      <p className="text-sm text-muted">This preview couldn&apos;t load — the file may still be downloaded below.</p>
      {resource.previewUrl && (
        <a
          href={resource.previewUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Open in a new tab
          <Icon name="external" className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}

/**
 * Renders the right preview surface for a curriculum resource's file format:
 * an embedded iframe for PDFs and slide decks (falling back to an <embed>,
 * then a static message, if the iframe can't load), a video placeholder,
 * or a static thumbnail for anything else. A safety timeout covers iframes
 * that never fire load/error at all — school connections aren't always
 * reliable, and browsers can't reliably report an X-Frame-Options block.
 */
export function ResourcePreviewer({ resource }: { resource: CurriculumResource }) {
  const kind = getPreviewKind(resource.format);
  const [stage, setStage] = useState<Stage>("loading");

  useEffect(() => {
    if (kind === "generic" || kind === "video") {
      const t = setTimeout(() => setStage("ready"), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage((s) => (s === "loading" ? "embed-fallback" : s)), 8000);
    return () => clearTimeout(t);
  }, [kind, resource.id]);

  if (kind === "pdf" || kind === "slides") {
    const url = resource.previewUrl;
    const label = kind === "pdf" ? "document" : "slide deck";

    if (!url || stage === "failed") {
      return (
        <Frame>
          <EmbedFallbackMessage resource={resource} />
        </Frame>
      );
    }

    return (
      <Frame>
        {stage === "loading" && <Skeleton label={`Loading ${label} preview…`} />}
        {stage === "embed-fallback" ? (
          <embed
            src={url}
            type="application/pdf"
            className="h-full w-full"
            onLoad={() => setStage("ready")}
            onError={() => setStage("failed")}
          />
        ) : (
          <iframe
            src={url}
            title={`Preview of ${resource.title}`}
            className="h-full w-full"
            onLoad={() => setStage((s) => (s === "loading" ? "ready" : s))}
            onError={() => setStage("embed-fallback")}
          />
        )}
      </Frame>
    );
  }

  if (kind === "video") {
    return (
      <Frame dark>
        {stage === "loading" ? (
          <Skeleton label="Loading video preview…" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur">
              <Icon name="video" className="h-7 w-7" />
            </span>
          </div>
        )}
      </Frame>
    );
  }

  return (
    <Frame>
      {stage === "loading" ? (
        <Skeleton label="Loading preview…" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <Icon name="document" className="h-10 w-10 text-muted" />
          <p className="text-sm text-muted">No inline preview for {resource.format} files — download to view.</p>
        </div>
      )}
    </Frame>
  );
}
