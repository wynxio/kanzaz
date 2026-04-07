import React from "react";

const SocialMedia = ({ itemClass }) => {
  return (
    <div className="flex gap-3">
      <a href="#" title="Facebook" className={itemClass}>
        <i className="ri-facebook-fill"></i>
      </a>

      <a href="#" title="Instagram" className={itemClass}>
        <i className="ri-instagram-line"></i>
      </a>

      <a href="#" title="YouTube" className={itemClass}>
        <i className="ri-youtube-fill"></i>
      </a>

      <a
        href="https://wa.me/919447868909?text=I%20want%20to%20know%20some%20package%20details"
        target="_blank"
        title="WhatsApp"
        className={itemClass}
      >
        <i className="ri-whatsapp-line"></i>
      </a>
    </div>
  );
};

export default SocialMedia;
