"use client";

import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => setFaqs(data.faqs))
      .catch(err => console.error(err));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-24 bg-slate-50/50">
      <div className={cn(
        "w-full px-4 sm:px-12 lg:px-20 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            Have Questions?
          </div>
          <h2 className="text-5xl lg:text-7xl font-headline font-bold text-accent mb-4">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-6xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={cn(
                "bg-white px-6 lg:px-10 rounded-2xl border border-slate-100 shadow-sm transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="text-left font-bold text-accent hover:text-primary transition-colors py-6 lg:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6 lg:text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
