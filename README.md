# Ubulu Project

A modern, modular, and scalable Vite + React + TypeScript application featuring a rich users table, dynamic form builder, and a mini blog app with a beautiful, animated UI.

---

## 🚀 Tech Stack

- **Vite** (React + TypeScript)
- **shadcn/ui** (Radix UI + Tailwind CSS)
- **Zustand** (state management)
- **TanStack Query** (data fetching/caching)
- **React Router** (routing)
- **Zod** (schema validation)
- **Framer Motion** (animation)
- **Sonner** (toasts/notifications)
- **Tiptap** (rich text editor for blog)
- **React Markdown** (for legacy/markdown rendering)
- **Tailwind CSS** (utility-first styling)

---

## 🛠️ Setup Instructions

> **Requires [Node.js](https://nodejs.org/) version 20 or above.**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DayoMichael/ubulu.git
   cd ubulu-test
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173)

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📦 Features

- **Users Table:**

  - Sorting, search, pagination, row selection, bulk delete
  - URL state sync, debounced search, skeleton loaders
  - Animated stats cards, dark mode, responsive design

- **Dynamic Form Builder:**

  - Render forms from JSON config, Zod validation
  - Animated UI, live-editable JSON config, error toasts

- **Mini Blog App:**

  - Twitter/Reddit-style feed, CRUD, routing, Zustand state
  - Tiptap rich text editor, live preview, Markdown rendering
  - Animated backgrounds, floating particles, orbs

- Supports both dark mode and light mode for an enhanced user experience.

---

## ⚡ Assumptions Made

- The app is intended for demo and learning purposes, not production.
- All data (users, blog posts) is stored in-memory (Zustand); no backend or persistence.
- The blog editor uses Tiptap and stores HTML; legacy posts may use Markdown.
- The UI is designed to be modern, animated, and responsive across devices.
- The codebase follows presentational/container and DRY principles for maintainability.

---

## 🌐 Demo

> [Demo Link](https://ubulu-nine.vercel.app/)

---

## 📄 License

MIT
