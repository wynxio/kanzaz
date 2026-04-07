"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";
import { useParams } from "next/navigation";
import { packages } from "../../mocks/packages";
import { PublicLayout } from "../../components/PublicLayout";

const PackageDetailPage = () => {
  const { id } = useParams();

  const router = useRouter();
  const pkg = packages.find((p) => p.id === id);
  const [activeDay, setActiveDay] = useState(null);
  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!pkg) {
    return (
      <PublicLayout>
        <div className="pt-32 text-center py-20">
          <i className="ri-map-2-line text-5xl text-gray-300 mb-4 block"></i>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Package not found
          </h2>
          <Link
            href="/packages"
            className="text-[#E8572A] font-bold cursor-pointer"
          >
            &larr; Back to Packages
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const allImages = [pkg.image, ...pkg.gallery];

  return (
    <PublicLayout>
    <main className="pt-20 bg-[#fdf8f5] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#E8572A] cursor-pointer">
            Home
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link
            href="/packages"
            className="hover:text-[#E8572A] cursor-pointer"
          >
            Packages
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-800 font-medium truncate">{pkg.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden h-[350px] md:h-[480px]">
              <img
                src={allImages[selectedImage]}
                alt={pkg.name}
                className="w-full h-full object-cover object-top"
              />
              {pkg.badge && (
                <span className="absolute top-4 left-4 bg-[#E8572A] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {pkg.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#E8572A]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Package Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1
                    className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {pkg.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-orange-50 text-[#E8572A] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <i className="ri-time-line"></i> {pkg.duration}
                    </span>
                    <span className="bg-gray-50 text-gray-500 text-xs px-3 py-1 rounded-full">
                      {pkg.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i
                          key={s}
                          className={`text-sm ${s <= Math.floor(pkg.rating) ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-300"}`}
                        ></i>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {pkg.rating} ({pkg.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {pkg.description}
              </p>

              {/* Highlights */}
              <h3 className="font-bold text-gray-800 text-base mb-3">
                Package Highlights
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {pkg.highlights.map((h) => (
                  <span
                    key={h}
                    className="flex items-center gap-1.5 bg-[#E8572A]/8 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-[#E8572A]/20"
                  >
                    <i className="ri-check-line text-[#E8572A]"></i> {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs: Itinerary / Inclusions */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {["itinerary", "inclusions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold capitalize transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "text-[#E8572A] border-b-2 border-[#E8572A]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "itinerary"
                      ? "Day-by-Day Itinerary"
                      : "Inclusions & Exclusions"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "itinerary" && (
                  <div className="space-y-3">
                    {pkg.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="border border-gray-100 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setActiveDay(activeDay === day.day ? null : day.day)
                          }
                          className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center bg-[#E8572A] text-white text-xs font-bold rounded-full flex-shrink-0">
                              {day.day}
                            </span>
                            <span className="font-semibold text-gray-800 text-sm">
                              {day.title}
                            </span>
                          </div>
                          <i
                            className={`text-gray-400 transition-transform ${activeDay === day.day ? "ri-subtract-line" : "ri-add-line"}`}
                          ></i>
                        </button>
                        {activeDay === day.day && (
                          <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                            {day.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "inclusions" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                        <i className="ri-checkbox-circle-fill text-green-500"></i>{" "}
                        Inclusions
                      </h4>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <i className="ri-check-line text-green-500 mt-0.5 flex-shrink-0"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                        <i className="ri-close-circle-fill text-red-400"></i>{" "}
                        Exclusions
                      </h4>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <i className="ri-close-line text-red-400 mt-0.5 flex-shrink-0"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-[#E8572A]">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    per person (all inclusive)
                  </p>
                  <div className="mt-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full inline-block">
                    Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()} on
                    this package!
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <i className="ri-time-line text-[#E8572A]"></i>{" "}
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <i className="ri-map-pin-line text-[#E8572A]"></i>{" "}
                    Lakshadweep Islands
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-group-line text-[#E8572A]"></i> Group &
                    Private tours available
                  </div>
                </div>

                <a
                  href={`tel:${pkg.contactNumber.replace(/\s/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#E8572A] hover:bg-[#c94820] text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap mb-3"
                >
                  <i className="ri-phone-fill"></i>
                  Contact Now
                </a>
                <div className="text-center text-[#E8572A] font-bold text-sm">
                  {pkg.contactNumber}
                </div>

                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap mt-3"
                >
                  <i className="ri-mail-send-line"></i>
                  Send Enquiry
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-700 text-sm mb-3">
                  Why Book With Us?
                </h4>
                <ul className="space-y-2.5">
                  {[
                    {
                      icon: "ri-shield-check-line",
                      text: "Govt. Approved Operator",
                    },
                    { icon: "ri-lock-line", text: "Secure Booking" },
                    {
                      icon: "ri-customer-service-2-line",
                      text: "24/7 Support",
                    },
                    {
                      icon: "ri-price-tag-3-line",
                      text: "Best Price Guarantee",
                    },
                  ].map((b) => (
                    <li
                      key={b.text}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-[#E8572A]">
                        <i className={b.icon}></i>
                      </div>
                      {b.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back Button */}
              <button
                onClick={() => router.push(-1)}
                className="w-full flex items-center justify-center gap-2 text-gray-500 text-sm hover:text-[#E8572A] transition-colors cursor-pointer py-2"
              >
                <i className="ri-arrow-left-line"></i> Back to Packages
              </button>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        <div className="mt-14">
          <h2
            className="text-2xl font-extrabold text-gray-800 mb-6"
            style={{ fontFamily: "sans-serif" }}
          >
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages
              .filter((p) => p.id !== pkg.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/packages/${p.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm mb-1">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {p.duration}
                      </span>
                      <span className="text-[#E8572A] font-bold text-sm">
                        ₹{p.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
    </PublicLayout>
  );
};

export default PackageDetailPage;
