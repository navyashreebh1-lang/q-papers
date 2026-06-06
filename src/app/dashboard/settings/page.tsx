"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Customize your experience
        </p>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">
                Toggle between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium">VTU Question Bank</span>
          </div>
          <Separator />
          <p className="text-muted-foreground pt-2">
            VTU Question Bank is a free, community-driven platform for sharing
            VTU question papers. Built with Next.js, TypeScript, and PostgreSQL.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
