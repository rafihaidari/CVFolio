# CVFolio

A modern, animated CV/portfolio template built with React, TypeScript, Vite, and Tailwind CSS. CVFolio ships with a two‑column CV layout, animated background, expandable experience section, skills marquee, and spam‑safe contact links.

## Features

- Vite + React + TypeScript + Tailwind CSS
- CV‑style two‑column layout (sidebar + main)
- Animated backdrop (gradient wash, blobs, subtle stars)
- Expandable “Read more” experience list with smooth animation
- Skills marquee and polished micro‑interactions
- Email/phone obfuscation to reduce scraping
- Easy content editing via a single data file

## Quick start

Prerequisites: Node.js 18+

```bash
npm install
npm run dev
# build
npm run build
npm run preview
```

## Customize your content

Most content lives in one file:
- `src/data/profile.ts` — name, headline, about, skills, experiences, links, contact, languages, certifications, education.

Assets:
- `src/assets/images/` — put your photo/logo here and update imports if you rename.

## Project structure (key files)

```
src/
  App.tsx
  main.tsx
  index.css
  data/profile.ts           # Your CV data (edit me)
  components/
    BackgroundFX.tsx
    CVSidebar.tsx
    Hero.tsx
    Footer.tsx
    contact/Obfuscated.tsx  # Email/phone obfuscators
    sections/
      Experience.tsx        # Read more / Show less with animation
      Education.tsx
      Contact.tsx
```

## Tailwind config

Custom animations and effects are defined in `tailwind.config.js` (e.g., blob, gradient, twinkle, marquee). Tweak colors, durations, and shadows there.

## Spam‑safe contact

- Email and phone are split into parts in `profile.ts`.
- `ObfuscatedEmail` and `ObfuscatedPhone` assemble `mailto:`/`tel:` on click to deter basic scrapers.

## Deployment

- Vercel: import the repo, framework=Vite, build=`npm run build`, output=dist
- Netlify: build=`npm run build`, publish=`dist`
- GitHub Pages: `npm run build` then serve `dist/` (or use an action)

## License

MIT. Feel free to copy, modify, and use commercially. Consider keeping a credit link.

## Acknowledgements

Inspired by delightful landing pages (e.g., GitHub’s homepage) and the Tailwind community’s animation patterns.
