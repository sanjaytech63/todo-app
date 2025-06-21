import { FC } from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'white' | 'gray';
    className?: string;
}

const Loader: FC<LoaderProps> = ({
    size = 'md',
    color = 'primary',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    const colorClasses = {
        primary: 'text-indigo-600',
        white: 'text-white',
        gray: 'text-gray-400'
    };

    return (
        <div className={`flex items-center  justify-center ${className}`}>
            <svg
                className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#fff"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="#fff"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    );
};

export default Loader;