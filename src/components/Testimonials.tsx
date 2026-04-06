"use client";

import { useEffect, useState, useRef } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, Users, Quote, ShieldCheck, Award, Zap, CheckCircle2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setTestimonials(data.testimonials || []))
      .catch(err => console.error("Error fetching testimonials:", err));

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
    <section id="testimonials" ref={sectionRef} className="py-32 bg-slate-50/50 overflow-hidden relative w-full border-y border-slate-100">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className={cn(
        "w-full px-4 sm:px-12 lg:px-20 relative z-10 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="flex flex-col items-center mb-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-2 shadow-xl shadow-black/10">
            <Users className="h-3 w-3" />
            Global Scholarly Impact
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-accent leading-tight">Client Testimonials</h2>
          <div className="h-1.5 w-24 bg-primary rounded-full mb-4" />
          <p className="text-slate-500 text-lg md:text-xl lg:text-2xl max-w-4xl font-light italic">
            Reflections on our commitment to academic excellence from researchers across the globe.
          </p>
        </div>

        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((t, index) => {
                const placeholderId = `testimonial-${(index % 6) + 1}`;
                const img = PlaceHolderImages.find(i => i.id === placeholderId);
                return (
                  <CarouselItem key={index} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="h-full py-4">
                      <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-20px_rgba(0,71,255,0.12)] transition-all duration-500 flex flex-col h-full group relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                          <Quote className="h-32 w-32 text-accent" />
                        </div>
                        
                        <div className="flex gap-1 mb-6">
                          {[...Array(t.stars)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                        
                        <div className="relative mb-8 flex-grow">
                          <Quote className="h-5 w-5 text-primary/20 absolute -top-2 -left-2" />
                          <p className="text-slate-600 leading-relaxed font-light italic text-sm lg:text-base relative z-10">
                            {t.content}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                            <img 
                              src={t.image || img?.imageUrl} 
                              alt={t.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="text-left overflow-hidden">
                            <h4 className="font-headline font-bold text-accent text-lg leading-tight mb-1 truncate">{t.name}</h4>
                            <p className="text-[9px] text-primary/80 font-bold uppercase tracking-[0.1em] truncate">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="flex justify-center mt-12 gap-6 md:block">
              <CarouselPrevious className="static md:absolute md:-left-16 lg:-left-20 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-90" />
              <CarouselNext className="static md:absolute md:-right-16 lg:-right-20 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-90" />
            </div>
          </Carousel>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-slate-100 pt-20">
          {[
            { icon: ShieldCheck, label: "100%", sub: "Academic Integrity" },
            { icon: Award, label: "Top Rated", sub: "Expert Consultation" },
            { icon: Zap, label: "Rapid", sub: "Scholarly Synthesis" },
            { icon: CheckCircle2, label: "98%", sub: "Journal Acceptance" }
          ].map((badge, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center text-center group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-white shadow-sm p-4 lg:p-5 rounded-2xl text-primary mb-4 transition-transform group-hover:scale-110 group-hover:shadow-md">
                <badge.icon className="h-6 w-6 lg:h-7 lg:w-7" />
              </div>
              <div className="text-2xl lg:text-4xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{badge.label}</div>
              <div className="text-[9px] lg:text-xs text-slate-400 uppercase tracking-[0.2em] mt-1.5 font-bold">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}