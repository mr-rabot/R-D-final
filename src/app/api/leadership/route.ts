
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
  integrations: { whatsapp: "916209779365" }
};

/**
 * GET: Reads the scholarly content from the local JSON file.
 * Returns default data if the file is missing or corrupted.
 */
export async function GET() {
  try {
    if (!existsSync(DATA_PATH)) {
      return NextResponse.json(DEFAULT_DATA);
    }
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Data Read Error:", error);
    // Return default data instead of 500 to keep the site functional
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
