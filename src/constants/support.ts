import { FAQItem, SupportChannel } from '@/types/support';

export const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on "Forgot Password" on the login page and following the instructions sent to your email.'
  },
  {
    id: '2',
    question: 'Where can I find my task history?',
    answer: 'Your task history is available in the "Completed Tasks" section of your dashboard.'
  },
  {
    id: '3',
    question: 'How do I share tasks with team members?',
    answer: 'You can share tasks by clicking the "Share" button on any task and entering your team member\'s email address.'
  },
  {
    id: '4',
    question: 'Is there a mobile app available?',
    answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the respective app stores.'
  }
];

export const supportChannels: SupportChannel[] = [
  {
    id: '1',
    title: 'Email Support',
    description: 'Get help via email from our support team',
    icon: 'FiMail',
    contact: 'support@todoapp.com',
    responseTime: 'Within 24 hours'
  },
  {
    id: '2',
    title: 'Live Chat',
    description: 'Chat with our support agents in real-time',
    icon: 'FiMessageSquare',
    contact: 'Start Chat',
    responseTime: 'Within 5 minutes'
  },
  {
    id: '3',
    title: 'Help Center',
    description: 'Browse our comprehensive knowledge base',
    icon: 'FiHelpCircle',
    contact: 'Visit Help Center',
    responseTime: 'Instant access'
  },
  {
    id: '4',
    title: 'Community Forum',
    description: 'Get help from other Todo App users',
    icon: 'FiUsers',
    contact: 'Join Community',
    responseTime: 'Varies'
  }
];