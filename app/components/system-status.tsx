"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, RefreshCw, Server, ShieldCheck } from "lucide-react";

type ServiceState = {
  id: string;
  name: string;
  detail: string;
  status: "online" | "offline" | "unknown";
  latencyMs: number | null;
};
type StatusPayload = { checkedAt: string; services: ServiceState[] };

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function SystemStatus() {
  const [payload, setPayload] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const refresh = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const response = await fetch("/api/status", { cache: "no-store" });
      if (!response.ok) throw new Error("Status request failed");
      const data = (await response.json()) as StatusPayload;
      setPayload(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 60_000);
    return () => window.clearInterval(interval);
  }, [refresh]);

  const services = payload?.services ?? [];
  const online = services.filter((service) => service.status === "online").length;
  const offline = services.filter((service) => service.status === "offline").length;
  const overall = loading ? "CHECKING" : error ? "UNAVAILABLE" : offline > 0 ? "DEGRADED" : online === services.length && services.length > 0 ? "ALL SYSTEMS OPERATIONAL" : "PARTIAL DATA";

  return (
    <div className="system-status-card">
      <div className="system-status-top">
        <div className="system-status-overview">
          <span className="system-status-icon"><Activity size={17}/></span>
          <div><span className="system-status-kicker">SERVICE OVERVIEW</span><strong>{overall}</strong></div>
        </div>
        <button className="system-status-refresh" onClick={() => void refresh(true)} disabled={refreshing} aria-label="Refresh service status">
          <RefreshCw size={14} className={refreshing ? "is-spinning" : ""}/><span>{refreshing ? "CHECKING" : "REFRESH"}</span>
        </button>
      </div>
      <div className="system-status-grid">
        {services.map((service) => (
          <div className="system-service" key={service.id}>
            <div className="system-service-head">
              <span className={`system-indicator ${service.status}`} aria-label={service.status}/>
              <span className="system-service-state">{service.status.toUpperCase()}</span>
              <span className="system-service-latency">{service.latencyMs === null ? "—" : `${service.latencyMs} ms`}</span>
            </div>
            <h3>{service.name}</h3>
            <p>{service.detail}</p>
          </div>
        ))}
        {loading && services.length === 0 && [1, 2, 3, 4, 5].map((item) => <div className="system-service system-service-loading" key={item}><i/><i/><i/></div>)}
        {error && <div className="system-status-error">The status endpoint could not be reached. Try refreshing in a moment.</div>}
      </div>
      <div className="system-status-foot">
        <span><ShieldCheck size={13}/> READ-ONLY · PUBLIC-SAFE TELEMETRY</span>
        <span><Server size={13}/> LAST CHECK {payload ? formatTime(payload.checkedAt) : "—"} · AUTO-REFRESH 60S</span>
      </div>
    </div>
  );
}
