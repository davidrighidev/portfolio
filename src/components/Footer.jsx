import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white sm:px-20 px-5 pb-5 mt-30">
      <div className="flex gap-10 flex-col sm:flex-row items-baseline">
        <div className="flex-2 text-2xl md:text-5xl font-[500] tracking-tighter">
          <p>© 2025 David Righi</p>
          <p>All rights reserved.</p>
        </div>
        <div className="flex-1 text-md md:text-2xl">
          <p>Available for work and always looking for exciting projects!</p>
          <a
            href="mailto:david@davidrighi.com"
            className="md:text-sm text-xs underline cursor-pointer flex sm:mt-2 mt-4"
          >
            david@davidrighi.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
