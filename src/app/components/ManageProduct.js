"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageProduct({ product, onSuccess }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [actualcost, setActualCost] = useState("");
  const [discountedcost, setDiscountedCost] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [features, setFeatures] = useState([]);
  const [extras, setExtras] = useState("");
  const [paymentMode, setPaymentMode] = useState("both");
  const [variations, setVariations] = useState([]);
  const [saving, setSaving] = useState(false);
  const [sizeChartImage, setSizeChartImage] = useState(null);

  /* ================= Load product (Edit mode) ================= */
  useEffect(() => {
    if (!product) return;

    setTitle(product.title || "");
    setSubtitle(product.subtitle || "");
    setActualCost(product.actualcost || "");
    setDiscountedCost(product.discountedcost || "");
    setDescription(product.description || "");
    setDescription1(product.description1 || "");
    setDescription2(product.description2 || "");
    setFeatures(product.features || []);
    setExtras((product.extras || []).join("\n"));
    setPaymentMode(product.paymentMode || "both");
    setSizeChartImage(product.sizeChartImage || null);

    setVariations(
      (product.variations || []).map((v) => ({
        colorName: v.colorName || "",
        colorCode: v.colorCode || "#000000",
        primaryImage: v.primaryImage || null,
        images: v.images || [],
        sizes: (v.sizes || []).map((s) => ({
          size: s.size || "",
          quantity: s.quantity || 0,
        })),
      }))
    );
  }, [product]);

  /* ================= Helpers ================= */
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (i) =>
    setFeatures(features.filter((_, idx) => idx !== i));

  const addVariation = () =>
    setVariations([
      ...variations,
      { colorName: "", colorCode: "#000000", primaryImage: null, images: [], sizes: [] },
    ]);

  const removeVariation = (i) =>
    setVariations(variations.filter((_, idx) => idx !== i));

  const addSize = (vIndex) => {
    const updated = [...variations];
    updated[vIndex].sizes.push({ size: "", quantity: 0 });
    setVariations(updated);
  };

  /* ================= Image Upload ================= */
  const readImage = (file, cb) => {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (file, vIndex, isPrimary) => {
    readImage(file, (img) => {
      const updated = [...variations];
      if (isPrimary) updated[vIndex].primaryImage = img;
      else updated[vIndex].images.push(img);
      setVariations(updated);
    });
  };

  const handleSizeChartUpload = (file) => {
    readImage(file, setSizeChartImage);
  };

   // Remove image
  const removeAdditionalImage = (vIndex, imgIndex) => {
    const updated = [...variations];
    //if (isPrimary) updated[vIndex].primaryImage = null;
    //else 
    updated[vIndex].images.splice(imgIndex, 1);
    setVariations(updated);
  };

  /* ================= Save ================= */
  const handleSave = async () => {
    if (!title.trim()) return toast.error("Title is required");

    const payload = {
      title,
      subtitle,
      actualcost,
      discountedcost,
      description,
      description1,
      description2,
      features,
      extras: extras.split("\n").filter(Boolean),
      paymentMode,
      sizeChartImage,
      variations,
    };

    try {
      setSaving(true);
      const res = await fetch("/api/products", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product ? { ...payload, id: product._id } : payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Product ${product ? "updated" : "created"} successfully`);
        onSuccess?.();
      } else toast.error(data.error || "Save failed");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* Title / Subtitle */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="label">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Subtitle</label>
          <input className="input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="label">Old Price</label>
          <input className="input" value={actualcost} onChange={(e) => setActualCost(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">New Price</label>
          <input className="input" value={discountedcost} onChange={(e) => setDiscountedCost(e.target.value)} />
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="label">Description</label>
        <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="label">Extra Description 1</label>
        <textarea className="textarea" value={description1} onChange={(e) => setDescription1(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="label">Extra Description 2</label>
        <textarea className="textarea" value={description2} onChange={(e) => setDescription2(e.target.value)} />
      </div>

      {/* Features */}
      <div>
        <label className="label">Features</label>
        {features.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="input" value={f} onChange={(e) => {
              const arr = [...features];
              arr[i] = e.target.value;
              setFeatures(arr);
            }} />
            <button className="btn-danger" onClick={() => removeFeature(i)}>X</button>
          </div>
        ))}
        <button className="btn-secondary" onClick={addFeature}>+ Add Feature</button>
      </div>

      {/* Size Chart */}
      <div>
        <label className="label">Size Chart Image</label>
        {sizeChartImage ? (
          <div className="flex items-center gap-3">
            <img src={sizeChartImage} className="w-20 h-20 object-cover rounded" />
            <button className="btn-danger" onClick={() => setSizeChartImage(null)}>Remove</button>
          </div>
        ) : (
          <input type="file" className="file-input" onChange={(e) => handleSizeChartUpload(e.target.files[0])} />
        )}
      </div>

      {/* Extras */}
      <div className="form-group">
        <label className="label">Extras</label>
        <textarea className="textarea" value={extras} onChange={(e) => setExtras(e.target.value)} />
      </div>

      {/* Payment Mode */}
      <div className="form-group">
        <label className="label">Payment Mode</label>
        <select className="select" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="cod">COD</option>
          <option value="online">Online</option>
          <option value="both">Both</option>
        </select>
      </div>

      {/* Variations */}
      <h3 className="font-semibold text-lg">Color Variations</h3>
      {variations.map((v, vIndex) => (
        <div key={vIndex} className="border rounded p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <input className="input" placeholder="Color Name" value={v.colorName}
              onChange={(e) => {
                const u = [...variations];
                u[vIndex].colorName = e.target.value;
                setVariations(u);
              }} />
            <input type="color" value={v.colorCode}
              onChange={(e) => {
                const u = [...variations];
                u[vIndex].colorCode = e.target.value;
                setVariations(u);
              }} />
            <button className="btn-danger" onClick={() => removeVariation(vIndex)}>Remove</button>
          </div>

          {/* Primary Image */}
          <div>
            <label className="label">Primary Image</label>
            {v.primaryImage ? (
              <div className="flex gap-2">
                <img src={v.primaryImage} className="w-20 h-20 rounded object-cover" />
                <button className="btn-danger" onClick={() => {
                  const u = [...variations];
                  u[vIndex].primaryImage = null;
                  setVariations(u);
                }}>Remove</button>
              </div>
            ) : (
              <input type="file" className="file-input" onChange={(e) =>
                handleImageUpload(e.target.files[0], vIndex, true)} />
            )}
          </div>

            {/* Additional Images */}
            <div>
              <label>Additional Images</label>
              <div className="flex gap-2">
                {v.images.map((img, imgIndex) => (
                  <div key={imgIndex} style={{ position: "relative" }}>
                    <img
                      src={img}
                      alt="variation"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <button
                      className="btn-danger"
                      style={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => removeAdditionalImage(vIndex, imgIndex)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input type="file" className="file-input"
                accept="image/*"
                multiple
                onChange={(e) =>
                  Array.from(e.target.files).forEach((file) =>
                    handleImageUpload(file, vIndex, false),
                  )
                }
              />
            </div> 


          {/* Sizes */}
          {v.sizes.map((s, sIndex) => (
            <div key={sIndex} className="flex gap-2">
              <input className="input" placeholder="Size" value={s.size}
                onChange={(e) => {
                  const u = [...variations];
                  u[vIndex].sizes[sIndex].size = e.target.value;
                  setVariations(u);
                }} />
              <input type="number" className="input" value={s.quantity}
                onChange={(e) => {
                  const u = [...variations];
                  u[vIndex].sizes[sIndex].quantity = Number(e.target.value);
                  setVariations(u);
                }} />
            </div>
          ))}

          <button className="btn-secondary" onClick={() => addSize(vIndex)}>+ Add Size</button>
        </div>
      ))}

      <button className="btn-secondary" onClick={addVariation}>+ Add Color Variation</button>

      {/* Save */}
      <div className="text-right">
        <button className="btn-primary" disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </div>
  );
}
