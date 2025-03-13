import { Metadata } from 'next';
import { supabase } from '../../../utils/supabase';
import BlogPostClient from './BlogPostClient';

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
`,
        excerpt: 'An introduction to the world of artificial intelligence development and the tools you need to get started.',
        date: 'May 15, 2023',
        slug: 'getting-started-with-ai-development',
        bg_color: 'from-neon-blue/20 to-neon-purple/20',
        author: 'Le Vo Quyet Thang',
        published: true,
    },
    // Add other fallback posts as needed
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

    // Pass the post data to the client component
    return <BlogPostClient post={post} />;
} 