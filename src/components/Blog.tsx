
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
    <section id="blog" className="py-24 md:py-40 lg:py-56 bg-background overflow-hidden w-full">
      <div className="w-full px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-8 xl:col-span-9 space-y-16 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary text-xs md:text-sm uppercase tracking-[0.3em] font-bold px-6 py-2.5 rounded-full mb-2 shadow-sm">
                  <Sparkles className="h-5 w-5" /> Insights & Knowledge
                </div>
                <h2 className="text-5xl md:text-8xl xl:text-9xl font-headline font-bold text-accent tracking-tight leading-[1]">{blogData.title}</h2>
                <p className="text-slate-500 text-xl md:text-3xl xl:text-4xl font-light italic leading-relaxed">{blogData.subtitle}</p>
              </div>
              {showViewAll && (
                <Link href="/blog">
                  <Button variant="outline" className="rounded-2xl h-16 md:h-20 px-10 md:px-14 border-slate-200 font-bold gap-4 text-primary hover:bg-primary/5 transition-all text-lg md:text-xl shadow-lg hover:-translate-y-1">
                    Hub Library <ArrowRight className="h-6 w-6" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="relative pt-8">
              {postsToDisplay && postsToDisplay.length > 0 ? (
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-6 md:-ml-10">
                    {postsToDisplay.map((post, i) => {
                      const placeholder = PlaceHolderImages.find(p => p.id === `service-${(i % 3) + 1}`);
                      const displayImage = post.image || placeholder?.imageUrl;

                      return (
                        <CarouselItem key={i} className="pl-6 md:pl-10 basis-full md:basis-1/2 xl:basis-1/3 py-8">
                          <Card className="overflow-hidden border-none shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_60px_120px_rgba(0,71,255,0.15)] hover:-translate-y-4 transition-all duration-1000 rounded-[50px] group bg-white h-full flex flex-col">
                            <div className="relative aspect-[16/11] shrink-0">
                              {displayImage && (
                                <Image
                                  src={displayImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                  unoptimized
                                />
                              )}
                              <div className="absolute top-10 left-10">
                                <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-6 py-2.5 rounded-full shadow-2xl border border-white/10">{post.category}</span>
                              </div>
                            </div>
                            <CardHeader className="pt-12 px-10 md:px-12">
                              <div className="flex flex-wrap gap-6 text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-slate-400 mb-6">
                                <span className="flex items-center gap-2.5"><Calendar className="h-4 w-4 text-primary" /> {post.date}</span>
                                <span className="flex items-center gap-2.5"><User className="h-4 w-4 text-primary" /> {post.author}</span>
                              </div>
                              <CardTitle className="font-headline text-3xl md:text-4xl text-accent group-hover:text-primary transition-colors leading-tight min-h-[100px]">
                                {post.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-10 md:px-12 pb-14 flex-grow">
                              <p className="text-slate-500 text-lg md:text-xl font-light italic line-clamp-4 leading-relaxed">{post.excerpt}</p>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <div className="flex justify-center mt-12 gap-6 md:block">
                    <CarouselPrevious className="static md:absolute md:-left-16 lg:-left-20 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 md:h-20 md:w-20 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
                    <CarouselNext className="static md:absolute md:-right-16 lg:-right-20 translate-y-0 bg-white border-slate-100 hover:bg-primary hover:text-white h-14 w-14 md:h-20 md:w-20 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" />
                  </div>
                </Carousel>
              ) : (
                <div className="py-40 text-center">
                  <div className="mx-auto w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-10">
                    <Sparkles className="h-12 w-12" />
                  </div>
                  <div className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm md:text-base">Curating Academic Excellence...</div>
                </div>
              )}
            </div>
          </div>

          <div id="resources" className="w-full lg:col-span-4 xl:col-span-3 lg:sticky lg:top-40 h-fit">
            <div className="bg-accent text-white p-12 md:p-16 rounded-[60px] space-y-12 shadow-[0_80px_160px_rgba(0,0,0,0.3)] relative overflow-hidden group border border-white/5">
              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-5 text-primary">
                  <div className="p-4 bg-primary/10 rounded-[20px] shadow-inner">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <span className="text-xs md:text-sm uppercase tracking-[0.5em] font-bold text-blue-400">Assets Hub</span>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-4xl md:text-6xl font-headline font-bold leading-[1.1] tracking-tight">Scholarly Templates</h3>
                  <p className="text-blue-100/60 text-lg md:text-2xl font-light italic leading-relaxed">
                    Precision-engineered frameworks to accelerate your publishing success.
                  </p>
                </div>
                
                <div className="space-y-6 pt-8">
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
                      className="flex items-center justify-between p-6 md:p-8 bg-white/5 border border-white/10 rounded-[35px] hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer group/link shadow-xl"
                    >
                      <div className="flex items-center gap-6 min-w-0">
                        <div className="bg-primary/20 p-4 md:p-5 rounded-[22px] text-primary group-hover/link:scale-110 transition-transform">
                          <FileType className="h-7 w-7 md:h-9 md:w-9" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-lg md:text-2xl font-bold truncate group-hover/link:text-primary transition-colors">{res.name}</div>
                          <div className="text-[10px] md:text-xs text-blue-200/40 uppercase tracking-[0.3em] font-bold mt-2">{res.type} • {res.size}</div>
                        </div>
                      </div>
                      <Download className="h-6 w-6 md:h-8 md:w-8 text-blue-200/40 group-hover/link:text-white transition-colors shrink-0" />
                    </a>
                  ))}
                </div>

                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-primary hover:bg-blue-600 text-white rounded-[32px] h-20 md:h-26 font-bold shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 text-xl md:text-2xl"
                >
                  Unlock Full Library
                </Button>
              </div>
              
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 blur-[140px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 blur-[160px] rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
