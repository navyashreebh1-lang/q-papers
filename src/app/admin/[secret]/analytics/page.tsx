import { redirect } from "next/navigation";

export default function AdminAnalyticsPage() {
  // Reuse the dashboard analytics page
  redirect("/dashboard/analytics");
}
