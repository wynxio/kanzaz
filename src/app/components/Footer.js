'use client';
import Link from "next/link";
import { useState } from "react";
 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const body = new URLSearchParams({ email });
      await fetch("https://readdy.ai/api/form/d771crqqo7glkto3dvu0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://static.readdy.ai/image/c8f58c40e12f1239e28a5ccd626b10b4/67ccda92055b0fe2965d32b6a2974f13.png"
                alt="Kanzas Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-extrabold text-xl text-[#E8572A]" style={{ fontFamily: "'Playfair Display', serif" }}>KANZAS</div>
                <div className="text-xs text-gray-400 tracking-widest uppercase">Tour &amp; Travels</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Your trusted gateway to the pristine paradise of Lakshadweep Islands. Creating unforgettable memories since 2010.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "ri-facebook-fill", href: "#" },
                { icon: "ri-instagram-line", href: "#" },
                { icon: "ri-whatsapp-line", href: "#" },
                { icon: "ri-youtube-fill", href: "#" },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:border-[#E8572A] hover:text-[#E8572A] transition-colors cursor-pointer"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Tour Packages", path: "/packages" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-400 text-sm hover:text-[#E8572A] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-[#E8572A]"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#E8572A] flex-shrink-0">
                  <i className="ri-map-pin-line text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Office Address</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    123, Marine Drive, Kavaratti,<br />
                    Lakshadweep - 682555,<br />
                    India
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#E8572A] flex-shrink-0">
                  <i className="ri-phone-line text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">+91 98765 43210</p>
                  <p className="text-gray-400 text-sm">+91 98765 43211</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#E8572A] flex-shrink-0">
                  <i className="ri-mail-line text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Email</p>
                  <p className="text-gray-400 text-sm">info@kanzastour.com</p>
                  <p className="text-gray-400 text-sm">bookings@kanzastour.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe to get exclusive offers, travel tips, and Lakshadweep updates.
            </p>
            {subscribed ? (
              <div className="bg-green-900/40 border border-green-700 rounded-lg p-3 text-green-400 text-sm">
                <i className="ri-check-line mr-2"></i>Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} data-readdy-form className="flex flex-col gap-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="bg-white/10 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E8572A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#E8572A] hover:bg-[#c94820] text-white text-sm font-bold py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  {submitting ? "Subscribing..." : "Subscribe Now"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Kanzas Tour and Travels. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 text-sm hover:text-[#E8572A] transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-[#E8572A] transition-colors cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
