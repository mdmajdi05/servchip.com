"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <SectionHeading
          label="Legal"
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your data"
          align="center"
        />
        <div className="text-text-muted text-sm space-y-4 mt-10">
          <p>Last updated: June 2026</p>
          <p>
            Servchip Inc. (&ldquo;Servchip,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <h3 className="text-text font-semibold">Information We Collect</h3>
          <p>We collect information you provide directly to us, including name, email address, company name, phone number, and project requirements when you submit a quote request or contact form.</p>
          <h3 className="text-text font-semibold">How We Use Your Information</h3>
          <p>We use the information we collect to respond to your inquiries, process quote requests, provide technical support, and improve our services.</p>
          <h3 className="text-text font-semibold">Data Protection</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
          <h3 className="text-text font-semibold">Contact</h3>
          <p>For privacy-related inquiries, contact us at privacy@servchip.com.</p>
        </div>
      </div>
    </div>
  );
}
