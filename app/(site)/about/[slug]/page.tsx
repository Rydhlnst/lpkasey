import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CmsPageShell } from "@/components/cms-inline/page-shell";
import { EditableLink } from "@/components/cms-inline/editable-link";
import { EditableText } from "@/components/cms-inline/editable-text";
import { SectionHeader } from "@/components/sections/section-header";
import { TeamMemberSpotlight } from "@/components/sections/team-member-spotlight";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { PillarColorImage, type PillarTone } from "@/components/shared/pillar-color-image";
import { getProfileImagesByTone } from "@/constants/member-profile-images";
import { getDefaultCmsContentBySlug } from "@/lib/cms/content/default-content";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  quote: string;
};

type AboutPillarDetail = {
  slug: string;
  tone: PillarTone;
  name: string;
  title: string;
  description: string;
  label: string;
  overview: string;
  team: TeamMember[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

const PILLAR_TONE_TEXT_CLASS: Record<PillarTone, string> = {
  blue: "text-[#1f4f8e]",
  red: "text-[#b53030]",
  yellow: "text-[#b77705]",
  green: "text-[#2f8f45]",
};

const ABOUT_PILLARS: AboutPillarDetail[] = [
  {
    slug: "ariki",
    tone: "blue",
    name: "Ariki",
    title: "Leader",
    description: "Leadership that gives direction, clarity, and identity.",
    label: "Te Wai - Water Element",
    overview:
      "Ariki leads strategic direction, protects cultural identity, and keeps every initiative aligned with long-term impact.",
    team: [
      {
        name: "Kasey Reihana",
        role: "",
        bio: "David keeps the Ariki direction clear by aligning cultural values with long-term strategy and decision-making priorities.",
        quote: "Leadership works best when direction is clear and people know why their contribution matters.",
      },
      {
        name: "Mātua D",
        role: "",
        bio: "Mitchell builds the systems that turn strategy into practical operating plans teams can execute with confidence.",
        quote: "When the plan is practical, people can act faster and stay focused on impact.",
      },
      {
        name: "Steven Smith",
        role: "",
        bio: "Steven helps connect leadership intent with team accountability, ensuring priorities remain measurable and meaningful.",
        quote: "Consistency grows when vision and accountability move together every day.",
      },
      {
        name: "Glenn Maxwell",
        role: "",
        bio: "Glenn supports cross-division coordination and removes delivery blockers so work keeps momentum.",
        quote: "Great teams are built by removing friction and empowering people to do their best work.",
      },
    ],
    faqs: [
      {
        question: "What does the Ariki division focus on?",
        answer:
          "Ariki focuses on leadership, vision-setting, and decision-making that keeps the organization moving in one direction.",
      },
      {
        question: "How does Ariki support other divisions?",
        answer:
          "The team provides strategic guidance, clarifies priorities, and removes blockers so each division can execute effectively.",
      },
      {
        question: "Why is Ariki important for long-term growth?",
        answer:
          "Ariki anchors long-term planning and ensures that daily operations remain connected to a bigger mission.",
      },
    ],
  },
  {
    slug: "tohunga",
    tone: "red",
    name: "Tohunga",
    title: "Leaner",
    description: "The learner's path through knowledge, growth, and discipline.",
    label: "Te Ahi - Fire Element",
    overview:
      "Tohunga builds capability through practical learning pathways, mentorship, and consistent coaching for sustainable growth.",
    team: [
      {
        name: "Pa Jak",
        role: "",
        bio: "Hana designs learning pathways that are practical, culturally grounded, and easy for participants to apply in daily life.",
        quote: "Learning becomes powerful when people can use it immediately in their own context.",
      },
      {
        name: "Wiremu Tai",
        role: "",
        bio: "Wiremu mentors participants through structured milestones and keeps growth conversations supportive and honest.",
        quote: "Progress is built through regular reflection, clear goals, and steady support.",
      },
      {
        name: "Mere Kauri",
        role: "",
        bio: "Mere coordinates workshops and delivery rhythms so every session leads to clear capability outcomes.",
        quote: "Strong coordination gives learners momentum and confidence to keep moving forward.",
      },
      {
        name: "Pita Rewi",
        role: "",
        bio: "Pita works alongside rangatahi to build confidence, discipline, and practical leadership habits.",
        quote: "Young people thrive when coaching combines challenge, care, and real opportunity.",
      },
    ],
    faqs: [
      {
        question: "Who is Tohunga designed to support?",
        answer:
          "Tohunga supports learners, team members, and community participants who want structured development and skill-building.",
      },
      {
        question: "What makes the Tohunga approach different?",
        answer:
          "It combines cultural grounding with practical learning and accountability so progress is measurable and useful.",
      },
      {
        question: "How are learning outcomes tracked?",
        answer:
          "We track progress through clear goals, mentor check-ins, and practical milestones linked to real responsibilities.",
      },
    ],
  },
  {
    slug: "mangotoa",
    tone: "yellow",
    name: "Mangotoa",
    title: "Leverager",
    description: "Practical courage, action, and leverage in everyday life.",
    label: "Te Haa - Air Element",
    overview:
      "Mangotoa turns plans into action by coordinating operations, field delivery, and practical support where it matters most.",
    team: [
      {
        name: "Whāea Alissa",
        role: "",
        bio: "Aroha ensures day-to-day operations run smoothly and teams stay resourced for high-quality delivery.",
        quote: "Reliable execution is the bridge between intention and real community outcomes.",
      },
      {
        name: "Rangi Kupa",
        role: "",
        bio: "Rangi supports frontline execution, safety, and practical coordination across delivery contexts.",
        quote: "Field leadership means making smart decisions quickly while protecting people and purpose.",
      },
      {
        name: "Hemi Tahi",
        role: "",
        bio: "Hemi keeps communication clear between teams and whanau so support is timely and trusted.",
        quote: "Connection and clarity are the foundations of responsive community support.",
      },
      {
        name: "Kiri Rau",
        role: "",
        bio: "Kiri focuses on practical solutions and follow-through so families receive support that fits their needs.",
        quote: "Care is most effective when it is practical, respectful, and consistent.",
      },
    ],
    faqs: [
      {
        question: "What is Mangotoa responsible for day to day?",
        answer:
          "Mangotoa manages operations, field execution, and coordination to ensure services are delivered reliably and safely.",
      },
      {
        question: "How does Mangotoa handle urgent needs?",
        answer:
          "The team prioritizes fast response, clear communication, and practical problem-solving for urgent community requirements.",
      },
      {
        question: "How does Mangotoa collaborate with other divisions?",
        answer:
          "Mangotoa connects leadership priorities with real-world execution and provides feedback for continuous improvement.",
      },
    ],
  },
  {
    slug: "aronui",
    tone: "green",
    name: "Aronui",
    title: "Lover",
    description: "Nurturing resources, care, and collective wellbeing.",
    label: "Papatuanuku - Earth Element",
    overview:
      "Aronui supports wellbeing by connecting people with resources, strengthening care networks, and promoting collective resilience.",
    team: [
      {
        name: "Mātua Tommy",
        role: "",
        bio: "Nia leads wellbeing planning and helps shape support pathways that are sustainable for families and teams.",
        quote: "Wellbeing grows where people feel seen, supported, and connected to practical help.",
      },
      {
        name: "Mātua Chase",
        role: "",
        bio: "Tama aligns people, services, and resources so support remains timely, relevant, and coordinated.",
        quote: "Good planning turns limited resources into meaningful, lasting outcomes.",
      },
      {
        name: "Whaea Katy",
        role: "",
        bio: "Rima works directly with families to identify priorities and connect them with trusted support options.",
        quote: "Family support is strongest when trust, dignity, and practical action come together.",
      },
      {
        name: "Whaea Teri",
        role: "",
        bio: "Ari strengthens community care networks and helps ensure follow-up support remains consistent over time.",
        quote: "Community resilience is built through shared care and dependable relationships.",
      },
    ],
    faqs: [
      {
        question: "What outcomes does Aronui aim to create?",
        answer:
          "Aronui improves wellbeing outcomes by making support accessible, coordinated, and responsive to family needs.",
      },
      {
        question: "How can people engage with Aronui services?",
        answer:
          "People can connect through community referrals, direct outreach, and ongoing programs designed for long-term wellbeing.",
      },
      {
        question: "What types of support are included?",
        answer:
          "Support includes family guidance, resource planning, and practical wellbeing pathways tailored to local context.",
      },
    ],
  },
];

export function generateStaticParams() {
  return ABOUT_PILLARS.map((pillar) => ({ slug: pillar.slug }));
}

export default async function AboutPillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = ABOUT_PILLARS.find((item) => item.slug === slug);

  if (!pillar) {
    notFound();
  }

  const otherPillars = ABOUT_PILLARS.filter((item) => item.slug !== slug);
  const profileImages = getProfileImagesByTone(pillar.tone);
  const spotlightMembers = pillar.team
    .slice(0, profileImages.length)
    .map((member) => member);

  return (
    <CmsPageShell slug={`about-${pillar.slug}`} fallbackContent={getDefaultCmsContentBySlug(`about-${pillar.slug}`)}>
      <section className="border-b border-border bg-background py-10 sm:py-14">
        <Container>
          <div className="overflow-visible rounded-[28px] relative border border-border bg-card p-4 sm:p-6">
            <div className="relative flex min-h-0 items-center justify-center overflow-visible rounded-3xl px-3 py-2 sm:px-4 sm:py-3 md:min-h-[clamp(380px,58vh,640px)]">
              <Skeleton className="absolute inset-0 h-full w-full rounded-none opacity-60" />
              <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 text-center">
                <div className="flex flex-col items-center gap-1">
                  <PillarColorImage
                    tone={pillar.tone}
                    className="h-[clamp(220px,52vw,760px)] w-[min(100%,1400px)]"
                    imageClassName="scale-[1.2] sm:scale-[1.35] md:scale-[1.55] lg:scale-[2]"
                    sizes="(max-width: 640px) 96vw, (max-width: 1024px) 92vw, 1400px"
                    priority
                  />
                  <p className={`-mt-1 font-display text-[clamp(1.7rem,5.4vw,3.3rem)] font-bold tracking-[0.12em] uppercase ${PILLAR_TONE_TEXT_CLASS[pillar.tone]}`}>
                    <EditableText path="content.hero.pillarToneLabel" fallback={`${pillar.name} - ${pillar.title}`} />
                  </p>
                  <p className={`-mt-1 font-display text-[clamp(1.2rem,3.8vw,2.4rem)] font-bold tracking-[0.14em] uppercase ${PILLAR_TONE_TEXT_CLASS[pillar.tone]}`}>
                    <EditableText path="content.hero.pillarElementLabel" fallback={pillar.label} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TeamMemberSpotlight
        divisionName={pillar.name}
        tone={pillar.tone}
        members={spotlightMembers}
        cmsPathPrefix="content.team"
        mediaAspectClassName="aspect-[4/3]"
        mediaCropAspect={4 / 3}
      />

      <section className="border-b border-border bg-card py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              badgePath="content.faq.badge"
              titlePath="content.faq.title"
              descriptionPath="content.faq.description"
              badge="For Your Questions"
              title="Frequently Asked Questions"
              description={`Common questions about the ${pillar.name} division and how its team supports meaningful outcomes.`}
            />
          </div>

          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full rounded-2xl border border-border bg-white px-5 sm:px-6">
            {pillar.faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-border py-1 last:border-b-0">
                <AccordionTrigger className="py-4 text-left font-body text-base font-bold text-[var(--hero-black)] hover:no-underline sm:text-lg">
                  <EditableText path={`content.faq.items.${index}.question`} fallback={item.question} />
                </AccordionTrigger>
                <AccordionContent className="pb-4 font-serif text-base leading-7 text-[var(--hero-text)]">
                  <EditableText path={`content.faq.items.${index}.answer`} fallback={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <Container className="space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionHeader badgePath="content.next.badge" titlePath="content.next.title" badge="Next Division" title="Explore Other Divisions" />
            <EditableLink
              path="content.next.backCtaLink"
              fallback={{ label: "Back to About", href: "/about" }}
              className="inline-flex border border-[var(--hero-main)]/30 px-5 py-2 font-display text-sm font-bold text-[var(--hero-main)] transition-transform duration-200 ease-out hover:scale-[1.02] hover:bg-[var(--hero-main)]/10"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {otherPillars.map((item) => (
              <EditableLink
                key={item.slug}
                path={`content.next.items.${item.slug}.link`}
                fallback={{ label: "Explore Division", href: `/about/${item.slug}` }}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-[0_16px_34px_rgba(12,35,54,0.10)]"
              >
                <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-muted/40">
                  <PillarColorImage tone={item.tone} className="h-56 w-56" sizes="224px" />
                </div>
                <div className="p-5">
                  <p className="font-body text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    <EditableText path={`content.next.items.${item.slug}.label`} fallback={item.label} />
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[var(--hero-black)]">
                    <EditableText path={`content.next.items.${item.slug}.name`} fallback={item.name} />
                  </h3>
                  <p className="mt-2 font-serif text-base leading-7 text-[var(--hero-text)]">
                    <EditableText path={`content.next.items.${item.slug}.title`} fallback={item.title} />
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-bold text-[var(--hero-main)]">
                    <EditableText path={`content.next.items.${item.slug}.cta`} fallback="Explore Division" />
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110 group-hover:-rotate-6" aria-hidden />
                  </span>
                </div>
              </EditableLink>
            ))}
          </div>
        </Container>
      </section>
    </CmsPageShell>
  );
}


