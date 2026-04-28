import SuporteContent from '../../components/SuporteContent'

export const metadata = {
  title: 'Suporte — Cursar.me',
  description: 'Precisa de ajuda? Fale com a equipe do Cursar.me. Estamos aqui para resolver suas dúvidas e problemas.',
  alternates: { canonical: 'https://cursar.me/suporte' },
  openGraph: {
    type: 'website',
    url: 'https://cursar.me/suporte',
    siteName: 'Cursar.me',
    title: 'Suporte — Cursar.me',
    description: 'Precisa de ajuda? Fale com a equipe do Cursar.me.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suporte — Cursar.me',
    description: 'Precisa de ajuda? Fale com a equipe do Cursar.me.',
    images: ['/og-image.png'],
  },
}

export default function SuportePage() {
  return <SuporteContent />
}
