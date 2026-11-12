"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, Server, Container, HardDrive, Network,
  Activity, Cloud, Database, ShieldCheck, Monitor, Terminal
} from "lucide-react";

const nodes = [
  {
    id: "host", label: "Ubuntu Server", group: "HOST / COMPUTE",
    title: "The host layer",
    description: "An Ubuntu Server 24.04 LTS machine provides the compute, storage and operating-system foundation for the lab. The host is managed directly and runs the application stack as containerised workloads.",
    facts: ["Intel Core i3-9100F", "16 GB DDR4 memory", "Ubuntu Server 24.04 LTS"]
  },
  {
    id: "docker", label: "Docker Compose", group: "CONTAINER PLATFORM",
    title: "Services with clear boundaries",
    description: "Docker Compose is used to define and operate multi-container applications. Each workload has its own service configuration, ports, volumes and dependencies instead of being installed directly onto the host.",
    facts: ["Compose-managed services", "Persistent volume mounts", "Container-level service isolation"]
  },
  {
    id: "storage", label: "Storage", group: "PERSISTENCE",
    title: "Separate data from workloads",
    description: "The host combines an SSD for the operating system with additional disks for application data and files. Persistent mounts keep important data outside the lifecycle of an individual container.",
    facts: ["240 GB OS SSD", "500 GB WD Green", "1 TB WD Blue"]
  },
  {
    id: "nextcloud", label: "Nextcloud", group: "SELF-HOSTED PRODUCTIVITY",
    title: "Personal cloud and file access",
    description: "Nextcloud runs as a containerised service with a MariaDB database. Its data directory is backed by host storage, making the file service independent of the container's writable layer.",
    facts: ["Nextcloud application container", "MariaDB 10.6", "Host-mounted data directory"]
  },
  {
    id: "game", label: "Minecraft", group: "GAME SERVICE",
    title: "A dedicated game workload",
    description: "A Paper-based Minecraft server runs in Docker and exposes its game port through the host. A scheduled backup script is used for the world data, keeping game operations separate from the other services.",
    facts: ["Paper server", "TCP port 25565", "Backup script: backup_mc.sh"]
  },
  {
    id: "observability", label: "Monitoring", group: "OBSERVABILITY",
    title: "Understand the host and containers",
    description: "Prometheus collects metrics from exporters, while Grafana provides dashboards for inspection. Node Exporter and cAdvisor expose host and container-level telemetry.",
    facts: ["Prometheus", "Grafana", "Node Exporter + cAdvisor"]
  },
  {
    id: "network", label: "Tailscale", group: "PRIVATE CONNECTIVITY",
    title: "Reach services without exposing every port",
    description: "Tailscale provides private tailnet connectivity for remote administration and service access. Tailscale Serve routes selected paths on the server hostname to the appropriate local application ports.",
    facts: ["Private tailnet access", "Tailscale Serve", "Path-based service routing"]
  },
  {
    id: "edge", label: "Edge & DNS", group: "INGRESS",
    title: "Controlled entry points",
    description: "The lab uses a combination of private Tailscale access and Cloudflare-managed DNS/tunnel configuration for selected domain-based access. These are separate ingress paths with different exposure boundaries.",
    facts: ["Cloudflare DNS", "Cloudflare Tunnel configuration", "Tailscale Serve for private routes"]
  }
];

const stack = [
  "Ubuntu Server 24.04 LTS", "Docker", "Docker Compose", "Nextcloud",
  "MariaDB", "PaperMC", "Prometheus", "Grafana", "Node Exporter",
  "cAdvisor", "Tailscale", "Cloudflare"
];

export default function HomeLabCaseStudy() {
  const [active, setActive] = useState("host");
  const selected = nodes.find((node) => node.id === active) ?? nodes[0];

  return (
    <main className="case-study homelab-study">
      <div className="case-topline">
        <Link href="/" className="case-back"><ArrowLeft size={15} /> BACK TO PORTFOLIO</Link>
        <span>INFRASTRUCTURE / FIELD NOTES</span>
      </div>

      <header className="case-hero">
        <div className="case-kicker"><span /> SELF-HOSTED INFRASTRUCTURE · HOMELAB</div>
        <div className="case-title-row">
          <div>
            <h1 className="homelab-title">Home<span>Lab</span><i>.</i></h1>
            <p className="case-subtitle">A small server. A lot to learn.</p>
          </div>
          <div className="case-hero-note">
            <span>PERSONAL INFRASTRUCTURE</span>
            <p>A self-managed Ubuntu server running containerised applications, private networking, persistent storage and an observability stack.</p>
          </div>
        </div>
        <div className="homelab-hero-panel">
          <div className="homelab-hero-grid" aria-hidden="true">
            <span>THE ALMIGHTY SERVER / 01</span><span>UBUNTU · DOCKER · NETWORK</span>
            <div className="homelab-server-visual">
              <div className="server-rack"><i/><i/><i/><i/></div>
              <div className="server-orbit orbit-a"/><div className="server-orbit orbit-b"/>
              <div className="server-core"><Server size={38}/><small>SELF-HOSTED<br/>COMPUTE</small></div>
              <div className="server-status"><b/> SERVICES RUNNING <span>LOCAL CONTROL</span></div>
            </div>
            <span>COMPUTE / STORAGE / SERVICES</span><span>KOLKATA, INDIA</span>
          </div>
        </div>
      </header>

      <section className="case-overview">
        <div className="case-section-index">01 / OVERVIEW</div>
        <div className="case-overview-copy">
          <h2>Learn by running it.<br/><em>Understand every layer.</em></h2>
          <p>This home lab is a self-managed environment for learning Linux administration, container operations, networking, storage and service monitoring. It hosts practical workloads rather than isolated demos: personal file services, a game server and monitoring tools all share the same physical machine.</p>
          <p>The goal is not to imitate a large data centre. It is to understand the operational details that make services dependable: where data lives, how components communicate, how remote access is controlled and how failures are diagnosed.</p>
        </div>
      </section>

      <section className="case-problem homelab-dark">
        <div className="case-section-index">02 / THE PLATFORM</div>
        <div>
          <span className="case-eyebrow">ONE HOST · MULTIPLE WORKLOADS</span>
          <h2>Physical hardware.<br/><em>Composable services.</em></h2>
          <div className="case-problem-grid">
            <p>The server uses an Intel Core i3-9100F, 16 GB of DDR4 memory and a mix of SSD and HDD storage. Ubuntu Server provides the host operating system, while Docker Compose defines the application workloads.</p>
            <p>Keeping services containerised makes the environment easier to reproduce and maintain. Persistent data is mounted from host storage, while networking and ingress are handled as separate concerns instead of being mixed into each application.</p>
          </div>
          <div className="homelab-hardware">
            <div><span>CPU</span><strong>Intel Core i3-9100F</strong></div>
            <div><span>MEMORY</span><strong>16 GB DDR4</strong></div>
            <div><span>OS</span><strong>Ubuntu Server 24.04 LTS</strong></div>
            <div><span>STORAGE</span><strong>240 GB SSD · 500 GB · 1 TB</strong></div>
          </div>
        </div>
      </section>

      <section className="homelab-explorer-section">
        <div className="case-section-index">03 / INTERACTIVE ARCHITECTURE</div>
        <div className="homelab-explorer-content">
          <span className="case-eyebrow">SELECT A LAYER TO EXPLORE</span>
          <h2>How the pieces<br/><em>fit together.</em></h2>
          <p className="homelab-explorer-intro">Explore the host, container platform, workloads, storage, monitoring and network entry points. Each node describes its role in the current setup.</p>
          <div className="homelab-architecture">
            <div className="homelab-map" aria-label="Interactive home lab architecture">
              <div className="homelab-map-lines" aria-hidden="true"/>
              <div className="map-layer map-host">
                <span className="map-layer-label">HOST</span>
                <button className={`map-node ${active === "host" ? "active" : ""}`} onClick={() => setActive("host")}><Server size={17}/> Ubuntu Server</button>
              </div>
              <div className="map-layer map-platform">
                <span className="map-layer-label">PLATFORM</span>
                <button className={`map-node ${active === "docker" ? "active" : ""}`} onClick={() => setActive("docker")}><Container size={17}/> Docker Compose</button>
                <button className={`map-node ${active === "storage" ? "active" : ""}`} onClick={() => setActive("storage")}><HardDrive size={17}/> Storage</button>
              </div>
              <div className="map-layer map-workloads">
                <span className="map-layer-label">WORKLOADS</span>
                <button className={`map-node ${active === "nextcloud" ? "active" : ""}`} onClick={() => setActive("nextcloud")}><Cloud size={17}/> Nextcloud</button>
                <button className={`map-node ${active === "game" ? "active" : ""}`} onClick={() => setActive("game")}><Monitor size={17}/> Minecraft</button>
                <button className={`map-node ${active === "observability" ? "active" : ""}`} onClick={() => setActive("observability")}><Activity size={17}/> Monitoring</button>
              </div>
              <div className="map-layer map-access">
                <span className="map-layer-label">ACCESS</span>
                <button className={`map-node ${active === "network" ? "active" : ""}`} onClick={() => setActive("network")}><Network size={17}/> Tailscale</button>
                <button className={`map-node ${active === "edge" ? "active" : ""}`} onClick={() => setActive("edge")}><ShieldCheck size={17}/> Edge / DNS</button>
              </div>
              <div className="map-direction">REQUEST FLOW <ArrowUpRight size={13}/></div>
            </div>
            <aside className="homelab-node-detail" aria-live="polite">
              <span className="case-eyebrow">{selected.group}</span>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <ul>{selected.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
              <span className="node-select-hint">SELECT ANOTHER NODE ↗</span>
            </aside>
          </div>
        </div>
      </section>

      <section className="case-capabilities">
        <div className="case-section-index">04 / SERVICES</div>
        <div className="case-capability-content">
          <div className="case-section-heading">
            <span className="case-eyebrow">PRACTICAL WORKLOADS</span>
            <h2>Useful services.<br/><em>Real operational context.</em></h2>
          </div>
          <div className="case-capability-grid">
            <article className="case-capability"><div className="case-capability-top"><span>01</span><Cloud size={21}/></div><h3>Personal cloud</h3><p>Nextcloud with MariaDB, persistent host-mounted file storage and access from trusted devices.</p></article>
            <article className="case-capability"><div className="case-capability-top"><span>02</span><Monitor size={21}/></div><h3>Minecraft server</h3><p>A Paper-based server in its own container, with a dedicated game port and a separate world-backup script.</p></article>
            <article className="case-capability"><div className="case-capability-top"><span>03</span><Activity size={21}/></div><h3>Observability</h3><p>Prometheus, Grafana, Node Exporter and cAdvisor provide a foundation for host and container monitoring.</p></article>
            <article className="case-capability"><div className="case-capability-top"><span>04</span><Network size={21}/></div><h3>Private connectivity</h3><p>Tailscale provides private remote access, while Serve maps selected URL paths to local services.</p></article>
          </div>
        </div>
      </section>

      <section className="case-design">
        <div className="case-section-index">05 / OPERATING PRINCIPLES</div>
        <div className="case-design-copy">
          <span className="case-eyebrow">WHAT THE LAB TEACHES</span>
          <h2>Operate the whole system.<br/><em>Not just the application.</em></h2>
          <p>Running several services on one host makes the dependencies visible. A container can be healthy while its application is unavailable; a service can respond locally while remote routing is wrong; a database can be running while its persistent data needs attention. Troubleshooting means checking each boundary deliberately.</p>
          <div className="case-principles">
            <div><span>01</span><strong>Isolation</strong><small>Keep application workloads and dependencies explicit.</small></div>
            <div><span>02</span><strong>Persistence</strong><small>Keep important state on host-mounted storage.</small></div>
            <div><span>03</span><strong>Observability</strong><small>Use metrics and logs to narrow down faults.</small></div>
          </div>
        </div>
      </section>

      <section className="case-architecture">
        <div className="case-section-index">06 / TOOLKIT</div>
        <div className="case-architecture-content">
          <span className="case-eyebrow">THE TECHNOLOGIES</span>
          <h2>Linux at the base.<br/><em>Services at the edge.</em></h2>
          <p>The lab brings together open-source server software, container tooling, monitoring components and private networking. It is a practical environment for learning how infrastructure layers interact.</p>
          <div className="case-stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="case-architecture-note"><Database size={19}/><p><strong>Designed for hands-on learning.</strong><br/>The environment is self-hosted and maintained directly. It is a personal lab, not a production high-availability cluster.</p></div>
        </div>
      </section>

      <section className="case-reflection">
        <div className="case-section-index">07 / WHAT IT REPRESENTS</div>
        <div>
          <Terminal size={25} strokeWidth={1.4}/>
          <h2>Build it. Break it.<br/><em>Learn how to run it.</em></h2>
          <p>The home lab connects software development with day-to-day infrastructure work: Linux administration, container orchestration, storage, networking, observability and recovery. It gives each new application a place to run—and turns operational problems into practical engineering lessons.</p>
        </div>
      </section>

      <footer className="case-footer">
        <div><span className="case-eyebrow">KEEP EXPLORING</span><h2>From the server<br/><em>to the service.</em></h2></div>
        <div className="case-footer-actions">
          <Link href="/#work" className="case-footer-link"><ArrowLeft size={16}/> ALL PROJECTS</Link>
          <a href="https://github.com/ALmoSTGoD249" target="_blank" rel="noreferrer" className="case-footer-link">GITHUB PROFILE <ArrowUpRight size={16}/></a>
          <Link href="/projects/lifeops" className="case-footer-link">LIFEOPS CASE STUDY <ArrowUpRight size={16}/></Link>
          <Link href="/projects/lifetracker" className="case-footer-link">LIFETRACKER CASE STUDY <ArrowUpRight size={16}/></Link>
          <Link href="/#contact" className="case-footer-link">GET IN TOUCH <ArrowUpRight size={16}/></Link>
        </div>
        <div className="case-footer-bottom"><Link href="/">SOUMYADEEP MAITY®</Link><span>KOLKATA, INDIA · 2026</span></div>
      </footer>
    </main>
  );
}
