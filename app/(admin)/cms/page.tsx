import Link from "next/link";
import { cookies } from "next/headers";
import { cmsService } from "@/lib/cms/service/cms-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CMS_INLINE_MODE_COOKIE, isInlineModeEnabled } from "@/lib/cms/inline-mode";

const onboardingSteps = [
  "1. Aktifkan Inline Mode dari tombol di atas.",
  "2. Buka website lalu edit teks/media langsung di halaman.",
  "3. Klik Save lalu Quick Publish setelah review.",
] as const;

export default async function CmsDashboardPage() {
  const pages = await cmsService.listPages();
  const cookieStore = await cookies();
  const inlineModeEnabled = isInlineModeEnabled(cookieStore.get(CMS_INLINE_MODE_COOKIE)?.value);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Owner CMS</p>
            <h1 className="text-3xl font-semibold">Pages, Media, Revisions, Settings</h1>
            <p className="mt-2 text-sm text-muted-foreground">Mode default dibuat bersih. Inline edit hanya aktif kalau dinyalakan dari CMS.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant={inlineModeEnabled ? "default" : "outline"}>
              <Link href={`/api/admin/cms/inline-mode?enabled=1&redirectTo=${encodeURIComponent("/cms")}`}>
                Enable Inline Edit
              </Link>
            </Button>
            <Button asChild variant={!inlineModeEnabled ? "default" : "outline"}>
              <Link href={`/api/admin/cms/inline-mode?enabled=0&redirectTo=${encodeURIComponent("/cms")}`}>
                Disable Inline Edit
              </Link>
            </Button>
            <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
              <Link href="/">Open Website</Link>
            </Button>
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
            <CardDescription>Satu CTA utama: buka halaman untuk edit inline.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-xs text-muted-foreground">/{page.slug} • v{page.currentVersion} • {page.status}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={page.slug === "home" ? "/" : `/${page.slug}`}>{inlineModeEnabled ? "Edit" : "View"}</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Mode</CardTitle>
            <CardDescription>Schedule Publish dan approval workflow ada di sini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>- Draft -&gt; In Review -&gt; Approved -&gt; Published</p>
            <p>- Schedule Publish + Expiry (siap untuk tahap hardening)</p>
            <p>- Audit filter by actor/path/time</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
