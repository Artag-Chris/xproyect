# Lumen X Labs

A modern, light-themed Next.js portfolio and project showcase platform featuring video production, metrics tracking, and interactive experiences.

## Features

✨ **Built with Modern Tech Stack**
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for responsive design
- **Styled Components** for advanced styling
- **Lottie** for animations
- **GSAP** for complex animations
- **Framer Motion** for transitions

📊 **Core Components**
- **Video Player**: HTML5 video with custom controls and overlays
- **Metrics Grid**: Animated statistics with CountUp animations
- **Hero Section**: Full-height hero with gradient backgrounds
- **Header/Navigation**: Sticky header with mobile responsiveness
- **Footer**: Multi-section footer with social links

🎨 **Design System**
- Light theme with electric blue (#007bff) accents
- CSS variables for consistent theming
- Dark mode support via system preferences
- Smooth animations and transitions
- Responsive design for all devices

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd lumen-x-labs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
lumen-x-labs/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles & CSS variables
├── src/
│   ├── components/
│   │   ├── common/               # Shared components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/             # Page sections
│   │   │   └── Hero.tsx
│   │   ├── video/                # Video components
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── LottieAnimation.tsx
│   │   └── metrics/              # Metrics components
│   │       ├── Metric.tsx
│   │       └── MetricsGrid.tsx
│   ├── styles/                   # Global styles
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   ├── types/                    # TypeScript types
│   └── utils/                    # Helper functions
├── public/                       # Static assets
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

## Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary: #007bff;           /* Electric Blue */
  --primary-dark: #0056b3;
  --primary-light: #0d7ce4;
  --background: #ffffff;
  --foreground: #000000;
}
```

### Adding New Components

1. Create component file in `src/components/[type]/`
2. Use styled-components or Tailwind CSS
3. Import and use in pages

### Adding New Pages

1. Create folder in `app/[page-name]/`
2. Add `page.tsx` file
3. Optionally add `layout.tsx` for page-specific layout

## Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## Features to Implement

- [ ] Projects showcase page with filtering
- [ ] Blog/Articles section
- [ ] Contact form with email integration
- [ ] Client testimonials carousel
- [ ] GitHub stats integration
- [ ] Analytics dashboard
- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Image optimization
- [ ] SEO enhancements

## Performance

- ⚡ Next.js 16 with Turbopack
- 📦 Optimized bundle with tree-shaking
- 🎯 Code splitting and lazy loading
- 🖼️ Image optimization ready
- 🚀 Static and dynamic rendering

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use this project as a template.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with ❤️ by Lumen X Labs**
