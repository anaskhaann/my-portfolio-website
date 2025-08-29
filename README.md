# Personal Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to the repository for my personal portfolio website. This project is a modern, fully responsive single-page application designed to showcase my skills, projects, and professional journey. It's built with a focus on performance, aesthetics, and a high-quality user experience.

**Live:** [anaskhaann.vercel.app](https://anaskhaann.vercel.app/)

---

## ✨ Key Features

- **Modern & Responsive Design**: A clean, elegant UI built with Tailwind CSS that looks great on all devices.
- **Dark & Light Modes**: User-selectable theme to suit different lighting conditions and preferences.
- **Engaging Animations**: Smooth, performant animations powered by GSAP and ScrollTrigger to bring the content to life.
- **Custom Cursor Follower**: An interactive cursor effect that enhances user engagement.
- **Dynamic Content**: Sections for projects, experience, and skills are dynamically rendered from a central data source.
- **Smooth Scrolling**: Fluid navigation implemented with Lenis for an enhanced browsing experience.

---

## 🛠️ Tech Stack & Rationale

This project leverages a modern frontend stack to achieve a high-quality, maintainable, and performant website.

| Technology                                        | Purpose                                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **[React](https://react.dev/)**                   | A powerful library for building component-based user interfaces.                              |
| **[TypeScript](https://www.typescriptlang.org/)** | Provides static typing to enhance code quality and developer experience.                      |
| **[Vite](https://vitejs.dev/)**                   | A next-generation build tool that offers a significantly faster development experience.       |
| **[Tailwind CSS](https://tailwindcss.com/)**      | A utility-first CSS framework for rapidly building custom designs without leaving your HTML.  |
| **[GSAP](https://gsap.com/)**                     | The GreenSock Animation Platform, used for creating high-performance, interactive animations. |
| **[Lenis](https://lenis.studio/)**                | Provides a smooth scrolling experience that enhances the overall feel of the site.            |
| **[Shadcn/ui](https://ui.shadcn.com/)**           | A collection of beautifully designed, accessible, and reusable components.                    |
| **[Lucide React](https://lucide.dev/)**           | A comprehensive library of clean and consistent icons.                                        |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) (version 18 or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/anaskhaann/my-portfolio-website.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd my-portfolio-website
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Development Server

To start the development server, run the following command. This will open the project in your default browser at `http://localhost:8080`.

```sh
npm run dev
```

### Building for Production

To create a production-ready build of the application, run:

```sh
npm run build
```

This will create a `dist` folder with the optimized and minified files ready for deployment.

---

## 📂 Project Structure

The project is organized with a focus on modularity and scalability.

```
my-portfolio-website/
├── public/                # Static assets (images, fonts, icons)
├── src/
│   ├── components/        # Reusable React components
│   │   ├── layout/        # Structural components (AppLayout, Navigation)
│   │   ├── sections/      # Major page sections (Hero, About, Projects)
│   │   └── ui/            # Base UI components from Shadcn/ui
│   ├── data/              # Portfolio data (experience, projects, skills)
│   ├── hooks/             # Custom React hooks for shared logic
│   ├── lib/               # Utility functions
│   ├── pages/             # Main page component
│   ├── providers/         # Global context providers (Theme, Lenis)
│   ├── styles/            # Global CSS and font styles
│   ├── types.ts           # TypeScript type definitions
│   ├── App.tsx            # Root component with providers
│   └── main.tsx           # Application entry point
├── .eslintrc.cjs          # ESLint configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## 🙏 Attribution & Credits

This project was made possible by the following open-source libraries and tools:

- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [GSAP](https://gsap.com/)
- **Smooth Scrolling**: [Lenis](https://lenis.studio/)
- **Icons**: [Lucide React](https://lucide.dev/)

A special thank you to the creators and maintainers of these amazing projects.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Made with ❤️ By Mohd Anas**
