# The Anti-Coding Agent Guide

An interactive, satirical guide to "job security through complexity" - exploring anti-patterns that make systems resistant to automation and AI agents.

**Live Demo:** [https://voku.github.io/TheAntiCodingAgentGuide/](https://voku.github.io/TheAntiCodingAgentGuide/)

## What is This?

This project is a brutalist web experience that presents 11 satirical "recipes" for building systems that are intentionally difficult for AI coding agents to understand and modify. It's a humorous exploration of common anti-patterns in software development.

⚠️ **Disclaimer:** This is a satirical educational project. Don't actually implement these patterns in production!

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production build will be generated in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Contributing

Contributions are welcome! Please visit the repository:
[https://github.com/voku/TheAntiCodingAgentGuide](https://github.com/voku/TheAntiCodingAgentGuide)

## Key Files Detector Helper Prompt

When working with this codebase, here are the key files and their purposes:

- **`App.tsx`** - Main React component with the interactive UI
- **`constants.ts`** - Contains all 11 "quest recipes" and their content
- **`types.ts`** - TypeScript type definitions
- **`index.html`** - HTML entry point with styles and scripts
- **`index.tsx`** - React app initialization
- **`vite.config.ts`** - Vite build configuration
- **`package.json`** - Dependencies and npm scripts

### Architecture Overview

This is a single-page React application built with:
- **React 19** for UI components
- **Vite** as the build tool and dev server
- **TypeScript** for type safety
- **Tailwind CSS** (via CDN) for styling
- **ESM imports** for React (via importmap in HTML)

The app follows a simple structure:
1. The HTML file loads React via ESM imports
2. `index.tsx` initializes the React app
3. `App.tsx` renders the interactive experience using data from `constants.ts`
4. No backend or API calls - it's a fully static site

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GitHub Pages (for deployment)

## License

This project is open source and available under standard GitHub terms.
