"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AlertTriangle, Trash2, X, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Report } from "@/types";

export default function AdminReportsPage() {
  const params = useParams();
  const secret = params.secret as string;
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reports", {
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        const data = await res.json();
        setReports(data.data || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const dismissReport = async (reportId: string) => {
    try {
      await fetch(`/api/admin/reports?id=${reportId}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      setReports(reports.filter((r) => r.id !== reportId));
    } catch {
      // ignore
    }
  };

  const deletePaper = async (paperId: string) => {
    if (!window.confirm("Delete this paper permanently?")) return;
    try {
      await fetch("/api/admin/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          action: "delete",
          paperIds: [paperId],
        }),
      });
      fetchReports();
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Review and manage reported papers
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : reports.length === 0 ? (
        <Card className="border-border/50 bg-card/80">
          <CardContent className="text-center py-16">
            <AlertTriangle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No reports to review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="border-border/50 bg-card/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {report.paper && (
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {report.paper.subjectName}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {report.paper.branch}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mb-2">
                      {report.reason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reported on {formatDate(report.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => dismissReport(report.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Dismiss
                    </Button>
                    {report.paper && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => deletePaper(report.paperId)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Paper
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
