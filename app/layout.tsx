import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Le Vo Quyet Thang | AI Engineer & Researcher',
    description: 'Personal portfolio of Le Vo Quyet Thang, an AI Engineer and Researcher specializing in machine learning, computer vision, and data analysis',
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'apple-touch-icon', url: '/favicon.ico' },
        { rel: 'shortcut icon', url: '/favicon.ico' }
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className="bg-cyber-black text-white font-mono">
                <div className="noise-overlay"></div>
                {children}
            </body>
        </html>
    );
} 