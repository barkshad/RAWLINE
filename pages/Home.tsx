
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { fetchSiteContent, SiteContent } from '../services/contentService';

const Home: React.FC = () => {
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
    <main className="min-h-screen flex flex-col pt-24">
      <section className="px-6 md:px-12 flex-1 flex flex-col justify-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tightest leading-[0.9] mb-8 uppercase whitespace-pre-line">
          {content.home.headline}
        </h1>
        <p className="text-lg md:text-2xl font-light leading-relaxed max-w-2xl opacity-80 mb-12">
          {content.home.subheadline}
        </p>
        <Link to="/shop" className="group flex items-center space-x-4 w-fit">
          <span className="text-lg uppercase tracking-widest font-bold border-b-2 border-black py-1">Enter Shop</span>
          <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>

      <section className="mt-24 px-6 md:px-12">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-charcoal/5">
          <img 
            src={getCloudinaryUrl(content.home.heroImageId, { width: 2000 })} 
            className="w-full h-full object-cover filter grayscale"
            alt="RAWLINE editorial"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
