import Link from "next/link";
import React from "react";
 

const ComingSoon = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="comingsoon.jpg"
          alt="WynTees Launch Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/15 hidden sm:block"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/15 hidden sm:block"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/15 hidden sm:block"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/15 hidden sm:block"></div>

      {/* Top Nav */}
      <header className="relative z-10 w-full px-6 sm:px-10 py-6 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <img
            src="logo1.png"
            alt="WynTees Logo"
            className="h-16 w-16 object-contain"
          />
        </Link>
        {/* <Link
          href="/"
          className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
        >
          <i className="ri-arrow-left-s-line"></i>
          Back to Store
        </Link> */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-16 -mt-10">
        {/* Overline */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-orange-400"></span>
          <span className="text-orange-400 text-xs font-semibold tracking-[0.3em] uppercase">
            Coming Soon
          </span>
          <span className="w-8 h-px bg-orange-400"></span>
        </div>

        {/* Headline */}
        <h1 className="text-center mb-5">
          <span className="block text-white text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            T-Shirt Premium
          </span>
          <span className="block text-white/70 text-3xl sm:text-5xl lg:text-6xl font-light italic mt-1">
            is Coming Soon
          </span>
        </h1>

        <p className="text-white/50 text-sm sm:text-base text-center max-w-lg leading-relaxed mb-14">
          We&apos;re putting the finishing touches on our next premium drop.
          Crafted with the finest fabrics and designed for those who demand more
          from their wardrobe.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-3xl w-full mb-16">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5">
              <i className="ri-t-shirt-line text-xl text-orange-400"></i>
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide">
              Premium 240 GSM Cotton
            </h3>
            <p className="text-white/40 text-xs leading-relaxed">
              Heavyweight, ultra-soft fabric that holds its shape wash after
              wash.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5">
              <i className="ri-palette-line text-xl text-orange-400"></i>
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide">
              Exclusive Designs
            </h3>
            <p className="text-white/40 text-xs leading-relaxed">
              Limited edition prints you won&apos;t find anywhere else. Stand
              out from the crowd.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5">
              <i className="ri-hand-heart-line text-xl text-orange-400"></i>
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide">
              Made in India
            </h3>
            <p className="text-white/40 text-xs leading-relaxed">
              Proudly crafted locally with attention to every stitch and detail.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2 text-white/40">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-shield-check-line text-sm"></i>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase">
              Premium Quality
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-vip-diamond-line text-sm"></i>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase">
              Limited Edition
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-truck-line text-sm"></i>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase">
              Free Shipping
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
        <p className="text-white/30 text-xs">
          &copy; 2025 WynTees. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/wyntees"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-5 h-5 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer"
          >
            <i className="ri-instagram-line text-base"></i>
          </a>
          {/* <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-5 h-5 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer"
          >
            <i className="ri-twitter-x-line text-base"></i>
          </a> */}
         
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
