"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, Server, Network,
  Activity, Cloud, Database, ShieldCheck, Monitor, Terminal
} from "lucide-react";
import HomeLabArchitectureExplorer from "../../components/homelab-architecture";

const stack = [
  "Ubuntu Server 24.04 LTS", "Docker", "Docker Compose", "Nextcloud",
  "MariaDB", "PaperMC", "Prometheus", "Grafana", "Node Exporter",
  "cAdvisor", "Tailscale", "Cloudflare"
];

export default function HomeLabCaseStudy() {
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

      <section className="homelab-explorer-section homelab-phase7-section">
        <div className="case-section-index">03 / INTERACTIVE ARCHITECTURE</div>
        <div className="homelab-explorer-content">
          <span className="case-eyebrow">FOLLOW THE REQUEST · INSPECT EACH LAYER</span>
          <h2>How the system<br/><em>actually connects.</em></h2>
          <p className="homelab-explorer-intro">Choose a workflow to trace the path across the host, private network, container platform, applications and persistent data. Select any component to inspect its role.</p>
          <HomeLabArchitectureExplorer />
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
