
const fs = require('fs');
const path = require('path');

/**
 * Automates server environment setup for R&DServices.
 * Ensures directories exist and have correct permissions for file-based CMS.
 */

const paths = [
  { path: path.join(process.cwd(), 'public/images'), mode: 0o775 },
  { path: path.join(process.cwd(), 'public/resources'), mode: 0o775 },
  { path: path.join(process.cwd(), 'src/app/lib/leadership-data.json'), mode: 0o664, isFile: true }
];

const defaultStructure = {
  brand: { name: 'R&DServices', tagline: 'Academic Manuscript Solutions' },
  hero: { badge: 'Premier Research Excellence', title: 'Scholarly Research Perfected.', stats: [] },
  leadership: { founder: { name: 'Om Prakash Sinha', role: 'Founder & Director' } },
  firmSummary: { title: 'A Global Research Legacy', description: '', stats: [] },
  services: [],
  blog: { title: 'Academic Hub', subtitle: '', posts: [] },
  resources: [],
  pricing: [],
  testimonials: [],
  faqs: [],
  integrations: { whatsapp: '916209779365' }
};

console.log('--- Initializing R&DServices Server Environment ---');

paths.forEach((target) => {
  try {
    if (target.isFile) {
      if (!fs.existsSync(target.path)) {
        console.log(`Creating default data file: ${target.path}`);
        fs.writeFileSync(target.path, JSON.stringify(defaultStructure, null, 2));
      }
    } else {
      if (!fs.existsSync(target.path)) {
        console.log(`Creating directory: ${target.path}`);
        fs.mkdirSync(target.path, { recursive: true });
      }
    }

    // Set permissions (Works on Linux/Unix VPS environments)
    if (process.platform !== 'win32') {
      fs.chmodSync(target.path, target.mode);
      console.log(`Permissions set to ${target.mode.toString(8)} for: ${path.basename(target.path)}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not setup ${target.path}:`, error.message);
  }
});

console.log('--- Server Environment Ready ---\n');
