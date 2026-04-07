const features = [
  {
    icon: "ri-shield-check-line",
    title: "Trusted & Certified",
    desc: "Government approved tour operator with 12+ years of experience in Lakshadweep tourism.",
    color: "bg-orange-50 text-[#E8572A]",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 Support",
    desc: "Round-the-clock assistance from our dedicated travel experts throughout your journey.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: "ri-price-tag-3-line",
    title: "Best Price Guarantee",
    desc: "Competitive pricing with no hidden charges. We match any lower price you find.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "ri-map-pin-line",
    title: "Local Expertise",
    desc: "Deep knowledge of every island, hidden gems, and the best experiences Lakshadweep offers.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: "ri-hotel-line",
    title: "Premium Stays",
    desc: "Carefully selected accommodations from cozy beach huts to luxury island resorts.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: "ri-flight-takeoff-line",
    title: "Hassle-Free Travel",
    desc: "We handle all permits, bookings, and logistics so you can focus on enjoying paradise.",
    color: "bg-green-50 text-green-600",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#fdf8f5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="bg-[#E8572A]/10 text-[#E8572A] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-4 mb-4"
            style={{ fontFamily: "sans-serif" }}
          >
            Your Trusted Lakshadweep
            <span className="text-[#E8572A]"> Travel Partner</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            With over a decade of expertise, we craft extraordinary island experiences tailored to your dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${f.color}`}>
                <i className={`${f.icon} text-xl`}></i>
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
