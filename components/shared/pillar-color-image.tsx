import Image from "next/image";
import { cn } from "@/lib/utils";

export type PillarTone = "blue" | "red" | "yellow" | "green";

const PILLAR_TONE_IMAGE_MAP: Record<PillarTone, { src: string; alt: string }> = {
  blue: {
    src: "/assets/biru-removebg-preview-Picsart-AiImageEnhancer.png",
    alt: "Blue pillar motif",
  },
  red: {
    src: "/assets/merah-removebg-preview-Picsart-AiImageEnhancer.png",
    alt: "Red pillar motif",
  },
  yellow: {
    src: "/assets/kuning-removebg-preview-Picsart-AiImageEnhancer.png",
    alt: "Yellow pillar motif",
  },
  green: {
    src: "/assets/hijau-removebg-preview-Picsart-AiImageEnhancer.png",
    alt: "Green pillar motif",
  },
};

type PillarColorImageProps = {
  tone: PillarTone;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function PillarColorImage({ tone, className, imageClassName, priority = false }: PillarColorImageProps) {
  const toneImage = PILLAR_TONE_IMAGE_MAP[tone];
  return (
    <div className={cn("relative h-16 w-16", className)}>
      <Image
        src={toneImage.src}
        alt={toneImage.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 35vw, 220px"
        className={cn("object-contain", imageClassName)}
      />
    </div>
  );
}
