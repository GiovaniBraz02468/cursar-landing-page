import UpdatesContent from '../../components/UpdatesContent'

export const metadata = {
  title: 'Atualizações — Cursar.me',
  description: 'Acompanhe todas as novidades, melhorias e correções do Cursar.me. Cada versão, cada evolução da plataforma.',
  alternates: { canonical: 'https://cursar.me/atualizacoes' },
  openGraph: {
    type: 'website',
    url: 'https://cursar.me/atualizacoes',
    siteName: 'Cursar.me',
    title: 'Atualizações — Cursar.me',
    description: 'Acompanhe todas as novidades, melhorias e correções do Cursar.me.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atualizações — Cursar.me',
    description: 'Acompanhe todas as novidades do Cursar.me.',
    images: ['/og-image.png'],
  },
}

export default function UpdatesPage() {
  return <UpdatesContent />
}
