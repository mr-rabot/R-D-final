
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
    <section className="hero-gradient text-white pt-32 pb-20 md:pt-56 md:pb-48 lg:pb-64 overflow-hidden relative min-h-screen flex items-center w-full">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-primary/25 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[40%] h-[40%] bg-blue-400/15 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-32 items-center">
          {isLoading ? (
            <div className="space-y-12 w-full">
              <Skeleton className="h-12 w-64 bg-white/10 rounded-full" />
              <div className="space-y-6">
                <Skeleton className="h-24 w-full bg-white/10 rounded-2xl" />
                <Skeleton className="h-24 w-4/5 bg-white/10 rounded-2xl" />
              </div>
              <Skeleton className="h-32 w-full bg-white/10 rounded-2xl" />
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16 text-center lg:text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 w-full">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/25 px-8 py-3.5 rounded-full text-white font-bold text-sm md:text-base uppercase tracking-[0.3em] mx-auto lg:mx-0 shadow-2xl transition-all hover:bg-white/20">
                <Sparkles className="h-6 w-6 text-blue-300 animate-pulse" />
                {heroData?.badge || "Premier Research Excellence"}
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-headline font-bold leading-[0.95] tracking-tight">
                {heroData?.title?.split(' ').slice(0, -1).join(' ') || "Scholarly Research"} <br className="hidden xl:block" />
                <span className="text-blue-400 italic block sm:inline">{heroData?.title?.split(' ').slice(-1) || "Perfected."}</span>
              </h1>
              
              <p className="text-xl md:text-3xl lg:text-4xl text-blue-100/85 max-w-4xl leading-relaxed font-light italic mx-auto lg:mx-0 border-l-4 border-white/10 pl-8 md:pl-12">
                {heroData?.subtitle || "Elite academic support for researchers who demand precision, integrity, and international publishing standards."}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 md:gap-10 pt-10">
                <Button 
                  onClick={handleGetQuote}
                  size="lg" 
                  className="w-full sm:w-auto rounded-[24px] px-16 h-22 md:h-26 text-2xl bg-white text-primary hover:bg-blue-50 shadow-[0_30px_60px_rgba(255,255,255,0.25)] font-bold flex gap-6 transition-all hover:-translate-y-2 active:scale-95"
                >
                  <MessageSquare className="h-8 w-8" /> Get Quote
                </Button>
                <Button 
                  onClick={handleEmailQuote}
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-[24px] px-16 h-22 md:h-26 text-2xl border-2 border-white/40 text-white hover:bg-white/10 font-bold bg-transparent flex gap-6 backdrop-blur-md transition-all hover:-translate-y-2 active:scale-95"
                >
                  <Mail className="h-8 w-8" /> Email Desk
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20 pt-20 md:pt-28 border-t border-white/15 text-center sm:text-left">
                {(heroData?.stats || [
                  { label: "Papers Published", value: "500+" },
                  { label: "Acceptance Rate", value: "98%" },
                  { label: "Expert Concierge", value: "24/7" }
                ]).map((stat: any, i: number) => (
                  <div key={i} className="space-y-3 md:space-y-5 group">
                    <div className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-headline font-bold group-hover:text-blue-400 transition-all duration-500 leading-none group-hover:scale-105 origin-left">{stat.value}</div>
                    <div className="text-[11px] md:text-sm lg:text-base text-blue-200/60 uppercase tracking-[0.4em] font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-28 lg:mt-0 relative flex justify-center w-full lg:block animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="relative z-10 w-full max-w-2xl lg:max-w-none">
              {isLoading ? (
                <Skeleton className="aspect-[4/5] w-full rounded-[60px] md:rounded-[80px] bg-white/5 border-[16px] md:border-[32px] border-white/5" />
              ) : (
                heroData?.image && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[60px] md:rounded-[90px] border-[16px] md:border-[32px] border-white/5 shadow-[0_80px_160px_rgba(0,0,0,0.7)] group">
                    <Image
                      src={heroData.image}
                      alt="Hero Visual"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  </div>
                )
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-primary/30 blur-[200px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
