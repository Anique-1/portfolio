import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://anique.me'),
  title: 'Muhammad Anique | AI Engineer & Computer Vision Specialist',
  description: 'Portfolio of Muhammad Anique, an AI/ML engineer specializing in computer vision, agentic LLMs, and production AI systems.',
  keywords: [
    'Muhammad Anique',
    'Anique',
    'AI Engineer',
    'Machine Learning Engineer',
    'Computer Vision Specialist',
    'Agentic AI',
    'LangGraph',
    'YOLOv11',
    'PyTorch',
    'Medical AI',
    'FastAPI',
    'Pakistan AI Engineer',
  ],
  authors: [{ name: 'Muhammad Anique', url: 'https://anique.me' }],
  creator: 'Muhammad Anique',
  publisher: 'Muhammad Anique',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anique.me',
    siteName: 'Muhammad Anique — AI Engineer',
    title: 'Muhammad Anique | AI Engineer & Computer Vision Specialist',
    description: 'Portfolio of Muhammad Anique, an AI/ML engineer specializing in computer vision, agentic LLMs, and production AI systems.',
    images: [
      {
        url: '/Anique-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Anique — AI Engineer & Computer Vision Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Anique | AI Engineer & Computer Vision Specialist',
    description: 'Portfolio of Muhammad Anique, an AI/ML engineer specializing in computer vision, agentic LLMs, and production AI systems.',
    images: ['/Anique-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon1.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon1.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon1.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon1.png',
  },
  verification: {
    google: 'google3dfce55e56b5a06d',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#09090b' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Anique',
  url: 'https://anique.me',
  image: 'https://anique.me/Anique-image.png',
  jobTitle: 'AI Engineer & Computer Vision Specialist',
  worksFor: {
    '@type': 'Organization',
    name: 'SNGPL Pakistan',
  },
  sameAs: [
    'https://github.com/Anique-1',
    'https://www.linkedin.com/in/muhammad-anique-300828266/',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Computer Vision',
    'Deep Learning',
    'Machine Learning',
    'Agentic AI',
    'Natural Language Processing',
    'Python',
    'PyTorch',
    'FastAPI',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
