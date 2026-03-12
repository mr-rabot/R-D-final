
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Blog } from "@/components/Blog";
import { InquiryForm } from "@/components/InquiryForm";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <Blog />
      <InquiryForm />
      <Footer />
    </main>
  );
}
