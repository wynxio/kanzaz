'use client';
import Link from "next/link";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  
  

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/kanlogo1.png"
                alt="Kanzas Tours and Travels"
                className="h-10 minh100 w-auto object-contain"
              />
               
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Your trusted gateway to the pristine paradise of Lakshadweep Islands. Creating unforgettable memories since 2010.
            </p>
            <SocialMedia itemClass={"w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:border-[#E8572A] hover:text-[#E8572A] transition-colors cursor-pointer"}></SocialMedia>
            
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
                    Kanzas Tours and Travels, <br />
                    Kalpeni island<br />
                    Lakshadweep - 682557,<br />
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
                  <p className="text-gray-400 text-sm">(+91) 94478 68909</p>
                  <p className="text-gray-400 text-sm">(+91) 91881 35909</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#E8572A] flex-shrink-0">
                  <i className="ri-mail-line text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Email</p>
                  <p className="text-gray-400 text-sm">info@kanzastours.com</p>
                  <p className="text-gray-400 text-sm">bookings@kanzastours.com</p>
                  <p className="text-gray-400 text-sm">Koyasmalmi@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Booking</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              For Quick Booking and travel packages contact Us on
            </p>
            <div>
              <li className="flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#E8572A] flex-shrink-0">
                  <i className="ri-phone-line text-lg"></i>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">(+91) 94478 68909</p>
                  <p className="text-gray-400 text-sm">(+91) 91881 35909</p>
                </div>
              </li>
            </div>
             
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Kanzas Tour and Travels. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Design and Developed By <a style={{color:'brown'}} target="_blank" href="https://www.wynxiotech.com">Wynxio Tech</a>
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
