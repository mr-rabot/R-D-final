"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
  GraduationCap, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Briefcase
} from "lucide-react";

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
        
        {/* Leadership Profile Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="relative flex flex-col items-center animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Perfectly circular headshot with premium border */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] z-10 overflow-hidden rounded-full shadow-[0_40px_80px_rgba(0,71,255,0.15)] border-[12px] md:border-[16px] border-white transition-all duration-700 hover:scale-[1.02]">
              {founder?.image ? (
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <Globe className="h-20 w-20" />
                </div>
              )}
            </div>
            
            {/* Minimalist Name and Designation - CLEAN TEXT NO BOX */}
            <div className="mt-12 text-center space-y-3">
              <h3 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight">
                {founder?.name || "Om Prakash Sinha"}
              </h3>
              <p className="text-[12px] md:text-[14px] uppercase tracking-[0.5em] font-bold text-primary/80">
                {founder?.role || "Founder & Director"}
              </p>
              <div className="flex items-center justify-center gap-2 pt-2 opacity-40">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Verified Leadership</span>
              </div>
            </div>
            
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-[120px] -z-10" />
          </div>

          <div className="space-y-12 text-center animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="space-y-8 flex flex-col items-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary text-[10px] uppercase tracking-[0.4em] font-bold px-6 py-2.5 rounded-full shadow-sm border border-primary/20">
                Academic Stewardship
              </div>
              <h2 className="text-6xl md:text-8xl font-headline font-bold text-accent leading-[0.95] tracking-tight">
                Precision <br />
                <span className="text-primary/90 italic">in Research</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 font-light max-w-xl leading-relaxed mx-auto">
                Under the expert guidance of <span className="font-semibold text-accent">{founder?.name || "Om Prakash Sinha"}</span>, we provide the rigorous methodology and academic integrity required for success in global publishing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4 max-w-2xl mx-auto">
              {[
                { icon: ShieldCheck, label: "Ethical Integrity", desc: "Plagiarism-free guarantee" },
                { icon: Zap, label: "Rapid Synthesis", desc: "Expert literature review" },
                { icon: Briefcase, label: "Research Legacy", desc: "500+ Initiatives" },
                { icon: GraduationCap, label: "PhD Support", desc: "Thesis & Dissertation" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-6 rounded-[28px] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
                  <div className="bg-primary/5 p-4 rounded-2xl text-primary shrink-0 transition-transform group-hover:scale-110">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-accent text-sm mb-0.5">{item.label}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg" 
                className="w-full sm:w-auto rounded-2xl px-12 h-16 bg-accent hover:bg-slate-900 text-white font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95"
              >
                Consult with Leadership
              </Button>
            </div>
          </div>
        </div>

        {/* Firm Summary Template - Professional Profile Section */}
        <div className="bg-[#0a0f1c] rounded-[60px] md:rounded-[100px] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.3)] border border-white/5">
          <div className="relative z-10 lg:grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="flex items-center gap-3 text-primary">
                <Globe className="h-6 w-6" />
                <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-blue-400">R&D Services Pvt. Ltd.</span>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                  {firmData?.title || "A Legacy of Academic Excellence"}
                </h3>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
              
              <div className="space-y-8">
                <p className="text-blue-100/80 leading-relaxed text-lg md:text-xl font-light italic border-l-2 border-primary/50 pl-8">
                  {firmData?.description || "We provide a premier academic consulting platform dedicated to bridging the gap between innovative research and high-impact publishing. Our mission is to cultivate scholarly legacies through a methodology-first approach."}
                </p>
                <div className="grid grid-cols-2 gap-10">
                  {(firmData?.stats || [
                    { label: "Research Legacy", value: "500+" },
                    { label: "Elite Journals", value: "120+" }
                  ]).map((stat, i) => (
                    <div key={i} className="space-y-2 group">
                      <div className="text-5xl md:text-7xl font-headline font-bold text-primary transition-transform duration-500 group-hover:scale-110 origin-left">
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-300 opacity-60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 flex items-center gap-6 border-t border-white/10">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0a0f1c] bg-slate-800 overflow-hidden">
                      <Image 
                        src={`https://picsum.photos/seed/user${i}/100/100`} 
                        alt="User" 
                        width={100} 
                        height={100}
                        className="object-cover grayscale"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xs uppercase tracking-widest font-bold text-blue-200/50">
                  Trusted by 5000+ Scholars
                </div>
              </div>
            </div>

            <div className="relative mt-20 lg:mt-0">
              {summaryImg?.imageUrl && (
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[40px] shadow-3xl border border-white/10 group">
                  <Image
                    src={summaryImg.imageUrl}
                    alt="Firm Overview"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    data-ai-hint={summaryImg.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Metric Card inside image */}
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 hidden md:block">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-primary font-bold text-2xl">98% Success</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-blue-100">Journal Acceptance Rate</div>
                      </div>
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
              )}
              {/* Background Glows for summary */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
