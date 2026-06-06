"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PaperCardCompact } from "@/components/papers/paper-card";
import type { QuestionPaper } from "@/types";

interface LatestUploadsProps {
  papers: QuestionPaper[];
}

export function LatestUploads({ papers }: LatestUploadsProps) {
  if (papers.length === 0) return null;

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">
                Fresh Uploads
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">Latest Papers</h2>
            </div>
            <Link href="/papers?sort=newest">
              <Button variant="outline" className="rounded-full gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {papers.slice(0, 6).map((paper, i) => (
            <PaperCardCompact key={paper.id} paper={paper} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
