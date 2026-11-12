import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const HOST = process.env.STATUS_HOST || "http://host.docker.internal";
const checks = [
  { id: "nextcloud", name: "Nextcloud", detail: "Private cloud & file services", path: ":8080/status.php" },
  { id: "lifeops", name: "LifeOps", detail: "Personal service management", path: ":8088/" },
  { id: "lifetracker", name: "LifeTracker", detail: "Personal & shared-life tracker", path: ":8082/" },
  { id: "grafana", name: "Grafana", detail: "Infrastructure observability", path: ":3000/api/health" },
  { id: "prometheus", name: "Prometheus", detail: "Metrics collection & querying", path: ":9091/-/healthy" },
] as const;

async function checkService(service: (typeof checks)[number]) {
  const url = `${HOST}${service.path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  const start = performance.now();
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
      headers: { accept: "application/json,text/plain,*/*" },
    });
    const latencyMs = Math.round(performance.now() - start);
    // Treat successful responses and redirects as reachable; do not expose response bodies.
    const reachable = (response.status >= 200 && response.status < 400) || response.status === 401 || response.status === 403;
    return { id: service.id, name: service.name, detail: service.detail, status: reachable ? "online" as const : "offline" as const, latencyMs: reachable ? latencyMs : null };
  } catch {
    return { id: service.id, name: service.name, detail: service.detail, status: "offline" as const, latencyMs: null };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const services = await Promise.all(checks.map(checkService));
  return NextResponse.json(
    { checkedAt: new Date().toISOString(), services },
    { headers: { "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" } },
  );
}
