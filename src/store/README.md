# Store

Global client state (Context, Zustand, Redux, etc.) can live here when the app needs shared state beyond scroll-driven DOM effects.

The journey experience currently uses imperative controllers in `src/features/journey/` and the `useExperience` hook instead of a global store.
