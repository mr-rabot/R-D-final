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
import { Mail, Phone, User, MessageSquare, Send, Loader2, Linkedin } from "lucide-react";
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
  const [linkedin, setLinkedin] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.firmSummary?.image) setContactImage(data.firmSummary.image);
        if (data.integrations?.whatsapp) setWhatsapp(data.integrations.whatsapp);
        if (data.integrations?.linkedin) setLinkedin(data.integrations.linkedin);
      })
      .catch(err => console.error("Error fetching leadership data:", err));

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/support.rdservices@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: `${values.countryCode} ${values.phone}`,
          service: values.service,
          message: values.details,
          _subject: `New Research Inquiry: ${values.service} from ${values.name}`,
          _template: "table"
        }),
      });

      if (response.ok) {
        toast({
          title: "Inquiry Sent Successfully",
          description: "Our academic team has received your message and will contact you shortly.",
        });
        form.reset({
          name: "",
          email: "",
          phone: "",
          details: "",
          service: "",
          countryCode: "India"
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "We couldn't process your inquiry at this moment. Please try again or use WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleWhatsAppQuickAction = () => {
    const values = form.getValues();
    if (!values.name || !values.service) {
      const quickMessage = encodeURIComponent("Hi R&DServices, I am interested in your academic consulting services.");
      window.open(`https://wa.me/${whatsapp}?text=${quickMessage}`, '_blank');
      return;
    }

    const selectedCountry = countryCodes.find(c => c.name === values.countryCode);
    const code = selectedCountry?.code || "+91";
    const fullPhone = `${code} ${values.phone}`;
    
    const messageText = `*New Quote Request from Website*\n\n` +
      `*Name:* ${values.name}\n` +
      `*Email:* ${values.email}\n` +
      `*Phone:* ${fullPhone}\n` +
      `*Service:* ${values.service}\n` +
      `*Details:* ${values.details}`;
    
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-slate-50/50 w-full overflow-hidden">
      <div className={cn(
        "w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="space-y-10 md:space-y-16 w-full">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold text-accent tracking-tight">Get in Touch</h2>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-light">
                Discuss your research project directly with our experts. We guarantee scholarly precision and academic integrity.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
              <div className="flex items-start gap-5 md:gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg md:text-xl">Om Prakash Sinha</h4>
                  <p className="text-slate-500 text-[13px] md:text-sm">Founder & Director</p>
                </div>
              </div>

              <div className="flex items-start gap-5 md:gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Email Us</h4>
                  <a 
                    href="mailto:support.rdservices@gmail.com" 
                    className="text-slate-600 break-all font-medium text-sm md:text-base hover:text-primary transition-colors"
                  >
                    support.rdservices@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 md:gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Call Us</h4>
                  <p className="text-slate-600 font-medium text-sm md:text-base">+{whatsapp}</p>
                  <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-1">Available 24/7</p>
                </div>
              </div>

              {linkedin && (
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="bg-white shadow-md p-3 rounded-xl text-primary shrink-0">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-lg">LinkedIn</h4>
                    <a 
                      href={linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 font-medium text-sm md:text-base hover:text-primary transition-colors"
                    >
                      Connect with Us
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="relative pt-4 hidden md:block">
              {contactImage ? (
                <div className={cn(
                  "relative w-full aspect-[16/10] overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-200 transition-all duration-1000 delay-300 bg-slate-100",
                  isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}>
                  <Image
                    src={contactImage}
                    alt="Research Visual"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                </div>
              ) : null}
            </div>
          </div>

          <div className={cn(
            "bg-white p-8 md:p-12 lg:p-16 rounded-[40px] md:rounded-[45px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-1000 w-full",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          )}>
            <div className="mb-10 space-y-2 md:space-y-3 text-center lg:text-left">
              <h3 className="text-3xl md:text-5xl font-headline font-bold text-accent tracking-tight">Request Quote</h3>
              <p className="text-slate-500 text-sm md:text-lg font-light">Secure scholarly support for your research project.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} className="bg-slate-50 border-none rounded-2xl h-14 md:h-16 shadow-inner text-sm md:text-base" />
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
                        <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} className="bg-slate-50 border-none rounded-2xl h-14 md:h-16 shadow-inner text-sm md:text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">Contact Number *</FormLabel>
                    <div className="flex items-center gap-0 bg-slate-50 border-none rounded-2xl shadow-inner overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="w-[110px] md:w-[120px] shrink-0 space-y-0">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-transparent border-none h-14 md:h-16 shadow-none focus:ring-0 px-3">
                                  <SelectValue placeholder="Code">
                                    {(() => {
                                      const selected = countryCodes.find(c => c.name === field.value);
                                      return selected ? (
                                        <span className="flex items-center gap-1.5">
                                          <span className="text-lg md:text-xl leading-none">{selected.flag}</span>
                                          <span className="text-[13px] md:text-sm font-bold">{selected.code}</span>
                                        </span>
                                      ) : "Code";
                                    })()}
                                  </SelectValue>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-2xl border-slate-100 max-h-[300px]">
                                {countryCodes.map((item) => (
                                  <SelectItem key={`${item.code}-${item.name}`} value={item.name}>
                                    <span className="flex items-center gap-3">
                                      <span className="text-xl">{item.flag}</span>
                                      <span className="text-sm font-medium">{item.code} {item.name}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <div className="w-px h-8 bg-slate-200" />
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
                                className="bg-transparent border-none h-14 md:h-16 shadow-none focus-visible:ring-0 text-sm md:text-base px-4" 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">Service Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-50 border-none rounded-2xl h-14 md:h-16 shadow-inner text-sm md:text-base">
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl border-slate-100">
                            <SelectItem value="Thesis Writing">Thesis Writing</SelectItem>
                            <SelectItem value="Research Title">Research Title</SelectItem>
                            <SelectItem value="Research Paper">Research Paper</SelectItem>
                            <SelectItem value="Review Paper">Review Paper</SelectItem>
                            <SelectItem value="Synopsis">Synopsis</SelectItem>
                            <SelectItem value="Dissertation - I">Dissertation - I</SelectItem>
                            <SelectItem value="Dissertation - II">Dissertation - II</SelectItem>
                            <SelectItem value="PPT">PPT</SelectItem>
                            <SelectItem value="Project Report">Project Report</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">Research Details *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide topic details, desired timeline, and specific requirements..." 
                          className="bg-slate-50 border-none rounded-2xl min-h-[160px] md:min-h-[200px] shadow-inner text-sm md:text-lg p-6 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 md:h-20 rounded-2xl text-lg md:text-xl bg-primary hover:bg-blue-600 text-white shadow-2xl shadow-primary/20 flex gap-4 transition-all hover:-translate-y-1 active:scale-95 py-6 md:py-8 font-bold"
                  >
                     {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
                     {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleWhatsAppQuickAction}
                    variant="outline" 
                    className="w-full h-16 md:h-20 rounded-2xl text-base md:text-lg border-2 border-slate-100 hover:border-[#25D366] hover:text-[#25D366] transition-all active:scale-95 flex gap-4 shadow-sm bg-transparent text-slate-500 py-6 md:py-8 font-bold"
                  >
                    <MessageSquare className="h-6 w-6" /> Chat on WhatsApp
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
