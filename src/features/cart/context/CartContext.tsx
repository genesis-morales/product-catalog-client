import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CartService } from '../services/cartService';
import type { Cart } from '../types/cart';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const data = await CartService.getCart();
      setCart(data);
    } catch (err) {
      console.error('Error cargando carrito:', err);
    }
  }, []);

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  const addItem = async (productId: number, quantity = 1) => {
    setLoading(true);
    try {
      const data = await CartService.addItem(productId, quantity);
      setCart(data);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    setLoading(true);
    try {
      const data = await CartService.updateItem(itemId, quantity);
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    setLoading(true);
    try {
      await CartService.removeItem(itemId);
      await fetchCart(); // recarga el carrito tras eliminar
    } finally {
      setLoading(false);
    }
  };

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{
      cart, loading,
      addItem, updateItem, removeItem,
      itemCount,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
};