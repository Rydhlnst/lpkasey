"use client";

import { Input } from "@/components/ui/input";
import { useCmsInlineOptional } from "@/components/cms-inline/provider-client";

function extractEmbedQueryFromMapsUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase();
    const isGoogleMapsHost = host.includes("google.") || host.includes("goo.gl");
    if (!isGoogleMapsHost) return null;

    const q = url.searchParams.get("q");
    if (q?.trim()) return q.trim();

    const query = url.searchParams.get("query");
    if (query?.trim()) return query.trim();

    const destination = url.searchParams.get("destination");
    if (destination?.trim()) return destination.trim();

    const placeMatch = url.pathname.match(/\/maps\/place\/([^/]+)/i);
    if (placeMatch?.[1]) {
      return decodeURIComponent(placeMatch[1]).replace(/\+/g, " ").trim();
    }

    const coordMatch = url.pathname.match(/@(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)/);
    if (coordMatch?.[0]) {
      return coordMatch[0].replace("@", "");
    }
  } catch {
    return null;
  }

  return null;
}

function toMapUrls(rawValue: string, fallbackLinkUrl: string) {
  const value = rawValue.trim();
  const effectiveUrl = value || fallbackLinkUrl;
  const embedQuery = extractEmbedQueryFromMapsUrl(effectiveUrl) ?? effectiveUrl;

  return {
    linkUrl: effectiveUrl,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(embedQuery)}&output=embed`,
  };
}

export function ContactMapCard({
  path = "home.contact.gmapsValue",
  fallbackLinkUrl,
}: {
  path?: string;
  fallbackLinkUrl: string;
}) {
  const cms = useCmsInlineOptional();
  const raw = cms?.getField(path);
  const value = typeof raw === "string" ? raw : "";
  const { linkUrl, embedUrl } = toMapUrls(value, fallbackLinkUrl);

  return (
    <div className="relative h-full min-h-[280px]">
      {cms?.isEditMode ? (
        <div className="absolute top-3 left-3 right-3 z-20 rounded-md border border-cyan-500/30 bg-background/95 p-2">
          <p className="mb-1 text-xs font-medium">Google Maps URL</p>
          <Input
            value={value}
            placeholder="Paste Google Maps URL"
            onChange={(event) => cms.setField({ op: "set", path, type: "text", value: event.target.value })}
          />
        </div>
      ) : null}

      <iframe
        title="Location map"
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />

      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 block"
        aria-label="Open location in Google Maps"
      >
        <span className="sr-only">Open in Google Maps</span>
      </a>

      <div className="pointer-events-none absolute right-3 bottom-3 rounded bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
        Open in Google Maps
      </div>
    </div>
  );
}
