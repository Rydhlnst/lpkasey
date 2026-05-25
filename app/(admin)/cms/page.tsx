import Link from "next/link";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cmsService } from "@/lib/cms/service/cms-service";
import { auth, ensureCmsDefaultOwnerSeed } from "@/lib/auth/server";
import { authUsers } from "@/lib/cms/db/schema/auth";
import { getCmsDb } from "@/lib/cms/db/client";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CMS_INLINE_MODE_COOKIE, isInlineModeEnabled } from "@/lib/cms/inline-mode";
import { CmsLogoutButtonClient } from "@/app/(admin)/cms/logout-button-client";
import { CmsInlineModeToggleButtonClient } from "@/app/(admin)/cms/inline-mode-toggle-button-client";
import { CmsPageQuickPublishClient } from "@/app/(admin)/cms/page-quick-publish-client";

const onboardingSteps = [
  "1. Enable Inline Mode using the button above.",
  "2. Open the website and edit text/media directly on page.",
  "3. Click Save, then Quick Publish after review.",
] as const;

function mapCmsSlugToPublicRoute(slug: string) {
  if (slug === "home") return "/";
  if (slug.startsWith("about-")) return `/about/${slug.replace("about-", "")}`;
  if (slug.startsWith("members-")) return `/members/${slug.replace("members-", "")}`;
  if (slug.startsWith("programmes-")) return `/programmes/${slug.replace("programmes-", "")}`;
  return `/${slug}`;
}

export default async function CmsDashboardPage() {
  await ensureCmsDefaultOwnerSeed();
  const session = await auth.api.getSession({ headers: await headers() });
  const allowedEmail = process.env.CMS_SEED_EMAIL ?? "kaseyadmin@cms.local";
  const allowedUsername = process.env.CMS_SEED_USERNAME ?? "kaseyadmin";
  const isAllowed =
    !!session?.user &&
    (session.user.email === allowedEmail || (session.user as { username?: string }).username === allowedUsername);

  if (!isAllowed) {
    redirect("/cms/login");
  }

  let pages = [] as Awaited<ReturnType<typeof cmsService.listPages>>;
  let pagesLoadError = false;
  try {
    pages = await cmsService.listPages();
  } catch (error) {
    pagesLoadError = true;
    console.error("[CMS] Failed to load pages list.", error);
  }
  const cookieStore = await cookies();
  const inlineModeEnabled = isInlineModeEnabled(cookieStore.get(CMS_INLINE_MODE_COOKIE)?.value);
  const db = getCmsDb();
  let accountText = allowedUsername;
  if (db) {
    const row = await db
      .select({ username: authUsers.username, email: authUsers.email })
      .from(authUsers)
      .where(eq(authUsers.email, allowedEmail))
      .limit(1);
    if (row[0]) {
      accountText = row[0].username ?? row[0].email;
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Owner CMS</p>
            <h1 className="text-3xl font-semibold">Pages, Media, Revisions, Settings</h1>
            <p className="mt-2 text-sm text-muted-foreground">Default mode stays clean. Inline editing is active only when enabled from CMS.</p>
            <p className="mt-1 text-xs text-muted-foreground">Active login: {accountText}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CmsInlineModeToggleButtonClient inlineModeEnabled={inlineModeEnabled} />
            <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
              <Link href="/">Open Website</Link>
            </Button>
            <CmsLogoutButtonClient />
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Inline Mode: <span className="font-semibold">{inlineModeEnabled ? "ON" : "OFF"}</span>
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {onboardingSteps.map((step) => (
          <Card key={step}>
            <CardHeader>
              <CardTitle className="text-base">Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{step}</CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>Quick publish or open each page for inline editing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pagesLoadError ? (
              <p className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                CMS database/schema not ready. Run database migration first, then reload this page.
              </p>
            ) : null}
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {mapCmsSlugToPublicRoute(page.slug)} • v{page.currentVersion} • {page.status}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={mapCmsSlugToPublicRoute(page.slug)}>{inlineModeEnabled ? "Edit" : "View"}</Link>
                  </Button>
                  <CmsPageQuickPublishClient slug={page.slug} title={page.title} status={page.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Mode</CardTitle>
            <CardDescription>Scheduled publishing and approval workflow live here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>- Draft -&gt; In Review -&gt; Approved -&gt; Published</p>
            <p>- Scheduled Publish + Expiry (ready for hardening phase)</p>
            <p>- Audit filter by actor/path/time</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
