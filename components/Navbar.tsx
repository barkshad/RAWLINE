
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass px-6 py-6 md:px-12 md:py-8 flex justify-between items-center">
      <Link to="/" className="group relative">
        <span className="text-xl font-bold tracking-tightest uppercase brand-gradient transition-all duration-700">RAWLINE</span>
        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-700"></div>
      </Link>
      <div className="flex space-x-8 md:space-x-12 text-[12px] uppercase tracking-[0.2em] font-bold">
        <Link to="/shop" className="relative group overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
          Shop
          <motion.div className="absolute bottom-0 left-0 w-full h-[1px] bg-black translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500" />
        </Link>
        <Link to="/about" className="relative group overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
          About
          <motion.div className="absolute bottom-0 left-0 w-full h-[1px] bg-black translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500" />
        </Link>
        <Link to="/cart" className="group flex items-center opacity-60 hover:opacity-100 transition-opacity">
          Cart 
          <span className="ml-2 bg-black text-bone px-2 py-0.5 text-[9px] rounded-full group-hover:scale-110 transition-transform">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
