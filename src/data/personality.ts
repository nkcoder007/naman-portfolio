export type PersonalityEntry = {
  /** Stable slug, used as the React key and in the overlay's ids. */
  id: string;
  /** The interest the frame belongs to: Gaming, Reading, … */
  interest: string;
  /** Short title shown in the overlay and on hover/focus. */
  title: string;
  /** Path under `public/`, e.g. `/images/personality/gaming-01.jpg`. */
  src: string;
  /** One to three sentences: what the image represents, and why it is here. */
  caption: string;
  /** Alternative text for the image; omitted only when the image is decorative. */
  alt?: string;
  /**
   * TEMPORARY fixture marker. Placeholder frames say so in their alt text and
   * in the overlay, and the section note repeats it.
   */
  placeholder?: boolean;
};

/**
 * PLACEHOLDER CONTENT — NOT FINISHED COPY.
 *
 * The ten frames below are generated stand-ins for photography that does not
 * exist yet: they are not pictures of Naman, his equipment or his work. Every
 * caption is neutral review copy written to show length and tone, not a real
 * personal note. Each record carries `placeholder: true` so the interface can
 * label it, and every alt text ends with "(placeholder image)".
 *
 * To replace one: drop the real photograph into
 * `public/images/personality/`, point `src` at it, rewrite `title`, `caption`
 * and `alt`, then delete that record's `placeholder` flag. Add or remove
 * records freely — the conveyor duplicates whatever sequence it is given, so
 * no component change is needed.
 *
 * Do not add photographs of other people, stock images with unclear licensing,
 * or captions describing experiences that did not happen.
 */
const entries: readonly PersonalityEntry[] = [
  {
    id: "gaming-01",
    interest: "Gaming",
    title: "Systems & pacing",
    src: "/images/personality/gaming-01.jpg",
    alt: "A dark game controller on a wooden table in front of a glowing television screen (placeholder image).",
    caption:
      "Dense, systems-heavy games, where the interesting part is how rules, pacing and feedback are assembled rather than how quickly a run ends.",
    placeholder: true,
  },
  {
    id: "reading-01",
    interest: "Reading",
    title: "Long-form nonfiction",
    src: "/images/personality/reading-01.jpg",
    alt: "An open hardcover book on a sunlit wooden table, with dust visible in the light (placeholder image).",
    caption:
      "Long-form nonfiction read slowly, following one argument from premise to conclusion instead of sampling widely.",
    placeholder: true,
  },
  {
    id: "editing-01",
    interest: "Video editing",
    title: "Cut & rhythm",
    src: "/images/personality/editing-01.jpg",
    alt: "A dark studio desk with a monitor showing an out-of-focus editing timeline (placeholder image).",
    caption:
      "Cutting for rhythm — deciding what a sequence needs by how it feels to watch, not by a fixed rule.",
    placeholder: true,
  },
  {
    id: "strength-01",
    interest: "Strength training",
    title: "Compound lifts",
    src: "/images/personality/strength-01.jpg",
    alt: "A loaded barbell resting on a squat rack in an empty gym (placeholder image).",
    caption:
      "Compound lifts and steady progression: measurable, unglamorous improvement rather than variety for its own sake.",
    placeholder: true,
  },
  {
    id: "cooking-01",
    interest: "Cooking",
    title: "Prep & process",
    src: "/images/personality/cooking-01.jpg",
    alt: "A wooden cutting board with sliced vegetables and a chef's knife (placeholder image).",
    caption:
      "Prep work and timing, the part of cooking that is closer to assembly than to presentation.",
    placeholder: true,
  },
  {
    id: "gaming-02",
    interest: "Gaming",
    title: "Shared screens",
    src: "/images/personality/gaming-02.jpg",
    alt: "Two empty armchairs facing a dark television in a dim room (placeholder image).",
    caption:
      "Games played with other people, where reading a shared situation and reacting to it is the part that stays interesting.",
    placeholder: true,
  },
  {
    id: "reading-02",
    interest: "Reading",
    title: "Margins & notes",
    src: "/images/personality/reading-02.jpg",
    alt: "A stack of cloth-bound books beside an open notebook and pencil on a dark desk (placeholder image).",
    caption:
      "Keeping notes while reading; a book is only finished here once its argument can be restated afterwards.",
    placeholder: true,
  },
  {
    id: "editing-02",
    interest: "Video editing",
    title: "Colour & tone",
    src: "/images/personality/editing-02.jpg",
    alt: "A colour grading control surface with unlabelled dials under warm lamp light (placeholder image).",
    caption:
      "Lifting flat footage into something with a mood, using small adjustments rather than heavy grades.",
    placeholder: true,
  },
  {
    id: "strength-02",
    interest: "Strength training",
    title: "The routine",
    src: "/images/personality/strength-02.jpg",
    alt: "A row of worn cast-iron dumbbells on a steel rack (placeholder image).",
    caption:
      "A fixed weekly routine — consistency does more for the numbers than any single session does.",
    placeholder: true,
  },
  {
    id: "cooking-02",
    interest: "Cooking",
    title: "From what's there",
    src: "/images/personality/cooking-02.jpg",
    alt: "A steel pot steaming on a gas hob with a wooden spoon resting across the rim (placeholder image).",
    caption:
      "Cooking from what is already in the kitchen, adjusting as it goes instead of following a recipe to the letter.",
    placeholder: true,
  },
];

/**
 * Where the lower row starts in the collection. Offsetting the second row keeps
 * the two strips from mirroring each other as they pass in opposite directions.
 */
export const bottomRowOffset = 3;

export const personality = {
  intro:
    "Five recurring interests, kept as a moving strip rather than a grid — open any frame for a short note on it.",
  note: "Placeholder collection: these ten frames are generated stand-ins, not personal photographs, and every caption is neutral review copy. Both are replaced once real images and notes are available.",
  entries,
} as const;
