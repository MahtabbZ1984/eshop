import type { Product, ProductsResponse } from "@/types";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 30): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProduct(id: number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
