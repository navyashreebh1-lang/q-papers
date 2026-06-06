import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ secret: string }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { secret } = await params;

  // Validate admin secret
  if (secret !== process.env.ADMIN_SECRET) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
