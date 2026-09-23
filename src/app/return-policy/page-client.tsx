"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeading
          level="h1"
          label="Legal"
          title="Return Policy"
          subtitle="Our policy for returns, RMA claims, and refunds"
          align="center"
        />
        <div className="text-text-muted text-sm space-y-6 mt-10 leading-relaxed">
          <p className="text-text-dim">Last updated: June 2026</p>
          <p>
            This Return Policy (&ldquo;Policy&rdquo;) explains how returns,
            replacements, warranty (RMA) claims, and refunds are handled by
            Servchip Inc. (&ldquo;Servchip,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) for enterprise chips, server
            hardware, and data center equipment sold through our platform. All
            returns are processed subject to the conditions described below and
            in our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            .
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Return Window
          </h3>
          <p>
            For a return to be eligible, you must submit a return request within
            thirty (30) days of the delivery date. Requests received after this
            window will generally be declined unless the product is covered by
            manufacturer warranty through its RMA process. Order cancellations
            are accepted free of charge for products that have not yet been
            dispatched; once shipped, standard return conditions apply.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Non-Defective Returns
          </h3>
          <p>
            Items returned for reasons other than a confirmed defect are
            accepted within thirty (30) days provided the product is unused,
            unopened, in its original packaging, and in resalable condition.
            Non-defective returns are subject to a restocking fee of fifteen
            percent (15%) of the order value. Return shipping costs for
            non-defective items are the responsibility of the buyer.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Defective Products and Warranty
          </h3>
          <p>
            All products sold by Servchip carry the original manufacturer
            warranty, typically a minimum of three (3) years for enterprise GPUs
            and server hardware. If a product arrives defective or fails within
            the warranty period, we facilitate the manufacturer RMA process on
            your behalf. Approved warranty claims are handled through our
            advanced replacement program, where eligible customers receive a
            replacement unit before returning the defective one, minimizing
            downtime for your infrastructure.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            How to Initiate a Return
          </h3>
          <p>
            To start a return or warranty claim, contact our support team via
            our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact page
            </Link>{" "}
            with your order number, product serial number, a description of the
            issue, and photographic evidence where applicable. Every return is
            issued a unique Return Merchandise Authorization (RMA) number that
            must be quoted on the outside of the return package. Shipments
            received without a valid RMA number may be delayed or refused.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Condition and Packaging Requirements
          </h3>
          <p>
            Returned products must include all original accessories, cables,
            documentation, and packaging materials. Products for enterprise GPUs
            and server components must be shipped in their original anti-static
            packaging securely wrapped to prevent damage in transit. We reserve
            the right to reduce a refund by the cost of restoring a product to
            resalable condition, or to decline the return entirely, if the
            product shows signs of physical damage, tampering, or misuse beyond
            normal wear.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Non-Returnable Items
          </h3>
          <p>
            Certain products cannot be returned for safety, integrity, or
            licensing reasons. This includes products with opened or removed
            factory seals where the manufacturer does not permit resealing,
            customized or special-order configurations, software and licenses
            once activated, and products damaged due to improper handling,
            installation, or unauthorized modification. Items marked
            &ldquo;special order&rdquo; or &ldquo;non-cancellable&rdquo; at the
            time of quote are final sale.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Refunds and Processing Time
          </h3>
          <p>
            Once a return is received and inspected, we will notify you of the
            approval or rejection of your refund. Approved refunds are issued to
            the original payment method within ten (10) business days of
            approval. For enterprise accounts, approved credit may also be
            applied to your account balance or future orders. The restocking
            fee, where applicable, is deducted from the refund amount and there
            are no additional fees for standard refund processing.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Shipping and Return Costs
          </h3>
          <p>
            For defective items confirmed under warranty, Servchip covers the
            return shipping cost and provides prepaid return labels where the
            destination country is serviceable. For all other returns, the buyer
            is responsible for return shipping costs. We recommend using a
            trackable, insured shipping method, as we are not responsible for
            items lost or damaged in transit on a buyer-paid return shipment.
            Title and risk of loss for returned goods transfer to us upon
            delivery to our designated return facility.
          </p>

          <p>
            Questions about this policy?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>{" "}
            and our team will assist you with your return or RMA request.
          </p>
        </div>
      </div>
    </div>
  );
}
