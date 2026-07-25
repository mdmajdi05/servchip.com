"use client";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail, X } from "lucide-react";
const WHATSAPP_NUMBER = "917982498712";
const PHONE_NUMBER = "+917982498712";
const EMAIL = "sales@servchip.com";
export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-[9997] flex flex-col items-end gap-3">
        {isOpen && (
          <div
            className="bg-surface border border-border rounded-2xl shadow-2xl p-4 w-72 mb-2"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-text">Contact Us</p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-md bg-bg-dark border border-border flex items-center justify-center text-text-muted hover:text-text transition-transform duration-200"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              Talk to our sales executive about pricing, availability, or
              technical specs. We respond within 24 hours.
            </p>
            <div className="space-y-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Servchip%2C%20I%27m%20interested%20in%20your%20products.%20Can%20you%20share%20pricing%20details%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-transform duration-200 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-xs font-semibold">WhatsApp</p>
                  <p className="text-[10px] opacity-70">Chat instantly</p>
                </div>
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-transform duration-200 hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Call Now</p>
                  <p className="text-[10px] opacity-70">{PHONE_NUMBER}</p>
                </div>
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Product%20Inquiry%20-%20AI%20Chips%20%26%20Servers&body=Hi%20Servchip%20Team%2C%0A%0AI%27m%20interested%20in%20learning%20more%20about%3A%0A%0A-%20Product%3A%0A-%20Quantity%3A%0A-%20Timeline%3A%0A%0APlease%20share%20pricing%20and%20availability.%0A%0AThanks`}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/20 text-[#EA4335] hover:bg-[#EA4335]/20 transition-transform duration-200 hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Email Us</p>
                  <p className="text-[10px] opacity-70">{EMAIL}</p>
                </div>
              </a>
            </div>
          </div>
        )}
      <div className="relative">
        {showPulse && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        )}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-primary text-bg-dark shadow-lg hover:bg-primary-dark hover:scale-110 transition-transform duration-200 flex items-center justify-center neon-glow"
          aria-label="Contact us"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
