
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET: Reads the scholarly content from the MySQL database.
 */
export async function GET() {
  try {
    const results = await query<any[]>('SELECT content FROM site_data WHERE id = 1');
    
    if (results.length === 0) {
      // Fallback if DB is empty but table exists
      return NextResponse.json({ error: 'No data found in database' }, { status: 404 });
    }

    const data = JSON.parse(results[0].content);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error("MySQL Data Read Error:", error);
    return NextResponse.json({ 
      error: 'Failed to read data from database',
      details: error.message 
    }, { status: 500 });
  }
}

/**
 * POST: Persists updates from the Admin Panel directly to the MySQL database.
 */
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    if (!newData || typeof newData !== 'object') {
      throw new Error("Invalid data payload received");
    }

    const contentString = JSON.stringify(newData);
    
    // UPSERT logic: Insert if not exists, otherwise update
    await query(
      `INSERT INTO site_data (id, content) VALUES (1, ?) 
       ON DUPLICATE KEY UPDATE content = ?`,
      [contentString, contentString]
    );
    
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error("MySQL Data Write Error:", error);
    return NextResponse.json({ 
      error: 'Failed to save data to database', 
      details: error.message 
    }, { status: 500 });
  }
}
