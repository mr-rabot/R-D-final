"use client";

import { Check, MessageSquare, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    description: "Essential support for standard academic reports and research projects.",
    features: [
      "Project Report",
      "PPT (10-15 Slides)",
      "Plagiarism Check (Basic)",
      "Standard Academic Formatting",
      "1 Revision Round",
      "3-5 Days Delivery Timeline"
    ],
    highlight: false
  },
  {
    name: "Professional",
    description: "Comprehensive support for advanced research articles and dissertations.",
    features: [
      "Full Synopsis Writing",
      "Literature Review Paper",
      "Research Article Drafting",
      "Dissertation Formatting",
      "Premium PPT (20+ Slides)",
      "Detailed Plagiarism Report",
      "5-8 Days Priority Delivery"
    ],
    highlight: true,
    badge: "Most Recommended"
  },
  {
    name: "Premium",
    description: "Elite end-to-end guidance for high-impact thesis and global publishing.",
    features: [
      "Full PhD Thesis Writing",
      "Everything in Professional & Basic",
      "Research Proposal Design",
      "Expert Journal Consultation",
      "Advanced Data Analysis",
      "Unlimited Revision Support",
      "24/7 Dedicated Support"
    ],
    highlight: false
  }
];

export function Pricing() {
  const handleWhatsAppQuote = (planName: string) => {
    const message = encodeURIComponent(`Hi R&D Services, I am interested in a quote for the ${planName} package for my academic project.`);
    window.open(`https://wa.me/916209779365?text=${message}`, '_blank');
  };

  const handleEmailQuote = (planName: string) => {
    window.location.href = `mailto:support.rdservices@gmail.com?subject=Quote Request: ${planName} Package`;
  };

  return (
    <section id="pricing" className="py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-400/5 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-2">
            <Sparkles className="h-3 w-3" />
            Strategic Investment Tiers
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Service Packages</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Transparent, performance-driven pricing designed to align with your academic timeline and research complexity.
          </p>
        </div>

        {/* Pricing Grid - 3 columns in one row for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-12">
          {plans.map((plan, index) => (
            <div key={index} className="relative flex">
              <Card 
                className={cn(
                  "relative flex flex-col rounded-[40px] transition-all duration-700 group animate-in fade-in slide-in-from-bottom-8 w-full",
                  plan.highlight 
                    ? "border-primary border-2 shadow-2xl shadow-primary/20 z-10 bg-white scale-105" 
                    : "border-slate-100 shadow-xl shadow-black/5 bg-white hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-[30]">
                    <Badge className="bg-primary text-white px-6 py-2 rounded-full shadow-2xl text-[10px] font-bold whitespace-nowrap border-none uppercase tracking-widest ring-4 ring-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pt-12 px-8">
                  <CardTitle className="text-2xl font-headline font-bold text-accent group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                  <div className="h-1 w-10 bg-primary/20 mx-auto mt-3 rounded-full group-hover:w-20 transition-all duration-500" />
                  <p className="text-sm text-slate-500 mt-5 leading-relaxed font-light min-h-[50px]">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-grow px-8 pt-8 border-t border-slate-50">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <div className="rounded-full bg-primary/10 p-1 shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-8 flex flex-col gap-3 bg-slate-50/30 rounded-b-[40px] group-hover:bg-white transition-colors">
                  <Button 
                    onClick={() => handleWhatsAppQuote(plan.name)}
                    variant={plan.highlight ? "default" : "outline"} 
                    className={cn(
                      "w-full h-14 rounded-2xl font-bold transition-all text-base flex gap-2 shadow-lg active:scale-95",
                      plan.highlight 
                        ? "bg-primary hover:bg-blue-600 text-white shadow-primary/20" 
                        : "border-slate-200 text-accent hover:bg-slate-50 hover:border-primary"
                    )}
                  >
                    <MessageSquare className="h-5 w-5" /> Get Quote
                  </Button>
                  <button 
                    onClick={() => handleEmailQuote(plan.name)}
                    className="text-slate-400 hover:text-primary transition-colors text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-1"
                  >
                    <Mail className="h-3 w-3" /> Request via Email
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Custom Project Note */}
        <div className="mt-24 text-center animate-in fade-in duration-1000 delay-500">
          <p className="text-slate-400 text-xs font-medium italic">
            * Have a specific or multi-disciplinary project? 
            <button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-primary font-bold ml-1 underline hover:text-blue-600 transition-colors"
            >
              Contact us for a tailored solution
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}