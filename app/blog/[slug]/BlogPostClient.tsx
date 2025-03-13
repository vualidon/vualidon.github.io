'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { BlogPost } from '../../../utils/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MarkdownContent from '../../../components/MarkdownContent';

export default function BlogPostClient({ post }: { post: BlogPost | null }) {
    useEffect(() => {
        // Set document title to post title if post exists
        if (post) {
            document.title = `${post.title} | Le Vo Quyet Thang`;
        } else {
            document.title = 'Post Not Found | Le Vo Quyet Thang';
        }
    }, [post]);

    if (!post) {
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