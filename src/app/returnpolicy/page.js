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
            {/* <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-close-circle-line text-red-600 text-xl"></i>
            </div> */}
            <h1 className="text-4xl font-bold text-gray-900">
              Return &amp; Cancellation Policy
            </h1>
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
                href="/shippingpolicy"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
              >
                Shipping Policy
              </Link>
            </div>
          </div>

          {/* Important Notice Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-10">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-fill text-red-500 text-2xl mt-0.5"></i>
              <div>
                <h4 className="text-lg font-bold text-red-800 mb-2">
                  Important: No Returns or Exchanges
                </h4>
                <p className="text-red-700 leading-relaxed">
                  All sales at WynTees are <strong>final</strong>. We do not accept returns,
                  exchanges, or refunds under any circumstances. Please make sure to check the{' '}
                  <strong>Size Guide</strong> carefully before placing your order.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. No Return Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                Once an order is delivered, it <strong>cannot be returned</strong> for any reason,
                including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
                <li>Wrong size selection — please refer to the Size Guide before ordering</li>
                <li>
                  Color variation — slight differences may occur due to screen settings
                </li>
                <li>Change of mind after purchase</li>
                <li>Gifting purposes where the recipient does not prefer the item</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. No Exchange Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not offer exchanges for different sizes, colors, or designs. It is your
                responsibility to select the correct size and color at the time of ordering. We
                provide a detailed <strong>Size Guide</strong> with every product — please use it
                before confirming your order.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. No Cancellation Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                Orders <strong>cannot be cancelled</strong> once placed. As our products are limited
                edition and prepared immediately after ordering, we are unable to process
                cancellation requests. Please review your order details (size, color, quantity, and
                delivery address) carefully before confirming.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. No Refund Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                Since we operate on Cash on Delivery (COD) only and do not accept returns, there are
                no refunds applicable. Payment is collected at the time of delivery, and once
                accepted, the transaction is considered complete and final.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                5. Damaged or Defective Products
              </h3>
              <p className="text-gray-700 leading-relaxed">
                In the rare event that you receive a damaged or defective product, please contact us
                within <strong>24 hours</strong> of delivery with clear photographs of the damage. We
                will review your case and may offer a one-time replacement at our sole discretion.
                This does not apply to normal wear and tear or damage caused after delivery.
              </p>
            </section>

            {/* Recommendation Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-6">
              <div className="flex items-start gap-3">
                <i className="ri-lightbulb-line text-orange-500 text-2xl mt-0.5"></i>
                <div>
                  <h4 className="text-lg font-bold text-orange-800 mb-2">
                    Our Recommendation
                  </h4>
                  <p className="text-orange-700 leading-relaxed">
                    Before placing your order, always check the <strong>Size Guide</strong> available
                    on the product page. Measure yourself and compare with the chart to ensure the
                    perfect fit. If you are between two sizes, we recommend going one size up for a
                    comfortable fit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </PublicLayout>
    </section>
  );
}
