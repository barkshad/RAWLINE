
import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  variant?: 'default' | 'clay' | 'slate' | 'moss';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ 
  children, 
  className = "", 
  animate = true,
  variant = 'default' 
}) => {
  const variants = {
    default: "glass",
    clay: "glass glass-clay",
    slate: "glass glass-slate",
    moss: "glass bg-moss/5 border-moss/10"
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 15 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
