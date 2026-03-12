"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Submission Ready",
    price: "$199",
    description: "Perfect for final polish before clicking 'Submit'.",
    features: [
      "Plagiarism Check",
      "Format Alignment",
      "Reference Verification",
      "Cover Letter Template",
      "48-Hour Delivery"
    ],
    highlight: false
  },
  {
    name: "Impact Max",
    price: "$549",
    description: "Deep content review for high-impact factor journals.",
    features: [
      "Technical Editing",
      "Internal Peer Review",
      "Journal Recommendations",
      "Abstract Rewrite",
      "Response Letter Support",
      "Impact Factor Targeting"
    ],
    highlight: true
  },
  {
    name: "Research Hub",
    price: "Custom",
    description: "Full partnership for labs and research institutions.",
    features: [
      "Unlimited Manuscript Audit",
      "In-House Training",
      "Grant Linkage Analysis",
      "Conference Presentation Prep",
      "Dedicated Publishing Agent",
      "Institutional Dashboard"
    ],
    highlight: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold text-accent">Flexible Publishing Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the level of support your research paper deserves.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${plan.highlight ? 'border-primary border-2 shadow-2xl scale-105 z-10' : 'border-none shadow-lg'}`}>
              {plan.highlight && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-xl bg-primary px-4 py-1">Recommended</Badge>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-headline text-accent">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/paper</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-4">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow pt-4">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8">
                <Button variant={plan.highlight ? "default" : "outline"} className={`w-full h-12 rounded-full ${plan.highlight ? 'bg-accent' : 'border-primary text-primary hover:bg-primary/5'}`}>
                  Select Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
