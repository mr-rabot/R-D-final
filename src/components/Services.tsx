
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  CheckCircle, 
  Zap, 
  Lock, 
  FileText, 
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

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => setServices(data.services))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="services" className="py-32 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-40">
          {trustIndicators.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-6 text-center group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={cn(
                "p-7 rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_rgba(0,71,255,0.15)]",
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

        <div className="relative px-6 sm:px-12 py-12">
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
                return (
                  <CarouselItem key={index} className="pl-6 md:pl-10 basis-full md:basis-1/2 lg:basis-1/3 py-8">
                    <Card className="border-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_90px_-20px_rgba(0,71,255,0.2)] transition-all duration-700 rounded-[45px] p-10 md:p-12 bg-white flex flex-col h-full group border-b-8 border-transparent hover:border-primary">
                      <CardHeader className="p-0 mb-10">
                        <div className="bg-primary/5 w-18 h-18 rounded-[25px] flex items-center justify-center text-primary mb-10 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-sm">
                          <FileText className="h-9 w-9" />
                        </div>
                        <CardTitle className="font-headline text-3xl text-accent mb-5 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-10 flex-grow">
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                          {service.description}
                        </p>
                        <div className="space-y-5">
                          {service.features.map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold uppercase tracking-wider">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <div className="pt-12 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="p-4 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-12 gap-8 md:block">
              <CarouselPrevious className="static md:absolute md:-left-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-16 w-16 flex items-center justify-center rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all" />
              <CarouselNext className="static md:absolute md:-right-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-16 w-16 flex items-center justify-center rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
