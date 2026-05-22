"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCmsInline } from "@/components/cms-inline/provider-client";

const SAVE_BAR_VISIBILITY_KEY = "cms-inline-savebar-hidden";

function statusLabel(status: ReturnType<typeof useCmsInline>["status"]) {
  switch (status) {
    case "unsaved":
      return "Unsaved";
    case "saving":
      return "Saving...";
    case "saved":
      return "Saved";
    case "failed":
      return "Failed";
    case "published":
      return "Published";
    default:
      return "Ready";
  }
}

export function CmsSaveBar() {
  const { isEditMode, save, publish, status } = useCmsInline();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHidden, setIsHidden] = useState(false);
  const [isLeavingEditMode, setIsLeavingEditMode] = useState(false);

  useEffect(() => {
    const hidden = window.localStorage.getItem(SAVE_BAR_VISIBILITY_KEY) === "1";
    setIsHidden(hidden);
  }, []);

  const hidePanel = () => {
    setIsHidden(true);
    window.localStorage.setItem(SAVE_BAR_VISIBILITY_KEY, "1");
  };

  const showPanel = () => {
    setIsHidden(false);
    window.localStorage.setItem(SAVE_BAR_VISIBILITY_KEY, "0");
  };

  const leaveEditMode = () => {
    if (isLeavingEditMode) return;
    setIsLeavingEditMode(true);
    const query = searchParams.toString();
    const redirectTo = query ? `${pathname}?${query}` : pathname;
    window.location.assign(`/api/admin/cms/inline-mode?enabled=0&redirectTo=${encodeURIComponent(redirectTo)}`);
  };

  if (isHidden) {
    return (
      <div className="fixed right-4 bottom-4 z-[60]">
        <Button size="sm" variant="outline" onClick={showPanel}>
          Show Edit Panel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[min(96vw,900px)] -translate-x-1/2 rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{statusLabel(status)}</Badge>
          <Button size="sm" variant="ghost" onClick={hidePanel}>
            Hide Panel
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => void save()} disabled={!isEditMode}>
            Save
          </Button>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700" onClick={() => void publish()} disabled={!isEditMode}>
            Quick Publish
          </Button>
          <Button size="sm" variant="destructive" onClick={leaveEditMode} disabled={isLeavingEditMode}>
            {isLeavingEditMode ? "Leaving..." : "Exit Edit Mode"}
          </Button>
        </div>
      </div>
    </div>
  );
}
