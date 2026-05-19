import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function HealingWellbeingProgrammePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-5xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Programme Detail
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Healing & Wellbeing</h1>
        <p className="text-base leading-8 text-muted-foreground">
          This programme offers culturally grounded healing pathways through music, journaling, and bodywork
          modalities that support emotional regulation, restoration, and reconnection.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Participants are guided in safe spaces where reflection and practical wellbeing habits are developed at a
          pace that respects personal context and lived experience.
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

