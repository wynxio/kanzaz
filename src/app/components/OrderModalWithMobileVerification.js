"use client";
import { useState, FormEvent, useEffect } from "react";
import { XCircleFill } from "react-bootstrap-icons";

export default function OrderModalWithMobileVerification({
  isOpen,
  onClose,
  selectedSize,
  selectedColor,
}) {
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    house: "",
    address: "",
  });
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid =
      formData.name.trim() !== "" &&
      emailRegex.test(formData.email) &&
      formData.mobile.length === 10 &&
      isMobileVerified &&
      formData.state !== "" &&
      formData.house.trim() !== "" &&
      formData.address.trim() !== "";
    setIsFormValid(isValid);
  }, [formData, isMobileVerified]);

  if (!isOpen) return null;

  const handleSendOTP = () => {
    if (formData.mobile.length === 10) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    if (otp.every((digit) => digit !== "")) {
      setIsMobileVerified(true);
      setStep("form");
    }
  };

  const handleChangeMobile = () => {
    setIsMobileVerified(false);
    setFormData({ ...formData, mobile: "" });
    setOtp(["", "", "", ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("mobile", formData.mobile);
    formDataToSubmit.append("state", formData.state);
    formDataToSubmit.append("house", formData.house);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("size", selectedSize);
    formDataToSubmit.append("color", selectedColor);

    try {
      const response = await fetch(
        "https://readdy.ai/api/form/d61huo3n6d2i4h4oa90g",
        {
          method: "POST",
          body: new URLSearchParams(formDataToSubmit),
        },
      );

      if (response.ok) {
        setStep("success");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({
      name: "",
      email: "",
      mobile: "",
      state: "",
      house: "",
      address: "",
    });
    setOtp(["", "", "", ""]);
    setIsMobileVerified(false);
    onClose();
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-black/50 flex items-center justify-center  z-50"
    >
      <div className="ptop50 bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => handleClose()}
          className="cursorPointer absolute top-3 right-3 text-black-400 hover:text-gray-600 text-xl"
          aria-label="Close"
        >
          {/* ✕ */}
          <XCircleFill size={35} color="black"></XCircleFill>
        </button>

        {/* <div
          style={{
           
            minHeight: "300px",
            maxHeight: "80vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        > */}
          <div style={{
           
            minHeight: "300px",
            maxHeight: "80vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Complete Your Order
                </h3>
                <p className="text-green-600 font-semibold text-sm sm:text-base">
                  Cash on Delivery - Free Shipping
                </p>
              </div>
            </div>

            {step === "form" && (
              <form
                id="cod-order-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  {isMobileVerified ? (
                    <div>
                      <div className="w-full h-12 px-4 text-base border-2 border-gray-200 bg-gray-50 rounded-lg flex items-center justify-between">
                        <span className="text-gray-700">{formData.mobile}</span>
                        <i className="ri-check-line text-green-600 text-xl"></i>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                          <i className="ri-verified-badge-fill"></i>
                          Mobile number verified
                        </span>
                        <button
                          type="button"
                          onClick={handleChangeMobile}
                          className="selected-link text-sm font-medium hover:text-orange-600 cursor-pointer"
                        >
                          Change mobile number
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mobile: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          })
                        }
                        placeholder="10-digit mobile number"
                        className="flex-1 h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={formData.mobile.length !== 10}
                        className="h-12 px-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer sm:w-auto w-full"
                      >
                        Send OTP
                      </button>
                    </div>
                  )}
                </div>

                {isMobileVerified && <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>}

                {isMobileVerified && <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    House/Flat No.
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={formData.house}
                    onChange={(e) =>
                      setFormData({ ...formData, house: e.target.value })
                    }
                    className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>}

               {isMobileVerified &&  <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value.slice(0, 500),
                      })
                    }
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.address.length}/500 characters
                  </p>
                </div>}

                {isMobileVerified && <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Order Summary:</strong> Premium Cotton Tee - Size:{" "}
                    {selectedSize}, Color: {selectedColor}
                  </p>
                </div>}

                {isMobileVerified && <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full h-14 font-bold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    isFormValid
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting
                    ? "Placing Order..."
                    : isFormValid
                      ? "Place Order - COD"
                      : "Complete all fields to order"}
                </button>}

                {!isFormValid && (
                  <p className="text-center text-sm text-gray-500">
                    {!isMobileVerified && formData.mobile.length === 10
                      ? "Please verify your mobile number"
                      : !isMobileVerified
                        ? "Enter and verify your mobile number"
                        : "Please fill all required fields"}
                  </p>
                )}
              </form>
            )}

            {step === "otp" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-smartphone-line text-3xl selected-link"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Verify OTP
                </h4>
                <p className="text-gray-600 mb-6">
                  Enter the 4-digit code sent to {formData.mobile}
                </p>

                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      maxLength={1}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.some((digit) => digit === "")}
                  className="w-full h-12 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {step === "success" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <i className="ri-check-line text-4xl text-green-600"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Order Placed Successfully! 🎉
                </h4>
                <p className="text-gray-600 mb-2">
                  Your premium tee will arrive within 7-13 days
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Order ID: #
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Payment:</strong> Cash on Delivery
                    <br />
                    <strong>Shipping:</strong> Free
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full h-12 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        {/* </div> */}

        {/* <div className="flex justify-end gap-2">
          <button
            onClick={() => handleClose()}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Confirm
          </button>
        </div> */}
      </div>
    </div>

    // <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 sm:p-6">

    //   <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn">

    //     <div className="p-6 sm:p-8">

    //       <div className="flex justify-between items-start mb-6">
    //         <div>
    //           <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h3>
    //           <p className="text-green-600 font-semibold text-sm sm:text-base">Cash on Delivery - Free Shipping</p>
    //         </div>

    //       </div>

    //       {step === 'form' && (
    //         <form id="cod-order-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
    //           <div>
    //             <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
    //             <input
    //               type="text"
    //               name="name"
    //               value={formData.name}
    //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //               className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
    //               required
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
    //             <input
    //               type="email"
    //               name="email"
    //               value={formData.email}
    //               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //               className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
    //               required
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
    //             {isMobileVerified ? (
    //               <div>
    //                 <div className="w-full h-12 px-4 text-base border-2 border-gray-200 bg-gray-50 rounded-lg flex items-center justify-between">
    //                   <span className="text-gray-700">{formData.mobile}</span>
    //                   <i className="ri-check-line text-green-600 text-xl"></i>
    //                 </div>
    //                 <div className="flex items-center justify-between mt-2">
    //                   <span className="text-green-600 text-sm font-medium flex items-center gap-1">
    //                     <i className="ri-verified-badge-fill"></i>
    //                     Mobile number verified
    //                   </span>
    //                   <button
    //                     type="button"
    //                     onClick={handleChangeMobile}
    //                     className="selected-link text-sm font-medium hover:text-orange-600 cursor-pointer"
    //                   >
    //                     Change mobile number
    //                   </button>
    //                 </div>
    //               </div>
    //             ) : (
    //               <div className="flex flex-col sm:flex-row gap-2">
    //                 <input
    //                   type="tel"
    //                   name="mobile"
    //                   value={formData.mobile}
    //                   onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
    //                   placeholder="10-digit mobile number"
    //                   className="flex-1 h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
    //                   required
    //                 />
    //                 <button
    //                   type="button"
    //                   onClick={handleSendOTP}
    //                   disabled={formData.mobile.length !== 10}
    //                   className="h-12 px-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer sm:w-auto w-full"
    //                 >
    //                   Send OTP
    //                 </button>
    //               </div>
    //             )}
    //           </div>

    //           <div>
    //             <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
    //             <select
    //               name="state"
    //               value={formData.state}
    //               onChange={(e) => setFormData({ ...formData, state: e.target.value })}
    //               className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
    //               required
    //             >
    //               <option value="">Select State</option>
    //               <option value="Andhra Pradesh">Andhra Pradesh</option>
    //               <option value="Karnataka">Karnataka</option>
    //               <option value="Kerala">Kerala</option>
    //               <option value="Tamil Nadu">Tamil Nadu</option>
    //               <option value="Telangana">Telangana</option>
    //               <option value="Maharashtra">Maharashtra</option>
    //               <option value="Gujarat">Gujarat</option>
    //               <option value="Rajasthan">Rajasthan</option>
    //               <option value="Delhi">Delhi</option>
    //               <option value="Other">Other</option>
    //             </select>
    //           </div>

    //           <div>
    //             <label className="block text-sm font-semibold text-gray-700 mb-2">House/Flat No.</label>
    //             <input
    //               type="text"
    //               name="house"
    //               value={formData.house}
    //               onChange={(e) => setFormData({ ...formData, house: e.target.value })}
    //               className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
    //               required
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
    //             <textarea
    //               name="address"
    //               value={formData.address}
    //               onChange={(e) => setFormData({ ...formData, address: e.target.value.slice(0, 500) })}
    //               maxLength={500}
    //               rows={4}
    //               className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
    //               required
    //             />
    //             <p className="text-xs text-gray-500 mt-1">{formData.address.length}/500 characters</p>
    //           </div>

    //           <div className="bg-gray-50 rounded-lg p-4">
    //             <p className="text-sm text-gray-700">
    //               <strong>Order Summary:</strong> Premium Cotton Tee - Size: {selectedSize}, Color: {selectedColor}
    //             </p>
    //           </div>

    //           <button
    //             type="submit"
    //             disabled={!isFormValid || isSubmitting}
    //             className={`w-full h-14 font-bold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
    //               isFormValid
    //                 ? 'bg-gray-900 text-white hover:bg-gray-800'
    //                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    //             }`}
    //           >
    //             {isSubmitting ? 'Placing Order...' : isFormValid ? 'Place Order - COD' : 'Complete all fields to order'}
    //           </button>

    //           {!isFormValid && (
    //             <p className="text-center text-sm text-gray-500">
    //               {!isMobileVerified && formData.mobile.length === 10
    //                 ? 'Please verify your mobile number'
    //                 : !isMobileVerified
    //                 ? 'Enter and verify your mobile number'
    //                 : 'Please fill all required fields'}
    //             </p>
    //           )}
    //         </form>
    //       )}

    //       {step === 'otp' && (
    //         <div className="text-center">
    //           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
    //             <i className="ri-smartphone-line text-3xl selected-link"></i>
    //           </div>
    //           <h4 className="text-xl font-bold text-gray-900 mb-2">Verify OTP</h4>
    //           <p className="text-gray-600 mb-6">Enter the 4-digit code sent to {formData.mobile}</p>

    //           <div className="flex justify-center gap-3 mb-6">
    //             {otp.map((digit, index) => (
    //               <input
    //                 key={index}
    //                 id={`otp-${index}`}
    //                 type="text"
    //                 value={digit}
    //                 onChange={(e) => handleOtpChange(index, e.target.value)}
    //                 maxLength={1}
    //                 className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
    //               />
    //             ))}
    //           </div>

    //           <button
    //             onClick={handleVerifyOTP}
    //             disabled={otp.some(digit => digit === '')}
    //             className="w-full h-12 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
    //           >
    //             Verify OTP
    //           </button>
    //         </div>
    //       )}

    //       {step === 'success' && (
    //         <div className="text-center py-8">
    //           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
    //             <i className="ri-check-line text-4xl text-green-600"></i>
    //           </div>
    //           <h4 className="text-2xl font-bold text-gray-900 mb-3">Order Placed Successfully! 🎉</h4>
    //           <p className="text-gray-600 mb-2">Your premium tee will arrive within 7-13 days</p>
    //           <p className="text-sm text-gray-500 mb-6">Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>

    //           <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
    //             <p className="text-sm text-gray-700">
    //               <strong>Payment:</strong> Cash on Delivery<br />
    //               <strong>Shipping:</strong> Free
    //             </p>
    //           </div>

    //           <button
    //             onClick={handleClose}
    //             className="w-full h-12 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer"
    //           >
    //             Close
    //           </button>
    //         </div>
    //       )}
    //     </div>

    //   </div>
    // </div>
  );
}
