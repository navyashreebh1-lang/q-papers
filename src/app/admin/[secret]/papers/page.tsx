"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  Loader2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getSemesterLabel, cn } from "@/lib/utils";
import type { QuestionPaper } from "@/types";

export default function AdminPapersPage() {
  const params = useParams();
  const secret = params.secret as string;
  const [papers, setPapers] = useState<(QuestionPaper & { _count?: { reports: number } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      params.set("limit", "50");

      const res = await fetch(`/api/admin/papers?${params.toString()}`, {
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        const data = await res.json();
        setPapers(data.data || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [statusFilter]);

  const handleBulkAction = async (action: "approve" | "reject" | "delete") => {
    if (selectedIds.size === 0) return;

    const confirmed =
      action === "delete"
        ? window.confirm(
            `Are you sure you want to delete ${selectedIds.size} paper(s)? This cannot be undone.`
          )
        : true;

    if (!confirmed) return;

    setActionLoading(true);
    try {
      await fetch("/api/admin/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          action,
          paperIds: Array.from(selectedIds),
        }),
      });

      setSelectedIds(new Set());
      fetchPapers();
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === papers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(papers.map((p) => p.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Manage Papers</h1>
        <p className="text-sm text-muted-foreground">
          Approve, reject, or delete uploaded papers
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || "all")}>
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedIds.size} selected
            </span>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 text-green-500 hover:text-green-500 hover:bg-green-500/10"
              onClick={() => handleBulkAction("approve")}
              disabled={actionLoading}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 text-amber-500 hover:text-amber-500 hover:bg-amber-500/10"
              onClick={() => handleBulkAction("reject")}
              disabled={actionLoading}
            >
              <XCircle className="h-3.5 w-3.5" />
              Reject
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 text-red-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={() => handleBulkAction("delete")}
              disabled={actionLoading}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <Card className="border-border/50 bg-card/80">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : papers.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No papers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={selectedIds.size === papers.length && papers.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Paper Name</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Sem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((paper) => (
                  <TableRow key={paper.id} className="hover:bg-accent/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(paper.id)}
                        onCheckedChange={() => toggleSelect(paper.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm truncate max-w-[200px]">
                          {paper.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {paper.subjectName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {paper.branch}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {getSemesterLabel(paper.semester)}
                    </TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell>
                      {(paper._count?.reports || 0) > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {paper._count?.reports}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(paper.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
