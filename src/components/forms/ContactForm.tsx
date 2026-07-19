"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  User,
  Building2,
  MessageSquare,
  Globe,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EMAILS = "sales@servchip.com,contact@servchip.com,support@servchip.com";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  quantity: z.string().optional(),
  topic: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const TOPICS = [
  "GPU / Accelerator Pricing",
  "Server Pricing",
  "Bulk Order Inquiry",
  "Technical Specifications",
  "Product Availability",
  "Partnership / Reseller",
  "Technical Support",
  "General Inquiry",
];

type FormState = "idle" | "submitting" | "success";

const inputClasses =
  "w-full bg-bg-dark border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-transform duration-200";

function FieldIcon({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
  );
}

function buildMailtoUrl(data: ContactFormData): string {
  const subject = encodeURIComponent(
    `[Servchip Inquiry] ${data.topic} — ${data.name}`,
  );
  const lines = [
    `Hi Servchip Team,`,
    ``,
    `I'm interested in the following:`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    data.country ? `Country: ${data.country}` : null,
    data.quantity ? `Quantity Needed: ${data.quantity}` : null,
    `Inquiry Type: ${data.topic}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `Looking forward to your response.`,
  ].filter(Boolean);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${EMAILS}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: "GPU / Accelerator Pricing" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("submitting");

    // Log on server
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      /* continue */
    }

    // Open email client with all 3 recipients pre-filled
    const link = document.createElement("a");
    link.href = buildMailtoUrl(data);
    link.click();

    setFormState("success");
  };

  const handleReset = () => {
    reset();
    setFormState("idle");
  };

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface border border-primary/30 rounded-2xl p-10 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-text mb-2">
          Your Email Client Has Opened!
        </h3>
        <p className="text-text-muted text-sm mb-2 max-w-sm mx-auto">
          Your inquiry has been pre-filled and addressed to our sales, contact,
          and support teams. Just click{" "}
          <strong className="text-text">Send</strong> in your email app.
        </p>
        <p className="text-text-dim text-xs mb-6">
          Recipients: sales@servchip.com, contact@servchip.com,
          support@servchip.com
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={handleReset}>
            Submit Another Inquiry
          </Button>
          <a href="tel:+917982498712">
            <Button variant="solid">
              <Phone className="w-4 h-4 mr-2" />
              Call Us Instead
            </Button>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-text mb-1">
          Send Us Your Inquiry
        </h2>
        <p className="text-text-muted text-sm">
          Fill in the details and your email client will open with a pre-filled
          message sent to our sales, contact &amp; support teams.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" required error={errors.name?.message}>
            <FieldIcon icon={User} />
            <input
              type="text"
              placeholder="John Doe"
              disabled={formState === "submitting"}
              className={cn(inputClasses, errors.name && "border-error/50")}
              {...register("name")}
            />
          </Field>
          <Field label="Work Email" required error={errors.email?.message}>
            <FieldIcon icon={Mail} />
            <input
              type="email"
              placeholder="john@company.com"
              disabled={formState === "submitting"}
              className={cn(inputClasses, errors.email && "border-error/50")}
              {...register("email")}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone Number" error={errors.phone?.message}>
            <FieldIcon icon={Phone} />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              disabled={formState === "submitting"}
              className={cn(inputClasses)}
              {...register("phone")}
            />
          </Field>
          <Field label="Company" error={errors.company?.message}>
            <FieldIcon icon={Building2} />
            <input
              type="text"
              placeholder="Your Company Name"
              disabled={formState === "submitting"}
              className={cn(inputClasses)}
              {...register("company")}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Country" error={errors.country?.message}>
            <FieldIcon icon={Globe} />
            <input
              type="text"
              placeholder="India / UAE / USA"
              disabled={formState === "submitting"}
              className={cn(inputClasses)}
              {...register("country")}
            />
          </Field>
          <Field label="Estimated Quantity" error={errors.quantity?.message}>
            <FieldIcon icon={Hash} />
            <input
              type="text"
              placeholder="e.g., 10x H100 GPUs"
              disabled={formState === "submitting"}
              className={cn(inputClasses)}
              {...register("quantity")}
            />
          </Field>
        </div>

        <Field label="Inquiry Type" required error={errors.topic?.message}>
          <FieldIcon icon={MessageSquare} />
          <select
            disabled={formState === "submitting"}
            className={cn(inputClasses, errors.topic && "border-error/50")}
            {...register("topic")}
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Your Message" required error={errors.message?.message}>
          <textarea
            rows={4}
            placeholder="Tell us what you need — product names, specs, quantities, timeline..."
            disabled={formState === "submitting"}
            className={cn(
              "w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-transform duration-200 resize-none",
              errors.message && "border-error/50",
            )}
            {...register("message")}
          />
        </Field>

        <Button
          type="submit"
          variant="solid"
          size="lg"
          fullWidth
          loading={formState === "submitting"}
          icon={<Send className="w-4 h-4" />}
          iconPosition="right"
        >
          {formState === "submitting"
            ? "Opening Email..."
            : "Submit Inquiry via Email"}
        </Button>

        <p className="text-xs text-text-dim text-center">
          📩 Your inquiry will be sent to{" "}
          <span className="text-primary">sales@</span>,{" "}
          <span className="text-primary">contact@</span> &amp;{" "}
          <span className="text-primary">support@</span>servchip.com
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-text-dim mb-1.5">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-error text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
