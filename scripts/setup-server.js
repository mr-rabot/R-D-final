
const fs = require('fs');
const path = require('path');

/**
 * Automates server environment setup for R&D Services.
 * Handles directory creation and file permissions for local persistence.
 */

const paths = [
  { path: path.join(process.cwd(), 'public/images'), mode: 0o775 },
  { path: path.join(process.cwd(), 'public/resources'), mode: 0o775 },
  { path: path.join(process.cwd(), 'src/app/lib'), mode: 0o775 },
  { path: path.join(process.cwd(), 'src/app/lib/leadership-data.json'), mode: 0o664 }
];

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

console.log('--- Initializing R&D Services Server Environment ---');

paths.forEach((target) => {
  try {
    if (target.path.endsWith('.json')) {
        const dir = path.dirname(target.path);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(target.path)) {
            console.log(`Creating default data file: ${target.path}`);
            fs.writeFileSync(target.path, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
        }
    } else if (!fs.existsSync(target.path)) {
      console.log(`Creating directory: ${target.path}`);
      fs.mkdirSync(target.path, { recursive: true });
    }

    if (process.platform !== 'win32') {
      try {
        fs.chmodSync(target.path, target.mode);
        console.log(`Permissions set to ${target.mode.toString(8)} for: ${path.basename(target.path)}`);
      } catch (chmodErr) {
        console.warn(`Warning: Could not set permissions for ${target.path}: ${chmodErr.message}`);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not setup ${target.path}:`, error.message);
  }
});

console.log('--- Server Environment Ready ---\n');
