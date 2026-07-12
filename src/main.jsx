import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CircuitBoard,
  Cpu,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Radio,
  X,
  Zap
} from "lucide-react";
import heroImage from "../IMG_0005.JPG";
import profileImage from "../assets/img/profilepic.png";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

const projects = [
  {
    number: "01",
    title: "Systolic TPU Accelerator",
    category: "AI Hardware / FPGA",
    period: "Research · 2025—Present",
    summary:
      "A custom 4×4 systolic-array accelerator and ISA for neural-network forward and backward passes.",
    impact: "16 parallel processing elements",
    bullets: [
      "Integrated MAC, bias, and Leaky ReLU units into a pipelined compute fabric.",
      "Designed double-buffered weight loading to reduce stalls and clarify data movement."
    ],
    tools: ["SystemVerilog", "FPGA", "Python", "Custom ISA"],
    visual: "tpu",
    tone: "lime"
  },
  {
    number: "02",
    title: "TinyRV2 Processor",
    category: "Computer Architecture",
    period: "Cornell ECE",
    summary:
      "A 32-bit, five-stage RISC-V processor with full bypassing, hazard detection, and stall control.",
    impact: "5-stage pipelined datapath",
    bullets: [
      "Built structural datapath and control across IF, ID, EX, MEM, and WB.",
      "Validated forwarding and hazards through targeted, timing-aware tests."
    ],
    tools: ["RISC-V", "SystemVerilog", "RTL", "Verification"],
    visual: "cpu",
    tone: "violet"
  },
  {
    number: "03",
    title: "Birdsong Synthesizer",
    category: "Embedded Audio / DSP",
    period: "Real-time systems",
    summary:
      "A real-time Northern Cardinal call synthesizer running on an RP2040 microcontroller.",
    impact: "Interrupt-driven audio synthesis",
    bullets: [
      "Combined direct digital synthesis, ADSR envelopes, and fixed-point arithmetic.",
      "Drove an SPI DAC with deterministic timer interrupts."
    ],
    tools: ["RP2040", "Embedded C", "DSP", "SPI"],
    visual: "audio",
    tone: "orange"
  },
  {
    number: "04",
    title: "Smart Scoring System",
    category: "Embedded Sensing",
    period: "Hardware + firmware",
    summary:
      "An infrared-sensor basketball scoring system built around an interrupt-driven finite-state machine.",
    impact: "Reliable event detection",
    bullets: [
      "Implemented debouncing, timing windows, and LCD, LED, and audio feedback.",
      "Designed for deterministic sensor events instead of polling."
    ],
    tools: ["FRDM-KL46Z", "C", "Sensors", "FSM"],
    visual: "sensor",
    tone: "blue",
    href: "https://github.com/mdshad10/Smart-Basketball-Hoop-Embedded-Systems"
  }
];

const experience = [
  {
    type: "Research",
    icon: CircuitBoard,
    date: "Aug 2025 — Present",
    place: "Zhang Research Group",
    role: "Research Assistant",
    location: "Cornell University",
    bullets: [
      "Designing an FPGA-based TPU architecture, including its compute pipeline, buffering strategy, custom ISA, and host interface.",
      "Evaluating hardware/software tradeoffs for efficient neural-network training and inference."
    ]
  },
  {
    type: "Teaching",
    icon: BookOpen,
    date: "Jan 2025 — Present",
    place: "Cornell ECE",
    role: "Teaching Assistant",
    location: "Ithaca, NY",
    bullets: [
      "Mentoring 100+ students in RTL design, FPGA prototyping, VHDL synthesis, timing, and area analysis.",
      "Helping students debug the gap between intended logic and synthesized hardware."
    ]
  },
  {
    type: "Industry",
    icon: BriefcaseBusiness,
    date: "May 2025 — Aug 2025",
    place: "Charter Communications / Spectrum",
    role: "Electrical Engineering Intern",
    location: "United States",
    bullets: [
      "Improved network monitoring and reliability workflows across more than 400 fiber sites.",
      "Developed an XGBoost-based fraud-detection concept and analyzed power telemetry."
    ]
  }
];

const skillCategories = [
  {
    label: "Hardware",
    items: [
      { name: "SystemVerilog", level: "Advanced", score: 92 },
      { name: "VHDL", level: "Advanced", score: 88 },
      { name: "FPGA Design", level: "Advanced", score: 90 },
      { name: "RISC-V", level: "Advanced", score: 86 },
      { name: "VLSI", level: "Proficient", score: 78 },
      { name: "Verification", level: "Advanced", score: 84 }
    ]
  },
  {
    label: "Firmware",
    items: [
      { name: "C / C++", level: "Advanced", score: 90 },
      { name: "RP2040", level: "Advanced", score: 88 },
      { name: "STM32", level: "Proficient", score: 78 },
      { name: "Interrupts", level: "Advanced", score: 90 },
      { name: "SPI / I²C", level: "Advanced", score: 86 },
      { name: "Real-time DSP", level: "Proficient", score: 80 }
    ]
  },
  {
    label: "Software",
    items: [
      { name: "Python", level: "Advanced", score: 90 },
      { name: "MATLAB", level: "Advanced", score: 84 },
      { name: "React", level: "Proficient", score: 76 },
      { name: "Git", level: "Advanced", score: 88 },
      { name: "Data Analysis", level: "Advanced", score: 84 },
      { name: "Testing", level: "Proficient", score: 80 }
    ]
  }
];

function MagneticLink({ children, className = "", ...props }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  };

  return (
    <motion.a
      className={`magnetic-link ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="loader-mark"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span>MD.</span>
            <i />
            <small>Portfolio / 2026</small>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <a className="wordmark" href="#top" aria-label="MD Shad home">
          MD<span>·</span>SHAD
        </a>
        <p className="header-year">@2026</p>
        <div className="header-focus" aria-label="Engineering focus areas">
          <span>Embedded Systems</span>
          <span>Computer Architecture</span>
          <span>FPGA / VLSI</span>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="eyebrow">Navigation</span>
            {navLinks.map((link, index) => (
              <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
                <small>0{index + 1}</small>{link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <motion.img
        className="hero-background"
        src={heroImage}
        alt="MD Shad collaborating on a desktop computer hardware build"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="hero-image-overlay" aria-hidden="true" />

      <div className="hero-martin-content">
        <motion.p
          className="hero-hello"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Hey there, I’m
        </motion.p>

        <h1 aria-label="MD Shad">
          <span className="hero-name-line">
            <motion.span
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.05, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              MD SHAD
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-martin-meta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.65 }}
        >
          <div>
            <span>Based in Ithaca</span>
            <span>New York, USA</span>
          </div>
          <div className="hero-role">
            <span>Electrical &amp;</span>
            <span>Computer Engineer</span>
          </div>
        </motion.div>

        <motion.a
          className="hero-scroll"
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 0.6 }}
        >
          Scroll to explore <ArrowDown size={15} />
        </motion.a>
      </div>
    </section>
  );
}

function Intro() {
  const profileFacts = [
    ["01 · Education", "Cornell University ECE"],
    ["02 · Focus", "Embedded systems + architecture"],
    ["03 · Status", "Open to engineering roles"]
  ];

  return (
    <section className="intro section-shell" id="about">
      <div className="about-layout">
        <motion.figure className="about-photo reveal" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
          <div className="about-photo-status"><i /> On the grid</div>
          <img src={profileImage} alt="Portrait of MD Shad" />
          <figcaption>
            <span>Electrical & Computer Engineer</span>
            <strong>MD Shad</strong>
          </figcaption>
        </motion.figure>

        <div className="about-content">
          <div className="section-heading reveal">
            <div className="section-kicker"><span>01</span><i /><span>About</span></div>
            <h2>About <em>Me</em></h2>
            <h3>Electrical &amp; Computer Engineering student and systems builder</h3>
          </div>

          <div className="about-facts">
            {profileFacts.map(([label, value]) => (
              <article className="about-fact reveal" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>

          <div className="about-copy reveal">
            <p>
              I build systems where hardware constraints matter: processor pipelines,
              memory movement, interrupt latency, signal quality, and the software
              interfaces that connect everything together.
            </p>
            <p>
              At Cornell, my work spans FPGA-based AI acceleration, computer
              architecture, embedded firmware, VLSI, research, and teaching. I value
              clear tradeoffs, measurable performance, and implementations that other
              engineers can understand and extend.
            </p>
          </div>

          <div className="about-metrics reveal">
            <div><strong>100+</strong><span>Students mentored</span></div>
            <div><strong>400+</strong><span>Fiber sites analyzed</span></div>
            <div><strong>16</strong><span>TPU processing elements</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGraphic({ type }) {
  if (type === "tpu") {
    return (
      <div className="tpu-graphic">
        <div className="chip-label">SYSTOLIC / 4×4</div>
        <div className="chip-grid">
          {Array.from({ length: 16 }).map((_, index) => <i key={index} />)}
        </div>
        <span className="signal-line signal-a" /><span className="signal-line signal-b" />
      </div>
    );
  }
  if (type === "cpu") {
    return (
      <div className="pipeline-graphic">
        <span>INSTRUCTION FLOW</span>
        <div>{["IF", "ID", "EX", "MEM", "WB"].map((stage, index) => <i key={stage} style={{ "--stage": index }}>{stage}</i>)}</div>
        <svg viewBox="0 0 500 120" aria-hidden="true"><path d="M12 84 C80 22 132 96 194 48 S312 16 372 66 S438 92 490 30" /></svg>
      </div>
    );
  }
  if (type === "audio") {
    return (
      <div className="audio-graphic">
        <Radio size={26} />
        <div className="wave-bars">
          {Array.from({ length: 28 }).map((_, index) => <i key={index} style={{ "--bar": index }} />)}
        </div>
        <span>REAL-TIME SYNTHESIS / 44.1 KHZ</span>
      </div>
    );
  }
  return (
    <div className="sensor-graphic">
      <div className="sensor-ring"><span /></div>
      <i className="sensor-beam sensor-beam-a" /><i className="sensor-beam sensor-beam-b" />
      <div className="sensor-label"><Zap size={18} /> EVENT DETECTED</div>
    </div>
  );
}

function TiltCard({ project, index }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(x, [-0.5, 0.5], ["18%", "82%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["18%", "82%"]);

  const handleMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width - 0.5);
    y.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.article
      className={`project-card project-card-${project.tone} project-card-${index + 1} reveal`}
      style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformPerspective: 1100 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={reduceMotion ? undefined : { y: -12, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
    >
      <motion.div className="card-glow" style={{ left: glowX, top: glowY }} />
      <motion.div
        className="project-graphic"
        animate={reduceMotion ? undefined : { y: [0, -7, 0], rotateZ: [0, index % 2 ? -0.7 : 0.7, 0] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        <ProjectGraphic type={project.visual} />
      </motion.div>
      <div className="project-case-number">{project.number}</div>
      <div className="project-case-label"><i /> Case · {project.category}</div>
      <div className="project-card-copy">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-result">
        <span>Key result</span><strong>{project.impact}</strong>
      </div>
      <div className="tags project-tags">
        {project.tools.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}
      </div>
      <div className="project-card-bottom">
        <span>View case <ArrowUpRight size={14} /></span>
        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
            <ArrowUpRight size={20} />
          </a>
        ) : <Github size={19} aria-hidden="true" />}
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-shell">
        <div className="module-heading reveal">
          <div className="section-kicker"><span>03</span><i /><span>Projects</span></div>
          <h2>My <em>Projects</em></h2>
          <p>Selected engineering work demonstrating practical systems and well-architected implementations.</p>
          <div className="filter-pills" aria-label="Project categories">
            <span className="active">All</span><span>Hardware</span><span>Embedded</span>
          </div>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => <TiltCard project={project} index={index} key={project.title} />)}
        </div>
        <div className="github-row reveal">
          <p>More experiments, coursework, and embedded builds live on GitHub.</p>
          <MagneticLink className="round-link round-link-light" href="https://github.com/mdshad10" target="_blank" rel="noreferrer">
            Explore GitHub <Github size={18} />
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience section-shell" id="experience">
      <div className="module-heading reveal">
        <div className="section-kicker"><span>04</span><i /><span>Experience</span></div>
        <h2>Professional <em>Experience</em></h2>
        <p>Research, teaching, and industry experience applying engineering theory to real systems.</p>
      </div>
      <div className="experience-timeline">
        {experience.map((item, index) => {
          const Icon = item.icon;
          return (
            <article className="timeline-item reveal" key={item.place}>
              <span className="timeline-dot" />
              <div className="timeline-meta">
                <span>0{index + 1}</span><span>{item.date}</span><span>{item.location}</span>
              </div>
              <div className="timeline-card">
                <div className="timeline-icon"><Icon size={22} /></div>
                <div>
                  <p>{item.type}</p>
                  <h3>{item.role}</h3>
                  <h4>@ {item.place}</h4>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="education-card reveal">
        <div className="education-icon"><GraduationCap size={32} /></div>
        <span className="eyebrow">Education</span>
        <div>
          <h3>Cornell University</h3>
          <p>B.S. Electrical & Computer Engineering</p>
        </div>
        <div className="education-meta"><span>Ithaca, New York</span><span>Embedded systems · Architecture · VLSI</span></div>
      </div>
    </section>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const activeSkills = skillCategories[activeCategory].items;

  return (
    <section className="skills" id="skills">
      <div className="section-shell skills-inner">
        <div className="module-heading reveal">
          <div className="section-kicker"><span>02</span><i /><span>Skills</span></div>
          <h2>Technical <em>Skills</em></h2>
          <p>Technologies and tools I use to move from architecture to working systems.</p>
        </div>

        <div className="skill-tabs reveal" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === index}
              className={activeCategory === index ? "active" : ""}
              onClick={() => setActiveCategory(index)}
              key={category.label}
            >
              {category.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="skill-card-grid"
            key={skillCategories[activeCategory].label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeSkills.map((skill, index) => (
              <article className="skill-card" key={skill.name}>
                <div className="skill-monogram">{skill.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}</div>
                <div className="skill-card-body">
                  <div><h3>{skill.name}</h3><span>0{index + 1}</span></div>
                  <div className="skill-meter"><i style={{ width: `${skill.score}%` }} /></div>
                  <p>{skill.level}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Contact() {
  const contactCards = [
    { label: "Email", value: "md04shad@gmail.com", icon: Mail, href: "mailto:md04shad@gmail.com" },
    { label: "GitHub", value: "github.com/mdshad10", icon: Github, href: "https://github.com/mdshad10" },
    { label: "Availability", value: "Open to engineering roles", icon: BriefcaseBusiness }
  ];

  return (
    <section className="contact section-shell" id="contact">
      <div className="module-heading reveal">
        <div className="section-kicker"><span>05</span><i /><span>Get in touch</span></div>
        <h2>Get In <em>Touch</em></h2>
        <p>Let’s talk about embedded systems, computer architecture, FPGA design, or your next engineering project.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-card-list">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            const content = (
              <article className="contact-info-card reveal">
                <div className="contact-info-icon"><Icon size={22} /></div>
                <span>0{index + 1}</span>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
              </article>
            );
            return card.href ? <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={card.label}>{content}</a> : <div key={card.label}>{content}</div>;
          })}
        </div>

        <div className="contact-message reveal">
          <span className="eyebrow">A direct line</span>
          <h3>Have an ambitious hardware problem?</h3>
          <p>
            I’m interested in engineering internships, research collaborations, and teams working on systems where hardware and software meet.
          </p>
          <MagneticLink className="contact-button" href="mailto:md04shad@gmail.com" aria-label="Email MD Shad">
            <Mail size={24} /><span>Send me an email</span><ArrowUpRight size={20} />
          </MagneticLink>
        </div>
      </div>
      <footer>
        <div><strong>MD Shad</strong><span>Electrical & Computer Engineer</span></div>
        <div><span><MapPin size={14} /> Ithaca, NY</span><a href="https://github.com/mdshad10" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </section>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const smoothX = useSpring(cursorX, { stiffness: 90, damping: 26 });
  const smoothY = useSpring(cursorY, { stiffness: 90, damping: 26 });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (event) => { cursorX.set(event.clientX); cursorY.set(event.clientY); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY]);

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 54,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true }
        });
      });
      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -Number(element.dataset.parallax || 0.05) * 100,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.8 }
        });
      });
      gsap.to(".rotating-mark", {
        rotate: 180,
        scrollTrigger: { trigger: ".intro", start: "top bottom", end: "bottom top", scrub: 1 }
      });
    }, rootRef);
    return () => context.revert();
  }, [reduceMotion]);

  return (
    <div ref={rootRef}>
      <Loader visible={loading} />
      <motion.div className="cursor-glow" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
