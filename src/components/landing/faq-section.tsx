"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/shared/animated-section";

const faqs = [
  {
    question: "What is VTU Question Bank?",
    answer:
      "VTU Question Bank is a free, community-driven platform where VTU students can upload, browse, search, and download previous year question papers. We cover all branches and semesters with an AI-powered search system.",
  },
  {
    question: "How do I upload a question paper?",
    answer:
      "Click the 'Upload Paper' button, fill in the details like subject name, code, branch, semester, and exam type, then drag and drop your PDF file. Our AI will also help auto-detect the subject details from the PDF.",
  },
  {
    question: "Are the question papers free to download?",
    answer:
      "Yes! All question papers on VTU Question Bank are completely free to download. No registration or login required. Just browse, find your paper, and download.",
  },
  {
    question: "Which branches are supported?",
    answer:
      "We support all major VTU branches including CSE, ISE, AIML, AIDS, ECE, EEE, MECH, CIVIL, CHEMICAL, and BIOTECH. Papers from all 8 semesters are available.",
  },
  {
    question: "How does the AI search work?",
    answer:
      "Our AI search understands natural language queries. You can type things like '4th sem ADA paper', '2024 DBMS question paper', or 'Operating Systems CSE' and it will intelligently find matching papers.",
  },
  {
    question: "Can I preview papers before downloading?",
    answer:
      "Yes! Every paper has an in-browser PDF viewer. You can preview, zoom in/out, navigate pages, and go fullscreen before deciding to download.",
  },
  {
    question: "How are uploaded papers verified?",
    answer:
      "All uploaded papers go through a review process. Papers are checked for accuracy and relevance before being made available to all users. This ensures the quality of our repository.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about VTU Question Bank
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/20 data-[state=open]:bg-primary/[0.02] transition-all"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:text-primary py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
