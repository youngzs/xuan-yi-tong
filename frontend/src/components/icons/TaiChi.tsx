import React from 'react';

interface TaiChiProps {
  className?: string;
}

const TaiChi: React.FC<TaiChiProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="currentColor"
    >
      <path d="M50 0A50 50 0 0 1 50 100A50 50 0 0 1 50 0ZM50 15A35 35 0 0 0 50 85A35 35 0 0 1 50 15Z" />
      <circle cx="50" cy="25" r="8" fill="white" />
      <circle cx="50" cy="75" r="8" />
    </svg>
  );
};

export default TaiChi; 