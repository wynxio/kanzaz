"use client";
import { useState } from "react";

import PackageCard from "../components/PackageCard";
import { packages } from "../mocks/packages";
import { PublicLayout } from "../components/PublicLayout";

const categories = [
  "All",
  "Beach & Snorkeling",
  "Luxury & Honeymoon",
  "Cultural & Adventure",
  "Cultural & Heritage",
  "Adventure & Nature",
  "Multi-Island Circuit",
];

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = packages
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <PublicLayout>
      <main className="pt-20">
        {/* Page Header */}
        <section
          className="relative py-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/pack1.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          <div className="relative z-10 text-center px-4">
            <span className="bg-[#E8572A]/90 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
              Explore Lakshadweep
            </span>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4"
              style={{ fontFamily: "sans-serif" }}
            >
              Our Tour Packages
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Handcrafted island experiences for every kind of traveler — from
              budget explorers to luxury seekers.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#E8572A] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-[#E8572A] cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-14 bg-[#fdf8f5]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <p className="text-gray-500 text-sm mb-6">
              Showing <strong>{filtered.length}</strong> packages
              {activeCategory !== "All" && (
                <>
                  {" "}
                  in <strong>{activeCategory}</strong>
                </>
              )}
            </p>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <i className="ri-map-2-line text-5xl mb-4 block"></i>
                <p className="text-lg">No packages found for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-[#E8572A]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "sans-serif" }}
            >
              Can&apos;t Find Your Perfect Package?
            </h2>
            <p className="text-white/80 text-base mb-8">
              We create custom Lakshadweep itineraries tailored to your
              preferences, budget, and travel dates.
            </p>
            <a
              href="/contact"
              className="bg-white text-[#E8572A] font-bold px-8 py-4 rounded-full text-base hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              Request Custom Package
            </a>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default PackagesPage;
