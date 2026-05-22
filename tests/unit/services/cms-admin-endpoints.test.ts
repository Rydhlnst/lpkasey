import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { GET as getPagesList } from "@/app/api/admin/cms/pages/route";
import { GET as getPageBySlug, PATCH as patchPageBySlug } from "@/app/api/admin/cms/pages/[slug]/route";
import { POST as publishPageBySlug } from "@/app/api/admin/cms/pages/[slug]/publish/route";
import { POST as rollbackPageBySlug } from "@/app/api/admin/cms/pages/[slug]/rollback/route";
import { GET as getRevisionsBySlug } from "@/app/api/admin/cms/pages/[slug]/revisions/route";
import { GET as getAuditBySlug } from "@/app/api/admin/cms/pages/[slug]/audit/route";
import { GET as getMediaAssets } from "@/app/api/admin/cms/media/route";
import { POST as uploadMediaAsset } from "@/app/api/admin/cms/media/upload/route";
import { GET as setInlineMode } from "@/app/api/admin/cms/inline-mode/route";
import { installCmsServiceRouteMock } from "@/tests/unit/services/cms-service-route-mock";

const serviceMock = installCmsServiceRouteMock();

const authHeaders = {
  "x-cms-role": "owner",
  "x-cms-user": "owner.local",
};

function authRequest(url: string, init?: RequestInit) {
  return new Request(url, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...authHeaders,
    },
  });
}

beforeEach(() => {
  const page = {
    id: "page_home",
    slug: "home",
    title: "Home",
    status: "DRAFT" as const,
    currentRevisionId: "rev_seed_home",
    currentVersion: 1,
    content: { home: { footer: { quickLinksTitle: "Quick Links" } } },
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    updatedBy: "system",
    deletedAt: null,
  };

  serviceMock.set("listPages", async () => [page]);
  serviceMock.set("getPageBySlug", async (slug: string) => (slug === "home" ? page : null));
  serviceMock.set("patchPageBySlug", async () => ({
    skipped: false,
    page: {
      ...page,
      currentVersion: 2,
      updatedAt: "2026-01-01T00:01:00.000Z",
    },
    revision: {
      id: "rev_2",
      pageId: page.id,
      version: 2,
      contentSnapshot: page.content,
      contentDiff: [{ path: "home.footer.quickLinksTitle", before: "Quick Links", after: "Edited" }],
      changedPaths: ["home.footer.quickLinksTitle"],
      summary: "updated",
      actorId: "owner.local",
      workflowState: "DRAFT",
      createdAt: "2026-01-01T00:01:00.000Z",
    },
    operationSummary: ["Updated home.footer.quickLinksTitle"],
  }));
  serviceMock.set("listRevisionsBySlug", async () => [
    {
      id: "rev_2",
      pageId: page.id,
      version: 2,
      contentSnapshot: page.content,
      contentDiff: [],
      changedPaths: [],
      summary: "updated",
      actorId: "owner.local",
      workflowState: "DRAFT",
      createdAt: "2026-01-01T00:01:00.000Z",
    },
    {
      id: "rev_seed_home",
      pageId: page.id,
      version: 1,
      contentSnapshot: page.content,
      contentDiff: [],
      changedPaths: [],
      summary: "seed",
      actorId: "system",
      workflowState: "DRAFT",
      createdAt: "2026-01-01T00:00:00.000Z",
    },
  ]);
  serviceMock.set("publishBySlug", async (params) => {
    const status = params.scheduleAt ? "APPROVED" : "PUBLISHED";
    return {
      page: {
        ...page,
        status,
        updatedAt: "2026-01-01T00:02:00.000Z",
        updatedBy: params.actorId,
      },
      revision: {
        id: params.revisionId ?? "rev_seed_home",
        pageId: page.id,
        version: 1,
        contentSnapshot: page.content,
        contentDiff: [],
        changedPaths: [],
        summary: "publish",
        actorId: params.actorId,
        workflowState: "PUBLISHED",
        createdAt: "2026-01-01T00:02:00.000Z",
      },
    };
  });
  serviceMock.set("rollbackBySlug", async () => ({
    page: {
      ...page,
      status: "DRAFT",
      currentVersion: 3,
      updatedAt: "2026-01-01T00:03:00.000Z",
    },
    revision: {
      id: "rev_3",
      pageId: page.id,
      version: 3,
      contentSnapshot: page.content,
      contentDiff: [],
      changedPaths: ["*"],
      summary: "rollback",
      actorId: "owner.local",
      workflowState: "ROLLED_BACK",
      createdAt: "2026-01-01T00:03:00.000Z",
    },
  }));
  serviceMock.set("auditBySlug", async () => [
    {
      id: "audit_1",
      pageId: page.id,
      revisionId: "rev_2",
      actorId: "owner.local",
      action: "SAVE_DRAFT",
      changedPaths: ["home.footer.quickLinksTitle"],
      meta: {},
      createdAt: "2026-01-01T00:01:00.000Z",
    },
  ]);
  serviceMock.set("listMediaAssets", async () => []);
  serviceMock.set("createMediaAsset", async (params) => ({
    id: "media_1",
    url: params.url,
    key: params.key,
    mime: params.mime,
    sizeBytes: params.sizeBytes,
    altText: params.altText,
    createdBy: params.createdBy,
    createdAt: "2026-01-01T00:02:00.000Z",
  }));

  delete (globalThis as { __CMS_UPLOAD_OBJECT__?: unknown }).__CMS_UPLOAD_OBJECT__;
});

after(() => {
  serviceMock.restore();
  delete (globalThis as { __CMS_UPLOAD_OBJECT__?: unknown }).__CMS_UPLOAD_OBJECT__;
});

test("[OK] [API] pages list route returns items", async () => {
  const res = await getPagesList(authRequest("http://localhost/api/admin/cms/pages"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { items?: Array<{ slug: string }> } };
  assert.equal(body.data?.items?.[0]?.slug, "home");
});

test("[ERR] [API] pages list route rejects anonymous", async () => {
  const res = await getPagesList(new Request("http://localhost/api/admin/cms/pages"));
  assert.equal(res.status, 401);
});

test("[OK] [API] publish route supports immediate publish", async () => {
  const res = await publishPageBySlug(
    authRequest("http://localhost/api/admin/cms/pages/home/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }),
    { params: Promise.resolve({ slug: "home" }) },
  );

  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { status?: string } };
  assert.equal(body.data?.status, "PUBLISHED");
});

test("[OK] [API] publish route supports schedule window", async () => {
  const scheduleAt = new Date(Date.now() + 60_000).toISOString();
  const expiryAt = new Date(Date.now() + 3_600_000).toISOString();

  const res = await publishPageBySlug(
    authRequest("http://localhost/api/admin/cms/pages/home/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ scheduleAt, expiryAt }),
    }),
    { params: Promise.resolve({ slug: "home" }) },
  );

  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { status?: string } };
  assert.equal(body.data?.status, "APPROVED");
});

test("[ERR] [API] publish route rejects invalid schedule window", async () => {
  const scheduleAt = new Date(Date.now() + 3_600_000).toISOString();
  const expiryAt = new Date(Date.now() + 60_000).toISOString();

  const res = await publishPageBySlug(
    authRequest("http://localhost/api/admin/cms/pages/home/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ scheduleAt, expiryAt }),
    }),
    { params: Promise.resolve({ slug: "home" }) },
  );

  assert.equal(res.status, 422);
});

test("[OK] [API] revisions route returns snapshots", async () => {
  const res = await getRevisionsBySlug(authRequest("http://localhost/api/admin/cms/pages/home/revisions"), {
    params: Promise.resolve({ slug: "home" }),
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { items?: Array<{ id: string }> } };
  assert.equal(body.data?.items?.[0]?.id, "rev_2");
});

test("[OK] [API] rollback route creates new revision", async () => {
  const res = await rollbackPageBySlug(
    authRequest("http://localhost/api/admin/cms/pages/home/rollback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ revisionId: "rev_seed_home", reason: "restore" }),
    }),
    { params: Promise.resolve({ slug: "home" }) },
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { status?: string } };
  assert.equal(body.data?.status, "DRAFT");
});

test("[OK] [API] audit route supports filter query", async () => {
  const res = await getAuditBySlug(
    authRequest("http://localhost/api/admin/cms/pages/home/audit?path=home.footer"),
    { params: Promise.resolve({ slug: "home" }) },
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { items?: Array<{ action?: string }> } };
  assert.equal(body.data?.items?.[0]?.action, "SAVE_DRAFT");
});

test("[OK] [API] media list route returns items", async () => {
  const res = await getMediaAssets(authRequest("http://localhost/api/admin/cms/media"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data?: { items?: unknown[] } };
  assert.ok(Array.isArray(body.data?.items));
});

test("[ERR] [API] media upload route rejects anonymous", async () => {
  const form = new FormData();
  form.append("altText", "Sample Alt");
  const res = await uploadMediaAsset(
    new Request("http://localhost/api/admin/cms/media/upload", {
      method: "POST",
      body: form,
    }),
  );
  assert.equal(res.status, 401);
});

test("[ERR] [API] media upload route validates file and mime", async () => {
  const emptyForm = new FormData();
  emptyForm.append("altText", "Sample Alt");
  const noFileRes = await uploadMediaAsset(
    authRequest("http://localhost/api/admin/cms/media/upload", { method: "POST", body: emptyForm }),
  );
  assert.equal(noFileRes.status, 422);

  const badMimeForm = new FormData();
  badMimeForm.append("altText", "Sample Alt");
  badMimeForm.append("mediaType", "image");
  badMimeForm.append("file", new File([new Uint8Array([1, 2, 3])], "payload.txt", { type: "text/plain" }));
  const badMimeRes = await uploadMediaAsset(
    authRequest("http://localhost/api/admin/cms/media/upload", { method: "POST", body: badMimeForm }),
  );
  assert.equal(badMimeRes.status, 422);
});

test("[OK] [API] media upload route stores asset metadata", async () => {
  (globalThis as { __CMS_UPLOAD_OBJECT__?: (params: { key: string; body: Uint8Array; contentType: string }) => Promise<string> }).__CMS_UPLOAD_OBJECT__ =
    async ({ key }) => `https://cdn.example.test/${key}`;

  const form = new FormData();
  form.append("altText", "Sample Alt");
  form.append("mediaType", "image");
  form.append("file", new File([new Uint8Array([137, 80, 78, 71])], "photo.png", { type: "image/png" }));

  const res = await uploadMediaAsset(
    authRequest("http://localhost/api/admin/cms/media/upload", { method: "POST", body: form }),
  );

  assert.equal(res.status, 201);
  const body = (await res.json()) as { data?: { asset?: { url?: string; altText?: string } } };
  assert.ok(body.data?.asset?.url?.startsWith("https://cdn.example.test/cms/image/"));
  assert.equal(body.data?.asset?.altText, "Sample Alt");
});

test("[ERR] [API] inline-mode route rejects anonymous", async () => {
  const res = await setInlineMode(new Request("http://localhost/api/admin/cms/inline-mode?enabled=1&redirectTo=/cms"));
  assert.equal(res.status, 401);
});

test("[OK] [API] inline-mode route sanitizes redirect and sets secure cookie flags", async () => {
  const res = await setInlineMode(authRequest("http://localhost/api/admin/cms/inline-mode?enabled=1&redirectTo=https://evil.example"));
  assert.equal(res.status, 307);
  assert.equal(res.headers.get("location"), "http://localhost/cms");
  const setCookie = res.headers.get("set-cookie") ?? "";
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);
});

test("[ERR] [API] page by slug GET rejects anonymous", async () => {
  const res = await getPageBySlug(new Request("http://localhost/api/admin/cms/pages/home"), {
    params: Promise.resolve({ slug: "home" }),
  });
  assert.equal(res.status, 401);
});
