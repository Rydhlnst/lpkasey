import Link from "next/link";
import type { CtaItem } from "@/constants/site";
import { GLOBAL_CTA, SITE_CONFIG } from "@/constants/site";
import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  intro?: string;
  meaning?: string;
  phrase?: string;
  phraseSubtitle?: string;
  ctas?: CtaItem[];
  placeholderLabel?: string;
  centered?: boolean;
  className?: string;
}

const DEFAULT_CTAS: CtaItem[] = [
  { label: GLOBAL_CTA.book, href: "/contact" },
  { label: GLOBAL_CTA.join, href: "/services" },
  { label: GLOBAL_CTA.learn, href: "/about" },
  { label: GLOBAL_CTA.contact, href: "/contact" },
];

export function HeroSection({
  title = `${SITE_CONFIG.heroTitle} 💙❤💛💚`,
  subtitle = SITE_CONFIG.heroSubtitle,
  intro = SITE_CONFIG.heroIntro,
  meaning = SITE_CONFIG.heroMeaning,
  phrase = SITE_CONFIG.phrase,
  phraseSubtitle = SITE_CONFIG.phraseSubtitle,
  ctas = DEFAULT_CTAS,
  placeholderLabel = "Image Placeholder",
  centered = false,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden py-16 sm:py-24", className)}>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/40 to-transparent" aria-hidden />
      <Container>
        <div className={cn("grid items-center gap-10 lg:grid-cols-2", centered && "mx-auto max-w-4xl lg:grid-cols-1")}>
          <div className={cn("space-y-5", centered && "text-center")}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
            {subtitle ? <p className="text-lg text-muted-foreground">{subtitle}</p> : null}
            {intro ? <p className="text-base leading-7 text-muted-foreground">{intro}</p> : null}
            {meaning ? <p className="text-base leading-7 text-muted-foreground">{meaning}</p> : null}
            {phrase ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/70 p-4">
                <p className="font-semibold tracking-wide">{phrase}</p>
                {phraseSubtitle ? <p className="text-sm text-muted-foreground">{phraseSubtitle}</p> : null}
              </div>
            ) : null}
            {ctas?.length ? (
              <div className={cn("flex flex-wrap gap-3", centered && "justify-center")}>
                {ctas.map((cta) => (
                  <Button key={cta.href + cta.label} asChild className="min-h-11 rounded-full">
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
          {!centered ? <PlaceholderImage label={placeholderLabel} className="aspect-video w-full" /> : null}
        </div>
      </Container>
    </section>
  );
}
