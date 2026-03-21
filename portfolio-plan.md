# Portfolio Site — Implementation Plan (Monorepo)
**Tetiana Kuzenkova | Front-End Engineer**

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Monorepo | Turborepo + PNPM Workspaces |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (in `packages/ui`) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Tech logos | simple-icons (npm) |
| Fonts | Syne (display) + Geist (body) via `next/font` |
| Theme | Dark default + next-themes |
| Component docs | Storybook (in `apps/storybook`) |
| Deploy | Vercel |

---

## Monorepo Structure

```
tk-portfolio/                        ← root
├── turbo.json                       ← pipeline: build, dev, lint, typecheck
├── pnpm-workspace.yaml              ← workspaces: [apps/*, packages/*]
├── package.json                     ← root scripts, devDependencies
├── tsconfig.base.json               ← base TS config extended by all packages
├── .eslintrc.base.js                ← shared ESLint config
│
├── apps/
│   ├── web/                         ← Next.js 15 portfolio site (main app)
│   │   ├── app/
│   │   │   ├── layout.tsx           ← fonts, metadata, ThemeProvider
│   │   │   ├── page.tsx             ← assembles all sections
│   │   │   └── globals.css          ← CSS variables, base dark theme
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── sections/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── SkillsCarousel.tsx
│   │   │       ├── ExpertiseSection.tsx
│   │   │       ├── ExperienceSection.tsx
│   │   │       ├── TestimonialsSection.tsx
│   │   │       └── ContactSection.tsx
│   │   ├── hooks/
│   │   │   └── useActiveSection.ts  ← IntersectionObserver for nav
│   │   ├── public/
│   │   │   ├── avatar.jpg
│   │   │   └── og-image.png
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts       ← extends packages/config/tailwind
│   │   ├── tsconfig.json            ← extends ../../tsconfig.base.json
│   │   └── package.json             ← name: "@tk/web"
│   │
│   └── storybook/                   ← optional: component docs
│       ├── .storybook/
│       ├── stories/
│       └── package.json             ← name: "@tk/storybook"
│
└── packages/
    ├── ui/                          ← shared shadcn/ui components
    │   ├── src/
    │   │   ├── button.tsx
    │   │   ├── accordion.tsx
    │   │   ├── badge.tsx
    │   │   ├── sheet.tsx
    │   │   ├── toast.tsx
    │   │   └── index.ts             ← re-exports all
    │   ├── package.json             ← name: "@tk/ui"
    │   └── tsconfig.json
    │
    ├── data/                        ← all CV content as typed constants
    │   ├── src/
    │   │   ├── skills.ts
    │   │   ├── experience.ts
    │   │   ├── expertise.ts
    │   │   ├── testimonials.ts
    │   │   ├── contact.ts
    │   │   └── types.ts             ← shared TypeScript interfaces
    │   ├── package.json             ← name: "@tk/data"
    │   └── tsconfig.json
    │
    └── config/                      ← shared tooling configs
        ├── tailwind.config.base.ts
        ├── tsconfig.base.json
        ├── eslint.base.js
        └── package.json             ← name: "@tk/config"
```

---

## Key Config Files

### pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### turbo.json
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": { "outputs": [] },
    "typecheck": { "outputs": [] }
  }
}
```

### packages/data/src/types.ts
```ts
export interface Skill {
  name: string
  icon: string        // simple-icons slug
  color: string       // brand hex
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  project: string
  bullets: string[]
  stack: string[]
  team: string
}

export interface ExpertiseCard {
  title: string
  subtitle: string
  description: string
  icon: string        // lucide icon name
}

export interface Testimonial {
  text: string
  author: string
  role: string
  company: string
  avatar?: string
}
```

### packages/data/src/skills.ts
```ts
import type { Skill } from './types'

export const skills: Skill[] = [
  { name: 'React',        icon: 'react',       color: '#61DAFB' },
  { name: 'Next.js',      icon: 'nextdotjs',   color: '#000000' },
  { name: 'TypeScript',   icon: 'typescript',  color: '#3178C6' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4' },
  { name: 'Radix UI',     icon: 'radixui',     color: '#161618' },
  { name: 'Redux',        icon: 'redux',       color: '#764ABC' },
  { name: 'Storybook',    icon: 'storybook',   color: '#FF4785' },
  { name: 'Turborepo',    icon: 'turborepo',   color: '#EF4444' },
  { name: 'Figma',        icon: 'figma',       color: '#F24E1E' },
  { name: 'Vitest',       icon: 'vitest',      color: '#6E9F18' },
  { name: 'Zod',          icon: 'zod',         color: '#3E67B1' },
  { name: 'PNPM',         icon: 'pnpm',        color: '#F69220' },
]
```

### packages/data/src/experience.ts
```ts
import type { ExperienceItem } from './types'

export const experience: ExperienceItem[] = [
  {
    role: 'Lead Front-end Engineer (AI-Driven Development)',
    company: 'Gentle Code',
    period: 'March 2025 – present',
    project: 'AI-powered FSM Platform',
    bullets: [
      'Engineered a high-performance Monorepo with shared packages, ensuring 100% code reuse between Client and Admin applications.',
      'Architected a reusable, accessible UI library using Tailwind CSS v4 and React Aria, integrated with Storybook.',
      'Implemented RBAC with server-side validation and type-safe API layer using Zod schemas.',
      'Created 20+ Claude Code CLI commands for automated scaffolding of standardized feature modules.',
      'Integrated MCP (Model Context Protocol) for AI-assisted API integration.',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Zod', 'Tailwind v4', 'React Aria', 'Claude Code', 'MCP'],
    team: '3 BE, 2 FE, QA, Designer, BA',
  },
  {
    role: 'Senior Front-end Engineer',
    company: 'Gentle Code',
    period: 'January 2020 – March 2025',
    project: 'Merchant Services CRM',
    bullets: [
      'Architected complex, multi-step forms with schema-based validation and efficient state management.',
      'Integrated REST APIs and FusionAuth for secure merchant authentication and session management.',
      'Developed a reusable UI component library and responsive layouts.',
      'Customized Zendesk Help Center themes and created custom pages.',
      'Improved performance by implementing lazy loading and strategic code refactoring.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'React Query', 'React Hook Form', 'CSS Modules', 'SASS', 'Bootstrap 4', 'Jest'],
    team: '5 BE, 4–6 FE, 4 QA, 2 Designers, BA, PM',
  },
  {
    role: 'Front-end Engineer',
    company: 'Gentle Code',
    period: 'June 2016 – April 2020',
    project: 'Transportation Management Software (TMS)',
    bullets: [
      'Developed a dual-platform system: Client Booking Application and Administration Panel.',
      'Engineered a reusable component library, reducing development time for new features.',
      'Ensured Web Accessibility (A11y) compliance, including keyboard-only navigation.',
      'Delivered mobile-first responsive interfaces.',
    ],
    stack: ['React', 'Redux', 'Styled Components', 'LESS', 'Bootstrap 4', 'Storybook'],
    team: '4 BE, 2 FE, 3 QA, 2 Designers, BA, PM',
  },
  {
    role: 'Front-end Engineer & UX Designer',
    company: 'Gentle Code',
    period: 'January 2013 – June 2015',
    project: 'Internal web applications',
    bullets: [
      'Executed UI design and rapid prototyping for web applications.',
      'Developed and maintained the frontend layer within .NET.',
      'Optimized visual assets with SVG workflows, custom icon fonts, and image sprites.',
      'Delivered pixel-perfect, responsive, cross-browser compatible layouts.',
    ],
    stack: ['Adobe XD', 'Photoshop', 'SCSS', 'HTML5', 'Bootstrap', 'JavaScript'],
    team: 'FE, Designer',
  },
  {
    role: 'HTML/CSS Developer',
    company: 'Rainboweb Studio',
    period: 'June 2011 – January 2013',
    project: '50+ client web projects',
    bullets: [
      'Successfully delivered 50+ web projects with pixel-perfect execution.',
      'Implemented cross-browser layouts per W3C standards.',
      'Collaborated within a team to meet tight deadlines in a high-volume studio environment.',
    ],
    stack: ['Photoshop', 'CSS', 'HTML', 'jQuery', 'WordPress'],
    team: '2 BE, FE, Designer',
  },
]
```

---

## Sections Spec

### Header
- Sticky, `backdrop-blur`, subtle border-bottom on scroll
- Nav: `// 01 home` · `// 02 expertise` · `// 03 work` · `// 04 experience` · `// 05 contact`
- Active section via `useActiveSection` hook (IntersectionObserver on section IDs)
- Mobile: hamburger → `@tk/ui` Sheet drawer
- Logo: `TK._` monospace + accent color

### Hero Section
- Full-viewport height, dark background with animated mesh / dot-grid
- Display name: **TETIANA KUZENKOVA** — Syne font, very bold, large tracking
- Typing animation cycling: "Front-End Engineer" / "React Specialist" / "UI Architect"
- Short tagline from professional summary
- CTAs: `View Work` (scroll to projects) + `Download CV` (PDF link)
- Framer Motion staggered entrance: name → subtitle → body → CTAs

### Skills Carousel
- Two infinite marquee rows, opposite scroll directions, different speeds
- Pure CSS `@keyframes` — no JS library needed
- Hover: pause animation + scale logo
- Data from `@tk/data` → `skills`
- SVGs from `simple-icons` package

### My Expertise (3 cards)
1. **Frontend Architecture** — React, Next.js, Monorepos, scalable UI
2. **UI Systems & Accessibility** — Radix UI, React Aria, A11y, design systems
3. **AI-Driven Development** — Claude Code, MCP, automated scaffolding
- Code-tag decorators (`<h3>` / `</h3>`) like tamalsen.dev
- Hover: border glow or card lift

### Experience Accordion
- Left: vertical timeline line
- `@tk/ui` Accordion — one item per job
- Expanded state: key project name, bullet list, Stack badges, Team text
- Data from `@tk/data` → `experience`

### Testimonials
- 2-column grid (1 col mobile)
- Large `"` mark, quote text, avatar, name, role @ company
- Data: `@tk/data` → `testimonials` (populate from LinkedIn recommendations)

### Contact
- Availability badge: green dot + "Open to opportunities"
- Links: Email · LinkedIn · GitHub
- Optional: contact form via React Hook Form + Zod + Resend API route
  - `apps/web/app/api/contact/route.ts`

### Footer
- Name · year · social icon links

---

## Styling

### globals.css CSS variables
```css
:root {
  --accent: #00E5CC;
  --accent-2: #7B61FF;
  --bg: #0D0D0F;
  --bg-surface: #141416;
  --text-primary: #F0EEE9;
  --text-muted: #6B6A65;
  --border: rgba(255, 255, 255, 0.08);
}
```

### Framer Motion scroll reveal pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  {/* section content */}
</motion.div>
```

### Skills marquee CSS pattern
```css
@keyframes marquee-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
@keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }

.marquee-left  { animation: marquee-left  30s linear infinite; }
.marquee-right { animation: marquee-right 40s linear infinite; }
.marquee-track:hover .marquee-left,
.marquee-track:hover .marquee-right { animation-play-state: paused; }
```

---

## Implementation Phases

### Phase 1 — Monorepo scaffold (Day 1)
- [ ] Create root: `pnpm init`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`
- [ ] `packages/config` — shared tsconfig, eslint, tailwind base
- [ ] `packages/data` — all types + data files (skills, experience, expertise, testimonials, contact)
- [ ] `packages/ui` — shadcn components (Accordion, Sheet, Badge, Button, Toast, Dialog)
- [ ] `apps/web` — Next.js 15 app, wire `@tk/ui` and `@tk/data` imports
- [ ] Verify `turbo dev` starts successfully

### Phase 2 — Foundation (Day 1–2)
- [ ] `globals.css` with CSS variables and dark base styles
- [ ] `layout.tsx` — Syne + Geist fonts, ThemeProvider, metadata
- [ ] `Header` + `useActiveSection` hook
- [ ] `page.tsx` scaffold — all sections imported as empty shells with `id` anchors

### Phase 3 — Hero + Skills (Day 2–3)
- [ ] `HeroSection` — layout, typing animation, background effect, CTAs
- [ ] `SkillsCarousel` — CSS marquee animation, simple-icons logos

### Phase 4 — Expertise + Experience (Day 3–4)
- [ ] `ExpertiseSection` — 3 cards with code-tag aesthetic, hover effects
- [ ] `ExperienceSection` — accordion + timeline line + stack badge tags

### Phase 5 — Testimonials + Contact (Day 4–5)
- [ ] Add LinkedIn testimonials to `packages/data/src/testimonials.ts`
- [ ] `TestimonialsSection` — quote cards grid
- [ ] `ContactSection` — availability badge + links (+ optional form)
- [ ] `Footer`

### Phase 6 — Polish + Deploy (Day 5–6)
- [ ] Framer Motion entrance animations on all sections (staggered)
- [ ] Full responsive pass (mobile-first)
- [ ] SEO: `metadata` export in `layout.tsx`, OG image in `public/`
- [ ] Optional: `apps/storybook` setup
- [ ] Deploy to Vercel

---

## Commands Reference

```bash
# Root setup
mkdir tk-portfolio && cd tk-portfolio
pnpm init
echo "packages:\n  - 'apps/*'\n  - 'packages/*'" > pnpm-workspace.yaml
pnpm add -D turbo -w

# Create Next.js app
mkdir -p apps && cd apps
pnpm create next-app@latest web --typescript --tailwind --app --no-src-dir
cd ..

# Scaffold packages
mkdir -p packages/ui/src packages/data/src packages/config

# Add deps to apps/web
cd apps/web
pnpm add framer-motion simple-icons lucide-react next-themes
pnpm add react-hook-form @hookform/resolvers zod resend
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add accordion sheet toast badge button dialog
cd ../..

# Run everything
turbo dev

# Useful filter commands
turbo build --filter=@tk/web...      # web + all its dependencies
turbo lint --filter=@tk/web
turbo typecheck
```

## Vercel Deployment

Add `vercel.json` to root:
```json
{
  "buildCommand": "turbo run build --filter=@tk/web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "pnpm install"
}
```

Or in Vercel project settings → set Root Directory to `apps/web`.

---

## References

- Design inspiration: https://tamalsen.dev/
- Turborepo docs: https://turbo.build/repo/docs
- simple-icons slugs: https://simpleicons.org/
- shadcn/ui: https://ui.shadcn.com/
- Vercel + Turborepo: https://vercel.com/docs/monorepos/turborepo