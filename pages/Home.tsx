
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col pt-24">
      <section className="px-6 md:px-12 flex-1 flex flex-col justify-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tightest leading-[0.9] mb-8 uppercase">
          Raw ideas.<br />Defined form.
        </h1>
        <p className="text-lg md:text-2xl font-light leading-relaxed max-w-2xl opacity-80 mb-12">
          RAWLINE explores the architectural stage of creation. The first line drawn before refinement becomes the structure of the garment.
        </p>
        <Link to="/shop" className="group flex items-center space-x-4 w-fit">
          <span className="text-lg uppercase tracking-widest font-bold border-b-2 border-black py-1">Enter Shop</span>
          <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>

      <section className="mt-24 px-6 md:px-12">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img 
            src="https://picsum.photos/seed/rawline-main/2000/1000" 
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
