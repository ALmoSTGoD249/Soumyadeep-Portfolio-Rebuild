import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, Boxes, CalendarClock, CheckSquare,
  ClipboardList, Database, FileText, GitBranch, Layers3, LockKeyhole,
  ShieldCheck, Workflow,
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

const stack = [
  "React 18", "TypeScript", "Vite", "React Router", "TanStack Query",
  "Tailwind CSS 4", "FastAPI", "Python", "SQLAlchemy", "PostgreSQL 16",
  "Alembic", "Nginx", "Docker Compose",
];

const decisions = [
  {
    number: "01",
    title: "Server-side sessions",
    text: "Opaque session tokens are stored as hashes. HttpOnly cookies and per-session CSRF tokens protect authenticated browser workflows; logout and password changes can revoke sessions.",
    icon: LockKeyhole,
  },
  {
    number: "02",
    title: "Traceable changes",
    text: "Record changes append activity entries in the same transaction, including field-level before-and-after values. Record numbers are generated from row-locked sequences.",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Reliable scheduled work",
    text: "A backend scheduler checks preventive-maintenance windows every 15 minutes. Generation is idempotent, so repeated runs do not create duplicate open tasks for a schedule.",
    icon: CalendarClock,
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
          <Image src="/images/lifeops.png" alt="LifeOps application interface preview" fill priority sizes="(max-width: 800px) 100vw, 78vw" />
          <span className="case-image-label">LIFEOPS / APPLICATION PREVIEW</span>
        </div>
      </header>

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

      <section className="case-architecture">
        <div className="case-section-index">05 / ARCHITECTURE</div>
        <div className="case-architecture-content">
          <span className="case-eyebrow">A CONTAINERISED MODULAR MONOLITH</span>
          <h2>React to API<br /><em>to relational data.</em></h2>
          <p>The browser runs a React single-page application served by Nginx. Nginx also reverse-proxies API traffic to a FastAPI backend. The backend is organised by domain routers and services, with PostgreSQL as the persistent data store. Only the Nginx web service publishes a host port; the API and database remain on the internal Docker network.</p>
          <div className="case-stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="case-architecture-note"><Database size={19} /><p><strong>Production deployment shape.</strong><br />Docker Compose runs the web, backend and PostgreSQL services. Named volumes persist database data and uploaded files across container restarts.</p></div>
        </div>
      </section>

      <section className="case-capabilities">
        <div className="case-section-index">06 / ENGINEERING DECISIONS</div>
        <div className="case-capability-content">
          <div className="case-section-heading">
            <span className="case-eyebrow">SECURITY, AUDITABILITY, RELIABILITY</span>
            <h2>Important details<br /><em>under the surface.</em></h2>
          </div>
          <div className="case-capability-grid">
            {decisions.map(({ number, title, text, icon: Icon }) => (
              <article className="case-capability" key={number}>
                <div className="case-capability-top"><span>{number}</span><Icon size={21} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="case-architecture-note"><ShieldCheck size={19} /><p><strong>Security controls in the repository.</strong><br />Passwords use Argon2id; knowledge-base protected values are encrypted at rest and excluded from ordinary list/detail responses. Reveal actions are explicit and audited.</p></div>
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
