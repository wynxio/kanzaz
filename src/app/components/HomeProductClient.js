"use client";

import { useEffect, useState } from "react";
import ProductDisplay from "./ProductDisplay";
import PreviousCollection from "./PreviousCollection";

export default function HomeProductClient({
  productId = null,
  showTodaysDropTitle = true,
}) {
  const [product, setProduct] = useState(null);
  const [previousProducts, setPreviousProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        let finalProductId = productId;

        // 1️⃣ Get homepage product ID
        if (!finalProductId) {
          const res = await fetch("/api/homepage-product");
          const json = await res.json();
          finalProductId = json?.data?.productId;
        }

        if (!finalProductId) {
          setLoading(false);
          return;
        }

        // 2️⃣ Get main product (YOUR API)
        const productRes = await fetch(`/api/products/${finalProductId}`);
        const productJson = await productRes.json();

        if (productJson.success) {
          setProduct(productJson.product);
        }

        // 3️⃣ Previous products (optional / existing API)
        const prevRes = await fetch("/api/products?limit=20");
        const prevJson = await prevRes.json();

        if (prevJson?.success) {
          setPreviousProducts(prevJson.products || []);
        }
      } catch (e) {
        console.error("HomeProduct error:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [productId]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-gray-500">Loading today’s premium drop…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-gray-500">
          Today’s Premium Product will be available soon
        </p>
      </section>
    );
  }

  return (
    <>
      <ProductDisplay
        product={product}
        showTodaysDropTitle={showTodaysDropTitle}
      />

      <PreviousCollection
        selectedProduct={product}
        previousProducts={previousProducts}
      />
    </>
  );
}