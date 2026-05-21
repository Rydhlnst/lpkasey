import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";
import type {
  CmsAuditRecord,
  CmsMediaAssetRecord,
  CmsPageRecord,
  CmsRevisionRecord,
  CmsWorkflowState,
} from "@/lib/cms/types";

type CmsStore = {
  pages: Map<string, CmsPageRecord>;
  revisions: Map<string, CmsRevisionRecord[]>;
  audits: Map<string, CmsAuditRecord[]>;
  mediaAssets: Map<string, CmsMediaAssetRecord>;
};

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function createPage(slug: string, title: string): CmsPageRecord {
  const pageId = createId("page");
  const revisionId = createId("rev");
  const now = nowIso();
  return {
    id: pageId,
    slug,
    title,
    status: "DRAFT",
    currentRevisionId: revisionId,
    currentVersion: 1,
    content: getDefaultCmsContentBySlug(slug),
    createdAt: now,
    updatedAt: now,
    updatedBy: "system",
    deletedAt: null,
  };
}

const initialPages = [
  createPage("home", "Home"),
  createPage("about", "About"),
  createPage("services", "Services"),
  createPage("contact", "Contact"),
  createPage("community-support", "Community Support"),
  createPage("privacy", "Privacy"),
  createPage("terms", "Terms"),
  createPage("cookie-preferences", "Cookie Preferences"),
  createPage("programmes-leadership-identity", "Programme Leadership & Identity"),
  createPage("programmes-healing-wellbeing", "Programme Healing & Wellbeing"),
  createPage("programmes-cultural-frameworks", "Programme Cultural Frameworks"),
  createPage("programmes-community-support", "Programme Community Support"),
  createPage("about-ariki", "About Ariki"),
  createPage("about-tohunga", "About Tohunga"),
  createPage("about-mangotoa", "About Mangotoa"),
  createPage("about-aronui", "About Aronui"),
  createPage("members-ariki", "Members Ariki"),
  createPage("members-tohunga", "Members Tohunga"),
  createPage("members-mangotoa", "Members Mangotoa"),
  createPage("members-aronui", "Members Aronui"),
];

const store: CmsStore = {
  pages: new Map(initialPages.map((page) => [page.slug, page])),
  revisions: new Map(
    initialPages.map((page) => [
      page.id,
      [
        {
          id: page.currentRevisionId,
          pageId: page.id,
          version: page.currentVersion,
          contentSnapshot: page.content,
          contentDiff: [],
          changedPaths: [],
          summary: "Initial import from constants",
          actorId: "system",
          workflowState: "DRAFT" satisfies CmsWorkflowState,
          createdAt: page.createdAt,
        },
      ],
    ]),
  ),
  audits: new Map(initialPages.map((page) => [page.id, []])),
  mediaAssets: new Map(),
};

export const cmsRepository = {
  async listPages() {
    return [...store.pages.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  },

  async getPageBySlug(slug: string) {
    return store.pages.get(slug) ?? null;
  },

  async updatePage(page: CmsPageRecord) {
    store.pages.set(page.slug, page);
    return page;
  },

  async appendRevision(revision: CmsRevisionRecord) {
    const list = store.revisions.get(revision.pageId) ?? [];
    list.unshift(revision);
    store.revisions.set(revision.pageId, list);
    return revision;
  },

  async listRevisions(pageId: string) {
    return store.revisions.get(pageId) ?? [];
  },

  async getRevision(pageId: string, revisionId: string) {
    return (store.revisions.get(pageId) ?? []).find((revision) => revision.id === revisionId) ?? null;
  },

  async appendAudit(audit: CmsAuditRecord) {
    const list = store.audits.get(audit.pageId) ?? [];
    list.unshift(audit);
    store.audits.set(audit.pageId, list);
    return audit;
  },

  async listAudit(pageId: string) {
    return store.audits.get(pageId) ?? [];
  },

  async createMediaAsset(asset: CmsMediaAssetRecord) {
    store.mediaAssets.set(asset.id, asset);
    return asset;
  },

  async listMediaAssets() {
    return [...store.mediaAssets.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  createId,
  nowIso,
};
