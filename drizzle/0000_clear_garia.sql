CREATE TABLE "cms_audit_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"page_id" text NOT NULL,
	"revision_id" text NOT NULL,
	"actor_id" text NOT NULL,
	"action" text NOT NULL,
	"changed_paths" text[] NOT NULL,
	"meta" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cms_media_assets" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"mime" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"width" integer,
	"height" integer,
	"alt_text" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cms_pages" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"current_revision_id" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "cms_revisions" (
	"id" text PRIMARY KEY NOT NULL,
	"page_id" text NOT NULL,
	"version" integer NOT NULL,
	"content_snapshot" jsonb NOT NULL,
	"content_diff" jsonb NOT NULL,
	"changed_paths" text[] NOT NULL,
	"summary" text NOT NULL,
	"actor_id" text NOT NULL,
	"workflow_state" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cms_schedules" (
	"id" text PRIMARY KEY NOT NULL,
	"page_id" text NOT NULL,
	"revision_id" text NOT NULL,
	"publish_at" timestamp with time zone NOT NULL,
	"expire_at" timestamp with time zone,
	"status" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "cms_audit_page_created_at_idx" ON "cms_audit_logs" USING btree ("page_id","created_at");--> statement-breakpoint
CREATE INDEX "cms_audit_actor_idx" ON "cms_audit_logs" USING btree ("actor_id");--> statement-breakpoint
CREATE INDEX "cms_media_created_at_idx" ON "cms_media_assets" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "cms_pages_slug_unique" ON "cms_pages" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "cms_revisions_page_version_unique" ON "cms_revisions" USING btree ("page_id","version");--> statement-breakpoint
CREATE INDEX "cms_revisions_page_created_at_idx" ON "cms_revisions" USING btree ("page_id","created_at");--> statement-breakpoint
CREATE INDEX "cms_revisions_actor_idx" ON "cms_revisions" USING btree ("actor_id");--> statement-breakpoint
CREATE INDEX "cms_schedules_status_publish_at_idx" ON "cms_schedules" USING btree ("status","publish_at");