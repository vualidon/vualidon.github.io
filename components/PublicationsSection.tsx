'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const PublicationsSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [expandedPaper, setExpandedPaper] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const publications = [
        {
            title: 'Enhancing Reading Comprehension of Vietnamese LLMs with Synthetic data',
            authors: 'Thang V.Q. Le, Nguyen P. Nguyen, Trong-Chi Duong, Anh-Cuong Le, Viet-Cuong Nguyen, Viet-Ha Nguyen',
            conference: 'The 16th IEEE International Conference on Knowledge and Systems Engineering (KSE 2024)',
            award: 'Best Paper Award',
            year: '2024',
            publisher: 'IEEE'
        },
        {
            title: 'A Framework for Vietnamese Question-Answering in Law Domain',
            authors: 'Thang V. Q. Le, Dinh-Hong Vu, Nguyen P. Nguyen, Anh-Cuong Le',
            conference: 'The 9th IEEE International Conference on Data Science in Cyberspace (IEEE DSC 2024)',
            year: '2024',
            publisher: 'IEEE',
            link: 'https://ieeexplore.ieee.org/abstract/document/10859086'
        },
        {
            title: 'Adapting Large Language Models to Vietnamese Law: Pretrained LLM Refinement vs Retrieval Augmented Generation',
            authors: 'Nguyen P. Nguyen, Thang V.Q. Le, Anh-Cuong Le, Viet-Ha Nguyen, Viet-Cuong Nguyen',
            conference: 'The 16th IEEE International Conference on Knowledge and Systems Engineering (KSE 2024)',
            year: '2024',
            publisher: 'IEEE'
        }
    ];

    // Highlight the author name in the authors list
    const highlightAuthor = (authors: string) => {
        return authors.replace(/Thang V\.Q\. Le|Thang V\. Q\. Le/g, '<span class="text-neon-blue font-bold">Thang V.Q. Le</span>');
    };

    return (
        <section id="publications" className="py-16 md:py-20 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -z-10"></div>

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
                            PUBLICATIONS
                            <span className="text-gradient"> /&gt;</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto"></div>
                        <p className="text-gray-300 mt-6 max-w-2xl mx-auto px-2 text-base sm:text-lg">
                            Academic research papers published in international conferences and journals.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {publications.map((publication, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`bg-cyber-black/50 backdrop-blur-sm border border-neon-purple/30 rounded-lg overflow-hidden transition-all duration-300 ${expandedPaper === index ? 'border-neon-purple' : 'hover:border-neon-purple/70'}`}
                            >
                                {/* Paper header with year badge */}
                                <div className="p-5 relative">
                                    {/* Year badge */}
                                    <div className="absolute top-5 right-5 bg-neon-purple/20 text-neon-purple text-xs font-mono px-2 py-1 rounded">
                                        {publication.year}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-cyber font-bold mb-3 pr-16 text-white">
                                        {publication.title}
                                    </h3>

                                    {/* Authors with highlighted name */}
                                    <p
                                        className="text-gray-300 text-sm mb-4"
                                        dangerouslySetInnerHTML={{ __html: highlightAuthor(publication.authors) }}
                                    ></p>

                                    {/* Conference/Journal */}
                                    <div className="flex items-start mb-3">
                                        <span className="text-neon-purple mr-2">📝</span>
                                        <p className="text-gray-400 text-sm">{publication.conference}</p>
                                    </div>

                                    {/* Publisher */}
                                    <div className="flex items-start mb-3">
                                        <span className="text-neon-purple mr-2">🏛️</span>
                                        <p className="text-gray-400 text-sm">{publication.publisher}</p>
                                    </div>

                                    {/* Award if any */}
                                    {publication.award && (
                                        <div className="flex items-center mt-4">
                                            <span className="text-cyber-yellow mr-2">🏆</span>
                                            <span className="text-cyber-yellow font-cyber text-sm">{publication.award}</span>
                                        </div>
                                    )}

                                    {/* Link if available */}
                                    {publication.link && (
                                        <div className="mt-4 text-right">
                                            <a
                                                href={publication.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-neon-blue hover:text-white transition-colors duration-300 text-sm"
                                            >
                                                <span>View Publication</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Decorative circuit lines */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple/0 via-neon-purple/50 to-neon-purple/0"></div>
                                <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-neon-purple/0 via-neon-purple/30 to-neon-purple/0"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PublicationsSection; 