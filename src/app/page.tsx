
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { InquiryForm } from "@/components/InquiryForm";
import { Footer } from "@/components/Footer";
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getSiteData() {
  const DATA_PATH = path.resolve(process.cwd(), 'src/app/lib/leadership-data.json');
  try {
    if (!existsSync(DATA_PATH)) {
      return null;
    }
    
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    if (!fileContent || fileContent.trim() === "") return null;
    
    try {
      return JSON.parse(fileContent);
    } catch (parseErr) {
      console.error("[SSR ERROR]: Data parse failure.");
      return null;
    }
  } catch (error) {
    console.error("[SSR ERROR]: Data access failure.");
    return null;
  }
}

export default async function Home() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen">
      <Navbar initialData={data} />
      <Hero initialData={data?.hero} />
      <HowItWorks />
      <Services initialData={data?.services} />
      <Pricing initialData={data} />
      <About initialData={data} />
      <Blog initialData={data?.blog} isFullPage={false} />
      <Testimonials initialData={data?.testimonials} />
      <FAQ initialData={data?.faqs} />
      <InquiryForm initialData={data} />
      <Footer initialData={data} />
    </main>
  );
}
