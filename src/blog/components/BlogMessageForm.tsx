"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Mail,
  User,
  CheckCircle,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const blogFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid mobile number")
    .max(15, "Please enter a valid mobile number")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid mobile number"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});
type BlogFormData = z.infer<typeof blogFormSchema>;
type FormState = "idle" | "submitting" | "success";

const inputClasses =
  "w-full bg-bg-dark border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-transform duration-200";

export function BlogMessageForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
  });

  const onSubmit = async (data: BlogFormData) => {
    setFormState("submitting");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      /* continue */
    }
    const subject = encodeURIComponent(
      `[Servchip Blog] Message from ${data.name}`,
    );
    const body = encodeURIComponent(
      [
        `Hi Servchip Team,`,
        ``,
        `I just read one of your blog articles and wanted to reach out.`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Mobile: ${data.phone}`,
        ``,
        `Message:`,
        data.message,
        ``,
        `Looking forward to your response.`,
      ].join("\n"),
    );
    const link = document.createElement("a");
    link.href = `mailto:sales@servchip.com,contact@servchip.com,support@servchip.com?subject=${subject}&body=${body}`;
    link.click();
    setFormState("success");
  };

  if (formState === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-surface p-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-base font-bold text-text mb-1">
          Your Email Client Has Opened!
        </h3>
        <p className="text-text-muted text-xs leading-relaxed mb-4">
          Message pre-filled and addressed to our team. Just hit
          <strong className="text-text"> Send </strong>
          in your email app.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              reset();
              setFormState("idle");
            }}
          >
            Send Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-4">
        <h3 className="text-base font-bold text-text mb-1 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Got Questions About This Article?
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Drop us a quick message — our team replies fast.
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
            <input
              type="text"
              placeholder="Your name"
              disabled={formState === "submitting"}
              className={cn(inputClasses, errors.name && "border-error/50")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
            <input
              type="email"
              placeholder="Your email"
              disabled={formState === "submitting"}
              className={cn(inputClasses, errors.email && "border-error/50")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-error text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
          <input
            type="tel"
            placeholder="Your mobile number"
            disabled={formState === "submitting"}
            className={cn(inputClasses, errors.phone && "border-error/50")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-error text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="relative">
          <textarea
            rows={3}
            placeholder="Your message..."
            disabled={formState === "submitting"}
            className={cn(
              "w-full bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-transform duration-200 resize-none",
              errors.message && "border-error/50",
            )}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-error text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="solid"
          size="sm"
          fullWidth
          loading={formState === "submitting"}
          icon={<Send className="w-4 h-4" />}
          iconPosition="right"
        >
          {formState === "submitting" ? "Opening Email..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
