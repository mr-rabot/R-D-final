
"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  CheckCircle, 
  Zap, 
  Lock, 
  FileText, 
  ArrowRight,
  MessageSquare,
  Mail,
  X
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const trustIndicators = [
  { icon: GraduationCap, label: "PhD Experts", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: CheckCircle, label: "100% Original", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Zap, label: "Fast Delivery", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Lock, label: "Confidential", color: "text-slate-600", bg: "bg-slate-50" },
];

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [whatsapp, setWhatsapp] = useState("916209779365");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setServices(data.services || []);
        if (data.integrations?.whatsapp) setWhatsapp(data.integrations.whatsapp);
      })
      .catch(err => console.error(err));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleQuoteClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsQuoteDialogOpen(true);
  };

  const handleWhatsAppAction = () => {
    const message = encodeURIComponent(`Hi R&D Services, I am interested in a quote for your "${selectedService}" service for my academic project.`);
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
    setIsQuoteDialogOpen(false);
  };

  const handleEmailAction = () => {
    const subject = encodeURIComponent(`Quote Request: ${selectedService}`);
    const body = encodeURIComponent(`Hi R&D Services Team,\n\nI would like to request a professional quote for the following service: ${selectedService}.\n\nPlease let me know the requirements and timeline.\n\nBest regards.`);
    window.location.href = `mailto:support.rdservices@gmail.com?subject=${subject}&body=${body}`;
    setIsQuoteDialogOpen(false);
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-slate-50/50 overflow-hidden">
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-40">
          {trustIndicators.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center gap-6 text-center group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )} 
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={cn(
                "p-7 rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_rgba(0,71,255,0.15)]",
                item.bg, item.color
              )}>
                <item.icon className="h-9 w-9" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-28 space-y-6">
          <div className="inline-block bg-accent text-white text-[10px] uppercase tracking-[0.3em] font-bold px-7 py-2.5 rounded-full mb-2 shadow-xl shadow-accent/20">
            Our Expertise
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Comprehensive Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
            High-end research writing solutions tailored for global academic success and peer-review publication.
          </p>
        </div>

        <div className="relative px-6 sm:px-12 py-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6 md:-ml-10">
              {services.map((service, index) => {
                return (
                  <CarouselItem key={index} className="pl-6 md:pl-10 basis-full md:basis-1/2 lg:basis-1/3 py-8">
                    <Card className="border-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_90px_-20px_rgba(0,71,255,0.2)] transition-all duration-700 rounded-[45px] p-10 md:p-12 bg-white flex flex-col h-full group border-b-8 border-transparent hover:border-primary">
                      <CardHeader className="p-0 mb-10">
                        <div className="bg-primary/5 w-18 h-18 rounded-[25px] flex items-center justify-center text-primary mb-10 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-sm">
                          <FileText className="h-9 w-9" />
                        </div>
                        <CardTitle className="font-headline text-3xl text-accent mb-5 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-10 flex-grow">
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                          {service.description}
                        </p>
                        <div className="space-y-5">
                          {service.features.map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold uppercase tracking-wider">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <div className="pt-12 flex justify-between items-center">
                        <Button 
                          onClick={() => handleQuoteClick(service.title)}
                          variant="ghost" 
                          className="text-primary font-bold hover:bg-primary/5 rounded-xl px-4 flex gap-2"
                        >
                          Get Quote <ArrowRight className="h-4 w-4" />
                        </Button>
                        <div 
                          onClick={() => handleQuoteClick(service.title)}
                          className="p-4 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:flex"
                        >
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-12 gap-8 md:block">
              <CarouselPrevious className="static md:absolute md:-left-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-16 w-16 flex items-center justify-center rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all" />
              <CarouselNext className="static md:absolute md:-right-16 translate-y-0 bg-white border-none hover:bg-primary hover:text-white h-16 w-16 flex items-center justify-center rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[32px] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <DialogHeader className="p-10 pb-0">
            <DialogTitle className="text-3xl font-headline font-bold text-accent">Connect with Experts</DialogTitle>
            <DialogDescription className="text-slate-500 pt-2">
              How would you like to receive your professional quote for <span className="text-primary font-bold">"{selectedService}"</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="p-10 space-y-4">
            <Button 
              onClick={handleWhatsAppAction}
              className="w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-lg flex gap-4 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="h-6 w-6" /> Continue to WhatsApp
            </Button>
            <Button 
              onClick={handleEmailAction}
              variant="outline"
              className="w-full h-16 rounded-2xl border-2 border-slate-100 hover:border-primary text-slate-600 hover:text-primary font-bold text-lg flex gap-4 shadow-sm"
            >
              <Mail className="h-6 w-6" /> Send Official Email
            </Button>
          </div>
          <div className="p-6 bg-slate-50 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold border-t">
            Guaranteed Confidentiality & Scientific Rigor
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
