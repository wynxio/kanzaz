// import { Link } from "react-router-dom";

import Link from "next/link";

 
 
 
const PackageCard = ({ pkg }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {pkg.badge && (
          <span className="absolute top-3 left-3 bg-[#E8572A] text-white text-xs font-bold px-3 py-1 rounded-full">
            {pkg.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <Link
            href={`/packages/${pkg.id}`}
            className="bg-white text-gray-800 text-sm font-bold px-5 py-2 rounded-full cursor-pointer whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-800 text-base leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {pkg.name}
          </h3>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="bg-orange-50 text-[#E8572A] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <i className="ri-time-line"></i> {pkg.duration}
          </span>
          <span className="bg-gray-50 text-gray-500 text-xs px-2.5 py-1 rounded-full">
            {pkg.category}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`text-xs ${star <= Math.floor(pkg.rating) ? "ri-star-fill text-amber-400" : star - 0.5 <= pkg.rating ? "ri-star-half-fill text-amber-400" : "ri-star-line text-gray-300"}`}
            ></i>
          ))}
          <span className="text-xs text-gray-500 ml-1">({pkg.reviews} reviews)</span>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{pkg.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#E8572A]">₹{pkg.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400">per person</p>
          </div>
          <Link
            href={`/packages/${pkg.id}`}
            className="bg-gray-800 hover:bg-[#E8572A] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            View Details
          </Link>
        </div>

        <a
          href={`tel:${pkg.contactNumber.replace(/\s/g, "")}`}
          className="w-full flex items-center justify-center gap-2 bg-[#E8572A]/10 hover:bg-[#E8572A] text-[#E8572A] hover:text-white border border-[#E8572A]/30 hover:border-[#E8572A] text-sm font-bold py-2.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-phone-fill"></i>
          Contact Now: {pkg.contactNumber}
        </a>
      </div>
    </div>
  );
};

export default PackageCard;
