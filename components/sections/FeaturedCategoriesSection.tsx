import { CategoryPillarCard, type CampaignTone } from "@/components/cards/CategoryPillarCard";
import { EditableText } from "@/components/cms-inline/editable-text";
import { Container } from "@/components/layout/container";

type FeaturedCategory = {
  key: string;
  label: string;
  title: string;
  description: string;
  href: string;
  tone: CampaignTone;
};

const featuredCategories: FeaturedCategory[] = [
  {
    key: "arikitanga",
    label: "ARIKI",
    title: "Tumuakitanga",
    description: "Blue / Te Wai: leadership that gives direction, clarity, and identity.",
    href: "/about",
    tone: "blue",
  },
  {
    key: "tohunga",
    label: "TOHUNGA",
    title: "Awatea",
    description: "Red / Te Ahi: the learner's path through knowledge, growth, and discipline.",
    href: "/about",
    tone: "red",
  },
  {
    key: "mangotoa",
    label: "MANGOTOA",
    title: "Tautika",
    description: "Yellow / Te Haa: practical courage, action, and leverage in everyday life.",
    href: "/about",
    tone: "yellow",
  },
  {
    key: "aronui",
    label: "ARONUI",
    title: "Rauemi",
    description: "Green / Papatuanuku: nurturing resources, care, and collective wellbeing.",
    href: "/about",
    tone: "green",
  },
];

export function FeaturedCategoriesSection() {
  return (
    <section className="relative mt-14">
      <Container>
        <div className="h-5 w-full border border-[var(--hero-main)]/45 bg-[var(--hero-main)]/90" />
        <div className="w-full border-x border-b border-[var(--hero-main)]/45 bg-gradient-to-r from-[var(--hero-main)]/95 via-[var(--hero-main)]/85 to-[var(--hero-main)]/95 px-6 py-5 text-center text-white sm:px-10">
          <p className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            <EditableText path="home.featuredCategories.heading" fallback="Featured Categories" />
          </p>
          <div className="mx-auto mt-2 h-px w-44 bg-white/45" aria-hidden="true" />
        </div>

        <div className="-mt-1 w-full border-x border-b border-[var(--hero-main)]/30 bg-white/12 px-2 pb-2 pt-1 sm:px-3">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCategories.map((category, index) => (
              <CategoryPillarCard
                key={category.key}
                label={<EditableText path={`home.featuredCategories.items.${index}.label`} fallback={category.label} />}
                title={<EditableText path={`home.featuredCategories.items.${index}.title`} fallback={category.title} />}
                description={<EditableText path={`home.featuredCategories.items.${index}.description`} fallback={category.description} />}
                linkPath={`home.featuredCategories.items.${index}.link`}
                fallbackLink={{ label: `View ${category.title} Members`, href: category.href }}
                tone={category.tone}
              />
            ))}
          </div>
        </div>
      </Container>

      <div className="pointer-events-none relative left-1/2 mt-4 h-10 w-screen -translate-x-1/2 -rotate-[4deg] border-y border-[var(--hero-main)]/35 bg-[var(--hero-accent)]/95" aria-hidden="true" />
      <div className="pointer-events-none relative left-1/2 -mt-7 h-10 w-screen -translate-x-1/2 rotate-[3deg] border-y border-white/25 bg-[var(--hero-black)]" aria-hidden="true" />
      <div
        className="pointer-events-none relative left-1/2 -mt-2 h-16 w-screen -translate-x-1/2 border-y border-[var(--hero-main)]/35 bg-gradient-to-b from-[var(--hero-main)]/90 to-[var(--hero-main)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none relative left-1/2 h-2 w-screen -translate-x-1/2 bg-[var(--foundation-dark)]/90"
        aria-hidden="true"
      />
    </section>
  );
}
