import Link from "next/link";
import { ArrowRight, HeartPulse, Leaf, Shield, Waves } from "lucide-react";

const colorIconMap = {
  blue: Waves,
  red: HeartPulse,
  yellow: Shield,
  green: Leaf,
} as const;

const colorSurfaceMap = {
  blue: {
    base: "bg-[var(--color-blue-soft)]",
    hover: "hover:bg-[var(--color-blue-soft)]/85",
    overlay:
      "from-[rgba(82,170,201,0.42)] via-[rgba(82,170,201,0.18)] to-transparent",
    pattern:
      "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_10px,transparent_10px,transparent_22px)]",
  },
  red: {
    base: "bg-[var(--color-red-soft)]",
    hover: "hover:bg-[var(--color-red-soft)]/85",
    overlay:
      "from-[rgba(196,111,98,0.4)] via-[rgba(196,111,98,0.18)] to-transparent",
    pattern:
      "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_11px,transparent_11px,transparent_24px)]",
  },
  yellow: {
    base: "bg-[var(--color-yellow-soft)]",
    hover: "hover:bg-[var(--color-yellow-soft)]/85",
    overlay:
      "from-[rgba(210,171,79,0.4)] via-[rgba(210,171,79,0.18)] to-transparent",
    pattern:
      "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.2)_0,rgba(255,255,255,0.2)_12px,transparent_12px,transparent_25px)]",
  },
  green: {
    base: "bg-[var(--color-green-soft)]",
    hover: "hover:bg-[var(--color-green-soft)]/85",
    overlay:
      "from-[rgba(111,150,126,0.42)] via-[rgba(111,150,126,0.2)] to-transparent",
    pattern:
      "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.17)_0,rgba(255,255,255,0.17)_10px,transparent_10px,transparent_22px)]",
  },
} as const;

export interface LeadershipCardProps {
  name: string;
  colorLabel: string;
  element: string;
  role: string;
  color: keyof typeof colorIconMap;
  featured?: boolean;
}

export function LeadershipCard({ name, colorLabel, element, role, color, featured = false }: LeadershipCardProps) {
  const Icon = colorIconMap[color];
  const surface = colorSurfaceMap[color];

  return (
    <article
      className={[
        "group relative flex min-h-[420px] flex-col overflow-hidden rounded-sm p-5 text-left transition-all duration-300 sm:min-h-[440px]",
        "hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(18,18,18,0.12)]",
        surface.base,
        surface.hover,
        featured ? "shadow-[0_14px_30px_rgba(18,18,18,0.12)]" : "shadow-[0_8px_18px_rgba(18,18,18,0.08)]",
      ].join(" ")}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 z-0 opacity-0 transition-all duration-500 ease-out",
          "bg-gradient-to-tr",
          "translate-x-[-65%] translate-y-[65%] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
          surface.overlay,
        ].join(" ")}
      />
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 z-0 opacity-0 transition-all duration-700 ease-out",
          "translate-x-[-75%] translate-y-[75%] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
          surface.pattern,
        ].join(" ")}
      />

      <div className="relative z-10">
        <h3 className="font-display text-2xl leading-tight font-semibold text-[var(--hero-black)]">{name}</h3>
        <p className="mt-2 font-serif text-base text-[var(--hero-text)]">{element}</p>
        <p className="mt-1 font-serif text-sm text-[var(--hero-text)]/90">{role}</p>
        <p className="mt-3 inline-block border border-[var(--hero-black)]/15 px-2 py-1 font-display text-xs tracking-wide text-[var(--hero-main)] uppercase">
          {colorLabel}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex flex-1 items-end justify-center">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/10 to-transparent" aria-hidden />
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white/65 shadow-inner shadow-black/10">
          <Icon className="h-14 w-14 text-[var(--hero-black)]/80" aria-hidden />
        </div>
      </div>

      <Link
        href="/services"
        aria-label={`Lihat detail ${name}`}
        className="relative z-10 mt-5 inline-flex h-12 w-12 items-center justify-center border border-[var(--hero-black)]/20 bg-white/85 text-[var(--hero-black)] transition-colors duration-200 hover:bg-white"
      >
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Link>
    </article>
  );
}
