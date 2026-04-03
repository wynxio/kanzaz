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
              <i className="ri-shield-check-line text-orange-600 text-xl"></i>
            </div> */}
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-500 text-sm mb-10">Last updated: January 2025</p>

          {/* Other Policies Navigation */}
          <section className="bg-gray-50 rounded-lg p-5 mb-12 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Other Policies
            </h3>
            <nav className="flex flex-wrap gap-3">
              <Link
                href="/termsofuse"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
              >
                Terms of Use
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
            </nav>
          </section>

          <section className="space-y-8">
            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Information We Collect
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you place an order on WynTees, we collect the following personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Mobile phone number</li>
                <li>Delivery address (house/flat number, street, city, state, pincode)</li>
                <li>Product preferences (size, color selections)</li>
              </ul>
            </article>

            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your order status and delivery updates</li>
                <li>To verify your identity through OTP verification</li>
                <li>To send you notifications about new product drops (only if you subscribe)</li>
                <li>To improve our website and customer experience</li>
              </ul>
            </article>

            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Information Sharing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We do <strong>not</strong> sell, trade, or rent your personal information to third parties.
                We may share your delivery details with our logistics and courier partners solely for the
                purpose of delivering your order. These partners are obligated to keep your information
                confidential.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4. Data Security
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                5. Cookies
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our website may use cookies to enhance your browsing experience. Cookies are small files
                stored on your device that help us understand how you interact with our website. You can
                choose to disable cookies through your browser settings, though this may affect some
                website functionality.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                6. Your Rights
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You have the right to request access to, correction of, or deletion of your personal
                data. To exercise these rights, please contact us through our website. We will respond to
                your request within a reasonable timeframe.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                7. Changes to Privacy Policy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this
                page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </article>
          </section>
        </div>
      </div>
      </PublicLayout>
    </section>
  );
}
