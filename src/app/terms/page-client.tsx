"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeading
          level="h1"
          label="Legal"
          title="Terms of Service"
          subtitle="Terms and conditions governing the use of our website and services"
          align="center"
        />
        <div className="text-text-muted text-sm space-y-6 mt-10 leading-relaxed">
          <p className="text-text-dim">Last updated: June 2026</p>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally
            binding agreement between you (&ldquo;User,&rdquo;
            &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and Servchip Inc.
            (&ldquo;Servchip,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) governing your access to and use of the Servchip
            website, services, and enterprise semiconductor procurement
            platform. By accessing our website, submitting a request for quote,
            or engaging our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Use of Service
          </h3>
          <p>
            You agree to use our website and services for lawful business
            purposes only, consistent with the enterprise procurement of AI
            chips, GPUs, server hardware, and data center equipment. You may not
            use our platform to engage in any illegal or unauthorized activity,
            including but not limited to fraudulent procurement,
            misrepresentation of company affiliation, attempted circumvention of
            export controls, or any activity that violates manufacturer
            agreements or applicable trade regulations.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Product Information and Specifications
          </h3>
          <p>
            We strive to provide accurate, up-to-date product information and
            technical specifications for all NVIDIA, AMD, Intel, and partner
            brand chips listed on our platform. However, specifications are
            subject to change by manufacturers without prior notice and should
            be independently verified before making procurement decisions.
            Servchip makes no warranties or representations regarding the
            completeness or absolute accuracy of product data, and we recommend
            consulting official manufacturer datasheets for mission-critical
            specifications.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Pricing, Quotes, and Payment
          </h3>
          <p>
            All quotes provided by Servchip are valid for thirty (30) days from
            the date of issuance unless otherwise specified in writing. Prices
            are quoted in USD and are subject to change based on market
            conditions, manufacturer pricing updates, currency fluctuations, and
            availability. Volume discounts and enterprise pricing tiers are
            available for qualified buyers and are negotiated on a case-by-case
            basis. Payment terms for established accounts may include wire
            transfer, letter of credit, or net terms subject to credit approval.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Orders and Delivery
          </h3>
          <p>
            Order fulfillment timelines depend on product availability,
            manufacturer lead times, and destination country logistics. Standard
            delivery for in-stock items is typically three to five business
            days, with express shipping available for urgent requirements. We
            ship to over 150 countries with secure, insured logistics and
            real-time tracking. Title and risk of loss pass to the buyer upon
            delivery to the carrier at our distribution center, unless otherwise
            agreed in writing.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Warranty and Returns
          </h3>
          <p>
            All products sold by Servchip carry the original manufacturer
            warranty, typically a minimum of three (3) years for enterprise GPUs
            and server hardware. We facilitate warranty claims and RMA processes
            on your behalf with manufacturer support. Returns for non-defective
            items are accepted within thirty (30) days for unopened products in
            original packaging, subject to a restocking fee. Defective items are
            covered under manufacturer warranty with our advanced replacement
            program to minimize downtime.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Limitation of Liability
          </h3>
          <p>
            To the maximum extent permitted by law, Servchip shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, including loss of profits, data, or business opportunities,
            arising from the use of our products or services. Our total
            aggregate liability for any claim shall not exceed the amount paid
            by you for the specific products or services giving rise to the
            claim. This limitation applies regardless of the legal theory under
            which the claim is brought.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Intellectual Property
          </h3>
          <p>
            All content on the Servchip website, including text, graphics,
            logos, product images, and technical documentation, is the property
            of Servchip or its licensors and is protected by intellectual
            property laws. You may not reproduce, distribute, or create
            derivative works without express written permission. Manufacturer
            trademarks and brand names (NVIDIA, AMD, Intel, etc.) are the
            property of their respective owners and are used with authorization
            or for descriptive purposes only.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Governing Law and Disputes
          </h3>
          <p>
            These Terms are governed by the laws of the United Arab Emirates,
            without regard to conflict of law principles. Any dispute arising
            out of or relating to these Terms or your use of our services shall
            be resolved through binding arbitration in Sharjah, UAE, in
            accordance with the rules of the Sharjah International Commercial
            Arbitration Centre (SHARJAH-ICAC).
          </p>

          <p>
            Questions about these terms?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
