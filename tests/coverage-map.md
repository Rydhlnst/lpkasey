# Test Coverage Map - CMS Inline Editor v1

| ID Skenario | Deskripsi | Target | Status |
|---|---|---|---|
| AC-01-HAPPY | Path-based update nested field berhasil | `lib/cms/revision-engine/diff.ts#setByPath` | OK Covered |
| AC-01-EDGE-1 | No-change diff tidak membuat perubahan | `lib/cms/revision-engine/diff.ts#diffPaths` | OK Covered |
| AC-02-HAPPY | URL protocol aman diterima (`https/http/mailto/tel` + internal path) | `lib/cms/validation/schemas.ts#isSafeHref` | OK Covered |
| AC-02-EDGE-1 | Protocol berbahaya `javascript:` ditolak | `lib/cms/validation/schemas.ts#isSafeHref` | OK Covered |
| AC-03-HAPPY | PATCH membuat revision baru saat ada perubahan | `lib/cms/service/cms-service.ts#patchPageBySlug` | OK Covered |
| AC-03-BOUND-1 | Idempotent save: no-change => no new revision | `lib/cms/service/cms-service.ts#patchPageBySlug` | OK Covered |
| AC-04-HAPPY | Publish latest revision by role owner/reviewer | `lib/cms/service/cms-service.ts#publishBySlug` | ERR Not Covered |
| AC-05-HAPPY | Rollback membuat revision baru tanpa mutate histori lama | `lib/cms/service/cms-service.ts#rollbackBySlug` | ERR Not Covered |
| AC-06-EDGE-1 | Concurrency conflict (`expectedVersion` mismatch) me-return `CONFLICT_VERSION` | `lib/cms/service/cms-service.ts#patchPageBySlug` | ERR Not Covered |
| AC-07-HAPPY | Audit filter by actor/path/time | `lib/cms/service/cms-service.ts#auditBySlug` | ERR Not Covered |

## Success Index
- Total skenario PRD: 10
- Ter-cover: 6
- Success Index: 60%

## Gap yang perlu ditutup
- Tambah unit test untuk publish/rollback/conflict/audit filter.
- Tambah integration test untuk route handler (`GET/PATCH/publish/rollback/audit`) dengan auth header dan validasi payload.
- Tambah e2e flow owner non-IT: `Edit -> Save -> Preview -> Publish` termasuk anti-accidental navigation pada link.
