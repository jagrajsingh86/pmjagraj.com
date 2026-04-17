export type AvailabilityStatus = "open" | "passive" | "closed";

export interface Site {
  name: string;
  shortName: string;
  monogram: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  resumePath: string;
  socials: {
    linkedin: string;
    github: string;
    email: string;
    calendly?: string;
  };
  availability: {
    status: AvailabilityStatus;
    note: string;
    lastUpdated: string;
  };
  ataGlance: {
    label: string;
    value: string;
  }[];
}

export interface Role {
  id: string;
  company: string;
  companyUrl?: string;
  title: string;
  client?: string;
  location?: string;
  start: string;
  end: string;
  lede?: string;
  bullets: string[];
  stack: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface MetricTile {
  value: string;
  label: string;
}

export interface CompanyMark {
  name: string;
  logo?: string;
}

export interface WorkCard {
  slug: string;
  client: string;
  timeframe: string;
  title: string;
  outcome: string;
  chips: string[];
  status: "live" | "stub";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  linkedin?: string;
}
