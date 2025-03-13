import { Metadata } from 'next';
import Link from 'next/link';
import { supabase, BlogPost } from '../../utils/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
    title: 'Blog | Le Vo Quyet Thang',
    description: 'Thoughts, insights, and explorations in AI, machine learning, and computer vision.',
};

// Fallback blog posts in case Supabase fetch fails
const fallbackPosts = [
    {
        id: 1,
        title: 'Getting Started with AI Development',
        excerpt: 'An introduction to the world of artificial intelligence development and the tools you need to get started.',
        date: 'May 15, 2023',
        slug: 'getting-started-with-ai-development',
        bg_color: 'from-neon-blue/20 to-neon-purple/20',
        author: 'Le Vo Quyet Thang',
        published: true,
    },
    {
        id: 2,
        title: 'The Future of Computer Vision',
        excerpt: 'Exploring the latest advancements in computer vision technology and what the future holds for this exciting field.',
        date: 'June 22, 2023',
        slug: 'future-of-computer-vision',
        bg_color: 'from-neon-purple/20 to-neon-pink/20',
        author: 'Le Vo Quyet Thang',
        published: true,
    },
    {
        id: 3,
        title: 'Machine Learning Best Practices',
        excerpt: 'Learn the best practices for implementing machine learning models in production environments.',
        date: 'July 10, 2023',
        slug: 'machine-learning-best-practices',
        bg_color: 'from-cyber-yellow/20 to-neon-blue/20',
        author: 'Le Vo Quyet Thang',
        published: true,
    },
];

async function getBlogPosts() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching blog posts:', error);
            return fallbackPosts;
        }

        // Only use fallback posts if no data is returned
        if (!data || data.length === 0) {
            console.log('No posts found in database, using fallback posts');
            return fallbackPosts;
        }

        console.log(`Loaded ${data.length} posts from database`);
        return data;
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return fallbackPosts;
    }
}

// Force revalidation on each request in development
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 3600;

export default async function Blog() {
    const blogPosts = await getBlogPosts();

    return (
        <div className="min-h-screen bg-cyber-black">
            <div className="noise-overlay"></div>
            <Navbar />

            <main className="pt-32 pb-20 px-4 container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-cyber font-bold mb-6 relative inline-block">
                        <span className="text-white">&lt;</span>
                        <span className="text-gradient relative">
                            BLOG
                            <span className="absolute -inset-1 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 blur-sm -z-10"></span>
                        </span>
                        <span className="text-white">/&gt;</span>
                    </h1>
                    <p className="text-lg text-cyber-gray max-w-2xl mx-auto">
                        Thoughts, insights, and explorations in AI, machine learning, and computer vision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {blogPosts.map((post, index) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.id}
                            className="block group transform-gpu transition-all duration-500 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <article className="h-full bg-cyber-dark border border-neon-blue/20 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-neon-blue/60 relative shadow-lg shadow-cyber-black/50 group-hover:shadow-[0_0_20px_rgba(0,221,255,0.3)]">
                                {/* Glowing corner accents */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue/0 group-hover:border-neon-blue/80 transition-all duration-500 rounded-tl-md"></div>
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-blue/0 group-hover:border-neon-blue/80 transition-all duration-500 rounded-tr-md"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-blue/0 group-hover:border-neon-blue/80 transition-all duration-500 rounded-bl-md"></div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-blue/0 group-hover:border-neon-blue/80 transition-all duration-500 rounded-br-md"></div>

                                <div className={`h-64 relative overflow-hidden bg-gradient-to-br ${post.bg_color} group-hover:saturate-150 transition-all duration-500`}>
                                    {/* Animated gradient overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:50%_100%] bg-no-repeat bg-[position:100%_0] group-hover:bg-[position:0%_0] animate-shimmer"></div>

                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-black/90"></div>

                                    {/* Date badge */}
                                    <div className="absolute top-4 right-4 bg-cyber-black/70 text-neon-blue text-xs px-3 py-1 rounded-full border border-neon-blue/40 backdrop-blur-sm group-hover:bg-neon-blue/20 group-hover:border-neon-blue/60 transition-all duration-500 z-10">
                                        {post.date}
                                    </div>

                                    {/* Title area */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-[-5px] transition-transform duration-500">
                                        <h2 className="text-2xl font-cyber font-bold mb-2 text-white group-hover:text-neon-blue transition-colors duration-500">
                                            {post.title}
                                        </h2>
                                    </div>
                                </div>

                                <div className="p-6 relative">
                                    <p className="text-cyber-gray mb-6 line-clamp-3 group-hover:text-white/90 transition-colors duration-500">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex justify-between items-center relative z-10">
                                        <span className="text-neon-blue font-cyber text-sm inline-flex items-center group-hover:text-neon-purple transition-colors duration-300">
                                            READ MORE
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-cyber-gray group-hover:text-neon-blue/70 transition-colors duration-500">By {post.author}</span>
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue/5 to-neon-purple/5"></div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Add this to your global CSS
// @keyframes shimmer {
//   0% { background-position: 100% 0; }
//   100% { background-position: 0 0; }
// } 