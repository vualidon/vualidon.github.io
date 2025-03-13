# Blog Setup Guide

This guide will walk you through setting up the blog functionality on your personal website using Supabase as the backend.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Your Next.js website codebase

## Step 1: Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.com/)
2. Create a new project and give it a name (e.g., "personal-blog")
3. Choose a strong database password and save it securely
4. Select a region closest to your target audience
5. Wait for your project to be created (this may take a few minutes)

## Step 2: Set Up the Database

1. In your Supabase project dashboard, navigate to the SQL Editor
2. Create a new query and paste the contents of the `supabase/schema.sql` file
3. Run the query to create the `blog_posts` table and insert sample blog posts
4. The sample posts are in Markdown format and will be displayed on your blog

## Step 3: Configure Authentication

1. In your Supabase project, go to Authentication → Settings
2. Under Email Auth, make sure "Enable Email Signup" is turned on
3. Go to Authentication → Users and click "Add User"
4. Create a user with your email address and a strong password
5. This user will be your admin account for managing blog posts

## Step 4: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to Settings → API
2. Copy the "Project URL" and "anon public" key
3. Create a `.env.local` file in your project root (if it doesn't exist already)
4. Add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Step 5: Run Your Website

1. Install the required dependencies if you haven't already:

   ```
   npm install react-markdown rehype-raw rehype-sanitize remark-gfm
   ```

2. Start your development server:

   ```
   npm run dev
   ```

3. Visit `http://localhost:3000/blog` to see your blog posts
4. Visit `http://localhost:3000/blog/admin` to manage your blog posts

## Using the Blog Admin Interface

1. Log in with the email and password you created in Step 3
2. Create new blog posts using the form
3. Edit or delete existing posts
4. Toggle the "Published" status to control which posts are visible to the public
5. Use Markdown syntax for formatting your content:
   - `# Heading 1`, `## Heading 2`, etc. for headings
   - `*italic*` for italic text
   - `**bold**` for bold text
   - `- item` or `* item` for unordered lists
   - `1. item` for ordered lists
   - `[link text](url)` for links
   - And more!

## Blog Features

- **Markdown Support**: Write your blog posts using Markdown syntax for easy formatting
- **Admin Interface**: Secure admin page for managing blog posts
- **Static Site Generation**: Blog pages are statically generated for optimal performance
- **Responsive Design**: Looks great on all devices
- **Fallback Mechanism**: If Supabase is unavailable, the site will use fallback data

## Customization

- Modify the blog page layouts in `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`
- Customize the styling by editing the Tailwind classes
- Add new background color options in the admin interface by editing the `bgColorOptions` array

## Deployment

When deploying your site, make sure to:

1. Add your Supabase environment variables to your hosting platform
2. Run a build to generate the static pages: `npm run build`

## Troubleshooting

- If you can't log in to the admin interface, check that your user exists in Supabase Authentication
- If blog posts aren't appearing, verify that they are marked as "Published" in the database
- For any database issues, check the Supabase dashboard for error logs

---

Enjoy your new blog system! Now you can easily write and publish blog posts using Markdown without having to hardcode them into your website.
