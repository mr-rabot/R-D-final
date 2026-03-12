
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Microscope, Database, FileText, Share2, ClipboardList, TrendingUp } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    title: "Research Design & Strategy",
    description: "Tailored methodologies for complex academic inquiries, ensuring robust results.",
    icon: Microscope,
    image: "service-1"
  },
  {
    title: "Advanced Data Analysis",
    description: "Expert statistical processing using R, Python, and specialized academic software.",
    icon: Database,
    image: "service-2"
  },
  {
    title: "Technical Writing",
    description: "Scholarly drafting and structural editing for journals and high-stakes theses.",
    icon: FileText,
    image: "service-3"
  },
  {
    title: "Publication Support",
    description: "End-to-end guidance through the rigorous peer-review and submission process.",
    icon: Share2,
    image: "service-1"
  },
  {
    title: "Grant Writing",
    description: "Developing compelling proposals for government and private research funding.",
    icon: ClipboardList,
    image: "service-2"
  },
  {
    title: "Citations & Compliance",
    description: "Meticulous referencing and adherence to global academic integrity standards.",
    icon: TrendingUp,
    image: "service-3"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold text-accent">Our Academic Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leverage world-class R&D expertise to elevate your research potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const imgData = PlaceHolderImages.find(img => img.id === service.image);
            const Icon = service.icon;
            
            return (
              <Card key={index} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl bg-background/50">
                <div className="relative h-48 overflow-hidden">
                  {imgData?.imageUrl && (
                    <Image
                      src={imgData.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={imgData.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/10 transition-colors" />
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-accent">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
