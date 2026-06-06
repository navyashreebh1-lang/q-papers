"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PaperFilters } from "@/components/papers/paper-filters";
import { PaperGrid } from "@/components/papers/paper-grid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { QuestionPaper } from "@/types";

export function BrowsePapersClient({ subjects }: { subjects: string[] }) {
  const searchParams = useSearchParams();
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPapers = useCallback(
    async (pageNum: number, append: boolean = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNum.toString());
        params.set("limit", "12");

        const res = await fetch(`/api/papers?${params.toString()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (append) {
            setPapers((prev) => [...prev, ...data.data]);
          } else {
            setPapers(data.data || []);
          }
          setHasMore(data.pagination?.hasMore || false);
          setTotal(data.pagination?.total || 0);
          setPage(pageNum);
        }
      } catch (error) {
        console.error("Failed to fetch papers:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [searchParams]
  );

  useEffect(() => {
    fetchPapers(1, false);
  }, [searchParams.toString()]);

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchPapers(page + 1, true);
    }
  };

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[280px] shrink-0">
        <div className="sticky top-24">
          <PaperFilters subjects={subjects} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Filters */}
        <div className="lg:hidden mb-6">
          <PaperFilters subjects={subjects} />
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mb-4">
            {total > 0
              ? `Showing ${papers.length} of ${total} papers`
              : "No papers found"}
          </p>
        )}

        <PaperGrid papers={papers} isLoading={isLoading} />

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={isLoadingMore}
              className="rounded-full px-8"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
