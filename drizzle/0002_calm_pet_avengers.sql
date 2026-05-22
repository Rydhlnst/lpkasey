CREATE UNIQUE INDEX "cms_media_assets_key_unique" ON "cms_media_assets" USING btree ("key");
--> statement-breakpoint
ALTER TABLE "cms_audit_logs" ADD CONSTRAINT "cms_audit_logs_action_check" CHECK ("cms_audit_logs"."action" in ('SAVE_DRAFT','PUBLISH','ROLLBACK'));
--> statement-breakpoint
ALTER TABLE "cms_media_assets" ADD CONSTRAINT "cms_media_assets_size_bytes_check" CHECK ("cms_media_assets"."size_bytes" > 0);
--> statement-breakpoint
ALTER TABLE "cms_pages" ADD CONSTRAINT "cms_pages_status_check" CHECK ("cms_pages"."status" in ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','ROLLED_BACK','EXPIRED'));
--> statement-breakpoint
ALTER TABLE "cms_revisions" ADD CONSTRAINT "cms_revisions_workflow_state_check" CHECK ("cms_revisions"."workflow_state" in ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','ROLLED_BACK','EXPIRED'));
--> statement-breakpoint
ALTER TABLE "cms_schedules" ADD CONSTRAINT "cms_schedules_status_check" CHECK ("cms_schedules"."status" in ('PENDING','PUBLISHED','EXPIRED','CANCELLED'));
--> statement-breakpoint
ALTER TABLE "cms_schedules" ADD CONSTRAINT "cms_schedules_expire_after_publish_check" CHECK ("cms_schedules"."expire_at" is null or "cms_schedules"."expire_at" > "cms_schedules"."publish_at");
