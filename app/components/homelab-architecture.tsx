"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDown, ArrowLeftRight, ArrowUpRight, Cloud,
  Container, Database, HardDrive, Network, Server, ShieldCheck,
  Terminal, Wifi,
} from "lucide-react";

type FlowId = "remote" | "app" | "storage" | "minecraft";
type NodeId = "device" | "tailnet" | "serve" | "host" | "docker" | "app" | "database" | "storage" | "minecraft" | "backup" | "edge";

const nodes: Array<{
  id: NodeId;
  layer: string;
  title: string;
  subtitle: string;
  description: string;
  facts: string[];
  icon: typeof Server;
}> = [
  {
    id: "device", layer: "CLIENT", title: "Remote device", subtitle: "Trusted endpoint",
    description: "A laptop or phone connects from outside the home network. Private access is established through the tailnet rather than exposing every application port directly to the internet.",
    facts: ["Laptop / mobile client", "Authenticated tailnet member", "Private access path"],
    icon: Wifi,
  },
  {
    id: "tailnet", layer: "PRIVATE NETWORK", title: "Tailscale", subtitle: "Tailnet connectivity",
    description: "Tailscale provides private connectivity to the Ubuntu host for remote administration and selected services. Access is governed by tailnet identity and policy.",
    facts: ["Private tailnet", "Remote administration", "Identity and access policy"],
    icon: Network,
  },
  {
    id: "serve", layer: "PRIVATE INGRESS", title: "Tailscale Serve", subtitle: "Path-based routing",
    description: "Tailscale Serve maps selected URL paths on the server hostname to local application ports. This keeps the user-facing paths organised while the applications continue to listen on their own host ports.",
    facts: ["/ → portfolio :8090", "/lifeops → LifeOps :8088", "/lifetracker → LifeTracker :8082", "/nextcloud → Nextcloud :8080"],
    icon: ArrowLeftRight,
  },
  {
    id: "host", layer: "COMPUTE", title: "Ubuntu Server", subtitle: "Physical host",
    description: "The server is the shared compute foundation. Ubuntu Server 24.04 LTS hosts Docker and provides the CPU, memory, network interfaces and attached storage used by the workloads.",
    facts: ["Intel Core i3-9100F", "16 GB DDR4", "Ubuntu Server 24.04 LTS"],
    icon: Server,
  },
  {
    id: "docker", layer: "CONTAINER PLATFORM", title: "Docker Compose", subtitle: "Service lifecycle",
    description: "Docker Compose defines multi-container applications and their service relationships. Frontends, APIs and databases run as separate services with explicit ports, dependencies and persistent mounts.",
    facts: ["Compose-managed applications", "Service-to-service networking", "Restart and dependency configuration"],
    icon: Container,
  },
  {
    id: "app", layer: "APPLICATION WORKLOADS", title: "Application containers", subtitle: "Portfolio · LifeOps · LifeTracker",
    description: "The host runs several independent application stacks. The portfolio, LifeOps and LifeTracker each have their own frontend and backend responsibilities, with databases attached where required.",
    facts: ["Portfolio: host port 8090", "LifeOps: host port 8088", "LifeTracker: host port 8082"],
    icon: Cloud,
  },
  {
    id: "database", layer: "DATA SERVICES", title: "Databases", subtitle: "Application persistence",
    description: "Databases run as separate containers within their application stacks. LifeOps and LifeTracker use PostgreSQL; Nextcloud uses MariaDB. Application-to-database traffic stays within the relevant Docker network.",
    facts: ["LifeOps: PostgreSQL", "LifeTracker: PostgreSQL 16", "Nextcloud: MariaDB 10.6"],
    icon: Database,
  },
  {
    id: "storage", layer: "PERSISTENCE", title: "Host storage", subtitle: "Data beyond containers",
    description: "The machine separates its operating-system disk from additional storage used for application data. Persistent mounts and volumes keep important files and database state outside an individual container's writable layer.",
    facts: ["240 GB OS SSD", "500 GB WD Green", "1 TB WD Blue"],
    icon: HardDrive,
  },
  {
    id: "minecraft", layer: "GAME WORKLOAD", title: "Minecraft Paper", subtitle: "Dedicated game container",
    description: "The Paper-based Minecraft server runs as its own container and publishes TCP port 25565. Its world data is handled separately from the other application workloads.",
    facts: ["Paper server", "TCP port 25565", "Docker container: minecraft"],
    icon: Terminal,
  },
  {
    id: "backup", layer: "RECOVERY", title: "World backup", subtitle: "backup_mc.sh",
    description: "A dedicated backup script is used for Minecraft world data. This is an operational recovery step separate from the game server's normal request path.",
    facts: ["Script: backup_mc.sh", "Minecraft world data", "Separate from gameplay traffic"],
    icon: ShieldCheck,
  },
  {
    id: "edge", layer: "DOMAIN INGRESS", title: "Cloudflare", subtitle: "DNS / Tunnel configuration",
    description: "Cloudflare DNS and Tunnel configuration have been used for selected domain-based access. This is a distinct ingress path from private Tailscale Serve routing; the two should not be treated as the same network boundary.",
    facts: ["Cloudflare-managed DNS", "Tunnel configuration", "Separate from private tailnet routes"],
    icon: Activity,
  },
];

const flows: Record<FlowId, {
  label: string; title: string; description: string; path: NodeId[]; note: string;
}> = {
  remote: {
    label: "01 / PRIVATE REMOTE ACCESS",
    title: "Reach a service from a trusted device",
    description: "A remote device joins the tailnet, reaches the server through Tailscale and uses Tailscale Serve to route a selected path to the corresponding local application port.",
    path: ["device", "tailnet", "serve", "host", "docker", "app"],
    note: "This is the private access route. Tailscale Serve path mappings are distinct from the application's own internal routes.",
  },
  app: {
    label: "02 / APPLICATION REQUEST",
    title: "A request reaches an application",
    description: "A request is routed to the Ubuntu host and the relevant Docker-managed application. Where the application needs persistence, its backend communicates with the database service on the application network.",
    path: ["device", "edge", "host", "docker", "app", "database"],
    note: "The portfolio and household applications use separate application stacks. This is a conceptual request path, not a live packet trace.",
  },
  storage: {
    label: "03 / PERSISTENT DATA",
    title: "Keep application data beyond a container",
    description: "Application and database containers use persistent volumes or host-mounted directories so important data is not tied only to the lifecycle of a container instance.",
    path: ["host", "docker", "app", "database", "storage"],
    note: "The operating-system disk and additional data disks have separate roles in the host's storage layout.",
  },
  minecraft: {
    label: "04 / MINECRAFT WORKLOAD",
    title: "Serve a game session and protect world data",
    description: "A Minecraft client connects to the Paper server through TCP port 25565. The server runs as an isolated Docker workload, while the world backup script provides a separate recovery path.",
    path: ["host", "docker", "minecraft", "backup"],
    note: "The TCP port check confirms reachability; it does not by itself validate gameplay, player authentication or world integrity.",
  },
};

export default function HomeLabArchitectureExplorer() {
  const [flowId, setFlowId] = useState<FlowId>("remote");
  const [activeNode, setActiveNode] = useState<NodeId>("serve");
  const flow = flows[flowId];
  const selected = useMemo(() => nodes.find((node) => node.id === activeNode) ?? nodes[2], [activeNode]);
  const SelectedIcon = selected.icon;

  return (
    <div className="homelab-phase7">
      <div className="homelab-flow-tabs" role="tablist" aria-label="Home lab architecture flows">
        {(Object.keys(flows) as FlowId[]).map((id) => (
          <button key={id} type="button" role="tab" aria-selected={flowId === id}
            className={flowId === id ? "active" : ""}
            onClick={() => { setFlowId(id); setActiveNode(flows[id].path[0]); }}>
            {flows[id].label}
          </button>
        ))}
      </div>

      <div className="homelab-flow-heading" aria-live="polite">
        <span>{flow.label}</span>
        <h3>{flow.title}</h3>
        <p>{flow.description}</p>
      </div>

      <div className="homelab-flow-canvas">
        <div className="homelab-canvas-topline"><span><Network size={13}/> THE ALMIGHTY SERVER / ARCHITECTURE VIEW</span><span>SELECT A NODE TO INSPECT</span></div>
        <div className="homelab-flow-nodes">
          {flow.path.map((id, index) => {
            const node = nodes.find((item) => item.id === id)!;
            const NodeIcon = node.icon;
            const isActive = activeNode === id;
            return (
              <div className="homelab-flow-step" key={`${flowId}-${id}`}>
                <button type="button" className={`homelab-flow-node ${isActive ? "active" : ""}`}
                  onClick={() => setActiveNode(id)} aria-pressed={isActive}>
                  <span className="homelab-flow-node-icon"><NodeIcon size={18}/></span>
                  <span className="homelab-flow-node-text"><small>{node.layer}</small><strong>{node.title}</strong><em>{node.subtitle}</em></span>
                  <ArrowUpRight className="homelab-flow-node-arrow" size={14}/>
                </button>
                {index < flow.path.length - 1 && <div className="homelab-flow-link" aria-hidden="true"><span/><ArrowDown size={14}/></div>}
              </div>
            );
          })}
        </div>
        <div className="homelab-canvas-bottom"><span><i/> SELECTED COMPONENT</span><span>FLOW ORDER / TOP TO BOTTOM</span></div>
      </div>

      <div className="homelab-inspector" aria-live="polite">
        <div className="homelab-inspector-icon"><SelectedIcon size={23}/></div>
        <div className="homelab-inspector-copy">
          <span>{selected.layer} / COMPONENT DETAIL</span>
          <h4>{selected.title}</h4>
          <p>{selected.description}</p>
          <div className="homelab-inspector-facts">{selected.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
        </div>
      </div>

      <div className="homelab-flow-note"><ShieldCheck size={18}/><p>{flow.note}</p></div>
      <div className="homelab-boundaries">
        <div><span>OPERATING BOUNDARIES</span><small>WHAT THIS DIAGRAM DOES — AND DOES NOT — CLAIM</small></div>
        <ul>
          <li>Private Tailscale access and Cloudflare domain ingress are shown as separate paths.</li>
          <li>Application containers and their databases are separate services, not one monolithic container.</li>
          <li>Persistent storage is represented independently from container lifecycle.</li>
          <li>This is an architecture explainer, not a live topology monitor or uptime guarantee.</li>
        </ul>
      </div>
    </div>
  );
}
