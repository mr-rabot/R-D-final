
"use client";

import { useEffect, useState } from "react";
import { Check, MessageSquare, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => setPlans(data.pricing))
      .catch(err => console.error(err));
  }, []);

  const handleWhatsAppQuote = (planName: string) => {
    const message = encodeURIComponent(`Hi R&D Services, I am interested in a quote for the ${planName} package for my academic project.`);
    window.open(`https://wa.me/916209779365?text=${message}`, '_blank');
  };

  const handleEmailQuote = (planName: string) => {
    window.location.href = `mailto:support.rdservices@gmail.com?subject=Quote Request: ${planName} Package`;
  };

  return (
    <section id="pricing" className="py-32 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-2">
            <Sparkles className="h-3 w-3" />
            Strategic Investment Tiers
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Service Packages</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch pt-12">
          {plans.map((plan, index) => (
            <div key={index} className="relative flex h-full">
              <Card 
                className={cn(
                  "relative flex flex-col rounded-[40px] transition-all duration-700 group w-full border-none",
                  plan.highlight 
                    ? "bg-white premium-shadow z-10 lg:scale-105" 
                    : "bg-white shadow-xl hover:-translate-y-2"
                )}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-[40]">
                    <Badge className="bg-primary text-white px-8 py-2.5 rounded-full shadow-lg text-[10px] font-bold whitespace-nowrap uppercase tracking-widest ring-8 ring-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pt-14 px-8">
                  <CardTitle className="text-2xl font-headline font-bold text-accent">{plan.name}</CardTitle>
                  <p className="text-sm text-slate-500 mt-6 leading-relaxed font-light">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-grow px-10 pt-8">
                  <ul className="space-y-5">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-10 flex flex-col gap-4">
                  <Button 
                    onClick={() => handleWhatsAppQuote(plan.name)}
                    className={cn(
                      "w-full h-16 rounded-2xl font-bold flex gap-3",
                      plan.highlight ? "bg-primary text-white" : "variant-outline"
                    )}
                  >
                    <MessageSquare className="h-5 w-5" /> Get Quote
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
