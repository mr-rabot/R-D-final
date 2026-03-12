
"use client";

import Link from "next/link";
import { Beaker, Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent("Hi R&D Services, I am visiting your website and would like to get a quote for a research project.");
    window.open(`https://wa.me/916209779365?text=${message}`, '_blank');
  };

  return (
    <nav className="glass-nav border-none shadow-sm h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-primary p-2.5 rounded-xl transition-transform group-hover:scale-105 shadow-lg shadow-primary/20">
                <Beaker className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-primary tracking-tight leading-none">
                  R&D
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                  Research & Development Services
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
            <Button onClick={handleWhatsAppQuote} variant="default" size="lg" className="rounded-full shadow-xl bg-black hover:bg-black/90 text-white font-bold h-12 px-8 flex gap-2">
              Get Quote <MessageSquare className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-24 left-0 w-full bg-white border-b shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-[60]",
          isOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-muted-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          <Button onClick={() => { handleWhatsAppQuote(); setIsOpen(false); }} variant="default" className="w-full rounded-full bg-black h-12 flex gap-2">
            Get Quote <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
