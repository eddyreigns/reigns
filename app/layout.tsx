import './globals.css'

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
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
