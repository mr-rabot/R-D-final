
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => console.error("Navbar data error:", err));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleGetQuote = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 z-[100] w-full transition-all duration-500 h-24 flex items-center border-b",
      scrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-sm border-slate-100" 
        : "bg-white/80 backdrop-blur-md border-slate-100"
    )}>
      <div className="w-full px-4 sm:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              {siteData?.brand?.logo ? (
                <div className="relative h-14 w-32 md:w-40 lg:w-48 transition-opacity duration-300">
                  <Image 
                    src={siteData.brand.logo} 
                    alt="R&D Services Logo" 
                    fill 
                    className="object-contain object-left" 
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                <span className="font-headline text-2xl font-bold text-accent">R&D <span className="text-primary">Services</span></span>
              )}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors font-bold text-sm uppercase tracking-widest text-slate-600 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <Button onClick={handleGetQuote} variant="default" size="lg" className="rounded-full shadow-xl font-bold h-12 px-8 flex gap-2 transition-all hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90">
              Get Quote <MessageSquare className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors text-slate-600 hover:text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden fixed top-24 left-0 w-full bg-white border-b shadow-xl transition-all duration-300 ease-in-out overflow-hidden z-[110]",
          isOpen ? "max-h-[500px] opacity-100 py-8" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-xl font-bold text-accent hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button onClick={handleGetQuote} variant="default" className="w-full rounded-2xl bg-primary h-14 text-lg font-bold flex gap-3 shadow-lg">
            Get Quote <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
