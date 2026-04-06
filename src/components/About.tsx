
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
    <section id="about" ref={sectionRef} className="py-24 md:py-48 lg:py-64 bg-white overflow-hidden">
      <div className={cn(
        "w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        
        <div className="flex flex-col items-center mb-40 md:mb-72">
          <div className="relative flex flex-col items-center w-full">
            <div className={cn(
              "relative w-80 h-80 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[750px] xl:h-[750px] 2xl:w-[900px] 2xl:h-[900px] z-10 overflow-hidden rounded-full shadow-[0_60px_150px_rgba(0,71,255,0.22)] border-[15px] md:border-[30px] border-white transition-all duration-1000 hover:scale-[1.03] bg-slate-50",
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
                  <Globe className="h-32 w-32" />
                </div>
              )}
            </div>
            
            <div className="mt-16 md:mt-28 text-center w-full">
              <h3 className="text-5xl md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[13rem] font-headline font-bold text-slate-900 tracking-tight mb-8">
                {founder?.name || "Om Prakash Sinha"}
              </h3>
              <div className="space-y-4 mb-16 md:mb-28">
                <p className="text-sm md:text-xl xl:text-2xl uppercase tracking-[0.6em] font-bold text-primary/80">
                  {founder?.role || "Founder & Director"}
                </p>
                <p className="text-xs md:text-base xl:text-lg uppercase tracking-[0.8em] font-bold text-slate-400">
                  Global Authority in R&D Services
                </p>
              </div>

              <div className="space-y-16 md:space-y-24 flex flex-col items-center">
                <h2 className="text-6xl md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-headline font-bold text-accent leading-[0.85] tracking-tight mb-8">
                  Precision <br />
                  <span className="text-primary italic text-4xl md:text-9xl xl:text-[10rem]">in Research</span>
                </h2>
                
                <div className="max-w-6xl mx-auto border-t border-slate-100 pt-16 md:pt-24 mt-4">
                  <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-600 font-light leading-relaxed text-center italic px-4">
                    Under the expert guidance of <span className="font-semibold text-accent">{founder?.name || "Om Prakash Sinha"}</span>, we provide the rigorous methodology and academic integrity required for success in global publishing.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl aspect-square bg-primary/5 rounded-full blur-[200px] md:blur-[250px] -z-10" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 pt-32 md:pt-48 w-full">
            {[
              { icon: ShieldCheck, label: "Ethical Integrity", desc: "Plagiarism-free" },
              { icon: Zap, label: "Rapid Synthesis", desc: "Expert literature" },
              { icon: Briefcase, label: "Research Legacy", desc: "500+ Initiatives" },
              { icon: GraduationCap, label: "PhD Support", desc: "Thesis Guidance" }
            ].map((item, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col items-center text-center p-12 md:p-20 rounded-[60px] md:rounded-[90px] bg-white border border-slate-100 hover:border-primary/25 hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.15)] transition-all duration-700 group shadow-sm",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-primary/5 p-6 md:p-10 rounded-[35px] text-primary mb-8 md:mb-12 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-xl">
                  <item.icon className="h-10 w-10 md:h-14 md:w-14" />
                </div>
                <h4 className="font-bold text-accent text-xl md:text-3xl xl:text-4xl mb-4 leading-tight">{item.label}</h4>
                <p className="text-xs md:text-sm xl:text-base text-slate-400 uppercase font-bold tracking-[0.3em]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-28 md:pt-48">
            <Button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg" 
              className="rounded-[32px] px-16 md:px-28 h-20 md:h-28 bg-accent hover:bg-slate-900 text-white font-bold transition-all shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2 active:scale-95 text-2xl md:text-4xl"
            >
              Consult with Leadership
            </Button>
          </div>
        </div>

        <div className={cn(
          "bg-[#0a0f1c] rounded-[60px] md:rounded-[150px] p-12 md:p-36 lg:p-56 text-white relative overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.7)] border border-white/5 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        )}>
          <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
            <div className="space-y-12 md:space-y-20">
              <div className="flex items-center gap-6 text-primary">
                <Globe className="h-10 w-10 animate-pulse" />
                <span className="text-sm md:text-xl uppercase tracking-[0.8em] font-bold text-blue-400">The R&D Standard</span>
              </div>
              
              <div className="space-y-8 md:space-y-12">
                <h3 className="text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] font-headline font-bold leading-[0.95] tracking-tight">
                  {firmData?.title || "A Legacy of Academic Excellence"}
                </h3>
                <div className="h-3 w-40 md:w-64 bg-primary rounded-full shadow-2xl" />
              </div>
              
              <div className="space-y-14 md:space-y-20">
                <p className="text-blue-100/85 leading-relaxed text-xl md:text-4xl xl:text-5xl font-light italic border-l-8 border-primary/50 pl-10 md:pl-20">
                  {firmData?.description || "R&D Services provides a premier academic consulting platform dedicated to bridging the gap between innovative research and high-impact publishing."}
                </p>
                <div className="grid grid-cols-2 gap-12 md:gap-32">
                  {(firmData?.stats || [
                    { label: "Research Legacy", value: "500+" },
                    { label: "Elite Journals", value: "120+" }
                  ]).map((stat, i) => (
                    <div key={i} className="space-y-4 md:space-y-8 group">
                      <div className="text-6xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-headline font-bold text-primary transition-all duration-700 group-hover:scale-115 origin-left leading-none">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm lg:text-xl xl:text-2xl uppercase tracking-[0.5em] font-bold text-blue-300 opacity-60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-20 lg:mt-0 w-full group">
              {displaySummaryImage && (
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[60px] md:rounded-[100px] shadow-[0_60px_120px_rgba(0,0,0,0.8)] border border-white/10 bg-slate-800">
                  <Image
                    src={displaySummaryImage}
                    alt="Research and Development Overview"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    data-ai-hint={placeholderSummary?.imageHint || "research data"}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-60 transition-opacity duration-1000 group-hover:opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     <div className="bg-primary/90 backdrop-blur-xl px-12 py-5 rounded-full text-white font-bold text-2xl uppercase tracking-[0.4em] shadow-2xl">Perspective</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
