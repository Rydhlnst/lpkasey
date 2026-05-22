"use client";

import { useState } from "react";
import { Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getApiErrorMessageFromResponse, getErrorMessage } from "@/lib/cms/client-error";

type CmsPageQuickPublishClientProps = {
  slug: string;
  title: string;
  status: string;
};

export function CmsPageQuickPublishClient({ slug, title, status }: CmsPageQuickPublishClientProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const publishLabel = status === "published" ? "Republish" : "Quick Publish";

  const onConfirmPublish = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isPublishing) return;
    setIsPublishing(true);

    try {
      const response = await fetch(`/api/admin/cms/pages/${encodeURIComponent(slug)}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ advancedMode: false }),
      });

      if (!response.ok) {
        const message = await getApiErrorMessageFromResponse(response, "Failed to publish page.");
        throw new Error(message);
      }

      toast.success(`"${title}" published successfully.`);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to publish page."));
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
          {publishLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Publish page <span className="font-medium text-foreground">{title}</span> now? This will make latest revision live.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPublishing}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(event) => void onConfirmPublish(event)} disabled={isPublishing}>
            {isPublishing ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {isPublishing ? "Publishing..." : "Yes, Publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

