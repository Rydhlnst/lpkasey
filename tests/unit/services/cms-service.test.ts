import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { cmsService } from "@/lib/cms/service/cms-service";
import { installCmsRepositoryMock } from "@/tests/unit/services/cms-repository-mock";

const cmsMock = installCmsRepositoryMock();

beforeEach(() => {
  cmsMock.reset();
});

after(() => {
  cmsMock.restore();
});

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

test("[OK] [AC-03-HOME-FOOTER] patch accepts home.footer path", async () => {
  const page = await cmsService.getPageBySlug("home");
  assert.ok(page);

  const result = await cmsService.patchPageBySlug({
    slug: "home",
    actorId: "owner.local",
    expectedVersion: page.currentVersion,
    changes: [
      {
        op: "set",
        path: "home.footer.quickLinksTitle",
        value: "Quick Menu",
        type: "text",
      },
    ],
  });

  assert.equal(result.skipped, false);
});

test("[ERR] [AC-03-PRIVACY-INVALID-PREFIX] rejects non-content prefix on privacy slug", async () => {
  const page = await cmsService.getPageBySlug("privacy");
  assert.ok(page);

  await assert.rejects(
    () =>
      cmsService.patchPageBySlug({
        slug: "privacy",
        actorId: "owner.local",
        expectedVersion: page.currentVersion,
        changes: [
          {
            op: "set",
            path: "home.footer.quickLinksTitle",
            value: "bad",
            type: "text",
          },
        ],
      }),
    /INVALID_CONTENT_PATH/,
  );
});

test("[ERR] [AC-03-UNSAFE-URL] rejects unsafe link href", async () => {
  const page = await cmsService.getPageBySlug("privacy");
  assert.ok(page);

  await assert.rejects(
    () =>
      cmsService.patchPageBySlug({
        slug: "privacy",
        actorId: "owner.local",
        expectedVersion: page.currentVersion,
        changes: [
          {
            op: "set",
            path: "content.ctaLink",
            value: { label: "Bad link", href: "javascript:alert(1)" },
            type: "link",
          },
        ],
      }),
    /UNSAFE_URL/,
  );
});

test("[ERR] [AC-03-CONFLICT] rejects stale expectedVersion", async () => {
  const page = await cmsService.getPageBySlug("home");
  assert.ok(page);

  await assert.rejects(
    () =>
      cmsService.patchPageBySlug({
        slug: "home",
        actorId: "owner.local",
        expectedVersion: page.currentVersion - 1,
        changes: [{ op: "set", path: "home.footer.companyTitle", value: "Company", type: "text" }],
      }),
    /CONFLICT_VERSION/,
  );
});

test("[OK] [AC-03-HOME-LINK] patch accepts new editable link paths", async () => {
  const page = await cmsService.getPageBySlug("home");
  assert.ok(page);

  const result = await cmsService.patchPageBySlug({
    slug: "home",
    actorId: "owner.local",
    expectedVersion: page.currentVersion,
    changes: [
      {
        op: "set",
        path: "home.heroPillars.0.cardLink",
        value: { label: "Open Ariki", href: "/about/ariki" },
        type: "link",
      },
    ],
  });

  assert.equal(result.skipped, false);
});

test("[ERR] [AC-04-PUBLISH-INVALID-REVISION] rejects missing revision in publish flow", async () => {
  await assert.rejects(
    () =>
      cmsService.publishBySlug({
        slug: "home",
        actorId: "owner.local",
        role: "owner",
        revisionId: "rev_unknown_not_found",
      }),
    /NOT_FOUND/,
  );
});

test("[ERR] [AC-05-ROLLBACK-INVALID-REVISION] rejects missing revision in rollback flow", async () => {
  await assert.rejects(
    () =>
      cmsService.rollbackBySlug({
        slug: "home",
        actorId: "owner.local",
        revisionId: "rev_unknown_not_found",
      }),
    /NOT_FOUND/,
  );
});

