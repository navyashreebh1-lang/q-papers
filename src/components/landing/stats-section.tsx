"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FileText, Download, BookOpen } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { formatNumber } from "@/lib/utils";

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  delay: number;
  gradient: string;
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{formatNumber(count)}</span>;
}

function StatCard({ icon: Icon, value, label, delay, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur transition-opacity duration-300"
        style={{ backgroundImage: gradient }}
      />
      <div className="relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center"
          style={{ background: gradient.replace("to-r", "to-br").replace(")", ", 0.15)").replace("rgb", "rgba") }}
        >
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight">
            <AnimatedCounter value={value} />
            <span className="text-primary">+</span>
          </p>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface StatsProps {
  totalPapers: number;
  totalDownloads: number;
  totalSubjects: number;
}

export function StatsSection({ totalPapers, totalDownloads, totalSubjects }: StatsProps) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">
            Growing Every Day
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by VTU Students
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={FileText}
            value={totalPapers}
            label="Question Papers"
            delay={0.1}
            gradient="linear-gradient(to-r, rgb(99, 102, 241), rgb(168, 85, 247))"
          />
          <StatCard
            icon={Download}
            value={totalDownloads}
            label="Total Downloads"
            delay={0.2}
            gradient="linear-gradient(to-r, rgb(59, 130, 246), rgb(37, 99, 235))"
          />
          <StatCard
            icon={BookOpen}
            value={totalSubjects}
            label="Subjects Covered"
            delay={0.3}
            gradient="linear-gradient(to-r, rgb(16, 185, 129), rgb(5, 150, 105))"
          />
        </div>
      </div>
    </section>
  );
}
