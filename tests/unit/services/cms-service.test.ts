import test from "node:test";
import assert from "node:assert/strict";
import { cmsService } from "@/lib/cms/service/cms-service";

test("[OK] [AC-03-HAPPY] patch page creates revision", async () => {
  const before = await cmsService.getPageBySlug("home");
  assert.ok(before);
  const result = await cmsService.patchPageBySlug({
    slug: "home",
    actorId: "owner.local",
    expectedVersion: before.currentVersion,
    changes: [{ op: "set", path: "hero.subtitle", value: "Updated subtitle", type: "text" }],
  });
  assert.equal(result.skipped, false);
  assert.equal(result.page.currentVersion, before.currentVersion + 1);
});

test("[BOUND] [AC-03-BOUND-1] idempotent save no changes", async () => {
  const page = await cmsService.getPageBySlug("home");
  assert.ok(page);
  const currentSubtitle = (page.content.hero as { subtitle: string }).subtitle;
  const result = await cmsService.patchPageBySlug({
    slug: "home",
    actorId: "owner.local",
    expectedVersion: page.currentVersion,
    changes: [{ op: "set", path: "hero.subtitle", value: currentSubtitle, type: "text" }],
  });
  assert.equal(result.skipped, true);
  assert.equal(result.reason, "NO_CHANGES");
});

test("[OK] [AC-03-HOME-EXTENDED] patch accepts new section prefixes", async () => {
  const page = await cmsService.getPageBySlug("home");
  assert.ok(page);

  const result = await cmsService.patchPageBySlug({
    slug: "home",
    actorId: "owner.local",
    expectedVersion: page.currentVersion,
    changes: [
      {
        op: "set",
        path: "home.visionMission.title",
        value: "Updated Vision Mission Title",
        type: "text",
      },
    ],
  });

  assert.equal(result.skipped, false);
  assert.equal(result.page.currentVersion, page.currentVersion + 1);
});

test("[ERR] [AC-03-HOME-INVALID-PREFIX] rejects unknown path prefix", async () => {
  const page = await cmsService.getPageBySlug("home");
  assert.ok(page);

  await assert.rejects(
    () =>
      cmsService.patchPageBySlug({
        slug: "home",
        actorId: "owner.local",
        expectedVersion: page.currentVersion,
        changes: [
          {
            op: "set",
            path: "home.notRegistered.someField",
            value: "nope",
            type: "text",
          },
        ],
      }),
    /INVALID_CONTENT_PATH/,
  );
});

