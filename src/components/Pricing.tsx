"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    description: "Essential support for basic academic reports and standard research needs.",
    features: [
      "Project Report",
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
  return (
    <section id="pricing" className="py-24 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-2">
            Service Packages
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent">Tailored Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the package that aligns with your research goals and academic requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col rounded-[32px] overflow-hidden transition-all duration-300 ${plan.highlight ? 'border-primary border-2 shadow-2xl scale-105 z-10 bg-white' : 'border border-slate-100 shadow-lg bg-white'}`}>
              {plan.highlight && plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <Badge className="bg-primary text-white px-6 py-1.5 rounded-full shadow-lg text-xs font-bold whitespace-nowrap border-none">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-left pt-12 px-8">
                <CardTitle className="text-2xl font-headline font-bold text-accent">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-4 h-10">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="flex-grow px-8 pt-8 border-t border-slate-50">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="rounded-full bg-green-50 p-0.5 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="p-8">
                <Button 
                  variant={plan.highlight ? "default" : "outline"} 
                  className={`w-full h-14 rounded-xl font-bold transition-all text-lg ${
                    plan.highlight 
                      ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20' 
                      : 'border-slate-200 text-accent hover:bg-slate-50'
                  }`}
                >
                  Get Quote
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}