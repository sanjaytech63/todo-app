export interface NavLink {
  name: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: keyof typeof import('react-icons/fa');
}

