import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function CommunitySupportProgrammePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-5xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Programme Detail
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Community Support</h1>
        <p className="text-base leading-8 text-muted-foreground">
          Community Support connects individuals, whanau, and groups with trusted spaces for conversation,
          accountability, and practical guidance during difficult seasons.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          The focus is on restoring belonging, reducing isolation, and creating sustainable support networks through
          consistent group care and culturally safe facilitation.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/community-support" className="inline-flex text-sm font-semibold text-primary hover:underline">
            Explore community support page
          </Link>
          <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline">
            Enquire about this programme
          </Link>
        </div>
      </Container>
    </section>
  );
}

