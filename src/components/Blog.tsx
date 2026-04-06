"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, ArrowRight, Download, FileType } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

const resources = [
  { name: "Thesis Template (LaTeX)", type: "ZIP", size: "2.4 MB", url: "/resources/thesis-template.zip" },
  { name: "APA 7th Edition Guide", type: "PDF", size: "1.1 MB", url: "/resources/apa-guide.pdf" },
  { name: "Grant Writing Checklist", type: "DOCX", size: "450 KB", url: "/resources/grant-checklist.docx" }
];

interface BlogProps {
  initialData?: any;
  isFullPage?: boolean;
}

export function Blog({ initialData, isFullPage = false }: BlogProps) {
  const [blogData, setBlogData] = useState<{title: string, subtitle: string, posts: BlogPost[]}>({
    title: initialData?.title || "Academic Hub",
    subtitle: initialData?.subtitle || "Expert advice on academic writing and research methodology.",
    posts: initialData?.posts || []
  });

  useEffect(() => {
    if (!initialData) {
      fetch('/api/leadership', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data && data.blog) {
            setBlogData({
              ...data.blog,
              posts: Array.isArray(data.blog.posts) ? data.blog.posts : []
            });
          }
        })
        .catch(err => console.error("Error fetching blog data:", err));
    } else {
      setBlogData({
        ...initialData,
        posts: Array.isArray(initialData.posts) ? initialData.posts : []
      });
    }
  }, [initialData]);

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
  const showViewAll = !isFullPage && blogData.posts.length > 2;

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="w-full px-4 sm:px-12 lg:px-20">
        <div className="grid lg:grid-cols-4 gap-16">
          <div className="lg:col-span-3 space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full">
                  Insights & Knowledge
                </div>
                <h2 className="text-5xl lg:text-7xl font-headline font-bold text-accent">{blogData.title}</h2>
                <p className="text-muted-foreground text-lg lg:text-xl">{blogData.subtitle}</p>
              </div>
              {showViewAll && (
                <Link href="/blog">
                  <Button variant="link" className="text-primary gap-2 p-0 font-bold flex">
                    View All Posts <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsToDisplay && postsToDisplay.length > 0 ? (
                postsToDisplay.map((post, i) => {
                  const placeholderId = `service-${(i % 3) + 1}`;
                  const placeholder = PlaceHolderImages.find(p => p.id === placeholderId);
                  const displayImage = post.image || placeholder?.imageUrl;

                  return (
                    <Card key={i} className="overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[32px] group bg-white h-full flex flex-col">
                      <div className="relative h-64 shrink-0">
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
                      <CardContent className="px-8 pb-8 flex-grow">
                        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center text-slate-300">No scholarly publications found.</div>
              )}
            </div>
          </div>

          <div id="resources" className="space-y-8">
            <div className="bg-accent text-white p-10 rounded-[40px] space-y-10 shadow-2xl relative overflow-hidden h-full">
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-headline font-bold">Resource Library</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">Download professional templates and guides to accelerate your research workflow.</p>
                
                <div className="space-y-4">
                  {resources.map((res, i) => (
                    <a 
                      key={i} 
                      href={res.url}
                      download
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-2.5 rounded-xl">
                          <FileType className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold truncate">{res.name}</div>
                          <div className="text-[10px] text-blue-200/60 uppercase tracking-widest font-bold">{res.type} • {res.size}</div>
                        </div>
                      </div>
                      <Download className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors shrink-0" />
                    </a>
                  ))}
                </div>

                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-bold shadow-xl shadow-primary/20"
                >
                  Access Full Library Templates
                </Button>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
