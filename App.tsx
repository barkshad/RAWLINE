
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Cart from './pages/Cart';
import { CartItem } from './types';

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === newItem.product.id && item.size === newItem.size);
      if (existing) {
        return prev.map(item => 
          (item.product.id === newItem.product.id && item.size === newItem.size)
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="font-sans antialiased text-black min-h-screen flex flex-col bg-bone">
        <ScrollToTop />
        <Navbar cartCount={cartCount} />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route 
              path="/product/:handle" 
              element={<ProductDetail onAddToCart={addToCart} />} 
            />
            <Route path="/about" element={<About />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  items={cart} 
                  onRemove={removeFromCart} 
                  onUpdateQuantity={updateQuantity} 
                />
              } 
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
