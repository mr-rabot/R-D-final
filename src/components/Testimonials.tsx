"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, Users, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "MBA Student",
    content: "Excellent service! They delivered my thesis well before the deadline and the quality was outstanding. Highly recommended for serious academic work.",
    image: "testimonial-1",
    stars: 5
  },
  {
    name: "Rahul Verma",
    role: "PhD Scholar",
    content: "The research paper they wrote for me was exceptional. They understood my requirements perfectly and delivered exactly what I needed. Worth every penny!",
    image: "testimonial-2",
    stars: 5
  },
  {
    name: "Preeti Sahani",
    role: "MCA Student",
    content: "The programming research and project documentation provided was top-notch. It helped me secure an A grade in my final semester project.",
    image: "testimonial-3",
    stars: 5
  },
  {
    name: "Deepak Kumar",
    role: "MCA Student",
    content: "Professional team with great technical insights. My project report was formatted perfectly according to my university standards.",
    image: "testimonial-4",
    stars: 5
  },
  {
    name: "Kiran Thapa",
    role: "MTech Student, Nepal",
    content: "The guidance for my MTech thesis was exceptional. The technical depth and research quality were exactly what I needed for my submission in Nepal.",
    image: "testimonial-5",
    stars: 5
  },
  {
    name: "Tenzin Dorji",
    role: "MCA Student, Bhutan",
    content: "Highly professional service for my MCA project. The documentation was thorough and perfectly formatted according to my university guidelines in Bhutan.",
    image: "testimonial-6",
    stars: 5
  },
  {
    name: "Amitosh Kumar",
    role: "MTech Student",
    content: "The technical analysis provided for my research article was very detailed. The team is very supportive and responsive to revisions.",
    image: "testimonial-1",
    stars: 5
  }
];

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <section id="testimonials" className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-black text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            <Users className="h-3 w-3" />
            Client Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">Don't just take our word for it - hear from our satisfied scholars across the globe.</p>
        </div>

        <div className="relative px-4 sm:px-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, index) => {
                const img = PlaceHolderImages.find(i => i.id === t.image);
                return (
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-300 flex flex-col h-full border border-slate-100 group relative">
                      <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Quote className="h-8 md:h-12 w-8 md:w-12 text-accent" />
                      </div>
                      
                      <div className="flex gap-1 mb-4 md:mb-6">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} className="h-3 md:h-4 w-3 md:w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-slate-600 italic leading-relaxed mb-8 md:mb-10 flex-grow text-xs md:text-sm relative z-10">
                        "{t.content}"
                      </p>
                      
                      <div className="flex items-center gap-3 md:gap-4 border-t pt-6 border-slate-50">
                        <Avatar className="h-10 md:h-12 w-10 md:w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={img?.imageUrl} alt={t.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{t.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h4 className="font-bold text-accent leading-none mb-1 text-sm md:text-base">{t.name}</h4>
                          <p className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4 md:block">
              <CarouselPrevious className="static md:absolute md:-left-12 translate-y-0 bg-white border-slate-200 hover:bg-primary hover:text-white h-10 w-10 flex items-center justify-center rounded-full shadow-lg" />
              <CarouselNext className="static md:absolute md:-right-12 translate-y-0 bg-white border-slate-200 hover:bg-primary hover:text-white h-10 w-10 flex items-center justify-center rounded-full shadow-lg" />
            </div>
          </Carousel>
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-slate-200 pt-16">
          {[
            { label: "100%", sub: "Confidential" },
            { label: "Plagiarism", sub: "Free Guarantee" },
            { label: "24/7", sub: "Academic Support" },
            { label: "98%", sub: "Publishing Success" }
          ].map((badge, i) => (
            <div key={i} className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">{badge.label}</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}