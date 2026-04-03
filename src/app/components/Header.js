'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { List } from 'react-bootstrap-icons';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path) => pathname === path;

  return (
    <>
      <header
        className={`headerBack fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/logo1.png"
              alt="WynTees Logo"
              className="object-contain logoImgHeader"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'selected-link' : 'text-gray-700 hover:selected-link'
              }`}
            >
              Home
            </Link>
            <Link
              href="/collections"
              className={`text-sm font-medium transition-colors ${
                isActive('/collections')
                  ? 'selected-link'
                  : 'text-gray-700 hover:selected-link'
              }`}
            >
              Collections
            </Link>
            {/* <Link
              href="/terms"
              className={`text-sm font-medium transition-colors ${
                isActive('/terms')
                  ? 'selected-link'
                  : 'text-gray-700 hover:selected-link'
              }`}
            >
              Terms of Use
            </Link> */}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
             {/* <List color='white' size={28} className='cursorPointer'/> */}
            <i
              className={`text-2xl transition-transform duration-300 ${
                isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 right-0 w-72 h-[calc(100vh-5rem)] bg-white z-40 md:hidden shadow-xl transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6">
          {[
            { href: '/', label: 'Home', icon: 'ri-home-4-line' },
            { href: '/collections', label: 'Collections', icon: 'ri-t-shirt-line' },
           
          ].map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`py-4 px-4 rounded-lg font-medium transition-colors ${
                isActive(href)
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:selected-link'
              }`}
            >
              <i className={`${icon} mr-3`} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
