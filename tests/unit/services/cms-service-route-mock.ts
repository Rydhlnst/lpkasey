import { cmsService } from "@/lib/cms/service/cms-service";

type CmsServiceMutable = typeof cmsService;

export function installCmsServiceRouteMock() {
  const original: Partial<CmsServiceMutable> = {
    listPages: cmsService.listPages,
    getPageBySlug: cmsService.getPageBySlug,
    patchPageBySlug: cmsService.patchPageBySlug,
    listRevisionsBySlug: cmsService.listRevisionsBySlug,
    publishBySlug: cmsService.publishBySlug,
    rollbackBySlug: cmsService.rollbackBySlug,
    auditBySlug: cmsService.auditBySlug,
    createMediaAsset: cmsService.createMediaAsset,
    listMediaAssets: cmsService.listMediaAssets,
  };

  return {
    set<K extends keyof CmsServiceMutable>(key: K, value: CmsServiceMutable[K]) {
      (cmsService[key] as CmsServiceMutable[K]) = value;
    },
    restore() {
      Object.assign(cmsService, original);
    },
  };
}
