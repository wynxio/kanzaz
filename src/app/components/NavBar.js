'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const navBg = scrolled || !isHome ? "bg-white shadow-md" : "bg-transparent";
  const textColor = scrolled || !isHome ? "text-gray-800" : "text-white";
  const logoTextColor = scrolled || !isHome ? "text-[#E8572A]" : "text-white";
  const subTextColor = scrolled || !isHome ? "text-gray-500" : "text-white/80";

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Tour Packages", path: "/packages" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/kanlogo1.png"
            alt="Kanzas Tour and Travels Logo"
            className="h-12 w-auto object-contain"
          />
          
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[#E8572A] whitespace-nowrap ${
                location === link.path ? "text-[#E8572A]" : textColor
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/packages"
            className="bg-[#E8572A] hover:bg-[#c94820] text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden text-2xl cursor-pointer ${textColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold text-gray-700 hover:text-[#E8572A] transition-colors ${
                location === link.path ? "text-[#E8572A]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/packages"
            onClick={() => setMenuOpen(false)}
            className="bg-[#E8572A] text-white text-sm font-bold px-6 py-2.5 rounded-full text-center whitespace-nowrap cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
