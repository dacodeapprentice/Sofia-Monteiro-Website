# Sofia — Everyday Websites & Digital Archive

A modern dark digital archive, everyday websites, in-depth about dossier, and contact for Sofia.

## Features
- Multi-page responsive architecture (Home, About, Everyday Websites, UX/UI, YouTube Channels, Instagram Visual Feed, Social Media, Contact)
- Deep dark canvas theme (`#080d12`) with luminous teal, emerald, and cyan accents
- Responsive layout across mobile, tablet, and desktop viewports
- Integrated contact form via Formspree with spam protection and mailto fallback
- Accessible navigation with keyboard focus management and WCAG AA contrast compliance
- SEO-ready metadata, Open Graph sharing cards, and semantic HTML5

## Development & Build
- `npm run dev`: Starts the local Vite development server on port 3000
- `npm run build`: Compiles production static assets into `dist/`
- `npm run preview`: Previews the production build

## How to Manage Site Images (No Coding Required)

All photos and thumbnails across the website are controlled from a single file: **`public/images.json`**. You never need to touch any HTML page code.

### To Change a Picture:
1. Open **`public/images.json`**.
2. Find the page (for example `"websites"`, `"home"`, `"about"`, `"youtube"`, or `"instagram"`).
3. Find the image name you want to update (for example `"card-1"`, `"hero"`, `"portrait"`).
4. Replace the `"url"` with your new image link (e.g. `https://iili.io/your-new-picture.jpg`).
5. Update the `"alt"` text descriptions for English (`"en"`) and Portuguese (`"pt"`).
6. Save the file. The website updates automatically!

### Key Details:
- **Zero Broken Icons**: If an image link ever fails to load, a sleek dark placeholder tile appears instead, and a warning is logged in the console.
- **Bilingual Alt Descriptions**: Image descriptions switch automatically between English and Portuguese when visitors click the `EN | PT` language switch.
- **Fast Performance**: The first image loads eagerly for instant display, and subsequent images are automatically set to `loading="lazy"`.
- **Preventing Page Shift**: Optional `"width"` and `"height"` numbers in the JSON keep the layout stable while images download.
