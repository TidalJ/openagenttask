import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-200 text-white py-6 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} MySite. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
