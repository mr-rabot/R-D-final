
# R&DServices - Academic Manuscript Solutions

Professional research writing and academic consulting platform built with Next.js 15, Tailwind CSS, and MySQL.

## 🚀 Deployment Guide (Self-Hosted VPS)

This application is optimized for deployment on a Virtual Private Server (VPS) with a MySQL database.

### 1. Server Environment Setup
Ensure your server has Node.js (v20+), MySQL Server, and PM2 installed.

### 2. Database Configuration
Create a `.env` file in the root directory with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=rd_services
```

### 3. Prepare & Deploy
```bash
# Clone your repository
git clone <your-repo-url>
cd rd-services

# Install dependencies
npm install

# Build the project (Automated setup script will run pre-build to init folders and DB)
npm run build
```

### 4. Start the Production Server
```bash
pm2 start npm --name "rd-services" -- start
```

### 5. Nginx Configuration
Ensure Nginx is configured to handle the reverse proxy. Since the app runs on HTTP internally, Nginx should handle SSL termination.

---

## 🛠 Admin Panel Access
The Admin Panel is located at `/admin`.
- **Default User**: `prexani.tech@gmail.com`
- **Default Key**: `Admin@9343`

## ⚠️ Persistence Note
By using MySQL, your data is now professionally persisted. Changes made in the Admin Panel are stored in your database and served dynamically to users. Ensure you back up your MySQL database regularly.
