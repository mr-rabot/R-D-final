"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-bg");

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent("Hi R&D Services, I'm interested in your research writing services. Can you help me with a project?");
    window.open(`https://wa.me/916209779365?text=${message}`, '_blank');
  };

  const handleEmailQuote = () => {
    window.location.href = "mailto:support.rdservices@gmail.com?subject=Inquiry about Research Services&body=Hi R&D Services team, I would like to inquire about your academic writing services.";
  };

  return (
    <section className="hero-gradient text-white pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-white font-bold text-xs uppercase tracking-widest mx-auto lg:mx-0 shadow-xl">
              <Sparkles className="h-4 w-4 text-blue-300" />
              Premier Research Excellence
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.1] tracking-tight">
              Scholarly <br />
              Research <span className="text-blue-400">Perfected.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-xl leading-relaxed font-light mx-auto lg:mx-0">
              Elite academic support for researchers who demand precision, integrity, and international publishing standards.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <Button 
                onClick={handleWhatsAppQuote}
                size="lg" 
                className="w-full sm:w-auto rounded-2xl px-10 h-16 text-lg bg-white text-primary hover:bg-blue-50 shadow-[0_20px_40px_rgba(255,255,255,0.2)] font-bold flex gap-3 transition-all hover:-translate-y-1 active:scale-95"
              >
                <MessageSquare className="h-6 w-6" /> Get Quote
              </Button>
              <Button 
                onClick={handleEmailQuote}
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto rounded-2xl px-10 h-16 text-lg border-2 border-white/30 text-white hover:bg-white/10 font-bold bg-transparent flex gap-3 backdrop-blur-sm transition-all hover:-translate-y-1 active:scale-95"
              >
                <Mail className="h-6 w-6" /> Email Us
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/10 text-center sm:text-left">
              {[
                { val: "500+", lbl: "Papers Published" },
                { val: "98%", lbl: "Acceptance Rate" },
                { val: "24/7", lbl: "Expert Concierge" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2 group">
                  <div className="text-4xl md:text-5xl font-headline font-bold group-hover:text-blue-400 transition-colors">{stat.val}</div>
                  <div className="text-[10px] text-blue-200/60 uppercase tracking-[0.2em] font-bold">{stat.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 lg:mt-0 relative flex justify-center lg:block animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative z-10 w-full max-w-xl lg:max-w-none">
              {heroImage?.imageUrl ? (
                <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-[40px] md:rounded-[60px] border-[12px] md:border-[16px] border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.5)] group">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description || "Researcher at desk"}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ) : null}
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl hidden md:block animate-bounce duration-[3000ms] border border-blue-50">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-accent">
                    <p className="font-bold text-xl leading-none">Top Rated</p>
                    <p className="text-xs text-slate-500 font-medium">Academic Writing 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/20 blur-[150px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
