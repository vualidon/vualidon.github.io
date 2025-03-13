import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Blog post type definition
export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    date: string;
    published: boolean;
    bg_color: string;
    created_at: string;
    updated_at: string;
}; 