"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const TOPICS = [
  "General Inquiry",
  "Product Information",
  "Bulk Order / RFQ",
  "Technical Support",
  "Partnership Opportunity",
  "Other",
];

type FormState = "idle" | "submitting" | "success";

const inputClasses =
  "w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      topic: "General Inquiry",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setFormState("success");
    } catch {
      setFormState("idle");
    }
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
        <h3 className="text-xl font-bold text-text mb-2">Message Sent!</h3>
        <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
          Thank you! We&apos;ll respond within 24 hours.
        </p>
        <Button variant="outline" onClick={handleReset}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" required error={errors.name?.message}>
            <input
              type="text"
              placeholder="John Doe"
              disabled={formState === "submitting"}
              className={cn(inputClasses, errors.name && "border-error/50")}
              {...register("name")}
            />
          </Field>
          <Field label="Email" required error={errors.email?.message}>
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
          <Field label="Company" error={errors.company?.message}>
            <input
              type="text"
              placeholder="Acme Corp"
              disabled={formState === "submitting"}
              className={cn(inputClasses)}
              {...register("company")}
            />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              disabled={formState === "submitting"}
              className={cn(inputClasses)}
              {...register("phone")}
            />
          </Field>
        </div>

        <Field label="Topic" required error={errors.topic?.message}>
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

        <Field label="Message" required error={errors.message?.message}>
          <textarea
            rows={4}
            placeholder="Tell us about your project or requirements..."
            disabled={formState === "submitting"}
            className={cn(
              inputClasses,
              "resize-none",
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
        >
          {formState === "submitting" ? "Sending..." : "Send Message"}
        </Button>
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
    <div>
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
