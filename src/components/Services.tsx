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
  ClipboardCheck, 
  Book,
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
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section id="services" className="py-32 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-40">
          {trustIndicators.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-6 text-center group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={cn(
                "p-7 rounded-[32px] shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/15",
                item.bg, item.color
              )}>
                <item.icon className="h-9 w-9" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-28 space-y-6">
          <div className="inline-block bg-accent text-white text-[10px] uppercase tracking-[0.3em] font-bold px-7 py-2.5 rounded-full mb-2 shadow-xl shadow-accent/20">
            Our Expertise
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Comprehensive Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
            High-end research writing solutions tailored for global academic success and peer-review publication.
          </p>
        </div>

        <div className="relative px-4 sm:px-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6 md:-ml-10">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <CarouselItem key={index} className="pl-6 md:pl-10 basis-full md:basis-1/2 lg:basis-1/3 py-10">
                    <Card className="border-none shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,71,255,0.15)] transition-all duration-700 rounded-[45px] p-10 md:p-12 bg-white flex flex-col h-full group border-b-8 border-transparent hover:border-primary">
                      <CardHeader className="p-0 mb-10">
                        <div className="bg-primary/5 w-18 h-18 rounded-[25px] flex items-center justify-center text-primary mb-10 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-sm">
                          <Icon className="h-9 w-9" />
                        </div>
                        <CardTitle className="font-headline text-3xl text-accent mb-5 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-10 flex-grow">
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                          {service.description}
                        </p>
                        <div className="space-y-5">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold uppercase tracking-wider">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <div className="pt-12 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="p-4 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-12 gap-8 md:block">
              <CarouselPrevious className="static md:absolute md:-left-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-16 w-16 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
              <CarouselNext className="static md:absolute md:-right-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-16 w-16 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
