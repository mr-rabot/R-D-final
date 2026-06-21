
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

const DATA_PATH = path.resolve(process.cwd(), 'src/app/lib/leadership-data.json');

const DEFAULT_DATA = {
  adminCredentials: {
    email: "prexani.tech@gmail.com",
    password: "Admin@9343",
    lastChanged: Date.now()
  },
  brand: { name: "R&D Services", logo: "", tagline: "Academic Manuscript Solutions" },
  hero: { title: "Scholarly Research Perfected.", subtitle: "Elite academic support.", badge: "Premier Research Excellence", stats: [], image: "" },
  leadership: { 
    founder: { name: "Om Prakash Sinha", role: "Founder & Director", image: "" },
    coFounder: { name: "Co-Founder", role: "Research Head", image: "" }
  },
  firmSummary: {
    title: "Global Research Legacy",
    description: "Building scholarly legacies through methodological rigor.",
    stats: [
      { label: "Research legacy", value: "500+" },
      { label: "Elite Journals", value: "120+" }
    ]
  },
  services: [],
  pricing: [],
  testimonials: [],
  faqs: [],
  blog: { 
    title: "Academic Hub", 
    subtitle: "Expert advice.", 
    posts: [
      { title: "Systematic Literature Review", excerpt: "A guide to rigorous synthesis.", author: "Academic Team", date: new Date().toLocaleDateString(), category: "Methodology", image: "" },
      { title: "Peer-Review Strategies", excerpt: "How to handle Scopus reviewer comments.", author: "Expert Board", date: new Date().toLocaleDateString(), category: "Publishing", image: "" },
      { title: "Statistical Rigor in PhD", excerpt: "Ensuring reproducibility in data.", author: "Dr. Sinha", date: new Date().toLocaleDateString(), category: "Statistics", image: "" },
      { title: "Journal Selection Criteria", excerpt: "Finding the right high-impact factor home.", author: "Team R&D", date: new Date().toLocaleDateString(), category: "Publication", image: "" },
      { title: "APA 7th Essentials", excerpt: "Common formatting pitfalls to avoid.", author: "Formatting Desk", date: new Date().toLocaleDateString(), category: "Writing", image: "" },
      { title: "Research Gap Identification", excerpt: "Novelty as the key to acceptance.", author: "Leadership", date: new Date().toLocaleDateString(), category: "Methodology", image: "" },
      { title: "Dissertation Frameworks", excerpt: "Structural blueprints for doctoral success.", author: "Academic Lead", date: new Date().toLocaleDateString(), category: "Thesis", image: "" },
      { title: "Ethical Research Conduct", excerpt: "Navigating plagiarism and integrity.", author: "Compliance Desk", date: new Date().toLocaleDateString(), category: "Ethics", image: "" }
    ] 
  },
  resources: [],
  integrations: { whatsapp: "916209779365" },
  contactForm: { 
    fields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Enter your name", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "email@example.com", required: true },
      { id: "phone", label: "Contact Number", type: "tel", placeholder: "Mobile number", required: true, showCountryCode: true },
      { id: "service", label: "Service", type: "select", placeholder: "Select service", required: true, options: ["Thesis Writing", "Research Paper", "Review Paper", "Others"] },
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
    
    const existingData = JSON.parse(fileContent);
    
    // Hardened deep merge for credentials and session timestamps
    const mergedData = { 
      ...DEFAULT_DATA, 
      ...existingData,
      adminCredentials: { 
        ...DEFAULT_DATA.adminCredentials, 
        ...(existingData.adminCredentials || {}) 
      }
    };
    
    return new NextResponse(JSON.stringify(mergedData), {
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
