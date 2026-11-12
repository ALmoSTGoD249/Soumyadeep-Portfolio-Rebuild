PHASE 5 — STATUS CHECK UPDATE (MINECRAFT)

This is a focused API-only update. It keeps the existing status dashboard UI
and replaces the API health checks.

REPLACE:
  app/api/status/route.ts

The API now monitors:
  - Nextcloud: HTTP http://192.168.0.102:8080/status.php
  - LifeOps: HTTP http://192.168.0.102:8088/
  - LifeTracker: HTTP http://192.168.0.102:8082/
  - Minecraft: TCP 192.168.0.102:25565

Grafana and Prometheus have been removed from the status checks. No containers
or monitoring services are stopped or deleted by this update; it only removes
them from the portfolio's status display.

Optional Docker Compose environment overrides:
  STATUS_HOST=http://192.168.0.102
  STATUS_TCP_HOST=192.168.0.102

After replacing the file, rebuild from the portfolio project directory:
  docker compose up -d --build

Verify:
  curl http://127.0.0.1:8090/api/status

Expected JSON services: nextcloud, lifeops, lifetracker, minecraft.
Minecraft is checked by TCP connection only. This confirms the port accepts
connections; it does not perform a Minecraft protocol/login handshake.
