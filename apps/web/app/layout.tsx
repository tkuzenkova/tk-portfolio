import { Syne, Geist, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const geist = Geist({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-geist',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '600', '700', '800', '900'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-mono',
  weight: ['400', '500'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={`${syne.variable} ${geist.variable} ${poppins.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
