export const profile = {
  school: "Washington High School",
  graduationYear: "2029",
  focusAreas: [
    "Software",
    "Application development",
    "Game development",
    "AI/ML",
  ],
  tools: [
    "Python",
    "C#",
    "Unity",
    "Git/GitHub",
    "VS Code",
    "Qiskit",
    "DaVinci Resolve",
  ],
} as const;

export const hero = {
  intro:
    "I'm a student at Washington High School interested in software, application development, game development and AI/ML. I like building things, testing technical ideas and figuring out how they work.",
} as const;

export const about = {
  paragraphs: [
    "I'm Naman Kaushik, a student at Washington High School with an expected graduation in 2029. My main interest is software and application development — writing something, running it, and understanding why it behaves the way it does.",
    "Game development and AI/ML are the areas I'm exploring alongside that. I enjoy building things, testing technical ideas and working through problems until they make sense, including the ones that take more than one attempt.",
  ],
  toolsNote: "Worked with or currently exploring — not a ranking of proficiency.",
} as const;

export const portrait = {
  src: "/images/profile/portrait.jpg",
  alt: "Portrait of Naman Kaushik",
} as const;
