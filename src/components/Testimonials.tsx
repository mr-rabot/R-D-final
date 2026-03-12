"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const testimonials = [
  {
    name: "Priya Sharma",
    role: "MBA Scholar",
    content: "The level of academic rigor and methodological precision provided by R&D Services is unparalleled. My thesis was delivered ahead of schedule with flawless citations.",
    image: "testimonial-1",
    stars: 5
  },
  {
    name: "Dr. Rahul Verma",
    role: "Post-Doctoral Researcher",
    content: "Collaborating with Om Prakash Sinha's team was a turning point for my research paper. Their insights into journal-specific requirements were instrumental in my acceptance.",
    image: "testimonial-2",
    stars: 5
  },
  {
    name: "Preeti Sahani",
    role: "Research Candidate",
    content: "The technical documentation and literature synthesis were exceptionally deep. They don't just write; they understand the core scientific contribution of your work.",
    image: "testimonial-3",
    stars: 5
  },
  {
    name: "Deepak Kumar",
    role: "Senior Graduate Student",
    content: "Professional, ethical, and highly efficient. The formatting was exactly in line with international standards, saving me weeks of tedious revisions.",
    image: "testimonial-4",
    stars: 5
  },
  {
    name: "Kiran Thapa",
    role: "MTech Scholar",
    content: "Their cross-border academic support is exceptional. The guidance I received for my engineering thesis met every standard of my international university.",
    image: "testimonial-5",
    stars: 5
  },
  {
    name: "Tenzin Dorji",
    role: "Academic Researcher",
    content: "Highly professional service. The research integrity and plagiarism-free guarantee provided me with the confidence I needed for my final submission.",
    image: "testimonial-6",
    stars: 5
  }
];

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

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

        <div className="relative px-4 sm:px-12">
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
                const img = PlaceHolderImages.find(i => i.id === t.image);
                return (
                  <CarouselItem key={index} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3 py-8">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full group relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <Quote className="h-32 w-32 text-accent" />
                      </div>
                      
                      <div className="flex gap-1 mb-8">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <div className="relative mb-10 flex-grow">
                        <Quote className="h-8 w-8 text-primary/20 absolute -top-4 -left-4" />
                        <p className="text-slate-600 leading-relaxed font-light italic text-lg relative z-10">
                          {t.content}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-5 pt-8 border-t border-slate-50 mt-auto">
                        <Avatar className="h-14 w-14 border-4 border-white shadow-lg">
                          <AvatarImage src={img?.imageUrl} alt={t.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{t.name[0]}</AvatarFallback>
                        </Avatar>
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
              <CarouselPrevious className="static md:absolute md:-left-16 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
              <CarouselNext className="static md:absolute md:-right-16 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
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
              <div className="bg-slate-50 p-4 rounded-2xl text-primary mb-4 transition-transform group-hover:scale-110 group-hover:bg-primary/5">
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
