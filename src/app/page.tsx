import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { LatestUploads } from "@/components/landing/latest-uploads";
import { PopularPapers } from "@/components/landing/popular-papers";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

// Fetch data for the landing page
async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/analytics`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch {
    // Return defaults if API fails
  }
  return { totalPapers: 150, totalDownloads: 5200, totalSubjects: 85 };
}

async function getLatestPapers() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/papers?sort=newest&limit=6`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
  } catch {
    // Return empty array if API fails
  }
  return [];
}

async function getPopularPapers() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/papers?sort=most_downloaded&limit=6`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
  } catch {
    // Return empty array if API fails
  }
  return [];
}

export default async function HomePage() {
  const [stats, latestPapers, popularPapers] = await Promise.all([
    getStats(),
    getLatestPapers(),
    getPopularPapers(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection
        totalPapers={stats.totalPapers || 150}
        totalDownloads={stats.totalDownloads || 5200}
        totalSubjects={stats.totalSubjects || 85}
      />
      <FeaturesSection />
      <LatestUploads papers={latestPapers} />
      <PopularPapers papers={popularPapers} />
      <FaqSection />
      <Footer />
    </main>
  );
}
