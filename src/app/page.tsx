import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { InquiryForm } from "@/components/InquiryForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Services />
      <About />
      <Blog />
      <Testimonials />
      <FAQ />
      <InquiryForm />
      <Footer />
    </main>
  );
}
