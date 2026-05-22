import { sql } from "drizzle-orm";
import { check, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const cmsPages = pgTable(
  "cms_pages",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    currentRevisionId: text("current_revision_id").notNull(),
    currentVersion: integer("current_version").notNull().default(1),
    status: text("status").notNull(),
    updatedBy: text("updated_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    slugUnique: uniqueIndex("cms_pages_slug_unique").on(table.slug),
    statusCheck: check("cms_pages_status_check", sql`${table.status} in ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','ROLLED_BACK','EXPIRED')`),
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
    workflowStateCheck: check("cms_revisions_workflow_state_check", sql`${table.workflowState} in ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','ROLLED_BACK','EXPIRED')`),
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
    actionCheck: check("cms_audit_logs_action_check", sql`${table.action} in ('SAVE_DRAFT','PUBLISH','ROLLBACK')`),
  }),
);

export const cmsMediaAssets = pgTable(
  "cms_media_assets",
  {
    id: text("id").primaryKey(),
    url: text("url").notNull(),
    key: text("key").notNull(),
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
    keyUnique: uniqueIndex("cms_media_assets_key_unique").on(table.key),
    sizeCheck: check("cms_media_assets_size_bytes_check", sql`${table.sizeBytes} > 0`),
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
    statusCheck: check("cms_schedules_status_check", sql`${table.status} in ('PENDING','PUBLISHED','EXPIRED','CANCELLED')`),
    expireAfterPublishCheck: check("cms_schedules_expire_after_publish_check", sql`${table.expireAt} is null or ${table.expireAt} > ${table.publishAt}`),
  }),
);
