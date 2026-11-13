# Portfolio orbit repair

This patch is based on the uploaded `Soumyadeep-Portfolio-Rebuild` repository.

## Files
- `app/page.tsx` — adjusts orbit radii to fit more reliably on narrow screens.
- `app/globals.css` — adds the missing orbit wrapper animation and counter-rotation styles.

## Install
Copy these files into the matching locations in your repository, replacing the existing files. Then rebuild:

```bash
docker compose up -d --build
```

The orbit pauses while the constellation is hovered or keyboard-focused. With reduced motion enabled, nodes remain arranged around the center without animating.
