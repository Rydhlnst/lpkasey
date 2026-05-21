import { cn } from "@/lib/utils";

export type PillarTone = "blue" | "red" | "yellow" | "green";

const PILLAR_TONE_BATIK_MAP: Record<PillarTone, { base: string; overlay: string; pattern: string }> = {
  blue: {
    base: "bg-[var(--color-pillar-blue)]/18",
    overlay: "from-[rgba(82,170,201,0.36)] via-[rgba(82,170,201,0.14)] to-transparent",
    pattern:
      "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.24)_0,rgba(255,255,255,0.24)_3px,transparent_3px,transparent_18px),repeating-linear-gradient(135deg,transparent_0,transparent_9px,rgba(255,255,255,0.14)_9px,rgba(255,255,255,0.14)_12px,transparent_12px,transparent_24px)] bg-[length:48px_48px]",
  },
  red: {
    base: "bg-[var(--color-pillar-red)]/18",
    overlay: "from-[rgba(196,111,98,0.36)] via-[rgba(196,111,98,0.14)] to-transparent",
    pattern:
      "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_2px,transparent_2px,transparent_14px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.14)_0,rgba(255,255,255,0.14)_2px,transparent_2px,transparent_16px),linear-gradient(0deg,transparent_0,transparent_38%,rgba(255,255,255,0.11)_38%,rgba(255,255,255,0.11)_62%,transparent_62%,transparent_100%)] bg-[length:42px_42px]",
  },
  yellow: {
    base: "bg-[var(--color-pillar-yellow)]/20",
    overlay: "from-[rgba(210,171,79,0.34)] via-[rgba(210,171,79,0.12)] to-transparent",
    pattern:
      "bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_12%,transparent_12%,transparent_38%,rgba(255,255,255,0.2)_38%,rgba(255,255,255,0.2)_62%,transparent_62%,transparent_88%,rgba(255,255,255,0.2)_88%),linear-gradient(-45deg,rgba(255,255,255,0.14)_12%,transparent_12%,transparent_38%,rgba(255,255,255,0.14)_38%,rgba(255,255,255,0.14)_62%,transparent_62%,transparent_88%,rgba(255,255,255,0.14)_88%)] bg-[length:40px_40px]",
  },
  green: {
    base: "bg-[var(--color-pillar-green)]/18",
    overlay: "from-[rgba(111,150,126,0.36)] via-[rgba(111,150,126,0.14)] to-transparent",
    pattern:
      "bg-[radial-gradient(ellipse_14px_10px_at_25%_25%,rgba(255,255,255,0.26)_0,rgba(255,255,255,0.26)_35%,transparent_36%),radial-gradient(ellipse_14px_10px_at_75%_75%,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_35%,transparent_36%),repeating-linear-gradient(45deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_2px,transparent_2px,transparent_14px)] bg-[length:56px_56px]",
  },
};

type PillarColorImageProps = {
  tone: PillarTone;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function PillarColorImage({ tone, className, imageClassName, priority = false }: PillarColorImageProps) {
  void priority;
  const toneStyle = PILLAR_TONE_BATIK_MAP[tone];
  return (
    <div
      aria-label={`${tone} pillar motif`}
      role="img"
      className={cn(
        "relative h-16 w-16 overflow-hidden border border-white/40 shadow-inner shadow-black/8",
        "before:absolute before:inset-0 before:bg-gradient-to-tr before:content-['']",
        toneStyle.base,
        className
      )}
    >
      <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-tr", toneStyle.overlay)} />
      <div aria-hidden className={cn("absolute inset-0 opacity-90", toneStyle.pattern, imageClassName)} />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.36),transparent_40%),radial-gradient(circle_at_78%_74%,rgba(255,255,255,0.22),transparent_45%)]" />
    </div>
  );
}
