import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cyber-black">
      <div className="noise-overlay"></div>
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-8 text-gradient">
          POST NOT FOUND
        </h1>
        <p className="text-lg text-cyber-gray mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/blog" className="inline-block">
          <span className="text-neon-blue font-cyber text-sm border border-neon-blue/50 px-6 py-3 rounded hover:bg-neon-blue/10 transition-all duration-300">
            &lt; BACK TO BLOG
          </span>
        </Link>
      </main>
      
      <Footer />
    </div>
  );
} 