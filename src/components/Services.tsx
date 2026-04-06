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
        if (data && Array.isArray(data.services)) {
          setServices(data.services);
        }
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
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-slate-50/50 overflow-hidden w-full">
      <div className={cn(
        "w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-16 mb-24 md:mb-40">
          {trustIndicators.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center gap-4 md:gap-6 text-center group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )} 
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={cn(
                "p-5 md:p-7 rounded-[24px] md:rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_rgba(0,71,255,0.15)]",
                item.bg, item.color
              )}>
                <item.icon className="h-6 w-6 md:h-9 md:w-9" />
              </div>
              <span className="text-[8px] md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-16 md:mb-28 space-y-4 md:space-y-6">
          <div className="inline-block bg-accent text-white text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold px-5 md:px-7 py-2 md:py-2.5 rounded-full mb-2 shadow-xl shadow-accent/20">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold text-accent leading-tight">Comprehensive Services</h2>
          <p className="text-slate-500 max-w-4xl mx-auto text-base md:text-xl font-light px-4">
            High-end research writing solutions tailored for global academic success and peer-review publication.
          </p>
        </div>

        <div className="relative overflow-visible">
          {services && services.length > 0 ? (
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4 md:-ml-10">
                {services.map((service, index) => {
                  const placeholderId = `service-${(index % 3) + 1}`;
                  const placeholder = PlaceHolderImages.find(p => p.id === placeholderId);
                  const displayImage = service.image || placeholder?.imageUrl;

                  return (
                    <CarouselItem key={index} className="pl-4 md:pl-10 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-4 md:py-8">
                      <Card className="border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_90px_-20px_rgba(0,71,255,0.2)] transition-all duration-700 rounded-[35px] md:rounded-[45px] bg-white flex flex-col h-full group overflow-hidden border-b-8 border-transparent hover:border-primary">
                        <div className="relative aspect-video w-full overflow-hidden shrink-0">
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
                          <div className="absolute bottom-4 left-6 md:bottom-6 md:left-10">
                             <div className="bg-primary/90 backdrop-blur-md w-10 h-10 md:w-14 md:h-14 rounded-[12px] md:rounded-[18px] flex items-center justify-center text-white shadow-lg">
                              <FileText className="h-5 w-5 md:h-7 md:w-7" />
                            </div>
                          </div>
                        </div>
                        <CardHeader className="px-6 md:px-10 pt-6 pb-2">
                          <CardTitle className="font-headline text-2xl md:text-3xl text-accent mb-2 group-hover:text-primary transition-colors leading-tight">
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 md:px-10 pb-10 space-y-6 flex-grow">
                          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light line-clamp-4">
                            {service.description}
                          </p>
                          <div className="space-y-3 pt-2">
                            {service.features && Array.isArray(service.features) && service.features.slice(0, 3).map((feature: string, i: number) => (
                              <div key={i} className="flex items-center gap-3 text-[9px] md:text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                                <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                                <span className="truncate">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex justify-center mt-10 md:mt-16 gap-6 md:block">
                <CarouselPrevious className="static md:absolute md:-left-12 lg:-left-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-12 w-12 md:h-16 md:w-16 flex items-center justify-center rounded-full shadow-xl transition-all active:scale-90" />
                <CarouselNext className="static md:absolute md:-right-12 lg:-right-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-12 w-12 md:h-16 md:w-16 flex items-center justify-center rounded-full shadow-xl transition-all active:scale-90" />
              </div>
            </Carousel>
          ) : (
            <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing scholarly services...</div>
          )}
        </div>
      </div>
    </section>
  );
}
