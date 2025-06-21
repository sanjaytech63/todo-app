import { Feature, CTAButton } from '@/types/landing';
import {
  FaCheckCircle,
  FaBolt,
  FaCalendarAlt,
  FaChartBar
} from 'react-icons/fa';

export const heroContent = {
  title: "Organize Your Life with",
  highlightedTitle: "Simplicity",
  description: "Clean and minimal todo list app that helps you stay productive and focused on what matters most.",
  ctaButton: {
    text: "Get Started",
    href: "/signup"
  },
  image: {
    src: "https://cdni.iconscout.com/illustration/premium/thumb/todo-list-illustration-download-in-svg-png-gif-file-formats--checklist-task-food-drink-illustrations-2371075.png",
    alt: "Todo app interface"
  }
};

export const features: Feature[] = [
  {
    name: 'Simple Interface',
    description: 'Intuitive design that gets you started in seconds without any learning curve.',
    icon: FaCheckCircle,
  },
  {
    name: 'Quick Actions',
    description: 'Keyboard shortcuts and swipe gestures to manage tasks efficiently.',
    icon: FaBolt,
  },
  {
    name: 'Smart Scheduling',
    description: 'Set deadlines and reminders to keep your tasks on track.',
    icon: FaCalendarAlt,
  },
  {
    name: 'Progress Tracking',
    description: 'Visual charts to see your productivity trends and accomplishments.',
    icon: FaChartBar,
  }
];

export const ctaContent = {
  title: "Ready to Transform Your Productivity?",
  description: "Join thousands of users who have already simplified their daily tasks and achieved more with our todo app.",
  buttons: [
    {
      text: "Start for Free",
      href: "/register",
      variant: "primary"
    }
  ] as CTAButton[]
};