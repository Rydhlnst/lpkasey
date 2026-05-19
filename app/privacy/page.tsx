import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl space-y-6">
        <p className="inline-flex w-fit bg-muted px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
          Legal
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="text-base leading-8 text-muted-foreground">
          We respect your privacy and only collect information needed to respond to enquiries, coordinate programmes,
          and provide support services effectively.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Personal information shared through forms, messages, or session coordination is handled with care and is
          not sold to third parties. Access is limited to relevant team members and trusted service providers.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          If you would like to request updates or removal of personal information, please contact us directly.
        </p>
        <Link href="/contact" className="inline-flex text-sm font-semibold text-primary hover:underline">
          Request privacy support
        </Link>
      </Container>
    </section>
  );
}

