
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { fetchSiteContent, SiteContent } from '../services/contentService';
import { Reveal } from '../components/ui/Reveal';
import { STAGGER_CONTAINER, FADE_UP } from '../constants/motion';

const Home: React.FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetchSiteContent().then(setContent);
  }, []);

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-8 h-8 border border-black/10 border-t-black rounded-full" 
      />
    </div>
  );

  return (
    <main className="min-h-screen flex flex-col pt-24 overflow-hidden">
      <section className="px-6 md:px-12 flex-1 flex flex-col justify-center max-w-5xl">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          <motion.h1 
            variants={FADE_UP}
            className="text-7xl md:text-[10rem] font-bold tracking-tightest leading-[0.85] uppercase whitespace-pre-line"
          >
            {content.home.headline}
          </motion.h1>
          
          <motion.p 
            variants={FADE_UP}
            className="text-lg md:text-2xl font-light leading-relaxed max-w-2xl opacity-60"
          >
            {content.home.subheadline}
          </motion.p>
          
          <motion.div variants={FADE_UP} className="pt-8">
            <Link to="/shop" className="group flex items-center space-x-6 w-fit">
              <span className="text-sm uppercase tracking-[0.3em] font-bold border-b border-black/20 group-hover:border-black py-2 transition-all">Enter Archive</span>
              <div className="w-12 h-[1px] bg-black/20 group-hover:w-16 group-hover:bg-black transition-all" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="mt-32 px-6 md:px-12 relative">
        <Reveal delay={0.4}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-charcoal/5 group shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              src={getCloudinaryUrl(content.home.heroImageId, { width: 2400 })} 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
              alt="RAWLINE editorial"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000"></div>
            {/* Subtle Gradient Border Accent */}
            <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default Home;
