
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bone/80 backdrop-blur-sm px-6 py-6 md:px-12 md:py-8 flex justify-between items-center border-b border-black/5">
      <Link to="/" className="text-xl font-bold tracking-tightest uppercase">RAWLINE</Link>
      <div className="flex space-x-8 md:space-x-12 text-[13px] uppercase tracking-widest font-medium">
        <Link to="/shop" className="hover:opacity-50 transition-opacity">Shop</Link>
        <Link to="/about" className="hover:opacity-50 transition-opacity">About</Link>
        <Link to="/cart" className="hover:opacity-50 transition-opacity flex items-center">
          Cart <span className="ml-2 bg-black text-bone px-1.5 py-0.5 text-[10px] rounded-full">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
