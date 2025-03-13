'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { BlogPost } from '../../../utils/supabase';
import { supabase } from '../../../utils/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MarkdownContent from '../../../components/MarkdownContent';

export default function BlogPostClient({ post: initialPost }: { post: BlogPost | null }) {
    const [post, setPost] = useState<BlogPost | null>(initialPost);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If this is a new post or the post wasn't found during static generation,
        // try to fetch it directly from Supabase
        async function fetchPost() {
            // Check if this is a new post using window.location
            const isNewPost = typeof window !== 'undefined' &&
                window.location.search.includes('new=true');

            if (!initialPost && isNewPost) {
                setIsLoading(true);
                try {
                    const slug = typeof window !== 'undefined' ?
                        window.location.pathname.split('/').pop() : '';

                    console.log(`Fetching new post with slug: ${slug}`);

                    const { data, error } = await supabase
                        .from('blog_posts')
                        .select('*')
                        .eq('slug', slug)
                        .eq('published', true)
                        .single();

                    if (error) {
                        console.error('Error fetching new post:', error);
                        setError('Failed to load post');
                        return;
                    }

                    if (data) {
                        console.log('Successfully loaded new post:', data.title);
                        setPost(data);
                        if (typeof window !== 'undefined') {
                            document.title = `${data.title} | Le Vo Quyet Thang`;
                        }
                    } else {
                        setError('Post not found');
                        if (typeof window !== 'undefined') {
                            document.title = 'Post Not Found | Le Vo Quyet Thang';
                        }
                    }
                } catch (err) {
                    console.error('Failed to fetch post:', err);
                    setError('Failed to load post');
                } finally {
                    setIsLoading(false);
                }
            } else if (initialPost) {
                // Set document title to post title if post exists
                if (typeof window !== 'undefined') {
                    document.title = `${initialPost.title} | Le Vo Quyet Thang`;
                }
            } else {
                if (typeof window !== 'undefined') {
                    document.title = 'Post Not Found | Le Vo Quyet Thang';
                }
            }
        }

        fetchPost();
    }, [initialPost]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-cyber-black">
                <div className="noise-overlay"></div>
                <Navbar />
                <main className="pt-32 pb-20 px-4 container mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-neon-blue">Loading post...</div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-cyber-black">
                <div className="noise-overlay"></div>
                <Navbar />
                <main className="pt-32 pb-20 px-4 container mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-cyber font-bold mb-6 text-neon-pink">404</h1>
                        <p className="text-xl text-cyber-gray mb-8">Post not found</p>
                        <Link href="/blog" className="text-neon-blue hover:text-neon-purple transition-colors">
                            &larr; Back to Blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cyber-black">
            <div className="noise-overlay"></div>
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <article className="container mx-auto max-w-4xl">
                    <div className="mb-8">
                        <Link href="/blog" className="text-neon-blue hover:text-neon-purple transition-colors inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>

                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-6 text-white">{post.title}</h1>
                        <div className="flex items-center text-cyber-gray mb-8">
                            <span className="mr-4">{post.date}</span>
                            <span className="mr-4">•</span>
                            <span>By {post.author}</span>
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg prose-headings:font-cyber prose-headings:text-neon-blue prose-a:text-neon-purple hover:prose-a:text-neon-blue prose-strong:text-white max-w-none">
                        <MarkdownContent content={post.content} />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
} 