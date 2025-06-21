'use client';

import * as FaIcons from 'react-icons/fa';
import Image from 'next/image';
import { TeamMember } from '@/types/about';

interface TeamSectionContent {
  title: string;
  members: TeamMember[];
}

interface AboutContent {
  team: TeamSectionContent;
}

interface TeamSectionProps {
  content: AboutContent['team'];
}

export default function TeamSection({ content }: TeamSectionProps) {
  return (
    <section className="py-20 bg-gray-50 rounded-xl mb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaIcons.FaLinkedin size={18} />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    aria-label={`${member.name}'s Twitter profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaIcons.FaTwitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}