import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import type { BlogPost } from '../../../utils/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MarkdownContent from '../../../components/MarkdownContent';

// Fallback blog posts in case Supabase fetch fails
const fallbackPosts = [
    {
        id: 1,
        title: 'Getting Started with AI Development',
        content: `
# Getting Started with AI Development

Artificial Intelligence (AI) has become one of the most transformative technologies of our time. From virtual assistants to autonomous vehicles, AI is reshaping industries and changing the way we interact with technology.

## What is AI Development?

AI development involves creating systems that can perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.

## Essential Tools for AI Development

To get started with AI development, you'll need to familiarize yourself with several key tools and frameworks:

* **Python**: The most popular programming language for AI development due to its simplicity and extensive libraries.
* **TensorFlow**: An open-source machine learning framework developed by Google.
* **PyTorch**: A deep learning framework that's gaining popularity for its dynamic computation graph.
* **Scikit-learn**: A simple and efficient tool for data mining and data analysis.
* **Jupyter Notebooks**: An interactive computing environment that facilitates the creation and sharing of documents containing live code, equations, visualizations, and narrative text.

## Getting Started with Machine Learning

Machine Learning (ML) is a subset of AI that focuses on building systems that can learn from data. Here's a simple roadmap to get started:

1. Learn the fundamentals of programming with Python.
2. Understand the basics of statistics and linear algebra.
3. Study machine learning algorithms and their applications.
4. Practice with real-world datasets.
5. Build your own projects to apply what you've learned.

## The Future of AI Development

The field of AI is evolving rapidly, with new breakthroughs happening regularly. As you embark on your AI development journey, keep an eye on emerging trends such as:

* Reinforcement Learning
* Generative AI
* Explainable AI
* AI Ethics and Responsible AI

By staying current with these developments, you'll be well-positioned to contribute to this exciting field.
    `,
        date: 'May 15, 2023',
        author: 'Le Vo Quyet Thang',
        slug: 'getting-started-with-ai-development',
        bg_color: 'from-neon-blue/20 to-neon-purple/20',
        excerpt: 'An introduction to the world of artificial intelligence development and the tools you need to get started.',
        published: true,
    },
    {
        id: 2,
        title: 'The Future of Computer Vision',
        content: `
# The Future of Computer Vision

Computer Vision is rapidly evolving, with new applications and technologies emerging every day. This post explores the cutting-edge developments in the field and what we can expect in the coming years.

## Current State of Computer Vision

Computer Vision has made remarkable progress in recent years, driven by advances in deep learning and neural networks. Today's systems can recognize objects, faces, and scenes with impressive accuracy.

## Emerging Trends

Several exciting trends are shaping the future of Computer Vision:

* **3D Vision**: Moving beyond 2D image analysis to understand the three-dimensional structure of scenes.
* **Video Understanding**: Analyzing not just static images but the temporal dynamics of video sequences.
* **Multi-modal Learning**: Combining vision with other modalities like text and audio for richer understanding.
* **Edge Computing**: Running computer vision algorithms on edge devices rather than in the cloud.

## Applications on the Horizon

These advances are enabling new applications across various domains:

1. Autonomous vehicles with enhanced perception capabilities
2. Medical imaging systems that can detect diseases earlier and more accurately
3. Augmented reality experiences that seamlessly blend the digital and physical worlds
4. Smart cities with intelligent surveillance and traffic management

## Challenges and Opportunities

Despite the progress, several challenges remain:

* Ensuring privacy and ethical use of computer vision technology
* Reducing the computational requirements of advanced models
* Improving robustness to adversarial attacks and domain shifts
* Making computer vision systems more interpretable and explainable

These challenges present opportunities for researchers and practitioners to make significant contributions to the field.
    `,
        date: 'June 22, 2023',
        author: 'Le Vo Quyet Thang',
        slug: 'future-of-computer-vision',
        bg_color: 'from-neon-purple/20 to-neon-pink/20',
        excerpt: 'Exploring the latest advancements in computer vision technology and what the future holds for this exciting field.',
        published: true,
    },
    {
        id: 3,
        title: 'Machine Learning Best Practices',
        content: `
# Machine Learning Best Practices

Implementing machine learning models in production environments requires careful planning and adherence to best practices. This post outlines key considerations for successful ML deployments.

## Data Quality and Preparation

The foundation of any successful machine learning project is high-quality data:

* **Data Cleaning**: Remove duplicates, handle missing values, and correct errors.
* **Feature Engineering**: Create meaningful features that capture the underlying patterns in your data.
* **Data Splitting**: Properly divide your data into training, validation, and test sets.
* **Data Versioning**: Track changes to your datasets over time.

## Model Development

When developing your models, consider these practices:

1. Start with simple models before moving to more complex ones.
2. Use cross-validation to ensure your model generalizes well.
3. Regularly evaluate your model against baseline approaches.
4. Document your modeling decisions and experiments.

## Deployment and Monitoring

Once your model is ready for production:

* **Containerization**: Use Docker to package your model and its dependencies.
* **CI/CD Pipelines**: Automate testing and deployment processes.
* **Monitoring**: Track model performance, data drift, and system health.
* **Feedback Loops**: Establish mechanisms to incorporate user feedback and new data.

## Ethical Considerations

Finally, ensure your ML systems are developed and deployed responsibly:

* Assess potential biases in your data and models.
* Consider the privacy implications of your ML system.
* Design for transparency and explainability.
* Regularly audit your system for unintended consequences.

By following these best practices, you can build machine learning systems that are not only technically sound but also reliable, maintainable, and ethical.
    `,
        date: 'July 10, 2023',
        author: 'Le Vo Quyet Thang',
        slug: 'machine-learning-best-practices',
        bg_color: 'from-cyber-yellow/20 to-neon-blue/20',
        excerpt: 'Learn the best practices for implementing machine learning models in production environments.',
        published: true,
    },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getBlogPost(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found | Blog',
            description: 'The blog post you are looking for does not exist.',
        };
    }

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt,
    };
}

async function getBlogPost(slug: string) {
    try {
        console.log(`Fetching blog post with slug: ${slug}`);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error) {
            console.error('Error fetching blog post from database:', error);
            // Try to find the post in fallback data
            console.log('Attempting to use fallback data');
            const fallbackPost = fallbackPosts.find(p => p.slug === slug);
            return fallbackPost || null;
        }

        if (!data) {
            console.log('No post found in database, checking fallback data');
            const fallbackPost = fallbackPosts.find(p => p.slug === slug);
            return fallbackPost || null;
        }

        console.log(`Successfully loaded post from database: ${data.title}`);
        return data;
    } catch (error) {
        console.error('Failed to fetch blog post:', error);
        // Try to find the post in fallback data
        const fallbackPost = fallbackPosts.find(p => p.slug === slug);
        return fallbackPost || null;
    }
}

// Force revalidation on each request in development
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 3600;

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('slug')
            .eq('published', true);

        if (error || !data.length) {
            console.log('Using fallback posts for static params');
            return fallbackPosts.map((post) => ({
                slug: post.slug,
            }));
        }

        console.log(`Generated static params for ${data.length} posts from database`);
        return data.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return fallbackPosts.map((post) => ({
            slug: post.slug,
        }));
    }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-cyber-black">
            <div className="noise-overlay"></div>
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Link href="/blog" className="inline-block mb-8">
                        <span className="text-neon-blue font-cyber text-sm border border-neon-blue/50 px-4 py-2 rounded hover:bg-neon-blue/10 transition-all duration-300">
                            &lt; BACK TO BLOG
                        </span>
                    </Link>

                    <div>
                        <div className={`h-64 md:h-80 relative rounded-lg overflow-hidden mb-8 bg-gradient-to-br ${post.bg_color}`}>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-black/90"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-cyber font-bold mb-4">
                                    {post.title}
                                </h1>
                                <div className="flex items-center text-cyber-gray text-sm">
                                    <span className="mr-4">{post.date}</span>
                                    <span>By {post.author}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-cyber-dark border border-neon-blue/20 rounded-lg p-6 md:p-8">
                            <div className="prose prose-invert prose-headings:font-cyber prose-headings:text-neon-blue prose-a:text-neon-purple hover:prose-a:text-neon-blue prose-strong:text-white max-w-none">
                                <MarkdownContent content={post.content} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 