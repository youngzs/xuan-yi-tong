import React from 'react';

interface PlaceholderImageProps {
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
};

export default PlaceholderImage; 