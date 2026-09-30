# Vynox Media

**→ [docs.html](docs.html) — what every file does and what to edit.**

## Getting started

```bash
pnpm install
cp .env.example .env    # add your Resend API key
pnpm run dev             # http://localhost:3000
```

## Commands

| Command | Does |
|---|---|
| `pnpm run dev` | Local dev server |
| `pnpm run build` | Production build — must pass before deploying |
| `pnpm run start` | Serve the production build |
| `pnpm run typecheck` | TypeScript check — must pass before deploying |
| `pnpm run lint` | ESLint |
| `pnpm run test:visual` | Playwright visual regression at 1440px |
| `pnpm run test:visual:update` | Regenerate screenshot baselines |

`tests/visual/` is git-ignored — the PNG baselines only match one renderer, so a fresh clone has no suite. Recreate it and run `test:visual:update` locally.

## Environment

Copy `.env.example` to `.env`:

| Variable | For |
|---|---|
| `RESEND_API_KEY` | Sending contact-form email |
| `CONTACT_FROM_EMAIL` | Sender shown on those emails |
| `CONTACT_TO_EMAIL` | Where submissions land |
| `NEXT_PUBLIC_SITE_URL` | Live domain, used for canonical URLs and the sitemap (defaults to `https://vynoxmedia.com`) |

## Search Console sitemap

Submit `https://vynoxmedia.com/sitemap.xml` in Search Console's Sitemaps report. The sitemap is also advertised in `robots.txt` for crawler discovery.

## Structure

```
src/
  app/         One folder per URL. Each page.tsx assembles sections
               and declares its own SEO metadata.
  content/     Route copy, shared site chrome, forms, legal text, and illustration copy.
  config/      site.ts (domain and SEO URL), assets.ts (image paths), fonts.ts
  features/    Self-contained features: contact form, careers,
               case-study detail
  components/  ui/ primitives · cards/ · layout/ · sections/ page bands
  lib/         cn, fluid, motion, glow-presets
public/        Images, videos, fonts — referenced via config/assets.ts
docs/          Design spec, reference screenshots, project guide, TODO
```

Every route is pre-rendered at build time. `/services/[slug]` and `/case-studies/[id]` generate their pages from `src/content/`, so adding a service or case study needs a content entry, not a new page file.

### Editing website content

Routine copy is kept in `src/content/`; page and component files render that data and control layout and behavior.

| Content | File |
|---|---|
| Shared navigation, footer, brand labels, route metadata, and not-found copy | `src/content/site.ts` |
| Home page | `src/content/home.ts` |
| About page and team | `src/content/about.ts` |
| Services and service sections | `src/content/services.ts` |
| Service illustration/mock dashboard text | `src/content/service-illustrations.ts` |
| Case-study cards and details | `src/content/case-studies.ts` |
| Creator carousel | `src/content/creators.ts` |
| Testimonials | `src/content/testimonials.ts` |
| Contact page, form labels/options, validation messages, and email wording | `src/content/contact.ts` |
| Careers page | `src/content/careers.ts` |
| Privacy policy and terms | `src/content/legal.tsx` |

Image alt text and social sharing metadata are content values where applicable. Image file paths remain in `src/config/assets.ts` because they wire content keys to files in `public/`. Contact submission recipients and sender settings remain environment configuration.

## Stack

Next.js 16 · React 19 · TypeScript 6 (strict) · Tailwind v4 · Motion · GSAP · OGL · Resend · Zod · Playwright

## Conventions

- Theme tokens only — no raw hex in JSX. Add to `@theme` in `src/app/globals.css` first.
- Fonts by role via CSS variables: `font-space`, `font-vastago`, `font-mary`, `font-caveat`, `font-inter`.
- Server Components by default. `"use client"` only on interactive leaves.
- Routine user-facing copy lives in `src/content/`; keep layout, interaction, and required markup in components.
