import { cmsRepository } from "@/lib/cms/repository/cms-repository";
import { diffPaths, setByPath, updateListAtPath } from "@/lib/cms/revision-engine/diff";
import type { CmsChange, CmsPatchResult, CmsRole, CmsWorkflowState } from "@/lib/cms/types";
import { assertChangePathAllowed, assertSafeLinkValue } from "@/lib/cms/validation/schemas";

function canPublish(role: CmsRole) {
  return role === "owner" || role === "reviewer";
}

export const cmsService = {
  async listPages() {
    return cmsRepository.listPages();
  },

  async getPageBySlug(slug: string) {
    return cmsRepository.getPageBySlug(slug);
  },

  async patchPageBySlug(params: {
    slug: string;
    actorId: string;
    expectedVersion: number;
    changes: CmsChange[];
    message?: string;
    advancedMode?: boolean;
  }): Promise<CmsPatchResult> {
    const page = await cmsRepository.getPageBySlug(params.slug);
    if (!page) throw new Error("NOT_FOUND");

    if (page.currentVersion !== params.expectedVersion) {
      throw new Error("CONFLICT_VERSION");
    }

    const operationSummary: string[] = [];
    const nextContent = params.changes.reduce<Record<string, unknown>>((acc, change) => {
      assertChangePathAllowed(params.slug, change.path);
      switch (change.op) {
        case "set":
          if (change.type === "link") assertSafeLinkValue(change.value);
          operationSummary.push(`Updated ${change.path}`);
          return setByPath(acc, change.path, change.value);
        case "list_add":
          operationSummary.push(`Added item to ${change.path}`);
          return updateListAtPath(acc, change.path, { kind: "add", value: change.value });
        case "list_update":
          operationSummary.push(`Updated item #${change.index + 1} in ${change.path}`);
          return updateListAtPath(acc, change.path, { kind: "update", index: change.index, value: change.value });
        case "list_remove":
          operationSummary.push(`Removed item #${change.index + 1} from ${change.path}`);
          return updateListAtPath(acc, change.path, { kind: "remove", index: change.index });
        case "list_move":
          operationSummary.push(`Moved item in ${change.path} (${change.fromIndex + 1} -> ${change.toIndex + 1})`);
          return updateListAtPath(acc, change.path, {
            kind: "move",
            fromIndex: change.fromIndex,
            toIndex: change.toIndex,
          });
      }
    }, page.content);

    const contentDiff = diffPaths(
      page.content,
      nextContent,
      [...new Set(params.changes.map((item) => item.path))],
    );

    if (contentDiff.length === 0) {
      return { skipped: true, reason: "NO_CHANGES", page };
    }

    const now = cmsRepository.nowIso();
    const revision = {
      id: cmsRepository.createId("rev"),
      pageId: page.id,
      version: page.currentVersion + 1,
      contentSnapshot: nextContent,
      contentDiff,
      changedPaths: contentDiff.map((item) => item.path),
      summary: params.message ?? `Updated ${contentDiff.length} fields`,
      actorId: params.actorId,
      workflowState: (params.advancedMode ? "IN_REVIEW" : "DRAFT") as CmsWorkflowState,
      createdAt: now,
    };

    const updatedPage = {
      ...page,
      currentRevisionId: revision.id,
      currentVersion: revision.version,
      content: nextContent,
      updatedAt: now,
      updatedBy: params.actorId,
      status: revision.workflowState,
    };

    await cmsRepository.withTransaction(async (tx) => {
      const latestPage = await cmsRepository.getPageBySlug(params.slug, tx);
      if (!latestPage) throw new Error("NOT_FOUND");
      if (latestPage.currentVersion !== params.expectedVersion) throw new Error("CONFLICT_VERSION");

      await cmsRepository.appendRevision(revision, tx);
      await cmsRepository.updatePage(updatedPage, tx);
      await cmsRepository.appendAudit(
        {
          id: cmsRepository.createId("audit"),
          pageId: page.id,
          revisionId: revision.id,
          actorId: params.actorId,
          action: "SAVE_DRAFT",
          changedPaths: revision.changedPaths,
          meta: { summary: revision.summary },
          createdAt: now,
        },
        tx,
      );
    });

    return { skipped: false, page: updatedPage, revision, operationSummary };
  },

  async listRevisionsBySlug(slug: string) {
    const page = await cmsRepository.getPageBySlug(slug);
    if (!page) throw new Error("NOT_FOUND");
    return cmsRepository.listRevisions(page.id);
  },

  async publishBySlug(params: {
    slug: string;
    actorId: string;
    role: CmsRole;
    revisionId?: string;
    scheduleAt?: string;
    expiryAt?: string;
    advancedMode?: boolean;
  }) {
    if (!canPublish(params.role)) throw new Error("FORBIDDEN");

    const page = await cmsRepository.getPageBySlug(params.slug);
    if (!page) throw new Error("NOT_FOUND");

    const revision = params.revisionId
      ? await cmsRepository.getRevision(page.id, params.revisionId)
      : await cmsRepository.getRevision(page.id, page.currentRevisionId);

    if (!revision) throw new Error("NOT_FOUND");

    const now = cmsRepository.nowIso();
    const nowDate = new Date(now);
    const scheduleAtDate = params.scheduleAt ? new Date(params.scheduleAt) : null;
    const expiryAtDate = params.expiryAt ? new Date(params.expiryAt) : null;

    if (scheduleAtDate && Number.isNaN(scheduleAtDate.getTime())) throw new Error("INVALID_SCHEDULE_RANGE");
    if (expiryAtDate && Number.isNaN(expiryAtDate.getTime())) throw new Error("INVALID_SCHEDULE_RANGE");
    if (scheduleAtDate && expiryAtDate && expiryAtDate <= scheduleAtDate) throw new Error("INVALID_SCHEDULE_RANGE");
    if (!scheduleAtDate && expiryAtDate && expiryAtDate <= nowDate) throw new Error("INVALID_SCHEDULE_RANGE");
    if (scheduleAtDate && scheduleAtDate <= nowDate) throw new Error("INVALID_SCHEDULE_RANGE");

    const shouldSchedule = Boolean(scheduleAtDate);
    const nextState: CmsWorkflowState = shouldSchedule
      ? "APPROVED"
      : params.advancedMode
        ? "APPROVED"
        : "PUBLISHED";

    const updatedPage = {
      ...page,
      content: revision.contentSnapshot,
      currentRevisionId: revision.id,
      status: nextState,
      updatedAt: now,
      updatedBy: params.actorId,
    };

    await cmsRepository.withTransaction(async (tx) => {
      const latestPage = await cmsRepository.getPageBySlug(params.slug, tx);
      if (!latestPage) throw new Error("NOT_FOUND");
      if (latestPage.currentVersion !== page.currentVersion) throw new Error("CONFLICT_VERSION");

      await cmsRepository.updatePage(updatedPage, tx);
      if (shouldSchedule && scheduleAtDate) {
        await cmsRepository.createSchedule(
          {
            id: cmsRepository.createId("sch"),
            pageId: page.id,
            revisionId: revision.id,
            publishAt: scheduleAtDate.toISOString(),
            expireAt: expiryAtDate ? expiryAtDate.toISOString() : null,
            status: "PENDING",
            createdBy: params.actorId,
            createdAt: now,
          },
          tx,
        );
      }
      await cmsRepository.appendAudit(
        {
          id: cmsRepository.createId("audit"),
          pageId: page.id,
          revisionId: revision.id,
          actorId: params.actorId,
          action: "PUBLISH",
          changedPaths: revision.changedPaths,
          meta: {
            nextState,
            scheduled: shouldSchedule,
            scheduleAt: scheduleAtDate ? scheduleAtDate.toISOString() : null,
            expiryAt: expiryAtDate ? expiryAtDate.toISOString() : null,
          },
          createdAt: now,
        },
        tx,
      );
    });

    return { page: updatedPage, revision };
  },

  async rollbackBySlug(params: { slug: string; actorId: string; revisionId: string; reason?: string }) {
    const page = await cmsRepository.getPageBySlug(params.slug);
    if (!page) throw new Error("NOT_FOUND");

    const target = await cmsRepository.getRevision(page.id, params.revisionId);
    if (!target) throw new Error("NOT_FOUND");

    const now = cmsRepository.nowIso();
    const version = page.currentVersion + 1;
    const rollbackRevision = {
      id: cmsRepository.createId("rev"),
      pageId: page.id,
      version,
      contentSnapshot: target.contentSnapshot,
      contentDiff: [
        {
          path: "*",
          before: page.content,
          after: target.contentSnapshot,
        },
      ],
      changedPaths: ["*"],
      summary: params.reason ?? `Rollback to revision ${target.version}`,
      actorId: params.actorId,
      workflowState: "ROLLED_BACK" as CmsWorkflowState,
      createdAt: now,
    };

    const updatedPage = {
      ...page,
      content: target.contentSnapshot,
      currentRevisionId: rollbackRevision.id,
      currentVersion: version,
      status: "DRAFT" as CmsWorkflowState,
      updatedAt: now,
      updatedBy: params.actorId,
    };

    await cmsRepository.withTransaction(async (tx) => {
      const latestPage = await cmsRepository.getPageBySlug(params.slug, tx);
      if (!latestPage) throw new Error("NOT_FOUND");
      if (latestPage.currentVersion !== page.currentVersion) throw new Error("CONFLICT_VERSION");

      await cmsRepository.appendRevision(rollbackRevision, tx);
      await cmsRepository.updatePage(updatedPage, tx);
      await cmsRepository.appendAudit(
        {
          id: cmsRepository.createId("audit"),
          pageId: page.id,
          revisionId: rollbackRevision.id,
          actorId: params.actorId,
          action: "ROLLBACK",
          changedPaths: rollbackRevision.changedPaths,
          meta: { sourceRevisionId: target.id },
          createdAt: now,
        },
        tx,
      );
    });

    return { page: updatedPage, revision: rollbackRevision };
  },

  async auditBySlug(slug: string, filters: { actor?: string; path?: string; from?: string; to?: string }) {
    const page = await cmsRepository.getPageBySlug(slug);
    if (!page) throw new Error("NOT_FOUND");

    return (await cmsRepository.listAudit(page.id)).filter((item) => {
      if (filters.actor && item.actorId !== filters.actor) return false;
      if (filters.path && !item.changedPaths.some((path) => path.includes(filters.path as string))) return false;
      if (filters.from && item.createdAt < filters.from) return false;
      if (filters.to && item.createdAt > filters.to) return false;
      return true;
    });
  },

  async createMediaAsset(params: {
    url: string;
    key: string;
    mime: string;
    sizeBytes: number;
    altText: string;
    createdBy: string;
  }) {
    const now = cmsRepository.nowIso();
    return cmsRepository.createMediaAsset({
      id: cmsRepository.createId("media"),
      url: params.url,
      key: params.key,
      mime: params.mime,
      sizeBytes: params.sizeBytes,
      altText: params.altText,
      createdBy: params.createdBy,
      createdAt: now,
    });
  },

  async listMediaAssets() {
    return cmsRepository.listMediaAssets();
  },
};
