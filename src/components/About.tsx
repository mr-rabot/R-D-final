"use client";

import { useEffect, useState, useRef } from "react";
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
import { cn } from "@/lib/utils";

interface LeadershipProfile {
  name: string;
  role: string;
  image: string;
}

interface FirmData {
  title: string;
  description: string;
  stats: { label: string, value: string }[];
  image?: string;
}

export function About() {
  const [founder, setFounder] = useState<LeadershipProfile | null>(null);
  const [firmData, setFirmData] = useState<FirmData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const placeholderSummary = PlaceHolderImages.find(img => img.id === "summary-img");
  const placeholderFounder = PlaceHolderImages.find(img => img.id === "lead-expert");

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.leadership?.founder) setFounder(data.leadership.founder);
        if (data.firmSummary) setFirmData(data.firmSummary);
      })
      .catch(err => console.error("Error fetching about data:", err));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displaySummaryImage = firmData?.image || placeholderSummary?.imageUrl;
  const displayFounderImage = founder?.image || placeholderFounder?.imageUrl;

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-40 bg-white overflow-hidden">
      <div className={cn(
        "w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        
        <div className="flex flex-col items-center mb-32 md:mb-56">
          <div className="relative flex flex-col items-center w-full">
            <div className={cn(
              "relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] z-10 overflow-hidden rounded-full shadow-[0_50px_120px_rgba(0,71,255,0.18)] border-[10px] md:border-[20px] border-white transition-all duration-700 hover:scale-[1.02] bg-slate-50",
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            )}>
              {displayFounderImage ? (
                <Image
                  src={displayFounderImage}
                  alt={founder?.name || "Om Prakash Sinha"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <Globe className="h-24 w-24" />
                </div>
              )}
            </div>
            
            <div className="mt-12 md:mt-20 text-center w-full">
              <h3 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-headline font-bold text-slate-900 tracking-tight mb-4">
                {founder?.name || "Om Prakash Sinha"}
              </h3>
              <div className="space-y-2 mb-12 md:mb-20">
                <p className="text-xs md:text-base xl:text-lg uppercase tracking-[0.5em] font-bold text-primary/80">
                  {founder?.role || "Founder & Director"}
                </p>
                <p className="text-[10px] md:text-sm xl:text-base uppercase tracking-[0.5em] font-bold text-slate-400">
                  R&D Services
                </p>
              </div>

              <div className="space-y-10 md:space-y-14 flex flex-col items-center">
                <h2 className="text-5xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-headline font-bold text-accent leading-[0.9] tracking-tight mb-6">
                  Precision <br />
                  <span className="text-primary/90 italic text-3xl md:text-7xl lg:text-9xl">in Research</span>
                </h2>
                
                <div className="max-w-5xl mx-auto border-t border-slate-100 pt-12 md:pt-16 mt-4">
                  <p className="text-xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-600 font-light leading-relaxed text-center italic">
                    Under the expert guidance of <span className="font-semibold text-accent">{founder?.name || "Om Prakash Sinha"}</span>, we provide the rigorous methodology and academic integrity required for success in global publishing.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl aspect-square bg-primary/5 rounded-full blur-[120px] md:blur-[180px] -z-10" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-24 md:pt-36 w-full">
            {[
              { icon: ShieldCheck, label: "Ethical Integrity", desc: "Plagiarism-free" },
              { icon: Zap, label: "Rapid Synthesis", desc: "Expert literature" },
              { icon: Briefcase, label: "Research Legacy", desc: "500+ Initiatives" },
              { icon: GraduationCap, label: "PhD Support", desc: "Thesis Guidance" }
            ].map((item, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col items-center text-center p-8 md:p-14 rounded-[40px] md:rounded-[60px] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 group shadow-sm",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-primary/5 p-4 md:p-6 rounded-[24px] text-primary mb-6 md:mb-8 transition-transform group-hover:scale-110">
                  <item.icon className="h-8 w-8 md:h-10 md:w-10" />
                </div>
                <h4 className="font-bold text-accent text-base md:text-xl xl:text-2xl mb-2">{item.label}</h4>
                <p className="text-[10px] md:text-xs xl:text-sm text-slate-400 uppercase font-bold tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-20 md:pt-32">
            <Button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg" 
              className="rounded-2xl px-12 md:px-20 h-16 md:h-22 bg-accent hover:bg-slate-900 text-white font-bold transition-all shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 text-xl md:text-2xl"
            >
              Consult with Leadership
            </Button>
          </div>
        </div>

        <div className={cn(
          "bg-[#0a0f1c] rounded-[50px] md:rounded-[120px] p-10 md:p-28 lg:p-40 text-white relative overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.6)] border border-white/5 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        )}>
          <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="space-y-10 md:space-y-16">
              <div className="flex items-center gap-4 text-primary">
                <Globe className="h-8 w-8" />
                <span className="text-xs md:text-base uppercase tracking-[0.6em] font-bold text-blue-400">R&D Services</span>
              </div>
              
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-headline font-bold leading-[1] tracking-tight">
                  {firmData?.title || "A Legacy of Academic Excellence"}
                </h3>
                <div className="h-2 w-20 md:w-32 bg-primary rounded-full" />
              </div>
              
              <div className="space-y-10 md:space-y-14">
                <p className="text-blue-100/80 leading-relaxed text-lg md:text-3xl xl:text-4xl font-light italic border-l-4 border-primary/50 pl-8 md:pl-14">
                  {firmData?.description || "R&D Services provides a premier academic consulting platform dedicated to bridging the gap between innovative research and high-impact publishing."}
                </p>
                <div className="grid grid-cols-2 gap-10 md:gap-20">
                  {(firmData?.stats || [
                    { label: "Research Legacy", value: "500+" },
                    { label: "Elite Journals", value: "120+" }
                  ]).map((stat, i) => (
                    <div key={i} className="space-y-2 md:space-y-4 group">
                      <div className="text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] font-headline font-bold text-primary transition-transform duration-500 group-hover:scale-110 origin-left leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[10px] md:text-xs lg:text-base xl:text-lg uppercase tracking-[0.4em] font-bold text-blue-300 opacity-60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-16 lg:mt-0 w-full">
              {displaySummaryImage && (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[40px] md:rounded-[70px] shadow-[0_50px_100px_rgba(0,0,0,0.7)] border border-white/10 group bg-slate-800">
                  <Image
                    src={displaySummaryImage}
                    alt="Research and Development Overview"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    data-ai-hint={placeholderSummary?.imageHint || "research data"}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-70" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
