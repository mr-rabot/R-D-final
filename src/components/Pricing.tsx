"use client";

import { Check, MessageSquare, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    description: "Essential support for basic academic reports and standard research needs.",
    features: [
      "Project Report",
      "PPT (PowerPoint Presentation)",
      "Basic Plagiarism Check",
      "Standard Research",
      "Academic Formatting",
      "1 Revision Round",
      "3-5 Days Delivery"
    ],
    highlight: false
  },
  {
    name: "Professional",
    description: "Advanced support for comprehensive research papers and dissertation work.",
    features: [
      "Synopsis Writing",
      "Review Paper",
      "Research Article",
      "Dissertation Support",
      "PPT Presentation",
      "Plagiarism Report",
      "5-8 Days Delivery"
    ],
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Premium",
    description: "Complete end-to-end support for high-impact thesis and publication work.",
    features: [
      "Everything in Professional",
      "Full Thesis Writing",
      "Research Proposal",
      "Expert Consultation",
      "Priority 24/7 Support",
      "Unlimited Revisions",
      "Fast-Track Delivery"
    ],
    highlight: false
  }
];

export function Pricing() {
  const handleWhatsAppQuote = (planName: string) => {
    const message = encodeURIComponent(`Hi R&D Services, I am interested in a quote for the ${planName} package for my research project.`);
    window.open(`https://wa.me/916209779365?text=${message}`, '_blank');
  };

  const handleEmailQuote = (planName: string) => {
    window.location.href = `mailto:support.rdservices@gmail.com?subject=Quote Request: ${planName} Package`;
  };

  return (
    <section id="pricing" className="py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block bg-primary/10 text-primary text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-2">
            Investment Tiers
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Service Packages</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Transparent pricing designed to align with your academic timeline and research complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={cn(
                "relative flex flex-col rounded-[48px] overflow-hidden transition-all duration-700 group animate-in fade-in slide-in-from-bottom-8",
                plan.highlight 
                  ? "border-primary border-4 shadow-[0_40px_80px_rgba(0,71,255,0.15)] md:scale-110 z-10 bg-white" 
                  : "border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)] bg-white hover:shadow-2xl hover:-translate-y-2"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.highlight && plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <Badge className="bg-primary text-white px-8 py-2 rounded-full shadow-2xl text-xs font-bold whitespace-nowrap border-none uppercase tracking-widest animate-pulse">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pt-16 px-10">
                <CardTitle className="text-3xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                <p className="text-base text-slate-500 mt-6 leading-relaxed font-light min-h-[60px]">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="flex-grow px-10 pt-10 border-t border-slate-50">
                <ul className="space-y-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-base text-slate-600 font-medium">
                      <div className="rounded-full bg-primary/10 p-1 shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="p-10 flex flex-col gap-4">
                <Button 
                  onClick={() => handleWhatsAppQuote(plan.name)}
                  variant={plan.highlight ? "default" : "outline"} 
                  className={cn(
                    "w-full h-16 rounded-[22px] font-bold transition-all text-lg flex gap-3 shadow-xl",
                    plan.highlight 
                      ? "bg-primary hover:bg-primary/90 text-white hover:shadow-primary/30" 
                      : "border-slate-200 text-accent hover:bg-slate-50"
                  )}
                >
                  <MessageSquare className="h-6 w-6" /> Get Quote
                </Button>
                <button 
                  onClick={() => handleEmailQuote(plan.name)}
                  className="text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" /> Request via Email
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
