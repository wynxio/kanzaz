 
 
 
import Link from "next/link";
import PackageCard from "./PackageCard";
import { packages } from "../mocks/packages";
 

const FeaturedPackages = () => {
  const featured = packages.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="bg-[#E8572A]/10 text-[#E8572A] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
              Featured Packages
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Popular Lakshadweep
              <span className="text-[#E8572A]"> Getaways</span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="flex items-center gap-2 text-[#E8572A] font-bold text-sm hover:gap-3 transition-all cursor-pointer whitespace-nowrap"
          >
            View All Packages <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
