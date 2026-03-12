
"use client";

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
import { Mail, Phone, Send, User } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(10, "Please provide some project details"),
});

export function InquiryForm() {
  const { toast } = useToast();
  const contactImage = PlaceHolderImages.find(img => img.id === "service-3");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Inquiry Submitted",
      description: "We have received your request and will respond within 24 hours.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-headline font-bold text-accent">Get in Touch</h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                Have a research project in mind? Contact R & D Services Pvt. Ltd. to discuss how we can help.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-xl text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Leadership</h4>
                  <p className="text-slate-600 font-bold">Om Prakash Sinha</p>
                  <p className="text-xs uppercase text-slate-500">Founder & Director</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-xl text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Email Us</h4>
                  <p className="text-slate-600">support.rdservices@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-xl text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg">Call Us</h4>
                  <p className="text-slate-600">+91 6209779365</p>
                  <p className="text-slate-600">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="relative pt-8">
              {contactImage?.imageUrl ? (
                <Image
                  src={contactImage.imageUrl}
                  alt={contactImage.description || "Library books"}
                  width={500}
                  height={300}
                  className="rounded-[32px] shadow-lg object-cover w-full h-64 lg:h-80"
                  data-ai-hint={contactImage.imageHint}
                />
              ) : null}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100">
            <div className="mb-10 space-y-2">
              <h3 className="text-2xl font-bold text-accent">Get Your Quote</h3>
              <p className="text-slate-500">Fill out the form and we'll respond within 24 hours</p>
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
                        <Input placeholder="Enter your name" {...field} className="bg-slate-50 border-none rounded-xl h-12" />
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
                      <FormLabel className="text-sm font-bold text-accent">Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="bg-slate-50 border-none rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-accent">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 XXXXX XXXXX" {...field} className="bg-slate-50 border-none rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-accent">Service Required *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 border-none rounded-xl h-12">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="research-paper">Research Paper</SelectItem>
                          <SelectItem value="thesis">Thesis Writing</SelectItem>
                          <SelectItem value="dissertation">Dissertation</SelectItem>
                          <SelectItem value="synopsis">Synopsis Writing</SelectItem>
                          <SelectItem value="ppt">PPT Presentation</SelectItem>
                          <SelectItem value="plagiarism-report">Plagiarism Report</SelectItem>
                          <SelectItem value="project-report">Project Report</SelectItem>
                          <SelectItem value="literature-review">Literature Review</SelectItem>
                          <SelectItem value="proposal">Research Proposal</SelectItem>
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
                          className="bg-slate-50 border-none rounded-xl min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-14 rounded-xl text-lg bg-black hover:bg-slate-900 text-white shadow-lg flex gap-2">
                   <Send className="h-5 w-5" /> Submit Inquiry
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
