"use client";
import { useState } from "react";
import { PublicLayout } from "../components/PublicLayout";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") {
      if (value.length > 500) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (charCount > 500) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", mobile: "", message: "" });
        setCharCount(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <PublicLayout>
      <main className="pt-20 bg-[#fdf8f5] min-h-screen">
        {/* Header */}
        <section
          className="relative py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/conback.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          <div className="relative z-10 text-center px-4">
            <span className="bg-[#E8572A]/90 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
              Get In Touch
            </span>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Us
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Have questions about our Lakshadweep packages? We&apos;re here to
              help you plan your dream vacation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Let&apos;s Plan Your
                    <span className="text-[#E8572A]"> Dream Trip</span>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Reach out to our travel experts and we&apos;ll craft the
                    perfect Lakshadweep experience for you.
                  </p>
                </div>

                {[
                  {
                    icon: "ri-phone-fill",
                    title: "Call Us",
                    lines: ["(+91) 94478 68909", "(+91) 91881 35909"],
                    href: "tel:+919876543210",
                  },
                  {
                    icon: "ri-mail-fill",
                    title: "Email Us",
                    lines: [
                      "info@kanzastours.com",
                      "bookings@kanzastours.com",
                      "Koyasmalmi@gmail.com",
                    ],
                    href: "mailto:info@kanzastour.com",
                  },
                  {
                    icon: "ri-map-pin-fill",
                    title: "Visit Us",
                    lines: [
                      "Kanzas Tours and Travels",
                      "Kalpeni island",
                      "Lakshadweep - 682557, India",
                    ],
                    href: "#",
                  },
                  {
                    icon: "ri-time-fill",
                    title: "Office Hours",
                    lines: [
                      "Mon - Sat: 9:00 AM - 7:00 PM",
                      "Sunday: 10:00 AM - 4:00 PM",
                    ],
                    href: "#",
                  },
                ].map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#E8572A]/30 transition-colors cursor-pointer group"
                  >
                    <div className="w-11 h-11 flex items-center justify-center bg-[#E8572A]/10 text-[#E8572A] rounded-xl flex-shrink-0 group-hover:bg-[#E8572A] group-hover:text-white transition-colors">
                      <i className={`${info.icon} text-lg`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm mb-1">
                        {info.title}
                      </p>
                      {info.lines.map((line) => (
                        <p key={line} className="text-gray-500 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </a>
                ))}

                {/* Social */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <p className="font-bold text-gray-800 text-sm mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      title="Facebook"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-[#E8572A] hover:text-white transition-colors cursor-pointer"
                    >
                      <i className="ri-facebook-fill"></i>
                    </a>

                    <a
                      href="#"
                      title="Instagram"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-[#E8572A] hover:text-white transition-colors cursor-pointer"
                    >
                      <i className="ri-instagram-line"></i>
                    </a>

                    <a
                      href="#"
                      title="YouTube"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-[#E8572A] hover:text-white transition-colors cursor-pointer"
                    >
                      <i className="ri-youtube-fill"></i>
                    </a>

                    <a
                      href="https://wa.me/919447868909?text=I%20want%20to%20know%20some%20package%20details"
                      target="_blank"
                      title="WhatsApp"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-[#E8572A] hover:text-white transition-colors cursor-pointer"
                    >
                      <i className="ri-whatsapp-line"></i>
                    </a>

                    {/* {[
                      { icon: "ri-facebook-fill", label: "Facebook" },
                      { icon: "ri-instagram-line", label: "Instagram" },
                      { icon: "ri-whatsapp-line", label: "WhatsApp" },
                      { icon: "ri-youtube-fill", label: "YouTube" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        title={s.label}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-[#E8572A] hover:text-white transition-colors cursor-pointer"
                      >
                        <i className={s.icon}></i>
                      </a>
                    ))} */}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h3
                    className="text-xl font-extrabold text-gray-800 mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Send Us a Message
                  </h3>

                  {status === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4">
                        <i className="ri-check-line text-3xl"></i>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-gray-500 text-sm mb-6">
                        Thank you for reaching out. Our team will get back to
                        you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="bg-[#E8572A] text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer whitespace-nowrap"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      id="contact-form"
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Full Name <span className="text-[#E8572A]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#E8572A] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Email Address{" "}
                           
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#E8572A] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Mobile Number{" "}
                          <span className="text-[#E8572A]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#E8572A] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Message <span className="text-[#E8572A]">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell us about your travel plans, preferred dates, group size, or any specific requirements..."
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#E8572A] transition-colors resize-none"
                        />
                        <div
                          className={`text-xs mt-1 text-right ${charCount > 450 ? "text-[#E8572A]" : "text-gray-400"}`}
                        >
                          {charCount}/500
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                          Something went wrong. Please try again or call us
                          directly.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting" || charCount > 500}
                        className="w-full bg-[#E8572A] hover:bg-[#c94820] text-white font-bold py-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {status === "submitting" ? (
                          <>
                            <i className="ri-loader-4-line animate-spin"></i>{" "}
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-fill"></i> Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-72">
              <iframe
                title="Kanzas Tour Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31426.15757659793!2d73.59144788526419!3d10.076973772485259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0aaf6c5e8867a5%3A0x4a132c09d5e0cd85!2sKalpeni%2C%20Lakshadweep!5e0!3m2!1sen!2sin!4v1775470966494!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default ContactPage;
