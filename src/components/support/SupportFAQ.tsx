"use client";

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FAQItem } from '@/imports';

interface SupportFAQProps {
  faqs: FAQItem[];
}

const SupportFAQ = ({ faqs }: SupportFAQProps) => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-6">
            <button
              className="flex justify-between items-center w-full text-left focus:outline-none"
              onClick={() => toggleFaq(faq.id)}
              aria-expanded={expandedFaq === faq.id}
              aria-controls={`faq-content-${faq.id}`}
            >
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              {expandedFaq === faq.id ? (
                <FiChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <FiChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedFaq === faq.id && (
              <div
                id={`faq-content-${faq.id}`}
                className="mt-4 text-gray-600"
                aria-hidden={expandedFaq !== faq.id}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportFAQ;