'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [activeCategory, setActiveCategory] = useState('Programming');

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

    const experienceData = [
        {
            title: 'Research Student',
            company: 'JAIST',
            location: 'Japan',
            period: 'Oct 2025 - Present',
            description: [
                'Continue my research journey in the field of AI and LLM: enhance LLM reasoning ability and focus on small-scale models'
            ],
            skills: {
                technical: 'Python, LLM, specific reasoning models',
                soft: 'Teamwork, Time Management, Organizing, Research'
            }
        },
        {
            title: 'AI Engineer',
            company: 'Ringkas',
            location: 'Ho Chi Minh City, Vietnam',
            period: 'Jun 2025 - Sep 2025',
            description: [
                'Building Agentic AI for fintech industry: banking, mortgage, etc.',
                'Agentic AI memory management: long-term memory for agents, context window management',
                'Multi-agent system evaluation'
            ],
            skills: {
                technical: 'Python, Agentic AI, Multi-agent system, Evaluation LLM',
                soft: 'Teamwork, Time Management, Organizing'
            }
        },
        {
            title: 'Data Analyst / AI Engineer',
            company: 'FPT Telecom',
            location: 'Ho Chi Minh City, Vietnam',
            period: 'Jun 2023 - Jun 2025',
            description: [
                'Collect, process, and analyze data to derive insights',
                'Build models for image processing (Detection and OCR) in system maintenance',
                'Develop and implement AI solutions for telecom industry challenges (Log processing)',
                'Python developer with databases (MySQL, Mongodb, ElasticSearch) and network automation'
            ],
            skills: {
                technical: 'Python, PyTorch, Git, Pandas, Databases',
                soft: 'Teamwork, Time Management, Organizing'
            }
        },
        {
            title: 'Research Assistant',
            company: 'TDTU NLP&KD LAB',
            location: 'Ho Chi Minh City, Vietnam',
            period: '2022 - Present',
            description: [
                'Collecting and preprocessing data for NLP and LLM applications',
                'Building datasets for pretraining and fine-tuning LLMs',
                'Developing RAG systems and training LLMs for specific domains',
                'Contributing to research papers in the field of NLP (main author of 2 papers about aligned LLM for legal domain)'
            ],
            skills: {
                technical: 'Python, PyTorch, Huggingface, Git, Langchain, Databases, Data Mining, Evaluating model',
                soft: 'Teamwork, Time Management, Organizing'
            }
        }
    ];

    const education = {
        degree: 'B.S. in Computer Science',
        university: 'Ton Duc Thang University',
        location: 'Ho Chi Minh City, Vietnam',
        period: '2020 - 2024',
        gpa: '8.47/10',
        highlights: [
            'TDTU Scholarship recipient',
            'Main subjects: AI, Machine Learning, Data Mining, LLM, Deep Learning',
            'Member of Knowledge Discovery and Natural Language Processing Lab TDTU'
        ]
    };

    const ieltsData = {
        overall: '7.0',
        listening: '8.0',
        reading: '7.5',
        writing: '6.0',
        speaking: '5.5',
        achievementDate: '15/03/2025'
    };

    const skills = {
        'Programming': [
            { name: 'Python', color: 'neon-blue', icon: '🐍' },
            { name: 'SQL', color: 'neon-pink', icon: '📊' },
            { name: 'R', color: 'neon-blue', icon: '📈' },
            { name: 'C', color: 'cyber-gray', icon: '⚙️' },
            { name: 'JavaScript', color: 'cyber-yellow', icon: '🌐' }
        ],
        'Frameworks & Libraries': [
            { name: 'TensorFlow', color: 'cyber-gray', icon: '🧠' },
            { name: 'PyTorch', color: 'neon-pink', icon: '🔥' },
            { name: 'OpenCV', color: 'neon-green', icon: '👁️' },
            { name: 'Scikit-learn', color: 'neon-blue', icon: '🤖' },
            { name: 'HuggingFace', color: 'cyber-yellow', icon: '🤗' },
            { name: 'Langchain', color: 'neon-green', icon: '⛓️' },
            { name: 'Pandas', color: 'neon-purple', icon: '🐼' },
            { name: 'NumPy', color: 'neon-blue', icon: '🔢' },
            { name: 'Flask', color: 'cyber-gray', icon: '🧪' },
            { name: 'Django', color: 'neon-green', icon: '🌐' }
        ],
        'Machine Learning': [
            { name: 'Model Building', color: 'neon-blue', icon: '🏗️' },
            { name: 'Transfer Learning', color: 'neon-green', icon: '🔄' },
            { name: 'Hyperparameter Tuning', color: 'neon-purple', icon: '🎛️' },
            { name: 'Error Analysis', color: 'neon-pink', icon: '🔍' }
        ],
        'Deep Learning': [
            { name: 'LLM Fine-tuning', color: 'neon-blue', icon: '🧠' },
            { name: 'Object Detection', color: 'neon-green', icon: '📦' },
            { name: 'Segmentation', color: 'neon-purple', icon: '✂️' },
            { name: 'OCR', color: 'neon-pink', icon: '📝' }
        ],
        'Data Science': [
            { name: 'Data Preprocessing', color: 'neon-blue', icon: '🧹' },
            { name: 'Data Analysis', color: 'neon-green', icon: '📊' },
            { name: 'Data Visualization', color: 'neon-purple', icon: '📈' },
            { name: 'Data Crawling', color: 'neon-pink', icon: '🕸️' }
        ]
    };

    return (
        <section id="about" className="py-16 md:py-20 relative w-full block">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 w-full">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto w-full"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-cyber font-bold mb-4">
                            <span className="text-gradient">&lt; </span>
                            ABOUT ME
                            <span className="text-gradient"> /&gt;</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-pink mx-auto"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
                        <motion.div variants={itemVariants} className="order-2 md:order-1">
                            <div className="relative mx-auto max-w-xs md:max-w-none">
                                <div className="aspect-square rounded-lg overflow-hidden neon-border">
                                    <img
                                        src="/profile.jpg"
                                        alt="Le Vo Quyet Thang"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-cyber-black p-3 rounded border border-neon-blue/50">
                                    <div className="text-neon-blue font-mono text-xs">
                                        <div>STATUS: ONLINE</div>
                                        <div>LOCATION: VIETNAM</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="order-1 md:order-2">
                            <p className="text-gray-300 mb-6 text-base sm:text-lg">
                                I'm Le Vo Quyet Thang, an AI Engineer and Researcher with expertise in NLP.
                            </p>
                            <p className="text-gray-300 mb-8 text-base sm:text-lg">
                                Highly motivated AI Engineer/Researcher with a strong background in Computer Science. Experienced in developing and implementing machine learning models, data analysis, and natural language processing, with a focus on creating AI-driven solutions for real-world problems.
                            </p>
                        </motion.div>
                    </div>

                    {/* Experience Section */}
                    <motion.div variants={itemVariants} className="mb-16 w-full">
                        <h3 className="text-2xl font-cyber mb-8 text-center">
                            <span className="text-gradient">EXPERIENCE</span>
                        </h3>

                        <div className="space-y-8 w-full">
                            {experienceData.map((experience, index) => (
                                <div
                                    key={index}
                                    className="bg-cyber-black/50 backdrop-blur-sm border border-neon-pink/30 rounded-lg p-6 relative overflow-hidden w-full"
                                >
                                    {/* Timeline connector */}
                                    {index < experienceData.length - 1 && (
                                        <div className="absolute left-8 top-full w-px h-8 bg-gradient-to-b from-neon-pink to-transparent z-10"></div>
                                    )}

                                    {/* Decorative elements */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink/0 via-neon-pink/50 to-neon-pink/0"></div>
                                    <div className="absolute -top-3 -right-3 w-24 h-24 opacity-10">
                                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="40" stroke="var(--neon-pink)" strokeWidth="0.5" strokeDasharray="5 5" />
                                            <circle cx="50" cy="50" r="30" stroke="var(--neon-pink)" strokeWidth="0.5" />
                                            <circle cx="50" cy="50" r="20" stroke="var(--neon-pink)" strokeWidth="0.5" strokeDasharray="2 2" />
                                            <circle cx="50" cy="50" r="2" fill="var(--neon-pink)" />
                                        </svg>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6 w-full">
                                        <div className="w-full md:w-1/3">
                                            <div className="text-neon-pink font-cyber text-lg mb-1">{experience.title}</div>
                                            <div className="text-white font-bold mb-2">{experience.company}</div>
                                            <div className="text-gray-400 text-sm mb-1">{experience.location}</div>
                                            <div className="text-gray-400 text-sm mb-3">{experience.period}</div>

                                            <div className="space-y-2 mb-4">
                                                <div className="text-xs text-gray-500 uppercase">Tech Stack</div>
                                                <div className="text-gray-300 text-sm">{experience.skills.technical}</div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-xs text-gray-500 uppercase">Soft Skills</div>
                                                <div className="text-gray-300 text-sm">{experience.skills.soft}</div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-2/3 md:border-l md:border-neon-pink/30 md:pl-6 mt-4 md:mt-0">
                                            <div className="text-white font-cyber mb-3">RESPONSIBILITIES</div>
                                            <ul className="space-y-3">
                                                {experience.description.map((item, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="text-neon-blue mr-2">▹</span>
                                                        <span className="text-gray-300 text-sm">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div variants={itemVariants} className="mb-8 w-full">
                        <h3 className="text-2xl font-cyber mb-8 text-center">
                            <span className="text-gradient">EDUCATION</span>
                        </h3>

                        <div className="bg-cyber-black/50 backdrop-blur-sm border border-neon-blue/30 rounded-lg p-6 relative overflow-hidden w-full">
                            {/* Decorative circuit lines */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 50h20M30 50v-30M30 50v30M70 50h20M70 50v-30M70 50v30M30 20h40M30 80h40"
                                        stroke="var(--neon-blue)" strokeWidth="0.5" />
                                    <circle cx="30" cy="50" r="2" fill="var(--neon-blue)" />
                                    <circle cx="70" cy="50" r="2" fill="var(--neon-blue)" />
                                    <circle cx="30" cy="20" r="2" fill="var(--neon-blue)" />
                                    <circle cx="70" cy="20" r="2" fill="var(--neon-blue)" />
                                    <circle cx="30" cy="80" r="2" fill="var(--neon-blue)" />
                                    <circle cx="70" cy="80" r="2" fill="var(--neon-blue)" />
                                </svg>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 w-full">
                                <div className="w-full md:w-1/3">
                                    <div className="text-neon-blue font-cyber text-lg mb-1">{education.degree}</div>
                                    <div className="text-white font-bold mb-2">{education.university}</div>
                                    <div className="text-gray-400 text-sm mb-1">{education.location}</div>
                                    <div className="text-gray-400 text-sm mb-3">{education.period}</div>
                                    <div className="inline-block bg-neon-blue/20 px-3 py-1 rounded text-neon-blue text-sm font-mono">
                                        GPA: {education.gpa}
                                    </div>
                                </div>

                                <div className="w-full md:w-2/3 md:border-l md:border-neon-blue/30 md:pl-6 mt-4 md:mt-0">
                                    <div className="text-white font-cyber mb-3">HIGHLIGHTS</div>
                                    <ul className="space-y-2">
                                        {education.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-neon-pink mr-2">▹</span>
                                                <span className="text-gray-300 text-sm">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* IELTS Score Section */}
                    <motion.div variants={itemVariants} className="mb-16 w-full">
                        <div className="bg-cyber-black/50 backdrop-blur-sm border border-neon-pink/30 rounded-lg p-6 relative overflow-hidden w-full">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink/0 via-neon-pink/50 to-neon-pink/0"></div>
                            <div className="absolute -top-3 -right-3 w-24 h-24 opacity-10">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="40" stroke="var(--neon-pink)" strokeWidth="0.5" strokeDasharray="5 5" />
                                    <circle cx="50" cy="50" r="30" stroke="var(--neon-pink)" strokeWidth="0.5" />
                                    <circle cx="50" cy="50" r="20" stroke="var(--neon-pink)" strokeWidth="0.5" strokeDasharray="2 2" />
                                    <circle cx="50" cy="50" r="2" fill="var(--neon-pink)" />
                                </svg>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 w-full">
                                <div className="w-full md:w-1/3">
                                    <div className="text-neon-pink font-cyber text-lg mb-1">IELTS Certification</div>
                                    <div className="text-gray-400 text-sm mb-3">Achieved on {ieltsData.achievementDate}</div>
                                    <div className="inline-block bg-neon-pink/20 px-3 py-1 rounded text-neon-pink text-sm font-mono mb-2">
                                        Overall: {ieltsData.overall}
                                    </div>
                                </div>

                                <div className="w-full md:w-2/3 md:border-l md:border-neon-pink/30 md:pl-6 mt-4 md:mt-0">
                                    <div className="text-white font-cyber mb-3">SCORE BREAKDOWN</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col space-y-2">
                                            <div className="text-xs text-gray-400 uppercase">Listening</div>
                                            <div className="inline-block bg-cyber-gray/30 px-3 py-2 rounded text-neon-blue text-sm font-mono">
                                                {ieltsData.listening}
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <div className="text-xs text-gray-400 uppercase">Reading</div>
                                            <div className="inline-block bg-cyber-gray/30 px-3 py-2 rounded text-neon-blue text-sm font-mono">
                                                {ieltsData.reading}
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <div className="text-xs text-gray-400 uppercase">Writing</div>
                                            <div className="inline-block bg-cyber-gray/30 px-3 py-2 rounded text-neon-pink text-sm font-mono">
                                                {ieltsData.writing}
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <div className="text-xs text-gray-400 uppercase">Speaking</div>
                                            <div className="inline-block bg-cyber-gray/30 px-3 py-2 rounded text-neon-pink text-sm font-mono">
                                                {ieltsData.speaking}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div variants={itemVariants} className="mb-8 w-full">
                        <h3 className="text-2xl font-cyber mb-8 text-center">
                            <span className="text-gradient">TECHNICAL SKILLS</span>
                        </h3>

                        {/* Skill Categories Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {Object.keys(skills).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-md font-cyber text-sm transition-colors duration-300 ${activeCategory === category
                                        ? 'bg-neon-blue text-black'
                                        : 'bg-cyber-gray/30 text-gray-300 hover:bg-cyber-gray/50'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {skills[activeCategory as keyof typeof skills].map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-4 rounded-lg border border-${skill.color}/30 hover:border-${skill.color} bg-cyber-black/50 transition-colors duration-300 text-center`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ y: -5, boxShadow: `0 5px 15px rgba(0, 0, 0, 0.3), 0 0 5px var(--${skill.color})` }}
                                >
                                    <div className={`text-2xl mb-2 text-${skill.color}`}>{skill.icon}</div>
                                    <div className="font-cyber text-sm">{skill.name}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection; 