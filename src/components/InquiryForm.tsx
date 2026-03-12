"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CloudUpload } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(10, "Please provide more details about your manuscript"),
});

export function InquiryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Manuscript Received",
      description: "Our publishing specialists are reviewing your request. We will contact you within 24 hours.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-headline font-bold text-accent">Submit Your Manuscript for Review</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Take the first step toward successful publication. Provide your paper details and receive a comprehensive publishing strategy within one business day.
            </p>
            
            <div className="space-y-6">
              {[
                "Blind Peer-Review Options Available",
                "Compliance with COPE Standards",
                "Non-Disclosure Agreement Included",
                "Journal Impact Factor Matching"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium text-accent">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background p-8 rounded-3xl shadow-xl border border-white/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Jane Smith" {...field} className="bg-white rounded-xl h-12" />
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
                      <FormLabel>Academic Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane.smith@university.edu" {...field} className="bg-white rounded-xl h-12" />
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
                      <FormLabel>Manuscript Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white rounded-xl h-12">
                            <SelectValue placeholder="Select current status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Initial Draft Review</SelectItem>
                          <SelectItem value="editing">Technical Editing Needed</SelectItem>
                          <SelectItem value="peer-review">Pre-Submission Peer Review</SelectItem>
                          <SelectItem value="rejection">Addressing Journal Rejection</SelectItem>
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
                      <FormLabel>Paper Abstract / Goals</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe your research findings and target journals..." 
                          className="bg-white rounded-xl min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 text-center cursor-pointer hover:bg-white/50 transition-colors">
                  <CloudUpload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Upload Draft (PDF/DOCX)</span>
                </div>

                <Button type="submit" className="w-full h-14 rounded-xl text-lg bg-accent hover:bg-accent/90 shadow-lg flex gap-2">
                  Submit Manuscript <Send className="h-5 w-5" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
