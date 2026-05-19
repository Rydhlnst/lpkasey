import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function CulturalFrameworksProgrammePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-5xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Programme Detail
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cultural Frameworks</h1>
        <p className="text-base leading-8 text-muted-foreground">
          This pathway explains how Te Whiringawha, Kauae Runga, Kauae Raro, and Tau guide leadership, decision
          making, and wellbeing practices across personal and community contexts.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Participants gain practical language and structure to reflect on behavior, relationships, and growth while
          keeping identity and values at the center.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="inline-flex text-sm font-semibold text-primary hover:underline">
            Explore framework context
          </Link>
          <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline">
            Enquire about this programme
          </Link>
        </div>
      </Container>
    </section>
  );
}

