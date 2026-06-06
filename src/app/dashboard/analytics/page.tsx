"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface AnalyticsData {
  totalPapers: number;
  totalDownloads: number;
  totalViews: number;
  totalSubjects: number;
  branchStats: { branch: string; count: number; downloads: number }[];
  semesterStats: { semester: number; count: number; downloads: number }[];
}

export default function DashboardAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics?detailed=true");
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch {
        // ignore
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Track usage across the platform
        </p>
      </div>

      {/* Branch Stats */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Papers by Branch</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.branchStats && data.branchStats.length > 0 ? (
            <div className="space-y-3">
              {data.branchStats.map((stat, i) => {
                const maxCount = Math.max(
                  ...data.branchStats.map((s) => s.count)
                );
                const percentage = maxCount > 0 ? (stat.count / maxCount) * 100 : 0;

                return (
                  <motion.div
                    key={stat.branch}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stat.branch}</span>
                      <span className="text-muted-foreground">
                        {stat.count} papers • {formatNumber(stat.downloads)}{" "}
                        downloads
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No data available yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Semester Stats */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Papers by Semester</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.semesterStats && data.semesterStats.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.semesterStats.map((stat, i) => (
                <motion.div
                  key={stat.semester}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl border border-border/50 bg-card/50 text-center"
                >
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sem {stat.semester}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No data available yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
