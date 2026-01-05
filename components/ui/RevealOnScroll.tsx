
import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../constants/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const RevealOnScroll: React.FC<RevealProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: FADE_UP.initial,
        animate: { 
          ...FADE_UP.animate, 
          transition: { ...FADE_UP.transition, delay } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
