"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PublicLayout } from "../components/PublicLayout";

const LIMIT = 1000;

export default function Collections() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/viewproducts`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const gotoTheProduct = (pid) => {
    router.push(`/tee/${pid}`);
  };

  /* 🔹 Loading State */
  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
            <p className="text-gray-600 text-sm">Loading collections...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  /* 🔹 Error State */
  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center text-red-600">
          Failed to load collections
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white">
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4 pt-20">
                Our Recent Collections
              </h2>
              <p className="text-lg text-gray-500">
                Explore our recently added Premium Tee Collections
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {products.map((p) => {
                // const firstVar = p.variations?.[0];
                // const displayImg =
                //   firstVar?.primaryImage ||
                //   firstVar?.images?.[0] ||
                //   "/fallback-product.png";

                return (
                  <div
                    key={p._id}
                    onClick={() => gotoTheProduct(p._id)}
                    className="bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.primaryImage}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-900 text-white">
                      <h3 className="font-bold text-base mb-1">
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          ₹{p.discountedcost}
                        </span>
                        <span className="text-sm text-gray-400">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}