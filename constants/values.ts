export type AccentColor = "blue" | "red" | "yellow" | "green";

export interface ValueItem {
  icon: string;
  title: string;
  keyword: string;
  text: string;
  color: AccentColor;
}

export interface LeadershipStyle {
  name: string;
  colorLabel: string;
  element: string;
  role: string;
  color: AccentColor;
}

export const KAUAE_RUNGA_VALUES: ValueItem[] = [
  {
    icon: "??",
    title: "Wairua / Spirit and Energy",
    keyword: "Love",
    text: "My being and heart is uplifted. Wairua reminds us that healing begins with the spirit and creates the foundation for growth.",
    color: "blue",
  },
  {
    icon: "??",
    title: "Mahamaha / Emotions and Perceptions",
    keyword: "Empathy",
    text: "I feel good about this. Mahamaha supports emotional awareness, helping people understand their feelings and perceptions with compassion.",
    color: "red",
  },
  {
    icon: "??",
    title: "Wananga / Philosophy and Morality",
    keyword: "Belief",
    text: "I have no doubts. Through reflection and deep questioning, people build clarity, conviction, and moral direction.",
    color: "yellow",
  },
  {
    icon: "??",
    title: "Hinengaro Whakarunga / Emotional Brain",
    keyword: "Inspiration",
    text: "I'm inspired to take the initiative. Inspiration turns reflection into action and helps people move forward with purpose.",
    color: "green",
  },
];

export const KAUAE_RARO_VALUES: ValueItem[] = [
  {
    icon: "??",
    title: "Hinengaro Whakararo / Evidenced Brain",
    keyword: "Rationale",
    text: "I know why this is right. Grounded reason helps people make wise and practical choices.",
    color: "blue",
  },
  {
    icon: "??",
    title: "Haratau / Practical and Organisational",
    keyword: "Commitment",
    text: "I will see it through. Structure, planning, and accountability turn intention into real change.",
    color: "red",
  },
  {
    icon: "??",
    title: "Okiko / Physical and Discipline",
    keyword: "Qualification",
    text: "I have what it takes. Discipline and resilience help people build confidence through consistent effort.",
    color: "yellow",
  },
  {
    icon: "??",
    title: "Rauemi / Resource and Material",
    keyword: "Supply",
    text: "I have everything I need. Resources, support, knowledge, and community help sustain wellbeing and progress.",
    color: "green",
  },
];

export const TAU_CONCEPT = {
  title: "Tau",
  subtitle: "Harmony - Te Pae O Te Rangi",
  icon: "Tau",
};

export const LEADERSHIP_STYLES: LeadershipStyle[] = [
  { name: "Ariki", colorLabel: "Blue", element: "Te Wai", role: "Leader", color: "blue" },
  { name: "Tohunga", colorLabel: "Red", element: "Te Ahi", role: "Learner", color: "red" },
  { name: "Mangotoa", colorLabel: "Yellow", element: "Te Haa", role: "Leverager", color: "yellow" },
  { name: "Aronui", colorLabel: "Green", element: "Papatuanuku", role: "Lover / Nurturer", color: "green" },
];
