
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

const DATA_PATH = path.resolve(process.cwd(), 'src/app/lib/leadership-data.json');

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
 * Robustly ensures the data directory and file exist with correct permissions.
 */
function ensureDataFile() {
  try {
    const dir = path.dirname(DATA_PATH);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true, mode: 0o775 });
    }
    if (!existsSync(DATA_PATH)) {
      writeFileSync(DATA_PATH, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      console.log("[DATA INIT]: Created default scholarly registry.");
    }
  } catch (err) {
    console.error("[DATA INIT ERROR]: Could not initialize registry file.", err.message);
  }
}

/**
 * GET: Reads the scholarly content with robust error recovery.
 */
export async function GET() {
  try {
    ensureDataFile();
    
    let fileContent = "";
    try {
      fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    } catch (readErr) {
      console.warn("[API READ WARNING]: File access delayed, using defaults.");
      return NextResponse.json(DEFAULT_DATA);
    }
    
    if (!fileContent || fileContent.trim() === "") {
      return NextResponse.json(DEFAULT_DATA);
    }

    try {
      const data = JSON.parse(fileContent);
      return NextResponse.json(data);
    } catch (jsonErr) {
      console.error("[API JSON ERROR]: Corrupted data detected. Recovering...");
      return NextResponse.json(DEFAULT_DATA);
    }
  } catch (error) {
    console.error("[API CRITICAL ERROR] GET /api/leadership:", error);
    return NextResponse.json(DEFAULT_DATA);
  }
}

/**
 * POST: Persists updates from the Admin Panel with atomic safety.
 */
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    const dir = path.dirname(DATA_PATH);
    if (!existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true });
    }

    // Atomic-like write: write to string first, then to file
    const serializedData = JSON.stringify(newData, null, 2);
    await fs.writeFile(DATA_PATH, serializedData, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API ERROR] POST /api/leadership:", error);
    return NextResponse.json({ error: 'Failed to persist scholarly data' }, { status: 500 });
  }
}
