
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-12 md:px-12 md:py-20 bg-bone mt-20 border-t border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div>
          <h3 className="text-lg font-bold tracking-tightest uppercase mb-4">RAWLINE</h3>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            Where raw ideas meet defined form. An editorial exploration of garment architecture.
          </p>
        </div>
        <div className="flex flex-col space-y-2 text-[13px] uppercase tracking-widest font-medium">
          <a href="#" className="hover:opacity-50 transition-opacity w-fit">Instagram</a>
          <a href="#" className="hover:opacity-50 transition-opacity w-fit">Archive</a>
          <a href="#" className="hover:opacity-50 transition-opacity w-fit">Journal</a>
        </div>
        <div className="flex flex-col space-y-2 text-[13px] uppercase tracking-widest font-medium">
          <a href="#" className="hover:opacity-50 transition-opacity w-fit">Terms</a>
          <a href="#" className="hover:opacity-50 transition-opacity w-fit">Privacy</a>
          <a href="#" className="hover:opacity-50 transition-opacity w-fit">Contact</a>
        </div>
      </div>
      <div className="mt-20 text-[10px] uppercase tracking-[0.2em] opacity-30">
        &copy; {new Date().getFullYear()} RAWLINE STUDIO. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
