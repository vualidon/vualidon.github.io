'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MarkdownContent from '../../../components/MarkdownContent';

export default function BlogAdmin() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: '',
        author: '',
        date: '',
        slug: '',
        bg_color: 'from-neon-blue/20 to-neon-purple/20',
        published: true
    });
    const [previewMode, setPreviewMode] = useState(false);

    // Background color options
    const bgColorOptions = [
        { value: 'from-neon-blue/20 to-neon-purple/20', label: 'Blue to Purple' },
        { value: 'from-neon-purple/20 to-neon-pink/20', label: 'Purple to Pink' },
        { value: 'from-cyber-yellow/20 to-neon-blue/20', label: 'Yellow to Blue' },
        { value: 'from-neon-pink/20 to-cyber-yellow/20', label: 'Pink to Yellow' },
        { value: 'from-neon-green/20 to-neon-blue/20', label: 'Green to Blue' },
    ];

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setIsAuthenticated(true);
                fetchBlogPosts();
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking user:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchBlogPosts() {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBlogPosts(data || []);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            if (data.user) {
                setIsAuthenticated(true);
                fetchBlogPosts();
            }
        } catch (error: any) {
            setLoginError(error.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleLogout() {
        try {
            await supabase.auth.signOut();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setCurrentPost({ ...currentPost, [name]: target.checked });
        } else {
            setCurrentPost({ ...currentPost, [name]: value });

            // Auto-generate slug from title
            if (name === 'title') {
                setCurrentPost(prev => ({
                    ...prev,
                    [name]: value,
                    slug: generateSlug(value)
                }));
            }
        }
    }

    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-'); // Remove consecutive hyphens
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const formattedDate = new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            let postData = {
                ...currentPost,
                date: currentPost.date || formattedDate
            };

            let result;

            if (currentPost.id) {
                // Update existing post
                result = await supabase
                    .from('blog_posts')
                    .update(postData)
                    .eq('id', currentPost.id);
            } else {
                // Create new post - remove the id field for new posts
                const { id, ...postDataWithoutId } = postData;
                result = await supabase
                    .from('blog_posts')
                    .insert([postDataWithoutId]);
            }

            if (result.error) throw result.error;

            // Reset form and refresh posts
            setCurrentPost({
                id: null,
                title: '',
                content: '',
                excerpt: '',
                author: '',
                date: '',
                slug: '',
                bg_color: 'from-neon-blue/20 to-neon-purple/20',
                published: true
            });
            setIsEditing(false);
            fetchBlogPosts();
        } catch (error) {
            console.error('Error saving blog post:', error);
            alert('Failed to save blog post. Please try again.');
        }
    }

    function handleEdit(post: any) {
        setCurrentPost(post);
        setIsEditing(true);
        setPreviewMode(false);
        window.scrollTo(0, 0);
    }

    async function handleDelete(id: number) {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                const { error } = await supabase
                    .from('blog_posts')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchBlogPosts();

                // Force a hard refresh of the page to clear any cached data
                window.location.href = '/blog';
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Please try again.');
            }
        }
    }

    function handleCancel() {
        setCurrentPost({
            id: null,
            title: '',
            content: '',
            excerpt: '',
            author: '',
            date: '',
            slug: '',
            bg_color: 'from-neon-blue/20 to-neon-purple/20',
            published: true
        });
        setIsEditing(false);
        setPreviewMode(false);
    }

    function togglePreview() {
        setPreviewMode(!previewMode);
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-cyber-black">
                <div className="noise-overlay"></div>
                <Navbar />
                <main className="pt-32 pb-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <h1 className="text-3xl md:text-4xl font-cyber font-bold mb-8">BLOG ADMIN</h1>
                        <div className="flex justify-center items-center h-64">
                            <div className="text-neon-blue">Loading...</div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-cyber-black">
                <div className="noise-overlay"></div>
                <Navbar />
                <main className="pt-32 pb-20 px-4">
                    <div className="container mx-auto max-w-md">
                        <h1 className="text-3xl md:text-4xl font-cyber font-bold mb-8">BLOG ADMIN</h1>
                        <div className="bg-cyber-dark border border-neon-blue/20 rounded-lg p-6 md:p-8">
                            <h2 className="text-xl font-cyber mb-6">Login</h2>

                            {loginError && (
                                <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded mb-6">
                                    {loginError}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-neon-blue text-cyber-black font-cyber font-bold py-3 px-4 rounded hover:bg-neon-blue/90 transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'LOGIN'}
                                </button>
                            </form>
                        </div>
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
                <div className="container mx-auto max-w-6xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-cyber font-bold">BLOG ADMIN</h1>
                        <button
                            onClick={handleLogout}
                            className="text-neon-pink font-cyber text-sm border border-neon-pink/50 px-4 py-2 rounded hover:bg-neon-pink/10 transition-all duration-300"
                        >
                            LOGOUT
                        </button>
                    </div>

                    <div className="bg-cyber-dark border border-neon-blue/20 rounded-lg p-6 md:p-8 mb-8">
                        <h2 className="text-xl font-cyber mb-6">
                            {currentPost.id ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h2>

                        <div className="mb-4 flex space-x-4">
                            <button
                                onClick={() => setPreviewMode(false)}
                                className={`px-4 py-2 rounded ${!previewMode ? 'bg-neon-blue text-cyber-black' : 'bg-cyber-black text-neon-blue border border-neon-blue'}`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setPreviewMode(true)}
                                className={`px-4 py-2 rounded ${previewMode ? 'bg-neon-blue text-cyber-black' : 'bg-cyber-black text-neon-blue border border-neon-blue'}`}
                            >
                                Preview
                            </button>
                        </div>

                        {previewMode ? (
                            <div className="bg-cyber-black border border-neon-blue/20 rounded-lg p-6">
                                <h3 className="text-2xl font-cyber mb-4">{currentPost.title || 'Post Title'}</h3>
                                <div className="text-sm text-cyber-gray mb-6">
                                    {currentPost.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • By {currentPost.author || 'Author'}
                                </div>
                                <div className="prose prose-invert prose-headings:font-cyber prose-headings:text-neon-blue prose-a:text-neon-purple hover:prose-a:text-neon-blue prose-strong:text-white max-w-none">
                                    <MarkdownContent content={currentPost.content || '*No content yet*'} />
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={currentPost.title}
                                            onChange={handleInputChange}
                                            className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="slug" className="block text-sm font-medium mb-2">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            id="slug"
                                            name="slug"
                                            value={currentPost.slug}
                                            onChange={handleInputChange}
                                            className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="mb-4">
                                        <label htmlFor="author" className="block text-sm font-medium mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            name="author"
                                            value={currentPost.author}
                                            onChange={handleInputChange}
                                            className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="date" className="block text-sm font-medium mb-2">
                                            Date (leave blank for today)
                                        </label>
                                        <input
                                            type="text"
                                            id="date"
                                            name="date"
                                            value={currentPost.date}
                                            onChange={handleInputChange}
                                            placeholder="e.g. May 15, 2023"
                                            className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="mb-4">
                                        <label htmlFor="bg_color" className="block text-sm font-medium mb-2">
                                            Background Color
                                        </label>
                                        <select
                                            id="bg_color"
                                            name="bg_color"
                                            value={currentPost.bg_color}
                                            onChange={handleInputChange}
                                            className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                        >
                                            {bgColorOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="published" className="block text-sm font-medium mb-2">
                                            Status
                                        </label>
                                        <div className="flex items-center mt-3">
                                            <input
                                                type="checkbox"
                                                id="published"
                                                name="published"
                                                checked={currentPost.published}
                                                onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                                                className="h-5 w-5 text-neon-blue focus:ring-neon-blue border-neon-blue/30 rounded"
                                            />
                                            <label htmlFor="published" className="ml-2 block text-sm">
                                                Published
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                                        Excerpt
                                    </label>
                                    <textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={currentPost.excerpt}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="content" className="block text-sm font-medium mb-2">
                                        Content (Markdown)
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={currentPost.content}
                                        onChange={handleInputChange}
                                        rows={15}
                                        className="w-full bg-cyber-black border border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none font-mono text-sm"
                                        required
                                    ></textarea>
                                    <p className="text-xs text-cyber-gray mt-2">
                                        Use Markdown syntax for formatting. # for headings, * for lists, ** for bold, etc.
                                    </p>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-neon-blue text-cyber-black font-cyber font-bold py-2 px-6 rounded hover:bg-neon-blue/90 transition-all duration-300"
                                    >
                                        {currentPost.id ? 'UPDATE POST' : 'CREATE POST'}
                                    </button>

                                    {(isEditing || currentPost.title || currentPost.content) && (
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-transparent border border-neon-pink text-neon-pink font-cyber py-2 px-6 rounded hover:bg-neon-pink/10 transition-all duration-300"
                                        >
                                            CANCEL
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="bg-cyber-dark border border-neon-blue/20 rounded-lg p-6 md:p-8">
                        <h2 className="text-xl font-cyber mb-6">Blog Posts</h2>

                        {blogPosts.length === 0 ? (
                            <p className="text-cyber-gray">No blog posts found. Create your first post above.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-neon-blue/20">
                                            <th className="text-left py-3 px-4">Title</th>
                                            <th className="text-left py-3 px-4">Date</th>
                                            <th className="text-left py-3 px-4">Status</th>
                                            <th className="text-left py-3 px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogPosts.map((post) => (
                                            <tr key={post.id} className="border-b border-neon-blue/10 hover:bg-cyber-black/50">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium">{post.title}</div>
                                                    <div className="text-xs text-cyber-gray mt-1">/{post.slug}</div>
                                                </td>
                                                <td className="py-3 px-4">{post.date}</td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-block px-2 py-1 rounded text-xs ${post.published
                                                            ? 'bg-neon-green/20 text-neon-green'
                                                            : 'bg-neon-pink/20 text-neon-pink'
                                                            }`}
                                                    >
                                                        {post.published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => handleEdit(post)}
                                                            className="text-neon-blue hover:text-neon-purple transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(post.id)}
                                                            className="text-neon-pink hover:text-neon-pink/70 transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                        <a
                                                            href={`/blog/${post.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-neon-green hover:text-neon-green/70 transition-colors"
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
} 