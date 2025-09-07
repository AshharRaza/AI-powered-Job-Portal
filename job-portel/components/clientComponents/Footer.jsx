import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <p>© 2025 JobPortel. All rights reserved.</p>
        <div className="flex space-x-4">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
