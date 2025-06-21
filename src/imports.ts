import Button from './components/Button';
import Footer from './components/Footer';
import Loader from "@/components/Loader";
import Navbar from './components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import AuthForm from '@/components/auth/AuthForm';
import InputField from '@/components/InputField';
import TextAreaField from '@/components/TextAreaField';
import SocialAuth from '@/components/auth/SocialAuth';
import HeroSection from '@/components/about/HeroSection';
import StorySection from '@/components/about/StorySection';
import ValuesSection from '@/components/about/ValuesSection';
import TeamSection from '@/components/about/TeamSection';
import { initialTasks } from '@/constants/tasks';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import type { Task } from '@/constants/tasks';
import { faqs, supportChannels } from '@/constants/support';
import SupportFAQ from '@/components/support/SupportFAQ';
import SupportChannels from '@/components/support/SupportChannels';

export * from '@/types/navigation';
export * from '@/types/task';
export * from '@/types/about';
export * from '@/types/support';
export * from '@/types/contact';

export * as NAVIGATION from '@/constants/navigation';
export * as TASKS from '@/constants/tasks';
export * as ABOUT from '@/constants/about';
export * as SUPPORT from '@/constants/support';
export * as CONTACT from '@/constants/contact';

export {
    Button,
    Footer,
    Navbar,
    Hero,
    Features,
    CTA,
    AuthForm,
    SocialAuth,
    InputField,
    HeroSection,
    StorySection,
    ValuesSection,
    TeamSection,
    TextAreaField,
    initialTasks,
    TaskFilters,
    TaskForm,
    TaskList,
    Task,
    SupportChannels,
    faqs,
    SupportFAQ,
    supportChannels,
    Loader
}