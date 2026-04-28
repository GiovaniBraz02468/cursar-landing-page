import ModulosContent from '../../components/ModulosContent'

export const metadata = {
  title: 'Módulos — Cursar.me',
  description: 'Conheça todos os módulos do Cursar.me: trabalhos com Scrum, portfólio, documentos, rede social, fitness e muito mais. Tudo em um só lugar.',
  alternates: { canonical: 'https://cursar.me/modulos' },
  openGraph: {
    type: 'website',
    url: 'https://cursar.me/modulos',
    siteName: 'Cursar.me',
    title: 'Módulos — Cursar.me',
    description: 'Conheça todos os módulos do Cursar.me: trabalhos com Scrum, portfólio, documentos, rede social, fitness e muito mais.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Módulos — Cursar.me',
    description: 'Conheça todos os módulos do Cursar.me.',
    images: ['/og-image.png'],
  },
}

export default function ModulosPage() {
  return <ModulosContent />
}
