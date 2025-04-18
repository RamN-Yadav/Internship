import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-500 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <p className="text-2xl font-bold">SKILL EDUCATION</p>
          <p className="text-lg">Empowering students, professionals, and organizations</p>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex justify-center gap-8 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 text-3xl">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 text-3xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700 text-3xl">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-600 text-3xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className="text-base">
          <p>&copy; {new Date().getFullYear()} Skill Education. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;