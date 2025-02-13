import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} 玄易通. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 