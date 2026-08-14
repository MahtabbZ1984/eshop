import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { ProductDetails } from "@/components/ProductDetails";

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

      <ProductDetails product={product} />
    </main>
  );
}
