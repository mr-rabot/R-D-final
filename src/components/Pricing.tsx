"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    price: "₹500",
    description: "Perfect for short assignments and essays",
    features: [
      "Up to 1000 words",
      "Basic research",
      "Project Report & PPT",
      "Standard formatting",
      "3 days delivery",
      "1 revision",
      "Plagiarism report"
    ],
    highlight: false
  },
  {
    name: "Professional",
    price: "₹800",
    description: "Ideal for research papers and reports",
    features: [
      "Up to 2500 words",
      "In-depth research",
      "Synopsis & Review Paper",
      "Article & Dissertation",
      "Advanced formatting",
      "5 days delivery",
      "3 revisions",
      "Plagiarism report",
      "Bibliography included"
    ],
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Premium",
    price: "₹1200",
    description: "For thesis and dissertations",
    features: [
      "Unlimited words",
      "Comprehensive research",
      "Expert consultation",
      "Flexible timeline",
      "Unlimited revisions",
      "Plagiarism report",
      "Priority support",
      "All services included"
    ],
    highlight: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent">Affordable Packages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the plan that fits your needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col rounded-[32px] overflow-hidden transition-all duration-300 ${plan.highlight ? 'border-primary border-2 shadow-2xl scale-105 z-10' : 'border border-slate-100 shadow-lg'}`}>
              {plan.highlight && plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <Badge className="bg-primary text-white px-6 py-1.5 rounded-full shadow-lg text-xs font-bold whitespace-nowrap">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-left pt-12 px-8">
                <CardTitle className="text-2xl font-headline font-bold text-accent">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-4 h-10">{plan.description}</p>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-accent">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/ page</span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow px-8 pt-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="rounded-full bg-green-50 p-0.5 shrink-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="p-8">
                <Button 
                  variant={plan.highlight ? "default" : "outline"} 
                  className={`w-full h-12 rounded-xl font-bold transition-all ${
                    plan.highlight 
                      ? 'bg-accent hover:bg-black text-white' 
                      : 'border-slate-200 text-accent hover:bg-slate-50'
                  }`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
