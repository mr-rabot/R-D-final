"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  CheckCircle, 
  Zap, 
  Lock, 
  FileText, 
  BookOpen, 
  Check, 
  ClipboardCheck, 
  Book,
  FileSearch,
  Presentation,
  FileCheck
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const trustIndicators = [
  { icon: GraduationCap, label: "PhD Experts", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: CheckCircle, label: "100% Original", color: "text-green-600", bg: "bg-green-50" },
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
      "Proper formatting (APA, MLA)",
      "In-depth literature review",
      "Timely delivery"
    ]
  },
  {
    title: "Thesis Writing",
    description: "Complete thesis writing from proposal to final submission with expert guidance.",
    icon: GraduationCap,
    features: [
      "Research methodology",
      "Data analysis & interpretation",
      "Revision support",
      "Supervisor-ready format"
    ]
  },
  {
    title: "Dissertation",
    description: "Detailed dissertations with thorough research and academic rigor.",
    icon: BookOpen,
    features: [
      "Chapter-wise development",
      "Statistical analysis",
      "Literature synthesis",
      "Proofreading & editing"
    ]
  },
  {
    title: "Synopsis Writing",
    description: "Structured research outlines essential for project approval and admissions.",
    icon: ClipboardCheck,
    features: [
      "Clear research objectives",
      "Methodology outline",
      "Problem statement drafting",
      "Approval-oriented"
    ]
  },
  {
    title: "PPT Presentation",
    description: "High-quality academic presentations designed for thesis defense or conferences.",
    icon: Presentation,
    features: [
      "Engaging visual layout",
      "Key point summarization",
      "Speaker notes included",
      "Professional design"
    ]
  },
  {
    title: "Plagiarism Report",
    description: "Comprehensive similarity checks using premium tools to ensure academic integrity.",
    icon: FileCheck,
    features: [
      "Similarity index check",
      "Source identification",
      "Originality certificate",
      "AI detection report"
    ]
  },
  {
    title: "Conference Papers",
    description: "Professional preparation of papers for academic conferences and symposiums.",
    icon: Book,
    features: [
      "Abstract drafting",
      "Conference formatting",
      "Poster support",
      "Review preparation"
    ]
  },
  {
    title: "Project Reports",
    description: "Technical and academic project reports with proper documentation and analysis.",
    icon: FileSearch,
    features: [
      "Executive summary",
      "Technical documentation",
      "Result analysis",
      "Professional formatting"
    ]
  },
  {
    title: "Literature Review",
    description: "Comprehensive literature reviews covering relevant research in your specific field.",
    icon: Book,
    features: [
      "Research synthesis",
      "Gap identification",
      "Critical analysis",
      "Systematic approach"
    ]
  }
];

export function Services() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Indicators Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {trustIndicators.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center group">
              <div className={`p-4 rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110 shadow-sm`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-accent text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-2">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent leading-tight">Comprehensive Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            High-end research writing solutions tailored for global academic success.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative px-4 sm:px-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <CarouselItem key={index} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 rounded-[32px] p-6 md:p-8 bg-background flex flex-col h-full group">
                      <CardHeader className="p-0 mb-6">
                        <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                          <Icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="font-headline text-2xl text-accent mb-4 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-6 flex-grow">
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-12 gap-4 md:block">
              <CarouselPrevious className="static md:absolute md:-left-12 translate-y-0 bg-white border-slate-200 hover:bg-primary hover:text-white h-12 w-12 flex items-center justify-center rounded-full shadow-lg" />
              <CarouselNext className="static md:absolute md:-right-12 translate-y-0 bg-white border-slate-200 hover:bg-primary hover:text-white h-12 w-12 flex items-center justify-center rounded-full shadow-lg" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
