"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeading
          level="h1"
          label="Legal"
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your data"
          align="center"
        />
        <div className="text-text-muted text-sm space-y-6 mt-10 leading-relaxed">
          <p className="text-text-dim">Last updated: June 2026</p>
          <p>
            Servchip Inc. (&ldquo;Servchip,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
            your privacy and ensuring transparency in how we handle your
            personal information. This Privacy Policy explains in detail how we
            collect, use, disclose, and safeguard your information when you
            visit our website, request a quote, or engage with our enterprise
            chip distribution services.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Information We Collect
          </h3>
          <p>
            We collect information you provide directly to us when you interact
            with our platform. This includes your full name, business email
            address, company name, phone number, job title, and detailed project
            requirements when you submit a request for quote (RFQ), contact
            form, or newsletter subscription. We also collect technical data
            automatically through cookies and similar technologies, such as your
            IP address, browser type, device information, pages visited, and
            referral sources to improve site performance and user experience.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            How We Use Your Information
          </h3>
          <p>
            We use the information we collect to respond to your inquiries
            promptly, process quote requests with accurate pricing and
            availability, provide technical consultation and support for AI chip
            procurement, and improve our services based on user feedback and
            usage patterns. Your data helps us tailor our communications,
            recommend relevant products from our NVIDIA, AMD, and Intel
            portfolios, and ensure compliance with export regulations and
            manufacturer requirements for enterprise semiconductor distribution.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Data Protection and Security
          </h3>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            disclosure, or destruction. Our systems employ encryption in transit
            and at rest, access controls based on the principle of least
            privilege, and regular security assessments. As an ISO 9001
            certified enterprise distributor, we maintain data handling
            practices that align with international quality management standards
            and the stringent requirements of our manufacturer partners.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Data Retention and Your Rights
          </h3>
          <p>
            We retain your information only as long as necessary to fulfill the
            purposes outlined in this policy, comply with legal obligations,
            resolve disputes, and enforce our agreements. You have the right to
            access, correct, or request deletion of your personal data, object
            to processing, and request data portability where applicable. To
            exercise these rights, please contact our privacy team at the email
            address below.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">
            Third-Party Sharing
          </h3>
          <p>
            We do not sell your personal information. We may share data with
            trusted service providers who assist with website hosting,
            analytics, email delivery, and customer relationship management, all
            under strict confidentiality agreements. When processing
            international chip orders, we may share necessary shipping and
            compliance information with logistics partners and customs
            authorities as required by law.
          </p>

          <h3 className="text-text font-semibold text-lg mt-8 mb-3">Contact</h3>
          <p>
            For privacy-related inquiries, requests to exercise your data
            rights, or questions about our data practices, contact us at
            privacy@servchip.com or reach out via our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact page
            </Link>
            . Our team will respond within 30 days in accordance with applicable
            data protection regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
