"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
 
export default function PreviousCollection({ previousProducts,selectedProduct,title = "Previous Drops",subtitle="Explore our past collections",showViewAllButton=true}) {
   const router = useRouter();
  //const [visibleCount, setVisibleCount] = useState(8);
  // const [previousProducts,setPreviousProducts] = useState([]);

  const handleLoadMore = () => {
    router.push('/collections')
    //setVisibleCount(prev => prev + 8);
  };

  const gotoTheProduct = (pid) =>{
    router.push(`/tee/${pid}`)
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-500">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previousProducts?.
          filter((p) => p._id !== selectedProduct?._id).
          map((p) => {
            const firstVar = p.variations?.[0];
            const displayImg =
              firstVar?.primaryImage ||
              firstVar?.images?.[0] ||
              "/fallback-product.png";

            return (
              <div onClick={() =>gotoTheProduct(p._id)}
                key={p._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={displayImg}
                    alt={p?.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      In Stock
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-900 text-white">
                  <h3 className="font-bold text-base mb-1">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      ₹{p.discountedcost}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1 cursor-pointer">
                      View Details <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        
          {showViewAllButton && <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto whitespace-nowrap cursor-pointer"
            >
              View More Designs
              <i className="ri-arrow-down-line"></i>
            </button>
          </div>}
       
      </div>
    </section>
  );
}
