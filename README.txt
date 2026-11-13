Technology Orbit Motion Fix

Replace these files in the portfolio repository:
  app/page.tsx
  app/globals.css

Then rebuild:
  docker compose up -d --build

What this fixes:
- The orbit wrapper and counter-rotating label now have one consistent animation system.
- The counter-angle CSS variable is supplied for every node.
- Hover pauses only the node under the pointer; selecting/focusing a node no longer freezes the entire constellation.
- The global reduced-motion rule no longer collapses the orbit to a near-zero duration. Reduced-motion users get a much slower 120-second orbit.
- Keeps the 12 technologies and three explicit tracks.
