
import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = "", animate = true }) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      className={`glass ${className}`}
    >
      {children}
    </motion.div>
  );
};
