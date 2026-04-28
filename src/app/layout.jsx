import './globals.css'
import Navbar from '../components/Navbar'
import PostHogProvider from '../components/PostHogProvider'


export const metadata = {
  title: 'Cursar.me — Organize sua vida estudantil, social e profissional',
  description: 'A plataforma que une trabalhos com Scrum, portfólio, documentos, rede social e fitness em um único lugar. Crie sua conta grátis.',
  metadataBase: new URL('https://cursar.me'),
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://cursar.me/' },
  openGraph: {
    type: 'website',
    url: 'https://cursar.me/',
    siteName: 'Cursar.me',
    title: 'Cursar.me — Organize sua vida estudantil, social e profissional',
    description: 'A plataforma que une trabalhos com Scrum, portfólio, documentos, rede social e fitness em um único lugar. Crie sua conta grátis.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursar.me — Organize sua vida estudantil, social e profissional',
    description: 'A plataforma que une trabalhos com Scrum, portfólio, documentos, rede social e fitness em um único lugar.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(reg){reg.unregister()})})}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Cursar.me',
              url: 'https://cursar.me',
              description: 'Plataforma que organiza a jornada estudantil, profissional e social em um só lugar.',
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }} suppressHydrationWarning>
        <PostHogProvider>
          <Navbar />
          <main>{children}</main>
        </PostHogProvider>
      </body>
    </html>
  )
}
