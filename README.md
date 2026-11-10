# Soumyadeep Maity — Portfolio

A clean-room portfolio rebuild using Next.js, TypeScript, and Framer Motion.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build and run with Docker
```bash
docker compose up -d --build
```
The site will be available on port `8090`.

To use a different host port, change the left side of `8090:3000` in `docker-compose.yml`.

## Project structure
- `app/` — application routes and styling
- `public/images/` — portfolio and project imagery
- `public/Soumyadeep-Maity-CV.pdf` — CV download

## Notes
- This is an independent codebase. It does not modify the original GitHub repository or Vercel deployment.
- Project URLs and descriptions are centralized in `app/page.tsx`.
- Replace the placeholder RNN links and team details when the RacingNewsNetwork project launches.
