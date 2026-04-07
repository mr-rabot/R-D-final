
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_PATH = path.join(process.cwd(), 'src/app/lib/leadership-data.json');

/**
 * GET: Reads the scholarly content from the local root folder database.
 */
export async function GET() {
  try {
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
    console.error("Local Data Read Error:", error);
    return NextResponse.json({ error: 'Failed to read data from root folder' }, { status: 500 });
  }
}

/**
 * POST: Persists updates from the Admin Panel directly to the local JSON database.
 */
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    // Ensure the structure is valid before writing
    if (!newData || typeof newData !== 'object') {
      throw new Error("Invalid data payload received");
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), 'utf-8');
    
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error("Local Data Write Error:", error);
    return NextResponse.json({ 
      error: 'Failed to save data to root folder', 
      details: error.message 
    }, { status: 500 });
  }
}
