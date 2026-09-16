"use client";
import { useState } from "react";
import { X, Send, User, Mail, Phone, Hash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AnyProduct } from "@/types";

const WHATSAPP_NUMBER = "917982498712";

export function GetQuoteModal({
  product,
  blogTitle,
  onClose,
  onSubmit,
}: {
  product: AnyProduct;
  blogTitle: string;
  onClose: () => void;
  onSubmit?: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: `Hi, I came across this blog: "${blogTitle}" and I want this product: ${product.name}. Please share the pricing and availability.`,
  });
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) {
      setErrorMsg("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    try {
      await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chips: [{ chipId: product.id, quantity: Number(form.quantity) || 1 }],
          requirements: form.message,
          name: form.name,
          email: form.email,
          company: "",
          phone: form.phone,
          urgency: "ASAP",
        }),
      }).catch(() => {});
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: "",
          topic: `Quote for ${product.name}`,
          message: form.message,
        }),
      }).catch(() => {});
      const waMessage = encodeURIComponent(
        [
          `Hi Servchip Team,`,
          ``,
          `I came across this blog: "${blogTitle}"`,
          `and I'm interested in: ${product.name}`,
          form.quantity ? `Quantity: ${form.quantity}` : null,
          ``,
          `My Details:`,
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          form.phone ? `Phone: ${form.phone}` : null,
          ``,
          `Message:`,
          form.message,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`,
        "_blank",
      );
      onClose();
      onSubmit?.();
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const inputClasses =
    "w-full pl-10 pr-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-dark/80 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-bg-dark/60 border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/40 transition-transform duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Get a Quote
              </span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-text leading-snug">
            {product.name}
          </h2>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">
            Share your requirement and our sales team will reply within 24 hours
            via WhatsApp.
          </p>
        </div>

        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name *"
                required
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Work Email *"
                  required
                  className={inputClasses}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity needed (e.g., 10)"
                className={inputClasses}
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your requirement — specs, timeline, use case... *"
              required
              rows={3}
              className="w-full px-4 py-2.5 bg-bg-dark border border-border rounded-xl text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200 resize-none"
            />
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
            <Button
              type="submit"
              variant="solid"
              size="lg"
              fullWidth
              icon={<Send className="w-4 h-4" />}
              iconPosition="right"
            >
              Submit Quote Request
            </Button>
            <p className="text-xs text-text-dim text-center">
              We respond within 24 hours. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
