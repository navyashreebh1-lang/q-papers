import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VTU Question Bank - One Place for Every VTU Question Paper",
    template: "%s | VTU Question Bank",
  },
  description:
    "Access and share VTU previous year question papers easily. Browse, search, preview, and download question papers from all branches and semesters. AI-powered smart search.",
  keywords: [
    "VTU",
    "question papers",
    "previous year papers",
    "VTU exam",
    "question bank",
    "CSE",
    "ISE",
    "AIML",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
    "semester exam",
    "SEE",
    "CIE",
  ],
  authors: [{ name: "VTU Question Bank" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://vtu-question-bank.vercel.app",
    siteName: "VTU Question Bank",
    title: "VTU Question Bank - One Place for Every VTU Question Paper",
    description:
      "Access and share VTU previous year question papers easily. Browse, search, preview, and download question papers from all branches and semesters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VTU Question Bank",
    description:
      "Access and share VTU previous year question papers easily.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
