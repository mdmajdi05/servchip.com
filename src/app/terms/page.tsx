"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <SectionHeading
          label="Legal"
          title="Terms of Service"
          subtitle="Terms and conditions governing the use of our website and services"
          align="center"
        />
        <div className="text-text-muted text-sm space-y-4 mt-10">
          <p>Last updated: June 2026</p>
          <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Servchip website and services.</p>
          <h3 className="text-text font-semibold">Use of Service</h3>
          <p>You agree to use our website and services for lawful purposes only. You may not use our platform to engage in any illegal or unauthorized activity.</p>
          <h3 className="text-text font-semibold">Product Information</h3>
          <p>We strive to provide accurate product information and specifications. However, specifications are subject to change by manufacturers and should be verified.</p>
          <h3 className="text-text font-semibold">Pricing and Quotes</h3>
          <p>All quotes provided are valid for 30 days unless otherwise specified. Prices are subject to change based on market conditions and availability.</p>
          <h3 className="text-text font-semibold">Limitation of Liability</h3>
          <p>Servchip shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
        </div>
      </div>
    </div>
  );
}
