# R&DServices - Academic Manuscript Solutions

Professional research writing and academic consulting platform built with Next.js 15, Tailwind CSS, and Firebase.

## 🚀 Deployment Guide

This is a Next.js application with dynamic API routes. To host it, you need a environment that supports a Node.js runtime.

### Option 1: Virtual Private Server (VPS) - DigitalOcean, AWS, etc.
Recommended for full control and persistent local storage.

1.  **Server Setup**: Ensure Node.js (v20+) is installed.
2.  **Clone & Install**:
    ```bash
    git clone <your-repo-url>
    cd rd-services
    npm install
    ```
3.  **Build the Application**:
    ```bash
    npm run build
    ```
4.  **Manage with PM2**:
    ```bash
    npm install -g pm2
    pm2 start npm --name "rd-services" -- start
    ```
5.  **Reverse Proxy**: Set up Nginx or Apache to proxy traffic to `http://localhost:3000`.

### Option 2: Firebase App Hosting
The most native experience for this project.

1.  Push your code to a GitHub repository.
2.  Go to the [Firebase Console](https://console.firebase.google.com/).
3.  Navigate to **App Hosting** and connect your repository.
4.  Firebase will automatically detect the Next.js framework and deploy it.

### ⚠️ Critical Production Note: Data Persistence
Currently, the **Admin Panel** saves data to `src/app/lib/leadership-data.json` and images to the `public/` folder. 
- **On a VPS**: This works fine as long as you don't overwrite the folder on redeploy.
- **On Vercel/App Hosting**: These platforms have **ephemeral filesystems**. Your changes made in the Admin Panel **will be lost** every time the app redeploys or restarts.

**Recommendation**: For production, use the included Firebase SDKs to migrate the data to **Cloud Firestore** and images to **Firebase Storage**.

## 🛠 Development

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
