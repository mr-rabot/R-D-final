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
        "w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold text-accent tracking-tight">Service Packages</h2>
          <p className="text-slate-500 text-base md:text-xl font-light">Choose the plan that fits your research needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={cn(
                "relative flex h-full transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card 
                className={cn(
                  "relative flex flex-col rounded-[32px] transition-all duration-700 w-full border border-slate-100 bg-white",
                  plan.highlight 
                    ? "ring-2 ring-primary shadow-[0_40px_80px_-15px_rgba(0,71,255,0.15)] z-10 lg:-translate-y-4" 
                    : "shadow-xl hover:shadow-2xl hover:-translate-y-2"
                )}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-[40]">
                    <Badge className="bg-primary text-white px-6 md:px-8 py-1.5 rounded-full shadow-lg text-[8px] md:text-[10px] font-bold whitespace-nowrap uppercase tracking-widest ring-4 ring-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pt-10 md:pt-12 px-6 md:px-8 pb-4 text-center">
                  <CardTitle className="text-2xl md:text-4xl font-headline font-bold text-accent">{plan.name}</CardTitle>
                  <p className="text-[13px] md:text-sm text-slate-500 mt-3 md:mt-4 leading-relaxed font-light min-h-[40px]">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-grow px-6 md:px-8 py-4">
                  <ul className="space-y-4">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 md:gap-4 text-sm md:text-base text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-6 md:p-8 mt-auto">
                  <Button 
                    onClick={() => handleQuoteClick(plan.name)}
                    variant={plan.highlight ? "default" : "outline"}
                    className={cn(
                      "w-full h-14 md:h-16 rounded-xl font-bold flex gap-3 transition-all active:scale-95 text-base md:text-lg border-2",
                      plan.highlight ? "bg-black text-white hover:bg-slate-900 border-black shadow-lg" : "border-slate-100 hover:border-primary hover:text-primary"
                    )}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="w-[90vw] sm:max-w-md rounded-[32px] border-none shadow-2xl p-0 overflow-hidden bg-white mx-auto">
          <DialogHeader className="p-8 md:p-10 pb-0 text-center">
            <DialogTitle className="text-2xl md:text-3xl font-headline font-bold text-accent">Professional Consultation</DialogTitle>
            <DialogDescription className="text-slate-500 pt-3 text-sm md:text-base">
              Select your preferred channel to receive a custom quote for the <span className="text-primary font-bold">"{selectedPlan}"</span> package.
            </DialogDescription>
          </DialogHeader>
          <div className="p-8 md:p-10 space-y-4">
            <Button 
              onClick={handleWhatsAppAction}
              className="w-full h-14 md:h-16 rounded-2xl bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-base md:text-lg flex gap-3 md:gap-4 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="h-5 w-5 md:h-6 md:w-6" /> WhatsApp Inquiry
            </Button>
            <Button 
              onClick={handleEmailAction}
              variant="outline"
              className="w-full h-14 md:h-16 rounded-2xl border-2 border-slate-100 hover:border-primary text-slate-600 hover:text-primary font-bold text-base md:text-lg flex gap-3 md:gap-4 shadow-sm"
            >
              <Mail className="h-5 w-5 md:h-6 md:w-6" /> Email Proposal Request
            </Button>
          </div>
          <div className="p-5 md:p-6 bg-slate-50 text-center text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold border-t">
            Expert R&D Support • Guaranteed Confidentiality
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
