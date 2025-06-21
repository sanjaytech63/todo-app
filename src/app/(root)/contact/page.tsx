'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { CONTACT, InputField, Loader, TextAreaField } from '@/imports';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would call an API here
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden w-full">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 sm:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{CONTACT?.contactInfo?.title}</h1>
            <p className="text-gray-600 mb-8">{CONTACT?.contactInfo?.description}</p>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-600">We'll get back to you soon.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md cursor-pointer hover:bg-green-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label={CONTACT?.contactInfo.form.nameLabel || 'Name'}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <InputField
                  label={CONTACT?.contactInfo.form.nameLabel || 'Email'}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <TextAreaField
                  label={CONTACT?.contactInfo.form.messageLabel || 'Message'}
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center cursor-pointer items-center py-3 px-6 rounded-lg text-white font-medium transition-colors ${isSubmitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                >
                  {isSubmitting ? (
                    <div className='flex gap-3 items-center'>
                      <Loader />
                      <span> Sending...</span>
                    </div>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      {CONTACT?.contactInfo.form.submitText || 'Send Message'}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
            {CONTACT?.contactInfo.image.src && (
              <Image
                src={CONTACT?.contactInfo.image.src}
                alt={CONTACT?.contactInfo.image.alt || 'Contact us'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}