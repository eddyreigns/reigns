import './globals.css'
import Header from '../components/Header'

export const metadata = {
  title: 'Reigns - My Beautiful Market',
  description: 'My beautiful market',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16 md:pt-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
