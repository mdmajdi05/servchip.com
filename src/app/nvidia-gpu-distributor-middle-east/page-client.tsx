"use client";
import { useState } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Cpu,
  FlaskConical,
  Gauge,
  GraduationCap,
  Headphones,
  HeartPulse,
  HelpCircle,
  Layers,
  Landmark,
  Package,
  Search,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const PRODUCTS = [
  {
    name: "NVIDIA H100 GPUs",
    image: "/images/products/nvidia-h100.jpg",
    alt: "NVIDIA H100 data center GPU installed in an enterprise server rack",
    title: "NVIDIA H100 GPU for AI Training and Inference",
    caption:
      "The NVIDIA H100 remains the most widely deployed GPU for enterprise AI workloads.",
    what: "NVIDIA's Hopper-architecture data center GPU, still the most widely deployed accelerator for large-scale AI training and inference across the Gulf's existing cloud and sovereign AI infrastructure.",
    points: [
      "80GB HBM3 memory per GPU with NVLink for multi-GPU scaling",
      "Widely supported across every major AI framework and the most mature CUDA software ecosystem available",
      "Best fit for organizations standardizing on proven infrastructure rather than adopting the newest silicon first",
    ],
  },
  {
    name: "NVIDIA H200 GPUs",
    image: "/images/products/nvidia-h200.jpg",
    alt: "NVIDIA H200 GPU with 141GB HBM3e memory for large-model inference",
    title: "NVIDIA H200 GPU Memory Advantage",
    caption:
      "H200 delivers nearly 1.8x the memory capacity of the H100 for memory-bound inference.",
    what: "An upgraded Hopper-generation GPU with substantially more memory bandwidth than the H100, aimed at memory-bound inference and larger single-node models.",
    points: [
      "141GB HBM3e memory, nearly 1.8x the capacity of the H100",
      "Meaningful inference throughput gains on large language models without a full architecture change",
      "A strong fit for buyers who want more headroom per GPU without moving to Blackwell-generation pricing",
    ],
  },
  {
    name: "NVIDIA B200 GPUs",
    image: "/images/ai-chip-1.jpg",
    alt: "NVIDIA B200 Blackwell architecture GPU server for frontier AI training",
    title: "NVIDIA B200 Blackwell GPU Server",
    caption:
      "B200 powers the frontier-scale training clusters behind the region's largest AI programs.",
    what: "NVIDIA's Blackwell-architecture data center GPU, built for frontier-scale training and the next generation of inference workloads.",
    points: [
      "Up to 192GB HBM3e memory with substantially higher interconnect bandwidth via next-generation NVLink",
      "Purpose-built for the largest LLM training runs and dense multi-node clusters",
      "Increasingly the platform of choice for the sovereign AI programs driving Gulf GPU demand, including HUMAIN and Stargate UAE-scale deployments",
    ],
  },
  {
    name: "NVIDIA Blackwell GPUs",
    image: "/images/ai-chip-2.jpg",
    alt: "NVIDIA GB200 NVL72 rack-scale AI system with liquid cooling",
    title: "NVIDIA GB200 NVL72 Rack-Scale AI System",
    caption:
      "GB200 NVL72 systems anchor gigawatt-scale AI factories like Stargate UAE.",
    what: "Blackwell is the architecture family behind the B200 and the rack-scale GB200/GB300 systems now anchoring the region's largest AI infrastructure projects.",
    points: [
      "GB200 and GB300 NVL72 rack-scale systems combine multiple Blackwell GPUs with NVIDIA Grace CPUs over a unified NVLink domain",
      "Designed for gigawatt-scale AI factories, the deployment model behind Stargate UAE and HUMAIN's GB300 order",
      "Requires liquid cooling and high-density power planning; see our data center infrastructure guidance before specifying a Blackwell deployment",
    ],
  },
  {
    name: "NVIDIA RTX Professional GPUs",
    image: "/images/ai-chip-3.jpg",
    alt: "NVIDIA RTX PRO professional GPU for visualization and simulation workloads",
    title: "NVIDIA RTX PRO Professional GPU",
    caption:
      "RTX PRO GPUs support engineering simulation and AI development workloads.",
    what: "Workstation and server-class RTX PRO GPUs built on the Blackwell architecture, aimed at visualization, simulation, and smaller-scale AI development rather than large training clusters.",
    points: [
      "Strong fit for engineering simulation, media and entertainment rendering, and CAD-heavy industries like oil and gas",
      "Lower power and cooling requirements than data center GPUs, suited to office and edge deployments",
      "Common entry point for teams prototyping AI applications before scaling to data center GPU clusters",
    ],
  },
  {
    name: "NVIDIA DGX Systems",
    image: "/images/server-room-3.jpg",
    alt: "NVIDIA DGX AI supercomputing system in a data center environment",
    title: "NVIDIA DGX AI Supercomputing System",
    caption:
      "DGX systems offer a fully validated, turnkey AI infrastructure platform.",
    what: "NVIDIA's fully integrated AI supercomputing systems, combining GPUs, networking, and software into a single validated platform.",
    points: [
      "Turnkey deployment with NVIDIA's own reference architecture, reducing integration risk for teams without deep systems engineering resources",
      "Available in configurations spanning from single-node development systems to full DGX SuperPOD clusters",
      "Preferred by government and research institutions that want NVIDIA's own validated stack rather than a third-party HGX-based build",
    ],
  },
];

const COMPARISON = [
  {
    gpu: "NVIDIA H100",
    memory: "80GB HBM3",
    bestFor: "Proven, widely supported AI training and inference at scale",
  },
  {
    gpu: "NVIDIA H200",
    memory: "141GB HBM3e",
    bestFor: "Memory-bound inference and larger single-node models",
  },
  {
    gpu: "NVIDIA B200 (Blackwell)",
    memory: "Up to 192GB HBM3e",
    bestFor: "Frontier-scale training and next-generation inference",
  },
  {
    gpu: "NVIDIA GB200/GB300 NVL72",
    memory: "Rack-scale, multi-GPU NVLink domain",
    bestFor: "Gigawatt-scale AI factories and sovereign AI infrastructure",
  },
  {
    gpu: "NVIDIA RTX PRO",
    memory: "Workstation-class, model dependent",
    bestFor: "Visualization, simulation, and AI development/prototyping",
  },
  {
    gpu: "NVIDIA DGX Systems",
    memory: "Multi-GPU validated platform",
    bestFor: "Turnkey AI supercomputing without custom integration",
  },
];

const INDUSTRIES = [
  {
    icon: Cpu,
    name: "Artificial Intelligence",
    description:
      "AI-native companies and national AI champions, including sovereign programs modeled on HUMAIN and Stargate UAE, need GPU clusters sized correctly for training versus inference from day one. We help teams specify H100, H200, or B200 configurations against actual model size and throughput requirements rather than defaulting to whatever is easiest to source.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description:
      "Medical imaging AI, genomics pipelines, and clinical decision-support tools increasingly run on GPU-accelerated infrastructure. Regional healthcare providers and research hospitals use NVIDIA GPUs for both training diagnostic models and running inference at the point of care.",
  },
  {
    icon: Landmark,
    name: "Banking & Finance",
    description:
      "Fraud detection, algorithmic trading, and regulatory reporting workloads across the Gulf's banking sector depend on low-latency GPU inference. Data residency requirements common to regional financial regulators also make on-premise or in-country GPU deployment a frequent requirement rather than an option.",
  },
  {
    icon: Building2,
    name: "Government",
    description:
      "National AI strategies across every GCC state now include dedicated compute procurement, from Saudi Arabia's Vision 2030-aligned programs to Qatar's National AI Strategy and National Digital Agenda 2030. Government buyers typically require formal procurement documentation, compliance verification, and long-term support agreements alongside the hardware itself.",
  },
  {
    icon: GraduationCap,
    name: "Research Institutions",
    description:
      "Universities and national research centers use GPU clusters for scientific computing, climate modeling, and foundational AI research. These buyers often need DGX-class systems for their validated, lower-integration-risk deployment model, especially where in-house systems engineering resources are limited.",
  },
  {
    icon: FlaskConical,
    name: "Oil & Gas",
    description:
      "Seismic imaging, reservoir simulation, and digital twin modeling remain some of the most GPU-intensive workloads in the region, particularly across Saudi Arabia and the UAE's national energy companies. RTX PRO GPUs support visualization-heavy simulation work, while data center GPUs handle the underlying compute-intensive modeling.",
  },
  {
    icon: Layers,
    name: "Telecommunications",
    description:
      "Regional telecom operators are increasingly running their own GPU infrastructure rather than reselling third-party AI cloud capacity. Ooredoo's Nvidia Hopper-powered sovereign AI cloud in Qatar and comparable moves by other Gulf telecom groups reflect a broader shift toward operator-owned AI compute.",
  },
  {
    icon: Wrench,
    name: "Manufacturing",
    description:
      "Predictive maintenance, quality inspection automation, and digital twin simulation are driving GPU adoption across the region's manufacturing base, particularly in Saudi Arabia and the UAE as both countries diversify their industrial base under national economic strategies.",
  },
];

const WHY_CHOOSE_US = [
  {
    title: "Genuine products",
    description:
      "Every GPU we supply is sourced through verified channels with full documentation, not gray-market or refurbished stock represented as new",
  },
  {
    title: "Fast delivery",
    description:
      "Established logistics routes into all six GCC markets, with realistic lead-time guidance rather than optimistic quotes",
  },
  {
    title: "Global sourcing network",
    description:
      "Operational presence across India and the UAE with reach into 150+ countries, giving us sourcing flexibility competitors limited to a single region do not have",
  },
  {
    title: "Technical consultation",
    description:
      "Our team helps buyers choose between H100, H200, B200, and DGX configurations based on actual workload requirements, not just what carries the highest margin",
  },
  {
    title: "Competitive pricing",
    description:
      "Transparent, quote-based pricing without the markup layers common in multi-tier reseller chains",
  },
  {
    title: "After-sales support",
    description:
      "Warranty coordination and technical support that does not require shipping hardware back to the country of origin for basic issues",
  },
  {
    title: "Enterprise deployment assistance",
    description:
      "Guidance on configuration, cooling, and power planning before hardware arrives on-site",
  },
  {
    title: "Warranty support",
    description:
      "Clear terms on manufacturer warranty pass-through, communicated before purchase rather than discovered after a failure",
  },
];

const WORKLOAD_SOLUTIONS = [
  {
    title: "AI training clusters",
    description:
      "Multi-GPU B200 or H100 configurations with NVLink interconnect for distributed training across nodes",
  },
  {
    title: "LLM training",
    description:
      "Memory capacity and interconnect bandwidth typically matter more than raw compute for large language model training; see our VRAM and GPU memory sizing guide before specifying a cluster",
    href: "/blog/vram-gpu-memory-requirements-llm",
  },
  {
    title: "AI inference",
    description:
      "H200's larger memory pool often delivers better cost-per-inference than H100 for large-model serving at scale",
  },
  {
    title: "Machine learning",
    description:
      "Standard H100 configurations remain the most cost-effective choice for conventional ML workloads that do not require frontier-scale memory",
  },
  {
    title: "Data analytics",
    description:
      "GPU-accelerated analytics pipelines benefit from the same data center GPUs used for AI, often on shared infrastructure",
  },
  {
    title: "HPC workloads",
    description:
      "Scientific computing and simulation workloads frequently pair NVIDIA GPUs with high-throughput storage and InfiniBand networking",
  },
  {
    title: "Scientific computing",
    description:
      "Research institutions running climate, genomics, or physics simulations typically favor DGX-class systems for validated, lower-risk deployment",
  },
];

const PROCUREMENT_STEPS = [
  {
    icon: Headphones,
    title: "Consultation",
    description:
      "We start by understanding the workload, not the SKU, to recommend the right GPU generation and configuration",
  },
  {
    icon: Search,
    title: "Product selection",
    description:
      "Matching H100, H200, B200, RTX PRO, or DGX systems against actual training or inference requirements and budget",
  },
  {
    icon: Gauge,
    title: "Capacity planning",
    description:
      "Sizing cluster scale, interconnect topology, and power/cooling requirements before committing to an order",
  },
  {
    icon: Wrench,
    title: "Deployment assistance",
    description:
      "Configuration guidance and technical support through installation, not just at the point of sale",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Managing export documentation, customs clearance, and shipping across UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain",
  },
  {
    icon: Package,
    title: "Installation support",
    description:
      "Coordination with your data center or colocation provider to confirm power, cooling, and rack readiness before hardware arrives",
  },
];

const COUNTRIES = [
  {
    name: "UAE",
    flag: "🇦🇪",
    description:
      "The UAE was reclassified in July 2026 to US Export Administration Regulations Country Group A:5, removing the licensing requirement that previously slowed advanced computing imports. Combined with the Stargate UAE cluster's buildout and Microsoft's USD 15.2 billion investment program with G42 (including USD 7.9 billion in new data center capacity through 2029), the UAE remains the region's most active market for enterprise NVIDIA GPU procurement, with live data center capacity that surpassed 376 megawatts in 2025.",
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    description:
      "Saudi Arabia's chip access runs on a different model than the UAE's country-wide reclassification. Access is deal-based and entity-specific, centered on HUMAIN, the PIF-backed AI champion that placed an 18,000-GPU NVIDIA GB300 order in 2026. AWS and HUMAIN are separately investing over USD 5 billion in a dedicated AI Zone in the Kingdom, and Vision 2030's national AI strategy continues to drive both government and enterprise GPU demand.",
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    description:
      "Qatar's National AI Strategy and National Digital Agenda 2030 have pushed AI infrastructure spending well beyond early estimates, including a USD 20 billion AI infrastructure joint venture between the Qatar Investment Authority's Qai and Brookfield. Ooredoo's data center arm, Syntys, already operates a sovereign AI cloud built on NVIDIA Hopper GPUs, with capacity expanding past 120 megawatts, giving Qatar a genuine head start on GPU-backed AI services relative to some of its GCC neighbors.",
  },
  {
    name: "Kuwait",
    flag: "🇰🇼",
    description:
      "Kuwait's AI data center market, valued at roughly USD 180 million, is being driven by expansions from Gulf Data Hub and Khazna alongside the arrival of hyperscale providers including Google Cloud and Microsoft Azure. A separately announced 1-gigawatt data center project signals Kuwait's ambitions to scale its AI compute capacity considerably beyond current levels over the coming years.",
  },
  {
    name: "Oman",
    flag: "🇴🇲",
    description:
      "Oman has deliberately chosen a different path from its neighbors, prioritizing a role in the semiconductor supply chain rather than racing to build gigawatt-scale compute capacity. Muscat, the country's main data center hub, is seeing steady growth through partnerships like the Equinix-Omantel SN1 facility in Salalah, supported by Oman's 95% internet penetration rate and growing digital transformation initiatives.",
  },
  {
    name: "Bahrain",
    flag: "🇧🇭",
    description:
      "Bahrain hosts the region's most established hyperscale cloud presence, with AWS operating a three-availability-zone cloud region in Manama since 2019, the first of its kind in the Middle East. Beyon's sovereign cloud partnership with Oracle and Batelco's edge facility with Qareeb Data Centers continue to build out Bahrain's AI-ready infrastructure, with the local data center market on track to grow from roughly USD 226 million toward USD 393 million by 2031.",
  },
];

const FAQS = [
  {
    question: "What is an NVIDIA GPU distributor?",
    answer:
      "An NVIDIA GPU distributor sources genuine NVIDIA data center and professional GPUs and supplies them to enterprise, government, and research buyers, typically handling procurement logistics, export documentation, and after-sales support that buying directly from NVIDIA at smaller order volumes does not include.",
  },
  {
    question: "Where can I buy NVIDIA H100 in the Middle East?",
    answer:
      "Servchip supplies genuine NVIDIA H100 GPUs to buyers across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain, with full export documentation and regional delivery coordination handled as part of the order.",
  },
  {
    question: "How much does an NVIDIA H100 cost?",
    answer:
      "H100 pricing varies by configuration, order volume, and current allocation constraints, since global demand continues to affect availability and price. Contact our team for a current quote based on your specific configuration and volume.",
  },
  {
    question: "Who supplies NVIDIA AI GPUs in the UAE?",
    answer:
      "Servchip supplies NVIDIA AI GPUs, including H100, H200, and B200, to enterprise and government buyers in the UAE, with operational logistics benefiting from the UAE's July 2026 reclassification to Export Administration Regulations Country Group A:5.",
  },
  {
    question: "Which NVIDIA GPU is best for AI training?",
    answer:
      "For large-scale training, NVIDIA B200 (Blackwell architecture) offers the highest memory capacity and interconnect bandwidth. For proven, widely supported training infrastructure, H100 remains a strong and more cost-predictable choice.",
  },
  {
    question: "What is NVIDIA Blackwell architecture?",
    answer:
      "Blackwell is NVIDIA's current-generation GPU architecture, powering the B200 GPU and the rack-scale GB200/GB300 NVL72 systems used in the largest AI training deployments, including the infrastructure behind Stargate UAE and HUMAIN's GPU order in Saudi Arabia.",
  },
  {
    question: "How long does GPU server delivery take?",
    answer:
      "Standard configurations typically take 8 to 16 weeks from confirmed order to on-site delivery. Flagship GPUs facing global allocation constraints, including current-generation Blackwell systems, can take longer during periods of high demand.",
  },
  {
    question: "Do you provide GPU server integration?",
    answer:
      "Yes. We provide configuration guidance and deployment assistance alongside hardware supply, including capacity planning and coordination with your data center or colocation provider before installation.",
  },
  {
    question: "Can I buy NVIDIA DGX systems through Servchip?",
    answer:
      "Yes. We supply NVIDIA DGX systems, from single-node development platforms through larger cluster configurations, for buyers who prefer NVIDIA's own validated reference architecture over a custom-built GPU server.",
  },
  {
    question: "What is the difference between NVIDIA H100 and H200?",
    answer:
      "The H200 carries 141GB of HBM3e memory versus the H100's 80GB of HBM3, a nearly 1.8x increase that primarily benefits memory-bound inference workloads and larger single-node models. Both share the same Hopper architecture and CUDA software compatibility.",
  },
  {
    question: "What is the difference between NVIDIA B200 and DGX systems?",
    answer:
      "B200 is the GPU itself; DGX is NVIDIA's fully integrated system combining GPUs, networking, and software into one validated platform. A DGX system can be built around B200 GPUs, but B200s are also available in third-party HGX-based server configurations.",
  },
  {
    question: "Do you supply NVIDIA GPUs to government entities?",
    answer:
      "Yes. We work with government and PIF or sovereign-fund-backed entities across the GCC, including buyers who require formal procurement documentation, compliance verification, and long-term support agreements.",
  },
  {
    question:
      "What export documentation is required to import NVIDIA GPUs into the Gulf?",
    answer:
      "Requirements vary by country and by the specific GPU classification. UAE buyers benefit from the July 2026 Country Group A:5 reclassification, while Saudi Arabia's access remains deal-based and entity-specific. We help buyers confirm current requirements before placing an order, since export policy in this space continues to evolve.",
  },
  {
    question: "Can I buy NVIDIA RTX PRO GPUs for workstations?",
    answer:
      "Yes. We supply RTX PRO professional GPUs for visualization, simulation, and AI development workloads that do not require full data center GPU deployment.",
  },
  {
    question: "Do you support multi-country GCC deployments?",
    answer:
      "Yes. We supply and coordinate delivery across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain, which is useful for organizations deploying infrastructure across more than one Gulf market.",
  },
  {
    question:
      "What warranty comes with NVIDIA GPUs purchased through Servchip?",
    answer:
      "Warranty terms follow NVIDIA's and the original equipment manufacturer's standard coverage, and we coordinate warranty pass-through support locally rather than requiring hardware to be shipped back to the country of origin for basic service.",
  },
  {
    question: "Is Servchip an authorized NVIDIA reseller?",
    answer:
      "Servchip sources genuine NVIDIA hardware through verified distribution channels. Contact our team directly for current partner and authorization status specific to your region and order volume.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="NVIDIA GPU Distribution"
        title="NVIDIA GPU Distributor Middle East"
        subtitle="Servchip is a trusted NVIDIA GPU distributor in the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain, supplying genuine H100, H200, B200, and Blackwell GPUs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NVIDIA GPU Distributor Middle East" },
        ]}
      />

      {/* Introduction */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                label="The Market"
                title="Why the Middle East Needs a Reliable NVIDIA GPU Route"
                align="left"
              />
              <div className="space-y-4 text-sm md:text-base text-text-muted leading-relaxed">
                <p>
                  AI adoption across the Gulf has moved from pilot projects to
                  national infrastructure. Saudi Arabia&apos;s HUMAIN has placed
                  an 18,000-GPU NVIDIA GB300 order under Public Investment Fund
                  control, the UAE&apos;s Stargate UAE cluster is scaling toward
                  its first gigawatt of AI capacity, and Qatar, Kuwait, Oman,
                  and Bahrain are each building out sovereign cloud and data
                  center capacity of their own. Every one of these programs runs
                  on the same underlying constraint: getting genuine, correctly
                  licensed NVIDIA GPUs into the region on a timeline that
                  matches the build schedule.
                </p>
                <p>
                  That is where an established NVIDIA GPU distributor Middle
                  East buyers can actually rely on matters. Enterprises,
                  government entities, universities, and AI-native companies
                  across the region need more than a quote and a shipping date.
                  They need a supplier who understands export documentation,
                  regional customs processes, warranty pass-through, and the
                  technical differences between an H100, an H200, and a
                  Blackwell-generation B200 well enough to recommend the right
                  configuration, not just sell whatever is in stock.
                </p>
                <p>
                  Servchip is an ISO 9001 certified enterprise chip distributor
                  with operations spanning India and the UAE, supplying GPU and
                  AI accelerator hardware from NVIDIA, AMD, Intel, and Google
                  TPU to buyers across 150+ countries. This page covers what we
                  supply, who we serve, and how NVIDIA GPU procurement actually
                  works across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and
                  Bahrain.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="relative w-full h-72 md:h-96">
                  <Image
                    src="/images/server-room-1.jpg"
                    alt="NVIDIA GPU distributor serving enterprise buyers across the Middle East"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text mb-1.5">
                        Quick Answer
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        Servchip supplies genuine NVIDIA data center and
                        professional GPUs, including H100, H200, B200,
                        Blackwell-based systems, RTX PRO workstation GPUs, and
                        DGX systems, to enterprise, government, and research
                        buyers across the UAE, Saudi Arabia, Qatar, Kuwait,
                        Oman, and Bahrain. We handle product selection, export
                        documentation, logistics, and after-sales support as an
                        ISO 9001 certified distributor with an India-UAE
                        operational base.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leading Distributor Banner */}
      <section className="relative py-20 md:py-24 bg-surface overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/server-room-4.jpg"
            alt="GCC-wide NVIDIA GPU distribution coverage across the Middle East"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              label="Market Overview"
              title="Leading NVIDIA GPU Distributor Across the Middle East"
            />
            <p className="text-sm md:text-base text-text-muted leading-relaxed text-center">
              GCC governments and enterprises are on track to invest more than
              USD 30 billion in AI-focused data center capacity between now and
              2030, an average of over USD 6 billion a year, according to
              regional infrastructure analysts. That spending is not
              concentrated in one country. The UAE and Saudi Arabia lead on
              scale, but Qatar, Kuwait, Oman, and Bahrain are each building
              sovereign or hyperscaler-backed AI capacity of their own, and
              every one of those programs needs a reliable route to genuine
              NVIDIA hardware. Servchip supplies across all six markets, with
              country-specific detail further down this page covering the
              export, customs, and market context relevant to each.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-circuit opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Product Range"
            title="NVIDIA GPU Products We Supply"
            subtitle="We supply the full range of current-generation NVIDIA data center and professional GPUs, sourced through verified channels and shipped with full documentation for regional import and deployment."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.name}
                className="group relative rounded-2xl border border-border bg-surface p-6 card-hover overflow-hidden flex flex-col"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-transform pointer-events-none" />
                <div className="relative w-full h-44 rounded-xl border border-border overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    title={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  <span className="text-text font-medium">What it is: </span>
                  {product.what}
                </p>
                <ul className="space-y-2 mb-4">
                  {product.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-text-muted leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] italic text-text-dim border-t border-border pt-3 mt-auto">
                  {product.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-12 rounded-2xl border border-border bg-surface overflow-hidden overflow-x-auto">
            <div className="p-6 md:p-8 border-b border-border">
              <h3 className="text-lg font-bold text-text mb-1">
                NVIDIA GPU Comparison at a Glance
              </h3>
              <p className="text-sm text-text-muted">
                A side-by-side comparison of memory, architecture, and best-fit
                use cases across current NVIDIA data center GPUs.
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/[0.06] text-left text-xs uppercase tracking-wider text-text-muted">
                  <th className="px-6 py-4 font-semibold">GPU / Platform</th>
                  <th className="px-6 py-4 font-semibold">Memory</th>
                  <th className="px-6 py-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr
                    key={row.gpu}
                    className="border-t border-border hover:bg-primary/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-text">
                      {row.gpu}
                    </td>
                    <td className="px-6 py-4 text-text-muted font-mono text-xs">
                      {row.memory}
                    </td>
                    <td className="px-6 py-4 text-text-muted">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Who We Serve"
            title="Industries We Serve"
            subtitle="From national AI champions to regional banks, energy companies, and research institutions — the buyers driving GPU demand across the Middle East."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.name}
                className="group rounded-2xl border border-border bg-bg-dark p-6 card-hover flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <industry.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text mb-2.5">
                  {industry.name}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Trust &amp; Reliability"
            title="Why Choose Us as Your NVIDIA GPU Supplier"
            subtitle="What separates an established distributor from a middleman — and why enterprises across the GCC buy through Servchip."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-3 card-hover"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-text">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for AI & HPC */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Workload Guidance"
            title="NVIDIA GPU Solutions for AI and HPC Infrastructure"
            subtitle="The right NVIDIA GPU depends on where a workload sits on the training-to-inference spectrum, and getting that match wrong is the most common expensive mistake we see in GPU procurement."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {WORKLOAD_SOLUTIONS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-bg-dark p-6 card-hover flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="text-base font-bold text-text">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  {item.description}
                </p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-4 hover:underline"
                  >
                    Read the guide <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-text-muted text-center mt-10 max-w-3xl mx-auto">
            For deeper technical guidance, see our{" "}
            <Link href="/comparison" className="text-primary hover:underline">
              comparisons of NVIDIA architecture generations
            </Link>
            , our{" "}
            <Link
              href="/blog/gpu-tco-cloud-vs-on-premise"
              className="text-primary hover:underline"
            >
              GPU total cost of ownership analysis
            </Link>
            , and our{" "}
            <Link
              href="/blog/air-vs-liquid-server-cooling"
              className="text-primary hover:underline"
            >
              data center cooling guidance
            </Link>
            , all linked from our{" "}
            <Link href="/resources" className="text-primary hover:underline">
              resource center
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Procurement Services */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="How We Work"
            title="End-to-End NVIDIA GPU Procurement Services"
            subtitle="From the first consultation to hardware arriving at your data center, we manage the full procurement lifecycle."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {PROCUREMENT_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-border bg-surface p-6 md:p-7 card-hover flex flex-col"
              >
                <div className="absolute top-5 right-5 text-xs font-mono font-bold text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Regional Coverage"
            title="Countries We Serve in the Middle East"
            subtitle="Each Gulf market has a different export, customs, and regulatory context. Here is what that means for NVIDIA GPU procurement in each of the six markets we supply."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {COUNTRIES.map((country) => (
              <div
                key={country.name}
                className="rounded-2xl border border-border bg-bg-dark p-6 card-hover flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl" aria-hidden>
                    {country.flag}
                  </span>
                  <h3 className="text-lg font-bold text-text">
                    {country.name}
                  </h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {country.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-4xl">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Direct answers on NVIDIA GPU sourcing, pricing, delivery, and support across the Middle East."
          />
          <div className="space-y-3">
            {FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className={`rounded-xl border overflow-hidden transition-transform duration-200 ${
                    isOpen
                      ? "border-primary/40 bg-surface shadow-lg shadow-primary/5"
                      : "border-border bg-surface hover:border-primary/20 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-text flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform ${
                          isOpen ? "bg-primary/20" : "bg-primary/10"
                        }`}
                      >
                        <HelpCircle
                          className={`w-3.5 h-3.5 transition-transform ${
                            isOpen ? "text-primary" : "text-primary/80"
                          }`}
                        />
                      </span>
                      {item.question}
                    </span>
                    <div
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                        isOpen ? "bg-primary/20" : "bg-border/50"
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? "text-primary rotate-180" : "text-text-dim"
                        }`}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="pl-10 pr-4">
                        <div className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-3" />
                        <p className="text-sm text-text-muted leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/server-room-5.jpg"
            alt="Enterprise NVIDIA GPU deployment planning for Middle East data centers"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover opacity-15"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
                    Ready to Get Started?
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-text mb-2 leading-tight">
                  Ready to Plan Your NVIDIA GPU Deployment?
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Whether you are scoping an AI training cluster, an inference
                  deployment, or a government procurement process, our team can
                  help you choose the right configuration and manage delivery
                  across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and
                  Bahrain. Contact us for a consultation and quote.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/contact">
                  <Button
                    variant="solid"
                    size="lg"
                    className="font-semibold shadow-lg shadow-primary/20"
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border text-text-muted hover:text-text"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
