import type { PillarTone } from "@/components/shared/pillar-color-image";

export const PROFILE_IMAGES_BY_TONE: Record<PillarTone, string[]> = {
  blue: ["/assets/Blue1.jpeg", "/assets/Blue2.jpeg"],
  red: ["/assets/Red1.jpeg"],
  yellow: ["/assets/Yellow1.jpeg"],
  green: ["/assets/Green1.jpeg", "/assets/Green2.jpeg", "/assets/Green3.jpeg", "/assets/Green4.jpeg"],
};

export function getProfileImagesByTone(tone: PillarTone) {
  return PROFILE_IMAGES_BY_TONE[tone] ?? [];
}
