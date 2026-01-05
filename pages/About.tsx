
import React, { useEffect, useState } from 'react';
import { fetchSiteContent, SiteContent } from '../services/contentService';
import { getCloudinaryUrl } from '../services/cloudinaryService';

const About: React.FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetchSiteContent().then(setContent);
  }, []);

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border border-black border-t-transparent animate-spin rounded-full"></div>
    </div>
  );

  return (
    <main className="min-h-screen pt-40 px-6 md:px-12 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-[13px] uppercase tracking-[0.4em] font-bold opacity-30 mb-8">Philosophy</h2>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tightest uppercase leading-[0.9] mb-16">
          {content.about.heading}
        </h1>
        
        <div className="space-y-12 text-lg md:text-xl font-light leading-relaxed opacity-80">
          {content.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-24 aspect-[21/9] bg-charcoal/5 grayscale overflow-hidden">
          <img 
            src={getCloudinaryUrl(content.about.studioImageId, { width: 1500 })} 
            className="w-full h-full object-cover" 
            alt="Studio" 
          />
        </div>
      </div>
    </main>
  );
};

export default About;
