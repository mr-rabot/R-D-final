import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { image, name, oldUrl } = await request.json();
    if (!image) return NextResponse.json({ error: 'No image data provided' }, { status: 400 });

    // Handle deletion of the old image if it exists and is a local file
    if (oldUrl && typeof oldUrl === 'string' && oldUrl.startsWith('/images/')) {
      const oldFileName = oldUrl.split('?')[0].split('/').pop();
      if (oldFileName) {
        const oldFilePath = path.join(process.cwd(), 'public', 'images', oldFileName);
        try {
          await fs.unlink(oldFilePath);
        } catch (err) {
          // File might already be deleted or doesn't exist, which is fine
        }
      }
    }

    // Extract base64 data
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Create unique filename
    const sanitizedName = (name || 'upload').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Use .png to preserve transparency
    const fileName = `${sanitizedName}_${Date.now()}.png`;
    
    // Define upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    
    // Ensure directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    // Return the URL that can be used in the frontend
    return NextResponse.json({ url: `/images/${fileName}` });
  } catch (error) {
    console.error("Image Upload Error:", error);
    return NextResponse.json({ error: 'Failed to save image to server' }, { status: 500 });
  }
}
