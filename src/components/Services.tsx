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
  FileCheck,
  ArrowRight
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const trustIndicators = [
  { icon: GraduationCap, label: "PhD Experts", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: CheckCircle, label: "100% Original", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Zap, label: "Fast Delivery", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Lock, label: "Confidential", color: "text-slate-600", bg: "bg-slate-50" },
];

const services = [
  {
    title: "Research Papers",
    description: "Well-researched, structured academic papers with proper citations and references.",
    icon: FileText,
    features: ["Original content", "Proper formatting", "Literature review", "Timely delivery"]
  },
  {
    title: "Synopsis Writing",
    description: "Structured research outlines essential for project approval and admissions.",
    icon: ClipboardCheck,
    features: ["Clear objectives", "Methodology outline", "Problem statement", "Approval-oriented"]
  },
  {
    title: "PPT Presentation",
    description: "High-quality academic presentations designed for thesis defense or conferences.",
    icon: Presentation,
    features: ["Visual layout", "Speaker notes", "Professional design", "Summarization"]
  },
  {
    title: "Plagiarism Report",
    description: "Comprehensive similarity checks using premium tools to ensure academic integrity.",
    icon: FileCheck,
    features: ["Similarity index", "Source identification", "AI detection", "Premium report"]
  },
  {
    title: "Thesis Writing",
    description: "Complete thesis writing from proposal to final submission with expert guidance.",
    icon: GraduationCap,
    features: ["Methodology", "Interpretation", "Revision support", "Supervisor-ready"]
  },
  {
    title: "Dissertation",
    description: "Detailed dissertations with thorough research and academic rigor.",
    icon: BookOpen,
    features: ["Chapter development", "Statistical analysis", "Synthesis", "Proofreading"]
  },
  {
    title: "Literature Review",
    description: "Comprehensive literature reviews covering relevant research in your specific field.",
    icon: Book,
    features: ["Research synthesis", "Gap identification", "Critical analysis", "Systematic"]
  }
];

export function Services() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <section id="services" className="py-32 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Indicators Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-32">
          {trustIndicators.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-6 text-center group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={cn(
                "p-6 rounded-[24px] shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl",
                item.bg, item.color
              )}>
                <item.icon className="h-8 w-8" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block bg-accent text-white text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-2 shadow-xl shadow-accent/20">
            Our Expertise
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Comprehensive Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
            High-end research writing solutions tailored for global academic success and peer-review publication.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative px-0 sm:px-4">
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
            <CarouselContent className="-ml-4 md:-ml-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <CarouselItem key={index} className="pl-4 md:pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="border-none shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-[40px] p-8 md:p-10 bg-white flex flex-col h-full group border-b-4 border-transparent hover:border-primary">
                      <CardHeader className="p-0 mb-8">
                        <div className="bg-primary/5 w-16 h-16 rounded-[22px] flex items-center justify-center text-primary mb-8 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                          <Icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline text-3xl text-accent mb-4 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-8 flex-grow">
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                          {service.description}
                        </p>
                        <div className="space-y-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-bold uppercase tracking-wider">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <div className="pt-10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="p-3 bg-primary/5 rounded-full text-primary">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-16 gap-6 md:block">
              <CarouselPrevious className="static md:absolute md:-left-12 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
              <CarouselNext className="static md:absolute md:-right-12 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
