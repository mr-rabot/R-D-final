
const fs = require('fs');
const path = require('path');

const paths = [
  { path: path.join(process.cwd(), 'public/images'), mode: 0o775 },
  { path: path.join(process.cwd(), 'public/resources'), mode: 0o775 },
  { path: path.join(process.cwd(), 'src/app/lib'), mode: 0o775 },
  { path: path.join(process.cwd(), 'src/app/lib/leadership-data.json'), mode: 0o664 }
];

const DEFAULT_DATA = {
  adminCredentials: {
    email: "prexani.tech@gmail.com",
    password: "Admin@9343"
  },
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

console.log('--- Initializing Server Environment ---');

paths.forEach((target) => {
  try {
    if (target.path.endsWith('.json')) {
        if (!fs.existsSync(target.path)) {
            console.log(`Creating default data file: ${target.path}`);
            fs.writeFileSync(target.path, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
        }
    } else if (!fs.existsSync(target.path)) {
      console.log(`Creating directory: ${target.path}`);
      fs.mkdirSync(target.path, { recursive: true });
    }

    if (process.platform !== 'win32') {
      fs.chmodSync(target.path, target.mode);
    }
  } catch (error) {
    console.warn(`Warning: Could not setup ${target.path}:`, error.message);
  }
});

console.log('--- Server Environment Ready ---\n');
