"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "SET"; cart: CartItem[] };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((item) => item.product.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((item) => item.product.id !== action.productId);
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((item) => item.product.id !== action.productId);
      }
      return state.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    case "CLEAR":
      return [];
    case "SET":
      return action.cart;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);

 
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        dispatch({ type: "SET", cart: JSON.parse(saved) });
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: "ADD", product });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.quantity,
        totalPrice: acc.totalPrice + item.product.price * item.quantity,
      }),
      { totalItems: 0, totalPrice: 0 }
    );
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}