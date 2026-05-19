import Link from "next/link";
import { CalendarClock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface SupportGroupCardProps {
  title: string;
  subtitle: string;
  type: string;
  schedule: string;
  location: string;
  description: string[];
  bullets?: string[];
  ctaLabel: string;
}

export function SupportGroupCard({
  title,
  subtitle,
  type,
  schedule,
  location,
  description,
  bullets,
  ctaLabel,
}: SupportGroupCardProps) {
  return (
    <Card className="rounded-3xl border-border bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
      <CardHeader className="space-y-3">
        <Badge className="w-fit rounded-full font-body text-[11px] font-semibold tracking-[0.14em] uppercase">{schedule}</Badge>
        <CardTitle className="font-display text-3xl font-bold text-[var(--hero-black)]">{title}</CardTitle>
        <p className="font-serif text-base font-bold text-[var(--hero-text)]">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 font-serif text-base text-[var(--hero-text)]">
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" /> {type}
          </p>
          <p className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" /> {schedule}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {location}
          </p>
        </div>
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
        <Button asChild className="min-h-11 rounded-full font-body font-semibold">
          <Link href="/contact">{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
