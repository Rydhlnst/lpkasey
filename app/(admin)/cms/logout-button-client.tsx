"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { getErrorMessage } from "@/lib/cms/client-error";

export function CmsLogoutButtonClient() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onLogout = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = (await authClient.signOut()) as { error?: { message?: string } } | undefined;
      if (result?.error?.message) {
        throw new Error(result.error.message);
      }
      router.push("/cms/login");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Logout failed. Please try again."));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => void onLogout()}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
