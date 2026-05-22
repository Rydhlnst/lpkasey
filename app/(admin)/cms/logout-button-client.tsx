"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export function CmsLogoutButtonClient() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        await authClient.signOut();
        router.push("/cms/login");
        router.refresh();
      }}
    >
      Logout
    </Button>
  );
}

