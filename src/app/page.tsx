import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const { products } = await getProducts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="block overflow-hidden rounded-lg border border-zinc-200 transition hover:border-zinc-400"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={300}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-medium line-clamp-2">{product.title}</h2>
                <p className="mt-1 text-lg font-semibold">${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
