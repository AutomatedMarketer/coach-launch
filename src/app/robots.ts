import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coachlaunch.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/questionnaire/', '/generate/', '/results/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
