"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Footer() {
  const [whatsapp, setWhatsapp] = useState("916209779365");

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        if (data.integrations?.whatsapp) setWhatsapp(data.integrations.whatsapp);
      })
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  return (
    <footer className="bg-[#0a0f1c] text-white pt-32 pb-16">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="group inline-block">
              <div className="flex flex-col">
                <span className="font-headline text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none uppercase">
                  R&D
                </span>
                <span className="text-xs lg:text-sm text-blue-200 font-bold uppercase tracking-[0.3em] mt-2 group-hover:text-primary transition-colors">
                  Services
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-base lg:text-xl xl:text-2xl font-light">
              Professional research writing and academic consulting services. Led by Om Prakash Sinha, we guarantee quality, originality, and timely delivery for R&DServices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-10">
            <h4 className="text-xl lg:text-2xl font-bold">Quick Links</h4>
            <ul className="space-y-5 text-slate-400 text-base lg:text-lg xl:text-xl">
              <li><Link href="#services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-10">
            <h4 className="text-xl lg:text-2xl font-bold">Our Services</h4>
            <ul className="space-y-5 text-slate-400 text-base lg:text-lg xl:text-xl">
              <li>Research Papers</li>
              <li>Thesis Writing</li>
              <li>Dissertation Support</li>
              <li>Project Reports</li>
              <li>Literature Review</li>
              <li>Conference Papers</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            <h4 className="text-xl lg:text-2xl font-bold">Contact Info</h4>
            <ul className="space-y-8 text-slate-400 text-base lg:text-lg xl:text-xl">
              <li className="flex flex-col gap-4">
                <span className="text-white font-bold text-2xl lg:text-3xl">Om Prakash Sinha</span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <span className="text-primary font-bold">Phone:</span> +{whatsapp}
                  </div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <span className="text-primary font-bold">Email:</span> support.rdservices@gmail.com
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  24/7 Support Available
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-sm lg:text-base text-slate-500 font-medium uppercase tracking-widest">
          <p>© 2025 R&DServices. All rights reserved.</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
