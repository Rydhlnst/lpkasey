export const CMS_INLINE_MODE_COOKIE = "cms_inline_mode";

export function isInlineModeEnabled(raw: string | undefined) {
  return raw === "on";
}

