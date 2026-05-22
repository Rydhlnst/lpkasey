"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Check, Crop, ImageUp, SquarePen, X } from "lucide-react";
import Cropper, { type Area } from "react-easy-crop";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useCmsInline } from "@/components/cms-inline/provider-client";

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type MediaValue = {
  url: string;
  altText: string;
  key?: string;
  cropArea?: CropArea;
};

function inferAssetKey(value: MediaValue): string | null {
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeCropArea(value: unknown): CropArea | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<CropArea>;
  if (
    typeof candidate.x !== "number" ||
    typeof candidate.y !== "number" ||
    typeof candidate.width !== "number" ||
    typeof candidate.height !== "number"
  ) {
    return null;
  }

  const width = clamp(candidate.width, 1, 100);
  const height = clamp(candidate.height, 1, 100);
  const maxX = 100 - width;
  const maxY = 100 - height;

  return {
    x: clamp(candidate.x, 0, maxX),
    y: clamp(candidate.y, 0, maxY),
    width,
    height,
  };
}

function getImageCropStyle(cropArea: CropArea | null): CSSProperties | undefined {
  if (!cropArea) return undefined;
  const centerX = cropArea.x + cropArea.width / 2;
  const centerY = cropArea.y + cropArea.height / 2;

  return {
    objectFit: "cover",
    objectPosition: `${centerX}% ${centerY}%`,
  };
}

export function EditableMedia({
  path,
  type,
  className,
  emptyLabel,
  cropAspect = 4 / 3,
  frameClassName,
}: {
  path: string;
  type: "image" | "video";
  className?: string;
  emptyLabel?: string;
  cropAspect?: number;
  frameClassName?: string;
}) {
  const { isEditMode, getField, setField } = useCmsInline();
  const raw = getField(path);
  const value: MediaValue =
    raw && typeof raw === "object"
      ? ({ url: "", altText: "Media", key: "", ...(raw as Record<string, unknown>) } as MediaValue)
      : { url: "", altText: "Media" };
  const currentCropArea = normalizeCropArea(value.cropArea);
  const assetKey = inferAssetKey(value);
  const resolvedUrl = assetKey ? `/api/cms/media?key=${encodeURIComponent(assetKey)}` : value.url;
  const cropStyle = getImageCropStyle(currentCropArea);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCropEditorOpen, setIsCropEditorOpen] = useState(false);
  const [isMediaActionsOpen, setIsMediaActionsOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [draftCropArea, setDraftCropArea] = useState<CropArea | null>(currentCropArea);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraftCropArea(currentCropArea);
    setIsCropEditorOpen(false);
    setIsMediaActionsOpen(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, [path, resolvedUrl, currentCropArea?.x, currentCropArea?.y, currentCropArea?.width, currentCropArea?.height]);

  useEffect(() => {
    if (!isMediaActionsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!mediaActionsRef.current) return;
      const target = event.target;
      if (target instanceof Node && mediaActionsRef.current.contains(target)) return;
      setIsMediaActionsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMediaActionsOpen]);

  function uploadWithProgress(file: File, altText: string): Promise<{ url: string; altText: string; key?: string }> {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append("file", file);
      form.append("altText", altText || "Media");
      form.append("mediaType", type);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/cms/media/upload");
      xhr.withCredentials = true;

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        const next = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(next);
      };

      xhr.onerror = () => reject(new Error("upload-network-error"));
      xhr.onload = () => {
        try {
          const payload = JSON.parse(xhr.responseText || "{}") as {
            data?: { asset?: { url: string; altText: string; key?: string } };
            error?: { code?: string; message?: string };
          };
          if (xhr.status < 200 || xhr.status >= 300 || !payload.data?.asset) {
            const serverMessage = payload.error?.message?.trim();
            reject(new Error(serverMessage || `Upload failed (${xhr.status}).`));
            return;
          }
          resolve(payload.data.asset);
        } catch {
          reject(new Error(`Upload failed (${xhr.status}): invalid server response.`));
        }
      };

      xhr.send(form);
    });
  }

  async function handleUpload(file: File, altText: string) {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    try {
      const asset = await uploadWithProgress(file, altText);

      setField({
        op: "set",
        path,
        type,
        value: {
          url: asset.url,
          altText: asset.altText,
          key: asset.key ?? "",
          cropArea: undefined,
        },
      });
      setUploadProgress(100);
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : "Upload failed. Please try another file.";
      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  }

  if (!isEditMode) {
    if (!resolvedUrl) {
      if (!emptyLabel) return null;
      return (
        <div className={cn("flex items-center justify-center bg-muted/30 text-center", className)}>
          <span className="px-3 text-sm font-medium text-foreground/70">{emptyLabel}</span>
        </div>
      );
    }
    if (type === "video") {
      return (
        <video className={className} controls preload="metadata">
          <source src={resolvedUrl} />
        </video>
      );
    }

    return (
      <img
        src={resolvedUrl}
        alt={value.altText || "CMS image"}
        className={className}
        style={cropStyle}
        loading="lazy"
        decoding="async"
      />
    );
  }

  const canCropImage = type === "image" && !!resolvedUrl;

  function openCropEditor() {
    setIsMediaActionsOpen(false);
    setDraftCropArea(currentCropArea);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setIsCropEditorOpen(true);
  }

  function applyCrop() {
    setField({
      op: "set",
      path,
      type,
      value: {
        ...value,
        cropArea: draftCropArea ?? undefined,
      },
    });
    setIsCropEditorOpen(false);
  }

  function resetCrop() {
    setIsMediaActionsOpen(false);
    setField({
      op: "set",
      path,
      type,
      value: {
        ...value,
        cropArea: undefined,
      },
    });
    setDraftCropArea(null);
    setIsCropEditorOpen(false);
  }

  function openFilePicker() {
    setIsMediaActionsOpen(false);
    inputRef.current?.click();
  }

  useEffect(() => {
    if (!isCropEditorOpen) return;

    function handleCropKeys(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();
        applyCrop();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setIsCropEditorOpen(false);
      }
    }

    window.addEventListener("keydown", handleCropKeys);
    return () => {
      window.removeEventListener("keydown", handleCropKeys);
    };
  }, [isCropEditorOpen, applyCrop]);

  return (
    <div className="space-y-2">
      {!resolvedUrl ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "group relative block w-full overflow-hidden rounded-xl border border-border bg-background text-left transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
            isUploading ? "cursor-wait opacity-85" : "cursor-pointer hover:bg-muted/35",
            frameClassName,
            className,
          )}
        >
          <div className="flex h-full min-h-44 w-full items-center justify-center bg-muted/40 px-4 text-center">
            <span className="text-sm font-medium text-foreground/85">
              {type === "image" ? "Tap/Click to add image" : "Tap/Click to add video"}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/55 to-transparent px-3 py-2 text-xs text-white">
            {isUploading ? "Uploading..." : `Tap/Click to replace ${type === "image" ? "image" : "video"}`}
          </div>
        </button>
      ) : (
        <div
          className={cn(
            "group relative block w-full overflow-hidden rounded-xl border border-border bg-background text-left",
            isUploading ? "cursor-wait opacity-85" : "",
            frameClassName,
            className,
          )}
        >
          {type === "video" ? (
            <video className="h-full w-full object-cover" controls preload="metadata">
              <source src={resolvedUrl} />
            </video>
          ) : (
            <img
              src={resolvedUrl}
              alt={value.altText || "CMS image"}
              className="h-full w-full object-cover"
              style={cropStyle}
              loading="lazy"
              decoding="async"
            />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/55 to-transparent px-3 py-2 text-xs text-white">
            {isUploading ? "Uploading..." : "Use edit icon to crop or change image"}
          </div>

          <div ref={mediaActionsRef} className="absolute right-2 top-2 z-20">
            <button
              type="button"
              onClick={() => setIsMediaActionsOpen((prev) => !prev)}
              disabled={isUploading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/70 bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white"
              aria-label="Open media edit actions"
            >
              <SquarePen className="h-4 w-4" aria-hidden />
            </button>

            {isMediaActionsOpen ? (
              <div className="mt-1 w-44 rounded-md border border-border bg-background p-1 shadow-lg">
                {type === "image" ? (
                  <button
                    type="button"
                    onClick={openCropEditor}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted/50"
                  >
                    <Crop className="h-3.5 w-3.5" aria-hidden />
                    Crop Position
                  </button>
                ) : null}
                {type === "image" && currentCropArea ? (
                  <button
                    type="button"
                    onClick={resetCrop}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted/50"
                  >
                    <Crop className="h-3.5 w-3.5" aria-hidden />
                    Reset Crop
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted/50"
                >
                  <ImageUp className="h-3.5 w-3.5" aria-hidden />
                  {type === "image" ? "Change Photo" : "Change Media"}
                </button>
              </div>
            ) : null}
          </div>

          {isCropEditorOpen && type === "image" ? (
            <div className="absolute inset-0 z-30 bg-black/45">
              <div className="relative h-full w-full">
                <Cropper
                  image={resolvedUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={cropAspect}
                  minZoom={1}
                  maxZoom={3}
                  initialCroppedAreaPercentages={currentCropArea ?? undefined}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(croppedArea: Area) => {
                    setDraftCropArea(normalizeCropArea(croppedArea));
                  }}
                />
              </div>
              <div className="absolute left-2 top-2 z-40 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white">
                Drag image to adjust crop. Press Enter to finish.
              </div>
              <div className="absolute right-2 top-2 z-40 flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyCrop}
                  className="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  Finish
                </button>
                <button
                  type="button"
                  onClick={() => setIsCropEditorOpen(false)}
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-white/45 bg-white/10 px-2.5 text-xs font-semibold text-white hover:bg-white/20"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Cancel
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-40 space-y-2 border-t border-white/20 bg-black/65 p-3 backdrop-blur-sm">
                <div className="space-y-1">
                  <Label className="text-[11px] text-white">Zoom</Label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.05}
                    value={zoom}
                    onChange={(event) => setZoom(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={applyCrop}
                    className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90"
                  >
                    Apply Crop (Enter)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCropEditorOpen(false)}
                    className="inline-flex h-8 items-center rounded-md border border-white/45 bg-white/10 px-3 text-xs font-medium text-white hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div className="grid gap-1 rounded-md border border-border/70 bg-muted/20 p-2">
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
          placeholder="Media description"
          className="h-9 text-sm"
        />
      </div>

      {isUploading ? (
        <div className="space-y-2 rounded-md border border-border/70 bg-muted/20 p-2">
          <div className="flex items-center justify-between text-xs text-foreground/80">
            <span>Uploading media...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      ) : null}

      {uploadError ? (
        <p className="rounded-md border border-red-400/40 bg-red-50 px-3 py-2 text-xs text-red-700">{uploadError}</p>
      ) : null}

      {canCropImage ? (
        <div className="space-y-2 rounded-md border border-border/70 bg-muted/10 p-2">
          <p className="text-xs text-foreground/70">Use edit icon on image to crop position or change photo.</p>
        </div>
      ) : null}

      {resolvedUrl ? (
        <div className="space-y-2 rounded-md border border-border/70 bg-muted/10 p-2">
          <Label className="text-[11px]">Preview</Label>
          {type === "video" ? (
            <video className="max-h-64 w-full rounded-md object-contain bg-slate-900/80" controls preload="metadata">
              <source src={resolvedUrl} />
            </video>
          ) : (
            <img
              src={resolvedUrl}
              alt={value.altText || "CMS image preview"}
              className="max-h-64 w-full rounded-md object-contain bg-slate-900/5"
              style={cropStyle}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      ) : null}

      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={type === "image" ? "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml,image/avif" : "video/mp4,video/webm,video/quicktime"}
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
