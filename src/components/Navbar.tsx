'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { navLinks } from '@/constants/navigation';
import { Button } from '@/imports';
import { useAuthStore } from '@/stores/authStore';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();

    console.log(user?.name);
    

    useEffect(() => {
        setIsMounted(true);
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
    }, []);

    useEffect(() => {
        if (isMounted) {
            if (darkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [darkMode, isMounted]);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    if (!isMounted) {
        return null;
    }


    return (
        <nav className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                            aria-label="Home"
                            passHref
                        >
                            <div className="bg-indigo-600 dark:bg-indigo-700 p-2 rounded-lg group-hover:bg-indigo-700 dark:group-hover:bg-indigo-600 transition-colors duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                                Todo App
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-3 py-2 rounded-md text-sm font-medium ${pathname === link.href
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                        } transition-colors`}
                                >
                                    {link.name}
                                    {pathname === link.href && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
                                    )}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 ml-6">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-gray-700 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                            >
                                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button>

                            {user ? (
                                <div className='flex items-center gap-2'>
                                    <Button onClick={() => router.push("/task")} className='text-sm'>
                                        Add Task
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            await logout();
                                            router.push("/");
                                        }}
                                        className='text-sm'
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <Button onClick={() => router.push("/register")} className='text-sm'>
                                        Sign Up
                                    </Button>
                                    <Button onClick={() => router.push("/login")} className='text-sm'>
                                        Sign In
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div
                    className="fixed inset-0 bg-black/50 "
                    onClick={() => setIsMenuOpen(false)}
                />
                <div
                    className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full overflow-y-auto">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex-shrink-0 flex items-center">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 group"
                                    aria-label="Home"
                                    passHref
                                >
                                    <div className="bg-indigo-600 dark:bg-indigo-700 p-2 rounded-lg group-hover:bg-indigo-700 dark:group-hover:bg-indigo-600 transition-colors duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                                        Todo App
                                    </span>
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Close menu"
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex-1 px-4 py-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        } transition-colors`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Dark Mode
                                </span>
                                <button
                                    onClick={toggleTheme}
                                    className="relative inline-flex h-6 cursor-pointer w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors"
                                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {user ? (
                                <div className='flex items-center gap-2'>
                                    <Button onClick={() => router.push("/task")} className='text-sm'>
                                        Add Task
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            await logout();
                                            router.push("/");
                                        }}
                                        className='text-sm'
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <Button onClick={() => router.push("/register")} className='text-sm'>
                                        Sign Up
                                    </Button>
                                    <Button onClick={() => router.push("/login")} className='text-sm'>
                                        Sign In
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;