"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import Link from "next/link";
const WHATSAPP_NUMBER = "917982498712";
const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call Us",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    description: "Mon-Fri, 9AM-6PM IST",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: SITE.email,
    href: `mailto:${SITE.email}?subject=Product%20Inquiry&body=Hi%20Servchip%20Team%2C`,
    description: "We reply within 24 hours",
    color: "bg-[#EA4335]/10 text-[#EA4335]",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 79824 98712",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Servchip%2C%20I%27m%20interested%20in%20your%20products.`,
    description: "Chat instantly",
    color: "bg-[#25D366]/10 text-[#25D366]",
  },
];
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-dark pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="sr-only">Enterprise Chip Pricing &amp; Availability</h1>
        <SectionHeading
          label="Contact Us"
          title="Let's Talk About Your AI Infrastructure"
          subtitle="Whether you need 1 GPU or 1,000 - pricing, availability, or technical guidance. Our team is ready to help."
          align="center"
        />
        <div className="grid lg:grid-cols-5 gap-10 mt-10 max-w-6xl mx-auto">
          <div
            className="lg:col-span-3"
          >
            <ContactForm />
          </div>
          <div
            className="lg:col-span-2 space-y-5"
          >
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-text mb-4">
                Get in Touch Directly
              </h3>
              <div className="space-y-3">
                {CONTACT_METHODS.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.label === "WhatsApp" ? "_blank" : undefined}
                    rel={
                      method.label === "WhatsApp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 p-3 rounded-xl bg-bg-dark border border-border/50 hover:border-primary/30 transition-transform duration-200 hover:scale-[1.01] group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${method.color}`}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-dim">{method.label}</p>
                      <p className="text-sm font-semibold text-text truncate">
                        {method.value}
                      </p>
                      <p className="text-[10px] text-text-dim">
                        {method.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-primary transition-transform duration-200 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-text">Response Time</h3>
              </div>
              <p className="text-text-muted text-xs leading-relaxed mb-3">
                Our team typically responds within{" "}
                <strong className="text-text">2-4 hours</strong> during business
                hours. For urgent inquiries, call or WhatsApp us directly.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Currently Online</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-dim mb-0.5">India Office</p>
                  <p className="text-xs text-text font-medium leading-relaxed">
                    {SITE.addresses.india}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-dim mb-0.5">UAE Office</p>
                  <p className="text-xs text-text font-medium leading-relaxed">
                    {SITE.addresses.uae}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-xl p-5">
              <h3 className="text-sm font-bold text-text mb-2">Prefer RFQ?</h3>
              <p className="text-text-muted text-xs leading-relaxed mb-3">
                For structured procurement requests with product specs,
                quantities, and timelines.
              </p>
              <Link
                href="/rfq"
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                Submit RFQ <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
