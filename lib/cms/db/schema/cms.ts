import { index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const cmsPages = pgTable(
  "cms_pages",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    currentRevisionId: text("current_revision_id").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    slugUnique: uniqueIndex("cms_pages_slug_unique").on(table.slug),
  }),
);

export const cmsRevisions = pgTable(
  "cms_revisions",
  {
    id: text("id").primaryKey(),
    pageId: text("page_id").notNull(),
    version: integer("version").notNull(),
    contentSnapshot: jsonb("content_snapshot").notNull(),
    contentDiff: jsonb("content_diff").notNull(),
    changedPaths: text("changed_paths").array().notNull(),
    summary: text("summary").notNull(),
    actorId: text("actor_id").notNull(),
    workflowState: text("workflow_state").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    pageVersionUnique: uniqueIndex("cms_revisions_page_version_unique").on(table.pageId, table.version),
    pageCreatedAtIdx: index("cms_revisions_page_created_at_idx").on(table.pageId, table.createdAt),
    actorIdx: index("cms_revisions_actor_idx").on(table.actorId),
  }),
);

export const cmsAuditLogs = pgTable(
  "cms_audit_logs",
  {
    id: text("id").primaryKey(),
    pageId: text("page_id").notNull(),
    revisionId: text("revision_id").notNull(),
    actorId: text("actor_id").notNull(),
    action: text("action").notNull(),
    changedPaths: text("changed_paths").array().notNull(),
    meta: jsonb("meta").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    pageCreatedAtIdx: index("cms_audit_page_created_at_idx").on(table.pageId, table.createdAt),
    actorIdx: index("cms_audit_actor_idx").on(table.actorId),
  }),
);

export const cmsMediaAssets = pgTable(
  "cms_media_assets",
  {
    id: text("id").primaryKey(),
    url: text("url").notNull(),
    mime: text("mime").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    width: integer("width"),
    height: integer("height"),
    altText: text("alt_text").notNull(),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdx: index("cms_media_created_at_idx").on(table.createdAt),
  }),
);

export const cmsSchedules = pgTable(
  "cms_schedules",
  {
    id: text("id").primaryKey(),
    pageId: text("page_id").notNull(),
    revisionId: text("revision_id").notNull(),
    publishAt: timestamp("publish_at", { withTimezone: true }).notNull(),
    expireAt: timestamp("expire_at", { withTimezone: true }),
    status: text("status").notNull(),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    statusPublishAtIdx: index("cms_schedules_status_publish_at_idx").on(table.status, table.publishAt),
  }),
);
