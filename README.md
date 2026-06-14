# The North Sea - An Interactive Journey

Scroll-driven interactive experience about the North Sea, built with **React**, **TypeScript**, **Vite**, and canvas / scroll / audio engines.

## Development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run typecheck` | TypeScript only |
| `npm run preview` | Preview production build |

## Deploy to GitHub Pages

The site is built for [https://ziyasensoy.github.io/Meesterproef/](https://ziyasensoy.github.io/Meesterproef/).

1. Push to `main` - the [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow builds and publishes automatically.
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
3. After the first successful run, the site is live at the URL above.

To preview the production build locally with the same base path:

```bash
VITE_BASE_PATH=/Meesterproef/ npm run build
npm run preview
```

## Project structure

```
src/
├── index.tsx              # React entry
├── app.tsx                # Root app (router provider)
├── router.tsx             # React Router routes
├── assets/                # GeoJSON, images, fonts
├── components/journey/      # Chrome UI (canvas, HUD, controls, info card)
├── config/                # App configuration
├── features/journey/      # Scroll, canvas, map, audio engines
├── hooks/                 # React hooks (e.g. useExperience)
├── layouts/               # Route layouts
├── pages/                 # Route pages (JourneyPage)
├── services/              # External integrations (map markers)
├── store/                 # Global state (placeholder)
├── styles/                # Global CSS
├── types/                 # Shared TypeScript types
└── utils/                 # Helpers
legacy/
└── index.html             # Markup source for HTML → JSX conversion
```

## Regenerating page markup

After editing `legacy/index.html`:

```bash
node scripts/convert-html.mjs
npm run build
```

Fix any JSX issues the build reports (e.g. CSS custom properties on `style`).
