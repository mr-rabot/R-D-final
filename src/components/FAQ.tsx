"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do you ensure the work is plagiarism-free?",
    answer: "We use advanced plagiarism detection tools (like Turnitin) and provide a free plagiarism report with every project. Our writers create all content from scratch based on primary and secondary research.",
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Delivery times depend on the project complexity. A standard research paper usually takes 3-5 days, while a full thesis or dissertation can take 2-4 weeks. We also offer fast-track delivery for urgent requirements.",
  },
  {
    question: "Can I request revisions if I'm not satisfied?",
    answer: "Yes, we offer unlimited revisions until you are completely satisfied with the quality and alignment with your initial requirements. Revisions are processed with high priority.",
  },
  {
    question: "How do I communicate with my assigned writer?",
    answer: "You can communicate through our project management portal or via email. For premium projects, we can also arrange direct consultation calls with your academic expert.",
  },
  {
    question: "Is my personal and project information kept confidential?",
    answer: "Absolutely. We adhere to strict privacy protocols. Your identity and the details of your research project are never shared with third parties or published anywhere.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            Have Questions?
          </div>
          <h2 className="text-5xl font-headline font-bold text-accent mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Find answers to common questions about our services</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white px-6 rounded-2xl border border-slate-100 shadow-sm"
            >
              <AccordionTrigger className="text-left font-bold text-accent hover:text-primary transition-colors hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
