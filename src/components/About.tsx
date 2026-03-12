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
          <div className="relative flex flex-col items-center justify-center">
            {/* Focused headshot focused only on the face */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 z-10 overflow-hidden rounded-full shadow-2xl border-[6px] md:border-[8px] border-slate-50">
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
            {/* Name and Designation Overlay */}
            <div className="mt-8 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 bg-primary p-5 md:p-6 rounded-2xl shadow-xl text-white min-w-[220px] z-20 text-center border-4 border-white lg:mb-[-20px]">
              <p className="text-base md:text-lg font-bold leading-tight">Om Prakash Sinha</p>
              <p className="text-[10px] uppercase tracking-widest font-bold mt-1 text-blue-100 opacity-90">Founder & Director</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

          <div className="space-y-8 text-center lg:text-left mt-8 lg:mt-0">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mx-auto lg:mx-0">
                Leadership
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent">About Our Leadership</h2>
              <p className="text-lg text-primary font-bold">Directing Excellence at R & D Services Pvt. Ltd.</p>
            </div>

            <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Under the visionary leadership of **Om Prakash Sinha**, R & D Services Pvt. Ltd. has grown into a premier destination for academic research and professional publishing support, serving scholars globally with dedicated expertise and absolute integrity.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: GraduationCap, label: "Academic Excellence", desc: "Expert research guidance" },
                { icon: BookOpen, label: "Global Publishing", desc: "Peer-reviewed success" },
                { icon: Award, label: "Strategic Leadership", desc: "Guiding R&D operations" },
                { icon: Search, label: "Methodology Expert", desc: "Specialist in research design" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 text-left">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-sm">{item.label}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg" 
                className="w-full sm:w-auto rounded-xl px-10 h-14 bg-black hover:bg-slate-900 text-white font-bold transition-all shadow-lg hover:shadow-black/20"
              >
                Connect with Om Prakash
              </Button>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-accent rounded-[32px] md:rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-headline font-bold leading-tight">Research Impact & <br className="hidden md:block" />Global Reach</h3>
              <p className="text-blue-100/80 leading-relaxed text-base md:text-lg">
                We build academic careers. Our systematic approach ensures your work meets the highest international standards of academic integrity and impact.
              </p>
              
              <div className="grid grid-cols-2 gap-8 justify-items-center lg:justify-items-start">
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-blue-200">Projects Delivered</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">120+</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-blue-200">Journal Partners</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center pt-6 border-t border-white/10">
                <div className="bg-white/10 p-3 rounded-full">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-sm">Global Collaboration Network</div>
                  <div className="text-xs text-blue-200">Connecting researchers across 40+ countries</div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 flex justify-center lg:block">
              <div className="relative w-full max-w-lg lg:max-w-none">
                {summaryImg?.imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-3xl">
                    <Image
                      src={summaryImg.imageUrl}
                      alt="Research Summary Visual"
                      fill
                      className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                      data-ai-hint={summaryImg.imageHint}
                    />
                  </div>
                )}
                <div className="absolute -inset-4 border border-white/10 rounded-[28px] md:rounded-[40px] pointer-events-none hidden sm:block" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[80px] md:blur-[100px] -z-0" />
          <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[80px] md:blur-[100px] -z-0" />
        </div>
      </div>
    </section>
  );
}