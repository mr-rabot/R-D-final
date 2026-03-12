"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, BookOpen, GraduationCap, Search, Share2, CheckCircle2, Globe } from "lucide-react";

interface LeadershipProfile {
  name: string;
  role: string;
  image: string;
}

interface FirmData {
  title: string;
  description: string;
  stats: { label: string, value: string }[];
}

export function About() {
  const [founder, setFounder] = useState<LeadershipProfile | null>(null);
  const [firmData, setFirmData] = useState<FirmData | null>(null);
  const summaryImg = PlaceHolderImages.find(img => img.id === "summary-img");

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        if (data.founder) setFounder(data.founder);
        if (data.firmSummary) setFirmData(data.firmSummary);
      })
      .catch(err => console.error("Error fetching about data:", err));
  }, []);

  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Leadership Section */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="relative flex flex-col items-center animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Perfectly circular headshot */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[480px] md:h-[480px] z-10 overflow-hidden rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.12)] border-[12px] md:border-[16px] border-white transition-all duration-700 hover:scale-[1.01]">
              {founder?.image && (
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            {/* Minimalist Name and Designation - CLEAN TEXT NO BOX */}
            <div className="mt-8 text-center space-y-2">
              <h3 className="text-3xl md:text-5xl font-headline font-bold text-slate-900 leading-tight">
                {founder?.name || "Om Prakash Sinha"}
              </h3>
              <p className="text-[12px] md:text-[14px] uppercase tracking-[0.4em] font-bold text-primary">
                {founder?.role || "Founder & Director"}
              </p>
              <div className="flex items-center justify-center gap-2 pt-2 opacity-60">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Verified Leadership</span>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
          </div>

          <div className="space-y-10 text-center lg:text-left mt-16 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2.5 rounded-full mx-auto lg:mx-0 shadow-sm">
                Strategic Guidance
              </div>
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-tight">Scholarly <br />Success</h2>
              <p className="text-xl text-primary font-bold">Bridging Innovation with High-Impact Publishing</p>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-light max-w-2xl mx-auto lg:mx-0">
              Under the expert stewardship of **{founder?.name || "Om Prakash Sinha"}**, our firm provides the precision and integrity required to navigate the complexities of global academic standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { icon: GraduationCap, label: "Academic Integrity", desc: "100% original research" },
                { icon: BookOpen, label: "Global Standards", desc: "Peer-reviewed excellence" },
                { icon: Award, label: "Expert Oversight", desc: "Directing quality control" },
                { icon: Search, label: "Methodology First", desc: "Rigorous research design" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-[24px] bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100 group">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shrink-0 transition-transform group-hover:rotate-12">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-accent text-base mb-1">{item.label}</h4>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest opacity-60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 flex justify-center lg:justify-start">
              <Button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg" 
                className="w-full sm:w-auto rounded-2xl px-12 h-16 bg-accent hover:bg-slate-900 text-white font-bold transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 text-lg"
              >
                Inquire with Leadership
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Firm Summary & Impact Section */}
        <div className="bg-accent rounded-[60px] md:rounded-[80px] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_rgba(0,71,255,0.2)] animate-in fade-in duration-1000">
          <div className="relative z-10 lg:grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-primary mb-2">
                  <Globe className="h-5 w-5" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-300">R&D Services Pvt. Ltd.</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                  {firmData?.title || "Bridging the Gap to Academic Excellence"}
                </h3>
                
                {/* Firm Summary Paragraph */}
                <div className="space-y-6">
                  <p className="text-blue-100/80 leading-relaxed text-lg md:text-xl font-light italic border-l-4 border-primary pl-6">
                    {firmData?.description || "R & D Services Pvt. Ltd. is a premier academic consulting firm dedicated to transforming complex research into scholarly legacies. We combine systematic methodology with global publishing standards to ensure every manuscript achieves its maximum potential."}
                  </p>
                  <p className="text-blue-100/60 text-sm md:text-base leading-relaxed max-w-xl">
                    Our firm operates on the principles of academic rigor and absolute confidentiality, providing a trusted platform for researchers across 40+ countries to refine their contributions to science and the humanities.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-12 justify-items-center lg:justify-items-start pt-6">
                  {(firmData?.stats || [
                    { label: "Global Initiatives", value: "500+" },
                    { label: "Elite Journals", value: "120+" }
                  ]).map((stat, i) => (
                    <div key={i} className="space-y-2 group cursor-default">
                      <div className="text-5xl md:text-7xl font-headline font-bold text-primary transition-all duration-500 group-hover:scale-110">
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center pt-10 border-t border-white/10">
                  <div className="bg-primary p-4 rounded-full shadow-lg animate-pulse">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-bold text-lg mb-1">International Research Network</div>
                    <div className="text-[10px] uppercase tracking-widest text-blue-300/60 font-bold">Trusted by Scholars Worldwide</div>
                  </div>
                </div>
            </div>

            <div className="mt-16 lg:mt-0 flex justify-center lg:block group">
              <div className="relative w-full max-w-xl lg:max-w-none">
                {summaryImg?.imageUrl && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[40px] shadow-3xl border-8 border-white/5 transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={summaryImg.imageUrl}
                      alt="Research Summary Visual"
                      fill
                      className="object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                      data-ai-hint={summaryImg.imageHint}
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full -z-0" />
        </div>
      </div>
    </section>
  );
}
