import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

const IMPACT_ITEMS = [
  {
    value: "XXX",
    text: "Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Māori values.",
  },
  {
    value: "XXX",
    text: "We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing.",
  },
  {
    value: "XXX",
    text: "Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whānau, rangatahi, tāne, wāhine and tamariki to recognise their value, their worth and their potential.",
  },
];

export function AboutSection() {
  return (
    <section id="aboutsection" className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background p-5 sm:p-8">
          {/* <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border-[28px] border-[var(--color-yellow)] sm:h-56 sm:w-56" /> */}

          <div className="relative z-10 grid gap-6 lg:grid-cols-[320px_1fr]">
            <article className="overflow-hidden rounded-[1.5rem] bg-card">
              <Skeleton className="h-[300px] w-full rounded-none sm:h-[360px]" />
              <div className="space-y-4 p-6">
                <p className="text-2xl font-semibold tracking-tight text-foreground">About Section</p>
                <p className="text-lg leading-8 text-muted-foreground">
                  Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa
                  Māori values.
                </p>
              </div>
            </article>

            <div className="space-y-8">
              <div className="max-w-3xl space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  About Te Pae O Te Rangi
                </h2>
                <p className="text-lg leading-8 text-foreground/90">
                  We believe in creating safe spaces where people can come together to heal, learn, grow,
                  reconnect and strengthen their sense of identity, purpose and wellbeing.
                </p>
                <p className="text-lg leading-8 text-foreground/90">
                  Through leadership, creativity, emotional wellbeing, cultural connection and community support,
                  we empower whānau, rangatahi, tāne, wāhine and tamariki to recognise their value, their worth
                  and their potential.
                </p>
                <Link
                  href="/about"
                  className="inline-flex h-12 items-center rounded-full bg-[var(--color-teal-foundation)] px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
                >
                  About Us
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {IMPACT_ITEMS.map((item) => (
                  <article key={item.value} className="space-y-4 border-l border-border pl-4 sm:pl-6">
                    <p className="border-t border-border pt-4 text-4xl font-bold tracking-tight text-foreground">
                      {item.value}
                    </p>
                    <p className="text-lg leading-8 text-muted-foreground">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { AboutSection as AboutImpactSection };
