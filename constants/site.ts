export const SITE_CONFIG = {
  name: "Te Pae O Te Rangi",
  tagline: "A safe meeting place for healing, identity, leadership, and connection.",
  description:
    "Te Pae O Te Rangi is the meeting place for all to come - a space where people can arrive as they are, feel safe, be vulnerable, reconnect with themselves, and grow through kaupapa Maori values.",
  heroTitle: "Te Pae O Te Rangi",
  heroSubtitle: "A safe meeting place for healing, identity, leadership, and connection.",
  heroIntro:
    "Te Pae O Te Rangi represents the meeting of the land and the sky - the place where the upper and lower realms meet, where tension finds balance, and where people are invited into Tau: harmony, safety, and restoration.",
  heroMeaning:
    "Grounded in the concept of Kauae Runga and Kauae Raro, we support people to explore both the inner and outer dimensions of wellbeing: spirit, emotion, belief, thought, discipline, resource, action, and practical commitment.",
  phrase: "KAUAE RUNGA KAUAE RARO",
  phraseSubtitle: "Inner and Outer Pathways of Wellbeing",
  contactEmail: "hello@tepae.example",
  contactPhone: "+64 00 000 0000",
  contactAddress: "Office Address Placeholder",
} as const;

export const GLOBAL_CTA = {
  book: "Book a Session",
  join: "Join a Programme",
  learn: "Explore Our Kaupapa",
  contact: "Contact Us",
} as const;

export type CtaItem = {
  label: string;
  href: string;
};
