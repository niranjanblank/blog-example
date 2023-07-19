import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Example App',
  description: 'Simple blog app for learning NextJS 13 Features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <nav className="px-10 pt-5">
          <Link href="/" className="text-2xl font-semibold">
            blog<span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text font-bold">IT</span>
          </Link>
        </nav>
        {children}
        </body>
    </html>
  )
}
