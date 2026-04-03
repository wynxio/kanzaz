"use client";

import Link from "next/link";
import { PublicLayout } from "../components/PublicLayout";
 

export default function () {
  return (
    <section className="pt-12 pb-20 px-6">
      <PublicLayout>
       <div className="min-h-screen bg-white pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              {/* <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-truck-line text-green-600 text-xl"></i>
              </div> */}
              <h1 className="text-4xl font-bold text-gray-900">Shipping Policy</h1>
            </div>
            <p className="text-gray-500 text-sm mb-10">Last updated: January 2025</p>

            {/* Other Policies Navigation */}
            <div className="bg-gray-50 rounded-lg p-5 mb-12 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Other Policies
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/termsofuse"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  Terms of Use
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/privacypolicy"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/returnpolicy"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  Return &amp; Cancellation
                </Link>
              </div>
            </div>

            {/* Free Shipping Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-10">
              <div className="flex items-center gap-3">
                <i className="ri-gift-line text-green-600 text-2xl"></i>
                <p className="text-green-800 font-semibold text-lg">
                  Free shipping on all orders across India!
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Shipping Coverage</h3>
                <p className="text-gray-700 leading-relaxed">
                  We currently ship to all serviceable pin codes across India. If your area is not
                  serviceable by our courier partners, we will notify you after order placement and
                  the order will not be processed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Shipping Cost</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>All orders ship for free.</strong> There are no hidden charges, handling
                  fees, or additional delivery costs. The price you see on the product page is the
                  final price you pay at the time of delivery.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Delivery Timeline</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Estimated delivery times after order placement:
                </p>
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-6 py-3 font-semibold text-gray-900">
                          Region
                        </th>
                        <th className="text-left px-6 py-3 font-semibold text-gray-900">
                          Estimated Delivery
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="px-6 py-3 text-gray-700">
                          Metro Cities (Delhi, Mumbai, Bangalore, etc.)
                        </td>
                        <td className="px-6 py-3 text-gray-700">7–10 business days</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-6 py-3 text-gray-700">Tier 2 &amp; Tier 3 Cities</td>
                        <td className="px-6 py-3 text-gray-700">10–13 business days</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-6 py-3 text-gray-700">Remote / Rural Areas</td>
                        <td className="px-6 py-3 text-gray-700">12–15 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  * Business days exclude Sundays and public holidays. Delivery times are estimates
                  and may vary due to unforeseen circumstances.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Order Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Orders are processed within <strong>1–2 business days</strong> after placement. You
                  will receive an SMS/email notification once your order has been dispatched with
                  tracking details.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Delivery Attempts</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our courier partner will make up to <strong>2 delivery attempts</strong>. If the
                  delivery is unsuccessful after 2 attempts (due to incorrect address, unavailability,
                  or refusal to accept), the order will be returned to us and considered cancelled.
                  No re-delivery will be arranged.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">6. Cash on Delivery (COD)</h3>
                <p className="text-gray-700 leading-relaxed">
                  All orders are <strong>Cash on Delivery only</strong>. Please keep the exact amount
                  (₹599 per tee) ready at the time of delivery. Our delivery personnel may not carry
                  change. Do not make payment to anyone other than the official delivery person.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">7. Incorrect Address</h3>
                <p className="text-gray-700 leading-relaxed">
                  Please ensure your delivery address is accurate and complete at the time of
                  ordering. WynTees is not responsible for delays or failed deliveries due to
                  incorrect or incomplete address information. Since orders cannot be cancelled or
                  modified after placement, double-check your address before confirming.
                </p>
              </div>
            </div>
          </div>
        </div> 
      </PublicLayout>
    </section>
  );
}
