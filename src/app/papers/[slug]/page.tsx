import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/landing/footer";
import { PaperDetailClient } from "./paper-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPaper(slug: string) {
  const paper = await prisma.questionPaper.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
      status: "approved",
    },
  });
  return paper;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getPaper(slug);

  if (!paper) {
    return { title: "Paper Not Found" };
  }

  return {
    title: `${paper.title} - ${paper.branch} ${paper.semester}th Sem`,
    description: `Download ${paper.title} VTU question paper for ${paper.branch} ${paper.semester}th semester`,
    openGraph: {
      title: paper.title,
      description: `VTU ${paper.title} question paper`,
      type: "article",
    },
  };
}

export default async function PaperDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = await getPaper(slug);

  if (!paper) {
    notFound();
  }

  // Serialize dates
  const serializedPaper = {
    ...paper,
    createdAt: paper.createdAt.toISOString(),
    updatedAt: paper.updatedAt.toISOString(),
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      {/* @ts-expect-error - serialized dates */}
      <PaperDetailClient paper={serializedPaper} />
      <Footer />
    </main>
  );
}
