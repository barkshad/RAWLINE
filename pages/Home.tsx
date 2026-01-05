
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
    <div className="min-h-screen flex items-center justify-center bg-bone">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-12 h-12 border border-black/5 border-t-black rounded-full" 
      />
    </div>
  );

  const headlineLines = content.home.headline.split('\n');

  return (
    <main className="min-h-screen flex flex-col pt-32 md:pt-48 overflow-hidden bg-bone">
      <section className="px-6 md:px-12 flex-1 flex flex-col justify-center max-w-6xl">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          <div className="overflow-hidden">
            {headlineLines.map((line, idx) => (
              <motion.h1 
                key={idx}
                variants={FADE_UP}
                className="text-7xl md:text-[11rem] font-bold tracking-tightest leading-[0.8] uppercase"
              >
                {line}
              </motion.h1>
            ))}
          </div>
          
          <motion.p 
            variants={FADE_UP}
            className="text-xl md:text-3xl font-light leading-relaxed max-w-3xl opacity-50 font-sans"
          >
            {content.home.subheadline}
          </motion.p>
          
          <motion.div variants={FADE_UP} className="pt-12">
            <Link to="/shop" className="group flex items-center space-x-12 w-fit">
              <span className="text-sm uppercase tracking-[0.5em] font-bold py-2 relative overflow-hidden">
                Archive Selection
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700" />
              </span>
              <motion.div 
                whileHover={{ x: 20 }}
                className="w-20 h-[1px] bg-black/10 group-hover:bg-black transition-all duration-700" 
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="mt-48 px-6 md:px-12 relative pb-32">
        <Reveal delay={0.6}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-charcoal/5 group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm">
            <motion.img 
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
              src={getCloudinaryUrl(content.home.heroImageId, { width: 2400 })} 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[2000ms] ease-out"
              alt="RAWLINE editorial"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000"></div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default Home;
