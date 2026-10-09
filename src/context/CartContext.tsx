import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item: any, quantity: number) {
    console.log("cartcontext received:", item, "quantity:", quantity);
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function removeFromCart(id: string) {
    setCartItems((prev) => prev.filter((i) => i._id !== id));
  }

  function increaseQty(id: string) {
    setCartItems((prev) =>
    prev.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  }

  function decreaseQty(id: string) {
    setCartItems((prev) =>
    prev.map((i) => i._id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
