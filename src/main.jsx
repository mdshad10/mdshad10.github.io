import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Radio,
  Sparkles,
  X
} from "lucide-react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "work", href: "#projects" },
  { label: "resume", href: "#resume" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" }
];

const quickFacts = [
  { value: "Cornell", label: "Electrical & Computer Engineering" },
  { value: "FPGA", label: "AI accelerators and custom hardware" },
  { value: "RTL", label: "SystemVerilog, VHDL, computer architecture" },
  { value: "Embedded", label: "real-time firmware, sensors, DSP" }
];

const focusAreas = [
  "Computer Architecture",
  "Embedded Systems",
  "FPGA Design",
  "AI Accelerators",
  "VLSI and Circuits",
  "Hardware/Software Interfaces"
];

const metrics = [
  { value: 100, suffix: "+", label: "students mentored in digital design" },
  { value: 400, suffix: "+", label: "fiber sites analyzed in industry work" },
  { value: 5, suffix: "", label: "stage RISC-V pipeline implemented" },
  { value: 16, suffix: "", label: "processing elements in TPU array" }
];

const projects = [
  {
    number: "01",
    type: "Research / FPGA / AI",
    title: "Systolic TPU Accelerator",
    summary:
      "Designed a 4x4 systolic-array accelerator and custom ISA for neural-network forward and backward passes.",
    details: [
      "Integrated MAC, bias, and Leaky ReLU units into a clean compute pipeline.",
      "Built double-buffered weight loading to reduce stalls and clarify data movement.",
      "Focused the architecture around measurable throughput and FPGA feasibility."
    ],
    tools: ["SystemVerilog", "FPGA", "Python", "Custom ISA"],
    signal: "4x4 array",
    icon: BrainCircuit
  },
  {
    number: "02",
    type: "Computer Architecture",
    title: "TinyRV2 Pipelined Processor",
    summary:
      "Implemented a 32-bit, five-stage RISC-V processor with bypassing and stall control.",
    details: [
      "Built structural datapath and control logic across IF, ID, EX, MEM, and WB stages.",
      "Added forwarding from execute, memory, and writeback to improve CPI.",
      "Validated pipeline behavior through targeted tests and timing-aware debugging."
    ],
    tools: ["RISC-V", "SystemVerilog", "Pipelining", "RTL"],
    signal: "5 stages",
    icon: Cpu
  },
  {
    number: "03",
    type: "Embedded Audio",
    title: "Birdsong Synthesizer",
    summary:
      "Created a real-time Northern Cardinal call synthesizer on the RP2040 microcontroller.",
    details: [
      "Used direct digital synthesis, ADSR envelopes, and fixed-point arithmetic.",
      "Drove audio through timer interrupts and an SPI-connected DAC.",
      "Balanced signal quality, memory use, and predictable interrupt timing."
    ],
    tools: ["RP2040", "Embedded C", "DSP", "SPI"],
    signal: "real time",
    icon: Radio
  },
  {
    number: "04",
    type: "Real-Time Systems",
    title: "Smart Basketball Scoring System",
    summary:
      "Built an infrared-sensor scoring system using an interrupt-driven finite-state machine.",
    details: [
      "Implemented debouncing, timing windows, and multimodal LCD, LED, and audio feedback.",
      "Designed for reliable event detection instead of brittle polling behavior.",
      "Packaged the project with clear firmware structure and hardware assumptions."
    ],
    tools: ["FRDM-KL46Z", "C", "Sensors", "FSM"],
    signal: "event driven",
    href: "https://github.com/mdshad10/Smart-Basketball-Hoop-Embedded-Systems",
    icon: CircuitBoard
  }
];

const resumeBlocks = [
  {
    label: "Education",
    icon: GraduationCap,
    title: "Cornell University",
    subtitle: "B.S. Electrical & Computer Engineering",
    meta: "Ithaca, NY",
    bullets: [
      "Coursework and project work across digital design, computer architecture, embedded systems, circuits, and machine learning.",
      "Strong interest in AI hardware, VLSI, processor design, and production-quality firmware."
    ]
  },
  {
    label: "Research",
    icon: BrainCircuit,
    title: "Zhang Research Group",
    subtitle: "Research Assistant",
    meta: "Aug 2025 - Present",
    bullets: [
      "Designing an FPGA-based TPU architecture, compute pipeline, buffering strategy, and host interface.",
      "Exploring hardware/software tradeoffs for efficient neural-network execution."
    ]
  },
  {
    label: "Teaching",
    icon: BookOpen,
    title: "Cornell ECE",
    subtitle: "Teaching Assistant",
    meta: "Jan 2025 - Present",
    bullets: [
      "Mentoring 100+ students in RTL design, FPGA prototyping, VHDL synthesis, timing, and area analysis.",
      "Helping students debug the gap between intended logic and synthesized hardware."
    ]
  },
  {
    label: "Industry",
    icon: Sparkles,
    title: "Charter Communications / Spectrum",
    subtitle: "Electrical Engineering Intern",
    meta: "May 2025 - Aug 2025",
    bullets: [
      "Improved network monitoring and reliability workflows across 400+ fiber sites.",
      "Built an XGBoost-based fraud-detection concept and analyzed power telemetry."
    ]
  }
];

const skills = [
  {
    title: "Hardware",
    items: ["SystemVerilog", "VHDL", "FPGA", "RISC-V", "VLSI", "SPICE"]
  },
  {
    title: "Firmware",
    items: ["C/C++", "RP2040", "STM32", "Interrupts", "SPI/I2C", "DSP"]
  },
  {
    title: "Software",
    items: ["Python", "React", "MATLAB", "Git", "Testing", "Data analysis"]
  }
];

function MagneticLink({ children, className = "", ...props }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  const handleMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.14);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.14);
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
  const letters = ["M", "D", "S", "H", "A", "D"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="loader-letters" aria-label="MD Shad">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: index * 0.07, duration: 0.65 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
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
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.65, ease: "easeOut" }}
      >
        <a className="wordmark" href="#top" aria-label="MD Shad home">
          md shad
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <span>0{index + 1}</span>
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hello-word" aria-hidden="true">
        {["H", "E", "L", "L", "O"].map((letter, index) => (
          <motion.span
            key={letter + index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.06 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="hero-kicker"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.55 }}
      >
        Welcome to the resume portfolio of
      </motion.p>

      <div className="hero-layout">
        <motion.aside
          className="hero-identity"
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.55, duration: 0.6 }}
        >
          <span>MD</span>
          <span>SHAD</span>
        </motion.aside>

        <div className="hero-main">
          <h1>
            {[
              <span key="line-1">
                Engineer <em>of</em>
              </span>,
              <span key="line-2">intelligent hardware</span>,
              <span key="line-3">& software systems</span>
            ].map((line, index) => (
              <span className="title-line" key={index}>
                <motion.span
                  initial={{ y: "116%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 1.42 + index * 0.1,
                    duration: 0.78,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-summary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.62 }}
          >
            Electrical & Computer Engineering student at Cornell University
            focused on embedded systems, computer architecture, FPGA design, AI
            accelerators, and VLSI.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.06, duration: 0.62 }}
          >
            <MagneticLink className="button button-dark" href="#projects">
              View projects <ArrowDownRight size={17} />
            </MagneticLink>
            <MagneticLink className="button button-light" href="#contact">
              Contact me <ArrowUpRight size={17} />
            </MagneticLink>
          </motion.div>
        </div>

        <motion.aside
          className="hero-meta"
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.62, duration: 0.6 }}
        >
          <span>Selected engineering work</span>
          <span>2024-2026</span>
        </motion.aside>
      </div>

      <div className="hero-media">
        <motion.figure
          className="media-card portrait-card"
          data-parallax="0.06"
          initial={{ opacity: 0, y: 44, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ delay: 2.16, duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/assets/img/profilepic.png"
            alt="MD Shad, Electrical and Computer Engineering student"
          />
          <figcaption>
            <span>MD Shad</span>
            <span>Electrical & Computer Engineering</span>
          </figcaption>
        </motion.figure>

        <motion.div
          className="media-card systems-card"
          data-parallax="-0.04"
          initial={{ opacity: 0, y: 44, rotate: 1.2 }}
          animate={{ opacity: 1, y: 0, rotate: 1.2 }}
          transition={{ delay: 2.26, duration: 0.82, ease: "easeOut" }}
        >
          <div className="systems-grid" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <motion.i
                key={index}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 2.4,
                  delay: index * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <span className="systems-tag">FPGA / RTL / Embedded C</span>
          <strong>Hardware that is readable, testable, and fast.</strong>
        </motion.div>
      </div>

      <motion.a
        className="scroll-cue"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.45 }}
      >
        Scroll
        <span />
      </motion.a>
    </section>
  );
}

function About() {
  return (
    <section className="focus-section" id="about">
      <div className="section-shell focus-grid">
        <div className="section-index reveal">
          <span>01 / About</span>
          <span>Systems from transistors to software</span>
        </div>

        <div className="focus-copy reveal">
          <p className="small-label">My focus</p>
          <h2>
            Building thoughtful engineering systems rooted in architecture,
            measurement, and clear tradeoffs.
          </h2>
          <p>
            I like work where hardware constraints matter: timing paths, memory
            movement, interrupt latency, datapath shape, analog behavior, and
            the software interfaces that make those systems usable.
          </p>
        </div>

        <div className="focus-list reveal">
          <p className="small-label">What I work across</p>
          <ul>
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function QuickFacts() {
  return (
    <section className="facts-strip" aria-label="Quick facts">
      {quickFacts.map((fact) => (
        <article className="fact-card reveal" key={fact.value}>
          <strong>{fact.value}</strong>
          <span>{fact.label}</span>
        </article>
      ))}
    </section>
  );
}

function Metrics() {
  return (
    <section className="metrics section-shell" aria-label="Portfolio metrics">
      {metrics.map((metric) => (
        <article className="metric reveal" key={metric.label}>
          <strong>
            <span className="counter-value" data-count={metric.value}>
              0
            </span>
            {metric.suffix}
          </strong>
          <p>{metric.label}</p>
        </article>
      ))}
    </section>
  );
}

function ProjectRow({ project }) {
  const Icon = project.icon;

  return (
    <article className="project-row reveal">
      <div className="project-number">{project.number}</div>
      <div className="project-visual" aria-hidden="true">
        <Icon size={46} strokeWidth={1.3} />
        <span>{project.signal}</span>
      </div>
      <div className="project-body">
        <div className="project-type">{project.type}</div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul>
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="project-side">
        <div className="tag-list">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} source`}
          >
            Source <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects section-shell" id="projects">
      <div className="section-index reveal">
        <span>02 / Work</span>
        <span>Selected projects</span>
      </div>

      <div className="projects-heading reveal">
        <p className="small-label">Readable engineering portfolio</p>
        <h2>
          Selected work that shows the architecture, implementation, and result.
        </h2>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>

      <div className="more-work reveal">
        <p>
          Additional work includes analog FET amplifiers, an 8TB e-waste NAS,
          network power monitoring, and an XGBoost fraud-detection concept.
        </p>
        <MagneticLink
          href="https://github.com/mdshad10"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Explore GitHub <Github size={16} />
        </MagneticLink>
      </div>
    </section>
  );
}

function ResumeBlock({ block }) {
  const Icon = block.icon;

  return (
    <article className="resume-block reveal">
      <div className="resume-icon">
        <Icon size={23} strokeWidth={1.5} />
      </div>
      <div>
        <p className="resume-label">{block.label}</p>
        <h3>{block.title}</h3>
        <h4>{block.subtitle}</h4>
      </div>
      <span className="resume-meta">{block.meta}</span>
      <ul>
        {block.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function Resume() {
  return (
    <section className="resume section-shell" id="resume">
      <div className="section-index reveal">
        <span>03 / Resume</span>
        <span>Education, research, teaching, industry</span>
      </div>

      <div className="resume-heading reveal">
        <h2>Resume snapshot</h2>
        <p>
          Structured for fast reading: where I study, what I am building, and
          where I have applied the work.
        </p>
      </div>

      <div className="resume-list">
        {resumeBlocks.map((block) => (
          <ResumeBlock key={`${block.label}-${block.title}`} block={block} />
        ))}
      </div>

      <div className="skills-panel reveal">
        <div>
          <p className="small-label">Toolkit</p>
          <h3>Comfortable moving between RTL, firmware, circuits, and software.</h3>
        </div>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-group" key={group.title}>
              <h4>{group.title}</h4>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-shell contact-inner reveal">
        <p className="small-label">See you</p>
        <h2>Thank you</h2>
        <p>
          I am open to engineering internships, research collaborations, and
          conversations about computer architecture, embedded systems, and AI
          hardware.
        </p>
        <div className="contact-actions">
          <MagneticLink className="button button-dark" href="mailto:md04shad@gmail.com">
            <Mail size={18} /> Email me
          </MagneticLink>
          <MagneticLink
            className="button button-light"
            href="https://github.com/mdshad10"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} /> GitHub
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <strong>MD Shad</strong>
        <span>Electrical & Computer Engineering</span>
      </div>
      <div>
        <span>
          <MapPin size={14} /> Ithaca, NY
        </span>
        <span>Portfolio / {new Date().getFullYear()}</span>
      </div>
      <a href="#top">
        Back to top <ArrowUpRight size={15} />
      </a>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const glowX = useSpring(mouseX, { stiffness: 70, damping: 26 });
  const glowY = useSpring(mouseY, { stiffness: 70, damping: 26 });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateGlow = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("pointermove", updateGlow, { passive: true });
    return () => window.removeEventListener("pointermove", updateGlow);
  }, [mouseX, mouseY]);

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 44,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true
          }
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        const amount = Number(element.dataset.parallax || 0.04);
        gsap.to(element, {
          yPercent: -100 * amount,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      });

      gsap.utils.toArray(".counter-value").forEach((element) => {
        const target = Number(element.dataset.count);
        const value = { current: 0 };
        gsap.to(value, {
          current: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true
          },
          onUpdate: () => {
            element.textContent = Math.round(value.current);
          }
        });
      });
    }, rootRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <div ref={rootRef}>
      <Loader visible={loading} />
      <motion.div
        className="cursor-glow"
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <QuickFacts />
        <Metrics />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
