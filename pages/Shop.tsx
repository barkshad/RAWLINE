
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProducts } from '../services/productService';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { Product } from '../types';
import { STAGGER_CONTAINER, FADE_UP, IMAGE_ZOOM } from '../constants/motion';

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
      <main className="min-h-screen pt-32 px-6 md:px-12 flex justify-center items-center">
        <div className="w-6 h-6 border border-black/10 border-t-black rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-40 px-6 md:px-12 pb-32">
      <header className="mb-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold opacity-30 mb-2">Collection 001</h2>
          <h1 className="text-5xl font-bold tracking-tightest uppercase">The First Cut</h1>
        </motion.div>
      </header>

      <AnimatePresence>
        {products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center opacity-40">
            <p className="uppercase tracking-widest text-xs">Awaiting archive entry...</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-24"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={FADE_UP} className="group">
                <Link to={`/product/${product.handle}`} className="flex flex-col">
                  <div className="aspect-[3/4] overflow-hidden mb-8 bg-charcoal/5 relative shadow-sm group-hover:shadow-xl transition-shadow duration-700">
                    <motion.img 
                      whileHover={IMAGE_ZOOM.hover}
                      transition={IMAGE_ZOOM.transition}
                      src={getCloudinaryUrl(product.images[0], { width: 1000 })} 
                      alt={product.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold group-hover:tracking-[0.3em] transition-all duration-700">{product.title}</h3>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-medium">{product.fabric}</p>
                    </div>
                    <span className="text-[11px] font-bold tracking-widest opacity-80">${product.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Shop;
