'use client';

import { AboutContent } from '@/types/about';

export default function StorySection({ content }: { content: AboutContent['story'] }) {
  return (
    <section className="py-20 bg-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}