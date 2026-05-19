import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { TeamMemberSpotlight } from "@/components/sections/team-member-spotlight";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { PillarColorImage, type PillarTone } from "@/components/shared/pillar-color-image";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  quote: string;
  image: string;
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

const ABOUT_PILLARS: AboutPillarDetail[] = [
  {
    slug: "ariki",
    tone: "blue",
    name: "Ariki",
    title: "Tumuakitanga",
    description: "Leadership that gives direction, clarity, and identity.",
    label: "Te Wai",
    overview:
      "Ariki leads strategic direction, protects cultural identity, and keeps every initiative aligned with long-term impact.",
    team: [
      {
        name: "David Warner",
        role: "Founder",
        bio: "David keeps the Ariki direction clear by aligning cultural values with long-term strategy and decision-making priorities.",
        quote: "Leadership works best when direction is clear and people know why their contribution matters.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=David%20Warner",
      },
      {
        name: "Mitchell Marsh",
        role: "Co-Founder",
        bio: "Mitchell builds the systems that turn strategy into practical operating plans teams can execute with confidence.",
        quote: "When the plan is practical, people can act faster and stay focused on impact.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Mitchell%20Marsh",
      },
      {
        name: "Steven Smith",
        role: "Co-Founder",
        bio: "Steven helps connect leadership intent with team accountability, ensuring priorities remain measurable and meaningful.",
        quote: "Consistency grows when vision and accountability move together every day.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Steven%20Smith",
      },
      {
        name: "Glenn Maxwell",
        role: "Chief Manager",
        bio: "Glenn supports cross-division coordination and removes delivery blockers so work keeps momentum.",
        quote: "Great teams are built by removing friction and empowering people to do their best work.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Glenn%20Maxwell",
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
    title: "Awatea",
    description: "The learner's path through knowledge, growth, and discipline.",
    label: "Te Ahi",
    overview:
      "Tohunga builds capability through practical learning pathways, mentorship, and consistent coaching for sustainable growth.",
    team: [
      {
        name: "Hana Rangi",
        role: "Learning Lead",
        bio: "Hana designs learning pathways that are practical, culturally grounded, and easy for participants to apply in daily life.",
        quote: "Learning becomes powerful when people can use it immediately in their own context.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Hana%20Rangi",
      },
      {
        name: "Wiremu Tai",
        role: "Programme Mentor",
        bio: "Wiremu mentors participants through structured milestones and keeps growth conversations supportive and honest.",
        quote: "Progress is built through regular reflection, clear goals, and steady support.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Wiremu%20Tai",
      },
      {
        name: "Mere Kauri",
        role: "Training Coordinator",
        bio: "Mere coordinates workshops and delivery rhythms so every session leads to clear capability outcomes.",
        quote: "Strong coordination gives learners momentum and confidence to keep moving forward.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Mere%20Kauri",
      },
      {
        name: "Pita Rewi",
        role: "Youth Coach",
        bio: "Pita works alongside rangatahi to build confidence, discipline, and practical leadership habits.",
        quote: "Young people thrive when coaching combines challenge, care, and real opportunity.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Pita%20Rewi",
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
    title: "Tautika",
    description: "Practical courage, action, and leverage in everyday life.",
    label: "Te Haa",
    overview:
      "Mangotoa turns plans into action by coordinating operations, field delivery, and practical support where it matters most.",
    team: [
      {
        name: "Aroha Teina",
        role: "Operations Lead",
        bio: "Aroha ensures day-to-day operations run smoothly and teams stay resourced for high-quality delivery.",
        quote: "Reliable execution is the bridge between intention and real community outcomes.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Aroha%20Teina",
      },
      {
        name: "Rangi Kupa",
        role: "Field Supervisor",
        bio: "Rangi supports frontline execution, safety, and practical coordination across delivery contexts.",
        quote: "Field leadership means making smart decisions quickly while protecting people and purpose.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Rangi%20Kupa",
      },
      {
        name: "Hemi Tahi",
        role: "Community Liaison",
        bio: "Hemi keeps communication clear between teams and whanau so support is timely and trusted.",
        quote: "Connection and clarity are the foundations of responsive community support.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Hemi%20Tahi",
      },
      {
        name: "Kiri Rau",
        role: "Support Specialist",
        bio: "Kiri focuses on practical solutions and follow-through so families receive support that fits their needs.",
        quote: "Care is most effective when it is practical, respectful, and consistent.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Kiri%20Rau",
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
    title: "Rauemi",
    description: "Nurturing resources, care, and collective wellbeing.",
    label: "Papatuanuku",
    overview:
      "Aronui supports wellbeing by connecting people with resources, strengthening care networks, and promoting collective resilience.",
    team: [
      {
        name: "Nia Mahu",
        role: "Wellbeing Lead",
        bio: "Nia leads wellbeing planning and helps shape support pathways that are sustainable for families and teams.",
        quote: "Wellbeing grows where people feel seen, supported, and connected to practical help.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Nia%20Mahu",
      },
      {
        name: "Tama Uru",
        role: "Resource Planner",
        bio: "Tama aligns people, services, and resources so support remains timely, relevant, and coordinated.",
        quote: "Good planning turns limited resources into meaningful, lasting outcomes.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Tama%20Uru",
      },
      {
        name: "Rima Puea",
        role: "Family Support",
        bio: "Rima works directly with families to identify priorities and connect them with trusted support options.",
        quote: "Family support is strongest when trust, dignity, and practical action come together.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Rima%20Puea",
      },
      {
        name: "Ari Hohaia",
        role: "Community Care",
        bio: "Ari strengthens community care networks and helps ensure follow-up support remains consistent over time.",
        quote: "Community resilience is built through shared care and dependable relationships.",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Ari%20Hohaia",
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

  return (
    <>
      <section className="border-b border-border bg-background py-10 sm:py-14">
        <Container>
          <div className="overflow-visible rounded-[28px] border border-border bg-card p-4 sm:p-6">
            <div className="relative flex min-h-[400px] items-center overflow-visible rounded-3xl">
              <Skeleton className="absolute inset-0 h-full w-full rounded-none opacity-60" />
              <div className="relative z-10 m-4 sm:m-6">
                <PillarColorImage
                  tone={pillar.tone}
                  className="absolute -left-20 -top-14 h-40 w-40 -rotate-[24deg] opacity-95 sm:-left-28 sm:-top-18 sm:h-52 sm:w-52"
                  priority
                />
                <div className="relative max-w-xl rounded-3xl bg-white/92 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.14)] sm:p-8">
                  <p className="inline-flex rounded-full border border-border bg-muted px-3 py-1 font-body text-[11px] font-semibold tracking-[0.14em] uppercase">
                    {pillar.name} - {pillar.label}
                  </p>
                  <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[var(--hero-black)] sm:text-6xl">
                    {pillar.title}
                  </h1>
                  <p className="mt-4 font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg">{pillar.description}</p>
                  <p className="mt-3 font-serif text-base leading-7 text-[var(--hero-text)] sm:text-lg">{pillar.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TeamMemberSpotlight divisionName={pillar.name} members={pillar.team} />

      <section className="border-b border-border bg-card py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              badge="For Your Questions"
              title="Frequently Asked Questions"
              description={`Common questions about the ${pillar.name} division and how its team supports meaningful outcomes.`}
            />
          </div>

          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full rounded-2xl border border-border bg-white px-5 sm:px-6">
            {pillar.faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-border py-1 last:border-b-0">
                <AccordionTrigger className="py-4 text-left font-body text-base font-bold text-[var(--hero-black)] hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 font-serif text-base leading-7 text-[var(--hero-text)]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <Container className="space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionHeader badge="Next Division" title="Explore Other Divisions" />
            <Link
              href="/about"
              className="inline-flex border border-[var(--hero-main)]/30 px-5 py-2 font-display text-sm font-bold text-[var(--hero-main)] transition hover:bg-[var(--hero-main)]/10"
            >
              Back to About
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {otherPillars.map((item) => (
              <Link
                key={item.slug}
                href={`/about/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-[0_16px_34px_rgba(12,35,54,0.10)]"
              >
                <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-muted/40">
                  <PillarColorImage tone={item.tone} className="h-44 w-44" imageClassName="scale-[1.65]" />
                </div>
                <div className="p-5">
                  <p className="font-body text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">{item.label}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[var(--hero-black)]">{item.name}</h3>
                  <p className="mt-2 font-serif text-base leading-7 text-[var(--hero-text)]">{item.title}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-bold text-[var(--hero-main)]">
                    Explore Division
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
