
"use client";

import { useEffect, useState, useRef, useMemo } from "react";
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
  const [siteData, setSiteData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize form structure from data
  const formFields = siteData?.contactForm?.fields || [
    { id: "1", name: "name", label: "Full Name", type: "text", placeholder: "Enter your name", required: true },
    { id: "2", name: "email", label: "Email Address", type: "email", placeholder: "email@example.com", required: true },
    { id: "phone-group", name: "phone", label: "Contact Number", type: "phone", required: true },
    { id: "3", name: "service", label: "Service Type", type: "select", options: ["Thesis Writing", "Research Paper", "Synopsis", "Dissertation - I", "Dissertation - II", "PPT", "Project Report"], required: true },
    { id: "4", name: "details", label: "Research Details", type: "textarea", placeholder: "Please provide topic details...", required: true }
  ];

  // Dynamic Schema Generation
  const dynamicSchema = useMemo(() => {
    const shape: any = {};
    formFields.forEach((field: any) => {
      let validator = z.string();
      
      if (field.type === 'email') {
        validator = validator.email("Please enter a valid email address");
      }
      
      if (field.required) {
        validator = validator.min(1, `${field.label} is required`);
        if (field.type === 'textarea') {
          validator = validator.min(10, "Please provide more details");
        }
      } else {
        validator = validator.optional() as any;
      }

      if (field.type === 'phone') {
        shape['countryCode'] = z.string().min(1, "Required");
        shape['phone'] = field.required ? z.string().min(1, "Mobile number is required") : z.string().optional();
      } else {
        shape[field.name] = validator;
      }
    });
    return z.object(shape);
  }, [formFields]);

  // Default values
  const defaultValues = useMemo(() => {
    const values: any = {};
    formFields.forEach((field: any) => {
      if (field.type === 'phone') {
        values['countryCode'] = "India";
        values['phone'] = "";
      } else {
        values[field.name] = "";
      }
    });
    return values;
  }, [formFields]);

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues
  });

  useEffect(() => {
    fetch('/api/leadership', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setSiteData(data))
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  async function onSubmit(values: any) {
    setIsSubmitting(true);
    
    try {
      // Build a clean message for the email
      let message = "";
      formFields.forEach((f: any) => {
        if (f.type === 'phone') {
          message += `${f.label}: ${values.countryCode} ${values.phone}\n`;
        } else {
          message += `${f.label}: ${values[f.name]}\n`;
        }
      });

      const response = await fetch("https://formsubmit.co/ajax/support.rdservices@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          message: message,
          _subject: `New Research Inquiry from ${values.name || 'Scholar'}`,
          _template: "table"
        }),
      });

      if (response.ok) {
        toast({
          title: "Inquiry Sent Successfully",
          description: "Our academic team has received your message and will contact you shortly.",
        });
        form.reset(defaultValues);
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
    const whatsappNumber = siteData?.integrations?.whatsapp || "916209779365";
    
    if (!values.name || !values.service) {
      const quickMessage = encodeURIComponent("Hi R&DServices, I am interested in your academic consulting services.");
      window.open(`https://wa.me/${whatsappNumber}?text=${quickMessage}`, '_blank');
      return;
    }

    let messageText = `*New Quote Request from Website*\n\n`;
    formFields.forEach((f: any) => {
      if (f.type === 'phone') {
        const selectedCountry = countryCodes.find(c => c.name === values.countryCode);
        messageText += `*${f.label}:* ${selectedCountry?.code || "+91"} ${values.phone}\n`;
      } else {
        messageText += `*${f.label}:* ${values[f.name]}\n`;
      }
    });
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  const founder = siteData?.leadership?.founder;
  const whatsappNumber = siteData?.integrations?.whatsapp || "916209779365";
  const linkedinUrl = siteData?.integrations?.linkedin;
  const contactImage = siteData?.firmSummary?.image;

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
                  <h4 className="font-bold text-accent text-lg md:text-xl">{founder?.name || "Om Prakash Sinha"}</h4>
                  <p className="text-slate-500 text-[13px] md:text-sm">{founder?.role || "Founder & Director"}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 md:gap-6">
                <div className="bg-white shadow-md p-3 rounded-xl text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Email Us</h4>
                  <a href="mailto:support.rdservices@gmail.com" className="text-slate-600 break-all font-medium text-sm md:text-base hover:text-primary transition-colors">
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
                  <p className="text-slate-600 font-medium text-sm md:text-base">+{whatsappNumber}</p>
                  <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-1">Available 24/7</p>
                </div>
              </div>

              {linkedinUrl && (
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="bg-white shadow-md p-3 rounded-xl text-primary shrink-0">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-lg">LinkedIn</h4>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 font-medium text-sm md:text-base hover:text-primary transition-colors">
                      Connect with Us
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="relative pt-4 hidden md:block">
              {contactImage && (
                <div className={cn(
                  "relative w-full aspect-[16/10] overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-200 transition-all duration-1000 delay-300 bg-slate-100",
                  isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}>
                  <Image src={contactImage} alt="Research Visual" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                </div>
              )}
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
                {formFields.map((field: any) => {
                  if (field.type === 'phone') {
                    return (
                      <div key={field.id} className="space-y-2">
                        <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">{field.label} {field.required && "*"}</FormLabel>
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
                            render={({ field: phoneField }) => (
                              <FormItem className="flex-grow space-y-0">
                                <FormControl>
                                  <Input type="tel" placeholder="Mobile number" {...phoneField} className="bg-transparent border-none h-14 md:h-16 shadow-none focus-visible:ring-0 text-sm md:text-base px-4" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    );
                  }

                  return (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={field.name}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel className="text-[11px] font-bold text-accent uppercase tracking-wider">{field.label} {field.required && "*"}</FormLabel>
                          <FormControl>
                            {field.type === 'textarea' ? (
                              <Textarea placeholder={field.placeholder} {...inputField} className="bg-slate-50 border-none rounded-2xl min-h-[160px] md:min-h-[200px] shadow-inner text-sm md:text-lg p-6 resize-none" />
                            ) : field.type === 'select' ? (
                              <Select onValueChange={inputField.onChange} defaultValue={inputField.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-50 border-none rounded-2xl h-14 md:h-16 shadow-inner text-sm md:text-base">
                                    <SelectValue placeholder={field.placeholder || "Select an option"} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-2xl border-slate-100">
                                  {field.options?.map((opt: string) => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input type={field.type} placeholder={field.placeholder} {...inputField} className="bg-slate-50 border-none rounded-2xl h-14 md:h-16 shadow-inner text-sm md:text-base" />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}

                <div className="flex flex-col gap-4 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full h-16 md:h-20 rounded-2xl text-lg md:text-xl bg-primary hover:bg-blue-600 text-white shadow-2xl shadow-primary/20 flex gap-4 transition-all hover:-translate-y-1 active:scale-95 py-6 md:py-8 font-bold">
                     {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
                     {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                  <Button type="button" onClick={handleWhatsAppQuickAction} variant="outline" className="w-full h-16 md:h-20 rounded-2xl text-base md:text-lg border-2 border-slate-100 hover:border-[#25D366] hover:text-[#25D366] transition-all active:scale-95 flex gap-4 shadow-sm bg-transparent text-slate-500 py-6 md:py-8 font-bold">
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
