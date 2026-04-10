
# R&DServices - Academic Manuscript Solutions

Professional research writing and academic consulting platform built with Next.js 15, Tailwind CSS, and local JSON persistence.

## 🚀 Deployment Guide (Self-Hosted VPS)

This application is optimized for deployment on a Virtual Private Server (VPS).

### 1. Server Environment Setup
Ensure your server has Node.js (v20+) and PM2 installed.

### 2. Prepare & Deploy
```bash
# Clone your repository
git clone <your-repo-url>
cd rd-services

# Install dependencies
npm install

# Build the project (Automated setup script will run pre-build to init folders)
npm run build
```

### 3. Start the Production Server
```bash
pm2 start npm --name "rd-services" -- start
```

### 4. Nginx Configuration
Ensure Nginx is configured to handle the reverse proxy. Since the app runs on HTTP internally, Nginx should handle SSL termination.

---

## 🛠 Admin Panel Access
The Admin Panel is located at `/admin`.
- **Default User**: `prexani.tech@gmail.com`
- **Default Key**: `Admin@9343`

## ⚠️ Persistence Note
Data is stored in `src/app/lib/leadership-data.json`. Ensure this file has write permissions for the Node.js process.
