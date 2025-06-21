'use client';

import { features } from '@/constants/landing';

export default function Features() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-gray-900 font-bold mb-12 text-center">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.name}  
                className="bg-white p-8 text-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl text-gray-900 font-semibold mb-3">{feature.name}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}