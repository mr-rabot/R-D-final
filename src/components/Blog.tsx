
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, ArrowRight, Download, FileType, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

interface Resource {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface BlogProps {
  initialData?: any;
  isFullPage?: boolean;
}

const DUMMY_TEMPLATES: Resource[] = [
  {
    name: "Dissertation Structural Framework",
    type: "PDF",
    size: "1.2 MB",
    url: "#"
  },
  {
    name: "Journal Submission Checklist",
    type: "PDF",
    size: "850 KB",
    url: "#"
  },
  {
    name: "APA 7th Edition Style Guide",
    type: "PDF",
    size: "2.1 MB",
    url: "#"
  }
];

export function Blog({ initialData, isFullPage = false }: BlogProps) {
  const [blogData, setBlogData] = useState<{title: string, subtitle: string, posts: BlogPost[]}>({
    title: initialData?.title || "Academic Hub",
    subtitle: initialData?.subtitle || "Expert advice on academic writing and research methodology.",
    posts: initialData?.posts || []
  });

  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    // If we're on a separate page (initialData provided), resources might be elsewhere or passed in
    // Since page.tsx passes data.blog as initialData, we might need to fetch the full registry for resources
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.blog) {
          setBlogData({
            title: data.blog.title || "Academic Hub",
            subtitle: data.blog.subtitle || "Expert advice on academic writing and research methodology.",
            posts: Array.isArray(data.blog.posts) ? data.blog.posts : []
          });
        }
        if (data && data.resources) {
          setResources(data.resources);
        }
      })
      .catch(err => console.error("Error fetching hub data:", err));
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = "/#contact";
    }
  };

  const displayLimit = isFullPage ? blogData.posts.length : 3;
  const postsToDisplay = blogData.posts.slice(0, displayLimit);
  const showViewAll = !isFullPage && blogData.posts.length > 3;

  const displayResources = resources.length > 0 ? resources : DUMMY_TEMPLATES;

  return (
    <section id="blog" className="py-24 bg-background overflow-hidden w-full">
      <div className="w-full px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-3 space-y-12 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-2">
                  <Sparkles className="h-3 w-3" /> Insights & Knowledge
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-accent tracking-tight">{blogData.title}</h2>
                <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">{blogData.subtitle}</p>
              </div>
              {showViewAll && (
                <Link href="/blog">
                  <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 font-bold gap-2 text-primary hover:bg-primary/5 transition-all">
                    View All Posts <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {postsToDisplay && postsToDisplay.length > 0 ? (
                postsToDisplay.map((post, i) => {
                  const placeholder = PlaceHolderImages.find(p => p.id === `service-${(i % 3) + 1}`);
                  const displayImage = post.image || placeholder?.imageUrl;

                  return (
                    <Card key={i} className="overflow-hidden border-none shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,71,255,0.1)] hover:-translate-y-2 transition-all duration-500 rounded-[40px] group bg-white h-full flex flex-col">
                      <div className="relative aspect-[16/10] shrink-0">
                        {displayImage && (
                          <Image
                            src={displayImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            unoptimized
                          />
                        )}
                        <div className="absolute top-6 left-6">
                          <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/10">{post.category}</span>
                        </div>
                      </div>
                      <CardHeader className="pt-8 px-8">
                        <div className="flex flex-wrap gap-4 text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-4">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-primary" /> {post.date}</span>
                          <span className="flex items-center gap-1.5"><User className="h-3 w-3 text-primary" /> {post.author}</span>
                        </div>
                        <CardTitle className="font-headline text-2xl text-accent group-hover:text-primary transition-colors leading-tight min-h-[64px]">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-8 pb-10 flex-grow">
                        <p className="text-slate-500 text-sm md:text-base font-light line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full py-24 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Curating Academic Excellence...</div>
                </div>
              )}
            </div>
          </div>

          <div id="resources" className="w-full lg:sticky lg:top-32">
            <div className="bg-accent text-white p-8 md:p-12 rounded-[45px] space-y-8 shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-3 text-primary">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Scholarly Assets</span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-headline font-bold leading-tight">Sample Templates Hub</h3>
                  <p className="text-blue-100/60 text-sm md:text-base font-light italic leading-relaxed">
                    Precision-engineered frameworks to accelerate your publishing success.
                  </p>
                </div>
                
                <div className="space-y-4 pt-4">
                  {displayResources.map((res, i) => (
                    <a 
                      key={i} 
                      href={res.url === "#" ? "javascript:void(0)" : res.url}
                      onClick={(e) => {
                        if (res.url === "#") {
                          e.preventDefault();
                          scrollToContact();
                        }
                      }}
                      download={res.url !== "#"}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer group/link"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="bg-primary/20 p-2.5 rounded-xl text-primary group-hover/link:scale-110 transition-transform">
                          <FileType className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold truncate group-hover/link:text-primary transition-colors">{res.name}</div>
                          <div className="text-[9px] text-blue-200/40 uppercase tracking-widest font-bold mt-0.5">{res.type} • {res.size}</div>
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-blue-200/40 group-hover/link:text-white transition-colors shrink-0" />
                    </a>
                  ))}
                </div>

                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-primary hover:bg-blue-600 text-white rounded-2xl h-16 font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 text-base"
                >
                  Access Full Templates
                </Button>
              </div>
              
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
