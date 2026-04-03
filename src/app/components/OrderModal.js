"use client";
import { useState, useEffect } from "react";
import { XCircleFill } from "react-bootstrap-icons";

export default function OrderModal({
  isOpen,
  onClose,
  selectedSize,
  selectedColor,
  selectedProduct,
  selectedVariationIndex,
}) {
  const [step, setStep] = useState("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    house: "",
    address: "",
  });

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid =
      formData.name.trim() !== "" &&
      emailRegex.test(formData.email) &&
      formData.mobile.length === 10 &&
      formData.state !== "" &&
      formData.house.trim() !== "" &&
      formData.address.trim() !== "";

    setIsFormValid(isValid);
  }, [formData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productId: selectedProduct._id,
          size: selectedSize,
          color: selectedColor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to place order");
      }

      setStep("success");
    } catch (err) {
      //console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setError("");
    setFormData({
      name: "",
      email: "",
      mobile: "",
      state: "",
      house: "",
      address: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 cursor-pointer"
          aria-label="Close"
        >
          <XCircleFill size={35} color="black" />
        </button>

        <div
          style={{
            minHeight: "300px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {step === "form" && (
            <>
               <div className="bg-gray-50 rounded-lg p-4 text-sm text-center">
                  <strong>Order:</strong>
                  <p>
                    <img
                      className="smallThumb mx-auto"
                      src={
                        selectedProduct?.variations?.[selectedVariationIndex]
                          ?.primaryImage
                      }
                      alt={selectedProduct?.title || "Product image"}
                    />
                  </p>
                  <p>
                    <strong>{selectedProduct.title}</strong>
                    <br />
                    Size: {selectedSize}, Color: {selectedColor}
                  </p>
                </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Complete Your Order</h3>
              <p className="text-green-600 font-semibold mb-6 text-center">
                Cash on Delivery – Free Shipping
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Email Address", name: "email", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.name]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      className="w-full h-12 px-4 border-2 rounded-lg"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="w-full h-12 px-4 border-2 rounded-lg"
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full h-12 px-4 border-2 rounded-lg"
                    required
                  >
                    <option value="">Select State</option>
                    <option>Kerala</option>
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Andhra Pradesh</option>
                    <option>Telangana</option>
                    <option>Maharashtra</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    House / Flat No.
                  </label>
                  <input
                    type="text"
                    value={formData.house}
                    onChange={(e) =>
                      setFormData({ ...formData, house: e.target.value })
                    }
                    className="w-full h-12 px-4 border-2 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value.slice(0, 500),
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border-2 rounded-lg"
                    required
                  />
                </div>

              

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full h-14 rounded-full font-bold ${
                    isFormValid
                      ? "bg-gray-900 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order - COD"}
                </button>
              </form>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-10">
              <h4 className="text-2xl font-bold mb-3">
                Order Placed Successfully 🎉
              </h4>
              <p className="text-gray-600 mb-6">
                Your order will arrive in 7–13 days
              </p>
              <button
                onClick={handleClose}
                className="w-full h-12 bg-gray-900 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
