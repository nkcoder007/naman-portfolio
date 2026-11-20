export type ExperienceTone = "research" | "certification" | "teaching";

export type ExperienceEntry = {
  id: string;
  title: string;
  category: string;
  tone: ExperienceTone;
  organization?: string;
  /** Only set when a verified date or period is available. */
  period?: string;
  summary: string;
  skills?: readonly string[];
  outcome?: {
    label: string;
    text: string;
    /** Detail that is still unconfirmed, shown so it is easy to fill in later. */
    pendingDetails?: string;
  };
  /** Gives a major entry more visual weight than the rest. */
  featured?: boolean;
};

const entries: readonly ExperienceEntry[] = [
  {
    id: "quantum-error-correction",
    title: "Quantum error correction research",
    category: "Research",
    tone: "research",
    summary:
      "Research on quantum error correction, with machine-learning algorithms applied as part of the work.",
    skills: ["Quantum error correction", "Machine learning"],
    outcome: {
      label: "Recognition",
      text: "Presented as a poster at a research conference, where the poster received recognition and won an award.",
      pendingDetails: "conference name, award title, date — to be added",
    },
    featured: true,
  },
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    category: "Certification",
    tone: "certification",
    organization: "Google",
    summary:
      "Completed certification covering AI fundamentals and practical use of AI tools.",
    skills: ["AI fundamentals"],
  },
  {
    id: "academic-tutoring",
    title: "Academic tutoring",
    category: "Teaching & involvement",
    tone: "teaching",
    summary:
      "Academic tutoring involvement, working through coursework with other students.",
    skills: ["Teaching", "Communication"],
  },
];

export const experience = {
  intro:
    "Research, certification and teaching work so far — recorded plainly, with the parts I can stand behind.",
  note: "Dates, conference and award details are listed once they are confirmed.",
  entries,
} as const;
