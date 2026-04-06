
"use client";

import { useEffect, useState, useRef } from "react";
import { Check, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [whatsapp, setWhatsapp] = useState("916209779365");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setPlans(data.pricing || []);
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

  const handleQuoteClick = (planName: string) => {
    setSelectedPlan(planName);
    setIsQuoteDialogOpen(true);
  };

  const handleWhatsAppAction = () => {
    const message = encodeURIComponent(`Hi R&D Services, I am interested in a professional quote for the "${selectedPlan}" package for my academic project.`);
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
    setIsQuoteDialogOpen(false);
  };

  const handleEmailAction = () => {
    const subject = encodeURIComponent(`Quote Request: ${selectedPlan} Package`);
    const body = encodeURIComponent(`Hi R&D Services Team,\n\nI would like to request a professional quote for the following package: ${selectedPlan}.\n\nPlease let me know the process and documentation required.\n\nBest regards.`);
    window.location.href = `mailto:support.rdservices@gmail.com?subject=${subject}&body=${body}`;
    setIsQuoteDialogOpen(false);
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 bg-[#fcfcfc] relative overflow-hidden">
      <div className={cn(
        "w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <div className="inline-block bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2 rounded-full mb-2 shadow-lg shadow-primary/20">
            Investment Structure
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-accent tracking-tight leading-none">Service Packages</h2>
          <p className="text-slate-500 text-lg md:text-xl lg:text-2xl font-light italic max-w-3xl mx-auto">
            Elite academic support tiers designed for international publishing standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={cn(
                "relative flex h-full transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card 
                className={cn(
                  "relative flex flex-col rounded-[32px] md:rounded-[40px] transition-all duration-500 w-full border border-slate-100 bg-white group",
                  plan.highlight 
                    ? "ring-2 ring-primary shadow-2xl z-10 lg:-translate-y-4" 
                    : "shadow-xl hover:-translate-y-2"
                )}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-[40]">
                    <Badge className="bg-primary text-white px-8 py-2 rounded-full shadow-xl text-[10px] font-bold uppercase tracking-widest ring-4 ring-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pt-12 px-8 pb-6 text-center space-y-3">
                  <CardTitle className="text-2xl md:text-3xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed font-light italic border-b border-slate-50 pb-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-grow px-8 py-4">
                  <ul className="space-y-4">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-600 font-medium group/feat">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-1 transition-transform group-hover/feat:scale-110" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-8 mt-auto">
                  <Button 
                    onClick={() => handleQuoteClick(plan.name)}
                    variant={plan.highlight ? "default" : "outline"}
                    className={cn(
                      "w-full h-14 rounded-2xl font-bold flex gap-3 transition-all active:scale-95 text-lg border-2",
                      plan.highlight ? "bg-black text-white hover:bg-slate-900 border-black shadow-lg" : "border-slate-100 hover:border-primary hover:text-primary"
                    )}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="w-[90vw] sm:max-w-md rounded-[32px] border-none shadow-2xl p-0 overflow-hidden bg-white mx-auto">
          <DialogHeader className="p-8 pb-0 text-center">
            <DialogTitle className="text-3xl font-headline font-bold text-accent">Elite Consultation</DialogTitle>
            <DialogDescription className="text-slate-500 pt-4 text-base font-light italic">
              Secure a professional quote for the <span className="text-primary font-bold">"{selectedPlan}"</span> package from our academic board.
            </DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-4">
            <Button 
              onClick={handleWhatsAppAction}
              className="w-full h-16 rounded-[20px] bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-lg flex gap-3"
            >
              <MessageSquare className="h-6 w-6" /> WhatsApp Protocol
            </Button>
            <Button 
              onClick={handleEmailAction}
              variant="outline"
              className="w-full h-16 rounded-[20px] border-2 border-slate-100 hover:border-primary text-slate-600 hover:text-primary font-bold text-lg flex gap-3"
            >
              <Mail className="h-6 w-6" /> Email Submission
            </Button>
          </div>
          <div className="p-6 bg-slate-50 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold border-t">
            Guaranteed Scholarly Integrity • 24/7 Global Desk
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
