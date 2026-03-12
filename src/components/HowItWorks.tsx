
"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "1",
    title: "Share Requirements",
    description: "Tell us about your project, topic, deadline, and specific requirements",
    icon: Mail,
  },
  {
    number: "2",
    title: "Get Quote",
    description: "Receive a custom quote based on your project complexity and timeline",
    icon: Phone,
  },
  {
    number: "3",
    title: "We Write",
    description: "Our expert writers work on your project with regular progress updates",
    icon: FileText,
  },
  {
    number: "4",
    title: "Receive & Review",
    description: "Get your completed work with unlimited revisions until satisfied",
    icon: CheckCircle,
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-black text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Simple Process
          </div>
          <h2 className="text-5xl font-headline font-bold text-accent mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Get your research work done in 4 simple steps</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col items-center text-center group transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-primary rounded-[24px] flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-primary/20 transform group-hover:scale-105 transition-transform duration-300">
                    {step.number}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-100 p-2.5 rounded-xl border-4 border-white shadow-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-accent mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
