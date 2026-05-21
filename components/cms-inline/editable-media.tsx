"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCmsInline } from "@/components/cms-inline/provider-client";

type MediaValue = {
  url: string;
  altText: string;
};

export function EditableMedia({
  path,
  type,
  className,
  emptyLabel,
}: {
  path: string;
  type: "image" | "video";
  className?: string;
  emptyLabel?: string;
}) {
  const { isEditMode, getField, setField } = useCmsInline();
  const raw = getField(path);
  const value: MediaValue =
    raw && typeof raw === "object"
      ? ({ url: "", altText: "Media", ...(raw as Record<string, unknown>) } as MediaValue)
      : { url: "", altText: "Media" };

  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File, altText: string) {
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("altText", altText || "Media");
      form.append("mediaType", type);

      const response = await fetch("/api/admin/cms/media/upload", {
        method: "POST",
        headers: {
          "x-cms-role": "owner",
          "x-cms-user": "owner.local",
        },
        body: form,
      });
      const payload = (await response.json()) as { data?: { asset?: { url: string; altText: string } } };
      if (!response.ok || !payload.data?.asset) throw new Error("upload-failed");

      setField({
        op: "set",
        path,
        type,
        value: {
          url: payload.data.asset.url,
          altText: payload.data.asset.altText,
        },
      });
    } finally {
      setIsUploading(false);
    }
  }

  if (!isEditMode) {
    if (!value.url) {
      if (!emptyLabel) return null;
      return (
        <div className={cn("flex items-center justify-center bg-cyan-50/40 text-center", className)}>
          <span className="px-3 text-sm font-medium text-cyan-900/70">{emptyLabel}</span>
        </div>
      );
    }
    if (type === "video") {
      return (
        <video className={className} controls preload="metadata">
          <source src={value.url} />
        </video>
      );
    }

    return (
      <Image
        src={value.url}
        alt={value.altText || "CMS image"}
        width={1200}
        height={720}
        className={className}
      />
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className={cn(
          "group relative block w-full overflow-hidden rounded-xl border border-cyan-500/40 bg-cyan-50/30 text-left transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40",
          isUploading ? "cursor-wait opacity-85" : "cursor-pointer hover:bg-cyan-50/50",
          className,
        )}
      >
        {value.url ? (
          type === "video" ? (
            <video className="h-full w-full object-cover" controls preload="metadata">
              <source src={value.url} />
            </video>
          ) : (
            <Image
              src={value.url}
              alt={value.altText || "CMS image"}
              width={1200}
              height={720}
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <div className="flex h-full min-h-44 w-full items-center justify-center bg-cyan-50/50 px-4 text-center">
            <span className="text-sm font-medium text-cyan-900/85">
              {type === "image" ? "Tap/Click to add image" : "Tap/Click to add video"}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/55 to-transparent px-3 py-2 text-xs text-white">
          {isUploading ? "Uploading..." : `Tap/Click to replace ${type === "image" ? "image" : "video"}`}
        </div>
      </button>

      <div className="grid gap-1 rounded-md border border-cyan-500/20 bg-cyan-50/20 p-2">
        <Label className="text-[11px]">Alt / Caption</Label>
        <Input
          value={value.altText}
          onChange={(event) =>
            setField({
              op: "set",
              path,
              type,
              value: { ...value, altText: event.target.value },
            })
          }
          placeholder="Deskripsi media"
          className="h-9 text-sm"
        />
      </div>

      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={type === "image" ? "image/png,image/jpeg,image/webp" : "video/mp4,video/webm,video/quicktime"}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          void handleUpload(file, value.altText);
          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
