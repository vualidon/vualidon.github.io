'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll function that doesn't add hash to URL
    const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Get the target position, accounting for navbar height
            const navbarHeight = 80; // Adjust this value based on your navbar height
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            // Smooth scroll to the target position without changing URL
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        }
    };

    const navLinks = [
        { name: 'HOME', id: 'home' },
        { name: 'ABOUT', id: 'about' },
        { name: 'PROJECTS', id: 'projects' },
        { name: 'PUBLICATIONS', id: 'publications' },
        { name: 'CONTACT', id: 'contact' },
    ];

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cyber-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
                }`}
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <motion.div
                    className="text-xl sm:text-2xl font-cyber font-bold text-neon-blue"
                    variants={linkVariants}
                >
                    <span className="text-white">&lt;</span>
                    <span className="text-gradient">DEV</span>
                    <span className="text-white">/&gt;</span>
                </motion.div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none p-2"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop menu */}
                <motion.ul className="hidden md:flex space-x-8">
                    {navLinks.map((link, index) => (
                        <motion.li key={index} variants={linkVariants}>
                            <button
                                onClick={(e) => scrollToSection(e as any, link.id)}
                                className="font-cyber text-sm tracking-wider hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer"
                            >
                                {link.name}
                            </button>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <motion.div
                    className="md:hidden bg-cyber-black/95 backdrop-blur-md fixed inset-x-0 top-[60px] z-50 border-t border-neon-blue/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <ul className="py-4 px-6 space-y-6">
                        {navLinks.map((link, index) => (
                            <li key={index} className="border-b border-neon-blue/10 pb-3">
                                <button
                                    onClick={(e) => scrollToSection(e as any, link.id)}
                                    className="block w-full text-left font-cyber text-base tracking-wider hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer py-2"
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar; 