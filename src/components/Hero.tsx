"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Hero() {
  const [heroData, setHeroData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setHeroData(data.hero);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleGetQuote = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailQuote = () => {
    window.location.href = "mailto:support.rdservices@gmail.com?subject=Inquiry about Research Services&body=Hi R&D Services team, I would like to inquire about your academic writing services.";
  };

  return (
    <section className="hero-gradient text-white pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden relative min-h-[80vh] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="w-full px-4 sm:px-12 lg:px-20 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          {isLoading ? (
            <div className="space-y-10">
              <Skeleton className="h-10 w-48 bg-white/10 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-16 w-full bg-white/10 rounded-xl" />
                <Skeleton className="h-16 w-3/4 bg-white/10 rounded-xl" />
              </div>
              <Skeleton className="h-24 w-full bg-white/10 rounded-xl" />
              <div className="flex gap-4">
                <Skeleton className="h-16 w-40 bg-white/10 rounded-2xl" />
                <Skeleton className="h-16 w-40 bg-white/10 rounded-2xl" />
              </div>
            </div>
          ) : (
            <div className="space-y-10 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-white font-bold text-xs uppercase tracking-widest mx-auto lg:mx-0 shadow-xl">
                <Sparkles className="h-4 w-4 text-blue-300" />
                {heroData?.badge || "Premier Research Excellence"}
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-headline font-bold leading-[1.1] tracking-tight">
                {heroData?.title?.split(' ').slice(0, -1).join(' ') || "Scholarly Research"} <span className="text-blue-400">{heroData?.title?.split(' ').slice(-1) || "Perfected."}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl leading-relaxed font-light mx-auto lg:mx-0">
                {heroData?.subtitle || "Elite academic support for researchers who demand precision, integrity, and international publishing standards."}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                <Button 
                  onClick={handleGetQuote}
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
                {(heroData?.stats || [
                  { label: "Papers Published", value: "500+" },
                  { label: "Acceptance Rate", value: "98%" },
                  { label: "Expert Concierge", value: "24/7" }
                ]).map((stat: any, i: number) => (
                  <div key={i} className="space-y-2 group">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold group-hover:text-blue-400 transition-colors">{stat.value}</div>
                    <div className="text-[10px] text-blue-200/60 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20 lg:mt-0 relative flex justify-center lg:block animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative z-10 w-full max-w-2xl lg:max-w-none">
              {isLoading ? (
                <Skeleton className="aspect-[4/5] w-full rounded-[40px] md:rounded-[60px] bg-white/5 border-[12px] md:border-[16px] border-white/5" />
              ) : (
                heroData?.image && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] md:rounded-[60px] border-[12px] md:border-[16px] border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.5)] group">
                    <Image
                      src={heroData.image}
                      alt="Hero Visual"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/20 blur-[150px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
