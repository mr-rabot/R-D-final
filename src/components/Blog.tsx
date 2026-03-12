
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, ArrowRight, Download, FileType } from "lucide-react";

const posts = [
  {
    title: "How to Structure a High-Impact Literature Review",
    excerpt: "Discover the critical framework used by top researchers to synthesize existing knowledge...",
    author: "Dr. James Aris",
    date: "May 12, 2024",
    image: "blog-1",
    category: "Methodology"
  },
  {
    title: "Understanding Statistical Significance in Clinical Trials",
    excerpt: "A deep dive into P-values, effect sizes, and why modern science is moving beyond binary testing...",
    author: "Prof. Sarah Chen",
    date: "May 10, 2024",
    image: "blog-2",
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
                <h2 className="text-4xl font-headline font-bold text-accent">Insights & Knowledge</h2>
                <p className="text-muted-foreground">Expert advice on academic writing and research methodology.</p>
              </div>
              <Button variant="link" className="text-primary gap-2 p-0">
                View All Posts <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, i) => {
                const img = PlaceHolderImages.find(p => p.id === post.image);
                return (
                  <Card key={i} className="overflow-hidden border-none shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl group">
                    <div className="relative h-56">
                      <Image
                        src={img?.imageUrl || ""}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={img?.imageHint}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                      </div>
                      <CardTitle className="font-headline text-xl text-accent group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div id="resources" className="space-y-8">
            <div className="bg-accent text-white p-8 rounded-3xl space-y-8 shadow-2xl">
              <h3 className="text-2xl font-headline font-bold">Resource Library</h3>
              <p className="text-blue-100 text-sm">Download professional templates and guides to accelerate your research workflow.</p>
              
              <div className="space-y-4">
                {resources.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <FileType className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold truncate max-w-[120px]">{res.name}</div>
                        <div className="text-[10px] text-blue-200">{res.type} • {res.size}</div>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12">
                Access Full Library
              </Button>
            </div>

            <div className="bg-white p-8 rounded-3xl border shadow-lg space-y-4">
              <h4 className="text-xl font-headline font-bold text-accent">Join Our Webinar</h4>
              <p className="text-sm text-muted-foreground">Upcoming: "Demystifying the Nature Submission Process"</p>
              <Button variant="outline" className="w-full rounded-xl border-primary text-primary">Register Free</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
