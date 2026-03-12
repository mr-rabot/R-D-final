
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

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-white overflow-hidden">
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        
        {/* Leadership Profile Section */}
        <div className="flex flex-col items-center mb-40">
          <div className="relative flex flex-col items-center">
            {/* Circular Headshot with Premium Shadow */}
            <div className={cn(
              "relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] z-10 overflow-hidden rounded-full shadow-[0_40px_100px_rgba(0,71,255,0.15)] border-[12px] md:border-[16px] border-white transition-all duration-700 hover:scale-[1.02] bg-slate-50",
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            )}>
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
            
            {/* Center-aligned Name, Designation, and Company */}
            <div className="mt-12 text-center max-w-3xl">
              <h3 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight mb-3">
                {founder?.name || "Om Prakash Sinha"}
              </h3>
              <div className="space-y-1 mb-12">
                <p className="text-[11px] md:text-[13px] uppercase tracking-[0.4em] font-bold text-primary/80">
                  {founder?.role || "Founder & Director"}
                </p>
                <p className="text-[11px] md:text-[13px] uppercase tracking-[0.4em] font-bold text-slate-400">
                  R & D Services Pvt. Ltd.
                </p>
              </div>

              {/* Guiding Principle Heading */}
              <div className="space-y-10 flex flex-col items-center">
                <h2 className="text-5xl md:text-7xl font-headline font-bold text-accent leading-[0.95] tracking-tight mb-4">
                  Precision <br />
                  <span className="text-primary/90 italic text-4xl md:text-6xl">in Research</span>
                </h2>
                
                {/* Centered Descriptive Text */}
                <div className="max-w-3xl mx-auto border-t border-slate-100 pt-10 mt-2">
                  <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed text-center italic">
                    Under the expert guidance of <span className="font-semibold text-accent">{founder?.name || "Om Prakash Sinha"}</span>, we provide the rigorous methodology and academic integrity required for success in global publishing.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-[120px] -z-10" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 pt-28 w-full">
            {[
              { icon: ShieldCheck, label: "Ethical Integrity", desc: "Plagiarism-free" },
              { icon: Zap, label: "Rapid Synthesis", desc: "Expert literature" },
              { icon: Briefcase, label: "Research Legacy", desc: "500+ Initiatives" },
              { icon: GraduationCap, label: "PhD Support", desc: "Thesis Guidance" }
            ].map((item, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col items-center text-center p-10 rounded-[40px] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group shadow-sm",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-primary/5 p-4 rounded-2xl text-primary mb-5 transition-transform group-hover:scale-110">
                  <item.icon className="h-7 w-7" />
                </div>
                <h4 className="font-bold text-accent text-base mb-1">{item.label}</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-20">
            <Button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg" 
              className="rounded-2xl px-14 h-18 bg-accent hover:bg-slate-900 text-white font-bold transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 text-lg"
            >
              Consult with Leadership
            </Button>
          </div>
        </div>

        {/* Firm Summary Block with Deep Shadow */}
        <div className={cn(
          "bg-[#0a0f1c] rounded-[60px] md:rounded-[100px] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        )}>
          <div className="relative z-10 lg:grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="flex items-center gap-3 text-primary">
                <Globe className="h-6 w-6" />
                <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-blue-400">R & D Services Pvt. Ltd.</span>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                  {firmData?.title || "A Legacy of Academic Excellence"}
                </h3>
                <div className="h-2 w-24 bg-primary rounded-full" />
              </div>
              
              <div className="space-y-10">
                <p className="text-blue-100/80 leading-relaxed text-lg md:text-xl font-light italic border-l-2 border-primary/50 pl-10">
                  {firmData?.description || "R & D Services Pvt. Ltd. provides a premier academic consulting platform dedicated to bridging the gap between innovative research and high-impact publishing. Our mission is to cultivate scholarly legacies through a methodology-first approach."}
                </p>
                <div className="grid grid-cols-2 gap-12">
                  {(firmData?.stats || [
                    { label: "Research Legacy", value: "500+" },
                    { label: "Elite Journals", value: "120+" }
                  ]).map((stat, i) => (
                    <div key={i} className="space-y-3 group">
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

              <div className="pt-12 flex items-center gap-6 border-t border-white/10">
                <div className="text-xs uppercase tracking-widest font-bold text-blue-200/50">
                  Global Academic Reach & Impact
                </div>
              </div>
            </div>

            <div className="relative mt-24 lg:mt-0">
              {displaySummaryImage && (
                <div className="relative aspect-[16/12] w-full overflow-hidden rounded-[50px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 group bg-slate-800">
                  <Image
                    src={displaySummaryImage}
                    alt="Research and Development Overview"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    data-ai-hint={placeholderSummary?.imageHint || "research data"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-60" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
