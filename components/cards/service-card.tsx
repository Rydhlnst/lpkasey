import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface ServiceCardProps {
  title: string;
  category: string;
  description: string[];
  bullets?: string[];
  ctaLabel: string;
  placeholderLabel: string;
}

export function ServiceCard({ title, category, description, bullets, ctaLabel, placeholderLabel }: ServiceCardProps) {
  return (
    <Card className="grid gap-6 rounded-3xl border-border bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] sm:p-6 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <CardHeader className="px-0">
          <Badge variant="outline" className="mb-3 w-fit rounded-full font-body text-[11px] font-semibold tracking-[0.14em] uppercase">
            {category}
          </Badge>
          <CardTitle className="font-display text-3xl leading-tight font-bold text-[var(--hero-black)]">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          {description.map((paragraph) => (
            <p key={paragraph} className="font-serif text-base leading-7 text-[var(--hero-text)]">
              {paragraph}
            </p>
          ))}
          {bullets?.length ? (
            <ul className="list-disc space-y-2 pl-5 font-serif text-base text-[var(--hero-text)]">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          <Button asChild variant="outline" className="min-h-11 rounded-full">
            <Link href="/contact" aria-label={`${ctaLabel} for ${title}`}>
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <Skeleton className="min-h-[240px] w-full rounded-none" />
        <span className="sr-only">{placeholderLabel}</span>
      </div>
    </Card>
  );
}
