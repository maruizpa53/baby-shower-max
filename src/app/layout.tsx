import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Baby Shower Gift Selector | Selector de Regalos para Bebé',
  description: 'Selector inteligente de regalos para baby shower con pañales por etapa. Sistema de reservas en tiempo real sin repetidos.',
  keywords: [
    'baby shower', 
    'regalos bebé', 
    'pañales', 
    'Colombia', 
    'Falabella', 
    'Éxito',
    'selector regalos',
    'reservas online',
    'lista regalos bebé'
  ],
  authors: [{ name: 'Baby Shower Team', url: 'https://baby-shower-selector.vercel.app' }],
  creator: 'Baby Shower Team',
  publisher: 'Baby Shower Selector',
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
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://baby-shower-selector.vercel.app',
    title: 'Baby Shower Gift Selector - Regalos Únicos con Pañales',
    description: 'Selector inteligente de regalos para baby shower con pañales por etapa. ¡Sin repetidos!',
    siteName: 'Baby Shower Gift Selector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baby Shower Gift Selector - Regalos Únicos',
    description: 'Selector inteligente de regalos para baby shower con pañales por etapa',
    creator: '@babyshower',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ec4899' },
    { media: '(prefers-color-scheme: dark)', color: '#ec4899' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}