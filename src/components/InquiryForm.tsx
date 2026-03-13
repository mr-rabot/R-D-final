
"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Required"),
  phone: z.string().min(1, "Mobile number is required"),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(10, "Please provide some project details"),
});

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
];

export function InquiryForm() {
  const { toast } = useToast();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState("916209779365");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "India",
      phone: "",
      service: "",
      details: "",
    },
  });

  useEffect(() => {
    fetch('/api/leadership')
      .then(res => res.json())
      .then(data => {
        if (data.firmSummary?.image) setContactImage(data.firmSummary.image);
        if (data.integrations?.whatsapp) setWhatsapp(data.integrations.whatsapp);
      });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedCountry = countryCodes.find(c => c.name === values.countryCode);
    const code = selectedCountry?.code || "+91";
    const fullPhone = `${code} ${values.phone}`;
    
    const messageText = `*New Inquiry from R&D Services Website*\n\n` +
      `*Name:* ${values.name}\n` +
      `*Email:* ${values.email}\n` +
      `*Phone:* ${fullPhone}\n` +
      `*Service:* ${values.service}\n` +
      `*Details:* ${values.details}`;
    
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(messageText)}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Inquiry Sent",
      description: "Redirecting to WhatsApp to finalize your quote request...",
    });
    
    form.reset({
      ...form.getValues(),
      name: "",
      email: "",
      phone: "",
      details: "",
    });
  }

  const handleEmailSubmit = () => {
    const values = form.getValues();
    if (!values.name || !values.email || !values.service || !values.details) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out the required fields before sending an email.",
      });
      return;
    }

    const selectedCountry = countryCodes.find(c => c.name === values.countryCode);
    const code = selectedCountry?.code || "+91";
    const fullPhone = `${code} ${values.phone}`;
    
    const subject = `Quote Request: ${values.service} - ${values.name}`;
    const body = `Hi R&D Services Team,\n\nI would like to request a quote for the following project:\n\n` +
      `Name: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `Phone: ${fullPhone}\n` +
      `Service: ${values.service}\n\n` +
      `Project Details:\n${values.details}`;
    
    window.location.href = `mailto:support.rdservices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-slate-50/50">
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-headline font-bold text-accent">Get in Touch</h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                Discuss your research project directly with our experts. We guarantee scholarly precision and academic integrity.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-xl">Om Prakash Sinha</h4>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Email Us</h4>
                  <p className="text-slate-600">support.rdservices@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Call Us</h4>
                  <p className="text-slate-600">+{whatsapp}</p>
                  <p className="text-slate-600">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="relative pt-8">
              {contactImage ? (
                <div className={cn(
                  "relative w-full h-64 lg:h-80 overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-200 transition-all duration-1000 delay-300",
                  isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}>
                  <Image
                    src={contactImage}
                    alt="Research Visual"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                </div>
              ) : null}
            </div>
          </div>

          <div className={cn(
            "bg-white p-10 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-1000",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          )}>
            <div className="mb-10 space-y-2">
              <h3 className="text-2xl font-bold text-accent">Get Your Quote</h3>
              <p className="text-slate-500">Fill out the details and send via your preferred channel</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-accent">Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} className="bg-slate-50 border-none rounded-xl h-12 shadow-inner" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-accent">Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} className="bg-slate-50 border-none rounded-xl h-12 shadow-inner" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel className="text-sm font-bold text-accent">Phone Number *</FormLabel>
                  <div className="flex items-center gap-0 bg-slate-50 border-none rounded-xl shadow-inner overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem className="w-[100px] shrink-0 space-y-0">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-none h-12 shadow-none focus:ring-0">
                                <SelectValue placeholder="Code">
                                  {(() => {
                                    const selected = countryCodes.find(c => c.name === field.value);
                                    return selected ? (
                                      <span className="flex items-center gap-1.5 px-1">
                                        <span className="text-base leading-none">{selected.flag}</span>
                                        <span className="text-xs font-bold">{selected.code}</span>
                                      </span>
                                    ) : "Code";
                                  })()}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-slate-100">
                              {countryCodes.map((item) => (
                                <SelectItem key={`${item.code}-${item.name}`} value={item.name}>
                                  <span className="flex items-center gap-2">
                                    <span className="text-lg">{item.flag}</span>
                                    <span className="text-sm">{item.code} {item.name}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <div className="w-px h-6 bg-slate-200" />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex-grow space-y-0">
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="Mobile number" 
                              {...field} 
                              className="bg-transparent border-none h-12 shadow-none focus-visible:ring-0" 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <FormMessage />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-accent">Service Required *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 border-none rounded-xl h-12 shadow-inner">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-slate-100">
                          <SelectItem value="Research Paper">Research Paper</SelectItem>
                          <SelectItem value="Thesis Writing">Thesis Writing</SelectItem>
                          <SelectItem value="Dissertation">Dissertation</SelectItem>
                          <SelectItem value="Synopsis Writing">Synopsis Writing</SelectItem>
                          <SelectItem value="PPT Presentation">PPT Presentation</SelectItem>
                          <SelectItem value="Plagiarism Report">Plagiarism Report</SelectItem>
                          <SelectItem value="Project Report">Project Report</SelectItem>
                          <SelectItem value="Literature Review">Literature Review</SelectItem>
                          <SelectItem value="Research Proposal">Research Proposal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-accent">Project Details *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project requirements, deadline, topic, etc." 
                          className="bg-slate-50 border-none rounded-xl min-h-[120px] shadow-inner" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3 pt-4">
                  <Button type="submit" className="w-full h-14 rounded-xl text-lg bg-primary hover:bg-blue-600 text-white shadow-lg flex gap-3 transition-all active:scale-95">
                     <MessageSquare className="h-6 w-6" /> Submit via WhatsApp
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleEmailSubmit}
                    variant="outline" 
                    className="w-full h-14 rounded-xl text-lg border-2 border-slate-200 hover:border-primary text-slate-600 hover:text-primary transition-all active:scale-95 flex gap-3 shadow-sm"
                  >
                    <Mail className="h-6 w-6" /> Submit via Email
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
