
"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => setFaqs(data.faqs))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="faq" className="py-24 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            Have Questions?
          </div>
          <h2 className="text-5xl font-headline font-bold text-accent mb-4">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white px-6 rounded-2xl border border-slate-100 shadow-sm"
            >
              <AccordionTrigger className="text-left font-bold text-accent hover:text-primary transition-colors py-6">
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
