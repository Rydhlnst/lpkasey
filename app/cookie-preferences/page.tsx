import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function CookiePreferencesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Legal
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cookie Preferences</h1>
        <p className="text-base leading-8 text-muted-foreground">
          Cookie preferences help you control how this website remembers session settings and measures general
          performance. You can adjust browser-level controls at any time.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Essential cookies may remain active to support core website functionality. Optional analytics or experience
          cookies can be limited through your device and browser settings.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          If you need help understanding available options, our team can guide you.
        </p>
        <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline">
          Ask about cookie settings
        </Link>
      </Container>
    </section>
  );
}

