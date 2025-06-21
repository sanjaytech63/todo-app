'use client';

import { NAVIGATION } from '@/imports';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">

          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Todo App
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                Organize your tasks and boost productivity with our simple yet powerful todo application.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-8 lg:col-span-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Product</h3>
                <ul className="space-y-3">
                  {NAVIGATION?.footerLinks?.slice(0, 4)?.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-3">
                  {NAVIGATION?.footerLinks?.slice(4, 8)?.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  {NAVIGATION?.footerLinks?.slice(8)?.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-12 lg:col-span-3">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Connect with us</h3>
              <div className="flex space-x-4">
                {NAVIGATION?.socialLinks?.map(({ name, href, icon }) => {
                  const Icon = FaIcons[icon];
                  return (
                    <Link
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white p-2 rounded-full transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>

              <div className="text-gray-400 text-xs">
                <p>Subscribe to our newsletter</p>
                <form className="mt-2 flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 text-white text-sm px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r-md text-sm transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-4 md:mb-0">
            &copy; {currentYear} Todo App. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;