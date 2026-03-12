
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, BookOpen, GraduationCap, Quote, Search, Share2 } from "lucide-react";

export function About() {
  const expertImg = PlaceHolderImages.find(img => img.id === "lead-expert");
  const summaryImg = PlaceHolderImages.find(img => img.id === "summary-img");

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative flex justify-center">
            {/* Focused headshot focused only on the face */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10 overflow-hidden rounded-full shadow-2xl border-[8px] border-slate-50">
              {expertImg?.imageUrl && (
                <Image
                  src={expertImg.imageUrl}
                  alt="Om Prakash Sinha"
                  fill
                  className="object-cover"
                  data-ai-hint="man face"
                />
              )}
            </div>
            <div className="absolute -bottom-4 bg-primary p-6 rounded-2xl shadow-xl text-white max-w-[200px] z-20 hidden md:block text-center border-4 border-white">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Founder & Director</p>
              <p className="text-sm font-bold">Om Prakash Sinha</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full">
                Leadership
              </div>
              <h2 className="text-5xl font-headline font-bold text-accent">Om Prakash Sinha</h2>
              <p className="text-lg text-primary font-bold">Founder & Director, R & D Services Pvt. Ltd.</p>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg">
              Under the visionary leadership of Om Prakash Sinha, R & D Services Pvt. Ltd. has grown into a premier destination for academic research and professional publishing support, serving scholars globally with dedicated expertise and absolute integrity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: GraduationCap, label: "Academic Excellence", desc: "Expert research guidance" },
                { icon: BookOpen, label: "Global Publishing", desc: "Peer-reviewed success" },
                { icon: Award, label: "Strategic Leadership", desc: "Guiding R&D operations" },
                { icon: Search, label: "Methodology Expert", desc: "Specialist in research design" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-accent text-sm">{item.label}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                onClick={() => window.location.href = '#contact'}
                size="lg" 
                className="rounded-xl px-8 h-12 bg-black hover:bg-slate-900 text-white font-bold transition-all shadow-lg hover:shadow-black/20"
              >
                Connect with Me
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-accent rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl font-headline font-bold">Research Impact & <br />Global Reach</h3>
              <p className="text-blue-100/80 leading-relaxed text-lg">
                We build academic careers. Our systematic approach ensures your work meets the highest international standards of academic integrity and impact.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-blue-200">Projects Delivered</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">120+</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-blue-200">Journal Partners</div>
                </div>
              </div>

              <div className="flex gap-4 items-center pt-4 border-t border-white/10">
                <div className="bg-white/10 p-3 rounded-full">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-sm">Global Collaboration Network</div>
                  <div className="text-xs text-blue-200">Connecting researchers across 40+ countries</div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="relative">
                {summaryImg?.imageUrl && (
                  <Image
                    src={summaryImg.imageUrl}
                    alt="Research Summary Visual"
                    width={600}
                    height={400}
                    className="rounded-3xl shadow-3xl object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    data-ai-hint={summaryImg.imageHint}
                  />
                )}
                <div className="absolute -inset-4 border border-white/10 rounded-[40px] pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[100px] -z-0" />
        </div>
      </div>
    </section>
  );
}
