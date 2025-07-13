# My Personal Portfolio

This is my personal portfolio website, built with a modern tech stack to showcase my skills, projects, and professional experience. The site is designed to be fully responsive, interactive, and visually appealing, featuring smooth animations and a clean user interface.

<!-- **Live Demo:** [Link to your deployed portfolio]() -->

---

## ✨ Features

- **🎨 Modern UI/UX:** Clean, modern design with a focus on user experience.
- **🌓 Dark/Light Mode:** Seamless theme switching for user preference.
- **🚀 Smooth Scrolling:** Implemented with Lenis for a fluid browsing experience.
- **🎬 Interactive Animations:** Engaging animations powered by GSAP and ScrollTrigger.
- **📱 Fully Responsive:** Adapts perfectly to all screen sizes, from mobile to desktop.
- **🧩 Component-Based Architecture:** Built with reusable React components for maintainability.
- **📂 Project Showcase:** Detailed view of my projects with descriptions and links.
- **💼 Experience Timeline:** An overview of my professional journey.
- **🛠️ Skills Section:** A comprehensive list of my technical skills.

---

## 🚀 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Animations**: GSAP,CSS transitions and custom keyframes

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) (version 18 or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/anaskhaann/my-portfolio-website.git
   ```
2. Navigate to the project directory:
   ```sh
   cd my-portfolio-website
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run the following command. This will open the project in your default browser.

```sh
npm run dev
```

### Building for Production

To create a production-ready build of the application, run:

```sh
npm run build
```

This will create a `dist` folder with the optimized and minified files for deployment.

---

## 📂 Project Structure

Here is an overview of the project's directory structure:

```
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components (Shadcn UI and custom)
│   │   ├── layout/     # Layout components (e.g., AppLayout, Header, Footer)
│   │   └── sections/   # Major page sections (e.g., Hero, About, Projects)
│   ├── data/           # Static data for the portfolio (e.g., projects, skills)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions (e.g., cn for classnames)
│   ├── pages/          # Page components
│   ├── providers/      # Context providers (e.g., ThemeProvider, LenisProvider)
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main application component with routing
│   └── main.tsx        # Entry point of the application
├── .eslintrc.cjs       # ESLint configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

---

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

## 🎨 Customization Guide

### Personal Information

Update the portfolio data in `src/data/portfolioData.ts`:

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
    category: "Others",
    skills: [
      { name: "Vscode", icon: "/assets/skills/vscode.svg" },
      { name: "Github", icon: "/assets/skills/github.svg" },
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

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Made with ❤️ By Anas Khan**
