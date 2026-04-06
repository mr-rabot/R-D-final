"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroProps {
  initialData?: any;
}

export function Hero({ initialData }: HeroProps) {
  const [heroData, setHeroData] = useState<any>(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      fetch('/api/leadership', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data && data.hero) {
            setHeroData(data.hero);
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Hero data fetch error:", err);
          setIsLoading(false);
        });
    }
  }, [initialData]);

  const handleGetQuote = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailQuote = () => {
    window.location.href = "mailto:support.rdservices@gmail.com?subject=Inquiry about Research Services&body=Hi R&D Services team, I would like to inquire about your academic writing services.";
  };

  return (
    <section className="hero-gradient text-white pt-32 pb-20 md:pt-48 md:pb-32 lg:pb-40 overflow-hidden relative min-h-screen flex items-center w-full">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          {isLoading ? (
            <div className="space-y-8 w-full">
              <Skeleton className="h-10 w-48 bg-white/10 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-16 w-full bg-white/10 rounded-xl" />
                <Skeleton className="h-16 w-3/4 bg-white/10 rounded-xl" />
              </div>
              <Skeleton className="h-24 w-full bg-white/10 rounded-xl" />
            </div>
          ) : (
            <div className="space-y-10 md:space-y-14 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-white font-bold text-xs md:text-sm uppercase tracking-widest mx-auto lg:mx-0 shadow-xl">
                <Sparkles className="h-5 w-5 text-blue-300" />
                {heroData?.badge || "Premier Research Excellence"}
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-headline font-bold leading-[1] tracking-tight">
                {heroData?.title?.split(' ').slice(0, -1).join(' ') || "Scholarly Research"} <span className="text-blue-400 block sm:inline">{heroData?.title?.split(' ').slice(-1) || "Perfected."}</span>
              </h1>
              
              <p className="text-lg md:text-2xl lg:text-3xl text-blue-100/80 max-w-3xl leading-relaxed font-light mx-auto lg:mx-0">
                {heroData?.subtitle || "Elite academic support for researchers who demand precision, integrity, and international publishing standards."}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 md:gap-8 pt-6">
                <Button 
                  onClick={handleGetQuote}
                  size="lg" 
                  className="w-full sm:w-auto rounded-2xl px-12 h-18 md:h-20 text-xl bg-white text-primary hover:bg-blue-50 shadow-[0_20px_40px_rgba(255,255,255,0.2)] font-bold flex gap-4 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <MessageSquare className="h-7 w-7" /> Get Quote
                </Button>
                <Button 
                  onClick={handleEmailQuote}
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-2xl px-12 h-18 md:h-20 text-xl border-2 border-white/30 text-white hover:bg-white/10 font-bold bg-transparent flex gap-4 backdrop-blur-sm transition-all hover:-translate-y-1 active:scale-95"
                >
                  <Mail className="h-7 w-7" /> Email Us
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-14 pt-16 md:pt-20 border-t border-white/10 text-center sm:text-left">
                {(heroData?.stats || [
                  { label: "Papers Published", value: "500+" },
                  { label: "Acceptance Rate", value: "98%" },
                  { label: "Expert Concierge", value: "24/7" }
                ]).map((stat: any, i: number) => (
                  <div key={i} className="space-y-2 md:space-y-4 group">
                    <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-headline font-bold group-hover:text-blue-400 transition-colors leading-none">{stat.value}</div>
                    <div className="text-[10px] md:text-xs lg:text-sm text-blue-200/60 uppercase tracking-[0.25em] font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20 lg:mt-0 relative flex justify-center w-full lg:block animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative z-10 w-full max-w-xl lg:max-w-none">
              {isLoading ? (
                <Skeleton className="aspect-[4/5] w-full rounded-[40px] md:rounded-[60px] bg-white/5 border-[8px] md:border-[16px] border-white/5" />
              ) : (
                heroData?.image && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] md:rounded-[70px] border-[12px] md:border-[24px] border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group">
                    <Image
                      src={heroData.image}
                      alt="Hero Visual"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                  </div>
                )
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/20 blur-[180px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
