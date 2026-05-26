"use client";

import { useEffect, useMemo, useState } from "react";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { useCmsInline } from "@/components/cms-inline/provider-client";
import { cn } from "@/lib/utils";

type Orientation = "unknown" | "portrait" | "landscape" | "square";

function inferAssetKey(value: { url?: string; key?: string } | null): string | null {
  if (!value) return null;
  if (typeof value.key === "string" && value.key.trim()) return value.key.trim();
  if (!value.url) return null;
  try {
    const parsed = new URL(value.url);
    if (!parsed.pathname.startsWith("/cms/")) return null;
    const key = decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
    return key || null;
  } catch {
    return null;
  }
}

export function AdaptiveEditableMedia({
  path,
  emptyLabel,
  className,
  portraitClassName,
  landscapeClassName,
  squareClassName,
  unknownClassName,
}: {
  path: string;
  emptyLabel: string;
  className?: string;
  portraitClassName?: string;
  landscapeClassName?: string;
  squareClassName?: string;
  unknownClassName?: string;
}) {
  const { getField } = useCmsInline();
  const raw = getField(path);

  const resolvedUrl = useMemo(() => {
    const mediaValue =
      raw && typeof raw === "object"
        ? ({ url: "", altText: "", key: "", ...(raw as Record<string, unknown>) } as { url?: string; key?: string })
        : null;
    const assetKey = inferAssetKey(mediaValue);
    if (assetKey) return `/api/cms/media?key=${encodeURIComponent(assetKey)}`;
    return mediaValue?.url ?? "";
  }, [raw]);

  const [orientation, setOrientation] = useState<Orientation>("unknown");

  useEffect(() => {
    if (!resolvedUrl) return;

    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const ratio = image.naturalWidth / image.naturalHeight;
      if (ratio >= 1.15) {
        setOrientation("landscape");
      } else if (ratio <= 0.85) {
        setOrientation("portrait");
      } else {
        setOrientation("square");
      }
    };
    image.onerror = () => {
      if (cancelled) return;
      setOrientation("unknown");
    };
    image.src = resolvedUrl;

    return () => {
      cancelled = true;
    };
  }, [resolvedUrl]);

  const ratioClass =
    !resolvedUrl
      ? unknownClassName
      : orientation === "portrait"
      ? portraitClassName
      : orientation === "landscape"
        ? landscapeClassName
        : orientation === "square"
          ? squareClassName
          : unknownClassName;

  return (
    <EditableMedia
      path={path}
      type="image"
      emptyLabel={emptyLabel}
      className={cn(className, ratioClass)}
    />
  );
}
