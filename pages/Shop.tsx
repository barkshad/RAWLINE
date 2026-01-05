
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProducts } from '../services/productService';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { Product } from '../types';
import { STAGGER_CONTAINER, FADE_UP, IMAGE_FOCUS } from '../constants/motion';
import { HoverCard } from '../components/ui/HoverCard';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 flex justify-center items-center bg-bone">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-8 h-8 border-2 border-slate/20 border-t-slate rounded-full" 
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-48 px-6 md:px-12 pb-48 bg-bone">
      <header className="mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-[11px] uppercase tracking-[0.6em] font-bold opacity-30 mb-4 text-slate">Archive Catalogue</h2>
          <h1 className="text-7xl font-bold tracking-tightest uppercase text-obsidian">Digital Inventory</h1>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32"
        >
          {products.map((product, idx) => (
            <motion.div key={product.id} variants={FADE_UP}>
              <HoverCard>
                <Link to={`/product/${product.handle}`} className="flex flex-col group">
                  <div className="aspect-[3/4] overflow-hidden mb-10 bg-charcoal/5 relative transition-all duration-700 shadow-sm group-hover:shadow-2xl">
                    <motion.img 
                      whileHover={IMAGE_FOCUS.hover}
                      transition={IMAGE_FOCUS.transition}
                      src={getCloudinaryUrl(product.images[0], { width: 1000 })} 
                      alt={product.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                    />
                    
                    {/* Status Badge (Effect #16 Glow Accent) */}
                    {idx === 0 && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-moss text-bone text-[8px] uppercase tracking-[0.3em] font-bold">
                        Limited
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-clay text-bone text-[8px] uppercase tracking-[0.3em] font-bold">
                        New Entry
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                  </div>
                  
                  <div className="flex justify-between items-start px-2">
                    <div className="space-y-2">
                      <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold opacity-80 group-hover:tracking-[0.4em] group-hover:text-slate transition-all duration-700">{product.title}</h3>
                      <p className="text-[10px] opacity-30 uppercase tracking-[0.2em] font-medium">{product.fabric}</p>
                    </div>
                    <span className="text-[12px] font-bold tracking-widest text-clay opacity-80">${product.price}</span>
                  </div>
                </Link>
              </HoverCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Shop;
