'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import PublicationsSection from '../components/PublicationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// Dynamically import components with Three.js to avoid SSR issues
const HeroSection = dynamic(() => import('../components/HeroSection'), { ssr: false });
const CyberCursor = dynamic(() => import('../components/CyberCursor'), { ssr: false });

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isThreeJsReady, setIsThreeJsReady] = useState(false);
    const { scrollYProgress } = useScroll();
    const mainRef = useRef<HTMLDivElement>(null);

    // Parallax effect for background grid
    const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);

    useEffect(() => {
        // Check if WebGL is supported
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (gl && gl instanceof WebGLRenderingContext) {
            setIsThreeJsReady(true);
        }

        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-cyber-black z-50">
                <div className="text-center max-w-md w-full px-6">
                    <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-8 text-gradient">
                        INITIALIZING SYSTEM
                    </h1>
                    <div className="relative w-full h-3 bg-cyber-gray/30 rounded-full overflow-hidden mx-auto border border-cyber-gray/50">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neon-blue via-purple-500 to-neon-pink"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 opacity-50"
                            animate={{
                                boxShadow: ['inset 0 0 5px rgba(0, 240, 255, 0.3)', 'inset 0 0 20px rgba(255, 0, 240, 0.5)', 'inset 0 0 5px rgba(0, 240, 255, 0.3)']
                            }}
                            transition={{ duration: 2, repeat: 1, repeatType: "reverse" }}
                        />
                    </div>
                    <div className="mt-6 font-mono text-sm text-neon-blue flex justify-center items-center">
                        <span className="terminal-text">Loading neural interface</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >...</motion.span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main ref={mainRef} className="relative min-h-screen">
            {/* Only render CyberCursor if not on a touch device */}
            {typeof window !== 'undefined' && !('ontouchstart' in window) && <CyberCursor />}

            {/* Background grid with parallax effect */}
            <motion.div
                className="fixed inset-0 cyber-grid opacity-20 z-0"
                style={{ y: gridY }}
            />

            <Navbar />

            <div className="container mx-auto px-4 relative z-10">
                {/* Conditionally render HeroSection based on WebGL support */}
                {isThreeJsReady ? (
                    <HeroSection />
                ) : (
                    <div className="relative min-h-screen flex items-center justify-center py-20">
                        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-cyber font-bold mb-6">
                                <span className="block">LE VO QUYET THANG</span>
                                <span className="text-gradient">AI ENGINEER</span>
                            </h1>

                            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
                                Highly motivated AI Engineer/Researcher with a strong background in Computer Science.
                            </p>
                        </div>
                    </div>
                )}
                <AboutSection />
                <ProjectsSection />
                <PublicationsSection />
                <ContactSection />
            </div>

            <Footer />
        </main>
    );
} 