"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCmsInline } from "@/components/cms-inline/provider-client";

function statusLabel(status: ReturnType<typeof useCmsInline>["status"]) {
  switch (status) {
    case "unsaved":
      return "Belum disimpan";
    case "saving":
      return "Menyimpan...";
    case "saved":
      return "Tersimpan";
    case "failed":
      return "Gagal";
    case "published":
      return "Terbit";
    default:
      return "Siap";
  }
}

export function CmsSaveBar() {
  const { isEditMode, toggleEditMode, save, reset, publish, status } = useCmsInline();

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[min(96vw,900px)] -translate-x-1/2 rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button size="sm" variant={isEditMode ? "default" : "outline"} onClick={toggleEditMode}>
            {isEditMode ? "Keluar Edit" : "Edit"}
          </Button>
          <Badge variant="secondary">{statusLabel(status)}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
          <Button size="sm" onClick={() => void save()}>
            Save
          </Button>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700" onClick={() => void publish()}>
            Quick Publish
          </Button>
          {isEditMode ? (
            <Button size="sm" variant="destructive" onClick={toggleEditMode}>
              Exit Edit Mode
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
