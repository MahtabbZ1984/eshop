"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  );
}
