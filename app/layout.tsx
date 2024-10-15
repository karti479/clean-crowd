// /app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import SessionWrapper from './components/sessionwrapper'; // Import the new SessionWrapper

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CleanStreets India',
  description: 'Community-driven initiative for cleaner streets in India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionWrapper> {/* Use the SessionWrapper here */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  )
}
