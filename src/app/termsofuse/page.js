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
              {/* <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-text-line text-orange-600 text-xl"></i>
              </div> */}
              <h1 className="text-4xl font-bold text-gray-900">Terms of Use</h1>
            </div>
            <p className="text-gray-500 text-sm mb-10">
              Last updated: January 2025
            </p>

            {/* Other Policies Navigation */}
            <div className="bg-gray-50 rounded-lg p-5 mb-12 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Other Policies
              </h3>
              <div className="flex flex-wrap gap-3">
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
                <span className="text-gray-300">|</span>
                <Link
                  href="/shippingpolicy"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  Shipping Policy
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Acceptance of Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using the WynTees website, you accept and
                  agree to be bound by the terms and provisions of this
                  agreement. If you do not agree to these terms, please do not
                  use our services. These terms apply to all visitors, users,
                  and others who access or use our website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Product Information
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to provide accurate product descriptions, images,
                  and sizing information. However, we do not warrant that
                  product descriptions, colors, or other content available on
                  our website are accurate, complete, reliable, current, or
                  error‑free. Colors may appear slightly different depending on
                  your device screen settings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Payment Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  WynTees operates on a{" "}
                  <strong>Cash on Delivery (COD) basis only</strong>. Payment
                  must be made in cash to the delivery personnel upon receipt of
                  your order. We do not accept any other form of payment at this
                  time. Please keep the exact amount ready at the time of
                  delivery.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  4. Order Placement
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By placing an order, you confirm that all information provided
                  is accurate and complete. You are responsible for selecting
                  the correct size and color. We strongly recommend reviewing
                  the <strong>Size Guide</strong> provided on each product page
                  before placing your order, as all sales are final and no
                  returns or exchanges are accepted.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  5. Limitation of Liability
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  WynTees shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of or inability to use the service. Our total
                  liability shall not exceed the amount paid for the product in
                  question.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  6. Changes to Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting to the
                  website. Your continued use of the website following the
                  posting of changes constitutes your acceptance of such
                  changes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  7. Contact Information
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  For any questions regarding these terms, please contact us
                  through our website or reach out via our social media
                  channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </section>
  );
}
