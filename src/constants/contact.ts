import { ContactInfo } from '@/types/contact';

export const contactInfo: ContactInfo = {
  title: "Get in Touch",
  description: "Have questions or feedback? We'd love to hear from you!",
  form: {
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    messageLabel: "Your Message",
    submitText: "Send Message",
    phoneLabel: "Phone Number (Optional)",
    subjectLabel: "Subject"
  },
  image: {
    src: "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740",
    alt: "Contact Us",
    width: 800,
    height: 600
  },
  socialLinks: [
    {
      platform: "Twitter",
      url: "https://twitter.com/yourcompany",
      icon: "FaTwitter"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/yourcompany",
      icon: "FaLinkedin"
    }
  ],
  businessHours: [
    {
      days: "Monday - Friday",
      hours: "9:00 AM - 5:00 PM"
    },
    {
      days: "Saturday",
      hours: "10:00 AM - 2:00 PM"
    }
  ],
  contactMethods: [
    {
      type: "email",
      value: "support@yourcompany.com",
      label: "Support Email"
    },
    {
      type: "phone",
      value: "+1 (555) 123-4567",
      label: "Customer Service"
    },
    {
      type: "address",
      value: "123 Business Ave, City, ST 12345",
      label: "Headquarters"
    }
  ]
};