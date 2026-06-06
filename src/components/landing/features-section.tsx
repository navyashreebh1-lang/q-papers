"use client";

import { motion } from "framer-motion";
import { Search, Download, Eye, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "AI-powered search that understands natural language. Just type '4th sem ADA paper' and find what you need instantly.",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: Download,
    title: "Fast Downloads",
    description:
      "Download question papers instantly with a single click. All PDFs are stored on high-speed CDN for lightning-fast access.",
    gradient: "from-emerald-500 to-green-500",
    bgGlow: "bg-emerald-500/10",
  },
  {
    icon: Eye,
    title: "PDF Preview",
    description:
      "Preview question papers right in your browser before downloading. Zoom, navigate pages, and go fullscreen.",
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Categorization",
    description:
      "Upload a paper and our AI automatically detects the subject, branch, semester, and generates tags for easy discovery.",
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete platform designed to make finding and sharing VTU question
            papers effortless.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
                {/* Glow on hover */}
                <div
                  className={`absolute -inset-px rounded-2xl ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} mb-5`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
