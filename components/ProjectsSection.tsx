'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectsSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

    // Project data
    const projects = [
        {
            name: 'DailyDigestAI',
            description: 'LLM powered reading paper app for efficient research paper analysis. Features include paper chat functionality through LLM integration and automated generation of beautiful notes for Obsidian app.',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firecrawl', 'Firebase', 'Gemini'],
            organization: 'Personal Project',
            date: 'Feb 2025',
            link: 'https://dailydigestai.netlify.app/',
            color: 'neon-blue',
            icon: '📚'
        },
        {
            name: 'Vietnamese Legal LLM',
            description: 'Building a Vietnamese legal large language model with enhanced reading comprehension. Continued-pretrain small LLMs (Sailor-1.8B, Qwen2-1.5B) on Vietnamese legal synthetic dataset.',
            technologies: ['Huggingface', 'LoRA', 'DPO', 'Unsloth', 'Git'],
            organization: 'TDTU NLP&KD LAB',
            date: 'Jan 2024 - Aug 2024',
            color: 'neon-pink',
            icon: '⚖️'
        },
        {
            name: 'University Chatbot',
            description: 'Developed a University Chatbot using Retrieval-augmented Generation (RAG) with advanced techniques like Query Expansion, Intent Classification, Hybrid Search, and Re-ranking.',
            technologies: ['Python', 'Elasticsearch', 'OpenAI API', 'SentenceTransformers', 'LlamaIndex', 'RAG'],
            organization: 'TDTU NLP-KD Lab',
            date: 'Feb 2024 - May 2024',
            color: 'neon-purple',
            icon: '🤖'
        },
        {
            name: 'Vietnamese ChatBot with C-RRR Framework',
            description: 'Built a new framework for Vietnamese legal chatbot using T5 model finetuning, RLHF, and RLAIF for enhanced rewriting accuracy.',
            technologies: ['Huggingface', 'RLHF', 'PPO', 'Gemini API', 'CSE'],
            organization: 'TDTU NLP&KD LAB',
            date: 'Jan 2024 - Aug 2024',
            color: 'neon-green',
            icon: '💬'
        },
        {
            name: 'Vietnamese LLM Dataset Building',
            description: 'Created Vietnamese Pretraining LLM Dataset using translation, web data preprocessing, and unsupervised clustering techniques.',
            technologies: ['Python', 'OpenAI API', 'FAISS', 'UMAP', 'Gemini Pro'],
            organization: 'TDTU NLP-KD Lab',
            date: 'Feb 2024 - May 2024',
            color: 'cyber-yellow',
            icon: '📊'
        },
        {
            name: 'ML System for Maintenance',
            description: 'Developed ML system for in-system maintenance including computer vision models for object detection, segmentation, and OCR at FPT TELECOM.',
            technologies: ['YOLO', 'PaddleOCR', 'Flask', 'Docker', 'MongoDB', 'ElasticSearch'],
            organization: 'FPT TELECOM',
            date: 'Jun 2023 - Present',
            color: 'neon-blue',
            icon: '🔍'
        }
    ];

    // Generate a circuit pattern for project cards
    const generateCircuitPattern = (color: string) => (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50h20M30 50v-30M30 50v30M70 50h20M70 50v-30M70 50v30M30 20h40M30 80h40"
                stroke={`var(--${color})`} strokeWidth="0.5" fill="none" />
            <circle cx="30" cy="50" r="2" fill={`var(--${color})`} />
            <circle cx="70" cy="50" r="2" fill={`var(--${color})`} />
            <circle cx="30" cy="20" r="2" fill={`var(--${color})`} />
            <circle cx="70" cy="20" r="2" fill={`var(--${color})`} />
            <circle cx="30" cy="80" r="2" fill={`var(--${color})`} />
            <circle cx="70" cy="80" r="2" fill={`var(--${color})`} />
            <circle cx="50" cy="50" r="3" fill={`var(--${color})`} />
        </svg>
    );

    return (
        <section id="projects" className="py-16 md:py-20 relative">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-30 blur-sm"></div>

            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-cyber font-bold mb-4">
                            <span className="text-gradient">&lt; </span>
                            PROJECTS
                            <span className="text-gradient"> /&gt;</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-pink mx-auto"></div>
                        <p className="text-gray-300 mt-6 max-w-2xl mx-auto px-2 text-base sm:text-lg">
                            A showcase of my AI and machine learning projects, demonstrating expertise in natural language processing, computer vision, and data science.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div
                                    className={`h-full bg-cyber-black/50 backdrop-blur-sm border border-${project.color}/30 hover:border-${project.color} rounded-lg overflow-hidden transition-all duration-300 relative`}
                                >
                                    {/* Decorative circuit pattern */}
                                    {generateCircuitPattern(project.color)}

                                    {/* Top gradient line */}
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${project.color}/0 via-${project.color}/50 to-${project.color}/0`}></div>

                                    {/* Content */}
                                    <div className="p-6 relative z-10 h-full flex flex-col">
                                        {/* Project icon and name */}
                                        <div className="flex items-center mb-4">
                                            <div className={`text-${project.color} text-2xl mr-3`}>{project.icon}</div>
                                            <h3 className={`text-xl font-cyber font-bold text-${project.color}`}>
                                                {project.name}
                                            </h3>
                                        </div>

                                        {/* Organization and date */}
                                        <div className="flex justify-between mb-4 text-sm">
                                            <span className="text-gray-400">{project.organization}</span>
                                            <span className="text-gray-400">{project.date}</span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="mt-auto">
                                            <div className="text-xs text-gray-500 uppercase mb-2">Technologies</div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className={`text-xs px-2 py-1 rounded-md bg-${project.color}/10 text-${project.color} border border-${project.color}/30`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Link if available */}
                                        {project.link && (
                                            <div className="mt-4 text-right">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center text-${project.color} hover:text-white transition-colors duration-300 text-sm`}
                                                >
                                                    <span>View Project</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover effect */}
                                    <div
                                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-transparent to-${project.color}/10`}
                                    ></div>

                                    {/* Glitch effect on hover */}
                                    {hoveredProject === index && (
                                        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none mix-blend-overlay">
                                            <div className="absolute inset-0 glitch-effect" style={{
                                                backgroundImage: `linear-gradient(90deg, transparent 0%, var(--${project.color}) 2%, transparent 3%)`,
                                                backgroundSize: '200% 100%',
                                                animation: 'glitch-anim 2s infinite linear alternate-reverse'
                                            }}></div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection; 