"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDown, ArrowLeftRight, ArrowUpRight, Boxes, Database,
  FileKey2, Globe2, LockKeyhole, Network, Server, ShieldCheck,
} from "lucide-react";

type FlowMode = "request" | "events" | "uploads";
type NodeId = "browser" | "nginx" | "api" | "database" | "uploads";

const nodes: Array<{
  id: NodeId;
  eyebrow: string;
  title: string;
  subtitle: string;
  detail: string;
  facts: string[];
  icon: typeof Globe2;
}> = [
  {
    id: "browser", eyebrow: "CLIENT", title: "React SPA", subtitle: "The user-facing application",
    detail: "The browser runs the React single-page application. React Router handles client-side navigation and TanStack Query manages server state and request/refetch behaviour.",
    facts: ["React 18 + TypeScript", "Vite-built frontend", "React Router", "TanStack Query"], icon: Globe2,
  },
  {
    id: "nginx", eyebrow: "EDGE / ONLY PUBLISHED PORT", title: "Nginx", subtitle: "Static delivery + reverse proxy",
    detail: "Nginx serves the built frontend and reverse-proxies /api traffic to FastAPI. It is the only service that publishes a host port; the API and database stay on the internal Docker network.",
    facts: ["Serves the compiled SPA", "Reverse-proxies /api", "Only published host port", "Nginx login throttling"], icon: Network,
  },
  {
    id: "api", eyebrow: "APPLICATION LAYER", title: "FastAPI", subtitle: "Modular monolith",
    detail: "The backend groups domain routers and services in one application: authentication, incidents, tasks, catalogue, requests, assets, maintenance, knowledge, notifications, search, dashboard, activity and administration.",
    facts: ["Python + FastAPI", "Domain routers and services", "SQLAlchemy", "Alembic migrations"], icon: Server,
  },
  {
    id: "database", eyebrow: "PERSISTENCE / PRIVATE NETWORK", title: "PostgreSQL", subtitle: "Relational system of record",
    detail: "PostgreSQL stores users, sessions, household membership, operational records and audit history. UUIDs are primary keys; human-readable record numbers are allocated through row-locked sequences.",
    facts: ["PostgreSQL 16", "Relational constraints + indexes", "JSONB for defined flexible fields", "Named volume persists database"], icon: Database,
  },
  {
    id: "uploads", eyebrow: "FILE PERSISTENCE", title: "Uploads volume", subtitle: "Files outside the database",
    detail: "Uploaded files are persisted on a dedicated Docker named volume mounted into the backend. The API handles authenticated access; the storage volume survives container recreation.",
    facts: ["Dedicated named volume", "Mounted at /data/uploads", "Authenticated file endpoint", "Stored independently of DB rows"], icon: FileKey2,
  },
];

const flowCopy: Record<FlowMode, { label: string; title: string; description: string; path: NodeId[]; note: string }> = {
  request: {
    label: "01 / REQUEST–RESPONSE", title: "A normal application request",
    description: "A browser action reaches Nginx, is proxied to a domain router in FastAPI, and reads or writes relational data in PostgreSQL. The response returns through the same path.",
    path: ["browser", "nginx", "api", "database"],
    note: "Request/response traffic uses the same Nginx entry point. The database is not published directly to the host.",
  },
  events: {
    label: "02 / SERVER-SENT EVENTS", title: "Live activity and notifications",
    description: "The notification bell and live activity feed use a one-way Server-Sent Events stream. Nginx proxies the stream; FastAPI publishes updates to the connected browser.",
    path: ["database", "api", "nginx", "browser"],
    note: "SSE is deliberately limited to notifications and live activity. Other screens use normal requests and TanStack Query refetching.",
  },
  uploads: {
    label: "03 / FILE UPLOAD", title: "An attachment flow",
    description: "A file is submitted through the browser and Nginx to the backend. The backend writes the file to its mounted uploads volume; application records keep the workflow connected to the stored file.",
    path: ["browser", "nginx", "api", "uploads"],
    note: "The uploads volume is separate from PostgreSQL and is persisted by Docker Compose. File access is handled by authenticated application endpoints.",
  },
};

const tradeoffs = [
  {
    title: "Why a modular monolith instead of microservices?",
    summary: "Keep domain boundaries in code without multiplying deployment and network failure points.",
    detail: "LifeOps has several domains, but it is a focused household application. A single FastAPI deployment keeps transactions, migrations, local development and operations straightforward. Routers and services preserve domain organisation without requiring service discovery, inter-service authentication or distributed transactions.",
  },
  {
    title: "Why server-side sessions instead of JWTs?",
    summary: "Make logout, password changes and user switching immediately revocable.",
    detail: "Opaque session tokens are stored as hashes in session rows and delivered in an HttpOnly, SameSite=Lax cookie. The server can revoke a session on logout or password change. Mutating requests also carry a per-session CSRF token in the X-CSRF-Token header.",
  },
  {
    title: "Why keep Postgres and FastAPI off the published ports?",
    summary: "Expose one controlled web entry point and keep internal services on the Compose network.",
    detail: "The Nginx web service is the only service publishing a host port. It serves the SPA and proxies API traffic. PostgreSQL and FastAPI are reachable by their Compose service names on the internal network, not directly from the host network.",
  },
  {
    title: "Why write audit history in the same transaction?",
    summary: "Avoid a successful record update with a missing or out-of-sync activity entry.",
    detail: "LifeOps appends field-level before/after activity entries in the same database transaction as the record change. If the transaction fails, the business change and its audit event roll back together. Human-readable record numbers use row-locked sequences to avoid allocation races.",
  },
];

export default function LifeOpsArchitecture() {
  const [mode, setMode] = useState<FlowMode>("request");
  const [activeNode, setActiveNode] = useState<NodeId>("api");
  const flow = flowCopy[mode];
  const active = useMemo(() => nodes.find((node) => node.id === activeNode) ?? nodes[2], [activeNode]);
  const Icon = active.icon;

  return (
    <div className="lifeops-architecture-explorer">
      <div className="lifeops-flow-toolbar" role="tablist" aria-label="Architecture data flow">
        {(["request", "events", "uploads"] as FlowMode[]).map((item) => (
          <button key={item} type="button" role="tab" aria-selected={mode === item} className={mode === item ? "is-active" : ""} onClick={() => setMode(item)}>
            {flowCopy[item].label}
          </button>
        ))}
      </div>

      <div className="lifeops-flow-intro" aria-live="polite">
        <span>{flow.label}</span>
        <h3>{flow.title}</h3>
        <p>{flow.description}</p>
      </div>

      <div className={`lifeops-architecture-map mode-${mode}`}>
        <div className="lifeops-boundary-label public-boundary"><Globe2 size={13}/> BROWSER / PUBLISHED EDGE</div>
        <div className="lifeops-boundary-label private-boundary"><LockKeyhole size={13}/> PRIVATE DOCKER NETWORK</div>
        <div className="lifeops-node-row">
          {flow.path.map((id, index) => {
            const node = nodes.find((entry) => entry.id === id)!;
            const NodeIcon = node.icon;
            const isActive = activeNode === id;
            return (
              <div className="lifeops-flow-step" key={`${mode}-${id}`}>
                <button type="button" className={`lifeops-arch-node ${isActive ? "selected" : ""} ${flow.path.includes(id) ? "on-path" : ""}`} onClick={() => setActiveNode(id)} aria-pressed={isActive}>
                  <span className="lifeops-arch-node-icon"><NodeIcon size={20}/></span>
                  <span className="lifeops-arch-node-copy"><small>{node.eyebrow}</small><strong>{node.title}</strong><em>{node.subtitle}</em></span>
                  <ArrowUpRight className="lifeops-node-open" size={14}/>
                </button>
                {index < flow.path.length - 1 && <div className="lifeops-flow-connector" aria-hidden="true"><span/><ArrowLeftRight size={13}/></div>}
              </div>
            );
          })}
        </div>
        <div className="lifeops-arch-footnote"><span><span className="lifeops-legend-dot active-dot"/> Selected component</span><span><span className="lifeops-legend-dot flow-dot"/> Current flow path</span><span>SELECT A COMPONENT TO INSPECT</span></div>
      </div>

      <div className="lifeops-node-inspector" aria-live="polite">
        <div className="lifeops-inspector-icon"><Icon size={22}/></div>
        <div className="lifeops-inspector-main">
          <span>{active.eyebrow} / COMPONENT DETAIL</span>
          <h4>{active.title}</h4>
          <p>{active.detail}</p>
          <div className="lifeops-inspector-facts">{active.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
        </div>
      </div>

      <div className="lifeops-flow-note"><Activity size={17}/><p>{flow.note}</p></div>

      <div className="lifeops-security-boundary">
        <div><ShieldCheck size={21}/><span>SECURITY BOUNDARIES</span></div>
        <ul>
          <li>Only Nginx publishes a host port; FastAPI and PostgreSQL remain internal.</li>
          <li>Passwords use Argon2id; session tokens are stored as hashes.</li>
          <li>HttpOnly cookies and per-session CSRF tokens protect browser sessions.</li>
          <li>Knowledge-base secrets are encrypted at rest and revealed through an audited action.</li>
        </ul>
      </div>

      <div className="lifeops-tradeoffs">
        <div className="lifeops-tradeoffs-heading"><span>ENGINEERING TRADE-OFFS</span><p>Open a decision to see the reasoning behind the implementation.</p></div>
        {tradeoffs.map((item, index) => (
          <details className="lifeops-tradeoff" key={item.title} open={index === 0}>
            <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><em>{item.summary}</em><ArrowUpRight size={15}/></summary>
            <p>{item.detail}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
