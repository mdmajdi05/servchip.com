"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  ArrowRight,
  Phone,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";
import { SITE } from "@/lib/constants";

const EMAILS = "sales@servchip.com,contact@servchip.com,support@servchip.com";

const STORAGE_KEY = "servchip-inquiry-shown";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setIsOpen(true);
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: "",
          topic: formData.subject || "Product Inquiry",
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");

        const subject = encodeURIComponent(
          `[Servchip Inquiry] ${formData.subject || "Product Inquiry"} — ${formData.name}`,
        );
        const body = encodeURIComponent(
          [
            `Hi Servchip Team,`,
            ``,
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            formData.phone ? `Phone: ${formData.phone}` : null,
            `Inquiry Type: ${formData.subject || "Product Inquiry"}`,
            ``,
            `Message:`,
            formData.message,
          ]
            .filter(Boolean)
            .join("\n"),
        );
        const mailLink = document.createElement("a");
        mailLink.href = `mailto:${EMAILS}?subject=${subject}&body=${body}`;
        mailLink.click();
        localStorage.setItem(STORAGE_KEY, "1");
        setTimeout(() => setIsOpen(false), 4000);
      } else {
        setStatus("error");
        setErrorMsg(data.error?.message || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-dark/80 backdrop-blur-xl p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-bg-dark/60 border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/40 transition-transform duration-200"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Found Something Interesting?
                  </span>
                </div>
              </div>
              <h2 className="text-lg font-bold text-text leading-snug">
                Let&apos;s Connect With Our Sales Executive
              </h2>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                Whether it&apos;s pricing, availability, or technical specs —
                our team is ready to help you find the right solution.
              </p>
            </div>

            <div className="px-6 py-4">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-text mb-1">
                    Inquiry Received!
                  </p>
                  <p className="text-sm text-text-muted">
                    Our executive will reach out within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Work Email *"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200"
                    />
                  </div>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200"
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="GPU Pricing">
                      GPU / Accelerator Pricing
                    </option>
                    <option value="Server Pricing">Server Pricing</option>
                    <option value="Bulk Order">Bulk Order Inquiry</option>
                    <option value="Technical Specs">
                      Technical Specifications
                    </option>
                    <option value="Availability">Product Availability</option>
                    <option value="Partnership">Partnership / Reseller</option>
                    <option value="Other">Other</option>
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you need — product name, quantity, specs... *"
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200 resize-none"
                  />

                  {status === "error" && (
                    <p className="text-xs text-red-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-primary text-bg-dark font-semibold text-sm rounded-xl hover:bg-primary-dark neon-glow hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <span className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Inquiry
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-text-dim text-center">
                    We respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            <div className="px-6 pb-4 flex items-center justify-center gap-4 text-xs text-text-dim border-t border-border pt-3">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1 hover:text-primary transition-transform duration-200"
              >
                <Phone className="w-3 h-3" />
                Call Us
              </a>
              <span className="text-border">|</span>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-1 hover:text-primary transition-transform duration-200"
              >
                <Mail className="w-3 h-3" />
                Email Us
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
