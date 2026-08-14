"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Shopping Cart</h1>
        <p className="text-zinc-500">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 rounded-lg border border-zinc-200 p-4"
          >
            <Image
              src={item.product.thumbnail}
              alt={item.product.title}
              width={100}
              height={100}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex-1">
              <Link
                href={`/products/${item.product.id}`}
                className="font-medium hover:text-blue-600"
              >
                {item.product.title}
              </Link>
              <p className="mt-1 text-lg font-semibold">
                ${item.product.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 hover:bg-zinc-100"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 hover:bg-zinc-100"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 p-4">
        <div className="flex justify-between text-lg">
          <span>Total ({totalItems} items):</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-6 py-2 hover:bg-zinc-100"
        >
          Continue shopping
        </Link>
        <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </main>
  );
}
