import Link from "next/link";
import Image from "next/image";
import LifeTrackerArchitecture from "../../components/lifetracker-architecture";
import { ArrowLeft, ArrowUpRight, Wallet, Users, Receipt, CalendarDays, CheckSquare, StickyNote, Database, ShieldCheck, Layers3 } from "lucide-react";

const capabilities = [
  { number: "01", title: "Personal & shared workspaces", description: "Separate personal tracking from shared household activity. Workspace membership provides the boundary for collaborative features.", icon: Users },
  { number: "02", title: "Expense tracking", description: "Record expenses and associate split details with the people sharing a workspace, keeping everyday spending visible.", icon: Wallet },
  { number: "03", title: "Bill splitting", description: "A shared-workspace workflow for split bills, participants and payments, so shared costs have a clear record.", icon: Receipt },
  { number: "04", title: "Recurring bills", description: "Keep monthly obligations in one place instead of relying on scattered reminders and notes.", icon: CalendarDays },
  { number: "05", title: "Tasks & notes", description: "Bring household follow-ups and lightweight notes alongside financial tracking in the same application.", icon: CheckSquare },
  { number: "06", title: "Budget allocation", description: "The Today dashboard compares an ideal spending plan with actual activity, including allocation targets and utilisation.", icon: Layers3 },
];

const stack = ["Vanilla JavaScript", "HTML & CSS", "Nginx", "FastAPI", "PostgreSQL 16", "Docker Compose"];

export default function LifeTrackerCaseStudy() {
  return (
    <main className="case-study lifetracker-study">
      <div className="case-topline">
        <Link href="/" className="case-back"><ArrowLeft size={15} /> BACK TO PORTFOLIO</Link>
        <span>SELECTED PROJECT / 02</span>
      </div>

      <header className="case-hero">
        <div className="case-kicker"><span /> PERSONAL FINANCE & SHARED LIVING · 2026</div>
        <div className="case-title-row">
          <div>
            <h1>Life<span>Tracker</span><i>.</i></h1>
            <p className="case-subtitle">A clearer picture of everyday money.</p>
          </div>
          <div className="case-hero-note">
            <span>PERSONAL PROJECT</span>
            <p>A personal and shared-life tracker that brings expenses, bills, budgets and household coordination into one place.</p>
          </div>
        </div>
        <div className="case-hero-image">
          <Image src="/images/lifetracker.png" alt="LifeTracker application dashboard preview" fill priority sizes="(max-width: 800px) 100vw, 78vw" />
          <span className="case-image-label">LIFETRACKER / APPLICATION PREVIEW</span>
        </div>
      </header>

      <section className="case-overview">
        <div className="case-section-index">01 / OVERVIEW</div>
        <div className="case-overview-copy">
          <h2>Personal finances.<br /><em>Shared life, organised.</em></h2>
          <p>LifeTracker is a personal and shared household tracker designed to put everyday financial activity and practical coordination in one application. It combines expense records, bills, budget planning and shared-cost workflows with supporting tasks and notes.</p>
          <p>The product distinguishes between personal and shared workspaces. That distinction matters: not every expense or financial detail belongs in a shared household view, while some costs need to be visible and settled collaboratively.</p>
        </div>
      </section>

      <section className="case-problem">
        <div className="case-section-index">02 / THE PROBLEM</div>
        <div>
          <span className="case-eyebrow">THE HOUSEHOLD FINANCE GAP</span>
          <h2>Money is personal.<br /><em>Some costs are shared.</em></h2>
          <div className="case-problem-grid">
            <p>Personal spending, recurring bills and shared expenses often end up spread across banking apps, spreadsheets, chat threads and reminders. When more than one person is involved, it becomes harder to understand who paid, who owes what and what still needs attention.</p>
            <p>LifeTracker approaches this as a workspace problem as much as a finance problem: keep personal activity separate, give shared costs their own workflow and make the household's recurring obligations easier to review.</p>
          </div>
        </div>
      </section>

      <section className="case-capabilities">
        <div className="case-section-index">03 / PRODUCT CAPABILITIES</div>
        <div className="case-capability-content">
          <div className="case-section-heading">
            <span className="case-eyebrow">A CONNECTED HOUSEHOLD TOOLKIT</span>
            <h2>From daily spending<br /><em>to shared obligations.</em></h2>
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
        <div className="case-section-index">04 / PRODUCT LOGIC</div>
        <div className="case-design-copy">
          <span className="case-eyebrow">PERSONAL BY DEFAULT, COLLABORATIVE WHEN NEEDED</span>
          <h2>Separate what is personal.<br /><em>Connect what is shared.</em></h2>
          <p>The application models users, workspaces and memberships alongside financial and household records. The personal workspace is intended for an individual's own tracking; the shared workspace enables collaborative features such as bill splitting. The backend enforces the shared-workspace boundary for the bill-splitting workflow.</p>
          <div className="case-principles">
            <div><span>01</span><strong>Separation</strong><small>Keep personal and shared activity in distinct contexts.</small></div>
            <div><span>02</span><strong>Accountability</strong><small>Record expenses, participants and payments clearly.</small></div>
            <div><span>03</span><strong>Visibility</strong><small>Compare budget targets with actual spending.</small></div>
          </div>
        </div>
      </section>

      <section className="case-architecture case-architecture-interactive lifetracker-architecture-section">
        <div className="case-section-index">05 / SYSTEM DESIGN</div>
        <div className="case-architecture-content">
          <span className="case-eyebrow">TRACE A WORKFLOW THROUGH THE STACK</span>
          <h2>Explore the<br /><em>architecture.</em></h2>
          <p>Follow an expense, shared bill, budget view or backup workflow through the deployed application. Select each component to inspect its role and operational boundary.</p>
          <div className="case-stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          <LifeTrackerArchitecture />
          <div className="case-architecture-note"><Database size={19} /><p><strong>Operational details matter.</strong><br />The database uses a persistent Docker volume, with a separate backup service writing database backups to a mounted backups directory. The backend health endpoint is available at <code>/api/health</code>.</p></div>
        </div>
      </section>

      <section className="case-reflection">
        <div className="case-section-index">06 / WHAT IT REPRESENTS</div>
        <div>
          <ShieldCheck size={25} strokeWidth={1.4} />
          <h2>More than an expense log.<br /><em>A shared view of everyday life.</em></h2>
          <p>LifeTracker explores the boundary between individual finance and shared responsibility. Its value comes from combining clear workspace separation, practical household workflows and an application that can be operated and backed up on self-managed infrastructure.</p>
        </div>
      </section>

      <footer className="case-footer">
        <div><span className="case-eyebrow">NEXT / KEEP EXPLORING</span><h2>Build systems<br /><em>that make life simpler.</em></h2></div>
        <div className="case-footer-actions">
          <Link href="/#work" className="case-footer-link"><ArrowLeft size={16} /> ALL PROJECTS</Link>
          <a href="https://github.com/ALmoSTGoD249" target="_blank" rel="noreferrer" className="case-footer-link">VIEW GITHUB <ArrowUpRight size={16} /></a>
          <Link href="/projects/lifeops" className="case-footer-link">NEXT CASE STUDY: LIFEOPS <ArrowUpRight size={16} /></Link>
          <Link href="/#contact" className="case-footer-link">GET IN TOUCH <ArrowUpRight size={16} /></Link>
        </div>
        <div className="case-footer-bottom"><Link href="/">SOUMYADEEP MAITY®</Link><span>KOLKATA, INDIA · 2026</span></div>
      </footer>
    </main>
  );
}
