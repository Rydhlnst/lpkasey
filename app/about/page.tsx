import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { LeadershipPillarsSection } from "@/components/sections/leadership-pillars-section";
import { Skeleton } from "@/components/ui/skeleton";
import { PHILOSOPHY_CONTENT } from "@/constants/services";

const ABOUT_HIGHLIGHTS = [
  {
    title: "Kaupapa-led Programmes",
    description: "Every offering is grounded in Maori values and practical leadership outcomes.",
  },
  {
    title: "Healing + Action Balance",
    description: "We combine restoration spaces with tangible development tools for daily life.",
  },
  {
    title: "Community-Centred Growth",
    description: "Whanau, rangatahi, and leaders grow together through shared accountability.",
  },
] as const;

const ABOUT_STATS = [
  { value: "8+ Years", label: "Community delivery across programmes and support groups" },
  { value: "23+ Initiatives", label: "Leadership, wellbeing, and cultural reconnection pathways" },
  { value: "4 Pillars", label: "Distinct leadership styles through Te Whiringawha" },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border py-16 sm:py-24">
        <Container>
          <Skeleton className="aspect-[16/7] w-full rounded-none" />

          <div className="mt-8">
            <SectionHeader
              badge="Know More About Us"
              title="Te Pae O Te Rangi is where grounded identity and future possibility meet."
              description="Te Pae O Te Rangi means the meeting place for all to come. It is the space between what is rooted in the land and what is possible in the sky, where people can reconnect safely with identity, confidence, and direction."
              maxWidth="wide"
            />

            <div className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
              <div className="space-y-8">
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  Our kaupapa blends cultural frameworks, practical leadership, and relational healing so people are
                  not treated as problems to fix, but as people with mana and potential to strengthen whanau and
                  community.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {ABOUT_STATS.map((item) => (
                    <article key={item.value} className="border border-border bg-background p-5">
                      <p className="font-display text-3xl font-semibold tracking-tight text-foreground">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 xl:sticky xl:top-24">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <article key={item.title} className="border border-border bg-background p-5">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
                    <p className="mt-2 text-base leading-7 text-muted-foreground">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <Container>
          <SectionHeader
            badge="Guiding Framework"
            title="Te Whiringawha"
            description="A practical philosophy that shapes programme design, healing spaces, and personal leadership development."
          />
          {PHILOSOPHY_CONTENT.intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">
              {paragraph}
            </p>
          ))}

          <h3 className="mt-8 text-xl font-semibold">This framework helps us explore:</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {PHILOSOPHY_CONTENT.explores.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-xl font-semibold">It can also be used as:</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {PHILOSOPHY_CONTENT.isList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-6 text-base leading-8 text-muted-foreground">
            At Te Pae O Te Rangi, this philosophy informs how we design programmes, facilitate healing spaces, and help people recognize their own leadership style.
          </p>
        </Container>
      </section>

      <LeadershipPillarsSection />
    </>
  );
}
