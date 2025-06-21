'use client';

import * as FaIcons from 'react-icons/fa';
import { AboutContent } from '@/types/about';

export default function ValuesSection({ content }: { content: AboutContent['values'] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {content.items.map((value, index) => {
            const Icon = FaIcons[value.icon as keyof typeof FaIcons] as React.ElementType;
            return (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Icon className="text-indigo-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}