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
    <section className="hero-gradient text-white pt-32 pb-20 md:pt-40 md:pb-24 lg:pb-32 overflow-hidden relative min-h-[85vh] flex items-center w-full">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-primary/25 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[40%] h-[40%] bg-blue-400/15 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {isLoading ? (
            <div className="space-y-8 w-full">
              <Skeleton className="h-10 w-64 bg-white/10 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-14 w-full bg-white/10 rounded-2xl" />
                <Skeleton className="h-14 w-4/5 bg-white/10 rounded-2xl" />
              </div>
              <Skeleton className="h-20 w-full bg-white/10 rounded-2xl" />
            </div>
          ) : (
            <div className="space-y-8 md:space-y-10 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/25 px-5 py-2 rounded-full text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em] mx-auto lg:mx-0 shadow-2xl">
                <Sparkles className="h-4 w-4 text-blue-300 animate-pulse" />
                {heroData?.badge || "Premier Research Excellence"}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] tracking-tight">
                {heroData?.title?.split(' ').slice(0, -1).join(' ') || "Scholarly Research"} <br className="hidden xl:block" />
                <span className="text-blue-400 italic block sm:inline">{heroData?.title?.split(' ').slice(-1) || "Perfected."}</span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-blue-100/85 max-w-2xl leading-relaxed font-light italic mx-auto lg:mx-0 border-l-4 border-white/10 pl-6 md:pl-8">
                {heroData?.subtitle || "Elite academic support for researchers who demand precision, integrity, and international publishing standards."}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                <Button 
                  onClick={handleGetQuote}
                  size="lg" 
                  className="w-full sm:w-auto rounded-xl px-8 h-14 text-base bg-white text-primary hover:bg-blue-50 shadow-xl font-bold flex gap-3 transition-all active:scale-95"
                >
                  <MessageSquare className="h-5 w-5" /> Get Quote
                </Button>
                <Button 
                  onClick={handleEmailQuote}
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-xl px-8 h-14 text-base border-2 border-white/40 text-white hover:bg-white/10 font-bold bg-transparent flex gap-3 backdrop-blur-md transition-all active:scale-95"
                >
                  <Mail className="h-5 w-5" /> Email Desk
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 pt-12 border-t border-white/15 text-center sm:text-left">
                {(heroData?.stats || [
                  { label: "Papers Published", value: "500+" },
                  { label: "Acceptance Rate", value: "98%" },
                  { label: "Expert Concierge", value: "24/7" }
                ]).map((stat: any, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="text-3xl md:text-4xl font-headline font-bold leading-none">{stat.value}</div>
                    <div className="text-[10px] md:text-xs text-blue-200/60 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 lg:mt-0 relative flex justify-center w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="relative z-10 w-full max-w-md xl:max-w-lg">
              {isLoading ? (
                <Skeleton className="aspect-[4/5] w-full rounded-[32px] bg-white/5" />
              ) : (
                heroData?.image && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] md:rounded-[48px] border-4 border-white/5 shadow-2xl group">
                    <Image
                      src={heroData.image}
                      alt="Hero Visual"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[150px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
