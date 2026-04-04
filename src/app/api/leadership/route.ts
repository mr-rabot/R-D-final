import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Initialize Firebase for the server environment
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function GET() {
  try {
    const docRef = doc(db, 'siteSettings', 'leadership');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return new NextResponse(JSON.stringify(docSnap.data()), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }

    // Migration: If Firestore is empty, attempt to read from local file once
    const DATA_PATH = path.join(process.cwd(), 'src/app/lib/leadership-data.json');
    try {
      const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
      const data = JSON.parse(fileContent);
      // Seed Firestore with the initial data
      await setDoc(docRef, data);
      return NextResponse.json(data);
    } catch (e) {
      return NextResponse.json({ error: 'Data not initialized' }, { status: 404 });
    }
  } catch (error) {
    console.error("Firestore GET Error:", error);
    return NextResponse.json({ error: 'Failed to read data from cloud' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const docRef = doc(db, 'siteSettings', 'leadership');
    await setDoc(docRef, newData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Firestore POST Error:", error);
    return NextResponse.json({ error: 'Failed to save data to cloud' }, { status: 500 });
  }
}
