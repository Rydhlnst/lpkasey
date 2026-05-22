"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessageFromResponse, getErrorMessage } from "@/lib/cms/client-error";

type CmsInlineModeToggleButtonClientProps = {
  inlineModeEnabled: boolean;
  redirectTo?: string;
};

export function CmsInlineModeToggleButtonClient({
  inlineModeEnabled,
  redirectTo = "/cms",
}: CmsInlineModeToggleButtonClientProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const nextEnabled = inlineModeEnabled ? "0" : "1";
  const label = inlineModeEnabled ? "Disable Inline Edit" : "Enable Inline Edit";

  const onToggle = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      const response = await fetch(
        `/api/admin/cms/inline-mode?enabled=${nextEnabled}&redirectTo=${encodeURIComponent(redirectTo)}`,
        { method: "GET" },
      );

      if (!response.ok) {
        const message = await getApiErrorMessageFromResponse(response, "Failed to update inline mode.");
        throw new Error(message);
      }

      toast.success(inlineModeEnabled ? "Inline edit mode disabled." : "Inline edit mode enabled.");
      router.refresh();
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update inline mode.");
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button type="button" variant={inlineModeEnabled ? "outline" : "default"} onClick={() => void onToggle()} disabled={isPending}>
      {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
      {isPending ? "Processing..." : label}
    </Button>
  );
}
