import { NavLink, FooterLink, SocialLink } from '@/types/navigation';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Support', href: '/support' },
  { name: 'Contact', href: '/contact' },
];

export const footerLinks: FooterLink[] = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' },
  { name: 'Tutorials', href: '/tutorials' },
  { name: 'Support', href: '/support' },
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' }
];

export const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: 'https://twitter.com', icon: 'FaTwitter' },
  { name: 'Facebook', href: 'https://facebook.com', icon: 'FaFacebook' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'FaInstagram' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'FaLinkedin' }
];