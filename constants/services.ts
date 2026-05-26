export const SERVICE_CATEGORIES = [
  "Cultural Leadership",
  "Youth Development",
  "Healing & Wellbeing",
  "Life Skills & Preparedness",
  "Community Support",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  badge: string;
  summary: string;
  description: string[];
  keyPoints?: string[];
  outcomes?: string[];
  schedule?: string;
  location?: string;
  ctaLabel: string;
  ctaHref?: string;
  placeholderLabel: string;
}

export interface SupportGroup {
  title: string;
  subtitle: string;
  type: string;
  schedule: string;
  location: string;
  description: string[];
  bullets?: string[];
  ctaLabel: "Join This Group" | "Contact Us";
}

export const CONTACT_ENQUIRY_TYPES = [
  "General Enquiry",
  "Book a Session",
  "Programme Information",
  "Community Support",
  "Partnership",
] as const;

export type ContactEnquiryType = (typeof CONTACT_ENQUIRY_TYPES)[number];

export const SERVICES: ServiceItem[] = [
  {
    slug: "te-whiringawha-cultural-matrix",
    title: "Te Whiringawha Cultural Matrix",
    category: "Cultural Leadership",
    badge: "Cultural Framework",
    summary: "A leadership and reflection matrix that helps people understand power-sharing, identity, and agency in Te Ao Maori contexts.",
    description: [
      "Te Whiringawha identifies four key leadership descriptors that support strong organisation, positive engagement, and inclusive long-term outcomes.",
      "The matrix explores power-sharing dynamics in Te Ao Maori and how traditional Maori contexts can be organised for collective wellbeing.",
      "It works as an introspective tool that sharpens personal, professional, and collective agency when working in Maori settings.",
    ],
    keyPoints: [
      "Explores power-sharing dynamics in Te Ao Maori",
      "Structures four modalities within Maori thinking",
      "Provides a lens for traditional management styles",
      "Measures personal, professional, and collective agency",
      "Supports internal dialogue and intentional leadership growth",
    ],
    outcomes: [
      "Stronger cultural confidence in leadership spaces",
      "Improved decision making in Maori contexts",
      "Clearer understanding of role, responsibility, and contribution",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Te Whiringawha Matrix",
  },
  {
    slug: "nga-tapuae-o-te-poromahamaha",
    title: "Nga Tapuae o Te Poromahamaha",
    category: "Healing & Wellbeing",
    badge: "Mens Healing Hikoi",
    summary: "An overnight hiking programme for men focused on emotional release, connection, and resilience.",
    description: [
      "This overnight hikoi addresses emotional and psychological pressure carried in silence by creating safe space for men to share openly.",
      "Participants use challenge, movement, and guided korero to process isolation, stress, and unspoken life burdens.",
      "Nature-based rituals such as stone release and letter burning support letting go, reflection, and renewal.",
    ],
    keyPoints: [
      "Emotional expression through guided conversation",
      "Connection through shared physical challenge",
      "Mindfulness and reflection in natural spaces",
      "Ritual-based release practices",
      "Post-hike support and peer connection",
    ],
    outcomes: [
      "Reduced isolation and stronger support networks",
      "Healthier emotional processing habits",
      "Greater resilience and self-awareness",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Mens overnight hikoi",
  },
  {
    slug: "te-kai-o-te-ngakau",
    title: "Te Kai o Te Ngakau",
    category: "Youth Development",
    badge: "Youth Cooking Programme",
    summary: "Hands-on cooking workshops that build independence, healthy habits, and confidence for youth.",
    description: [
      "Te Kai o Te Ngakau equips rangatahi with practical cooking skills so they can provide for themselves and support future goals.",
      "Workshops cover meal planning, pantry building, food budgeting, and preparation for everyday meals and special occasions.",
      "The programme blends nutrition and food hygiene with emotional wellbeing education to support body and mind together.",
    ],
    keyPoints: [
      "Cook nutritious meals on a budget",
      "Build confidence in kitchen and pantry",
      "Understand food hygiene and nutrition",
      "Learn how food behaviour affects confidence and self-esteem",
      "Use cooking as a pathway for community contribution",
    ],
    outcomes: [
      "Greater self-sufficiency and life readiness",
      "Improved food literacy and healthy eating habits",
      "Stronger confidence and social connection",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Te Kai o Te Ngakau",
  },
  {
    slug: "te-pae-o-te-rangi-emergency-preparedness",
    title: "Te Pae O Te Rangi Emergency Preparedness",
    category: "Life Skills & Preparedness",
    badge: "Emergency Skills",
    summary: "Whanau-centred practical training for emergency response and outdoor survival essentials.",
    description: [
      "This initiative empowers whanau through hands-on workshops and expeditions focused on life-preserving practical skills.",
      "Participants learn how to secure water, build fire, create shelter, keep warm, and source food in changing conditions.",
      "Training blends confidence building with collective responsibility so families can respond calmly and effectively in emergencies.",
    ],
    keyPoints: [
      "Water purification",
      "Safe fire lighting",
      "Shelter building",
      "Keeping warm in varied weather",
      "Hunting and gathering basics",
    ],
    outcomes: [
      "Higher emergency readiness at whanau level",
      "Practical confidence under pressure",
      "Stronger teamwork and shared responsibility",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Emergency preparedness",
  },
  {
    slug: "rangatahi-hiking-leadership-initiative",
    title: "Te Pae O Te Rangi Rangatahi Hiking Leadership Initiative",
    category: "Youth Development",
    badge: "Rangatahi Leadership",
    summary: "Experiential outdoor leadership programme for rangatahi aged 12-24 grounded in Maori identity and teamwork.",
    description: [
      "Rangatahi learn essential life and survival skills through hikoi-based challenges that build confidence, leadership, and collaboration.",
      "The initiative integrates water purification, emotional wellbeing, fire lighting, and shelter building in practical group settings.",
      "Using leadership archetypes Leader, Learner, Leverager, and Lover participants strengthen identity and cultural connection.",
    ],
    keyPoints: [
      "Leadership through experiential learning",
      "Teamwork and communication under challenge",
      "Water, fire, and shelter skills",
      "Emotional awareness and regulation",
      "Identity and whakapapa strengthening",
    ],
    outcomes: [
      "Stronger youth leadership capability",
      "Practical confidence in outdoor contexts",
      "Deeper cultural identity and belonging",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Rangatahi hiking leadership",
  },
  {
    slug: "te-manu-puoro",
    title: "Healing Through Music - Te Reo Puoro",
    category: "Healing & Wellbeing",
    badge: "Creative Healing",
    summary: "Music-based healing process to strengthen emotional intelligence, resilience, and self-worth.",
    description: [
      "Te Manu Puoro uses music and creative process to help individuals and groups explore inner feelings and build self-awareness.",
      "Participants connect through shared cause, culture, and circumstance while being led through reflective and expressive practices.",
      "The kaupapa affirms that music is universal, personal, artistic, and deeply healing.",
    ],
    keyPoints: [
      "Emotional exploration through music",
      "Group connection and support",
      "Resilience and coping skill development",
      "Self-esteem and identity strengthening",
    ],
    outcomes: [
      "Better emotional intelligence for decision making",
      "Improved coping skills in life challenges",
      "Healthier confidence and self-worth",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Te Manu Puoro",
  },
  {
    slug: "te-manu-rongoa-o-te-rangi",
    title: "Journaling Programme - Te Manu Rongoa O Te Rangi",
    category: "Healing & Wellbeing",
    badge: "Reflective Healing",
    summary: "Guided journaling for self-reflection, emotional release, and confidence restoration.",
    description: [
      "Te Manu Rongoa O Te Rangi uses journaling as a healing process that helps people express and understand inner experience.",
      "Writing supports emotional release and reduces burden carried in silence while improving personal clarity and awareness.",
      "Participants grow together in supportive spaces rooted in culture, shared purpose, and collective care.",
    ],
    keyPoints: [
      "Structured journaling practice",
      "Self-reflection and emotional release",
      "Resilience and confidence development",
      "Community support through shared process",
    ],
    outcomes: [
      "Clearer self-understanding",
      "Stronger emotional decision making",
      "Improved resilience and self-esteem",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Te Manu Rongoa",
  },
  {
    slug: "mau-rakau-programme",
    title: "Mau Rakau Programme",
    category: "Youth Development",
    badge: "Cultural Discipline",
    summary: "Taiaha-based pathway for taiohi to build discipline, identity, and relational leadership.",
    description: [
      "Mau Rakau supports personal and cultural growth through self-management, communication, and relationship-building.",
      "Taiohi learn taiaha origins, marae tikanga, and how to carry tapu, mauri, and mana with respect.",
      "The programme strengthens wairua, hinengaro, and tinana while nurturing confidence and responsibility.",
    ],
    keyPoints: [
      "Origins of taiaha and tikanga",
      "Challenge, discipline, and perseverance",
      "Whakapapa and identity connection",
      "Leadership with aroha, respect, and unity",
    ],
    outcomes: [
      "Confident taiohi leadership growth",
      "Improved self-regulation and respect",
      "Stronger cultural grounding and belonging",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Mau Rakau",
  },
  {
    slug: "tinana-whakarunga",
    title: "Fitness Programme - Tinana Whakarunga",
    category: "Youth Development",
    badge: "Hauora Fitness",
    summary: "Movement-based hauora programme that links healthy tinana with healthy hinengaro for tamariki.",
    description: [
      "Tinana Whakarunga helps tamariki stay active while learning why physical wellbeing fuels emotional and mental wellbeing.",
      "The kaupapa prioritises effort over performance so children can build confidence through participation and growth.",
      "Sessions focus on fun, skill development, and friendship to support positive identity and self-esteem.",
    ],
    keyPoints: [
      "Effort over performance mindset",
      "Safe, fun participation",
      "Confidence through movement",
      "Friendship and social development",
      "Healthy fuel and body awareness",
    ],
    outcomes: [
      "Higher motivation to stay active",
      "Better self-confidence and social connection",
      "Healthier habits for long-term wellbeing",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Tinana Whakarunga",
  },
  {
    slug: "kahukura-matatahi-mentoring",
    title: "Kahukura Matatahi Mentoring Programme",
    category: "Youth Development",
    badge: "Youth Mentoring",
    summary: "Mentoring pathway that grows resilience, leadership, aspiration, and wellbeing in young people.",
    description: [
      "Kahukura Matatahi is a nurturing mentoring environment where young people explore potential, identity, and future direction.",
      "Dedicated mentors guide participants through personal growth, social-emotional learning, and leadership development.",
      "The programme supports holistic outcomes that go beyond academics into confidence, resilience, and purpose.",
    ],
    keyPoints: [
      "Personal growth and self-awareness",
      "Leadership and community engagement",
      "Future vision and aspiration building",
      "Mental wellness and resilience practices",
    ],
    outcomes: [
      "Improved confidence and emotional maturity",
      "Emerging youth leadership capacity",
      "Clearer future goals and motivation",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Kahukura Matatahi",
  },
  {
    slug: "future-pathway-cv-workshops",
    title: "Future Pathway and CV Workshops",
    category: "Life Skills & Preparedness",
    badge: "Career Readiness",
    summary: "Career-preparation workshops for CV writing, interview confidence, and pathway planning.",
    description: [
      "Future Pathways equips participants with practical tools to create professional CVs and understand trade and career options.",
      "Interview preparation sessions build confidence and readiness for real-world employment conversations.",
      "Participants receive guidance, networking opportunities, and mentoring support to map long-term career steps.",
    ],
    keyPoints: [
      "CV development tailored to job goals",
      "Interview preparation and confidence",
      "Trade and career pathway awareness",
      "Goal setting with actionable plans",
      "Industry and mentor connections",
    ],
    outcomes: [
      "Stronger job-seeking confidence",
      "Clear career pathway planning",
      "Improved interview and communication readiness",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Future Pathway Workshops",
  },
  {
    slug: "tangata-manaaki-toroa",
    title: "Tangata Manaaki Toroa",
    category: "Community Support",
    badge: "Mens Support Group",
    summary: "Weekly men's support group focused on connection, dialogue, and practical wellbeing growth.",
    description: [
      "This support group offers a safe and welcoming space where men can share experiences and support one another.",
      "Sessions include facilitated discussion around mental health, relationships, work-life balance, and personal development.",
      "Confidentiality, peer support, and occasional workshops help participants build trust, friendship, and resilience.",
    ],
    schedule: "Every Tuesday, 6:30 PM - 8:30 PM",
    location: "Te Pae O Te Rangi Offices",
    keyPoints: [
      "Facilitated and respectful dialogue",
      "Confidential peer support",
      "Personal development workshops",
      "Network and brotherhood building",
    ],
    outcomes: [
      "Reduced isolation",
      "Greater emotional confidence",
      "Stronger community connection",
    ],
    ctaLabel: "Join This Group",
    ctaHref: "/community-support",
    placeholderLabel: "Tangata Manaaki Toroa",
  },
  {
    slug: "whakapakari-manuka",
    title: "Whakapakari Manuka",
    category: "Community Support",
    badge: "Womens Support Group",
    summary: "Weekly women's support group for healing, connection, and collective growth in safe space.",
    description: [
      "Whakapakari Manuka creates safe and welcoming space for women to share, support, and grow together.",
      "Facilitated discussions and practical wellbeing workshops help participants navigate life challenges with dignity and strength.",
      "The group nurtures belonging, confidence, and resilient friendship beyond each weekly session.",
    ],
    schedule: "Every Wednesday, 6:00 PM - 8:00 PM",
    location: "Te Pae O Te Rangi Offices",
    keyPoints: [
      "Facilitated korero and reflection",
      "Confidentiality and trust",
      "Peer support and encouragement",
      "Emotional resilience workshops",
    ],
    outcomes: [
      "Stronger sense of belonging",
      "Increased confidence and wellbeing",
      "Long-term supportive relationships",
    ],
    ctaLabel: "Join This Group",
    ctaHref: "/community-support",
    placeholderLabel: "Whakapakari Manuka",
  },
  {
    slug: "cacao-sound-breath-meditation",
    title: "Cacao Ceremonies, Sound Baths, Breathwork, and Guided Meditation",
    category: "Healing & Wellbeing",
    badge: "Mind-Body Practice",
    summary: "Ceremonial and meditative wellbeing spaces for stress release, clarity, and emotional reset.",
    description: [
      "These practices help people reconnect with self, release stress, and restore emotional clarity through guided group experience.",
      "Sessions use cacao ceremony, crystal sound bowls, breathwork, and meditation to slow nervous system overload.",
      "Open to all ages and genders, from first-time participants to regular community members.",
    ],
    keyPoints: [
      "Safe and inclusive ceremony space",
      "Stress release and nervous system regulation",
      "Guided breathing and meditation",
      "Reflection and emotional clarity",
    ],
    outcomes: [
      "Calmer body and mind response",
      "Greater emotional balance",
      "Improved capacity for reflection and rest",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Cacao and sound healing",
  },
  {
    slug: "romiromi-mirimiri",
    title: "Romiromi / Mirimiri Sessions",
    category: "Healing & Wellbeing",
    badge: "Kaupapa Maori Bodywork",
    summary: "Deep intuitive bodywork for release, reset, and realignment grounded in Maori healing practice.",
    description: [
      "Romiromi and Mirimiri sessions apply pressure at accumulation points to support physical and emotional release.",
      "Work may include bodyweight techniques and use of rakau or kohatu where appropriate for healing support.",
      "Breath is central to release process: open breathing helps body let go of what no longer serves it.",
    ],
    keyPoints: [
      "Deep release of held tension",
      "Reset and energetic realignment",
      "Breath-guided healing support",
      "Culturally grounded bodywork approach",
    ],
    outcomes: [
      "Greater physical and emotional balance",
      "Reduced body stress load",
      "Improved sense of grounded wellbeing",
    ],
    ctaLabel: "Book a Session",
    placeholderLabel: "Romiromi Mirimiri",
  },
  {
    slug: "ritenga-whaikaha-breathe-like-a-champion",
    title: "Ritenga Whaikaha - Breathe Like a Champion",
    category: "Community Support",
    badge: "Inclusive Leadership",
    summary: "Inclusive confidence-building initiative for tangata whaikaha grounded in Te Whiringawha values.",
    description: [
      "Ritenga Whaikaha uses Te Whiringawha as dynamic interface for creating real advantage through change and adaptation.",
      "The programme honours tangata whaikaha as vital part of diverse human experience where difference is acknowledged and celebrated.",
      "Through Mauri Tau principles, participants build confidence, skills, and self-love while understanding their value and contribution.",
    ],
    keyPoints: [
      "Promotes Mauri Tau for independent living",
      "Builds confidence and practical responsibility",
      "Affirms identity, value, and belonging",
      "Inclusive learning for diverse capability",
    ],
    outcomes: [
      "Increased personal agency",
      "Stronger confidence in social participation",
      "Greater inclusion and recognition",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Ritenga Whaikaha",
  },
  {
    slug: "rere-to-tika-rere-pai",
    title: "Rere To Tika, Rere Pai",
    category: "Healing & Wellbeing",
    badge: "Self-Expression and Beauty",
    summary: "Confidence and wellbeing programme that blends inner self-love with outer self-expression.",
    description: [
      "Rere To Tika, Rere Pai is more than beauty service: it is space to celebrate joy, identity, and positive self-image.",
      "Participants explore practices that build self-love, positivity, and empowerment from within.",
      "Makeup and beauty are used as tools for self-expression that honour individuality and personal radiance.",
    ],
    keyPoints: [
      "Inner beauty and self-love practice",
      "Positive confidence and identity expression",
      "Safe self-care and celebration space",
      "Tools for empowering personal presentation",
    ],
    outcomes: [
      "Stronger self-esteem",
      "Healthier relationship with self-image",
      "Greater confidence in social settings",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Rere To Tika Rere Pai",
  },
];

export const SUPPORT_GROUPS: SupportGroup[] = [
  {
    title: "Tangata Manaaki Toroa",
    subtitle: "The Guardians of the Albatross",
    type: "Men's Support Group",
    schedule: "Every Tuesday from 6:30 PM to 8:30 PM",
    location: "At our offices",
    description: [
      "A safe and welcoming space for men to speak honestly, listen deeply, and support one another through life's challenges.",
      "Whether someone is navigating personal struggle, mental health, relationships, grief, stress, or identity questions, this space offers support without judgement.",
      "You do not need to have everything figured out before you come. You only need to show up.",
    ],
    bullets: [
      "Honest conversation",
      "Brotherhood and connection",
      "Emotional wellbeing",
      "Shared learning",
      "Personal growth",
      "Accountability and support",
      "A stronger sense of belonging",
    ],
    ctaLabel: "Join This Group",
  },
  {
    title: "Whakapakari Manuka",
    subtitle: "The Strengthening of the Tree",
    type: "Women's Support Group",
    schedule: "Every Wednesday from 6:00 PM to 8:00 PM",
    location: "At our offices",
    description: [
      "A safe, supportive, and nurturing space for women to share experiences and strengthen one another through connection.",
      "This group supports healing and growth through being heard, understood, and encouraged by others on their own journey.",
      "Whakapakari Manuka reminds us that strength is often built through being held by the right people.",
    ],
    bullets: [
      "Emotional safety",
      "Shared stories",
      "Personal growth",
      "Confidence building",
      "Healing through connection",
      "Mutual support",
      "Strengthening identity and wellbeing",
    ],
    ctaLabel: "Join This Group",
  },
];

export const PHILOSOPHY_CONTENT = {
  intro: [
    "Te Whiringawha is a cultural matrix that identifies four key leadership descriptors.",
    "These descriptors support stronger organisation, deeper engagement, and more inclusive long-term outcomes.",
  ],
  explores: [
    "The power-sharing dynamics of Te Ao Maori",
    "How traditional Maori contexts can be organised",
    "The Maori psyche through four key modalities",
    "Leadership patterns present across Te Ao Maori",
    "How people interact, contribute, lead, learn, and support",
  ],
  isList: [
    "A guide for improving interaction within Maori contexts",
    "A framework for leadership and cultural understanding",
    "A tool for reflecting on personal agency",
    "A tool for reflecting on professional agency",
    "A gauge for collective wellbeing and effectiveness",
    "A pathway for strengthening connection, contribution, and responsibility",
  ],
};

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((item) => item.slug === slug);
}

export function getServiceDetailSlug(slug: string): string {
  return `services-${slug}`;
}

export function getServiceDetailFallback(service: ServiceItem): Record<string, unknown> {
  return {
    content: {
      badge: service.badge,
      title: service.title,
      summary: service.summary,
      paragraphs: service.description,
      keyPointsTitle: "Key Focus Areas",
      keyPoints: service.keyPoints ?? [],
      outcomesTitle: "Expected Outcomes",
      outcomes: service.outcomes ?? [],
      scheduleLabel: "Schedule",
      schedule: service.schedule ?? "",
      locationLabel: "Location",
      location: service.location ?? "",
      ctaPrimary: service.ctaLabel,
      ctaPrimaryLink: { label: service.ctaLabel, href: service.ctaHref ?? "/contact" },
      ctaSecondary: "Back to Services",
      ctaSecondaryLink: { label: "Back to Services", href: "/services" },
      mediaHero: { url: "", altText: `${service.title} hero image` },
    },
  };
}
