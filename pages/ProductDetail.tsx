
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProductByHandle } from '../services/productService';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { getFitAdvice } from '../services/geminiService';
import { CartItem, Product } from '../types';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { Reveal } from '../components/ui/Reveal';
import { FADE_UP } from '../constants/motion';

interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [userDetails, setUserDetails] = useState('');
  const [fitAdvice, setFitAdvice] = useState<string>('');
  const [isAskingAI, setIsAskingAI] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      const data = await fetchProductByHandle(handle);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 flex justify-center items-center">
        <div className="w-6 h-6 border border-black/10 border-t-black rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!product) return null;

  const handleAskAI = async () => {
    if (!userDetails.trim()) return;
    setIsAskingAI(true);
    const advice = await getFitAdvice(product.title, userDetails);
    setFitAdvice(advice);
    setIsAskingAI(false);
  };

  return (
    <main className="min-h-screen pt-40 px-6 md:px-12 pb-32 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Visual Archive */}
        <div className="lg:col-span-7 space-y-12">
          {product.images.map((publicId, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="aspect-[3/4] bg-charcoal/5 relative overflow-hidden shadow-2xl">
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                  src={getCloudinaryUrl(publicId, { width: 1600 })} 
                  alt={`${product.title} asset ${i}`} 
                  className="w-full h-full object-cover filter grayscale" 
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Narrative & Controls */}
        <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit space-y-16">
          <motion.header variants={FADE_UP} initial="initial" animate="animate" className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tightest uppercase leading-[0.9]">{product.title}</h1>
            <p className="text-2xl font-light opacity-60 tracking-tight">${product.price}</p>
          </motion.header>

          <Reveal delay={0.2} className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Selection</h3>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[70px] py-4 text-[10px] font-bold tracking-widest border transition-all duration-500 ${
                      selectedSize === size 
                      ? 'border-black bg-black text-bone shadow-lg scale-105' 
                      : 'border-black/5 hover:border-black/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <AnimatedButton
              onClick={() => selectedSize ? onAddToCart({ product, size: selectedSize, quantity: 1 }) : alert('Select Size')}
              className="w-full"
            >
              Add to Archive
            </AnimatedButton>
          </Reveal>

          <Reveal delay={0.4} className="space-y-12 pt-12 border-t border-black/5">
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Architecture</h3>
              <p className="text-sm leading-relaxed opacity-60 font-light max-w-lg">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Fabric</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest">{product.fabric}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Fit</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest">{product.fit}</p>
              </div>
            </div>

            {/* AI Assistant - Editorial Glass Style */}
            <div className="p-8 glass space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-brand-glow"></div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Fit Inquiry</h3>
              </div>
              
              <textarea
                value={userDetails}
                onChange={(e) => setUserDetails(e.target.value)}
                placeholder="Height, weight, preference..."
                className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-3 text-xs tracking-wider placeholder:opacity-20 transition-all h-16 resize-none"
              />
              
              <button 
                onClick={handleAskAI}
                disabled={isAskingAI || !userDetails.trim()}
                className="text-[9px] uppercase tracking-[0.3em] font-bold hover:opacity-50 disabled:opacity-20 transition-all block w-full text-left"
              >
                {isAskingAI ? 'Consulting Archive...' : 'Request Insight'}
              </button>
              
              <AnimatePresence>
                {fitAdvice && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 text-xs italic opacity-60 leading-relaxed border-t border-black/5"
                  >
                    {fitAdvice}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
