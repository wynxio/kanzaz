"use client";
import { useEffect, useMemo, useState } from "react";
import SizeChart from "./SizeChart";
import OrderModal from "./OrderModal";
import PreviousCollection from "./PreviousCollection";

export default function Hero({ productId = null }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedVariationIndex, setSelectedVariationIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [previousCollections, setPreviousCollections] = useState([]);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        let finalProductId = productId;

        if (!finalProductId) {
          const homeRes = await fetch("/api/homepage-product");
          const homeData = await homeRes.json();
          if (homeData?.success) finalProductId = homeData.data?.productId;
        }

        if (!finalProductId) {
          const latestRes = await fetch("/api/products?page=1&limit=1");
          const latestData = await latestRes.json();
          if (latestData?.products?.length) {
            setProduct(latestData.products[0]);
            return;
          }
        }

        if (finalProductId) {
          const res = await fetch(`/api/products/${finalProductId}`);
          const data = await res.json();
          if (data?.success) setProduct(data.product);
        }
      } catch (err) {
        //console.error("Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* ---------------- AUTO SELECT SINGLE COLOR ---------------- */
  useEffect(() => {
    if (product?.variations?.length === 1) {
      setSelectedVariationIndex(0);
      setSelectedColor(product.variations[0].colorName);
    }
  }, [product]);

  useEffect(() => {
    const fetchPreviousProducts = async () => {
      try {
        const latestprods = await fetch("/api/products?page=1&limit=20");
        const latestItems = await latestprods.json();
         
        if (latestItems?.products?.length) {
          setPreviousCollections(latestItems?.products);
        }
      } catch (e) {}
    };
    fetchPreviousProducts();
  }, []);

  /* ---------------- DERIVED DATA ---------------- */
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
    //   productId: product._id,
    //   color: selectedColor,
    //   size: selectedSize,
    // });
  };

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-gray-500">Loading product...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-gray-500">
          Todays Premium Product will be available soon
        </p>
      </section>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE GALLERY */}
          <div>
            {images.length > 0 && (
              <>
                <div className="border rounded-xl overflow-hidden">
                  <img
                    src={images[currentImageIndex]}
                    className="w-full h-[500px] object-cover"
                    alt="product"
                  />
                </div>

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
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-600 mt-1">{product.subtitle}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-4xl font-bold">
                ₹{product.discountedcost}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.actualcost}
              </span>
            </div>

            {/* COLOR */}
            {variations.length > 0 && (
              <div className="mt-8">
                <label className="font-semibold">Select Color</label>
                <div className="flex gap-4 mt-3">
                  {variations.map((v, index) => (
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
              <button
                onClick={() => setShowSizeChart(true)}
                className="mt-4 text-sm underline text-gray-600"
              >
                View Size Chart
              </button>
            )}

            <button
              onClick={handleOrder}
              className="mt-8 w-full h-14 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700"
            >
              ORDER NOW (COD)
            </button>
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
      <PreviousCollection
        selectedProduct={product}
        previousProducts={previousCollections}
      ></PreviousCollection>
    </>
  );
}
