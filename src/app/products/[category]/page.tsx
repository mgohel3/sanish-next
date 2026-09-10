/**
 * Legacy redirect: the old flat product URL was /products/<slug>.
 * Canonical is now /products/<category>/<collection>/<slug>. Any single-segment
 * hit here is treated as a product slug and 308-redirected to its canonical URL.
 */
import { notFound, redirect } from "next/navigation";
import { fetchProductBySlug, productHref } from "@/lib/catalog";

type Props = { params: Promise<{ category: string }> };

export default async function LegacyProductRedirect({ params }: Props) {
  const { category: slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();
  redirect(productHref(product));
}
