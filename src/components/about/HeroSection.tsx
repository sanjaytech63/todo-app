'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AboutContent } from '@/types/about';

export default function HeroSection({ content }: { content: AboutContent['hero'] }) {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.title} <span className="text-indigo-600">{content.highlightedTitle}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={content.ctaPrimary.link}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
              >
                {content.ctaPrimary.text}
              </Link>
              <Link
                href={content.ctaSecondary.link}
                className="border border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 font-semibold py-3 px-6 rounded-xl transition duration-300"
              >
                {content.ctaSecondary.text}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={600}
              height={400}
              className="w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}