
"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Associate Professor, Cambridge",
    content: "AcadeFlow Solutions transformed our messy data into a coherent narrative that secured a major grant. Their statistical team is world-class.",
    image: "testimonial-1"
  },
  {
    name: "James Miller",
    role: "PhD Candidate, Stanford",
    content: "The structural editing and citation support saved me weeks of stress during my final dissertation push. Highly recommended.",
    image: "testimonial-2"
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Senior Researcher, MIT",
    content: "Professional, confidential, and incredibly precise. They truly understand the nuances of academic publishing.",
    image: "testimonial-1"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-accent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <Quote className="h-12 w-12 text-primary mb-6" />
          <h2 className="text-4xl font-headline font-bold">What Academic Leaders Say</h2>
          <div className="flex gap-1 mt-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
          </div>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((t, index) => {
              const img = PlaceHolderImages.find(i => i.id === t.image);
              return (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center text-center px-12 space-y-8">
                    <p className="text-2xl md:text-3xl font-headline italic leading-relaxed text-blue-100">
                      "{t.content}"
                    </p>
                    <div className="flex flex-col items-center">
                      <Avatar className="h-20 w-20 border-4 border-primary/30 mb-4">
                        <AvatarImage src={img?.imageUrl} alt={t.name} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <h4 className="text-xl font-bold text-white">{t.name}</h4>
                      <p className="text-primary font-medium">{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 border-white/20 hover:bg-white/10 text-white" />
          <CarouselNext className="hidden md:flex -right-12 border-white/20 hover:bg-white/10 text-white" />
        </Carousel>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
          {[
            { label: "100%", sub: "Confidential" },
            { label: "Plagiarism", sub: "Free Guarantee" },
            { label: "24/7", sub: "Academic Support" },
            { label: "98%", sub: "Publishing Success" }
          ].map((badge, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">{badge.label}</div>
              <div className="text-sm text-blue-200/60 uppercase tracking-widest mt-1">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
