document.addEventListener('DOMContentLoaded', () => {
    // Update About Section
    const aboutDescription = document.getElementById('about-description');
    aboutDescription.textContent = 'Highly motivated AI/ML Engineer/Researcher and Data Analyst with a strong background in Computer Science. Experienced in developing and implementing machine learning models, data analysis, and natural language processing. Skilled in various programming languages and frameworks, with a focus on creating AI-driven solutions for real-world problems.';

    // Skills Section
    const skillsList = document.getElementById('skills-list');
    const skills = {
        'Programming': [
            { name: 'Python', color: 'blue' },
            { name: 'SQL', color: 'red' },
            { name: 'R', color: 'blue' },
            { name: 'C', color: 'gray' },
            { name: 'JavaScript', color: 'yellow' }
        ],
        'Frameworks & Libraries': [
            { name: 'TensorFlow', color: 'gray' },
            { name: 'PyTorch', color: 'red' },
            { name: 'OpenCV', color: 'green' },
            { name: 'Scikit-learn', color: 'blue' },
            { name: 'HuggingFace', color: 'yellow' },
            { name: 'Langchain', color: 'green' },
            { name: 'Pandas', color: 'purple' },
            { name: 'NumPy', color: 'blue' },
            { name: 'Flask', color: 'gray' },
            { name: 'Django', color: 'green' }
        ],
        'Machine Learning': [
            { name: 'Model Building', color: 'blue' },
            { name: 'Transfer Learning', color: 'green' },
            { name: 'Hyperparameter Tuning', color: 'purple' },
            { name: 'Error Analysis', color: 'red' }
        ],
        'Deep Learning': [
            { name: 'LLM Fine-tuning', color: 'blue' },
            { name: 'Object Detection', color: 'green' },
            { name: 'Segmentation', color: 'purple' },
            { name: 'OCR', color: 'red' }
        ],
        'Data Science': [
            { name: 'Data Preprocessing', color: 'blue' },
            { name: 'Data Analysis', color: 'green' },
            { name: 'Data Visualization', color: 'purple' },
            { name: 'Data Crawling', color: 'red' }
        ]
    };

    // Clear existing skills
    skillsList.innerHTML = '';

    // Add skills by category
    Object.entries(skills).forEach(([category, categorySkills]) => {
        // Add category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'w-full mb-2 mt-4 text-lg font-semibold text-gray-700';
        categoryHeader.textContent = category;
        skillsList.appendChild(categoryHeader);

        // Add skills for this category
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'flex flex-wrap gap-2 mb-4';
        
        categorySkills.forEach(skill => {
            const skillSpan = document.createElement('span');
            skillSpan.className = `bg-${skill.color}-100 text-${skill.color}-800 px-3 py-1 rounded-full text-sm`;
            skillSpan.textContent = skill.name;
            skillsContainer.appendChild(skillSpan);
        });

        skillsList.appendChild(skillsContainer);
    });

    // Education Section
    const educationSection = document.getElementById('education');
    if (educationSection) {
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

        educationSection.innerHTML = `
            <div class="bg-white shadow-md rounded-lg p-8">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800">${education.degree}</h3>
                        <p class="text-xl text-gray-600">${education.university}</p>
                        <p class="text-gray-500">${education.location}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-gray-600">${education.period}</p>
                        <p class="text-gray-700 font-semibold">GPA: ${education.gpa}</p>
                    </div>
                </div>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                    ${education.highlights.map(highlight => `
                        <li>${highlight}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    // Experience Section
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
        const experienceData = [
            {
                title: 'Data Analyst / AI Engineer',
                company: 'FPT Telecom',
                location: 'Ho Chi Minh City, Vietnam',
                period: 'Jun 2023 - Present',
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

        // Function to render experience cards
        function renderExperience() {
            const experienceList = document.getElementById('experience-list');
            if (!experienceList) return;

            experienceData.forEach(exp => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 rounded-lg p-6 shadow-sm';

                const header = document.createElement('div');
                header.className = 'mb-4';
                
                const title = document.createElement('h3');
                title.className = 'text-xl font-semibold text-gray-900';
                title.textContent = exp.title;
                
                const company = document.createElement('div');
                company.className = 'text-lg text-gray-700';
                company.textContent = exp.company;
                
                const locationPeriod = document.createElement('div');
                locationPeriod.className = 'text-sm text-gray-600';
                locationPeriod.textContent = `${exp.location} | ${exp.period}`;
                
                header.appendChild(title);
                header.appendChild(company);
                header.appendChild(locationPeriod);
                
                const description = document.createElement('ul');
                description.className = 'list-disc list-inside space-y-2 mb-4 text-gray-700';
                exp.description.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    description.appendChild(li);
                });
                
                const skills = document.createElement('div');
                skills.className = 'text-sm text-gray-600';
                skills.innerHTML = `
                    <div><strong>Technical Skills:</strong> ${exp.skills.technical}</div>
                    <div><strong>Soft Skills:</strong> ${exp.skills.soft}</div>
                `;
                
                card.appendChild(header);
                card.appendChild(description);
                card.appendChild(skills);
                
                experienceList.appendChild(card);
            });
        }

        renderExperience();
    }

    // Dynamic Projects Section
    const projectsList = document.getElementById('projects-list');
    const projects = [
        {
            name: 'Vietnamese Legal LLM',
            description: 'Building a Vietnamese legal large language model with enhanced reading comprehension. Continued-pretrain small LLMs (Sailor-1.8B, Qwen2-1.5B) on Vietnamese legal synthetic dataset.',
            technologies: ['Huggingface', 'LoRA', 'DPO', 'Unsloth', 'Git'],
            organization: 'TDTU NLP&KD LAB',
            date: 'Jan 2024 - Aug 2024'
        },
        {
            name: 'University Chatbot',
            description: 'Developed a University Chatbot using Retrieval-augmented Generation (RAG) with advanced techniques like Query Expansion, Intent Classification, Hybrid Search, and Re-ranking.',
            technologies: ['Python', 'Elasticsearch', 'OpenAI API', 'SentenceTransformers', 'LlamaIndex', 'RAG'],
            organization: 'TDTU NLP-KD Lab',
            date: 'Feb 2024 - May 2024'
        },
        {
            name: 'Vietnamese ChatBot with C-RRR Framework',
            description: 'Built a new framework for Vietnamese legal chatbot using T5 model finetuning, RLHF, and RLAIF for enhanced rewriting accuracy.',
            technologies: ['Huggingface', 'RLHF', 'PPO', 'Gemini API', 'CSE'],
            organization: 'TDTU NLP&KD LAB',
            date: 'Jan 2024 - Aug 2024'
        },
        {
            name: 'Vietnamese LLM Dataset Building',
            description: 'Created Vietnamese Pretraining LLM Dataset using translation, web data preprocessing, and unsupervised clustering techniques.',
            technologies: ['Python', 'OpenAI API', 'FAISS', 'UMAP', 'Gemini Pro'],
            organization: 'TDTU NLP-KD Lab',
            date: 'Feb 2024 - May 2024'
        },
        {
            name: 'ML System for Maintenance',
            description: 'Developed ML system for in-system maintenance including computer vision models for object detection, segmentation, and OCR at FPT TELECOM.',
            technologies: ['YOLO', 'PaddleOCR', 'Flask', 'Docker', 'MongoDB', 'ElasticSearch'],
            organization: 'FPT TELECOM',
            date: 'Jun 2023 - Present'
        }
    ];

    projectsList.innerHTML = '';
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300';
        projectCard.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-800">${project.name}</h3>
                <span class="text-sm text-gray-500">${project.date}</span>
            </div>
            <p class="text-gray-600 mb-3">${project.organization}</p>
            <p class="text-gray-700 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2">
                ${project.technologies.map(tech => 
                    `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>`
                ).join('')}
            </div>
        `;
        projectsList.appendChild(projectCard);
    });

    // Publications Section
    const publicationsSection = document.getElementById('publications-list');
    if (publicationsSection) {
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
                publisher: 'IEEE'
            },
            {
                title: 'Adapting Large Language Models to Vietnamese Law: Pretrained LLM Refinement vs Retrieval Augmented Generation',
                authors: 'Nguyen P. Nguyen, Thang V.Q. Le, Anh-Cuong Le, Viet-Ha Nguyen, Viet-Cuong Nguyen',
                conference: 'The 16th IEEE International Conference on Knowledge and Systems Engineering (KSE 2024)',
                year: '2024',
                publisher: 'IEEE'
            }
        ];

        publicationsSection.innerHTML = `
            <div class="space-y-12">
                ${publications.map(pub => `
                    <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${pub.title}</h3>
                        <p class="text-gray-600 mb-2">${pub.authors}</p>
                        <p class="text-gray-700">
                            <span class="font-medium">${pub.conference}</span>
                            ${pub.award ? `<span class="text-green-600 font-medium"> - ${pub.award}</span>` : ''}
                        </p>
                        <p class="text-gray-500 mt-2">${pub.publisher}, ${pub.year}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Typing effect for professional title
    const titles = [
        'AI Engineer',
        'Machine Learning Engineer',
        'AI Researcher',
    ];
    const titleElement = document.getElementById('professional-title');
    let currentTitleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeTitle() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        }

        setTimeout(typeTitle, isDeleting ? 50 : 100);
    }

    typeTitle();
});
