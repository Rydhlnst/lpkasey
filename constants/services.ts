export interface ServiceItem {
  title: string;
  category: "Leadership & Identity" | "Healing & Wellbeing";
  description: string[];
  bullets?: string[];
  ctaLabel: "Learn More" | "Enquire Now";
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
    title: "Te Pae O Te Rangi Rangatahi Hiking Leadership Initiative",
    category: "Leadership & Identity",
    description: [
      "Designed to empower rangatahi aged 12-24 through experiential learning in the natural environment.",
      "This programme takes leadership out of the classroom and into the whenua through outdoor challenges, group learning, and practical survival skills.",
      "Participants are supported to develop confidence, resilience, teamwork, emotional awareness, and cultural identity while exploring how they show up in challenge.",
    ],
    bullets: [
      "Water purification",
      "Emotional wellness",
      "Fire lighting",
      "Shelter building",
      "Teamwork",
      "Leadership communication",
      "Problem-solving under pressure",
      "Connection to whenua and environment",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Rangatahi Leadership Initiative",
  },
  {
    title: "Healing Through Music Programme - Te Manu Puoro",
    category: "Healing & Wellbeing",
    description: [
      "Te Manu Puoro uses music as a creative pathway for healing, self-expression, and emotional exploration.",
      "Through rhythm, sound, voice, creativity, and shared experience, individuals and groups are supported to strengthen self-awareness, resilience, and self-esteem.",
      "This programme is especially powerful for those who need a gentle, creative, and culturally grounded way to process emotion and reconnect.",
      "Music is universal. Music is personal. Music is art. Music is healing.",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Te Manu Puoro",
  },
  {
    title: "Journaling Programme - Te Manu Rongoa O Te Rangi",
    category: "Healing & Wellbeing",
    description: [
      "Te Manu Rongoa O Te Rangi uses journaling as a creative and reflective process for healing.",
      "Journaling gives people a safe place to release thoughts, emotions, memories, and hopes without judgement.",
      "Through guided reflection, participants can understand emotional patterns, process experience, and strengthen clarity and confidence.",
    ],
    bullets: [
      "Release emotional weight",
      "Build self-awareness",
      "Reflect on personal growth",
      "Process life experiences",
      "Strengthen clarity and confidence",
      "Develop a deeper relationship with self",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Te Manu Rongoa",
  },
  {
    title: "Romiromi / Mirimiri Sessions",
    category: "Healing & Wellbeing",
    description: [
      "Romiromi and Mirimiri are deep, intuitive forms of bodywork grounded in kaupapa Maori healing.",
      "Sessions support release, reset, realignment, and reconnection through work on accumulation points in the body and focused breath.",
      "Come as you are. Lay down what you carry. Receive what you need. Leave in balance.",
    ],
    ctaLabel: "Enquire Now",
    placeholderLabel: "Romiromi / Mirimiri",
  },
  {
    title: "Mau Rakau Programme",
    category: "Leadership & Identity",
    description: [
      "Mau Rakau is a journey of personal, physical, and cultural growth.",
      "Through disciplined practice, self-management, communication, and relationship-building, taiohi are supported to connect with their whakapapa and strengthen confidence.",
      "This programme introduces the deeper meaning behind the taiaha as a pathway into respect, focus, identity, and responsibility.",
    ],
    bullets: [
      "Understand the origins of the taiaha",
      "Engage with marae tikanga",
      "Build discipline and focus",
      "Push through personal challenges",
      "Develop respect for self and others",
      "Honour the tapu, mauri, and mana of the kaupapa",
      "Strengthen confidence through movement and practice",
    ],
    ctaLabel: "Learn More",
    placeholderLabel: "Mau Rakau Pathway",
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
