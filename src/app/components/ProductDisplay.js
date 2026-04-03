"use client";
import React, { useState, useEffect, useMemo } from "react";
import OrderModal from "./OrderModal";
import SizeChart from "./SizeChart";

const ProductDisplay = ({ product, showTodaysDropTitle = true }) => {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    if (product?.variations?.length === 1) {
      setSelectedVariationIndex(0);
      setSelectedColor(product?.variations[0].colorName);
    }
  }, [product]);

  const variations = product?.variations || [];
  const selectedVariation =
    selectedVariationIndex !== null ? variations[selectedVariationIndex] : null;

  const images = useMemo(() => {
    if (!selectedVariation) return [];
    return [
      selectedVariation.primaryImage,
      ...(selectedVariation.images || []),
    ];
  }, [selectedVariation]);

  const availableSizes = selectedVariation?.sizes || [];

  /* ---------------- HANDLERS ---------------- */
  const handleColorSelect = (index) => {
    setSelectedVariationIndex(index);
    setSelectedColor(variations[index].colorName);
    setSelectedSize(null);
    setCurrentImageIndex(0);
    setShowWarning(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSizeSelect = (sizeObj) => {
    if (sizeObj.quantity <= 0) return;
    setSelectedSize(sizeObj.size);
    if (selectedColor) setShowWarning(false);
  };

  const handleOrder = () => {
    if (!selectedColor || !selectedSize) {
      setShowWarning(true);
      return;
    } else {
      setIsOrderModalOpen(true);
    }

    // onOrderClick({
    //   productId: product?._id,
    //   color: selectedColor,
    //   size: selectedSize,
    // });
  };

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {showTodaysDropTitle && (
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              TODAY'S DROP
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Today's Premium
              <br />
              Tee Collection
            </h1>
            <p className="text-lg text-gray-500 font-light">
              Limited edition. Exclusive design. Premium quality.
            </p>
          </div>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE GALLERY */}
          <div>
            {images?.length > 0 && (
              <>
                <div className="border rounded-xl overflow-hidden relative">
                  <img
                    src={images[currentImageIndex]}
                    // className="w-full h-[500px] object-cover"
                    alt="product"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
                  >
                    <i className="ri-arrow-left-s-line text-xl text-gray-700"></i>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-xl text-gray-700"></i>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 mt-4">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                        i === currentImageIndex
                          ? "border-orange-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* PRODUCT DETAILS */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold">{product?.title}</h2>
            <p className="text-gray-600 mt-1">{product?.subtitle}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-4xl font-bold">
                ₹{product?.discountedcost}
              </span>
              <span className="line-through text-gray-400">
                ₹{product?.actualcost}
              </span>
            </div>

            {/* COLOR */}
            {variations.length > 0 && (
              <div className="mt-8">
                <label className="font-semibold">Select Color</label>
                <div className="flex gap-4 mt-3">
                  {product?.variations.map((v, index) => (
                    <button
                      key={v.colorName}
                      title={v.colorName}
                      onClick={() => handleColorSelect(index)}
                      style={{ backgroundColor: v.colorCode }}
                      className={`w-10 h-10 rounded-full border-4 ${
                        selectedVariationIndex === index
                          ? "border-black scale-110"
                          : "border-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SIZE */}
            {selectedVariation && (
              <div className="mt-8">
                <label className="font-semibold">Select Size</label>
                <div className="flex gap-3 mt-3">
                  {availableSizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={s.quantity <= 0}
                      onClick={() => handleSizeSelect(s)}
                      className={`w-14 h-14 rounded-lg border-2 font-semibold ${
                        selectedSize === s.size
                          ? "bg-black text-white"
                          : s.quantity <= 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showWarning && (
              <p className="text-red-500 mt-4 text-sm">
                Please select both size and color
              </p>
            )}

            {product?.sizeChartImage && (
              <div className="mb-6">
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="mt-4 text-sm underline text-gray-600"
                >
                  View Size Chart
                </button>
              </div>
            )}

            <button
              onClick={handleOrder}
              className="mt-8 w-full h-14 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700"
            >
              ORDER NOW (COD)
            </button>

            <div className="mb-8 border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <i className="ri-file-text-line text-orange-500 w-5 h-5 flex items-center justify-center"></i>
                Product Details
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {[product.description]}
              </p>
              {product.description1 &&<p className="text-sm text-gray-600 leading-relaxed mb-4">
                {[product.description1]}
              </p>}
              {product.description2 &&<p className="text-sm text-gray-600 leading-relaxed mb-4">
                {[product.description2]}
              </p>}

              {Array.isArray(product.features) &&
                product.features.length > 0 && (
                  <ul className="space-y-2.5 mb-5">
                    {product.features.map((feature, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-gray-700"
                        >
                          <i className="ri-checkbox-circle-fill text-green-500 mt-0.5 w-4 h-4 flex items-center justify-center shrink-0"></i>
                          <span>{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

              {Array.isArray(product.extras) && product.extras.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {product.extras.map((extra, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-sm text-gray-700"
                      >
                        <i className="ri-checkbox-circle-fill text-violet-500 mt-0.5 w-4 h-4 flex items-center justify-center shrink-0"></i>
                        <span>{extra}</span>
                      </div>
                    );
                  })}
                </div>
              )}

               
            </div>

            
          </div>
        </div>
      </div>
      {showSizeChart && (
        <SizeChart
          chartImage={product?.sizeChartImage}
          onClose={() => setShowSizeChart(false)}
        />
      )}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        selectedProduct={product}
        selectedVariationIndex={selectedVariationIndex}
      />
    </section>
  );
};

export default ProductDisplay;
