
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';

const Shop: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 pb-20">
      <header className="mb-12">
        <h2 className="text-[13px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2">Collection 001</h2>
        <h1 className="text-4xl font-bold tracking-tightest uppercase">First Cut</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {MOCK_PRODUCTS.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.handle}`}
            className="group flex flex-col"
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-charcoal/5">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out grayscale hover:grayscale-0"
              />
            </div>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm uppercase tracking-widest font-bold">{product.title}</h3>
                <p className="text-[12px] opacity-60 uppercase tracking-wider">{product.fabric}</p>
              </div>
              <span className="text-sm font-medium font-sans">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Shop;
