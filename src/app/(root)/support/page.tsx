"use client";

import { useState } from 'react';
import { faqs, supportChannels, SupportFAQ, SupportChannels, Button } from '@/imports';
import { useRouter } from 'next/navigation';

const Support = () => {
    const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
    const router = useRouter();
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center my-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions or get in touch with our support team
                    </p>
                </div>

                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'faq'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('faq')}
                    >
                        FAQ
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'contact'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('contact')}
                    >
                        Contact Support
                    </button>
                </div>

                {activeTab === 'faq' ? (
                    <SupportFAQ faqs={faqs} />
                ) : (
                    <SupportChannels channels={supportChannels} />
                )}

                <div className="mt-12 bg-indigo-50 rounded-lg p-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
                        <p className="text-gray-600 mb-6">
                            Can not find what you are looking for? Our team is happy to help you with any questions you may have.
                        </p>
                        <Button
                            onClick={()=>router.push("/contact")}
                            className=" px-4 py-2 text-center w-fit text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors"
                        >
                            Contact Our Team
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;