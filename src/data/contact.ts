export type ContactDestination = {
  id: string;
  /** Platform name shown in the section. */
  label: string;
  /**
   * What the entry shows when there is no destination yet — explicit
   * placeholder copy, never a stand-in address or handle.
   */
  value: string;
  /**
   * Real destination only. Use `mailto:` for the email address. When it is
   * absent the entry renders as inert text: never a link, never a dead href,
   * never a focus stop.
   */
  href?: string;
  /** TEMPORARY marker: no destination has been supplied for this entry yet. */
  placeholder?: boolean;
};

/**
 * THE ONE EMAIL DESTINATION.
 *
 * No email address exists anywhere in this project, and the GitHub noreply
 * address in the commit metadata is deliberately not used — it is not a public
 * inbox. So the address is a placeholder: the panel gives it the first row,
 * marks it as a placeholder, and leaves it inert.
 *
 * To publish it, supply the real address and its href together, then drop the
 * placeholder flag:
 *
 *     value: "name@domain.com",
 *     href: "mailto:name@domain.com",
 *
 * Never invent an address.
 */
const email: ContactDestination = {
  id: "email",
  label: "Email",
  value: "Address to be added",
  placeholder: true,
};

/**
 * SECONDARY DESTINATIONS.
 *
 * Only GitHub is real: the profile owns this project's repository remote
 * (`github.com/nkcoder007/naman-portfolio`) and authored every commit in it.
 *
 * Instagram and LinkedIn have no confirmed profile anywhere in the project, so
 * they carry placeholder copy and no href. To publish one, add `href` with the
 * confirmed profile URL and drop `placeholder`.
 */
const socials: readonly ContactDestination[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/nkcoder007",
    href: "https://github.com/nkcoder007",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "Profile to be added",
    placeholder: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Profile to be added",
    placeholder: true,
  },
];

export const contact = {
  /**
   * The closing statement, authored as deliberate lines so the break falls
   * after "Let's Make" at every width instead of wherever the measure lands.
   */
  headline: ["Let's Make", "Something Happen."],
  actionLabel: "Get in Touch",
  panelLabel: "destinations",
  closeLabel: "Close",
  email,
  socials,
} as const;
