
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProducts } from '../services/productService';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { Product } from '../types';
import { STAGGER_CONTAINER, FADE_UP, IMAGE_ZOOM } from '../constants/motion';
import { HoverCard } from '../components/ui/HoverCard';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchAllProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 flex justify-center items-center bg-bone">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-8 border border-black/10 border-t-black rounded-full" 
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-48 px-6 md:px-12 pb-48 bg-bone">
      <header className="mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-[11px] uppercase tracking-[0.5em] font-bold opacity-30 mb-4">Volume I</h2>
          <h1 className="text-7xl font-bold tracking-tightest uppercase">The Archive</h1>
        </motion.div>
      </header>

      <AnimatePresence>
        {products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center opacity-30">
            <p className="uppercase tracking-[0.3em] text-[10px] font-bold">Catalogue synchronization in progress...</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={FADE_UP}>
                <HoverCard>
                  <Link to={`/product/${product.handle}`} className="flex flex-col">
                    <div className="aspect-[3/4] overflow-hidden mb-10 bg-charcoal/5 relative shadow-sm transition-all duration-700">
                      <motion.img 
                        whileHover={IMAGE_ZOOM.hover}
                        transition={IMAGE_ZOOM.transition}
                        src={getCloudinaryUrl(product.images[0], { width: 1000 })} 
                        alt={product.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                    </div>
                    
                    <div className="flex justify-between items-start px-2">
                      <div className="space-y-2">
                        <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold opacity-80 group-hover:tracking-[0.35em] transition-all duration-700">{product.title}</h3>
                        <p className="text-[10px] opacity-30 uppercase tracking-[0.2em] font-medium">{product.fabric}</p>
                      </div>
                      <span className="text-[12px] font-bold tracking-widest opacity-60">${product.price}</span>
                    </div>
                  </Link>
                </HoverCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Shop;
