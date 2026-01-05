
import React from 'react';
import { motion } from 'framer-motion';
import { BUTTON_HOVER } from '../../constants/motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = "",
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden py-5 px-8 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-500";
  const variants = {
    primary: "bg-black text-bone",
    secondary: "bg-transparent border border-black/10 hover:border-black text-black"
  };

  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      variants={BUTTON_HOVER}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Light Sweep Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-[-15deg] animate-sweep opacity-30"></div>
        </div>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
