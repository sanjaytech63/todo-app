import { HeroSection, StorySection, ValuesSection, TeamSection } from '@/imports';
import { aboutContent } from '@/constants/about';

export default function AboutPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4">
      <HeroSection content={aboutContent?.hero} />
      <StorySection content={aboutContent?.story} />
      <ValuesSection content={aboutContent?.values} />
      <TeamSection content={aboutContent?.team} />
    </div>
  );
}