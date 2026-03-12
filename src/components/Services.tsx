"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Search, FileEdit, Send, CheckCircle, Award } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    title: "Manuscript Formatting",
    description: "Tailoring your paper to the specific layout and citation styles (APA, MLA, IEEE) of your target journal.",
    icon: FileEdit,
    image: "service-1"
  },
  {
    title: "Journal Recommendation",
    description: "Identifying high-impact factors and open-access journals that align with your research niche.",
    icon: Search,
    image: "service-2"
  },
  {
    title: "Peer Review Simulation",
    description: "Expert feedback from published researchers to address potential critiques before submission.",
    icon: CheckCircle,
    image: "service-3"
  },
  {
    title: "Abstract Optimization",
    description: "Refining your abstract and keywords to maximize indexing visibility and citation potential.",
    icon: BookOpen,
    image: "service-1"
  },
  {
    title: "Response to Reviewers",
    description: "Strategic assistance in addressing journal editor comments and navigating the revision cycle.",
    icon: Send,
    image: "service-2"
  },
  {
    title: "Plagiarism & Integrity Audit",
    description: "Comprehensive similarity reports and reference verification to ensure academic compliance.",
    icon: Award,
    image: "service-3"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold text-accent">Publishing Support Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions designed to navigate the complexities of academic publishing.
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
