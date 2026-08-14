"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Product } from "@/types";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mt-6">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={600}
        height={400}
        className="w-full rounded-lg object-cover"
        priority
      />

      <h1 className="mt-4 text-2xl font-semibold">{product.title}</h1>
      <p className="mt-1 text-sm text-zinc-500">
        {product.brand} · {product.category}
      </p>
      <p className="mt-2 text-xl font-semibold">${product.price}</p>
      <p className="mt-4 text-zinc-600">{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
