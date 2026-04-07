const galleryImages = [
  {
    src: "/gl1.jpg",
    label: "Agatti Island",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/gl2.jpg",
    label: "Coral Reefs",
    span: "",
  },
  {
    src: "/gl3.jpg",
    label: "Bangaram Resort",
    span: "",
  },
  {
    src: "/gl4.jpg",
    label: "Minicoy Lighthouse",
    span: "",
  },
  {
    src: "/gl5.jpg",
    label: "Kavaratti Lagoon",
    span: "",
  },
  {
    src: "/gl6.jpg",
    label: "Kalpeni Islands",
    span: "",
  },
];

const IslandGallery = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="bg-[#E8572A]/10 text-[#E8572A] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
            Gallery
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-4 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Glimpse of
            <span className="text-[#E8572A]"> Paradise</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Stunning visuals from the pristine islands of Lakshadweep that await you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-bold text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IslandGallery;
