"use client";

import Link from "next/link";
import { Beaker, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-xl transition-transform group-hover:scale-105">
                <Beaker className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-accent tracking-tight leading-none">
                  R&D
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">
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
            <Button asChild variant="default" size="lg" className="rounded-full shadow-lg bg-black hover:bg-black/90 text-white font-bold h-12 px-8">
              <Link href="#contact" className="gap-2">
                Get Quote <ChevronRight className="h-4 w-4" />
              </Link>
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
          "md:hidden absolute w-full bg-white border-b transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
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
          <Button asChild variant="default" className="w-full rounded-full bg-black">
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              Get Quote
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}