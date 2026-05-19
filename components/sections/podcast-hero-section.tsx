import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function PodcastHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Podcast Experience</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find and listen your favorite artist podcast here!
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            The best podcast websites communicate a feel and make it easy for visitors to discover your podcast.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button className="min-h-11 px-8">Get Started</Button>
            <Button variant="outline" className="min-h-11 border-border bg-background/80 px-6 text-foreground hover:bg-accent/60">
              Explore channels
            </Button>
          </div>
        </div>
          <div className="relative aspect-video w-full overflow-hidden border border-border/50 bg-card/40 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/about-hero-logistics.svg')" }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-background/40" aria-hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}
