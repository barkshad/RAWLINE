
import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }}
      className={`relative group ${className}`}
    >
      {children}
    </motion.div>
  );
};
