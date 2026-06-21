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
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className={cn(
        "w-full max-w-[1440px] mx-auto px-6 md:px-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>

        <div className="flex flex-col items-center mb-24 md:mb-32">
          <div className="relative flex flex-col items-center w-full">
            <div className={cn(
              "relative w-56 h-56 md:w-72 md:h-72 lg:w-[380px] lg:h-[380px] z-10 overflow-hidden rounded-full shadow-2xl border-[10px] md:border-[15px] border-white transition-all duration-1000 hover:scale-[1.02] bg-slate-50",
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
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
                  <Globe className="h-12 w-12" />
                </div>
              )}
            </div>

            <div className="mt-10 md:mt-12 text-center w-full">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-slate-900 tracking-tight mb-3">
                {founder?.name || "Om Prakash Sinha"}
              </h3>
              <div className="space-y-1.5 mb-10">
                <p className="text-xs md:text-sm lg:text-base uppercase tracking-[0.3em] font-bold text-primary/80">
                  {founder?.role || "Founder & Director"}
                </p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  R&D Services
                </p>
              </div>

              <div className="space-y-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-accent leading-[1.1] tracking-tight">
                  Precision <br />
                  <span className="text-primary italic text-2xl md:text-4xl lg:text-5xl">in Research</span>
                </h2>

                <div className="max-w-3xl mx-auto border-t border-slate-100 pt-10 mt-2">
                  <p className="text-lg md:text-xl lg:text-2xl text-slate-600 font-light leading-relaxed text-center italic px-4">
                    Under the expert guidance of <span className="font-semibold text-accent">{founder?.name || "Om Prakash Sinha"}</span>, we provide the rigorous methodology and academic integrity required for success in global publishing.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 rounded-full blur-[120px] md:blur-[180px] -z-10" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pt-20 w-full">
            {[
              { icon: ShieldCheck, label: "Ethical Integrity", desc: "Plagiarism-free" },
              { icon: Zap, label: "Rapid Synthesis", desc: "Expert literature" },
              { icon: Briefcase, label: "Research Legacy", desc: "500+ Initiatives" },
              { icon: GraduationCap, label: "PhD Support", desc: "Thesis Guidance" }
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center text-center p-6 md:p-8 lg:p-10 rounded-[32px] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group shadow-sm",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-primary/5 p-4 rounded-[20px] text-primary mb-5 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-accent text-base md:text-lg xl:text-xl mb-1 leading-tight">{item.label}</h4>
                <p className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-16">
            <Button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="rounded-full px-10 h-14 md:h-16 bg-accent hover:bg-slate-900 text-white font-bold transition-all shadow-xl hover:-translate-y-1 text-base md:text-lg"
            >
              Consult with Leadership
            </Button>
          </div>
        </div>

        <div className={cn(
          "bg-[#0a0f1c] rounded-[32px] md:rounded-[60px] p-8 md:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl border border-white/5 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        )}>
          <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 text-primary">
                <Globe className="h-5 w-5 animate-pulse" />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-blue-400">The R&D Standard</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-headline font-bold leading-tight tracking-tight">
                  {firmData?.title || "A Legacy of Academic Excellence"}
                </h3>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>

              <div className="space-y-8">
                <p className="text-blue-100/80 leading-relaxed text-base md:text-xl xl:text-2xl font-light italic border-l-4 border-primary/50 pl-5 md:pl-8">
                  {firmData?.description || "R&D Services provides a premier academic consulting platform dedicated to bridging the gap between innovative research and high-impact publishing."}
                </p>
                <div className="grid grid-cols-2 gap-6 md:gap-12">
                  {(firmData?.stats || [
                    { label: "Research Legacy", value: "500+" },
                    { label: "Elite Journals", value: "120+" }
                  ]).map((stat, i) => (
                    <div key={i} className="space-y-1 group">
                      <div className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-primary transition-all duration-500 leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest font-bold text-blue-300 opacity-60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0 w-full group">
              {displaySummaryImage && (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] md:rounded-[40px] shadow-2xl border border-white/10 bg-slate-800">
                  <Image
                    src={displaySummaryImage}
                    alt="Research and Development Overview"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    data-ai-hint={placeholderSummary?.imageHint || "research data"}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/40 to-transparent" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
