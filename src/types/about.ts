
export interface AboutHero {
  title: string;
  highlightedTitle: string;
  description: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary: {
    text: string;
    link: string;
  };
  image: string;
  imageAlt: string;
}

export interface AboutStory {
  title: string;
  paragraphs: string[];
}

export interface AboutValue {
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  social: {
    linkedin: string;
    twitter: string;
  };
}

export interface AboutCTA {
  title: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
}

export interface AboutContent {
  hero: AboutHero;
  story: AboutStory;
  values: AboutValuesSection;
  team: TeamMember[];
  cta: AboutCTA;
}

export interface AboutValuesSection {
  title: string;
  items: AboutValue[];
}