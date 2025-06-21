'use client';

import { ctaContent } from '@/constants/landing';
import { Button } from '@/imports';
import { useRouter } from 'next/navigation';

export default function CTA() {
    const router = useRouter();
    return (
        <section className="py-12 px-6 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl text-gray-900 font-bold mb-6">
                    {ctaContent.title}
                </h2>
                <p className="text-xl text-gray-500 mb-10 max-w-3xl mx-auto">
                    {ctaContent.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {ctaContent?.buttons?.map((button) => (
                        <Button key={button?.text} onClick={() => router.push(button.href)} className='text-sm py-3 px-6'>
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}