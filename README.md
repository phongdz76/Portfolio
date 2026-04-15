# Portfolio (Next.js + Tailwind CSS)

This repository has been migrated from a static HTML/CSS/JS portfolio to **Next.js App Router** with **Tailwind CSS**.

## What Was Migrated

- Created a new Next.js project structure (App Router)
- Converted the page layout into React sections:
  - Home
  - About
  - Services
  - Project
  - Skill
  - Contact
- Moved static assets to `public/images`
- Replaced most legacy styling with Tailwind utility classes
- Added modern dark mode + language toggle state in React
- Integrated and initialized libraries in client-side `useEffect`:
  - `gsap`
  - `typed.js`
  - `scrollreveal`
  - `aos`
  - `swiper`
  - `mixitup`
- Contact form now sends through a server route (`app/api/contact/route.js`) to avoid exposing email config in client code

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- PostCSS + Autoprefixer

## Project Structure

```
Portfolio/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/
│   └── images/
├── package.json
├── tailwind.config.js
├── postcss.config.mjs
├── next.config.mjs
├── Dockerfile
└── README.md
```

## Install and Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Production Build

```bash
npm run build
npm run start
```

Default start port is configured as `8888`.

## EmailJS Environment Variables

Create a `.env.local` file:

```env
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
CONTACT_TO_EMAIL=you@example.com
# optional but recommended for extra protection:
# EMAILJS_PRIVATE_KEY=your_private_key
```

Legacy compatibility: `NEXT_PUBLIC_EMAILJS_*` variables are still accepted by the server route, but `EMAILJS_*` is recommended.

## Notes

- Legacy static files (`index.html`, `css/`, `js/`) are kept in the repo for reference during migration.
- If needed, you can continue splitting `app/page.js` into smaller section components under `components/`.
