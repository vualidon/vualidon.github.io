'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const socialLinks = [
        { name: 'GitHub', icon: 'github', url: 'https://github.com/vualidon' },
        { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/le-vo-quyet-thang-dev/' },
        { name: 'Twitter', icon: 'twitter', url: 'https://x.com/vualidon1403' },
        { name: 'HuggingFace', icon: 'huggingface', url: 'https://huggingface.co/thangvip' },
    ];

    return (
        <section id="contact" className="py-16 md:py-20 relative">
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-neon-blue/5 to-transparent -z-10"></div>

            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-cyber font-bold mb-4">
                            <span className="text-gradient">&lt; </span>
                            CONNECT
                            <span className="text-gradient"> /&gt;</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-pink mx-auto"></div>
                        <p className="text-gray-300 mt-6 max-w-2xl mx-auto px-2 text-base sm:text-lg">
                            Ready to collaborate on innovative AI projects or discuss research opportunities? Let's connect and create intelligent solutions together.
                        </p>
                    </motion.div>

                    <div className="flex justify-center">
                        <motion.div variants={itemVariants} className="max-w-xl w-full">
                            <div className="bg-cyber-black/50 backdrop-blur-sm p-6 rounded-lg border border-neon-pink/30 h-full flex flex-col">
                                <h3 className="text-xl font-cyber font-bold mb-6 text-neon-pink">CONNECT DIRECTLY</h3>

                                <div className="space-y-6 mb-8 flex-grow">
                                    <div>
                                        <h4 className="text-sm font-cyber mb-2 text-gray-400">LOCATION</h4>
                                        <p className="text-white flex items-center">
                                            <span className="text-neon-pink mr-2">📍</span> Japan
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-cyber mb-2 text-gray-400">EMAIL</h4>
                                        <p className="text-white flex items-center">
                                            <span className="text-neon-pink mr-2">📧</span> quyetthanglevo@gmail.com
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-cyber mb-2 text-gray-400">AVAILABILITY</h4>
                                        <p className="text-white flex items-center">
                                            <span className="text-neon-pink mr-2">⏰</span> Always online, 24/7
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-cyber mb-4 text-gray-400">SOCIAL NETWORKS</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {socialLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-cyber-gray/50 flex items-center justify-center text-neon-pink hover:bg-neon-pink hover:text-black transition-colors duration-300"
                                                aria-label={link.name}
                                            >
                                                {link.name === 'GitHub' && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {link.name === 'LinkedIn' && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                )}
                                                {link.name === 'Twitter' && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                    </svg>
                                                )}
                                                {link.name === 'HuggingFace' && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path d="M9.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                        <path d="M4.5 22h15a2 2 0 0 0 2-2v-8.5h-19V20a2 2 0 0 0 2 2z" />
                                                        <path d="M21.5 8V6a2 2 0 0 0-2-2h-15a2 2 0 0 0-2 2v2h19z" />
                                                    </svg>
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection; 