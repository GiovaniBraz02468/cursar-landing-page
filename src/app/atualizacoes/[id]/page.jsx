import { notFound } from 'next/navigation'
import UpdateDetailContent from '../../../components/UpdateDetailContent'
import { UPDATES } from '../../../data/updatesData'

export function generateStaticParams() {
  return UPDATES.map((update) => ({ id: update.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const update = UPDATES.find((u) => u.id === id)
  if (!update) return {}
  return {
    title: `${update.title} — Cursar.me`,
    description: update.summary,
    openGraph: {
      title: update.title,
      description: update.summary,
      url: `https://cursar.me/atualizacoes/${update.id}`,
      siteName: 'Cursar.me',
      type: 'article',
    },
  }
}

export default async function UpdateDetailPage({ params }) {
  const { id } = await params
  const update = UPDATES.find((u) => u.id === id)
  if (!update) notFound()
  return <UpdateDetailContent update={update} />
}
