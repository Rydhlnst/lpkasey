import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, ensureCmsDefaultOwnerSeed } from "@/lib/auth/server";
import { CmsLoginFormClient } from "@/app/(admin)/cms/login/login-form-client";

export default async function CmsLoginPage() {
  let seedError: string | null = null;
  try {
    await ensureCmsDefaultOwnerSeed();
  } catch (error) {
    seedError = error instanceof Error ? error.message : "unknown";
  }
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    redirect("/cms");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>CMS Login</CardTitle>
          <CardDescription>Log in first to enable the CMS inline edit panel.</CardDescription>
        </CardHeader>
        <CardContent>
          {seedError ? (
            <p className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              Seed account failed: {seedError}
            </p>
          ) : null}
          <CmsLoginFormClient />
        </CardContent>
      </Card>
    </main>
  );
}
