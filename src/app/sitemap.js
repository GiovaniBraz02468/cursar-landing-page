import { UPDATES } from '../data/updatesData'

export default function sitemap() {
  const base = 'https://cursar.me'

  const staticRoutes = [
    { url: base,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/modulos`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/atualizacoes`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/suporte`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const updateRoutes = UPDATES.map((update) => ({
    url: `${base}/atualizacoes/${update.id}`,
    lastModified: new Date(update.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...updateRoutes]
}
