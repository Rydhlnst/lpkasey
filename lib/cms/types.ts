export type CmsWorkflowState =
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "ROLLED_BACK"
  | "EXPIRED";

export type CmsRole = "owner" | "editor" | "reviewer";

export type CmsFieldType = "text" | "textarea" | "markdown" | "image" | "video" | "link";

export type CmsSetChange = {
  op: "set";
  path: string;
  value: unknown;
  type: CmsFieldType;
};

export type CmsListAddChange = {
  op: "list_add";
  path: string;
  value: unknown;
};

export type CmsListUpdateChange = {
  op: "list_update";
  path: string;
  index: number;
  value: unknown;
};

export type CmsListRemoveChange = {
  op: "list_remove";
  path: string;
  index: number;
};

export type CmsListMoveChange = {
  op: "list_move";
  path: string;
  fromIndex: number;
  toIndex: number;
};

export type CmsChange =
  | CmsSetChange
  | CmsListAddChange
  | CmsListUpdateChange
  | CmsListRemoveChange
  | CmsListMoveChange;

export type CmsContent = Record<string, unknown>;

export type CmsPageRecord = {
  id: string;
  slug: string;
  title: string;
  status: CmsWorkflowState;
  currentRevisionId: string;
  currentVersion: number;
  content: CmsContent;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
};

export type CmsRevisionRecord = {
  id: string;
  pageId: string;
  version: number;
  contentSnapshot: CmsContent;
  contentDiff: Array<{ path: string; before: unknown; after: unknown }>;
  changedPaths: string[];
  summary: string;
  actorId: string;
  workflowState: CmsWorkflowState;
  createdAt: string;
};

export type CmsAuditRecord = {
  id: string;
  pageId: string;
  revisionId: string;
  actorId: string;
  action: "SAVE_DRAFT" | "PUBLISH" | "ROLLBACK";
  changedPaths: string[];
  meta: Record<string, unknown>;
  createdAt: string;
};

export type CmsPatchResult = {
  skipped: boolean;
  reason?: "NO_CHANGES";
  page: CmsPageRecord;
  revision?: CmsRevisionRecord;
  operationSummary?: string[];
};

export type CmsMediaAssetRecord = {
  id: string;
  url: string;
  key: string;
  mime: string;
  sizeBytes: number;
  altText: string;
  createdBy: string;
  createdAt: string;
};
