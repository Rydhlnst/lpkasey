"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCmsInline } from "@/components/cms-inline/provider-client";
import { getApiErrorMessageFromResponse, getErrorMessage } from "@/lib/cms/client-error";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHidden, setIsHidden] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SAVE_BAR_VISIBILITY_KEY) === "1";
  });
  const [isLeavingEditMode, setIsLeavingEditMode] = useState(false);
  const [activeAction, setActiveAction] = useState<"save" | "publish" | null>(null);

  const hidePanel = () => {
    setIsHidden(true);
    window.localStorage.setItem(SAVE_BAR_VISIBILITY_KEY, "1");
  };

  const showPanel = () => {
    setIsHidden(false);
    window.localStorage.setItem(SAVE_BAR_VISIBILITY_KEY, "0");
  };

  const leaveEditMode = async () => {
    if (isLeavingEditMode) return;
    setIsLeavingEditMode(true);
    const query = searchParams.toString();
    const redirectTo = query ? `${pathname}?${query}` : pathname;
    try {
      const response = await fetch(`/api/admin/cms/inline-mode?enabled=0&redirectTo=${encodeURIComponent(redirectTo)}`, {
        method: "GET",
      });
      if (!response.ok) {
        const message = await getApiErrorMessageFromResponse(response, "Failed to exit edit mode.");
        throw new Error(message);
      }
      toast.success("Edit mode disabled.");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to exit edit mode."));
      setIsLeavingEditMode(false);
    }
  };

  const onSave = async () => {
    if (activeAction) return;
    setActiveAction("save");
    try {
      await save();
    } finally {
      setActiveAction(null);
    }
  };

  const onPublish = async () => {
    if (activeAction) return;
    setActiveAction("publish");
    try {
      await publish();
    } finally {
      setActiveAction(null);
    }
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
          <Button size="sm" onClick={() => void onSave()} disabled={!isEditMode || !!activeAction}>
            {activeAction === "save" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {activeAction === "save" ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700"
            onClick={() => void onPublish()}
            disabled={!isEditMode || !!activeAction}
          >
            {activeAction === "publish" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {activeAction === "publish" ? "Publishing..." : "Quick Publish"}
          </Button>
          <Button size="sm" variant="destructive" onClick={() => void leaveEditMode()} disabled={isLeavingEditMode}>
            {isLeavingEditMode ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {isLeavingEditMode ? "Leaving..." : "Exit Edit Mode"}
          </Button>
        </div>
      </div>
    </div>
  );
}
