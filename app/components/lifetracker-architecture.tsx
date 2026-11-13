"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowLeftRight, ArrowUpRight, Archive, Database,
  Globe2, Layers3, Network, Server, ShieldCheck, Wallet, Users,
} from "lucide-react";

type FlowMode = "expense" | "shared" | "budget" | "backup";
type NodeId = "browser" | "nginx" | "api" | "database" | "backup";

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
    id: "browser",
    eyebrow: "CLIENT",
    title: "Browser UI",
    subtitle: "Vanilla JavaScript application",
    detail: "The user-facing application is built with HTML, CSS and vanilla JavaScript. It presents personal and shared workspaces, expense and bill workflows, tasks, notes and the Today budget view.",
    facts: ["HTML + CSS", "Vanilla JavaScript", "Personal and shared workspace views"],
    icon: Globe2,
  },
  {
    id: "nginx",
    eyebrow: "WEB / PUBLISHED ENTRY",
    title: "Nginx",
    subtitle: "Frontend delivery + API proxy",
    detail: "Nginx serves the frontend and acts as the web entry point for the application. API requests are forwarded to the FastAPI backend on the Docker network.",
    facts: ["Serves the frontend", "Reverse-proxies API requests", "Host port mapped to the web service"],
    icon: Network,
  },
  {
    id: "api",
    eyebrow: "APPLICATION LAYER",
    title: "FastAPI",
    subtitle: "Business rules and API",
    detail: "FastAPI handles application requests and the rules that connect users, workspaces, expenses, split bills, participants, payments, recurring bills and budget data. The shared-workspace boundary for bill splitting is enforced by the backend.",
    facts: ["Python + FastAPI", "Workspace-aware application rules", "Health endpoint: /api/health"],
    icon: Server,
  },
  {
    id: "database",
    eyebrow: "PERSISTENCE",
    title: "PostgreSQL 16",
    subtitle: "Relational application data",
    detail: "PostgreSQL stores the application's persistent records. Docker Compose provides the database service and a persistent volume so application data survives container recreation.",
    facts: ["PostgreSQL 16", "Persistent Docker volume", "Application records and budget data"],
    icon: Database,
  },
  {
    id: "backup",
    eyebrow: "RECOVERY / OPERATIONS",
    title: "Backup service",
    subtitle: "Database backup workflow",
    detail: "A separate Docker Compose backup service handles database backups and writes them to a mounted backups directory. This separates backup execution from the web and API request path.",
    facts: ["Separate backup container", "Database backup output", "Mounted backups directory"],
    icon: Archive,
  },
];

const flows: Record<FlowMode, {
  label: string; title: string; description: string; path: NodeId[]; note: string;
}> = {
  expense: {
    label: "01 / PERSONAL EXPENSE",
    title: "Record an everyday expense",
    description: "A user enters an expense in the browser. The request passes through Nginx to FastAPI, where the application processes it and persists the record in PostgreSQL.",
    path: ["browser", "nginx", "api", "database"],
    note: "This is the standard application request path: browser → Nginx → FastAPI → PostgreSQL.",
  },
  shared: {
    label: "02 / SHARED BILL SPLIT",
    title: "Coordinate a shared cost",
    description: "A shared bill is submitted with its split participants and payment details. The backend enforces that the bill-splitting workflow belongs to a shared workspace before processing the request and storing its records.",
    path: ["browser", "nginx", "api", "database"],
    note: "The shared-workspace rule is enforced in the backend, rather than relying only on frontend visibility.",
  },
  budget: {
    label: "03 / BUDGET DASHBOARD",
    title: "Compare plan with actual spending",
    description: "The Today dashboard brings ideal spending allocations together with actual activity. The browser requests the relevant data through Nginx and FastAPI, which reads the stored records from PostgreSQL.",
    path: ["browser", "nginx", "api", "database"],
    note: "The dashboard presents allocation targets, actual activity and utilisation in one view.",
  },
  backup: {
    label: "04 / DATABASE BACKUP",
    title: "Protect persistent application data",
    description: "The separate backup service runs alongside the frontend, backend and database in Docker Compose. It writes database backups to a mounted backups directory.",
    path: ["backup", "database"],
    note: "The backup service is an operational path, separate from normal browser request handling.",
  },
};

export default function LifeTrackerArchitecture() {
  const [mode, setMode] = useState<FlowMode>("expense");
  const [activeNode, setActiveNode] = useState<NodeId>("api");
  const flow = flows[mode];
  const active = useMemo(
    () => nodes.find((node) => node.id === activeNode) ?? nodes[2],
    [activeNode],
  );
  const Icon = active.icon;

  return (
    <div className="lifetracker-architecture-explorer">
      <div className="lifetracker-flow-toolbar" role="tablist" aria-label="LifeTracker architecture flows">
        {(["expense", "shared", "budget", "backup"] as FlowMode[]).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={mode === item}
            className={mode === item ? "is-active" : ""}
            onClick={() => {
              setMode(item);
              setActiveNode(item === "backup" ? "backup" : "api");
            }}
          >
            {flows[item].label}
          </button>
        ))}
      </div>

      <div className="lifetracker-flow-intro" aria-live="polite">
        <span>{flow.label}</span>
        <h3>{flow.title}</h3>
        <p>{flow.description}</p>
      </div>

      <div className={`lifetracker-architecture-map mode-${mode}`}>
        <div className="lifetracker-boundary-label"><Globe2 size={13} /> WEB APPLICATION / DOCKER COMPOSE</div>
        <div className="lifetracker-node-row">
          {flow.path.map((id, index) => {
            const node = nodes.find((entry) => entry.id === id)!;
            const NodeIcon = node.icon;
            const selected = activeNode === id;
            return (
              <div className="lifetracker-flow-step" key={`${mode}-${id}`}>
                <button
                  type="button"
                  className={`lifetracker-arch-node ${selected ? "selected" : ""}`}
                  onClick={() => setActiveNode(id)}
                  aria-pressed={selected}
                >
                  <span className="lifetracker-arch-node-icon"><NodeIcon size={19} /></span>
                  <span className="lifetracker-arch-node-copy">
                    <small>{node.eyebrow}</small>
                    <strong>{node.title}</strong>
                    <em>{node.subtitle}</em>
                  </span>
                  <ArrowUpRight className="lifetracker-node-open" size={14} />
                </button>
                {index < flow.path.length - 1 && (
                  <div className="lifetracker-flow-connector" aria-hidden="true">
                    <span /><ArrowLeftRight size={13} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="lifetracker-arch-footnote">
          <span><i className="selected-dot" /> Selected component</span>
          <span><i className="flow-dot" /> Current flow</span>
          <span>SELECT A COMPONENT TO INSPECT</span>
        </div>
      </div>

      <div className="lifetracker-node-inspector" aria-live="polite">
        <div className="lifetracker-inspector-icon"><Icon size={22} /></div>
        <div className="lifetracker-inspector-main">
          <span>{active.eyebrow} / COMPONENT DETAIL</span>
          <h4>{active.title}</h4>
          <p>{active.detail}</p>
          <div className="lifetracker-inspector-facts">
            {active.facts.map((fact) => <span key={fact}>{fact}</span>)}
          </div>
        </div>
      </div>

      <div className="lifetracker-flow-note"><Activity size={17} /><p>{flow.note}</p></div>

      <div className="lifetracker-boundary-panel">
        <div><ShieldCheck size={20} /><span>DATA BOUNDARIES & OPERATIONS</span></div>
        <ul>
          <li>Personal and shared workspaces are distinct application contexts.</li>
          <li>The backend enforces the shared-workspace boundary for bill splitting.</li>
          <li>PostgreSQL data is persisted using a Docker volume.</li>
          <li>A separate backup service writes database backups to a mounted directory.</li>
        </ul>
      </div>

      <div className="lifetracker-design-decisions">
        <div className="lifetracker-decisions-heading">
          <span>IMPLEMENTATION DECISIONS</span>
          <p>Explore the choices that shape the deployed application.</p>
        </div>
        <details className="lifetracker-decision" open>
          <summary><span>01</span><strong>Why a lightweight browser frontend?</strong><em>Keep the client straightforward to serve and operate.</em><ArrowUpRight size={15} /></summary>
          <p>The deployed frontend is static HTML, CSS and JavaScript served by Nginx. This keeps frontend delivery within the existing web container while the API owns application processing.</p>
        </details>
        <details className="lifetracker-decision">
          <summary><span>02</span><strong>Why enforce shared bill rules in the backend?</strong><em>Do not rely on the UI as the security boundary.</em><ArrowUpRight size={15} /></summary>
          <p>The shared-workspace bill-splitting rule is enforced by the backend. This keeps the rule at the application boundary that processes the request, rather than depending solely on which controls the browser displays.</p>
        </details>
        <details className="lifetracker-decision">
          <summary><span>03</span><strong>Why a separate backup service?</strong><em>Keep recovery operations distinct from request handling.</em><ArrowUpRight size={15} /></summary>
          <p>Docker Compose runs a separate backup service that writes database backups to a mounted directory. The application database also uses persistent Docker storage.</p>
        </details>
      </div>
    </div>
  );
}
