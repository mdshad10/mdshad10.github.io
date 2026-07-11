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
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
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

const skillGroups = [
  {
    number: "01",
    title: "Digital Hardware",
    detail: "Architecture, RTL, and implementation",
    skills: ["SystemVerilog", "VHDL", "FPGA", "RISC-V", "Pipelining", "Verification"]
  },
  {
    number: "02",
    title: "Embedded Systems",
    detail: "Firmware close to the metal",
    skills: ["C / C++", "RP2040", "STM32", "Interrupts", "SPI / I²C", "Real-time DSP"]
  },
  {
    number: "03",
    title: "Circuits & Software",
    detail: "Tools across the stack",
    skills: ["VLSI", "SPICE", "Python", "MATLAB", "React", "Git"]
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
            <span>MD</span>
            <i />
            <small>Engineer</small>
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
        <p className="header-role">Electrical & Computer Engineer</p>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
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

function OrbitPortrait() {
  const nodes = ["RTL", "FPGA", "C", "AI"];
  return (
    <motion.div
      className="portrait-orbit"
      initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      data-parallax="0.06"
    >
      <div className="orbit-ring orbit-ring-one" />
      <div className="orbit-ring orbit-ring-two" />
      <div className="portrait-frame">
        <img src="/assets/img/profilepic.png" alt="MD Shad, Electrical and Computer Engineer" />
      </div>
      {nodes.map((node, index) => (
        <motion.span
          className={`orbit-node orbit-node-${index + 1}`}
          key={node}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          {node}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
          >
            Hey there, I’m
          </motion.p>
          <h1 aria-label="MD Shad">
            {["MD", "SHAD"].map((line, index) => (
              <span className="hero-name-line" key={line}>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.18 + index * 0.11, duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="hero-title-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.65 }}
          >
            <span className="title-dot" />
            <h2>Electrical &amp; Computer Engineer</h2>
          </motion.div>
        </div>

        <OrbitPortrait />

        <motion.aside
          className="hero-aside"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.75, duration: 0.6 }}
        >
          <p>
            Cornell ECE student building intelligent hardware and software systems—from embedded firmware to AI accelerators.
          </p>
          <div className="hero-actions">
            <MagneticLink className="round-link round-link-accent" href="#projects">
              View work <ArrowDown size={18} />
            </MagneticLink>
            <MagneticLink className="text-link" href="mailto:md04shad@gmail.com">
              Get in touch <ArrowUpRight size={16} />
            </MagneticLink>
          </div>
        </motion.aside>
      </div>

      <motion.div
        className="hero-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>Based in Ithaca, NY</span>
        <span>Available for engineering opportunities</span>
        <a href="#about">Scroll to explore <ArrowDown size={14} /></a>
      </motion.div>
    </section>
  );
}

function Intro() {
  const metrics = [
    ["100+", "Students mentored"],
    ["400+", "Fiber sites analyzed"],
    ["5", "Pipeline stages"],
    ["16", "TPU processing elements"]
  ];

  return (
    <section className="intro section-shell" id="about">
      <div className="section-top reveal">
        <span className="eyebrow">01 / Profile</span>
        <span className="eyebrow">Hardware × Software</span>
      </div>
      <div className="intro-grid">
        <div className="intro-heading reveal">
          <span className="rotating-mark"><Cpu size={28} /></span>
          <h2>I engineer at the boundary between <em>architecture</em> and implementation.</h2>
        </div>
        <div className="intro-copy reveal">
          <p>
            My work spans computer architecture, embedded systems, FPGA design, AI accelerators, and VLSI. I care about measurable performance, clear interfaces, and hardware that is as readable as it is fast.
          </p>
          <a className="text-link" href="#experience">Read my résumé <ArrowDown size={16} /></a>
        </div>
      </div>
      <div className="metric-grid">
        {metrics.map(([value, label]) => (
          <article className="metric-card reveal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
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
      <div className="project-card-top">
        <span>{project.number}</span>
        <span>{project.category}</span>
        <span>{project.period}</span>
      </div>
      <motion.div
        className="project-graphic"
        animate={reduceMotion ? undefined : { y: [0, -7, 0], rotateZ: [0, index % 2 ? -0.7 : 0.7, 0] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        <ProjectGraphic type={project.visual} />
      </motion.div>
      <div className="project-card-copy">
        <div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <div className="project-impact">
          <span className="eyebrow">Key result</span>
          <strong>{project.impact}</strong>
        </div>
      </div>
      <ul className="project-bullets">
        {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
      <div className="project-card-bottom">
        <div className="tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
            <ArrowUpRight size={20} />
          </a>
        ) : <span className="card-status">Selected work</span>}
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-shell">
        <div className="section-top section-top-light reveal">
          <span className="eyebrow">02 / Selected projects</span>
          <span className="eyebrow">Move your cursor over the work</span>
        </div>
        <div className="projects-heading reveal">
          <h2>Engineering work,<br /><em>in motion.</em></h2>
          <p>
            Four systems that show how I reason about datapaths, timing, firmware, signal processing, and the interfaces between them.
          </p>
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
      <div className="section-top reveal">
        <span className="eyebrow">03 / Experience</span>
        <span className="eyebrow">Résumé snapshot</span>
      </div>
      <div className="experience-heading reveal">
        <h2>Experience that connects theory with <em>real systems.</em></h2>
        <p>Research, teaching, and industry work—organized for a fast, recruiter-friendly read.</p>
      </div>
      <div className="experience-list">
        {experience.map((item, index) => {
          const Icon = item.icon;
          return (
            <article className="experience-row reveal" key={item.place}>
              <span className="experience-number">0{index + 1}</span>
              <div className="experience-type"><Icon size={20} /><span>{item.type}</span></div>
              <div className="experience-position">
                <h3>{item.place}</h3>
                <p>{item.role}</p>
              </div>
              <div className="experience-meta"><span>{item.date}</span><span>{item.location}</span></div>
              <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
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
  return (
    <section className="skills" id="skills">
      <div className="section-shell skills-inner">
        <div className="section-top section-top-light reveal">
          <span className="eyebrow">04 / Technical toolkit</span>
          <span className="eyebrow">From RTL to application code</span>
        </div>
        <div className="skills-layout">
          <div className="skills-title reveal">
            <h2>What I build <em>with.</em></h2>
            <div className="skills-orb" aria-hidden="true"><Cpu size={46} /></div>
          </div>
          <div className="skill-list">
            {skillGroups.map((group) => (
              <article className="skill-row reveal" key={group.title}>
                <span>{group.number}</span>
                <div><h3>{group.title}</h3><p>{group.detail}</p></div>
                <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-shell" id="contact">
      <div className="contact-top reveal">
        <span className="eyebrow">05 / Contact</span>
        <div className="availability"><i /> Open to opportunities</div>
      </div>
      <div className="contact-main reveal">
        <p>Have an ambitious hardware problem?</p>
        <h2>Let’s build<br /><em>something real.</em></h2>
        <MagneticLink className="contact-button" href="mailto:md04shad@gmail.com" aria-label="Email MD Shad">
          <Mail size={28} /><span>Start a conversation</span><ArrowUpRight size={22} />
        </MagneticLink>
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
    const timer = window.setTimeout(() => setLoading(false), 850);
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
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
