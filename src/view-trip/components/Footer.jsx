import React from 'react';
import { FaRegCopyright } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-gray-200 py-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FaRegCopyright className="text-gray-500" />
          <span>{new Date().getFullYear()} Ayan Das - All rights reserved</span>
        </div>
        <span className="hidden md:block">|</span>
        <span>Built with ❤️ using React</span>
      </div>
    </footer>
  );
}

export default Footer;
