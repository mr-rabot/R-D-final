"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  CheckCircle, 
  Zap, 
  Lock, 
  FileText
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
import { PlaceHolderImages } from "@/lib/placeholder-images";

const trustIndicators = [
  { icon: GraduationCap, label: "PhD Experts", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: CheckCircle, label: "100% Original", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Zap, label: "Fast Delivery", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Lock, label: "Confidential", color: "text-slate-600", bg: "bg-slate-50" },
];

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setServices(data.services || []);
      })
      .catch(err => console.error("Error fetching services:", err));

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
    <section id="services" ref={sectionRef} className="py-32 bg-slate-50/50 overflow-hidden">
      <div className={cn(
        "w-full px-4 sm:px-12 lg:px-20 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-40">
          {trustIndicators.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center gap-6 text-center group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )} 
              style={{ transitionDelay: `${i * 100}ms` }}
            >
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
          <p className="text-slate-500 max-w-4xl mx-auto text-lg md:text-xl font-light">
            High-end research writing solutions tailored for global academic success and peer-review publication.
          </p>
        </div>

        <div className="relative px-6 sm:px-12">
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
                const placeholderId = `service-${(index % 3) + 1}`;
                const placeholder = PlaceHolderImages.find(p => p.id === placeholderId);
                const displayImage = service.image || placeholder?.imageUrl;

                return (
                  <CarouselItem key={index} className="pl-6 md:pl-10 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-8">
                    <Card className="border-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_90px_-20px_rgba(0,71,255,0.2)] transition-all duration-700 rounded-[45px] bg-white flex flex-col h-full group overflow-hidden border-b-8 border-transparent hover:border-primary">
                      <div className="relative aspect-video w-full overflow-hidden">
                        {displayImage && (
                          <Image 
                            src={displayImage} 
                            alt={service.title} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                            unoptimized
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                        <div className="absolute bottom-6 left-10">
                           <div className="bg-primary/90 backdrop-blur-md w-14 h-14 rounded-[18px] flex items-center justify-center text-white shadow-lg">
                            <FileText className="h-7 w-7" />
                          </div>
                        </div>
                      </div>
                      <CardHeader className="px-10 pt-4 pb-0">
                        <CardTitle className="font-headline text-3xl text-accent mb-4 group-hover:text-primary transition-colors leading-tight">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-10 pb-12 space-y-8 flex-grow">
                        <p className="text-slate-500 text-base leading-relaxed font-light">
                          {service.description}
                        </p>
                        <div className="space-y-4">
                          {service.features.slice(0, 3).map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                              <CheckCircle className="h-3 w-3 text-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
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
