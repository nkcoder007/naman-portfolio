export const profile = {
  school: "Washington High School",
  graduationYear: "2029",
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
    "I like building software, testing technical ideas and figuring out how they work — mostly in application development, game development and AI/ML.",
} as const;

export const about = {
  paragraphs: [
    "Most of my time goes into software and application development — writing something, running it, and understanding why it behaves the way it does.",
    "Game development and AI/ML are the areas I'm exploring alongside that, and Qiskit is how I've started poking at quantum computing. I'm still early in all of it, which is part of why I like it: there is always another thing to try, test and rebuild.",
  ],
  toolsNote: "Worked with or currently exploring — not a ranking of proficiency.",
} as const;

export const portrait = {
  src: "/images/profile/portrait.jpg",
  alt: "Portrait of Naman Kaushik",
} as const;
