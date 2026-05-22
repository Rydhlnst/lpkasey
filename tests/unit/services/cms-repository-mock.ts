import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";
import { cmsRepository } from "@/lib/cms/repository/cms-repository";
import type { CmsAuditRecord, CmsMediaAssetRecord, CmsPageRecord, CmsRevisionRecord, CmsScheduleRecord } from "@/lib/cms/types";

type MutableRepository = typeof cmsRepository;

function clone<T>(value: T): T {
  return structuredClone(value);
}

function normalizeSlug(slug: string) {
  return slug.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
}

export function installCmsRepositoryMock() {
  const original: Partial<MutableRepository> = {
    listPages: cmsRepository.listPages,
    getPageBySlug: cmsRepository.getPageBySlug,
    updatePage: cmsRepository.updatePage,
    appendRevision: cmsRepository.appendRevision,
    listRevisions: cmsRepository.listRevisions,
    getRevision: cmsRepository.getRevision,
    appendAudit: cmsRepository.appendAudit,
    listAudit: cmsRepository.listAudit,
    createMediaAsset: cmsRepository.createMediaAsset,
    listMediaAssets: cmsRepository.listMediaAssets,
    createSchedule: cmsRepository.createSchedule,
    updateScheduleStatus: cmsRepository.updateScheduleStatus,
    listSchedulesByPage: cmsRepository.listSchedulesByPage,
    withTransaction: cmsRepository.withTransaction,
    createId: cmsRepository.createId,
    nowIso: cmsRepository.nowIso,
  };

  const pages = new Map<string, CmsPageRecord>();
  const revisions = new Map<string, CmsRevisionRecord[]>();
  const audits = new Map<string, CmsAuditRecord[]>();
  const mediaAssets: CmsMediaAssetRecord[] = [];
  const schedules = new Map<string, CmsScheduleRecord[]>();
  let idCounter = 0;

  const nowIso = () => new Date().toISOString();
  const createId = (prefix: string) => {
    idCounter += 1;
    return `${prefix}_mock_${idCounter}`;
  };

  const ensurePage = (slug: string) => {
    const existing = pages.get(slug);
    if (existing) return existing;

    const normalized = normalizeSlug(slug);
    const pageId = `page_${normalized}`;
    const revisionId = `rev_seed_${normalized}`;
    const now = nowIso();
    const content = getDefaultCmsContentBySlug(slug);

    const page: CmsPageRecord = {
      id: pageId,
      slug,
      title: slug,
      status: "DRAFT",
      currentRevisionId: revisionId,
      currentVersion: 1,
      content,
      createdAt: now,
      updatedAt: now,
      updatedBy: "system",
      deletedAt: null,
    };

    const revision: CmsRevisionRecord = {
      id: revisionId,
      pageId,
      version: 1,
      contentSnapshot: content,
      contentDiff: [],
      changedPaths: [],
      summary: "Initial import from constants",
      actorId: "system",
      workflowState: "DRAFT",
      createdAt: now,
    };

    pages.set(slug, page);
    revisions.set(pageId, [revision]);
    audits.set(pageId, []);
    return page;
  };

  const reset = () => {
    pages.clear();
    revisions.clear();
    audits.clear();
    mediaAssets.length = 0;
    schedules.clear();
    idCounter = 0;
  };

  cmsRepository.listPages = async () =>
    Array.from(pages.keys())
      .map((slug) => ensurePage(slug))
      .map((page) => clone(page));

  cmsRepository.getPageBySlug = async (slug: string) => clone(ensurePage(slug));

  cmsRepository.updatePage = async (page: CmsPageRecord) => {
    pages.set(page.slug, clone(page));
    return clone(page);
  };

  cmsRepository.appendRevision = async (revision: CmsRevisionRecord) => {
    const list = revisions.get(revision.pageId) ?? [];
    list.push(clone(revision));
    revisions.set(revision.pageId, list);
    return clone(revision);
  };

  cmsRepository.listRevisions = async (pageId: string) => {
    const list = revisions.get(pageId) ?? [];
    return clone(
      [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    );
  };

  cmsRepository.getRevision = async (pageId: string, revisionId: string) => {
    const list = revisions.get(pageId) ?? [];
    const found = list.find((item) => item.id === revisionId);
    return found ? clone(found) : null;
  };

  cmsRepository.appendAudit = async (audit: CmsAuditRecord) => {
    const list = audits.get(audit.pageId) ?? [];
    list.push(clone(audit));
    audits.set(audit.pageId, list);
    return clone(audit);
  };

  cmsRepository.listAudit = async (pageId: string) => {
    const list = audits.get(pageId) ?? [];
    return clone(
      [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    );
  };

  cmsRepository.createMediaAsset = async (asset: CmsMediaAssetRecord) => {
    mediaAssets.unshift(clone(asset));
    return clone(asset);
  };

  cmsRepository.listMediaAssets = async () => clone(mediaAssets);

  cmsRepository.createSchedule = async (schedule: CmsScheduleRecord) => {
    const list = schedules.get(schedule.pageId) ?? [];
    list.push(clone(schedule));
    schedules.set(schedule.pageId, list);
    return clone(schedule);
  };

  cmsRepository.updateScheduleStatus = async (scheduleId, status) => {
    for (const [pageId, list] of schedules.entries()) {
      const idx = list.findIndex((item) => item.id === scheduleId);
      if (idx === -1) continue;
      list[idx] = { ...list[idx], status };
      schedules.set(pageId, list);
      return;
    }
  };

  cmsRepository.listSchedulesByPage = async (pageId: string) => {
    const list = schedules.get(pageId) ?? [];
    return clone([...list].sort((a, b) => b.publishAt.localeCompare(a.publishAt)));
  };

  cmsRepository.withTransaction = (async <T>(work: (tx: never) => Promise<T>) => work({} as never)) as typeof cmsRepository.withTransaction;
  cmsRepository.createId = createId;
  cmsRepository.nowIso = nowIso;

  return {
    reset,
    restore: () => {
      Object.assign(cmsRepository, original);
    },
  };
}
