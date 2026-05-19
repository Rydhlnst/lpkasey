import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Legal
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Terms & Conditions</h1>
        <p className="text-base leading-8 text-muted-foreground">
          These terms describe the general conditions for using Te Pae O Te Rangi services and website content.
          By engaging with our programmes, contact channels, or digital pages, you agree to respectful and lawful use.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Programme availability, session timing, and support scope may change over time. We encourage all visitors
          to confirm current details through our contact team before making commitments.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          For specific guidance related to bookings, cancellations, and referrals, please contact us directly.
        </p>
        <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline">
          Contact our team
        </Link>
      </Container>
    </section>
  );
}

