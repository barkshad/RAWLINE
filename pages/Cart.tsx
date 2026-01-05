
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onRemove: (index: number) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 flex flex-col justify-center items-center text-center space-y-6">
        <h1 className="text-3xl font-bold uppercase tracking-tightest">Your Bag is Empty</h1>
        <Link to="/shop" className="px-10 py-4 bg-black text-bone text-xs uppercase tracking-[0.2em] font-bold">Return to Shop</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 pb-20 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold uppercase tracking-tightest mb-12">Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          {items.map((item, idx) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-6 pb-12 border-b border-black/5">
              <div className="w-24 md:w-40 aspect-[3/4] bg-charcoal/5 flex-shrink-0 overflow-hidden">
                <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover grayscale" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest">{item.product.title}</h3>
                    <p className="text-xs opacity-50 uppercase tracking-widest">Size: {item.size}</p>
                  </div>
                  <span className="text-sm font-medium">${item.product.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-black/10 rounded-sm">
                    <button onClick={() => onUpdateQuantity(idx, -1)} className="px-3 py-1 text-lg hover:bg-black/5">-</button>
                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(idx, 1)} className="px-3 py-1 text-lg hover:bg-black/5">+</button>
                  </div>
                  <button onClick={() => onRemove(idx)} className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 bg-black/5 p-8 h-fit">
          <h2 className="text-[13px] uppercase tracking-[0.2em] font-bold opacity-60">Order Summary</h2>
          <div className="space-y-4 border-b border-black/5 pb-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="opacity-40 italic">Calculated at next step</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 uppercase tracking-tighter">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
          <button className="w-full py-5 bg-black text-bone text-sm uppercase tracking-[0.2em] font-bold hover:bg-black/90 transition-colors">
            Checkout
          </button>
          <div className="pt-4 text-[10px] opacity-40 uppercase tracking-widest text-center leading-relaxed">
            Shipping worldwide via DHL Express.<br />Free shipping on orders over $300.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
