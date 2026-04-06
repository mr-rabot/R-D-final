import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { fileData, fileName, oldUrl } = await request.json();
    if (!fileData) return NextResponse.json({ error: 'No file data provided' }, { status: 400 });

    // Handle deletion of the old resource if it's a local file
    if (oldUrl && typeof oldUrl === 'string' && oldUrl.startsWith('/resources/')) {
      const oldFileName = oldUrl.split('?')[0].split('/').pop();
      if (oldFileName) {
        const oldFilePath = path.join(process.cwd(), 'public', 'resources', oldFileName);
        try {
          await fs.unlink(oldFilePath);
        } catch (err) {
          // File might not exist
        }
      }
    }

    // Extract base64 data
    const base64Data = fileData.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Create unique filename
    const ext = path.extname(fileName) || '.pdf';
    const base = path.basename(fileName, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const finalFileName = `${base}_${Date.now()}${ext}`;
    
    // Define upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'resources');
    
    // Ensure directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, finalFileName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/resources/${finalFileName}` });
  } catch (error) {
    console.error("Resource Upload Error:", error);
    return NextResponse.json({ error: 'Failed to save resource to server' }, { status: 500 });
  }
}
