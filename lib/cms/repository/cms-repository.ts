import { and, desc, eq, inArray, isNull } from "drizzle-orm";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";
import { getCmsDb } from "@/lib/cms/db/client";
import { cmsAuditLogs, cmsMediaAssets, cmsPages, cmsRevisions, cmsSchedules } from "@/lib/cms/db/schema/cms";
import type {
  CmsAuditRecord,
  CmsMediaAssetRecord,
  CmsPageRecord,
  CmsRevisionRecord,
  CmsScheduleRecord,
  CmsScheduleStatus,
  CmsWorkflowState,
} from "@/lib/cms/types";

type CmsDbInstance = NonNullable<ReturnType<typeof getCmsDb>>;
type CmsDbExecutor = CmsDbInstance | Parameters<Parameters<CmsDbInstance["transaction"]>[0]>[0];

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function toIso(value: Date | string | null | undefined) {
  if (!value) return "";
  return typeof value === "string" ? value : value.toISOString();
}

function requireDb() {
  const db = getCmsDb();
  if (!db) throw new Error("CMS_DB_NOT_CONFIGURED");
  return db;
}

const PUBLIC_PAGE_DEFS = [
  { slug: "home", title: "Home" },
  { slug: "about", title: "About" },
  { slug: "services", title: "Services" },
  { slug: "contact", title: "Contact" },
  { slug: "community-support", title: "Community Support" },
  { slug: "privacy", title: "Privacy" },
  { slug: "terms", title: "Terms" },
  { slug: "cookie-preferences", title: "Cookie Preferences" },
  { slug: "programmes-leadership-identity", title: "Programme Leadership & Identity" },
  { slug: "programmes-healing-wellbeing", title: "Programme Healing & Wellbeing" },
  { slug: "programmes-cultural-frameworks", title: "Programme Cultural Frameworks" },
  { slug: "programmes-community-support", title: "Programme Community Support" },
  { slug: "about-ariki", title: "About Ariki" },
  { slug: "about-tohunga", title: "About Tohunga" },
  { slug: "about-mangotoa", title: "About Mangotoa" },
  { slug: "about-aronui", title: "About Aronui" },
  { slug: "members-ariki", title: "Members Ariki" },
  { slug: "members-tohunga", title: "Members Tohunga" },
  { slug: "members-mangotoa", title: "Members Mangotoa" },
  { slug: "members-aronui", title: "Members Aronui" },
] as const;

let seedPromise: Promise<void> | null = null;
let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  if (seedPromise) return seedPromise;

  seedPromise = (async () => {
    const db = requireDb();
    const existingRows = await db.select({ slug: cmsPages.slug }).from(cmsPages);
    const existingSlugs = new Set(existingRows.map((row) => row.slug));

    for (const pageDef of PUBLIC_PAGE_DEFS) {
      if (existingSlugs.has(pageDef.slug)) continue;
      const createdAt = new Date();
      const pageId = `page_${pageDef.slug.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`;
      const seedRevisionId = `rev_seed_${pageDef.slug.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`;
      const initialContent = getDefaultCmsContentBySlug(pageDef.slug);

      await db.insert(cmsPages).values({
        id: pageId,
        slug: pageDef.slug,
        title: pageDef.title,
        currentRevisionId: seedRevisionId,
        currentVersion: 1,
        status: "DRAFT",
        updatedBy: "system",
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
      });

      await db.insert(cmsRevisions).values({
        id: seedRevisionId,
        pageId,
        version: 1,
        contentSnapshot: initialContent,
        contentDiff: [],
        changedPaths: [],
        summary: "Initial import from constants",
        actorId: "system",
        workflowState: "DRAFT",
        createdAt,
      });
    }

    seeded = true;
  })()
    .finally(() => {
      seedPromise = null;
    });

  return seedPromise;
}

function mapRevisionRow(row: typeof cmsRevisions.$inferSelect): CmsRevisionRecord {
  return {
    id: row.id,
    pageId: row.pageId,
    version: row.version,
    contentSnapshot: row.contentSnapshot as Record<string, unknown>,
    contentDiff: (row.contentDiff as Array<{ path: string; before: unknown; after: unknown }>) ?? [],
    changedPaths: row.changedPaths,
    summary: row.summary,
    actorId: row.actorId,
    workflowState: row.workflowState as CmsWorkflowState,
    createdAt: toIso(row.createdAt),
  };
}

function mapAuditRow(row: typeof cmsAuditLogs.$inferSelect): CmsAuditRecord {
  return {
    id: row.id,
    pageId: row.pageId,
    revisionId: row.revisionId,
    actorId: row.actorId,
    action: row.action as "SAVE_DRAFT" | "PUBLISH" | "ROLLBACK",
    changedPaths: row.changedPaths,
    meta: (row.meta as Record<string, unknown>) ?? {},
    createdAt: toIso(row.createdAt),
  };
}

function mapScheduleRow(row: typeof cmsSchedules.$inferSelect): CmsScheduleRecord {
  return {
    id: row.id,
    pageId: row.pageId,
    revisionId: row.revisionId,
    publishAt: toIso(row.publishAt),
    expireAt: row.expireAt ? toIso(row.expireAt) : null,
    status: row.status as CmsScheduleStatus,
    createdBy: row.createdBy,
    createdAt: toIso(row.createdAt),
  };
}

async function mapPageRows(rows: Array<typeof cmsPages.$inferSelect>, tx?: CmsDbExecutor) {
  if (!rows.length) return [] satisfies CmsPageRecord[];

  const revisionIds = rows.map((row) => row.currentRevisionId);
  const exec = tx ?? requireDb();
  const revisionRows = await exec
    .select()
    .from(cmsRevisions)
    .where(inArray(cmsRevisions.id, revisionIds));
  const revisionMap = new Map(revisionRows.map((revision) => [revision.id, revision]));

  return rows.map((row) => {
    const revision = revisionMap.get(row.currentRevisionId);
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      status: row.status as CmsWorkflowState,
      currentRevisionId: row.currentRevisionId,
      currentVersion: row.currentVersion,
      content: (revision?.contentSnapshot as Record<string, unknown> | undefined) ?? getDefaultCmsContentBySlug(row.slug),
      createdAt: toIso(row.createdAt),
      updatedAt: toIso(row.updatedAt),
      updatedBy: row.updatedBy,
      deletedAt: row.deletedAt ? toIso(row.deletedAt) : null,
    } satisfies CmsPageRecord;
  });
}

export const cmsRepository = {
  async listPages(tx?: CmsDbExecutor) {
    await ensureSeeded();
    const exec = tx ?? requireDb();
    const rows = await exec
      .select()
      .from(cmsPages)
      .where(isNull(cmsPages.deletedAt))
      .orderBy(cmsPages.slug);
    return mapPageRows(rows, exec);
  },

  async getPageBySlug(slug: string, tx?: CmsDbExecutor) {
    await ensureSeeded();
    const exec = tx ?? requireDb();
    const rows = await exec
      .select()
      .from(cmsPages)
      .where(and(eq(cmsPages.slug, slug), isNull(cmsPages.deletedAt)))
      .limit(1);
    if (!rows[0]) return null;
    const pages = await mapPageRows([rows[0]], exec);
    return pages[0] ?? null;
  },

  async updatePage(page: CmsPageRecord, tx?: CmsDbExecutor) {
    const exec = tx ?? requireDb();
    await exec
      .update(cmsPages)
      .set({
        title: page.title,
        currentRevisionId: page.currentRevisionId,
        currentVersion: page.currentVersion,
        status: page.status,
        updatedBy: page.updatedBy,
        updatedAt: new Date(page.updatedAt),
        deletedAt: page.deletedAt ? new Date(page.deletedAt) : null,
      })
      .where(eq(cmsPages.id, page.id));

    return page;
  },

  async appendRevision(revision: CmsRevisionRecord, tx?: CmsDbExecutor) {
    const exec = tx ?? requireDb();
    await exec.insert(cmsRevisions).values({
      id: revision.id,
      pageId: revision.pageId,
      version: revision.version,
      contentSnapshot: revision.contentSnapshot,
      contentDiff: revision.contentDiff,
      changedPaths: revision.changedPaths,
      summary: revision.summary,
      actorId: revision.actorId,
      workflowState: revision.workflowState,
      createdAt: new Date(revision.createdAt),
    });

    return revision;
  },

  async listRevisions(pageId: string) {
    const rows = await requireDb()
      .select()
      .from(cmsRevisions)
      .where(eq(cmsRevisions.pageId, pageId))
      .orderBy(desc(cmsRevisions.createdAt));
    return rows.map(mapRevisionRow);
  },

  async getRevision(pageId: string, revisionId: string) {
    const rows = await requireDb()
      .select()
      .from(cmsRevisions)
      .where(and(eq(cmsRevisions.pageId, pageId), eq(cmsRevisions.id, revisionId)))
      .limit(1);
    return rows[0] ? mapRevisionRow(rows[0]) : null;
  },

  async appendAudit(audit: CmsAuditRecord, tx?: CmsDbExecutor) {
    const exec = tx ?? requireDb();
    await exec.insert(cmsAuditLogs).values({
      id: audit.id,
      pageId: audit.pageId,
      revisionId: audit.revisionId,
      actorId: audit.actorId,
      action: audit.action,
      changedPaths: audit.changedPaths,
      meta: audit.meta,
      createdAt: new Date(audit.createdAt),
    });
    return audit;
  },

  async listAudit(pageId: string) {
    const rows = await requireDb()
      .select()
      .from(cmsAuditLogs)
      .where(eq(cmsAuditLogs.pageId, pageId))
      .orderBy(desc(cmsAuditLogs.createdAt));
    return rows.map(mapAuditRow);
  },

  async createMediaAsset(asset: CmsMediaAssetRecord, tx?: CmsDbExecutor) {
    const exec = tx ?? requireDb();
    await exec.insert(cmsMediaAssets).values({
      id: asset.id,
      url: asset.url,
      key: asset.key,
      mime: asset.mime,
      sizeBytes: asset.sizeBytes,
      altText: asset.altText,
      createdBy: asset.createdBy,
      createdAt: new Date(asset.createdAt),
    });

    return asset;
  },

  async listMediaAssets() {
    const rows = await requireDb()
      .select()
      .from(cmsMediaAssets)
      .orderBy(desc(cmsMediaAssets.createdAt));
    return rows.map((row) => ({
      id: row.id,
      url: row.url,
      key: row.key,
      mime: row.mime,
      sizeBytes: row.sizeBytes,
      altText: row.altText,
      createdBy: row.createdBy,
      createdAt: toIso(row.createdAt),
    }));
  },

  async createSchedule(schedule: CmsScheduleRecord, tx?: CmsDbExecutor) {
    const exec = tx ?? requireDb();
    await exec.insert(cmsSchedules).values({
      id: schedule.id,
      pageId: schedule.pageId,
      revisionId: schedule.revisionId,
      publishAt: new Date(schedule.publishAt),
      expireAt: schedule.expireAt ? new Date(schedule.expireAt) : null,
      status: schedule.status,
      createdBy: schedule.createdBy,
      createdAt: new Date(schedule.createdAt),
    });
    return schedule;
  },

  async updateScheduleStatus(scheduleId: string, status: CmsScheduleStatus, tx?: CmsDbExecutor) {
    const exec = tx ?? requireDb();
    await exec.update(cmsSchedules).set({ status }).where(eq(cmsSchedules.id, scheduleId));
  },

  async listSchedulesByPage(pageId: string) {
    const rows = await requireDb()
      .select()
      .from(cmsSchedules)
      .where(eq(cmsSchedules.pageId, pageId))
      .orderBy(desc(cmsSchedules.publishAt));
    return rows.map(mapScheduleRow);
  },

  async withTransaction<T>(work: (tx: CmsDbExecutor) => Promise<T>) {
    return requireDb().transaction(async (tx) => work(tx as CmsDbExecutor));
  },

  createId,
  nowIso,
};
