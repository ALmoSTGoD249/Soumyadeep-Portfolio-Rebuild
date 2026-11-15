import Link from "next/link";
import ImageLightbox from "../../components/image-lightbox";
import { ArrowLeft, ArrowUpRight, Flag, Gauge, Radio, Users } from "lucide-react";

const gallery = [
  { src: "/images/rnn-car.png", alt: "RNN black and silver open-wheel sim-racing car render", width: 1022, height: 575, code: "01 / TEAM CAR", caption: "The RNN identity, built around a clean black-and-silver race livery.", className: "rnn-photo-feature" },
  { src: "/images/rnn-silverstone1.jpg", alt: "RNN car running through a corner at Silverstone", width: 2560, height: 1440, code: "02 / SILVERSTONE", caption: "Finding the racing line through a fast section of Silverstone." },
  { src: "/images/rnn-silverstone2.jpg", alt: "Close trackside view of the RNN car at Silverstone", width: 2560, height: 1440, code: "03 / TRACKSIDE", caption: "A closer look at the RNN car in motion, with the team livery in view." },
  { src: "/images/rnn-silverstone3.jpg", alt: "RNN car accelerating on track at Silverstone", width: 2560, height: 1440, code: "04 / ON THE LIMIT", caption: "A low, focused run as the car powers through the circuit." },
  { src: "/images/rnn-yas_marina.jpg", alt: "Close-up of the RNN car cockpit and livery at Yas Marina", width: 1920, height: 1080, code: "05 / YAS MARINA", caption: "Cockpit detail and sponsor marks under the Yas Marina lights." },
  { src: "/images/battle-rrn.jpg", alt: "RNN car battling a purple open-wheel car on track", width: 1920, height: 1080, code: "06 / WHEEL-TO-WHEEL", caption: "A close fight on track — the kind of moment that makes sim racing compelling." },
  { src: "/images/spa-showrun.jpg", alt: "RNN car during a show run at Spa-Francorchamps", width: 1920, height: 1080, code: "07 / SPA SHOWRUN", caption: "A show run at Spa, taking the RNN car out for a full-circuit showcase." },
  { src: "/images/spa-showrun-pit.jpg", alt: "Rear view of the RNN car in the pit lane at Spa", width: 1920, height: 1080, code: "08 / PIT LANE", caption: "Behind the scenes in the pit lane before heading back out." },
  { src: "/images/RRT-vs-rnn.jpg", alt: "RNN and RRT cars running side by side", width: 1920, height: 1080, code: "09 / TEAM BATTLE", caption: "RNN and RRT sharing the track in a side-by-side battle." },
];

export default function RnnCaseStudy() {
  return (
    <main className="case-study rnn-study">
      <div className="case-topline">
        <Link href="/" className="case-back"><ArrowLeft size={15} /> BACK TO PORTFOLIO</Link>
        <span>SELECTED PROJECT / 03</span>
      </div>

      <header className="case-hero rnn-case-hero">
        <div className="case-kicker"><span /> MOTORSPORT MEDIA · SIM RACING · COMMUNITY</div>
        <div className="case-title-row">
          <div>
            <h1>Racing<span>News</span><i>Network.</i></h1>
            <p className="case-subtitle">The racing conversation, from the grid to the community.</p>
          </div>
          <div className="case-hero-note">
            <span>IN DEVELOPMENT</span>
            <p>A motorsport media concept and sim-racing home for race coverage, team identity, drivers and the stories happening on track.</p>
          </div>
        </div>
        <div className="rnn-hero-visual">
          <ImageLightbox src="/images/rnn-car.png" alt="RNN black and silver open-wheel race car" width={1022} height={575} variant="desktop" priority />
          <span className="rnn-hero-mark">RNN<span> / RACING NEWS NETWORK</span></span>
        </div>
      </header>

      <section className="case-overview rnn-overview">
        <div className="case-section-index">01 / THE IDEA</div>
        <div className="case-overview-copy">
          <h2>Motorsport has<br /><em>more than one story.</em></h2>
          <p>RacingNewsNetwork is a motorsport destination in development: a place for race coverage, results, analysis and the wider racing conversation, with a dedicated space for sim racing and the people behind the wheel.</p>
          <p>The project brings two interests together — following motorsport and building a team identity in sim racing. The goal is to make the racing itself, the drivers and the community feel like parts of the same experience.</p>
        </div>
      </section>

      <section className="case-capabilities rnn-pillars">
        <div className="case-section-index">02 / THE DIRECTION</div>
        <div className="case-capability-content">
          <div className="case-section-heading">
            <span className="case-eyebrow">A PLATFORM WITH A PADDOCK AT ITS HEART</span>
            <h2>Coverage, competition<br /><em>and community.</em></h2>
          </div>
          <div className="case-capability-grid">
            <article className="case-capability"><div className="case-capability-top"><span>01</span><Radio size={21} /></div><h3>Race coverage</h3><p>Build a home for race stories, weekend context, results and the moments worth revisiting.</p></article>
            <article className="case-capability"><div className="case-capability-top"><span>02</span><Flag size={21} /></div><h3>Sim-racing team</h3><p>Give the team, its drivers, liveries and on-track activity a recognisable identity.</p></article>
            <article className="case-capability"><div className="case-capability-top"><span>03</span><Gauge size={21} /></div><h3>Race culture</h3><p>Capture battles, circuits, car details and the atmosphere around a racing session.</p></article>
            <article className="case-capability"><div className="case-capability-top"><span>04</span><Users size={21} /></div><h3>Community</h3><p>Connect the people who follow the sport with the people who compete in it.</p></article>
          </div>
        </div>
      </section>

      <section className="rnn-photo-section">
        <div className="rnn-photo-heading">
          <div><span className="case-eyebrow">TRACKSIDE / SELECTED FRAMES</span><h2>Built around<br /><em>the racing.</em></h2></div>
          <p>A collection of sim-racing moments, team visuals and circuit scenes. Each frame has a caption; select a photo to open the full image.</p>
        </div>
        <div className="rnn-photo-grid">
          {gallery.map((photo, index) => (
            <figure className={photo.className ?? ""} key={photo.src}>
              <ImageLightbox src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} variant="desktop" priority={index === 0} />
              <figcaption><span>{photo.code}</span><strong>{photo.caption}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-reflection rnn-reflection">
        <div className="case-section-index">03 / IN THE MAKING</div>
        <div>
          <Radio size={25} strokeWidth={1.4} />
          <h2>A network for the<br /><em>people who love racing.</em></h2>
          <p>RNN is still taking shape. This page documents the visual direction and sim-racing side of the project as the wider platform develops.</p>
        </div>
      </section>

      <footer className="case-footer">
        <div><span className="case-eyebrow">NEXT / KEEP EXPLORING</span><h2>Stay close<br /><em>to the action.</em></h2></div>
        <div className="case-footer-actions">
          <Link href="/#work" className="case-footer-link"><ArrowLeft size={16} /> ALL PROJECTS</Link>
          <a href="https://github.com/ALmoSTGoD249" target="_blank" rel="noreferrer" className="case-footer-link">VIEW GITHUB <ArrowUpRight size={16} /></a>
          <Link href="/projects/lifetracker" className="case-footer-link">PREVIOUS CASE STUDY: LIFETRACKER <ArrowUpRight size={16} /></Link>
          <Link href="/#contact" className="case-footer-link">GET IN TOUCH <ArrowUpRight size={16} /></Link>
        </div>
        <div className="case-footer-bottom"><Link href="/">SOUMYADEEP MAITY®</Link><span>KOLKATA, INDIA · 2026</span></div>
      </footer>
    </main>
  );
}
