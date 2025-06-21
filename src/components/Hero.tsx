'use client';

import Image from 'next/image';
import { heroContent } from '@/constants/landing';
import { Button } from '@/imports';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  return (
    <section className="py-12 pt-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center md:flex-row">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl text-gray-900 md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {heroContent.title} <span className="text-indigo-600">{heroContent.highlightedTitle}</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-lg">
            {heroContent.description}
          </p>
          <Button onClick={() => router.push(heroContent.ctaButton.href)} className='text-sm py-3 px-6'>
            {heroContent.ctaButton.text}
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={heroContent.image.src}
            alt={heroContent.image.alt}
            width={600}
            height={500}
            className="w-full max-w-md lg:max-w-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}