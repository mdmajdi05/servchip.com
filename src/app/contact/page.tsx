"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "sales@servchip.com", href: "mailto:sales@servchip.com" },
  { icon: Phone, label: "Phone", value: "+1 (800) 555-1234", href: "tel:+18005551234" },
  { icon: MapPin, label: "Office", value: "Austin, TX 78701, USA" },
];

const TOPICS = [
  "General Inquiry",
  "Product Information",
  "Bulk Order / RFQ",
  "Technical Support",
  "Partnership Opportunity",
  "Other",
];

type FormState = "idle" | "submitting" | "success";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    topic: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Contact Us"
          title="Get in Touch with Our Team"
          subtitle="Reach out for sales inquiries, technical support, or partnership opportunities"
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-10 mt-10 max-w-5xl mx-auto">
          {/* Contact Info */}
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
                    <div className="text-xs text-text-dim mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-text hover:text-primary transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm text-text font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-text mb-2">Response Time</h3>
              <p className="text-text-muted text-xs leading-relaxed">
                Our team typically responds within 2-4 hours during business hours (Mon-Fri, 9AM-6PM CST).
                For urgent inquiries, please call our support line.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-text mb-2">Quick Links</h3>
              <div className="space-y-1.5">
                {[
                  { label: "Request a Quote", href: "/rfq" },
                  { label: "Browse Products", href: "/products" },
                  { label: "FAQs", href: "/faq" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-primary/30 rounded-2xl p-10 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Message Sent!</h3>
                <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button variant="outline" onClick={() => { setFormState("idle"); setForm({ name: "", email: "", company: "", phone: "", topic: "General Inquiry", message: "" }); }}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-dim mb-1.5">Topic</label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text outline-none focus:border-primary/50 transition-colors"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-dim mb-1.5">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project or requirements..."
                    className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  fullWidth
                  disabled={formState === "submitting"}
                  icon={formState === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                >
                  {formState === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
