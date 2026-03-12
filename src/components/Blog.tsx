
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, ArrowRight, Download, FileType } from "lucide-react";

const posts = [
  {
    title: "How to Structure a High-Impact Literature Review",
    excerpt: "Discover the critical framework used by top researchers to synthesize existing knowledge and identify research gaps effectively.",
    author: "Dr. James Aris",
    date: "May 12, 2024",
    image: "service-1",
    category: "Methodology"
  },
  {
    title: "Understanding Statistical Significance in Clinical Trials",
    excerpt: "A deep dive into P-values, effect sizes, and why modern science is moving beyond binary testing for more robust findings.",
    author: "Prof. Sarah Chen",
    date: "May 10, 2024",
    image: "service-2",
    category: "Statistics"
  }
];

const resources = [
  { name: "Thesis Template (LaTeX)", type: "ZIP", size: "2.4 MB" },
  { name: "APA 7th Edition Guide", type: "PDF", size: "1.1 MB" },
  { name: "Grant Writing Checklist", type: "DOCX", size: "450 KB" }
];

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full">
                  Insights & Knowledge
                </div>
                <h2 className="text-5xl font-headline font-bold text-accent">Academic Hub</h2>
                <p className="text-muted-foreground text-lg">Expert advice on academic writing and research methodology.</p>
              </div>
              <Button variant="link" className="text-primary gap-2 p-0 font-bold hidden sm:flex">
                View All Posts <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, i) => {
                const img = PlaceHolderImages.find(p => p.id === post.image);
                return (
                  <Card key={i} className="overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[32px] group">
                    <div className="relative h-64">
                      {img?.imageUrl && (
                        <Image
                          src={img.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          data-ai-hint={img.imageHint}
                        />
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="bg-primary text-white text-[10px] uppercase tracking-wider font-bold px-4 py-1.5 rounded-full shadow-lg">{post.category}</span>
                      </div>
                    </div>
                    <CardHeader className="pt-8 px-8">
                      <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">
                        <span className="flex items-center gap-2"><Calendar className="h-3 w-3 text-primary" /> {post.date}</span>
                        <span className="flex items-center gap-2"><User className="h-3 w-3 text-primary" /> {post.author}</span>
                      </div>
                      <CardTitle className="font-headline text-2xl text-accent group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div id="resources" className="space-y-8">
            <div className="bg-accent text-white p-10 rounded-[40px] space-y-10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-headline font-bold">Resource Library</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">Download professional templates and guides to accelerate your research workflow.</p>
                
                <div className="space-y-4">
                  {resources.map((res, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-2.5 rounded-xl">
                          <FileType className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-bold truncate max-w-[140px]">{res.name}</div>
                          <div className="text-[10px] text-blue-200/60 uppercase tracking-widest font-bold">{res.type} • {res.size}</div>
                        </div>
                      </div>
                      <Download className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-bold shadow-xl shadow-primary/20">
                  Access Full Library
                </Button>
              </div>
              {/* Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl space-y-6">
              <h4 className="text-2xl font-headline font-bold text-accent">Monthly Webinar</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Join us for: "Demystifying the Nature Submission Process"</p>
              <Button variant="outline" className="w-full rounded-2xl border-primary text-primary hover:bg-primary/5 h-12 font-bold">Register Free</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
