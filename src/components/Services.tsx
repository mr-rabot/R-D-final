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
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-20 md:mb-32">
          {trustIndicators.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center gap-3 md:gap-5 text-center group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )} 
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={cn(
                "p-4 md:p-6 rounded-[20px] md:rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(0,71,255,0.12)]",
                item.bg, item.color
              )}>
                <item.icon className="h-5 w-5 md:h-7 md:w-7" />
              </div>
              <span className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-12 md:mb-20 space-y-3 md:space-y-5">
          <div className="inline-block bg-accent text-white text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold px-4 md:px-6 py-1.5 md:py-2 rounded-full mb-1 shadow-lg shadow-accent/15">
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-accent leading-tight">Comprehensive Services</h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-base md:text-lg font-light px-4">
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
              <CarouselContent className="-ml-4 md:-ml-8">
                {services.map((service, index) => {
                  const placeholderId = `service-${(index % 3) + 1}`;
                  const placeholder = PlaceHolderImages.find(p => p.id === placeholderId);
                  const displayImage = service.image || placeholder?.imageUrl;

                  return (
                    <CarouselItem key={index} className="pl-4 md:pl-8 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-4 md:py-6">
                      <Card className="border-none shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_-15px_rgba(0,71,255,0.15)] transition-all duration-700 rounded-[28px] md:rounded-[36px] bg-white flex flex-col h-full group overflow-hidden border-b-4 border-transparent hover:border-primary">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                          <div className="absolute bottom-3 left-5 md:bottom-5 md:left-8">
                             <div className="bg-primary/90 backdrop-blur-md w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-[14px] flex items-center justify-center text-white shadow-md">
                              <FileText className="h-4 w-4 md:h-6 md:w-6" />
                            </div>
                          </div>
                        </div>
                        <CardHeader className="px-5 md:px-8 pt-5 pb-1">
                          <CardTitle className="font-headline text-xl md:text-2xl text-accent mb-1 group-hover:text-primary transition-colors leading-tight">
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 md:px-8 pb-8 space-y-4 flex-grow">
                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light line-clamp-4">
                            {service.description}
                          </p>
                          <div className="space-y-2 pt-1">
                            {service.features && Array.isArray(service.features) && service.features.slice(0, 3).map((feature: string, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <CheckCircle className="h-2.5 w-2.5 text-primary shrink-0" />
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
              <div className="flex justify-center mt-8 md:mt-12 gap-4 md:block">
                <CarouselPrevious className="static md:absolute md:-left-8 lg:-left-12 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-10 w-10 md:h-14 md:w-14 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-90" />
                <CarouselNext className="static md:absolute md:-right-8 lg:-right-12 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-10 w-10 md:h-14 md:w-14 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-90" />
              </div>
            </Carousel>
          ) : (
            <div className="text-center py-16 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing scholarly services...</div>
          )}
        </div>
      </div>
    </section>
  );
}
