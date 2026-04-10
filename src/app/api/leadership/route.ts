
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/app/lib/leadership-data.json');

const DEFAULT_DATA = {
  brand: { name: "R&D Services", logo: "" },
  hero: { title: "Scholarly Research Perfected.", subtitle: "Elite academic support.", stats: [] },
  services: [],
  pricing: [],
  testimonials: [],
  faqs: [],
  blog: { posts: [] },
  resources: [],
  contactForm: {
    title: "Request Quote",
    subtitle: "Discuss your project directly with our experts.",
    fields: [
      { id: "1", name: "name", label: "Full Name", type: "text", placeholder: "Enter your name", required: true },
      { id: "2", name: "email", label: "Email Address", type: "email", placeholder: "email@example.com", required: true },
      { id: "phone-group", name: "phone", label: "Contact Number", type: "phone", required: true },
      { id: "3", name: "service", label: "Service Type", type: "select", options: ["Thesis Writing", "Research Paper", "Synopsis", "Dissertation - I", "Dissertation - II", "PPT", "Project Report"], required: true },
      { id: "4", name: "details", label: "Research Details", type: "textarea", placeholder: "Please provide topic details...", required: true }
    ]
  },
  integrations: { whatsapp: "916209779365" }
};

/**
 * GET: Reads the scholarly content from the local JSON file.
 * Returns default data if the file is missing or corrupted.
 */
export async function GET() {
  try {
    if (!existsSync(DATA_PATH)) {
      // Ensure directory exists
      const dir = path.dirname(DATA_PATH);
      if (!existsSync(dir)) {
        await fs.mkdir(dir, { recursive: true });
      }
      await fs.writeFile(DATA_PATH, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return NextResponse.json(DEFAULT_DATA);
    }
    
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    
    // Robustness check for empty file
    if (!fileContent || fileContent.trim() === "") {
      return NextResponse.json(DEFAULT_DATA);
    }

    try {
      const data = JSON.parse(fileContent);
      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    } catch (parseError) {
      console.error("Data Parse Error, reverting to default:", parseError);
      return NextResponse.json(DEFAULT_DATA);
    }
  } catch (error) {
    console.error("Data Read Error:", error);
    return NextResponse.json(DEFAULT_DATA);
  }
}

/**
 * POST: Persists updates from the Admin Panel directly to the local JSON file.
 */
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    // Ensure directory exists
    const dir = path.dirname(DATA_PATH);
    if (!existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true });
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), 'utf-8');
    
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error("Data Write Error:", error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
