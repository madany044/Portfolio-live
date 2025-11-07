## Alex Morgan · Creative Technologist Portfolio

This repository hosts a 2025-ready personal portfolio engineered with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **Framer Motion**. The experience highlights immersive hero storytelling, filterable project showcases, and contact flows ready for production integrations.

### ✨ Feature Highlights
- Animated hero with neon gradients, cursor-reactive glow, and live stats.
- Floating navigation, glassmorphism panels, and dark/light theming powered by `next-themes`.
- Filterable project gallery with inline previews, quick-view modals, and high-performance image optimization.
- Skills matrix featuring animated proficiency bars and stacked tooling insights.
- Insights grid for thought leadership pieces with external linking.
- Contact hub with client-side validation, API-ready POST endpoint, and downloadable QR code asset for event cards.

### 📁 Project Structure
```
src/
  app/          # App Router entry points and API routes
  components/   # Reusable UI primitives and section-level components
  data/         # Structured content for navigation, skills, projects, insights
  lib/          # Utilities (class name helpers, etc.)
  types/        # Shared TypeScript interfaces
public/         # Static assets (favicons, OG image, QR-ready resume slot)
```

### 🚀 Getting Started
```bash
npm install
npm run dev
# visit http://localhost:3000
```

### 🛠️ Personalize the Experience
1. **Branding & Metadata**: Update `src/app/layout.tsx` with your real name, bio, and the `siteUrl`. Replace `public/og.svg` if you have a custom open graph card.
2. **Resume Download**: Drop your latest resume at `public/resume.pdf` (the CTA references this path).
3. **Content Data**: Edit the JSON-like arrays in `src/data/*.ts` to reflect your projects, skills, and insights. URLs can point to live demos, GitHub repos, or CMS endpoints.
4. **Contact Endpoint**: Wire `src/app/api/contact/route.ts` to your email provider, CRM, or queue. The handler currently logs payloads to the server console.
5. **QR Code**: Update the value passed to `QRCodeCanvas` in `src/components/sections/contact.tsx` with your production domain.
6. **Theme Tokens**: Tailwind 4 tokens live in `src/app/globals.css`. Adjust gradients, shadows, or glassmorphism styles there.

### 🧪 Quality & Performance
- Built mobile-first with fluid typography and optimized image loading.
- Animations rely on `framer-motion` for smooth parallax and transitions.
- Tailwind CSS 4 utilities keep the bundle lean; class composition handled with `clsx` + `tailwind-merge`.
- ESLint and TypeScript run via `npm run lint` and the Next.js compiler.

### 📦 Deployment
Deploy seamlessly to [Vercel](https://vercel.com/docs) for edge-rendered performance, or self-host with `npm run build` and `npm start`. Remember to configure environment variables if you connect third-party services (analytics, email, etc.).

### 📄 License
This project is delivered as a creative starting point for personal use. Feel free to customize and extend; please do not resell as-is without permission.
