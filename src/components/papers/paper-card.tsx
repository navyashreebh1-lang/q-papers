"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Eye, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatNumber, getSemesterLabel, getBranchColor, formatDate } from "@/lib/utils";
import type { QuestionPaper } from "@/types";

interface PaperCardProps {
  paper: QuestionPaper;
  index?: number;
}

export function PaperCard({ paper, index = 0 }: PaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link href={`/papers/${paper.slug}`}>
        <div className="group relative h-full rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          {/* Top row: badges */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", getBranchColor(paper.branch))}
            >
              {paper.branch}
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {getSemesterLabel(paper.semester)}
            </Badge>
          </div>

          {/* Icon + Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {paper.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {paper.subjectName}
              </p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Uploaded on: {formatDate(paper.createdAt)}
            </span>
          </div>

          {/* Bottom stats */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {formatNumber(paper.downloads)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(paper.views)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-full px-3"
            >
              View →
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Compact variant for latest uploads and popular
export function PaperCardCompact({ paper, index = 0 }: PaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/papers/${paper.slug}`}>
        <div className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 backdrop-blur-sm">
          <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {paper.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {paper.branch} • {getSemesterLabel(paper.semester)} • {formatDate(paper.createdAt)}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs text-muted-foreground">
            <Download className="h-3 w-3" />
            {formatNumber(paper.downloads)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
