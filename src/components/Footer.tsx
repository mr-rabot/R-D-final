
"use client";

import { Beaker } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a0f1c] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-[#2563eb] p-2 rounded-lg">
                <Beaker className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-white tracking-tight leading-none uppercase">
                  R & D
                </span>
                <span className="text-[10px] text-blue-200 font-medium">
                  Services Pvt. Ltd.
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Professional research writing and academic consulting services. Led by Founder Om Prakash Sinha, we guarantee quality, originality, and timely delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="#services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Our Services</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
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
            <h4 className="text-lg font-bold">Contact Info</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex flex-col gap-2">
                <span className="text-white font-medium">Phone: +91 6209779365</span>
                <span className="text-white font-medium">Email: contact@rd-services.com</span>
                <div className="pt-2 border-t border-slate-800">
                  <span className="block text-blue-200 font-bold">Om Prakash Sinha</span>
                  <span className="block text-[10px] uppercase">Founder & Director</span>
                </div>
                <span>Support: 24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>
            © 2024 R & D Services Pvt. Ltd. All rights reserved. |{" "}
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link> |{" "}
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
