import Image from "next/image";
import { cn } from "@/lib/utils";

export type PillarTone = "blue" | "red" | "yellow" | "green";

const PILLAR_TONE_IMAGE_MAP: Record<PillarTone, string> = {
  blue: "/assets/biru-removebg-preview-Picsart-AiImageEnhancer.png",
  red: "/assets/merah-removebg-preview-Picsart-AiImageEnhancer.png",
  yellow: "/assets/kuning-removebg-preview-Picsart-AiImageEnhancer.png",
  green: "/assets/hijau-removebg-preview-Picsart-AiImageEnhancer.png",
};

type PillarColorImageProps = {
  tone: PillarTone;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function PillarColorImage({ tone, className, imageClassName, priority = false }: PillarColorImageProps) {
  return (
    <div className={cn("relative h-16 w-16 overflow-hidden", className)}>
      <Image
        src={PILLAR_TONE_IMAGE_MAP[tone]}
        alt={`${tone} pillar visual`}
        fill
        className={cn("object-contain", imageClassName)}
        sizes="64px"
        priority={priority}
      />
    </div>
  );
}
