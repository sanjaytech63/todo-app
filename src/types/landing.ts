export interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}