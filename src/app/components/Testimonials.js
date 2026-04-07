const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Kanzas Tour made our honeymoon absolutely magical! The Bangaram Island package was beyond our expectations. Every detail was perfectly arranged. Highly recommend!",
    avatar: "/testi1.jpg",
    package: "Bangaram Luxury Retreat",
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore",
    rating: 5,
    text: "The Grand Lakshadweep Circuit was the trip of a lifetime! Visiting 4 islands in one tour was incredible. The team was professional and the accommodations were top-notch.",
    avatar: "/testi2.jpg",
    package: "Grand Lakshadweep Circuit",
  },
  {
    name: "Anita Menon",
    location: "Chennai",
    rating: 5,
    text: "We booked the Agatti Island Paradise package for our family vacation. The kids loved the snorkeling and the beach activities. Kanzas Tour handled everything seamlessly!",
    avatar: "/testi3.jpg",
    package: "Agatti Island Paradise",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="bg-[#E8572A]/20 text-[#E8572A] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
            Testimonials
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Travelers
            <span className="text-[#E8572A]"> Say</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Real experiences from real travelers who discovered paradise with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i key={s} className={`text-sm ${s <= t.rating ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-600"}`}></i>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover object-top"
                />
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.location} &bull; {t.package}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
