"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Download,
  Eye,
  Upload,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AdminStats {
  totalPapers: number;
  totalDownloads: number;
  totalViews: number;
  pendingCount: number;
  reportCount: number;
}

export default function AdminDashboard() {
  const params = useParams();
  const secret = params.secret as string;
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/analytics?detailed=true", {
          headers: { "x-admin-secret": secret },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data.data);
        }
      } catch {
        // ignore
      }
    }
    fetchStats();
  }, [secret]);

  const statCards = [
    {
      title: "Total Papers",
      value: stats?.totalPapers || 0,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Pending Review",
      value: stats?.pendingCount || 0,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Reports",
      value: stats?.reportCount || 0,
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Downloads",
      value: stats?.totalDownloads || 0,
      icon: Download,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage papers, reports, and analytics
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Admin
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border/50 bg-card/80">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">
                      {formatNumber(stat.value)}
                    </p>
                  </div>
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href={`/admin/${secret}/papers`}>
          <Card className="border-border/50 bg-card/80 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="font-semibold">Manage Papers</p>
              <p className="text-xs text-muted-foreground mt-1">
                Approve, reject, or edit papers
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/admin/${secret}/reports`}>
          <Card className="border-border/50 bg-card/80 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
              <p className="font-semibold">View Reports</p>
              <p className="text-xs text-muted-foreground mt-1">
                Review reported papers
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/admin/${secret}/analytics`}>
          <Card className="border-border/50 bg-card/80 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Eye className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <p className="font-semibold">Analytics</p>
              <p className="text-xs text-muted-foreground mt-1">
                View detailed statistics
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
