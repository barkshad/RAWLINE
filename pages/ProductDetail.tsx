
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { getFitAdvice } from '../services/geminiService';
import { CartItem } from '../types';

interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { handle } = useParams<{ handle: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.handle === handle);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [userDetails, setUserDetails] = useState('');
  const [fitAdvice, setFitAdvice] = useState<string>('');
  const [isAskingAI, setIsAskingAI] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-12">
        <p>Product not found.</p>
        <Link to="/shop" className="underline mt-4 block">Back to Shop</Link>
      </div>
    );
  }

  const handleAskAI = async () => {
    if (!userDetails.trim()) return;
    setIsAskingAI(true);
    const advice = await getFitAdvice(product.title, userDetails);
    setFitAdvice(advice);
    setIsAskingAI(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Please select a size');
    onAddToCart({
      product,
      size: selectedSize,
      quantity: 1
    });
  };

  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6">
          {product.images.map((img, i) => (
            <div key={i} className="aspect-[3/4] bg-charcoal/5">
              <img src={img} alt={`${product.title} detail ${i}`} className="w-full h-full object-cover filter grayscale" />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-32 h-fit space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tightest uppercase leading-none">{product.title}</h1>
            <p className="text-xl font-medium">${product.price}</p>
          </header>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 text-sm font-medium border transition-all ${
                      selectedSize === size 
                      ? 'border-black bg-black text-bone' 
                      : 'border-black/10 hover:border-black/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-black text-bone text-sm uppercase tracking-[0.2em] font-bold hover:bg-black/90 transition-colors"
            >
              Add to Bag
            </button>
          </div>

          <div className="space-y-10 pt-10 border-t border-black/5">
            <section className="space-y-2">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Description</h3>
              <p className="text-sm leading-relaxed opacity-80">{product.description}</p>
            </section>

            <section className="space-y-2">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Fit & Material</h3>
              <ul className="text-sm space-y-1 opacity-80">
                <li><span className="font-bold opacity-60">Fabric:</span> {product.fabric}</li>
                <li><span className="font-bold opacity-60">Fit:</span> {product.fit}</li>
              </ul>
            </section>

            {/* AI Fit Assistant */}
            <section className="p-6 bg-black/5 rounded-sm space-y-4">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2 animate-pulse"></span>
                Fit Assistant
              </h3>
              <p className="text-xs opacity-60 italic">Describe your typical size or how you like things to fit.</p>
              <textarea
                value={userDetails}
                onChange={(e) => setUserDetails(e.target.value)}
                placeholder="e.g. I am 6ft tall, prefer things oversized."
                className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-2 text-sm resize-none h-20 placeholder:opacity-40"
              />
              <button 
                onClick={handleAskAI}
                disabled={isAskingAI || !userDetails.trim()}
                className="text-[10px] uppercase tracking-widest font-bold flex items-center hover:opacity-50 disabled:opacity-20 transition-opacity"
              >
                {isAskingAI ? 'Consulting...' : 'Get Advice'}
              </button>
              {fitAdvice && (
                <div className="mt-4 p-4 bg-white/50 border-l-2 border-black text-sm leading-relaxed">
                  {fitAdvice}
                </div>
              )}
            </section>

            <section className="space-y-2">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40">Care</h3>
              <p className="text-sm opacity-80">{product.care}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
