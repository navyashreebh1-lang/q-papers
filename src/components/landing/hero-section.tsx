"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-15, 15, -15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            AI-Powered Question Paper Repository
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">VTU</span>{" "}
          <span className="gradient-text">Question Bank</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Access and Share VTU Previous Year Question Papers Easily.
          <span className="text-foreground/80 block mt-1">
            One place for every VTU question paper.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/papers">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium gap-2 glow-hover transition-all duration-300 hover:scale-105"
            >
              Browse Papers
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/upload">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-medium gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              <Upload className="h-4 w-4" />
              Upload Paper
            </Button>
          </Link>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
