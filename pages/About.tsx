
import React from 'react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-40 px-6 md:px-12 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-[13px] uppercase tracking-[0.4em] font-bold opacity-30 mb-8">Philosophy</h2>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tightest uppercase leading-[0.9] mb-16">
          The first line before refinement.
        </h1>
        
        <div className="space-y-12 text-lg md:text-xl font-light leading-relaxed opacity-80">
          <p>
            RAWLINE explores the raw stage of creation — the intuitive sketch made physical. We believe that the most powerful form of expression exists at the inception of an idea, before it is softened by the pressure of perfection.
          </p>
          <p>
            Each piece in our collection is an architectural exercise. We focus on weight, silhouette, and the way a fabric holds a line. Our production is intentional, small-scale, and permanent. We do not restock; we evolve.
          </p>
          <p>
            Designed from instinct. Built for the individual.
          </p>
        </div>

        <div className="mt-24 aspect-[21/9] bg-charcoal/5 grayscale overflow-hidden">
          <img src="https://picsum.photos/seed/about/1500/800" className="w-full h-full object-cover" alt="Studio" />
        </div>
      </div>
    </main>
  );
};

export default About;
