
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../services/productService';
import { getCloudinaryUrl } from '../services/cloudinaryService';
import { Product } from '../types';

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
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 pb-20">
      <header className="mb-12">
        <h2 className="text-[13px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2">Collection 001</h2>
        <h1 className="text-4xl font-bold tracking-tightest uppercase">First Cut</h1>
      </header>

      {products.length === 0 ? (
        <div className="py-20 text-center opacity-40">
          <p className="uppercase tracking-widest text-sm">No products available at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.handle}`}
              className="group flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-charcoal/5">
                <img 
                  src={getCloudinaryUrl(product.images[0], { width: 800 })} 
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
      )}
    </main>
  );
};

export default Shop;
