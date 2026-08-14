"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          eshop
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
        >
          Cart
          {totalItems > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
