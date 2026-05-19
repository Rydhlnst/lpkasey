import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function LeadershipIdentityProgrammePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-5xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Programme Detail
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Leadership & Identity</h1>
        <p className="text-base leading-8 text-muted-foreground">
          This pathway supports rangatahi and whanau to strengthen confidence, direction, and identity through
          kaupapa Maori leadership practices and practical development experiences.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Activities include structured mentoring, cultural grounding, and challenge-based learning to build
          resilience, communication, and accountability in daily life.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/services" className="inline-flex text-sm font-semibold text-primary hover:underline">
            View related services
          </Link>
          <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline">
            Enquire about this programme
          </Link>
        </div>
      </Container>
    </section>
  );
}

