"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PaperCard } from "@/components/papers/paper-card";
import type { QuestionPaper } from "@/types";

interface PopularPapersProps {
  papers: QuestionPaper[];
}

export function PopularPapers({ papers }: PopularPapersProps) {
  if (papers.length === 0) return null;

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-primary tracking-wider uppercase">
                  Most Downloaded
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Popular Papers
              </h2>
            </div>
            <Link href="/papers?sort=most_downloaded">
              <Button variant="outline" className="rounded-full gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {papers.slice(0, 6).map((paper, i) => (
            <PaperCard key={paper.id} paper={paper} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
