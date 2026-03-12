"use client";

import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-accent text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-white tracking-tight leading-none">
                  R&D
                </span>
                <span className="text-[10px] uppercase tracking-wider text-blue-100 font-medium">
                  research and development
                </span>
              </div>
            </Link>
            <p className="text-blue-100/60 leading-relaxed text-sm">
              Empowering global research communities through rigorous R&D support and innovative data solutions. Committed to integrity, excellence, and scientific transparency.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors cursor-pointer"><Facebook className="h-4 w-4" /></div>
              <div className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors cursor-pointer"><Twitter className="h-4 w-4" /></div>
              <div className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors cursor-pointer"><Linkedin className="h-4 w-4" /></div>
              <div className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors cursor-pointer"><Instagram className="h-4 w-4" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-headline font-bold">Quick Links</h4>
            <ul className="space-y-3 text-blue-100/60 text-sm">
              <li><Link href="#services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Academic Blog</Link></li>
              <li><Link href="#resources" className="hover:text-primary transition-colors">Resource Library</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Staff Login</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-headline font-bold">Specializations</h4>
            <ul className="space-y-3 text-blue-100/60 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Research Methodology</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Statistical Analysis</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Scholarly Publishing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">PhD Consultation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Grant Management</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-headline font-bold">Contact Info</h4>
            <ul className="space-y-4 text-blue-100/60 text-sm">
              <li className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg"><MapPin className="h-4 w-4 text-primary" /></div>
                <span>123 Research Plaza, Innovation District, Cambridge, MA</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg"><Phone className="h-4 w-4 text-primary" /></div>
                <span>+1 (555) 888-9900</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg"><Mail className="h-4 w-4 text-primary" /></div>
                <span>contact@rd-research.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/40">
          <p>© 2024 R&D research and development. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Ethics Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
