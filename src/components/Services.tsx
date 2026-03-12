
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CheckCircle, Zap, Lock, FileText, BookOpen, Check } from "lucide-react";

const trustIndicators = [
  { icon: GraduationCap, label: "PhD Experts", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: CheckCircle, label: "100% Plagiarism Free", color: "text-green-600", bg: "bg-green-50" },
  { icon: Zap, label: "Fast Delivery", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Lock, label: "Confidential", color: "text-amber-600", bg: "bg-amber-50" },
];

const services = [
  {
    title: "Research Papers",
    description: "Well-researched, structured academic papers with proper citations and references.",
    icon: FileText,
    features: [
      "Original & plagiarism-free content",
      "Proper formatting (APA, MLA, Chicago)",
      "In-depth literature review",
      "Timely delivery"
    ]
  },
  {
    title: "Thesis Writing",
    description: "Complete thesis writing from proposal to final submission with expert guidance.",
    icon: GraduationCap,
    features: [
      "Comprehensive research methodology",
      "Data analysis & interpretation",
      "Multiple revision rounds",
      "Supervisor-ready format"
    ]
  },
  {
    title: "Dissertation",
    description: "Detailed dissertations with thorough research and academic rigor.",
    icon: BookOpen,
    features: [
      "Chapter-wise development",
      "Statistical analysis support",
      "Literature synthesis",
      "Proofreading & editing"
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Indicators Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {trustIndicators.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center group">
              <div className={`p-4 rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-accent text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-2">
            Our Expertise
          </div>
          <h2 className="text-5xl font-headline font-bold text-accent">Services We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive research writing solutions for all your academic needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 rounded-[32px] p-6 bg-background">
                <CardHeader className="p-0 mb-6">
                  <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-accent mb-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-8">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-snug">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
