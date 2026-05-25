import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { Container } from "@/components/layout/container";

const IMPACT_ITEMS = [
  {
    value: "XXX",
    text: "Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Maori values.",
  },
  {
    value: "XXX",
    text: "We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing.",
  },
  {
    value: "XXX",
    text: "Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whanau, rangatahi, tane, wahine and tamariki to recognise their value, their worth and their potential.",
  },
];

export function AboutSection() {
  return (
    <section id="aboutsection" className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background p-5 sm:p-8">
          <div className="relative z-10 grid gap-6 lg:grid-cols-[320px_1fr]">
            <article className="overflow-hidden rounded-[1.5rem] bg-card">
              <EditableMedia
                path="home.aboutSection.mediaMain"
                type="image"
                emptyLabel="About section image"
                className="h-[300px] w-full rounded-none sm:h-[360px]"
              />
              <div className="space-y-4 p-6">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  <EditableText path="home.aboutSection.cardTitle" fallback="About Section" />
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  <EditableText
                    path="home.aboutSection.cardDescription"
                    fallback="Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Maori values."
                  />
                </p>
              </div>
            </article>

            <div className="space-y-8">
              <div className="max-w-3xl space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  <EditableText path="home.aboutSection.title" fallback="About Te Pae O Te Rangi" />
                </h2>
                <p className="text-lg leading-8 text-foreground/90">
                  <EditableText
                    path="home.aboutSection.description1"
                    fallback="We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing."
                  />
                </p>
                <p className="text-lg leading-8 text-foreground/90">
                  <EditableText
                    path="home.aboutSection.description2"
                    fallback="Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whanau, rangatahi, tane, wahine and tamariki to recognise their value, their worth and their potential."
                  />
                </p>
                <EditableLink
                  path="home.aboutSection.ctaLink"
                  fallback={{ label: "About Us", href: "/about" }}
                  className="inline-flex h-12 items-center rounded-full bg-[var(--color-teal-foundation)] px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {IMPACT_ITEMS.map((item, index) => (
                  <article key={item.value} className="space-y-4 border-l border-border pl-4 sm:pl-6">
                    <p className="border-t border-border pt-4 text-lg font-bold leading-none tracking-tight text-foreground whitespace-nowrap break-normal [overflow-wrap:normal] [word-break:keep-all] md:text-lg lg:text-lg xl:text-lg">
                      <EditableText
                        path={`home.aboutSection.metrics.${index}.value`}
                        fallback={item.value}
                        className="!text-lg whitespace-nowrap md:!text-lg lg:!text-lg xl:!text-lg"
                      />
                    </p>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg leading-8 text-muted-foreground">
                      <EditableText path={`home.aboutSection.metrics.${index}.text`} fallback={item.text} />
                    </p>
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
