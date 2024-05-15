import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/profile',
        },
        sitemap: ['https://ccd2024.gdgcloudkol.org/sitemap.xml'],
    }
}
