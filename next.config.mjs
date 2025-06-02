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
    experimental: {
        optimizePackageImports: ['@/components', '@/lib', '@/hooks']
    },
    webpack: (config, { dev, isServer }) => {
        // Memory optimization for development
        if (dev && !isServer) {
            config.cache = false
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            }
        }

        // Optimize bundle size
        config.resolve.alias = {
            ...config.resolve.alias,
        }

        return config
    },
    // Reduce memory usage during development
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: ['images.unsplash.com'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
        // Reduce memory usage in development
        forceSwcTransforms: true,
    },
    // Optimize for development performance
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            // Reduce memory usage in development
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
                ignored: /node_modules/,
            };

            // Limit memory usage for dev builds
            config.optimization = {
                ...config.optimization,
                removeAvailableModules: false,
                removeEmptyChunks: false,
                splitChunks: {
                    ...config.optimization.splitChunks,
                    cacheGroups: {
                        default: false,
                        vendors: false,
                    },
                },
            };
        }
        return config;
    },
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

export default withPWA(nextConfig);
