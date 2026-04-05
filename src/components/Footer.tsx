
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
    <footer className="bg-[#0a0f1c] text-white pt-24 pb-12">
      <div className="w-full px-4 sm:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="group inline-block">
              <div className="flex flex-col">
                <span className="font-headline text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none uppercase">
                  R&D
                </span>
                <span className="text-[10px] lg:text-xs text-blue-200 font-bold uppercase tracking-widest mt-1 group-hover:text-primary transition-colors">
                  Services
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
              Professional research writing and academic consulting services. Led by Om Prakash Sinha, we guarantee quality, originality, and timely delivery for R&D Services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg lg:text-xl font-bold">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm lg:text-base">
              <li><Link href="#services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-lg lg:text-xl font-bold">Our Services</h4>
            <ul className="space-y-3 text-slate-400 text-sm lg:text-base">
              <li>Research Papers</li>
              <li>Thesis Writing</li>
              <li>Dissertation</li>
              <li>Project Reports</li>
              <li>Literature Review</li>
              <li>Conference Papers</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg lg:text-xl font-bold">Contact Info</h4>
            <ul className="space-y-4 text-slate-400 text-sm lg:text-base">
              <li className="flex flex-col gap-2">
                <span className="text-white font-bold text-base lg:text-xl">Om Prakash Sinha</span>
                <span className="text-white font-medium">Phone: +{whatsapp}</span>
                <span className="text-white font-medium">Email: support.rdservices@gmail.com</span>
                <span>Support: 24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-sm lg:text-base text-slate-500">
          <p>
            © 2025 R&D Services. All rights reserved. |{" "}
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link> |{" "}
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
