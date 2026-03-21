import type { Metadata } from 'next'
import { Syne, Geist, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '600', '700', '800', '900'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Tetiana Kuzenkova — Front-End Engineer',
  description:
    'Senior Front-End Engineer specializing in React, Next.js, TypeScript, and scalable UI systems.',
  keywords: ['Front-End Engineer', 'React', 'Next.js', 'TypeScript', 'UI Architecture'],
  authors: [{ name: 'Tetiana Kuzenkova' }],
  openGraph: {
    title: 'Tetiana Kuzenkova — Front-End Engineer',
    description:
      'Senior Front-End Engineer specializing in React, Next.js, TypeScript, and scalable UI systems.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${geist.variable} ${poppins.variable} ${robotoMono.variable}`}>{children}</body>
    </html>
  )
}
