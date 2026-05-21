import { Container } from "@/components/layout/container";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";

export function PodcastHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              <EditableText path="home.podcastHero.badge" fallback="Podcast Experience" />
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <EditableText path="home.podcastHero.title" fallback="Find and listen your favorite artist podcast here!" />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              <EditableText
                path="home.podcastHero.description"
                fallback="The best podcast websites communicate a feel and make it easy for visitors to discover your podcast."
              />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="inline-flex min-h-11 items-center px-8">
                <EditableText path="home.podcastHero.ctaPrimary" fallback="Get Started" />
              </span>
              <span className="inline-flex min-h-11 items-center px-6 text-foreground">
                <EditableText path="home.podcastHero.ctaSecondary" fallback="Explore channels" />
              </span>
            </div>
          </div>
          <EditableMedia
            path="home.podcastHero.mediaMain"
            type="image"
            emptyLabel="Podcast hero image"
            className="relative aspect-video w-full overflow-hidden border border-border/50 bg-card/40 shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
          />
        </div>
      </Container>
    </section>
  );
}
