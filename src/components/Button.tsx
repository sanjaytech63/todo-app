'use client';

import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  text?: string;
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  children,
  className = '',
  iconClassName = '',
  textClassName = '',
  href,
  type = 'button',
  disabled = false,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  const content = children || (
    <>
      {icon && <span className={iconClassName}>{icon}</span>}
      {text}
    </>
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative px-5 py-2.5 
        bg-indigo-600 
        text-white font-medium 
        rounded-lg 
        overflow-hidden 
        group
        hover:bg-indigo-700
        transition-all duration-300 ease-out
        cursor-pointer
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span 
        className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
        aria-hidden="true"
      />
      <span className={`relative flex items-center gap-2 ${textClassName}`}>
        {content}
      </span>
    </button>
  );
};

export default Button;