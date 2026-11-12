"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, ArrowRight, Radio, Cpu, Layers3, MapPin, Terminal as TerminalIcon, X as CloseIcon } from "lucide-react";

const featured = [
  {
    id: "01", name: "LifeOps", type: "PERSONAL SERVICE MANAGEMENT", year: "2026",
    description: "A private, shared operations hub inspired by enterprise service management. Bringing incidents, requests, tasks, assets and everyday household workflows into one considered system.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    image: "/images/lifeops.png", className: "lifeops",
    href: "#contact", action: "CASE STUDY IN PROGRESS"
  },
  {
    id: "02", name: "LifeTracker", type: "PERSONAL FINANCE & SHARED LIVING", year: "2026",
    description: "A personal and shared-life tracker for expenses, bills, budgets and the small financial decisions that make a household work. Designed around clarity, accountability and useful everyday workflows.",
    tags: ["JavaScript", "PostgreSQL", "Docker", "Product design"],
    image: "/images/lifetracker.png", className: "lifetracker",
    href: "#contact", action: "CASE STUDY IN PROGRESS"
  },
  {
    id: "03", name: "RacingNewsNetwork", type: "MOTORSPORT MEDIA / SIM RACING", year: "IN DEVELOPMENT",
    description: "A motorsport destination in the making: race coverage, results and the wider racing conversation, alongside a home for my sim-racing team and its drivers.",
    tags: ["Motorsport", "Sim racing", "Media platform", "Community"],
    image: "/images/rnn-car.png", className: "rnn",
    href: "#contact", action: "IN DEVELOPMENT"
  }
];

const archive = [
  { name: "SongSift", category: "MUSIC RECOMMENDATION", description: "A music discovery and recommendation project exploring content-based ranking and machine-learning approaches.", image: "/images/songsift.png", href: "https://github.com/ALmoSTGoD249" },
  { name: "Hagrid", category: "AI / VOICE ASSISTANT", description: "An exploration of conversational AI and voice-assistant workflows.", image: "/images/hagrid.png", href: "https://github.com/ALmoSTGoD249" },
  { name: "Stock Price Prediction", category: "MACHINE LEARNING", description: "A learning project exploring time-series prediction with Python and TensorFlow.", image: "/images/stock-prediction.png", href: "https://github.com/ALmoSTGoD249/Stock_Price_Prediction" },
  { name: "Snake Game", category: "PYTHON / GAME DEVELOPMENT", description: "A classic arcade game built with Pygame.", image: "/images/snake-game.png", href: "https://github.com/ALmoSTGoD249/Snake-Game" }
];

const reveal: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: "easeOut" } } };

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeTech, setActiveTech] = useState("Azure");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>(["SoumyadeepOS [Version 1.0]", "Type 'help' to explore this portfolio."]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rotatingRoles = ["AZURE DEVOPS & CLOUD PLATFORM", "AGENTIC AI SOLUTION DEVELOPMENT", "SOFTWARE & SYSTEMS ENGINEERING"];
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const technologies = [
    { name: "Azure", group: "CLOUD PLATFORM", detail: "Cloud platform operations, Azure fundamentals and infrastructure services. Current professional focus." },
    { name: "DevOps", group: "DELIVERY & AUTOMATION", detail: "CI/CD concepts, deployment workflows, operational automation and repeatable delivery practices." },
    { name: "Docker", group: "CONTAINERS", detail: "Containerising personal applications and operating multi-service environments with Docker Compose." },
    { name: "Linux", group: "SYSTEMS", detail: "Ubuntu Server administration, service management, networking and self-hosted workloads." },
    { name: "Python", group: "DEVELOPMENT", detail: "Scripting, application development and machine-learning experimentation." },
    { name: "Agentic AI", group: "AI SOLUTIONS", detail: "Exploring agentic workflows and AI-assisted solution development." },
    { name: "React", group: "FRONTEND", detail: "Building interactive interfaces and product experiences with React and TypeScript." },
    { name: "PostgreSQL", group: "DATA", detail: "Relational data modelling and persistence for personal application projects." }
  ];
  const runTerminalCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    const responses: Record<string, string> = {
      help: "Available: about · projects · stack · experience · contact · clear",
      about: "Soumyadeep Maity — software, cloud and systems enthusiast based in Kolkata, India.",
      projects: "Featured: LifeOps · LifeTracker · RacingNewsNetwork. Scroll to Selected Work for details.",
      stack: "Azure · Docker · Linux · Python · React · TypeScript · PostgreSQL · Agentic AI",
      experience: "Tata Consultancy Services — Associate System Engineer. Functional focus: Azure DevOps, Cloud Platform Engineering and Agentic AI Solution Development.",
      contact: "Email: soumadeepmaity2@gmail.com · LinkedIn: linkedin.com/in/soumyadeep-maity-3913101b4",
      clear: "__CLEAR__"
    };
    const response = responses[command] ?? `Command not found: ${command}. Type 'help' to see available commands.`;
    setTerminalHistory((history) => command === "clear" ? ["Terminal cleared. Type 'help' to continue."] : [...history, `visitor@portfolio:~$ ${command}`, response]);
    setTerminalInput("");
  };



  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    if (!finePointer || reducedMotion) return () => window.removeEventListener("scroll", scroll);

    
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (cursorDot.current) cursorDot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const animate = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      if (cursorRing.current) cursorRing.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };
    const hover = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button']");
      cursorRing.current?.classList.toggle("cursor-hover", Boolean(interactive));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", hover);
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
      window.removeEventListener("scroll", scroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      hero.style.setProperty("--hero-x", `${x * 18}px`);
      hero.style.setProperty("--hero-y", `${y * 14}px`);
    };
    const reset = () => { hero.style.setProperty("--hero-x", "0px"); hero.style.setProperty("--hero-y", "0px"); };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", reset); };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const interval = window.setInterval(() => setRoleIndex((current) => (current + 1) % rotatingRoles.length), 2800);

    const revealTargets = document.querySelectorAll<HTMLElement>(
      ".manifesto-text, .section-heading, .project-info, .dark-inner > p, .about-grid, .experience-grid, .capability, .archive-head, .footer-top, footer h2"
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 90}ms`);
      observer.observe(element);
    });

    const magneticTargets = document.querySelectorAll<HTMLElement>(
      ".nav-cta, .round-link, .project-action, .archive-toggle, .copy-email, .menu-toggle"
    );
    const moveMagnet = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      element.style.setProperty("--magnet-x", `${dx * 0.12}px`);
      element.style.setProperty("--magnet-y", `${dy * 0.12}px`);
    };
    const resetMagnet = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.style.setProperty("--magnet-x", "0px");
      element.style.setProperty("--magnet-y", "0px");
    };
    magneticTargets.forEach((element) => {
      element.classList.add("magnetic");
      element.addEventListener("pointermove", moveMagnet);
      element.addEventListener("pointerleave", resetMagnet);
    });

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
      magneticTargets.forEach((element) => {
        element.removeEventListener("pointermove", moveMagnet);
        element.removeEventListener("pointerleave", resetMagnet);
      });
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("soumadeepmaity2@gmail.com");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      window.location.href = "mailto:soumadeepmaity2@gmail.com";
    }
  };

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-dot" ref={cursorDot} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRing} aria-hidden="true" />
      <div className="topline"><span>SM<span className="topline-dot">.</span></span><span>KOLKATA, INDIA <i /> AVAILABLE FOR THE RIGHT OPPORTUNITY</span><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button></div>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a className="wordmark" href="#top" onClick={closeMenu}>Soumyadeep Maity<span>®</span></a>
        <div className="navlinks">
          <a href="#work" onClick={closeMenu}>WORK <span>01</span></a>
          <a href="#about" onClick={closeMenu}>ABOUT <span>02</span></a>
          <a href="#archive" onClick={closeMenu}>ARCHIVE <span>03</span></a>
          <a href="#contact" onClick={closeMenu}>CONTACT <span>04</span></a>
        </div>
        <a className="nav-cta" href="mailto:soumadeepmaity2@gmail.com">LET’S TALK <ArrowUpRight size={14}/></a>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true"/><div className="hero-orbit hero-orbit-two" aria-hidden="true"/>
        <div className="hero-kicker"><span className="eyebrow-line"/> SOFTWARE · CLOUD · SYSTEMS · CURIOSITY</div>
        <div className="hero-title-wrap">
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: "easeOut" }}>
            Building things<br/><em>that work.</em>
          </motion.h1>
          <motion.div className="hero-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>
            <span className="role-rotator" key={roleIndex}>{rotatingRoles[roleIndex]}</span><span>ENGINEER BY TRADE.</span><span>BUILDER BY NATURE.</span>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <p>I’m Soumyadeep — a software and infrastructure engineer interested in the systems behind useful products, from the interface down to the server.</p>
          <a className="round-link" href="#work" aria-label="Explore selected work"><ArrowDownRight size={22}/></a>
          <span className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></span>
        </div>
        <div className="hero-number">01 <span>—</span> 04</div>
      </section>

      <section className="manifesto">
        <div className="section-label"><span>01 / THE APPROACH</span><span>THOUGHTFUL BY DESIGN</span></div>
        <p className="manifesto-text">I like the space where <em>software meets infrastructure.</em> Building, breaking, learning, and making technology feel a little more human.</p>
        <div className="manifesto-foot"><span>FROM AN IDEA TO SOMETHING REAL.</span><span>SCROLL TO SEE WHAT I’VE BEEN BUILDING ↘</span></div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div><span className="eyebrow">02 / SELECTED WORK</span><h2>Things in<br/><em>the making.</em></h2></div>
          <p>A selection of products and experiments shaped by curiosity, practical problems and a desire to build better systems.</p>
        </div>
        <div className="projects editorial-project-grid">
          {featured.map((project, i) => (
            <motion.article className={`project ${project.className}`} key={project.id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .16 }}>
              <div className="project-meta"><span>{project.id} / 03</span><span>{project.type}</span><span>{project.year}</span></div>
              <div className="project-visual">
                <Image src={project.image} alt={`${project.name} project preview`} fill priority={i === 0} sizes="(max-width: 800px) 100vw, 90vw" />
                {project.className === "rnn" && <div className="rnn-stamp"><span>RNN</span><small>RACING NEWS NETWORK<br/>SIM RACING DIVISION</small></div>}
              </div>
              <div className="project-info">
                <div><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                <a href={project.href} className="project-action">{project.action} <ArrowUpRight size={15}/></a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="dark-interlude">
        <div className="dark-inner">
          <span className="eyebrow">A LITTLE ABOUT HOW I THINK</span>
          <p>Good engineering is invisible when it works. <em>Great engineering</em> makes the complicated feel simple.</p>
          <div className="dark-bottom"><span>RELIABILITY / CRAFT / CONTINUOUS LEARNING</span><span>03 — THE PRACTICE</span></div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-label"><span>03 / A BIT ABOUT ME</span><span>THE PERSON BEHIND THE BUILDS</span></div>
        <div className="about-grid">
          <div className="portrait-wrap"><Image src="/images/profile.jpg" alt="Portrait of Soumyadeep Maity" fill sizes="(max-width: 800px) 100vw, 38vw"/><span className="portrait-caption">KOLKATA, INDIA · 2026</span></div>
          <div className="about-copy">
            <span className="eyebrow">HELLO, I’M SOUMYADEEP.</span>
            <h2>Curious about<br/><em>what’s possible.</em></h2>
            <p>I’m a technology professional based in Kolkata, India, with a background in Computer Science and Business Systems. My interests span software development, cloud infrastructure, automation and the systems that keep applications running.</p>
            <p>Outside the day-to-day, I build personal products, experiment with self-hosted infrastructure and spend time around motorsport and sim racing. I enjoy understanding how things fit together — and making them work better.</p>
            <a className="text-link" href="/Soumyadeep-Maity-CV.pdf" target="_blank">VIEW CURRICULUM VITAE <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-label"><span>04 / PROFESSIONAL EXPERIENCE</span><span>CAREER & CREDENTIALS</span></div>
        <div className="experience-grid">
          <div className="experience-main">
            <span className="eyebrow">CURRENT ROLE · KOLKATA, INDIA</span>
            <h2>Tata Consultancy<br/><em>Services.</em></h2>
            <div className="experience-role">
              <div><h3>Azure DevOps &amp; Cloud Platform Engineer</h3><p>Agentic AI Solution Developer · Associate System Engineer (TCS designation)</p><p>December 2025 — Present</p></div>
              <span className="experience-status">CURRENT</span>
            </div>
          </div>
          <div className="experience-aside">
            <div className="career-block">
              <span className="eyebrow">TOP SKILLS</span>
              <div className="career-tags"><span>Azure DevOps</span><span>Cloud Platform Engineering</span><span>Agentic AI Solution Development</span></div>
            </div>
            <div className="career-block">
              <span className="eyebrow">CERTIFICATIONS</span>
              <ul>
                <li>Claude Certified Architect — Foundation</li>
                <li>Claude Certified Developer — Foundation</li>
                <li>Google Project Management Professional Certificate (v2)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="explorer-section" id="explore">
        <div className="section-label"><span>05 / INTERACTIVE TOOLKIT</span><span>SELECT A TECHNOLOGY</span></div>
        <div className="explorer-grid">
          <div className="tech-constellation" aria-label="Interactive technology constellation">
            <div className="constellation-lines" aria-hidden="true"/>
            {technologies.map((tech, index) => <button key={tech.name} className={`tech-node node-${index + 1} ${activeTech === tech.name ? "active" : ""}`} onClick={() => setActiveTech(tech.name)}>{tech.name}</button>)}
            <span className="constellation-core">SM<span>.</span></span>
          </div>
          <div className="tech-detail" aria-live="polite">
            <span className="eyebrow">{technologies.find((tech) => tech.name === activeTech)?.group}</span>
            <h2>{activeTech}<em>.</em></h2>
            <p>{technologies.find((tech) => tech.name === activeTech)?.detail}</p>
            <span className="detail-prompt">SELECT ANOTHER NODE TO EXPLORE ↗</span>
          </div>
        </div>
      </section>

      <section className="terminal-section">
        <div className="section-label"><span>06 / A LITTLE EXPERIMENT</span><span>COMMAND LINE INTERFACE</span></div>
        <div className="terminal-card">
          <div className="terminal-top"><div><i/><i/><i/></div><span><TerminalIcon size={13}/> SOUMYADEEP@PORTFOLIO:~</span><button onClick={() => setTerminalOpen(!terminalOpen)} aria-expanded={terminalOpen}>{terminalOpen ? "MINIMISE" : "OPEN TERMINAL"}</button></div>
          {terminalOpen && <div className="terminal-body"><div className="terminal-output" aria-live="polite">{terminalHistory.map((line, index) => <p key={`${index}-${line}`} className={line.startsWith("visitor@") ? "terminal-command" : ""}>{line}</p>)}</div><form className="terminal-form" onSubmit={(event) => { event.preventDefault(); runTerminalCommand(terminalInput); }}><label htmlFor="terminal-command">visitor@portfolio:~$</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} autoComplete="off" spellCheck={false} placeholder="type help and press enter"/><button type="submit" aria-label="Run terminal command"><ArrowUpRight size={16}/></button></form></div>}
          {!terminalOpen && <button className="terminal-launch" onClick={() => setTerminalOpen(true)}>Open the interactive terminal <ArrowUpRight size={16}/></button>}
        </div>
      </section>

      <section className="capabilities">
        <div className="section-label"><span>05 / THE TOOLKIT</span><span>AREAS I WORK IN</span></div>
        <div className="capability-grid">
          <div className="capability"><Cpu/><span>01</span><h3>Software<br/>Engineering</h3><p>Building web applications, APIs and practical tools with an eye for usability and maintainability.</p><small>PYTHON · JAVASCRIPT · REACT · SQL</small></div>
          <div className="capability"><Layers3/><span>02</span><h3>Cloud &<br/>Infrastructure</h3><p>Working with cloud platforms, operating systems, containers, networking and service reliability.</p><small>AZURE · LINUX · WINDOWS · DOCKER</small></div>
          <div className="capability"><Radio/><span>03</span><h3>Systems &<br/>Automation</h3><p>Connecting services, reducing repetitive work and building systems that are easier to operate.</p><small>MONITORING · CI/CD · AUTOMATION</small></div>
        </div>
      </section>

      <section className="archive-section" id="archive">
        <div className="archive-head"><div><span className="eyebrow">05 / THE ARCHIVE</span><h2>Earlier <em>experiments.</em></h2></div><button className="archive-toggle" onClick={() => setArchiveOpen(!archiveOpen)}>{archiveOpen ? "CLOSE ARCHIVE" : "EXPLORE ARCHIVE"} <ArrowDownRight size={15}/></button></div>
        {archiveOpen && <motion.div className="archive-grid" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
          {archive.map(item => <a className="archive-card" href={item.href} target="_blank" rel="noreferrer" key={item.name}><div className="archive-image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 700px) 100vw, 25vw"/></div><div className="archive-card-meta"><span>{item.category}</span><ArrowUpRight size={14}/></div><h3>{item.name}</h3><p>{item.description}</p></a>)}
        </motion.div>}
      </section>

      <footer id="contact">
        <div className="footer-top"><span className="eyebrow">06 / HAVE SOMETHING IN MIND?</span><span className="footer-location"><MapPin size={13}/> KOLKATA, INDIA</span></div>
        <h2>Let’s make<br/><em>it happen.</em></h2>
        <div className="contact-actions"><a className="email-link" href="mailto:soumadeepmaity2@gmail.com">soumadeepmaity2@gmail.com <ArrowUpRight size={18}/></a><button className="copy-email" onClick={copyEmail}>{emailCopied ? "EMAIL COPIED ✓" : "COPY EMAIL +"}</button></div>
        <div className="footer-bottom"><a className="wordmark" href="#top">Soumyadeep Maity<span>®</span></a><div className="socials"><a href="https://github.com/ALmoSTGoD249" target="_blank" rel="noreferrer"><Github size={16}/> GITHUB</a><a href="https://www.linkedin.com/in/soumyadeep-maity-3913101b4/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LINKEDIN</a><a href="mailto:soumadeepmaity2@gmail.com"><Mail size={16}/> EMAIL</a></div><span>© 2026 SOUMYADEEP MAITY</span></div>
      </footer>
    </main>
  );
}
