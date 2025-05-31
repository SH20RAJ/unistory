import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    workboxOptions: {
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/api\.dicebear\.com/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'avatar-cache',
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    }
                },
            },
            {
                urlPattern: /\.(jpe?g|png|svg|gif|webp|mp3|mp4)$/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'media-cache',
                    expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                    }
                },
            }
        ],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: ['images.unsplash.com'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

export default withPWA(nextConfig);
