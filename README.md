# The North Sea — An Interactive Journey

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
