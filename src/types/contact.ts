// types/contact.ts
export interface ContactSocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactFormFields {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitText: string;
  phoneLabel?: string;
  subjectLabel?: string;
}

export interface ContactImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ContactInfo {
  title: string;
  description: string;
  form: ContactFormFields;
  image: ContactImage;
  socialLinks?: ContactSocialLink[];
  businessHours?: {
    days: string;
    hours: string;
  }[];
  contactMethods?: {
    type: 'email' | 'phone' | 'address';
    value: string;
    label?: string;
  }[];
}