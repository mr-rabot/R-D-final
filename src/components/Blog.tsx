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
    <section id="blog" className="py-24 md:py-36 bg-background overflow-hidden w-full">
      <div className="w-full px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-8 xl:col-span-9 space-y-14 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2.5 bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold px-5 py-2 rounded-full mb-2">
                  <Sparkles className="h-4 w-4" /> Insights & Knowledge
                </div>
                <h2 className="text-4xl md:text-7xl xl:text-8xl font-headline font-bold text-accent tracking-tight leading-[1.1]">{blogData.title}</h2>
                <p className="text-slate-500 text-lg md:text-2xl xl:text-3xl font-light leading-relaxed">{blogData.subtitle}</p>
              </div>
              {showViewAll && (
                <Link href="/blog">
                  <Button variant="outline" className="rounded-2xl h-14 md:h-16 px-8 md:px-10 border-slate-200 font-bold gap-3 text-primary hover:bg-primary/5 transition-all text-base md:text-lg">
                    View All Posts <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-12">
              {postsToDisplay && postsToDisplay.length > 0 ? (
                postsToDisplay.map((post, i) => {
                  const placeholder = PlaceHolderImages.find(p => p.id === `service-${(i % 3) + 1}`);
                  const displayImage = post.image || placeholder?.imageUrl;

                  return (
                    <Card key={i} className="overflow-hidden border-none shadow-[0_25px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_50px_100px_rgba(0,71,255,0.12)] hover:-translate-y-3 transition-all duration-700 rounded-[45px] group bg-white h-full flex flex-col">
                      <div className="relative aspect-[16/10] shrink-0">
                        {displayImage && (
                          <Image
                            src={displayImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            unoptimized
                          />
                        )}
                        <div className="absolute top-8 left-8">
                          <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-xs uppercase tracking-wider font-bold px-5 py-2 rounded-full shadow-lg border border-white/10">{post.category}</span>
                        </div>
                      </div>
                      <CardHeader className="pt-10 px-10">
                        <div className="flex flex-wrap gap-5 text-[10px] md:text-xs uppercase tracking-widest font-bold text-slate-400 mb-5">
                          <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {post.date}</span>
                          <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {post.author}</span>
                        </div>
                        <CardTitle className="font-headline text-2xl md:text-3xl xl:text-4xl text-accent group-hover:text-primary transition-colors leading-tight min-h-[80px]">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-10 pb-12 flex-grow">
                        <p className="text-slate-500 text-base md:text-lg xl:text-xl font-light line-clamp-4 leading-relaxed">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full py-32 text-center">
                  <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <div className="text-slate-400 font-bold uppercase tracking-[0.25em] text-sm">Curating Academic Excellence...</div>
                </div>
              )}
            </div>
          </div>

          <div id="resources" className="w-full lg:col-span-4 xl:col-span-3 lg:sticky lg:top-32 h-fit">
            <div className="bg-accent text-white p-10 md:p-14 rounded-[50px] space-y-10 shadow-[0_60px_120px_rgba(0,0,0,0.25)] relative overflow-hidden group">
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-4 text-primary">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-blue-400">Scholarly Assets</span>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-headline font-bold leading-[1.1] tracking-tight">Sample Templates Hub</h3>
                  <p className="text-blue-100/60 text-base md:text-lg xl:text-xl font-light italic leading-relaxed">
                    Precision-engineered frameworks to accelerate your publishing success.
                  </p>
                </div>
                
                <div className="space-y-5 pt-6">
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
                      className="flex items-center justify-between p-5 md:p-6 bg-white/5 border border-white/10 rounded-[28px] hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer group/link shadow-sm"
                    >
                      <div className="flex items-center gap-5 min-w-0">
                        <div className="bg-primary/20 p-3 md:p-4 rounded-2xl text-primary group-hover/link:scale-110 transition-transform">
                          <FileType className="h-6 w-6 md:h-7 md:w-7" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-base md:text-lg font-bold truncate group-hover/link:text-primary transition-colors">{res.name}</div>
                          <div className="text-[10px] md:text-xs text-blue-200/40 uppercase tracking-widest font-bold mt-1">{res.type} • {res.size}</div>
                        </div>
                      </div>
                      <Download className="h-5 w-5 md:h-6 md:w-6 text-blue-200/40 group-hover/link:text-white transition-colors shrink-0" />
                    </a>
                  ))}
                </div>

                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-primary hover:bg-blue-600 text-white rounded-[28px] h-18 md:h-22 font-bold shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 text-lg md:text-xl"
                >
                  Access Full Templates
                </Button>
              </div>
              
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
