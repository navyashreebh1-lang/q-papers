import Link from "next/link";
import { FileText, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BRANCHES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">
                VTU <span className="text-primary">Q-Bank</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              One place for every VTU question paper. Access, share, and download
              previous year papers easily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/papers", label: "Browse Papers" },
                { href: "/upload", label: "Upload Paper" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/dashboard/analytics", label: "Analytics" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Branches</h4>
            <ul className="space-y-2.5">
              {BRANCHES.slice(0, 6).map((branch) => (
                <li key={branch.value}>
                  <Link
                    href={`/papers?branch=${branch.value}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {branch.fullName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/papers?sort=most_downloaded", label: "Popular Papers" },
                { href: "/papers?sort=newest", label: "Latest Uploads" },
                { href: "/papers?examType=SEE", label: "SEE Papers" },
                { href: "/papers?examType=CIE", label: "CIE Papers" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 opacity-50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VTU Question Bank. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for
            VTU Students
          </p>
        </div>
      </div>
    </footer>
  );
}
