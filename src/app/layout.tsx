
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { Inter, Alegreya } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

export const viewport: Viewport = {
  themeColor: '#0047FF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'R&D Services | Academic Manuscript Solutions & Research Publishing',
    template: '%s | R&D Services'
  },
  description: 'Elite academic support for researchers. Expert guidance in scholarly publishing, research paper drafting, thesis writing, and peer-review success. Elevate your research impact with Om Prakash Sinha.',
  keywords: [
    'Academic Manuscript Solutions',
    'Research Paper Writing',
    'Thesis Writing Support',
    'Scholarly Publishing',
    'Peer Review Success',
    'R&D Services',
    'Om Prakash Sinha',
    'Scopus Journal Publishing',
    'PhD Dissertation Support',
    'Academic Consulting'
  ],
  authors: [{ name: 'Om Prakash Sinha' }],
  creator: 'R&D Services',
  publisher: 'R&D Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rdservices.in'), // Replace with your actual production domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'R&D Services | Academic Manuscript Solutions',
    description: 'Professional research writing and academic consulting platform led by Om Prakash Sinha.',
    url: 'https://rdservices.in',
    siteName: 'R&D Services',
    images: [
      {
        url: '/images/og-image.jpg', // Ensure this image exists in public/images
        width: 1200,
        height: 630,
        alt: 'R&D Services - Scholarly Research Perfected',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'R&D Services | Academic Manuscript Solutions',
    description: 'Elite academic support for researchers who demand precision and integrity.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreya.variable} w-full overflow-x-hidden scroll-smooth`}>
      <body className="font-body antialiased selection:bg-primary/20 w-full overflow-x-hidden bg-background">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
