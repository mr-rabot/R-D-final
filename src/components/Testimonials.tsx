
"use client";

import { useEffect, useState } from "react";
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
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setTestimonials(data.testimonials || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-2 shadow-xl shadow-black/10">
            <Users className="h-3 w-3" />
            Global Scholarly Impact
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Client Testimonials</h2>
          <div className="h-1.5 w-24 bg-primary rounded-full mb-4" />
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-light italic">
            Reflections on our commitment to academic excellence from researchers across the globe.
          </p>
        </div>

        <div className="relative px-8 sm:px-16 lg:px-20 py-12 overflow-visible">
          <Carousel
            plugins={[plugin.current]}
            className="w-full overflow-visible"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6 md:-ml-8 overflow-visible">
              {testimonials.map((t, index) => {
                const placeholderId = `testimonial-${(index % 6) + 1}`;
                const img = PlaceHolderImages.find(i => i.id === placeholderId);
                return (
                  <CarouselItem key={index} className="pl-6 md:pl-8 basis-full md:basis-1/2 lg:basis-1/3 py-10 overflow-visible">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)] hover:shadow-[0_45px_100px_-20px_rgba(0,71,255,0.15)] transition-all duration-500 flex flex-col h-full group relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <Quote className="h-32 w-32 text-accent" />
                      </div>
                      
                      <div className="flex gap-1 mb-8">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary drop-shadow-sm" />
                        ))}
                      </div>
                      
                      <div className="relative mb-10 flex-grow">
                        <Quote className="h-8 w-8 text-primary/20 absolute -top-4 -left-4" />
                        <p className="text-slate-600 leading-relaxed font-light italic text-lg relative z-10">
                          {t.content}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-5 pt-8 border-t border-slate-50 mt-auto">
                        <div className="relative h-14 w-14 rounded-full overflow-hidden border-4 border-white shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                          <img 
                            src={img?.imageUrl} 
                            alt={t.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-headline font-bold text-accent text-xl leading-none mb-2">{t.name}</h4>
                          <p className="text-[10px] text-primary/80 font-bold uppercase tracking-[0.2em]">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="flex justify-center mt-12 gap-6 md:block">
              <CarouselPrevious className="static md:absolute md:-left-16 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all hover:scale-110 active:scale-90" />
              <CarouselNext className="static md:absolute md:-right-16 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all hover:scale-110 active:scale-90" />
            </div>
          </Carousel>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-slate-100 pt-20">
          {[
            { icon: ShieldCheck, label: "100%", sub: "Academic Integrity" },
            { icon: Award, label: "Top Rated", sub: "Expert Consultation" },
            { icon: Zap, label: "Rapid", sub: "Scholarly Synthesis" },
            { icon: CheckCircle2, label: "98%", sub: "Journal Acceptance" }
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-4 rounded-2xl text-primary mb-4 transition-transform group-hover:scale-110 group-hover:shadow-[0_15px_35px_rgba(0,71,255,0.1)]">
                <badge.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{badge.label}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-[0.3em] mt-2 font-bold">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
