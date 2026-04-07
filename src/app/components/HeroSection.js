'use client';
 
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/slide1.jpg",
    title: "Discover Paradise",
    subtitle: "in Lakshadweep Islands",
    desc: "Curated luxury tour packages to India's most pristine tropical destination",
  },
  {
    image: "/slide2.jpg",
    title: "Luxury Escapes",
    subtitle: "Crafted Just for You",
    desc: "Experience world-class hospitality amidst the untouched beauty of the Arabian Sea",
  },
  {
    image: "/slide3.jpg",
    title: "Adventure Awaits",
    subtitle: "Dive Into the Deep Blue",
    desc: "From snorkeling to scuba diving, explore the vibrant marine life of Lakshadweep",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="mb-4">
          <span className="bg-[#E8572A]/90 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
            Lakshadweep Specialists
          </span>
        </div>
        <h1
          className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {slides[current].title}
        </h1>
        <h2
          className="text-white/90 font-light text-2xl md:text-4xl lg:text-5xl italic mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {slides[current].subtitle}
        </h2>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          {slides[current].desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/packages"
            className="bg-[#E8572A] hover:bg-[#c94820] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Explore Packages
          </Link>
          <Link
            href="/contact"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-base border border-white/40 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        {/* Stats */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 md:gap-12">
          {[
            { icon: "ri-map-2-line", value: "15+", label: "Packages" },
            { icon: "ri-group-line", value: "5000+", label: "Happy Travelers" },
            { icon: "ri-award-line", value: "12+", label: "Years Experience" },
            { icon: "ri-star-fill", value: "4.8★", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-10 h-10 flex items-center justify-center mx-auto mb-1">
                <i className={`${stat.icon} text-[#E8572A] text-xl`}></i>
              </div>
              <div className="text-white font-extrabold text-lg md:text-xl">{stat.value}</div>
              <div className="text-white/70 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === current ? "bg-[#E8572A] w-6" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
