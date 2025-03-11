/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
    },
    // For GitHub Pages deployment
    // For user/organization site (username.github.io), basePath should be empty
    basePath: '',
    assetPrefix: '',
    trailingSlash: true,
    // Transpile Three.js modules
    transpilePackages: ['three'],
    // Disable source maps in production
    productionBrowserSourceMaps: false,
};

export default nextConfig; 