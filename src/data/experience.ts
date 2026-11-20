export type ExperienceTone = "research" | "certification" | "teaching";

/**
 * Optional detail shown for the selected entry in the experience explorer.
 * Every field is optional: anything that is not verified is left out rather
 * than filled in.
 */
export type ExperienceDetails = {
  responsibilities?: readonly string[];
  contributions?: readonly string[];
  /** Weekly or overall commitment, only when it is known. */
  timeCommitment?: string;
  /** Start and end dates or timeframe, only when they are verified. */
  dates?: string;
  outcomes?: readonly string[];
  /** Heading for the outcomes list, e.g. the kind of recognition. */
  outcomeLabel?: string;
  /** Detail that is still unconfirmed, shown so it is easy to fill in later. */
  pendingDetails?: string;
};

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
  details?: ExperienceDetails;
  /**
   * Preserved emphasis flag. The explorer signals emphasis through the accent
   * selection treatment, so this no longer changes type size or weight.
   */
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
    details: {
      contributions: [
        "Applied machine-learning algorithms as part of the quantum error correction research.",
        "Presented the research as a poster at a research conference.",
      ],
      outcomes: ["The poster received recognition and won an award at the conference."],
      outcomeLabel: "Recognition",
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
    details: {
      responsibilities: ["Working through coursework with other students."],
    },
  },
];

export const experience = {
  intro:
    "Research, certification and teaching work so far — recorded plainly, with the parts I can stand behind.",
  note: "Dates, conference and award details are listed once they are confirmed.",
  entries,
} as const;
