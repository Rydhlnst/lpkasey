import test from "node:test";
import assert from "node:assert/strict";
import { GET, PATCH } from "@/app/api/admin/cms/pages/[slug]/route";

test("[OK] [API] PATCH + GET extended home content paths", async () => {
  const patchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "x-cms-role": "owner",
      "x-cms-user": "owner.local",
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

  const getRes = await GET(new Request("http://localhost/api/admin/cms/pages/home"), {
    params: Promise.resolve({ slug: "home" }),
  });
  assert.equal(getRes.status, 200);

  const getBody = (await getRes.json()) as {
    data?: { content?: { home?: { valuesFramework?: { upper?: Array<{ title?: string }> } } } };
  };

  assert.equal(getBody.data?.content?.home?.valuesFramework?.upper?.[0]?.title, "Edited Upper Title");
});

test("[ERR] [API] PATCH rejects invalid prefix", async () => {
  const currentRes = await GET(new Request("http://localhost/api/admin/cms/pages/home"), {
    params: Promise.resolve({ slug: "home" }),
  });
  const currentBody = (await currentRes.json()) as { data?: { version?: number } };
  const expectedVersion = currentBody.data?.version ?? 1;

  const patchReq = new Request("http://localhost/api/admin/cms/pages/home", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "x-cms-role": "owner",
      "x-cms-user": "owner.local",
    },
    body: JSON.stringify({
      expectedVersion,
      changes: [
        {
          op: "set",
          path: "home.invalidPrefix.field",
          value: "bad",
          type: "text",
        },
      ],
    }),
  });

  const patchRes = await PATCH(patchReq, { params: Promise.resolve({ slug: "home" }) });
  assert.equal(patchRes.status, 422);

  const body = (await patchRes.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, "INVALID_CONTENT_PATH");
});
