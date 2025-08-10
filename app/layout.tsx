import './globals.css'
import Header from '../components/Header'
import { AuthProvider } from '../lib/auth'
import { Suspense } from 'react'
import { SkeletonLoader } from '../components/SkeletonLoader'
import PerformanceMonitor from '../components/PerformanceMonitor'

export const metadata = {
  title: 'Reigns - My Beautiful Market',
  description: 'My beautiful market - Discover extraordinary products from around the world',
  keywords: 'marketplace, e-commerce, shopping, products, online store',
  authors: [{ name: 'Reigns Marketplace' }],
  creator: 'Reigns',
  publisher: 'Reigns',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://reigns-market.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Reigns - My Beautiful Market',
    description: 'Discover extraordinary products from around the world',
    url: 'https://reigns-market.com',
    siteName: 'Reigns Marketplace',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reigns - My Beautiful Market',
    description: 'Discover extraordinary products from around the world',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://api.reigns-market.com" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        <AuthProvider>
          <Suspense fallback={
            <div className="h-16 md:h-20 bg-white/90 backdrop-blur-xl border-b border-white/20">
              <SkeletonLoader height={64} className="md:h-20" />
            </div>
          }>
            <Header />
          </Suspense>
          <main className="pt-16 md:pt-20 min-h-screen">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <SkeletonLoader height={400} width={600} className="rounded-3xl" />
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
