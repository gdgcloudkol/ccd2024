import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ccd2024.gdgcloudkol.org/'
    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/signup`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/code-of-conduct`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/contests`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/profile`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }, {
            url: `${baseUrl}/schedule`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/speakers`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
    ]
}
