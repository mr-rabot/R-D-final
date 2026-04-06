import { Navbar } from "@/components/Navbar";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import fs from 'fs/promises';
import path from 'path';

async function getSiteData() {
  const DATA_PATH = path.join(process.cwd(), 'src/app/lib/leadership-data.json');
  try {
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load site data for blog page:", error);
    return null;
  }
}

export default async function BlogPage() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar initialData={data} />
      <div className="pt-24">
        <Blog initialData={data?.blog} />
      </div>
      <Footer initialData={data} />
    </main>
  );
}
