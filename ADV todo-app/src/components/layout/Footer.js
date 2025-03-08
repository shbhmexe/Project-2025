import React from 'react';

const Footer = () => (
  <footer className="bg-light py-3 mt-5 text-center">
    <div className="container">
      <p className="mb-0">Advanced React Todo App &copy; {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;