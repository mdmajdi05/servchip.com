"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Send, CheckCircle, Loader2, Package, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CHIPS } from "@/data/chips";

const QUANTITIES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const TIMEFRAMES = ["Within 1 week", "Within 2 weeks", "Within 1 month", "Flexible / No rush"];
const REGIONS = ["North America", "Europe", "Asia Pacific", "Middle East", "Africa", "South America", "Global"];

type FormState = "idle" | "submitting" | "success";

export default function RFQPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    quantity: "1-10",
    timeframe: "Within 2 weeks",
    region: "North America",
    notes: "",
  });

  const toggleChip = (id: string) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 2000);
  };

  if (formState === "success") {
    return (
      <div className="min-h-screen bg-bg-dark pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-text mb-3">Quote Request Submitted</h1>
            <p className="text-text-muted text-sm mb-2">
              Thank you, {form.name}! Our team will review your request and respond within 24 hours.
            </p>
            <p className="text-text-dim text-xs mb-8">
              A confirmation has been sent to {form.email}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <Button variant="outline">Browse More Products</Button>
              </Link>
              <Link href="/">
                <Button variant="solid">Back to Home</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="Request a Quote"
          title="Get a Personalized Quote"
          subtitle="Fill in your requirements and our team will respond within 24 hours"
          align="center"
        />

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8 mt-10">
            {/* Chip Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 space-y-6"
            >
              <Card variant="elevated">
                <h3 className="text-base font-bold text-text mb-1">Select Chips</h3>
                <p className="text-xs text-text-dim mb-4">
                  Choose the NVIDIA chips you&apos;re interested in ({selectedChips.length} selected)
                </p>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {CHIPS.map((chip) => {
                    const selected = selectedChips.includes(chip.id);
                    return (
                      <button
                        type="button"
                        key={chip.id}
                        onClick={() => toggleChip(chip.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                          selected
                            ? "border-primary/40 bg-primary/5"
                            : "border-border bg-bg-dark hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              selected ? "bg-primary border-primary" : "border-border"
                            }`}
                          >
                            {selected && <span className="text-bg-dark text-[10px] font-bold">✓</span>}
                          </div>
                          <div>
                            <span className="text-sm text-text font-medium">{chip.name}</span>
                            <div className="flex gap-2 mt-0.5">
                              <span className="text-[10px] text-text-dim">{chip.series}</span>
                              <span className="text-[10px] text-text-dim">{chip.architecture}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            chip.status === "in_stock" ? "green" :
                            chip.status === "pre_order" ? "purple" :
                            chip.status === "on_order" ? "cyan" : "amber"
                          }
                          size="sm"
                        >
                          {chip.status.replace("_", " ")}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Additional Notes */}
              <Card variant="elevated">
                <h3 className="text-base font-bold text-text mb-1">Additional Notes</h3>
                <p className="text-xs text-text-dim mb-3">
                  Share any specific requirements, configurations, or questions
                </p>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g., Preferred memory configuration, cooling requirements, delivery timeline, etc."
                  className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </Card>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card variant="elevated">
                <h3 className="text-base font-bold text-text mb-4">Your Information</h3>
                <div className="space-y-4">
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
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">
                      Company <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">Quantity</label>
                    <select
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text outline-none focus:border-primary/50 transition-colors"
                    >
                      {QUANTITIES.map((q) => <option key={q} value={q}>{q} units</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">Timeline</label>
                    <select
                      value={form.timeframe}
                      onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text outline-none focus:border-primary/50 transition-colors"
                    >
                      {TIMEFRAMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-dim mb-1.5">Region</label>
                    <select
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                      className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text outline-none focus:border-primary/50 transition-colors"
                    >
                      {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              </Card>

              <Button
                type="submit"
                variant="solid"
                size="lg"
                fullWidth
                disabled={formState === "submitting" || selectedChips.length === 0}
                icon={formState === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {formState === "submitting"
                  ? "Submitting..."
                  : selectedChips.length === 0
                  ? "Select at least one chip"
                  : "Submit Quote Request"}
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-text-dim">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-primary" /> No obligation</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" /> 24hr response</span>
                <span className="flex items-center gap-1"><Package className="w-3 h-3 text-primary" /> Global delivery</span>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
