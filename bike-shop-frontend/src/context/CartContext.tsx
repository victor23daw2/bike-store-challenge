import { createContext, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { useEffect } from 'react';


type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
  };
  

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
    
  });
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId));
  };
  
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
    {children}
    </CartContext.Provider>

  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart');
  return context;
};
