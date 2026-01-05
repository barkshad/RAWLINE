
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, variant = 'primary', className = "", ...props }) => {
  const base = "sweep-trigger relative py-5 px-10 text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-500";
  const variants = {
    primary: "bg-black text-bone",
    secondary: "bg-transparent border border-black/10 text-black hover:border-black"
  };

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 15px 35px -10px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && <div className="sweep-effect absolute inset-0 pointer-events-none" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
