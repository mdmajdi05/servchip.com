"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { AppLink as Link } from "@/components/ui/AppLink";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          level="h1"
          label="Categories"
          title="Browse by Chip Category"
          subtitle="Find the perfect chip for your workload from our extensive catalog of enterprise-grade semiconductors"
          align="center"
        />
        <CategoriesGrid />
        <section className="py-20 bg-bg-body">
          <div className="max-w-4xl mx-auto px-4">
            <SectionHeading
              label="How to Choose"
              title="Matching the Right Category to Your Workload"
              align="center"
            />
            <div className="space-y-6 text-sm text-text-muted leading-relaxed mt-10">
              <p>
                Choosing the correct semiconductor category is the most
                important step in any AI infrastructure project, because the
                accelerator, server CPU, and memory configuration you select
                directly determines training throughput, inference latency, and
                overall total cost of ownership. Our catalog is organized into
                ten focused categories spanning data center GPUs from NVIDIA,
                AMD, and Intel, hyperscaler ASICs such as Google TPU and Amazon
                Trainium, server CPUs, AI server platforms, networking
                interconnects, HBM memory, and enterprise storage.
              </p>
              <p>
                For large language model training and fine-tuning workloads,
                data center GPU accelerators with high-bandwidth HBM memory and
                NVLink-scale interconnect are typically the right starting
                point, whereas production inference deployments often favor
                lower-power inference-optimized accelerators that maximize
                requests per second while minimizing power draw per rack. HPC
                simulation and scientific computing, by contrast, benefit from
                generalized compute platforms where server CPUs paired with
                capable accelerators deliver balanced floating-point
                performance.
              </p>
              <p>
                If you are unsure which category matches your performance,
                compliance, or budget requirements, our certified engineering
                team provides free workload consultation and can recommend the
                exact architecture, model, and quantity for your use case, so
                you avoid over-provisioning hardware and overspending on compute
                you will never utilize.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 bg-bg-dark">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
              Need Help Choosing the Right Category?
            </h2>
            <p className="text-text-muted text-sm mb-8 max-w-xl mx-auto">
              Our certified engineers can help you identify the optimal chip
              category and specific models for your AI training, inference, HPC,
              or data center workload. Get personalized recommendations based on
              your performance requirements, budget, and deployment timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="bg-primary text-bg-dark px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-transform">
                  Talk to an Engineer
                </button>
              </Link>
              <Link href="/rfq">
                <button className="border border-primary/40 text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/10 transition-transform">
                  Submit RFQ for Volume Pricing
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
