
import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = "" }) => {
  return (
    <div className={`glass shadow-sm ${className}`}>
      {children}
    </div>
  );
};
