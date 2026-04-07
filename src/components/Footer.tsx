
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageSquare } from "lucide-react";

export function Footer() {
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
      })
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  const whatsapp = siteData?.integrations?.whatsapp || "916209779365";
  const facebook = siteData?.integrations?.facebook;
  const instagram = siteData?.integrations?.instagram;
  const linkedin = siteData?.integrations?.linkedin;

  return (
    <footer className="bg-[#0a0f1c] text-white pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 md:space-y-8">
            <Link href="/" className="group inline-block">
              <div className="flex flex-col">
                <span className="font-headline text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-none uppercase">
                  R&D
                </span>
                <span className="text-[10px] lg:text-sm text-blue-200 font-bold uppercase tracking-[0.3em] mt-2 group-hover:text-primary transition-colors">
                  Services
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm md:text-xl xl:text-2xl font-light">
              Professional research writing and academic consulting services. Led by Om Prakash Sinha, we guarantee quality, originality, and timely delivery for R&DServices.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary transition-all group">
                  <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary transition-all group">
                  <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary transition-all group">
                  <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 md:space-y-10">
            <h4 className="text-lg lg:text-2xl font-bold">Quick Links</h4>
            <ul className="space-y-3 md:space-y-5 text-slate-400 text-sm lg:text-lg xl:text-xl">
              <li><Link href="/#services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6 md:space-y-10">
            <h4 className="text-lg lg:text-2xl font-bold">Our Services</h4>
            <ul className="space-y-3 md:space-y-5 text-slate-400 text-sm lg:text-lg xl:text-xl">
              <li>Research Papers</li>
              <li>Thesis Writing</li>
              <li>Dissertation Support</li>
              <li>Project Reports</li>
              <li>Literature Review</li>
              <li>Conference Papers</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 md:space-y-10">
            <h4 className="text-lg lg:text-2xl font-bold">Contact Info</h4>
            <ul className="space-y-6 md:space-y-8 text-slate-400 text-sm lg:text-lg xl:text-xl">
              <li className="flex flex-col gap-3 md:gap-4">
                <span className="text-white font-bold text-xl lg:text-3xl">Om Prakash Sinha</span>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium text-xs md:text-base">
                    <span className="text-primary font-bold">Phone:</span> +{whatsapp}
                  </div>
                  <div className="flex items-center gap-2 text-white font-medium text-xs md:text-base">
                    <span className="text-primary font-bold">Email:</span> support.rdservices@gmail.com
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest w-fit">
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                  24/7 Support Available
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-base text-slate-500 font-medium uppercase tracking-widest text-center md:text-left">
          <p>© 2025 R&DServices. All rights reserved.</p>
          <div className="flex gap-6 md:gap-10">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
