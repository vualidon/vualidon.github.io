# Cyberpunk Personal Portfolio

A modern, cyberpunk-themed personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This project features a futuristic UI with neon effects, particle animations, and interactive elements inspired by cyberpunk aesthetics.

## Features

- 🌟 Cyberpunk-inspired design with neon colors and futuristic elements
- 🔮 Interactive 3D particle background using Three.js
- ⚡ Smooth animations and transitions with Framer Motion
- 🖱️ Custom cursor effects
- 📱 Fully responsive design for all devices
- 🎨 Tailwind CSS for styling
- 🚀 Next.js for fast, SEO-friendly rendering
- 🔍 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cyberpunk-portfolio.git
cd cyberpunk-portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── HeroSection.tsx   # Hero section with 3D background
│   ├── AboutSection.tsx  # About section
│   ├── ProjectsSection.tsx # Projects showcase
│   ├── ContactSection.tsx # Contact form
│   ├── Footer.tsx        # Footer component
│   └── CyberCursor.tsx   # Custom cursor effect
├── public/               # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies
```

## Customization

### Colors

The cyberpunk color scheme can be customized in the `tailwind.config.js` file:

```js
theme: {
  extend: {
    colors: {
      'neon-blue': '#00f0ff',
      'neon-pink': '#ff00ff',
      'neon-purple': '#b026ff',
      'cyber-yellow': '#f7f01d',
      'cyber-black': '#0d0d0d',
      'cyber-dark': '#121212',
      'cyber-gray': '#1e1e1e',
    },
    // ...
  }
}
```

### Content

Update the content in the respective component files to personalize the portfolio:

- `components/HeroSection.tsx` - Main headline and introduction
- `components/AboutSection.tsx` - About information and skills
- `components/ProjectsSection.tsx` - Project showcase
- `components/ContactSection.tsx` - Contact information and form

## Deployment

This project is configured for deployment on GitHub Pages. To deploy:

```bash
npm run build
# or
yarn build
```

The static output will be generated in the `out` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspired by cyberpunk aesthetics and [me.evesq.com](https://me.evesq.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
