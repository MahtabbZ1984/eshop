import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

export default async function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
        ← Back to products
      </Link>

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
      </div>
    </main>
  );
}
