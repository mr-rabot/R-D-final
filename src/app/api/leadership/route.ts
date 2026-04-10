
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/app/lib/leadership-data.json');

const DEFAULT_DATA = {
  brand: { name: "R&D Services", logo: "", tagline: "Academic Manuscript Solutions" },
  hero: { title: "Scholarly Research Perfected.", subtitle: "Elite academic support.", badge: "Premier Research Excellence", stats: [], image: "" },
  leadership: { founder: { name: "Om Prakash Sinha", role: "Founder & Director", image: "" } },
  services: [],
  pricing: [],
  testimonials: [],
  faqs: [],
  blog: { title: "Academic Hub", subtitle: "Expert advice.", posts: [] },
  resources: [],
  integrations: { whatsapp: "916209779365" },
  contactForm: { 
    fields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Enter your name", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "email@example.com", required: true },
      { id: "service", label: "Service", type: "select", placeholder: "Select service", required: true, options: ["Thesis Writing", "Research Paper", "Others"] },
      { id: "details", label: "Details", type: "textarea", placeholder: "Requirements...", required: true }
    ] 
  }
};

export async function GET() {
  try {
    if (!existsSync(DATA_PATH)) {
      return NextResponse.json(DEFAULT_DATA);
    }
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    if (!fileContent.trim()) return NextResponse.json(DEFAULT_DATA);
    const data = JSON.parse(fileContent);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error("Data Read Error:", error);
    return NextResponse.json(DEFAULT_DATA);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const dir = path.dirname(DATA_PATH);
    if (!existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Data Write Error:", error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
