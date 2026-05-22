import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { GET, PATCH } from "@/app/api/admin/cms/pages/[slug]/route";
import { installCmsServiceRouteMock } from "@/tests/unit/services/cms-service-route-mock";

const serviceMock = installCmsServiceRouteMock();

const authHeaders = {
  "x-cms-role": "owner",
  "x-cms-user": "owner.local",
};

function authGet(url: string) {
  return new Request(url, { headers: authHeaders });
}

beforeEach(() => {
  const homePage = {
    id: "page_home",
    slug: "home",
    title: "Home",
    status: "DRAFT" as const,
    currentRevisionId: "rev_seed_home",
    currentVersion: 1,
    content: {
      home: {
        valuesFramework: {
          upper: [{ title: "Initial Upper Title" }],
        },
      },
      links: {
        brandLogo: { label: "Home", href: "/" },
      },
    },
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    updatedBy: "system",
    deletedAt: null,
  };
  const privacyPage = {
    ...homePage,
    id: "page_privacy",
    slug: "privacy",
    content: {
      content: {
        title: "Privacy Policy",
        ctaLink: { label: "Contact", href: "/contact" },
      },
    },
  };

  let homeVersion = 1;
  let privacyVersion = 1;
  let homeContent = structuredClone(homePage.content);
  let privacyContent = structuredClone(privacyPage.content);

  serviceMock.set("getPageBySlug", async (slug: string) => {
    if (slug === "home") {
      return {
        ...homePage,
        currentVersion: homeVersion,
        content: homeContent,
      };
    }
    if (slug === "privacy") {
      return {
        ...privacyPage,
        currentVersion: privacyVersion,
        content: privacyContent,
      };
    }
    return null;
  });

  serviceMock.set("patchPageBySlug", async (params) => {
    if (params.slug === "home" && params.changes.some((change) => change.path.startsWith("home.invalidPrefix"))) {
      throw new Error("INVALID_CONTENT_PATH");
    }
    if (params.slug === "privacy" && params.changes.some((change) => change.path.startsWith("home."))) {
      throw new Error("INVALID_CONTENT_PATH");
    }
    if (params.slug === "privacy" && params.changes.some((change) => change.path === "content.ctaLink")) {
      throw new Error("UNSAFE_URL");
    }

    if (params.slug === "home") {
      if (params.expectedVersion !== homeVersion) throw new Error("CONFLICT_VERSION");
      homeVersion += 1;
      homeContent = {
        ...homeContent,
        home: {
          ...(homeContent as { home?: Record<string, unknown> }).home,
          valuesFramework: {
            upper: [{ title: "Edited Upper Title" }],
          },
        },
      };
      return {
        skipped: false,
        page: {
          ...homePage,
          currentVersion: homeVersion,
          content: homeContent,
          updatedAt: "2026-01-01T00:01:00.000Z",
          updatedBy: params.actorId,
        },
        revision: {
          id: `rev_${homeVersion}`,
          pageId: homePage.id,
          version: homeVersion,
          contentSnapshot: homeContent,
          contentDiff: [],
          changedPaths: params.changes.map((item) => item.path),
          summary: "patched",
          actorId: params.actorId,
          workflowState: "DRAFT",
          createdAt: "2026-01-01T00:01:00.000Z",
        },
        operationSummary: params.changes.map((item) => `Updated ${item.path}`),
      };
    }

    if (params.slug === "privacy") {
      if (params.expectedVersion !== privacyVersion) throw new Error("CONFLICT_VERSION");
      privacyVersion += 1;
      privacyContent = {
        content: {
          ...(privacyContent as { content?: Record<string, unknown> }).content,
          title: "Privacy Policy Updated",
          ctaLink: { label: "Contact", href: "/contact" },
        },
      };
      return {
        skipped: false,
        page: {
          ...privacyPage,
          currentVersion: privacyVersion,
          content: privacyContent,
          updatedAt: "2026-01-01T00:01:00.000Z",
          updatedBy: params.actorId,
        },
        revision: {
          id: `rev_${privacyVersion}`,
          pageId: privacyPage.id,
          version: privacyVersion,
          contentSnapshot: privacyContent,
          contentDiff: [],
          changedPaths: params.changes.map((item) => item.path),
          summary: "patched",
          actorId: params.actorId,
          workflowState: "DRAFT",
          createdAt: "2026-01-01T00:01:00.000Z",
        },
        operationSummary: params.changes.map((item) => `Updated ${item.path}`),
      };
    }

    throw new Error("NOT_FOUND");
  });
});

after(() => {
  serviceMock.restore();
});

test("[OK] [API] PATCH + GET extended home content paths", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [
        {
          op: "set",
          path: "home.valuesFramework.upper.0.title",
          value: "Edited Upper Title",
          type: "text",
        },
      ],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "home" }) });
  assert.equal(patchRes.status, 200);
  const patchBody = (await patchRes.json()) as { data?: { version?: number } };
  assert.equal(patchBody.data?.version, 2);

  const getRes = await GET(authGet("http://localhost/api/admin/cms/pages/home"), {
    params: Promise.resolve({ slug: "home" }),
  });
  assert.equal(getRes.status, 200);
  const getBody = (await getRes.json()) as {
    data?: { content?: { home?: { valuesFramework?: { upper?: Array<{ title?: string }> } } } };
  };
  assert.equal(getBody.data?.content?.home?.valuesFramework?.upper?.[0]?.title, "Edited Upper Title");
});

test("[ERR] [API] PATCH rejects invalid prefix", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "home.invalidPrefix.field", value: "bad", type: "text" }],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "home" }) });
  assert.equal(patchRes.status, 422);
  const body = (await patchRes.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, "INVALID_CONTENT_PATH");
});

test("[OK] [API] PATCH + GET privacy content paths", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/privacy", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "content.title", value: "Privacy Policy Updated", type: "text" }],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "privacy" }) });
  assert.equal(patchRes.status, 200);

  const getRes = await GET(authGet("http://localhost/api/admin/cms/pages/privacy"), {
    params: Promise.resolve({ slug: "privacy" }),
  });
  assert.equal(getRes.status, 200);
  const getBody = (await getRes.json()) as { data?: { content?: { content?: { title?: string } } } };
  assert.equal(getBody.data?.content?.content?.title, "Privacy Policy Updated");
});

test("[ERR] [API] PATCH privacy rejects invalid prefix", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/privacy", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "home.contact.title", value: "bad", type: "text" }],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "privacy" }) });
  assert.equal(patchRes.status, 422);
  const body = (await patchRes.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, "INVALID_CONTENT_PATH");
});

test("[ERR] [API] PATCH rejects unsafe link url", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/privacy", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "content.ctaLink", value: { label: "Unsafe", href: "javascript:alert(1)" }, type: "link" }],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "privacy" }) });
  assert.equal(patchRes.status, 422);
  const body = (await patchRes.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, "UNSAFE_URL");
});

test("[ERR] [API] PATCH rejects conflict version", async () => {
  const firstPatchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "home.footer.quickLinksTitle", value: "Bump Version", type: "text" }],
    }),
  });
  const firstPatchRes = await PATCH(firstPatchReq, { params: Promise.resolve({ slug: "home" }) });
  assert.equal(firstPatchRes.status, 200);

  const stalePatchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "home.footer.quickLinksTitle", value: "Quick Links", type: "text" }],
    }),
  });

  const patchRes = await PATCH(stalePatchReq, { params: Promise.resolve({ slug: "home" }) });
  assert.equal(patchRes.status, 409);
  const body = (await patchRes.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, "CONFLICT_VERSION");
});

test("[OK] [API] PATCH accepts editable link object path", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({
      expectedVersion: 1,
      changes: [{ op: "set", path: "links.brandLogo", value: { label: "Home", href: "/" }, type: "link" }],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "home" }) });
  assert.equal(patchRes.status, 200);
});
