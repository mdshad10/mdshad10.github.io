import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, Check, Copy, Plus, Minus } from 'lucide-react';
import { projects, projectFilters, experience, skillCategories, coursework } from './data';
import './styles.css';

const email = 'mss464@cornell.edu';
const Arrow = () => <ArrowUpRight size={20} aria-hidden="true" />;

function Header() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <header className="page-shell flex flex-wrap items-center justify-between gap-4 border-b py-6">
    <a className="font-semibold" href="#top" aria-label="Md Shad, home">Md Shad<span className="text-accent"> /</span></a>
    <nav aria-label="Main navigation" className="flex flex-wrap gap-6">
      {[['projects', 'Work'], ['experience', 'Experience'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) =>
        <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
    </nav>
  </header>;
}

function Hero() {
  return <section id="top" className="page-shell hero section-space">
    <div className="hero-layout grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="mb-6 text-muted">Cornell Electrical & Computer Engineering</p>
        <h1>I build processors,<br className="hidden lg:block" /> FPGA accelerators,<br className="hidden lg:block" /> and embedded systems<span className="text-accent">.</span></h1>
        <p className="mt-8 max-w-prose text-muted">I’m Md Shad. I work across RTL, firmware, and hardware validation to turn architecture into working systems.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a className="button-primary" href="#projects">Explore my work <ArrowDown size={20} aria-hidden="true" /></a>
          <a className="button-ghost" href={`mailto:${email}`}>Get in touch <Arrow /></a>
        </div>
      </div>
      <figure className="hero-figure">
        <a href="/assets/projects/mandelbrot-visualizer.jpg" target="_blank" rel="noreferrer" aria-label="Open full-size photo of the FPGA Mandelbrot renderer">
          <img src="/assets/projects/mandelbrot-visualizer.jpg" alt="Mandelbrot fractal rendered on a VGA display by the DE1-SoC FPGA" fetchPriority="high" width="1280" height="960" />
        </a>
        <figcaption className="flex flex-wrap justify-between gap-2 border-b py-4"><span>Mandelbrot on FPGA</span><span className="text-muted">43 iterators / 20 ms frame</span></figcaption>
      </figure>
    </div>
    <div className="mt-12 grid gap-4 border-t pt-6 sm:grid-cols-2">
      <p>Systems Design Engineer Intern <span className="text-muted">at AMD</span></p>
      <p className="text-muted sm:text-right">B.S. ECE, Cornell · Expected May 2027</p>
    </div>
  </section>;
}

function Project({ project, index }) {
  return <details className="project group border-t">
    <summary className="grid cursor-pointer items-start gap-4 py-6 md:grid-cols-[48px_1fr_1fr_24px]">
      <span className="project-index text-muted" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span><span className="block font-semibold">{project.title}</span><span className="mt-2 block text-muted">{project.category}</span></span>
      <span className="project-impact text-accent">{project.impact}</span>
      <span className="project-toggle"><Plus className="when-closed" size={20} aria-hidden="true" /><Minus className="when-open" size={20} aria-hidden="true" /><span className="sr-only">Project details</span></span>
    </summary>
    <div className="project-content grid gap-8 pb-8 md:ml-16 lg:grid-cols-2">
      <div>
        <p className="text-muted">{project.period}</p>
        <p className="mt-4 max-w-prose">{project.detail || project.summary}</p>
        <ul className="mt-4 grid list-disc gap-2 pl-4 text-muted">{project.bullets.map(b => <li key={b}>{b}</li>)}</ul>
        <p className="mt-6 text-muted">{project.tools.join(' / ')}</p>
        <div className="mt-4 flex flex-wrap gap-6">
          {project.website && <a className="inline-link" href={project.website} target="_blank" rel="noreferrer">Read project report <Arrow /></a>}
          {project.report && <a className="inline-link" href={project.report} target="_blank" rel="noreferrer">Read report (PDF) <Arrow /></a>}
        </div>
      </div>
      {project.image && <a className="project-image" href={project.image} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${project.title}`}><img src={project.image} alt={project.imageAlt} loading="lazy" /></a>}
    </div>
  </details>;
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const visible = projects.filter(p => filter === 'All' || p.filters.includes(filter));
  return <section id="projects" className="page-shell section-space border-t">
    <div className="grid gap-6 md:grid-cols-2 md:items-end"><h2>Built, tested,<br />measured.</h2><p className="max-w-prose text-muted">From a 120 ns reconstruction pipeline to a four-core RISC-V system. Open a project for the architecture, implementation, and results.</p></div>
    <div role="group" aria-label="Filter projects" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-b pb-4">
      {projectFilters.map(label => <button key={label} aria-pressed={filter === label} className="filter" onClick={() => setFilter(label)}>{label === 'Embedded Systems / Microcontrollers' ? 'Embedded' : label === 'Computer Architecture' ? 'Architecture' : label}</button>)}
    </div>
    <p className="py-4 text-muted" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
    <div className="border-b">{visible.length ? visible.map(p => <Project key={p.title} project={p} index={projects.indexOf(p)} />) : <p className="py-8">No projects in this category. <button className="inline-link" onClick={() => setFilter('All')}>Show all projects</button></p>}</div>
    <a className="inline-link mt-8" href="https://github.com/mdshad10" target="_blank" rel="noreferrer">More on GitHub <Arrow /></a>
  </section>;
}

function Experience() {
  return <section id="experience" className="page-shell section-space border-t">
    <h2>Engineering in practice.</h2>
    <div className="mt-12">{experience.map(item => <article key={item.place} className="grid gap-4 border-t py-8 md:grid-cols-[1fr_2fr]">
      <div><h3 className="font-semibold">{item.place}</h3><p className="mt-2 text-muted">{item.date}</p><p className="text-muted">{item.location}</p></div>
      <div><h3 className="font-semibold">{item.role}</h3>
        {item.bullets && <ul className="mt-4 grid max-w-prose gap-2 text-muted">{item.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
        {item.subroles?.map(role => <div key={role.title} className="mt-4"><h4>{role.title}</h4><p className="text-muted">{role.date}</p><p className="mt-2 max-w-prose text-muted">{role.bullets.join(' ')}</p></div>)}
      </div>
    </article>)}</div>
  </section>;
}

function About() {
  return <section id="about" className="page-shell section-space border-t">
    <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
      <h2>Across the<br />hardware stack.</h2>
      <div><p className="max-w-prose">I study Electrical & Computer Engineering at Cornell University, with work spanning computer architecture, digital design, embedded systems, and hardware acceleration.</p>
        <div className="mt-8 border-t py-6"><h3 className="font-semibold">Cornell University</h3><p className="text-muted">B.S. Electrical & Computer Engineering · Expected May 2027</p><p className="mt-4">Stuyvesant High School <span className="text-muted">· New York, NY</span></p></div>
        {skillCategories.filter(s => s.label !== 'Collaboration & Version Control').map(s => <div key={s.label} className="grid gap-2 border-t py-6"><h3 className="font-semibold">{s.label}</h3><p className="max-w-prose text-muted">{s.items.join(' / ')}</p></div>)}
        <details className="border-y py-6"><summary className="cursor-pointer font-semibold">Coursework <Plus size={20} className="inline text-accent" aria-hidden="true" /></summary><ul className="mt-4 grid gap-2 text-muted sm:grid-cols-2">{coursework.map(c => <li key={c}>{c}</li>)}</ul></details>
      </div>
    </div>
  </section>;
}

function Contact() {
  const [state, setState] = useState('idle');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    setState('loading');
    try { await navigator.clipboard.writeText(email); setState('success'); }
    catch { setState('error'); }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 4000);
  }
  return <section id="contact" className="contact section-space border-t">
    <div className="page-shell">
      <div className="grid gap-8 md:grid-cols-2"><h2>Let’s build<br />a working system.</h2><div><p className="max-w-prose text-muted">For hardware opportunities, research, or a conversation about RTL and embedded systems, email me.</p><a className="button-primary mt-8" href={`mailto:${email}`}>{email} <Arrow /></a>
        <div className="mt-4 flex min-h-12 flex-wrap items-center gap-4"><button className="button-ghost" onClick={copyEmail} disabled={state === 'loading'}>{state === 'success' ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}{state === 'loading' ? 'Copying…' : state === 'success' ? 'Email copied' : 'Copy email'}</button><span role="status" className="text-muted">{state === 'error' ? 'Copy unavailable. Use the email link above.' : state === 'success' ? 'Ready to paste.' : ''}</span></div>
      </div></div>
      <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t pt-6"><p>Md Shad <span className="text-muted">/ Electrical & Computer Engineering</span></p><div className="flex gap-6"><a className="inline-link" href="https://github.com/mdshad10" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a className="inline-link" href="https://linkedin.com/in/mdshad4" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="#top">Back to top ↑</a></div></footer>
    </div>
  </section>;
}

function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Projects /><Experience /><About /><Contact /></main></>;
}

createRoot(document.getElementById('root')).render(<App />);
