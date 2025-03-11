/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
    },
    // For GitHub Pages deployment
    basePath: process.env.NODE_ENV === 'production' ? '/vualidon.github.io' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/vualidon.github.io/' : '',
    trailingSlash: true,
    // Transpile Three.js modules
    transpilePackages: ['three'],
    // Disable source maps in production
    productionBrowserSourceMaps: false,
};

export default nextConfig; 