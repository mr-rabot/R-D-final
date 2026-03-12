
"use client";

import Link from "next/link";
import { Beaker, Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [whatsapp, setWhatsapp] = useState("916209779365");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        if (data.integrations?.whatsapp) setWhatsapp(data.integrations.whatsapp);
      });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent("Hi R&D Services, I am visiting your website and would like to get a quote for a research project.");
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  return (
    <nav className={cn(
      "fixed top-0 z-[100] w-full transition-all duration-300 h-24 flex items-center",
      scrolled ? "bg-white shadow-md" : "bg-white md:bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 md:gap-4 group">
              <div className="bg-primary p-2 md:p-2.5 rounded-xl transition-transform group-hover:scale-105 shadow-lg shadow-primary/20">
                <Beaker className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-headline text-xl md:text-2xl font-bold tracking-tight leading-none",
                  scrolled ? "text-primary" : "text-primary md:text-white"
                )}>
                  R&D
                </span>
                <span className={cn(
                  "text-[8px] md:text-[9px] uppercase tracking-wider font-semibold mt-1",
                  scrolled ? "text-muted-foreground" : "text-muted-foreground md:text-blue-100/70"
                )}>
                  Research & Development Services
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors font-medium text-sm",
                  scrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button onClick={handleWhatsAppQuote} variant="default" size="lg" className={cn(
              "rounded-full shadow-xl font-bold h-12 px-8 flex gap-2",
              scrolled ? "bg-black hover:bg-black/90 text-white" : "bg-white text-primary hover:bg-blue-50"
            )}>
              Get Quote <MessageSquare className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                scrolled ? "text-muted-foreground hover:text-primary" : "text-primary md:text-white"
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
          <Button onClick={() => { handleWhatsAppQuote(); setIsOpen(false); }} variant="default" className="w-full rounded-2xl bg-primary h-14 text-lg font-bold flex gap-3 shadow-lg">
            Get WhatsApp Quote <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
