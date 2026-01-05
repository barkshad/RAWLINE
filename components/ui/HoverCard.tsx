
import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -4, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" 
      }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`relative group ${className}`}
    >
      {children}
    </motion.div>
  );
};
