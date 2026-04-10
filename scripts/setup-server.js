
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
  integrations: { whatsapp: "916209779365" }
};

console.log('--- Initializing R&D Services Server Environment ---');

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
      console.log(`Permissions set to ${target.mode.toString(8)} for: ${path.basename(target.path)}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not setup ${target.path}:`, error.message);
  }
});

console.log('--- Server Environment Ready ---\n');
