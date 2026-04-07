const galleryImages = [
  { src: "/gl/1.jpg", label: "Agatti Island", span: "col-span-2 row-span-2" },
  { src: "/gl/2.jpg", label: "Coral Reefs", span: "" },
  { src: "/gl/3.jpg", label: "Bangaram Resort", span: "" },
  { src: "/gl/4.jpg", label: "Minicoy Lighthouse", span: "" },
  { src: "/gl/5.jpg", label: "Kavaratti Lagoon", span: "" },
  { src: "/gl/6.jpg", label: "Kalpeni Islands", span: "" },
  { src: "/gl/7.jpg", label: "", span: "" },
  { src: "/gl/8.jpg", label: "", span: "" },
  { src: "/gl/9.jpg", label: "", span: "" },
  { src: "/gl/10.jpg", label: "", span: "" },
  { src: "/gl/11.jpg", label: "", span: "" },
  { src: "/gl/12.jpg", label: "", span: "" },
  { src: "/gl/13.jpg", label: "", span: "" },
  { src: "/gl/14.jpg", label: "", span: "" },
  { src: "/gl/15.jpg", label: "", span: "" },
  { src: "/gl/16.jpg", label: "", span: "" },
  { src: "/gl/17.jpg", label: "", span: "" },
  { src: "/gl/18.jpg", label: "", span: "" },
  { src: "/gl/19.jpg", label: "", span: "" },
  { src: "/gl/20.jpg", label: "", span: "" },
  { src: "/gl/21.jpg", label: "", span: "" },
  { src: "/gl/22.jpg", label: "", span: "" },
  { src: "/gl/23.jpg", label: "", span: "" },
  { src: "/gl/24.jpg", label: "", span: "" },
  { src: "/gl/25.jpg", label: "", span: "" },
  { src: "/gl/26.jpg", label: "", span: "" },
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

        {/* Masonry layout using CSS columns */}
        <div
          style={{
            columnCount: 4,
            columnGap: '12px',
          }}
          className="md:[column-count:4] [column-count:2]"
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl group cursor-pointer mb-3 break-inside-avoid"
              style={{ breakInside: 'avoid', marginBottom: '12px' }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500"
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
