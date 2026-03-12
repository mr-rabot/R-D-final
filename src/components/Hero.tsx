"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, MessageSquare, Sparkles } from "lucide-react";

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
    <section className="hero-gradient text-white pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8 md:space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-white font-medium text-[10px] md:text-xs mx-auto lg:mx-0">
              <Sparkles className="h-3 w-3" />
              Professional Research Writing Services
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight">
              Expert Research <br className="hidden md:block" />
              Papers, Thesis & <br className="hidden md:block" />
              Reports Writing
            </h1>
            
            <p className="text-lg md:text-xl text-blue-50/80 max-w-xl leading-relaxed font-light mx-auto lg:mx-0">
              We provide high-quality, plagiarism-free research papers, thesis, dissertations, and project reports tailored to your academic needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button 
                onClick={handleWhatsAppQuote}
                size="lg" 
                className="w-full sm:w-auto rounded-xl px-8 md:px-10 h-14 text-lg bg-white text-blue-700 hover:bg-blue-50 shadow-xl font-bold flex gap-2"
              >
                <MessageSquare className="h-5 w-5" /> Get Quote
              </Button>
              <Button 
                onClick={handleEmailQuote}
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto rounded-xl px-8 md:px-10 h-14 text-lg border-2 border-white text-white hover:bg-white/10 font-bold bg-transparent flex gap-2"
              >
                <Mail className="h-5 w-5" /> Email Us
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-12 border-t border-white/10 text-center sm:text-left">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-headline font-bold">500+</div>
                <div className="text-[10px] text-blue-100/70 uppercase tracking-widest font-medium">Projects Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-headline font-bold">98%</div>
                <div className="text-[10px] text-blue-100/70 uppercase tracking-widest font-medium">Client Satisfaction</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-headline font-bold">24/7</div>
                <div className="text-[10px] text-blue-100/70 uppercase tracking-widest font-medium">Support Available</div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 relative flex justify-center lg:block">
            <div className="relative z-10 w-full max-w-lg lg:max-w-none">
              {heroImage?.imageUrl ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] md:rounded-[40px] border-[8px] md:border-[12px] border-white/5 shadow-2xl">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description || "Researcher working at desk"}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                  />
                </div>
              ) : null}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}