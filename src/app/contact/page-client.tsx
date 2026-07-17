"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
  },
  { icon: MapPin, label: "India Office", value: SITE.addresses.india },
  { icon: MapPin, label: "UAE Office", value: SITE.addresses.uae },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px] lg:pt-[104px] pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Contact Us"
          title="Enterprise Chip Pricing & Availability"
          subtitle="Reach out for sales inquiries, technical support, or partnership opportunities"
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-10 mt-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 bg-surface border border-border rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-dim mb-0.5">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-text hover:text-primary transition-colors font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm text-text font-medium">
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-text mb-2">
                Response Time
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                Our team typically responds within 2-4 hours during business
                hours (Mon-Fri, 9AM-6PM CST). For urgent inquiries, please call
                our support line.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
