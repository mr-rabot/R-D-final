
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, ArrowRight, Download, FileType, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
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
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
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

  const displayLimit = isFullPage ? blogData.posts.length : 6;
  const postsToDisplay = blogData.posts.slice(0, displayLimit);
  const showViewAll = !isFullPage && blogData.posts.length > 3;

  const displayResources = resources.length > 0 ? resources : DUMMY_TEMPLATES;

  return (
    <section id="blog" className="py-24 md:py-32 bg-background overflow-hidden w-full">
      <div className="w-full px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Main Stack: Content then Resources */}
        <div className="flex flex-col gap-24">
          
          {/* Top Row: Academic Hub Full Width */}
          <div className="space-y-12 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-1">
                  <Sparkles className="h-4 w-4" /> Insights & Knowledge
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-accent tracking-tight leading-tight">{blogData.title}</h2>
                <p className="text-slate-500 text-lg md:text-xl font-light italic leading-relaxed">{blogData.subtitle}</p>
              </div>
              {showViewAll && (
                <Link href="/blog">
                  <Button variant="outline" className="rounded-2xl h-14 md:h-16 px-8 md:px-10 border-slate-200 font-bold gap-3 text-primary hover:bg-primary/5 transition-all shadow-md">
                    Hub Library <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="relative pt-4">
              {postsToDisplay && postsToDisplay.length > 0 ? (
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-6">
                    {postsToDisplay.map((post, i) => {
                      const placeholder = PlaceHolderImages.find(p => p.id === `service-${(i % 3) + 1}`);
                      const displayImage = post.image || placeholder?.imageUrl;

                      return (
                        <CarouselItem key={i} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3 py-4">
                          <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[32px] group bg-white h-full flex flex-col">
                            <div className="relative aspect-video shrink-0">
                              {displayImage && (
                                <Image
                                  src={displayImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                                  unoptimized
                                />
                              )}
                              <div className="absolute top-6 left-6">
                                <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/10">{post.category}</span>
                              </div>
                            </div>
                            <CardHeader className="pt-8 px-8">
                              <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">
                                <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-primary" /> {post.date}</span>
                                <span className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-primary" /> {post.author}</span>
                              </div>
                              <CardTitle className="font-headline text-2xl md:text-3xl text-accent group-hover:text-primary transition-colors leading-tight min-h-[80px]">
                                {post.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-10 flex-grow">
                              <p className="text-slate-500 text-base font-light italic line-clamp-3 leading-relaxed">{post.excerpt}</p>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <div className="flex justify-center mt-8 gap-4">
                    <CarouselPrevious className="static md:absolute md:-left-12 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-12 w-12 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-90" />
                    <CarouselNext className="static md:absolute md:-right-12 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-12 w-12 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-90" />
                  </div>
                </Carousel>
              ) : (
                <div className="py-24 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">Curating Academic Excellence...</div>
                </div>
              )}
            </div>
          </div>

          {/* Next Row: Scholarly Templates Full Width */}
          <div id="resources" className="w-full">
            <div className="bg-accent text-white p-10 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="relative z-10 flex flex-col md:grid md:grid-cols-12 gap-12 items-center">
                
                <div className="md:col-span-4 space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-blue-400">Assets Hub</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-headline font-bold leading-tight tracking-tight">Scholarly Templates</h3>
                    <p className="text-blue-100/60 text-lg md:text-xl font-light italic leading-relaxed">
                      Precision-engineered frameworks to accelerate your publishing success.
                    </p>
                  </div>

                  <Button 
                    onClick={scrollToContact}
                    className="w-full bg-primary hover:bg-blue-600 text-white rounded-[24px] h-16 md:h-20 font-bold shadow-xl shadow-primary/30 transition-all active:scale-95 text-lg"
                  >
                    Unlock Full Library
                  </Button>
                </div>

                <div className="md:col-span-8 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[28px] hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer group/link shadow-md"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="bg-primary/20 p-3 rounded-xl text-primary group-hover/link:scale-110 transition-transform">
                            <FileType className="h-7 w-7" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-lg font-bold truncate group-hover/link:text-primary transition-colors">{res.name}</div>
                            <div className="text-[10px] text-blue-200/40 uppercase tracking-widest font-bold mt-1">{res.type} • {res.size}</div>
                          </div>
                        </div>
                        <Download className="h-6 w-6 text-blue-200/40 group-hover/link:text-white transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/15 transition-all duration-1000" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
