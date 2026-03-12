
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, Users } from "lucide-react";

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
    name: "Sanya Gupta",
    role: "MTech Student",
    content: "I was struggling with my MTech thesis methodology. Their experts provided clear guidance and helped me finish the data analysis section effortlessly.",
    image: "testimonial-5",
    stars: 5
  },
  {
    name: "Anjali Desai",
    role: "Engineering Student",
    content: "Professional and reliable. They helped me with my project report and the quality exceeded my expectations. Great communication throughout.",
    image: "testimonial-6",
    stars: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-black text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            <Users className="h-3 w-3" />
            Client Reviews
          </div>
          <h2 className="text-5xl font-headline font-bold text-accent mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg">Don't just take our word for it - hear from our satisfied clients</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => {
            const img = PlaceHolderImages.find(i => i.id === t.image);
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-slate-600 italic leading-relaxed mb-10 flex-grow text-sm">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4 border-t pt-6 border-slate-50">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage src={img?.imageUrl} alt={t.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="font-bold text-accent leading-none mb-1">{t.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-16">
          {[
            { label: "100%", sub: "Confidential" },
            { label: "Plagiarism", sub: "Free Guarantee" },
            { label: "24/7", sub: "Academic Support" },
            { label: "98%", sub: "Publishing Success" }
          ].map((badge, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">{badge.label}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest mt-1 text-[10px] font-bold">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
