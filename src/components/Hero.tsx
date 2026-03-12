
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCounter } from "./StatsCounter";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ShieldCheck, FileCheck, Search } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-bg");

  return (
    <div className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold text-sm">
              <Badge variant="secondary" className="rounded-full px-2 py-0">New</Badge>
              Advanced Research Analysis Dashboard Available
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-accent leading-tight">
              Excellence in <br />
              <span className="text-primary">Academic R&D</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Precision-driven support for researchers, academics, and institutions. From complex data analysis to high-impact publishing strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-accent hover:bg-accent/90 shadow-lg">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-primary text-primary hover:bg-primary/5">
                View Portfolio
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <StatsCounter label="Projects" value={2500} suffix="+" />
              <StatsCounter label="Researchers" value={800} suffix="+" />
              <StatsCounter label="Success Rate" value={99} suffix="%" />
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5 relative">
            <div className="relative z-10 animate-float">
              <Image
                src={heroImage?.imageUrl || ""}
                alt={heroImage?.description || ""}
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl border-4 border-white object-cover aspect-[4/3]"
                data-ai-hint={heroImage?.imageHint}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl space-y-4 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-accent">100% Confidential</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-accent">Plagiarism-Free</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-3xl -z-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
