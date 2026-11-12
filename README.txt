PHASE 5 — LIVE INFRASTRUCTURE STATUS

Files in this update:
- app/page.tsx
- app/globals.css
- app/components/system-status.tsx
- app/api/status/route.ts
- docker-compose.yml

Install:
1. Back up the existing files.
2. Copy the app/ files into the matching paths in your portfolio project.
3. Merge the extra_hosts block from docker-compose.yml into the existing portfolio service if your compose file has other custom settings. Do not discard your existing environment variables or volumes.
4. Rebuild from the portfolio project directory:
   docker compose up -d --build

The status API checks these host services from inside the portfolio container:
- Nextcloud: http://host.docker.internal:8080/status.php
- LifeOps: http://host.docker.internal:8088/
- LifeTracker: http://host.docker.internal:8082/
- Grafana: http://host.docker.internal:3000/api/health
- Prometheus: http://host.docker.internal:9091/-/healthy

The compose update adds host.docker.internal:host-gateway so the container can reach services published on the Ubuntu host. Only service name, online/offline state and response time are returned to visitors. Response bodies, internal URLs, IP addresses and error details are never returned.

Minecraft is not included in this first version because it uses a TCP game protocol rather than an HTTP health endpoint.

If your service ports differ, update the fixed paths in app/api/status/route.ts before building.
