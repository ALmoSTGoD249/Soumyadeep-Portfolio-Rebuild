import Image from "next/image";
import Link from "next/link";
import LifeOpsArchitecture from "../../components/lifeops-architecture";
import {
  ArrowLeft, ArrowUpRight, Boxes, CheckSquare, ClipboardList, FileText,
  Layers3, ShieldCheck, Workflow,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Incident management",
    description: "Capture household issues with impact and urgency, derive priority from an editable matrix, move incidents through a defined lifecycle, and retain comments, work notes, attachments and a field-level activity timeline.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Tasks & shared work",
    description: "Manage work in table, Kanban or calendar views. Tasks support ownership, scopes, checklists, dependencies, recurring schedules and links back to incidents.",
    icon: CheckSquare,
  },
  {
    number: "03",
    title: "Service catalogue & requests",
    description: "Define catalogue items with configurable form fields, approval rules and fulfillment steps. A submission creates request records and tracks each requested item through service tasks.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Assets & preventive maintenance",
    description: "Track household assets, ownership, condition and warranty status. Maintenance schedules generate tasks automatically and retain completion or skipped-cycle history.",
    icon: Boxes,
  },
  {
    number: "05",
    title: "Knowledge base",
    description: "Publish searchable Markdown articles with categories, tags and access controls. Sensitive details are encrypted at rest and revealed only through an explicit audited action.",
    icon: FileText,
  },
  {
    number: "06",
    title: "Shared activity & notifications",
    description: "Record changes in an append-only activity log and surface notifications and live activity updates without introducing a separate real-time infrastructure service.",
    icon: Workflow,
  },
];

export default function LifeOpsCaseStudy() {
  return (
    <main className="case-study">
      <div className="case-topline">
        <Link href="/" className="case-back"><ArrowLeft size={15} /> BACK TO PORTFOLIO</Link>
        <span>SELECTED PROJECT / 01</span>
      </div>

      <header className="case-hero">
        <div className="case-kicker"><span /> HOUSEHOLD SERVICE MANAGEMENT · PERSONAL PROJECT</div>
        <div className="case-title-row">
          <div>
            <h1>Life<span>Ops</span><i>.</i></h1>
            <p className="case-subtitle">Our Dreams. Our life. Under control.</p>
          </div>
          <div className="case-hero-note">
            <span>SELF-HOSTED APPLICATION</span>
            <p>A shared household operations platform that adapts service-management workflows for everyday life.</p>
          </div>
        </div>
        <div className="case-hero-image">
          <Image src="/images/lifeopshome.png" alt="Current LifeOps desktop home dashboard" fill priority sizes="(max-width: 800px) 100vw, 78vw" />
          <span className="case-image-label">LIFEOPS / APPLICATION PREVIEW</span>
        </div>
      </header>

      <section className="lifeops-responsive-showcase" aria-labelledby="lifeops-responsive-title">
        <div className="lifeops-responsive-copy">
          <span className="case-eyebrow">RESPONSIVE BY DESIGN</span>
          <h2 id="lifeops-responsive-title">Everything in reach,<br /><em>wherever you are.</em></h2>
          <p>The same LifeOps home page, adapted for smaller screens. Household activity and everyday actions stay accessible on the move.</p>
          <span className="lifeops-showcase-index">02 / HOME PAGE · MOBILE</span>
        </div>
        <figure className="lifeops-mobile-figure">
          <div className="lifeops-mobile-frame">
            <Image
              src="/images/lifeopsmobilehome.png"
              alt="Current LifeOps mobile home dashboard"
              width={438}
              height={822}
              sizes="(max-width: 800px)  min(78vw, 340px), 300px"
            />
          </div>
          <figcaption><strong>LifeOps on mobile</strong><span>The current home page, adapted for a smaller screen.</span></figcaption>
        </figure>
      </section>

      <section className="case-overview">
        <div className="case-section-index">01 / OVERVIEW</div>
        <div className="case-overview-copy">
          <h2>Service-management patterns.<br /><em>Reworked for home.</em></h2>
          <p>LifeOps is a self-hosted household service-management application. It brings incidents, tasks, service requests, assets, preventive maintenance and knowledge into one shared workspace, so household work has an owner, a state and a history.</p>
          <p>The product borrows operational patterns from enterprise IT service management, then adapts them for a small household: structured workflows where they help, without requiring enterprise-scale infrastructure.</p>
        </div>
      </section>

      <section className="case-problem">
        <div className="case-section-index">02 / THE PROBLEM</div>
        <div>
          <span className="case-eyebrow">FROM INFORMAL COORDINATION TO VISIBLE WORK</span>
          <h2>Requests, repairs and routines<br /><em>need more than reminders.</em></h2>
          <div className="case-problem-grid">
            <p>Household work spans one-off problems, recurring maintenance, shared responsibilities and requests that involve several steps. When those are handled only through conversations or scattered notes, ownership and progress become difficult to follow.</p>
            <p>LifeOps gives those different kinds of work explicit records and workflows: incidents can be resolved, tasks can depend on one another, requests can require approval, and maintenance can generate its next task when it enters its lead window.</p>
          </div>
        </div>
      </section>

      <section className="case-capabilities">
        <div className="case-section-index">03 / PRODUCT CAPABILITIES</div>
        <div className="case-capability-content">
          <div className="case-section-heading">
            <span className="case-eyebrow">A CONNECTED HOUSEHOLD WORKSPACE</span>
            <h2>Six connected<br /><em>operational areas.</em></h2>
          </div>
          <div className="case-capability-grid">
            {capabilities.map(({ number, title, description, icon: Icon }) => (
              <article className="case-capability" key={number}>
                <div className="case-capability-top"><span>{number}</span><Icon size={21} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-design">
        <div className="case-section-index">04 / WORKFLOW DESIGN</div>
        <div className="case-design-copy">
          <span className="case-eyebrow">CLEAR STATES. EXPLICIT HANDOFFS.</span>
          <h2>Model the work,<br /><em>not just the screens.</em></h2>
          <p>LifeOps uses domain-specific records and state transitions rather than treating every activity as a generic task. Incidents have a controlled lifecycle; requests can wait for approval and generate fulfillment tasks; recurring tasks create their next occurrence; maintenance completion writes history and advances the schedule.</p>
          <div className="case-principles">
            <div><span>01</span><strong>Traceability</strong><small>Keep record numbers, ownership and change history.</small></div>
            <div><span>02</span><strong>Workflow integrity</strong><small>Enforce transitions, dependencies and approvals.</small></div>
            <div><span>03</span><strong>Automation</strong><small>Generate repeat work without duplicate open tasks.</small></div>
          </div>
        </div>
      </section>

      <section className="case-architecture case-architecture-interactive">
        <div className="case-section-index">05 / SYSTEM DESIGN</div>
        <div className="case-architecture-content">
          <span className="case-eyebrow">TRACE A REQUEST THROUGH THE STACK</span>
          <h2>Explore the<br /><em>architecture.</em></h2>
          <p>Choose a flow to follow the path through the deployed system, then select any component to inspect its responsibility, boundaries and implementation details.</p>
          <div className="case-stack">{["React 18", "TypeScript", "Vite", "React Router", "TanStack Query", "FastAPI", "Python", "SQLAlchemy", "PostgreSQL 16", "Alembic", "Nginx", "Docker Compose"].map((item) => <span key={item}>{item}</span>)}</div>
          <LifeOpsArchitecture />
          <div className="case-architecture-note"><Boxes size={19} /><p><strong>Deployment shape.</strong><br />Docker Compose runs the web, backend and database services. Named volumes persist PostgreSQL data and uploaded files across container restarts.</p></div>
        </div>
      </section>

      <section className="case-reflection">
        <div className="case-section-index">07 / WHAT IT REPRESENTS</div>
        <div>
          <ShieldCheck size={25} strokeWidth={1.4} />
          <h2>A household platform built<br /><em>with operational discipline.</em></h2>
          <p>LifeOps demonstrates how service-management concepts can be translated into a focused personal product. The work spans frontend application design, API and data modelling, authentication, workflow rules, background scheduling, auditability and self-hosted deployment.</p>
        </div>
      </section>

      <footer className="case-footer">
        <div><span className="case-eyebrow">NEXT / KEEP EXPLORING</span><h2>More things<br /><em>in the making.</em></h2></div>
        <div className="case-footer-actions">
          <Link href="/#work" className="case-footer-link"><ArrowLeft size={16} /> ALL PROJECTS</Link>
          <a href="https://github.com/ALmoSTGoD249/LifeOps" target="_blank" rel="noreferrer" className="case-footer-link">VIEW SOURCE <ArrowUpRight size={16} /></a>
          <Link href="/#contact" className="case-footer-link">GET IN TOUCH <ArrowUpRight size={16} /></Link>
        </div>
        <div className="case-footer-bottom"><Link href="/">SOUMYADEEP MAITY®</Link><span>KOLKATA, INDIA · 2026</span></div>
      </footer>
    </main>
  );
}
