'use client';

import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
        }
    };

    return (
        <footer className="py-16 bg-cyber-black relative overflow-hidden">
            {/* Decorative grid */}
            <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>

            {/* Horizontal line with gradient */}
            <div className="relative z-10">
                <div className="container mx-auto px-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 mb-12"></div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            <div className="flex flex-col items-start">
                                <h3 className="text-2xl font-cyber font-bold mb-6 text-neon-blue">
                                    <span className="text-white">&lt;</span>
                                    <span className="text-gradient">DEV</span>
                                    <span className="text-white">/&gt;</span>
                                </h3>

                                <p className="text-gray-400 mb-8 text-lg">
                                    Exploring the frontiers of technology through innovative projects that blend AI, cybersecurity, and futuristic interfaces.
                                </p>

                                <div className="flex space-x-6">
                                    <motion.a
                                        href="https://github.com/vualidon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                    >
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </motion.a>

                                    <motion.a
                                        href="https://www.linkedin.com/in/le-vo-quyet-thang-dev/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                    >
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </motion.a>

                                    <motion.a
                                        href="https://x.com/vualidon1403"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                    >
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </motion.a>

                                    <motion.a
                                        href="https://huggingface.co/thangvip"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                    >
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M9.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                            <path d="M4.5 22h15a2 2 0 0 0 2-2v-8.5h-19V20a2 2 0 0 0 2 2z" />
                                            <path d="M21.5 8V6a2 2 0 0 0-2-2h-15a2 2 0 0 0-2 2v2h19z" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>

                            <div className="flex flex-col items-start md:items-end">
                                <h3 className="text-xl font-cyber font-bold mb-6 text-white">Quick Links</h3>

                                <ul className="space-y-3">
                                    <li>
                                        <button
                                            onClick={(e) => scrollToSection(e, 'home')}
                                            className="text-gray-400 hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer text-left text-lg"
                                        >
                                            Home
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={(e) => scrollToSection(e, 'about')}
                                            className="text-gray-400 hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer text-left text-lg"
                                        >
                                            About
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={(e) => scrollToSection(e, 'projects')}
                                            className="text-gray-400 hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer text-left text-lg"
                                        >
                                            Projects
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={(e) => scrollToSection(e, 'publications')}
                                            className="text-gray-400 hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer text-left text-lg"
                                        >
                                            Publications
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={(e) => scrollToSection(e, 'contact')}
                                            className="text-gray-400 hover:text-neon-blue transition-colors duration-300 bg-transparent border-none cursor-pointer text-left text-lg"
                                        >
                                            Contact
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50 mb-8"></div>

                    <div className="text-center text-gray-500 font-cyber text-sm">
                        <p>© {currentYear} Le Vo Quyet Thang. All rights reserved.</p>
                        <p className="mt-2">
                            <span className="text-neon-blue">{'<'}</span>
                            <span> AI Researcher & Developer </span>
                            <span className="text-neon-pink">{'/>'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 