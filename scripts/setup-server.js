
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Automates server environment setup for R&DServices.
 * Handles directory creation, file permissions, and MySQL table initialization.
 */

const paths = [
  { path: path.join(process.cwd(), 'public/images'), mode: 0o775 },
  { path: path.join(process.cwd(), 'public/resources'), mode: 0o775 }
];

const defaultStructure = {
  brand: { name: 'R&D Services', tagline: 'Academic Manuscript Solutions' },
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

async function setupDatabase() {
  console.log('--- Initializing R&DServices MySQL Database ---');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rd_services'
  };

  try {
    // Connect without DB first to ensure DB exists
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
    await connection.query(`USE \`${config.database}\``);

    // Create the table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_data (
        id INT PRIMARY KEY,
        content LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Check if data already exists
    const [rows] = await connection.query('SELECT id FROM site_data WHERE id = 1');
    if (rows.length === 0) {
      console.log('Seeding initial scholarly data structure...');
      await connection.query('INSERT INTO site_data (id, content) VALUES (1, ?)', [JSON.stringify(defaultStructure)]);
    }

    await connection.end();
    console.log('Database synchronization complete.');
  } catch (error) {
    console.warn('Database Setup Warning:', error.message);
    console.warn('Please ensure your MySQL server is running and credentials in .env are correct.');
  }
}

console.log('--- Initializing R&DServices Server Environment ---');

paths.forEach((target) => {
  try {
    if (!fs.existsSync(target.path)) {
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

setupDatabase().then(() => {
  console.log('--- Server Environment Ready ---\n');
});
