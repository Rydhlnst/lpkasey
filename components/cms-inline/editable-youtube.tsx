"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCmsInlineOptional } from "@/components/cms-inline/provider-client";

function getYoutubeVideoId(value: string): string | null {
  const input = value.trim();
  if (!input) return null;

  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id || null;
      }
      if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
        const id = url.pathname.split("/").filter(Boolean)[1];
        return id || null;
      }
    }
  } catch {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  }

  return null;
}

export function EditableYoutube({
  path,
  fallback = "",
  className,
  emptyLabel = "YouTube video",
}: {
  path: string;
  fallback?: string;
  className?: string;
  emptyLabel?: string;
}) {
  const cms = useCmsInlineOptional();
  const raw = cms?.getField(path);
  const value = typeof raw === "string" ? raw : fallback;
  const videoId = getYoutubeVideoId(value);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1`
    : "";

  if (!cms?.isEditMode) {
    if (!embedUrl) {
      return (
        <div className={cn("flex items-center justify-center bg-muted/30 text-center", className)}>
          <span className="px-3 text-sm font-medium text-foreground/70">{emptyLabel}</span>
        </div>
      );
    }

    return (
      <div className={cn("relative overflow-hidden", className)}>
        <iframe
          src={embedUrl}
          title="Impact video"
          className="h-full w-full pointer-events-none"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className={cn("relative overflow-hidden rounded-xl border border-border bg-black", className)}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Impact video"
            className="h-full w-full pointer-events-none"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full min-h-44 w-full items-center justify-center bg-muted/40 px-4 text-center">
            <span className="text-sm font-medium text-foreground/85">Paste YouTube URL to show video</span>
          </div>
        )}
      </div>

      <div className="grid gap-1 rounded-md border border-border/70 bg-muted/20 p-2">
        <Label className="text-[11px]">YouTube URL</Label>
        <Input
          value={value}
          onChange={(event) => {
            cms.setField({ op: "set", path, type: "text", value: event.target.value });
          }}
          placeholder="https://www.youtube.com/watch?v=..."
          className="h-9 text-sm"
        />
      </div>
    </div>
  );
}
