@AGENTS.md

---

# Portfolio Website — Developer Notes

## Overview

Personal portfolio for **Udip Mandora** — Full-Stack Web Developer & Project Manager based in Toronto, ON.
Built with **Next.js 16** (App Router), **React 19**, **TailwindCSS v4**, **TypeScript**, and **Framer Motion**.

---

## Project Structure

```
app/
  layout.tsx           # Root layout, metadata, global fonts (Geist)
  page.tsx             # Single-page app — assembles all sections in order
  globals.css          # Global styles, Tailwind base
  favicon.ico
  api/
    contact/
      route.ts         # POST handler — sends contact form emails via Resend

components/
  Navbar.tsx           # Fixed top nav, scroll-aware background, mobile hamburger menu
  HeroSection.tsx      # Full-screen hero with name, role tags, CTA buttons, social links
  AboutSection.tsx     # Bio, stats grid (5+ yrs exp, 10+ projects, etc.), highlights cards
  SkillsSection.tsx    # Animated skill bars (dev + PM), tech tag clouds
  ProjectsSection.tsx  # Filterable project cards grid
  ExperienceSection.tsx# Work timeline + education timeline (side by side)
  ContactSection.tsx   # Contact info + email form (wired to API)
  Footer.tsx           # Copyright line only

public/
  Udip-Mandora.pdf     # Resume — linked from "Download CV" button in hero
```

---

## Email / Contact Form

- **Provider:** [Resend](https://resend.com) (`resend` npm package)
- **From address:** `contact@udipmandora.com` (custom domain, verified in Resend)
- **Delivers to:** `udipmandora42@gmail.com`
- **Reply-To:** set to the sender's email so replies go directly to them
- **Subject format:** `[Portfolio] <user's subject>`
- **API key:** stored in `.env.local` as `RESEND_API_KEY` — never commit this file
- **Domain verification:** `udipmandora.com` was verified in Resend via GoDaddy DNS (3 records: DKIM TXT, SPF TXT, MX all under the `send` subdomain)

### How to rotate the API key
1. Go to resend.com/api-keys → create new key → delete old one
2. Update `RESEND_API_KEY` in `.env.local`
3. On Vercel/hosting: update the environment variable there too

---

## Projects Section

All projects are defined as a static array at the top of `components/ProjectsSection.tsx`.

| Project | GitHub | Live | Category |
|---------|--------|------|----------|
| MARK Voice Assistant | not public | none | dev |
| LEGO Smart City System | github.com/Udip-Mandora/lego_front | none | both (Dev + PM) |
| Mental Health Passion Project | github.com/Udip-Mandora/PassionProject1 | none | dev |
| NASA & SpaceX API Project | github.com/Udip-Mandora/API_Project_Call | none | dev |

- Set `github: null` or `live: null` to hide those buttons — the UI handles it gracefully
- The **"Project Management"** filter currently returns an empty grid (no PM-only projects yet) — an empty state message is shown
- Category values: `"dev"` | `"pm"` | `"both"`

---

## Social / External Links

All links open in `target="_blank"` with `rel="noopener noreferrer"`.

| Platform | URL | Used in |
|----------|-----|---------|
| GitHub | github.com/Udip-Mandora | Hero, Contact |
| LinkedIn | linkedin.com/in/udip-mandora/ | Hero, Contact |
| Email (mailto) | udipmandora42@gmail.com | Contact section |

---

## Known Decisions & Gotchas

- **Single page app** — everything is on `/`. No routing needed. Navbar links are anchor `#id` scroll links.
- **No database** — purely static + one serverless API route for email.
- **Tailwind v4** — uses `@tailwindcss/postcss` plugin, not the v3 config file. Do not add a `tailwind.config.js` — it's not needed and will conflict.
- **No test suite** — no Jest/Playwright set up. Run `npm run lint` and `npx tsc --noEmit` to validate before deploying.
- **`"use client"` on all components** — because of Framer Motion animations. The only server-side code is `app/api/contact/route.ts`.
- **Background color** is `#0a0a0f` (near-black) defined in `app/layout.tsx` body class.

---

## What Has Been Done

- [x] Full portfolio built: Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer
- [x] Contact form wired to Resend — emails delivered to Gmail on every submission
- [x] Custom domain `udipmandora.com` verified in Resend for sending
- [x] Resume PDF (`Udip-Mandora.pdf`) placed in `public/` and linked from hero
- [x] Real GitHub/LinkedIn URLs filled in across Hero and Contact sections
- [x] Project GitHub links filled in (3 of 4 — MARK is not on GitHub)
- [x] All project/social links open in new tab
- [x] Empty state for PM filter in Projects section
- [x] API route hardened against malformed request bodies
- [x] All unused imports cleaned up (zero ESLint warnings)
- [x] Production build passes clean (`npm run build`)

---

## What Still Could Be Done

- Add a **live demo URL** for any projects that get deployed
- Add the **MARK Voice Assistant** to GitHub when ready and update `components/ProjectsSection.tsx`
- Add **PM-category projects** to fill the PM filter (e.g. capstone project documentation, PM case studies)
- Set up **Vercel deployment** and add `RESEND_API_KEY` as an environment variable there
- Add **OG image / social preview** metadata in `app/layout.tsx` for link sharing

---

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check (no output files)
```
