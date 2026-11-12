import { NextResponse } from "next/server";
import { createConnection } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// The portfolio container can reach the host's LAN address. This also avoids
// Nextcloud rejecting the Docker-only host.docker.internal hostname.
const HTTP_HOST = process.env.STATUS_HOST || "http://192.168.0.102";
const TCP_HOST = process.env.STATUS_TCP_HOST || "192.168.0.102";

const httpChecks = [
  { id: "nextcloud", name: "Nextcloud", detail: "Private cloud & file services", path: ":8080/status.php" },
  { id: "lifeops", name: "LifeOps", detail: "Personal service management", path: ":8088/" },
  { id: "lifetracker", name: "LifeTracker", detail: "Personal & shared-life tracker", path: ":8082/" },
] as const;

const tcpChecks = [
  { id: "minecraft", name: "Minecraft", detail: "Paper server · TCP port 25565", port: 25565 },
] as const;

async function checkHttpService(service: (typeof httpChecks)[number]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  const start = performance.now();

  try {
    const response = await fetch(`${HTTP_HOST}${service.path}`, {
      method: "GET",
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
      headers: { accept: "application/json,text/plain,*/*" },
    });
    const latencyMs = Math.round(performance.now() - start);
    const reachable = (response.status >= 200 && response.status < 400) || response.status === 401 || response.status === 403;
    return {
      id: service.id,
      name: service.name,
      detail: service.detail,
      status: reachable ? "online" as const : "offline" as const,
      latencyMs: reachable ? latencyMs : null,
    };
  } catch {
    return { id: service.id, name: service.name, detail: service.detail, status: "offline" as const, latencyMs: null };
  } finally {
    clearTimeout(timeout);
  }
}

function checkTcpService(service: (typeof tcpChecks)[number]) {
  const start = performance.now();

  return new Promise<{
    id: string;
    name: string;
    detail: string;
    status: "online" | "offline";
    latencyMs: number | null;
  }>((resolve) => {
    const socket = createConnection({ host: TCP_HOST, port: service.port });
    let settled = false;

    const finish = (online: boolean) => {
      if (settled) return;
      settled = true;
      const latencyMs = Math.round(performance.now() - start);
      socket.destroy();
      resolve({
        id: service.id,
        name: service.name,
        detail: service.detail,
        status: online ? "online" : "offline",
        latencyMs: online ? latencyMs : null,
      });
    };

    socket.setTimeout(3000, () => finish(false));
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
  });
}

export async function GET() {
  const services = await Promise.all([
    ...httpChecks.map(checkHttpService),
    ...tcpChecks.map(checkTcpService),
  ]);

  return NextResponse.json(
    { checkedAt: new Date().toISOString(), services },
    { headers: { "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" } },
  );
}
