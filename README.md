# My Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark/light mode toggle, and a professional design that showcases your skills and projects effectively.

## 🌟 Features

### Core Functionality

- **Single Page Application (SPA)** - Smooth scrolling navigation without page reloads
- **Responsive Design** - Optimized for all screen sizes (mobile, tablet, desktop)
- **Dark/Light Mode Toggle** - User preference saved in localStorage
- **Smooth Animations** - Professional transitions and micro-interactions
- **Loading Screen** - Elegant initial loading animation

### Sections

1. **Home** - Hero section with photo, typing animation,
2. **About** - Personal introduction and background
3. **Experience** - Professional experience with scrollable timeline
4. **Projects** - Interactive project cards with expandable details
5. **Skills** - Categorized skill showcase with icons

### Interactive Elements

- **Mouse Following Ball** - Subtle cursor effect on desktop
- **Typing Animation** - Dynamic text animation for job titles
- **Expandable Project Cards** - Click to reveal project details
- **Smooth Section Navigation** - Intelligent active section highlighting
- **Mobile-Friendly Menu** - Collapsible hamburger navigation

## 🚀 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Animations**: GSAP,Locomotive Scroll,CSS transitions and custom keyframes

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Shadcn/ui components
├── pages/              # Main application pages
│   └── index.tsx       # Main portfolio component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── index.css           # Global styles and animations
├── main.tsx           # Application entry point
└── App.tsx            # Root component
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 🎨 Customization Guide

### Personal Information

Update the portfolio data in `src/pages/index.tsx`:

```typescript
// Profile information
const profileData = {
  name: "Your Name",
  title: "Your Professional Title",
  profileImage: "path/to/your/image.jpg",
  personalityLine: "Your personality description",
};

// Experience data
const experiences = [
  {
    title: "Job Title",
    company: "Company Name",
    duration: "Start - End Date",
    description: "Job description...",
    technologies: ["Tech1", "Tech2"],
  },
];

// Projects data
const projects = [
  {
    title: "Project Name",
    description: "Project description...",
    technologies: ["React", "Node.js"],
    githubUrl: "GitHub link",
    liveUrl: "Live demo link", // Optional
    videoUrl: "Video demo link", // Optional
    imageUrl: "Project image URL",
  },
];
```

### Styling & Theming

- **Colors**: Modify CSS variables in `src/index.css`
- **Fonts**: Add Google Fonts to `index.html` and update Tailwind config
- **Animations**: Customize keyframes in `src/index.css`

### Skills Section

Update the `skillCategories` array to reflect your technical skills:

```typescript
const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "Python", icon: "⚛️" },
      { name: "Vue.js", icon: "💚" },
    ],
  },
];
```

## 📱 Responsive Design

The website is optimized for:

- **Mobile**
- **Tablet**
- **Desktop**

Key responsive features:

- Collapsible navigation menu on mobile
- Flexible grid layouts
- Scalable typography
- Touch-friendly interactive elements

## 🔧 Performance Optimizations

- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Lazy loading for better initial load
- **CSS Optimization**: Tailwind CSS purging
- **Smooth Animations**: Hardware-accelerated transitions
- **Efficient State Management**: Minimal re-renders

## 🚀 Deployment Options

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Support

For questions or support:

- Open an issue on GitHub
- Feel Free to Fork this and Make changes As per You like in the Website

---

**Made with ❤️ By Anas Khan**
