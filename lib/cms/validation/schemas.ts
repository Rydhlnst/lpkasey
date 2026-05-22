import { z } from "zod";

const allowedProtocols = ["http:", "https:", "mailto:", "tel:"] as const;

export function isSafeHref(raw: string): boolean {
  if (raw.startsWith("/")) return true;
  try {
    const url = new URL(raw);
    if (url.protocol === "javascript:") return false;
    return allowedProtocols.includes(url.protocol as (typeof allowedProtocols)[number]);
  } catch {
    if (raw.startsWith("mailto:") || raw.startsWith("tel:")) return true;
    return false;
  }
}

const cmsSetChangeSchema = z.object({
  op: z.literal("set"),
  path: z.string().min(1),
  value: z.unknown(),
  type: z.enum(["text", "textarea", "markdown", "image", "video", "link"]),
});

const cmsListAddChangeSchema = z.object({
  op: z.literal("list_add"),
  path: z.string().min(1),
  value: z.unknown(),
});

const cmsListUpdateChangeSchema = z.object({
  op: z.literal("list_update"),
  path: z.string().min(1),
  index: z.number().int().min(0),
  value: z.unknown(),
});

const cmsListRemoveChangeSchema = z.object({
  op: z.literal("list_remove"),
  path: z.string().min(1),
  index: z.number().int().min(0),
});

const cmsListMoveChangeSchema = z.object({
  op: z.literal("list_move"),
  path: z.string().min(1),
  fromIndex: z.number().int().min(0),
  toIndex: z.number().int().min(0),
});

export const cmsChangeSchema = z.union([
  cmsSetChangeSchema,
  cmsListAddChangeSchema,
  cmsListUpdateChangeSchema,
  cmsListRemoveChangeSchema,
  cmsListMoveChangeSchema,
]);

export const cmsPatchSchema = z.object({
  expectedVersion: z.number().int().min(1),
  changes: z.array(cmsChangeSchema).min(1),
  message: z.string().max(200).optional(),
});

export const publishSchema = z
  .object({
    revisionId: z.string().optional(),
    scheduleAt: z.string().datetime().optional(),
    expiryAt: z.string().datetime().optional(),
    advancedMode: z.boolean().optional().default(false),
  })
  .superRefine((value, ctx) => {
    if (!value.scheduleAt || !value.expiryAt) return;
    const scheduleAt = new Date(value.scheduleAt);
    const expiryAt = new Date(value.expiryAt);
    if (Number.isNaN(scheduleAt.getTime()) || Number.isNaN(expiryAt.getTime()) || expiryAt <= scheduleAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "expiryAt must be later than scheduleAt",
        path: ["expiryAt"],
      });
    }
  });

export const rollbackSchema = z.object({
  revisionId: z.string(),
  reason: z.string().min(3).max(200).optional(),
});

export const auditQuerySchema = z.object({
  actor: z.string().optional(),
  path: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export const mediaUploadSchema = z.object({
  mediaType: z.enum(["image", "video"]).default("image"),
  altText: z.string().min(3).max(140),
});

export function assertMediaFileRules(file: File, mediaType: "image" | "video") {
  const imageMime = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"];
  const videoMime = ["video/mp4", "video/webm", "video/quicktime"];
  const allowedMime = mediaType === "image" ? imageMime : videoMime;
  const maxBytes = mediaType === "image" ? 10 * 1024 * 1024 : 60 * 1024 * 1024;

  if (!allowedMime.includes(file.type)) {
    throw new Error("MEDIA_TYPE_NOT_ALLOWED");
  }

  if (file.size > maxBytes) {
    throw new Error("MEDIA_TOO_LARGE");
  }
}

export function assertSafeLinkValue(value: unknown) {
  if (typeof value !== "object" || value === null) return;
  const href = (value as { href?: unknown }).href;
  if (typeof href !== "string") return;
  if (!isSafeHref(href)) {
    throw new Error("UNSAFE_URL");
  }
}

const ALLOWED_PATH_PREFIX_REGISTRY: Record<string, string[]> = {
  home: [
    "hero",
    "links",
    "site",
    "home.whoWeSupport",
    "home.hero",
    "home.heroPillars",
    "home.navbar",
    "home.footer",
    "home.genericHero",
    "home.aboutSection",
    "home.podcastHero",
    "home.ctaSection",
    "home.whoWeSupportHeader",
    "home.ourApproach",
    "home.ourApproachHeader",
    "home.programmeSummary",
    "home.programmeSummaryHeader",
    "home.whyItMatters",
    "home.whyItMattersHeader",
    "home.impact",
    "home.about",
    "home.communitySupport",
    "home.services",
    "home.contact",
    "home.visionMission",
    "home.valuesFramework",
    "home.leadershipPillars",
    "home.featuredCategories",
    "home.teamSpotlight",
  ],
  about: [
    "home.about",
    "home.aboutSection",
    "home.leadershipPillars",
  ],
  "community-support": [
    "home.communitySupport",
  ],
  contact: [
    "home.contact",
  ],
  services: [
    "home.services",
  ],
  privacy: ["content"],
  terms: ["content"],
  "cookie-preferences": ["content"],
  "programmes-leadership-identity": ["content"],
  "programmes-healing-wellbeing": ["content"],
  "programmes-cultural-frameworks": ["content"],
  "programmes-community-support": ["content"],
  "about-ariki": ["content"],
  "about-tohunga": ["content"],
  "about-mangotoa": ["content"],
  "about-aronui": ["content"],
  "members-ariki": ["content"],
  "members-tohunga": ["content"],
  "members-mangotoa": ["content"],
  "members-aronui": ["content"],
};

export function assertChangePathAllowed(slug: string, path: string) {
  const allowedPrefixes = ALLOWED_PATH_PREFIX_REGISTRY[slug];
  if (!allowedPrefixes?.length) throw new Error("INVALID_CONTENT_PATH");

  if (!allowedPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}.`))) {
    throw new Error("INVALID_CONTENT_PATH");
  }
}
