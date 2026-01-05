
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProductByHandle } from '../services/productService';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { getFitAdvice } from '../services/geminiService';
import { CartItem, Product } from '../types';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { GlassPanel } from '../components/ui/GlassPanel';
import { FADE_UP, STAGGER_CONTAINER } from '../constants/motion';

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
        <div className="w-8 h-8 border-2 border-slate/20 border-t-slate rounded-full animate-spin"></div>
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
        <div className="lg:col-span-7 space-y-16">
          {product.images.map((publicId, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="aspect-[3/4] bg-charcoal/5 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
                <motion.img 
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                  src={getCloudinaryUrl(publicId, { width: 1600 })} 
                  alt={`${product.title} asset ${i}`} 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1500ms]" 
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Narrative & Controls */}
        <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit space-y-16">
          <motion.header variants={FADE_UP} initial="initial" animate="animate" className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tightest uppercase leading-[0.9] text-obsidian">{product.title}</h1>
            <p className="text-2xl font-light text-clay tracking-tight">${product.price}</p>
          </motion.header>

          <motion.div variants={STAGGER_CONTAINER} initial="initial" animate="animate" className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Selection</h3>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[70px] py-4 text-[10px] font-bold tracking-widest border transition-all duration-500 ${
                      selectedSize === size 
                      ? 'border-clay bg-clay text-bone shadow-lg scale-105' 
                      : 'border-black/5 hover:border-slate/40 hover:text-slate'
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
          </motion.div>

          <div className="space-y-12 pt-12 border-t border-black/5">
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Architecture</h3>
              <p className="text-sm leading-relaxed opacity-60 font-light max-w-lg">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Fabric</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">{product.fabric}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Fit</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">{product.fit}</p>
              </div>
            </div>

            {/* AI Assistant - Effect #50 (Clay Tinted Glass) */}
            <GlassPanel variant="clay" className="p-10 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-clay rounded-full animate-pulse"></div>
                <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-obsidian">Fit Advisor</h3>
              </div>
              
              <textarea
                value={userDetails}
                onChange={(e) => setUserDetails(e.target.value)}
                placeholder="Share your proportions (e.g. 6'2, athletic build)..."
                className="w-full bg-transparent border-b border-clay/20 focus:border-clay outline-none py-4 text-xs tracking-wider placeholder:text-clay/30 transition-all h-20 resize-none"
              />
              
              <button 
                onClick={handleAskAI}
                disabled={isAskingAI || !userDetails.trim()}
                className="text-[9px] uppercase tracking-[0.4em] font-bold hover:text-clay disabled:opacity-30 transition-all block w-full text-left"
              >
                {isAskingAI ? 'Consulting Archive...' : 'Request Insight'}
              </button>
              
              <AnimatePresence>
                {fitAdvice && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-6 text-xs italic text-clay leading-relaxed border-t border-clay/10"
                  >
                    {fitAdvice}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
