# R&DServices - Academic Manuscript Solutions

Professional research writing and academic consulting platform built with Next.js 15, Tailwind CSS, and a local file-based CMS.

## 🚀 Deployment Guide (Self-Hosted VPS)

This application is optimized for deployment on a Virtual Private Server (VPS) such as DigitalOcean, AWS EC2, or Linode. This ensures that your content updates and file uploads persist on your own hosting environment.

### 1. Server Environment Setup
Ensure your server has Node.js (v20+) and a process manager like PM2 installed.

### 2. Prepare the Application
```bash
# Clone your repository
git clone <your-repo-url>
cd rd-services

# Install dependencies
npm install

# Build the project
npm run build
```

### 3. Set Permissions (CRITICAL)
The Admin Panel needs permission to write to the data file and upload folders. Run these commands on your server:
```bash
chmod -R 775 public/images
chmod -R 775 public/resources
chmod 664 src/app/lib/leadership-data.json
```

### 4. Start the Production Server
Use PM2 to ensure the application stays online:
```bash
pm2 start npm --name "rd-services" -- start
```

### 5. Reverse Proxy (Nginx)
Configure Nginx to route traffic to `http://localhost:3000`. Ensure your client's body size limit is high enough for file uploads (e.g., `client_max_body_size 50M;`).

---

## 🛠 Admin Panel Access
The Admin Panel is located at `/admin`.
- **Default User**: `prexani.tech@gmail.com`
- **Default Key**: `Admin@9343`

*Note: You can update these credentials in `src/app/admin/page.tsx`.*

## ⚠️ Important Note on Managed Hosting (Vercel/Netlify)
If you deploy to Vercel or Netlify, the **Admin Panel will NOT persist changes**. These platforms use ephemeral filesystems. For those platforms, you must migrate the data to a database like MongoDB or Firestore. **For this project, a VPS is the recommended hosting choice.**
