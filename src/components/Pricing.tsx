
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
    <section id="pricing" ref={sectionRef} className="py-24 md:py-40 lg:py-56 bg-[#fcfcfc] relative overflow-hidden">
      <div className={cn(
        "w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="text-center mb-24 md:mb-32 space-y-6">
          <div className="inline-block bg-primary text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-4 shadow-xl shadow-primary/20">
            Investment Structure
          </div>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-headline font-bold text-accent tracking-tight leading-none">Service Packages</h2>
          <p className="text-slate-500 text-lg md:text-2xl lg:text-3xl font-light italic max-w-4xl mx-auto">
            Elite academic support tiers designed for international publishing standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={cn(
                "relative flex h-full transition-all duration-1000",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card 
                className={cn(
                  "relative flex flex-col rounded-[40px] md:rounded-[50px] transition-all duration-700 w-full border border-slate-100 bg-white group",
                  plan.highlight 
                    ? "ring-2 ring-primary shadow-[0_50px_100px_-15px_rgba(0,71,255,0.18)] z-10 lg:-translate-y-6" 
                    : "shadow-2xl hover:shadow-primary/5 hover:-translate-y-3"
                )}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-[40]">
                    <Badge className="bg-primary text-white px-10 py-2.5 rounded-full shadow-2xl text-[10px] md:text-xs font-bold whitespace-nowrap uppercase tracking-[0.3em] ring-8 ring-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pt-16 md:pt-20 px-8 md:px-12 pb-8 text-center space-y-4">
                  <CardTitle className="text-3xl md:text-5xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed font-light italic min-h-[60px] border-b border-slate-50 pb-6">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-grow px-8 md:px-12 py-6">
                  <ul className="space-y-6">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 text-base md:text-lg text-slate-600 font-medium group/feat">
                        <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-1 transition-transform group-hover/feat:scale-125" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-10 md:p-14 mt-auto">
                  <Button 
                    onClick={() => handleQuoteClick(plan.name)}
                    variant={plan.highlight ? "default" : "outline"}
                    className={cn(
                      "w-full h-18 md:h-22 rounded-2xl font-bold flex gap-4 transition-all active:scale-95 text-xl border-2",
                      plan.highlight ? "bg-black text-white hover:bg-slate-900 border-black shadow-2xl shadow-black/20" : "border-slate-100 hover:border-primary hover:text-primary"
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
        <DialogContent className="w-[95vw] sm:max-w-xl rounded-[40px] border-none shadow-2xl p-0 overflow-hidden bg-white mx-auto">
          <DialogHeader className="p-10 md:p-14 pb-0 text-center">
            <DialogTitle className="text-3xl md:text-5xl font-headline font-bold text-accent leading-tight">Elite Consultation</DialogTitle>
            <DialogDescription className="text-slate-500 pt-6 text-lg md:text-xl font-light italic">
              Secure a professional quote for the <span className="text-primary font-bold">"{selectedPlan}"</span> package from our academic board.
            </DialogDescription>
          </DialogHeader>
          <div className="p-10 md:p-14 space-y-6">
            <Button 
              onClick={handleWhatsAppAction}
              className="w-full h-18 md:h-22 rounded-[24px] bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-xl flex gap-4 shadow-2xl shadow-emerald-500/20"
            >
              <MessageSquare className="h-7 w-7" /> WhatsApp Protocol
            </Button>
            <Button 
              onClick={handleEmailAction}
              variant="outline"
              className="w-full h-18 md:h-22 rounded-[24px] border-2 border-slate-100 hover:border-primary text-slate-600 hover:text-primary font-bold text-xl flex gap-4 shadow-md"
            >
              <Mail className="h-7 w-7" /> Email Submission
            </Button>
          </div>
          <div className="p-6 md:p-8 bg-slate-50 text-center text-xs text-slate-400 uppercase tracking-[0.4em] font-bold border-t">
            Guaranteed Scholarly Integrity • 24/7 Global Desk
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
