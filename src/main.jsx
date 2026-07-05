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
  ArrowDown,
  ArrowUpRight,
  Binary,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Github,
  Mail,
  Menu,
  Radio,
  X,
  Zap
} from "lucide-react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    eyebrow: "RESEARCH · FPGA · AI",
    title: "Systolic TPU Accelerator",
    description:
      "A 4×4 systolic-array accelerator with a custom ISA for neural-network forward and backward passes. The architecture integrates multiply-accumulate, bias, and Leaky ReLU units with double-buffered weight loading.",
    tags: ["SystemVerilog", "FPGA", "Custom ISA"],
    metric: "4 × 4",
    metricLabel: "systolic array",
    visual: "systolic"
  },
  {
    number: "02",
    eyebrow: "COMPUTER ARCHITECTURE",
    title: "TinyRV2 Pipelined Processor",
    description:
      "A 32-bit, five-stage RISC-V processor with structural datapath, control logic, and full bypassing from execute, memory, and writeback stages to reduce stalls and improve CPI.",
    tags: ["RISC-V", "SystemVerilog", "Pipelining"],
    metric: "5",
    metricLabel: "pipeline stages",
    visual: "pipeline"
  },
  {
    number: "03",
    eyebrow: "EMBEDDED AUDIO",
    title: "Birdsong Synthesizer",
    description:
      "Real-time Northern Cardinal call synthesis on the RP2040 using direct digital synthesis, ADSR envelope shaping, fixed-point arithmetic, timer interrupts, and an SPI-driven DAC.",
    tags: ["RP2040", "Embedded C", "DSP"],
    metric: "RT",
    metricLabel: "audio synthesis",
    visual: "wave"
  },
  {
    number: "04",
    eyebrow: "REAL-TIME SYSTEMS",
    title: "Smart Scoring System",
    description:
      "An infrared-sensor basketball scoring system driven by an interrupt-based finite state machine, with debouncing, precise timing, and multimodal feedback across LCD, LEDs, and audio.",
    tags: ["FRDM-KL46Z", "C", "Sensors"],
    metric: "ISR",
    metricLabel: "event driven",
    visual: "radar",
    href: "https://github.com/mdshad10/Smart-Basketball-Hoop-Embedded-Systems"
  }
];

const experience = [
  {
    date: "AUG 2025 — PRESENT",
    role: "Research Assistant",
    company: "Zhang Research Group · Cornell",
    detail:
      "Designing an FPGA-based TPU architecture, its compute pipeline, buffering strategy, and hardware/software interface."
  },
  {
    date: "JAN 2025 — PRESENT",
    role: "Teaching Assistant",
    company: "Cornell ECE",
    detail:
      "Mentoring 100+ students in RTL design, computer organization, FPGA prototyping, VHDL synthesis, timing, and area analysis."
  },
  {
    date: "MAY 2025 — AUG 2025",
    role: "Electrical Engineering Intern",
    company: "Charter Communications · Spectrum",
    detail:
      "Improved monitoring and reliability across 400+ fiber sites and built an XGBoost-based fraud detection concept."
  },
  {
    date: "JAN 2025 — PRESENT",
    role: "Hardware Engineer",
    company: "Engineers Without Borders",
    detail:
      "Building and testing motor-control electronics, wiring harnesses, PCB assemblies, encoders, servos, and LED systems."
  }
];

const capabilities = [
  {
    icon: Cpu,
    title: "Computer Architecture",
    copy: "RISC-V processors, pipelined datapaths, hazard resolution, custom accelerators, and memory hierarchies.",
    tools: "SystemVerilog · VHDL · Quartus"
  },
  {
    icon: CircuitBoard,
    title: "Embedded Systems",
    copy: "Interrupt-driven firmware, real-time state machines, sensor interfaces, fixed-point DSP, and hardware bring-up.",
    tools: "C/C++ · RP2040 · STM32"
  },
  {
    icon: BrainCircuit,
    title: "AI Hardware",
    copy: "Systolic arrays, MAC pipelines, FPGA prototyping, on-chip buffering, and efficient data movement.",
    tools: "RTL · FPGA · Python"
  },
  {
    icon: Zap,
    title: "VLSI & Circuits",
    copy: "Digital logic, transistor-level analysis, current mirrors, amplifier design, timing, and area optimization.",
    tools: "Cadence · SPICE · MATLAB"
  }
];

function MagneticLink({ children, className = "", ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
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
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="loader-mark">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              MD
            </motion.span>
            <motion.div
              className="loader-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: "easeInOut" }}
            />
            <motion.small
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              ENGINEERING INTELLIGENCE
            </motion.small>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["About", "Projects", "Experience", "Contact"];

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.55, duration: 0.65 }}
      >
        <a className="brand" href="#top" aria-label="MD Shad home">
          <span className="brand-symbol">M/</span>
          <span className="brand-name">MD SHAD</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
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
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(145% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.06 }}
              >
                <span>0{index + 1}</span>
                {link}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroVisual() {
  const floatTransition = {
    duration: 4.6,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut"
  };

  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.65, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="portrait-shell" data-parallax="0.09">
        <div className="portrait-grid" aria-hidden="true" />
        <img
          src="/assets/img/profilepic.png"
          alt="MD Shad, Electrical and Computer Engineering student"
        />
        <div className="portrait-scan" aria-hidden="true" />
        <div className="portrait-label">
          <span>MD SHAD</span>
          <span>ITHACA, NY · 42.443° N</span>
        </div>
      </div>
      <motion.div
        className="orbit orbit-one"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbit orbit-two"
        animate={{ rotate: -360 }}
        transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="float-chip chip-one"
        animate={{ y: [-7, 8], rotate: [-2, 2] }}
        transition={floatTransition}
      >
        <Cpu size={18} />
        <span>FPGA</span>
      </motion.div>
      <motion.div
        className="float-chip chip-two"
        animate={{ y: [8, -8], rotate: [2, -2] }}
        transition={{ ...floatTransition, delay: 0.7 }}
      >
        <Binary size={18} />
        <span>RTL</span>
      </motion.div>
      <motion.div
        className="float-chip chip-three"
        animate={{ y: [-5, 10], rotate: [-1, 3] }}
        transition={{ ...floatTransition, delay: 1.2 }}
      >
        <BrainCircuit size={18} />
        <span>AI</span>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const title = ["Building", "Intelligent", "Hardware &", "Software Systems."];

  return (
    <section className="hero" id="top">
      <div className="hero-grid-lines" aria-hidden="true" />
      <motion.div
        className="aurora aurora-one"
        animate={{
          x: ["-8%", "8%", "-8%"],
          y: ["0%", "9%", "0%"],
          scale: [1, 1.12, 1]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora aurora-two"
        animate={{
          x: ["7%", "-6%", "7%"],
          y: ["5%", "-8%", "5%"],
          scale: [1.1, 0.94, 1.1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="hero-copy">
        <motion.div
          className="hero-kicker"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.62 }}
        >
          <span className="status-dot" />
          AVAILABLE FOR 2026 OPPORTUNITIES
        </motion.div>
        <h1>
          {title.map((line, lineIndex) => (
            <span className="title-line" key={line}>
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 1.56 + lineIndex * 0.1,
                  duration: 0.78,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={lineIndex === 1 ? "accent-word" : ""}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.02, duration: 0.65 }}
        >
          Electrical &amp; Computer Engineering student at Cornell University
          focused on embedded systems, computer architecture, FPGA design, AI
          accelerators, and VLSI.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.14, duration: 0.6 }}
        >
          <MagneticLink className="button button-primary" href="#projects">
            View projects <ArrowDown size={17} />
          </MagneticLink>
          <MagneticLink className="button button-ghost" href="#contact">
            Contact me <ArrowUpRight size={17} />
          </MagneticLink>
        </motion.div>
      </div>
      <HeroVisual />
      <motion.a
        className="scroll-cue"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.45 }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.i
          animate={{ scaleY: [0.3, 1, 0.3], y: [-5, 6, -5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.a>
      <div className="hero-index" aria-hidden="true">
        <span>PORTFOLIO / 2026</span>
        <span>ECE · CORNELL</span>
      </div>
    </section>
  );
}

function ProjectVisual({ type }) {
  if (type === "systolic") {
    return (
      <div className="visual-stage systolic-visual" aria-hidden="true">
        <div className="node-matrix">
          {Array.from({ length: 16 }).map((_, index) => (
            <motion.i
              key={index}
              animate={{ opacity: [0.28, 1, 0.28] }}
              transition={{
                duration: 2.2,
                delay: index * 0.08,
                repeat: Infinity
              }}
            />
          ))}
        </div>
        <span className="visual-code">MAC_ARRAY[3:0][3:0]</span>
      </div>
    );
  }

  if (type === "pipeline") {
    return (
      <div className="visual-stage pipeline-visual" aria-hidden="true">
        <div className="pipeline-track">
          {["IF", "ID", "EX", "MEM", "WB"].map((stage, index) => (
            <div key={stage}>
              <motion.span
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 2.5,
                  delay: index * 0.24,
                  repeat: Infinity
                }}
              >
                {stage}
              </motion.span>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 560 140" preserveAspectRatio="none">
          <motion.path
            d="M10 100 C120 100, 110 24, 220 24 S330 100, 430 42 S500 78, 550 20"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
          />
        </svg>
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="visual-stage wave-visual" aria-hidden="true">
        <svg viewBox="0 0 600 180" preserveAspectRatio="none">
          {[0, 1, 2].map((item) => (
            <motion.path
              key={item}
              d="M0 90 C50 20, 100 160, 150 90 S250 20, 300 90 S400 160, 450 90 S550 20, 600 90"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 - item * 0.25 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: item * 0.18 }}
              style={{ transform: `translateY(${item * 18 - 18}px)` }}
            />
          ))}
        </svg>
        <span className="visual-code">DDS / ADSR / 44.1kHz</span>
      </div>
    );
  }

  return (
    <div className="visual-stage radar-visual" aria-hidden="true">
      <div className="radar-ring ring-a" />
      <div className="radar-ring ring-b" />
      <div className="radar-ring ring-c" />
      <motion.div
        className="radar-sweep"
        animate={{ rotate: 360 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.i
        animate={{ scale: [0.7, 1.5, 0.7], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card reveal-section">
      <div className="project-topline">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
      </div>
      <ProjectVisual type={project.visual} />
      <div className="project-content">
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-aside">
          <div className="project-metric">
            <strong>{project.metric}</strong>
            <span>{project.metricLabel}</span>
          </div>
          {project.href && (
            <a
              className="project-link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={17} /> Source <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const glowX = useSpring(mouseX, { stiffness: 75, damping: 24 });
  const glowY = useSpring(mouseY, { stiffness: 75, damping: 24 });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const moveGlow = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("pointermove", moveGlow, { passive: true });
    return () => window.removeEventListener("pointermove", moveGlow);
  }, [mouseX, mouseY]);

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray(".reveal-section").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true
          }
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        const amount = Number(element.dataset.parallax || 0.08);
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
          duration: 1.8,
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

      gsap.from(".experience-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-list",
          start: "top 75%",
          end: "bottom 75%",
          scrub: 0.5
        }
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

        <section className="intro-section section-shell" id="about">
          <div className="section-index reveal-section">
            <span>01 / ABOUT</span>
            <span>SYSTEMS, FROM TRANSISTORS TO SOFTWARE</span>
          </div>
          <div className="intro-statement reveal-section">
            <p className="micro-label">ENGINEERING POINT OF VIEW</p>
            <h2>
              I build at the boundary where <em>hardware decisions</em> become
              real-world capability.
            </h2>
          </div>
          <div className="intro-grid">
            <p className="reveal-section">
              I’m MD Shad, an Electrical &amp; Computer Engineering student at
              Cornell University. My work moves between RTL, firmware, circuits,
              and machine learning—with a bias toward systems that can be
              measured, tested, and deployed.
            </p>
            <p className="reveal-section">
              From pipelined RISC-V processors to real-time embedded audio and
              FPGA AI accelerators, I care about the architecture underneath the
              interface: how data moves, where time goes, and what the hardware
              makes possible.
            </p>
          </div>
        </section>

        <section className="metrics-band">
          <div className="metric-item reveal-section">
            <strong>
              <span className="counter-value" data-count="100">0</span>+
            </strong>
            <p>Students mentored in digital design</p>
          </div>
          <div className="metric-item reveal-section">
            <strong>
              <span className="counter-value" data-count="400">0</span>+
            </strong>
            <p>Fiber network sites analyzed</p>
          </div>
          <div className="metric-item reveal-section">
            <strong>
              <span className="counter-value" data-count="5">0</span>
            </strong>
            <p>Stages in the TinyRV2 pipeline</p>
          </div>
          <div className="metric-item reveal-section">
            <strong>
              <span className="counter-value" data-count="16">0</span>
            </strong>
            <p>Processing elements in the TPU array</p>
          </div>
        </section>

        <section className="projects-section section-shell" id="projects">
          <div className="section-heading reveal-section">
            <div>
              <span className="micro-label">02 / SELECTED WORK</span>
              <h2>Engineered to<br />move data.</h2>
            </div>
            <p>
              Selected work across processor architecture, AI acceleration,
              embedded systems, and real-time sensing.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="more-work reveal-section">
            <p>
              Also built: analog FET amplifiers, an 8TB e-waste NAS, an XGBoost
              fraud-detection concept, and network power-monitoring systems.
            </p>
            <MagneticLink
              href="https://github.com/mdshad10"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Explore GitHub <ArrowUpRight size={16} />
            </MagneticLink>
          </div>
        </section>

        <section className="capabilities-section section-shell">
          <div className="section-index reveal-section">
            <span>03 / CAPABILITIES</span>
            <span>WHAT I WORK ACROSS</span>
          </div>
          <div className="capabilities-grid">
            {capabilities.map(({ icon: Icon, title, copy, tools }, index) => (
              <motion.article
                className="capability-card reveal-section"
                key={title}
                whileHover={reduceMotion ? {} : { y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="capability-card-top">
                  <Icon size={25} strokeWidth={1.5} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <small>{tools}</small>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="experience-section section-shell" id="experience">
          <div className="experience-heading reveal-section">
            <span className="micro-label">04 / EXPERIENCE</span>
            <h2>Learning by<br />building.</h2>
            <p>
              Research, teaching, industry, and project-team work—all connected
              by a curiosity for how complex systems behave.
            </p>
          </div>
          <div className="experience-list">
            <div className="experience-line" aria-hidden="true" />
            {experience.map((item) => (
              <article className="experience-item reveal-section" key={`${item.company}-${item.role}`}>
                <i aria-hidden="true" />
                <span className="experience-date">{item.date}</span>
                <div>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                </div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <motion.div
            className="contact-orb"
            aria-hidden="true"
            animate={{
              scale: [0.9, 1.12, 0.9],
              opacity: [0.35, 0.6, 0.35],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="contact-inner section-shell reveal-section">
            <span className="micro-label">05 / START A CONVERSATION</span>
            <h2>Let’s build something<br /><em>that computes.</em></h2>
            <p>
              I’m open to engineering internships, research collaborations, and
              conversations about hardware, architecture, and intelligent systems.
            </p>
            <MagneticLink
              className="contact-button"
              href="mailto:md04shad@gmail.com"
            >
              <Mail size={20} />
              md04shad@gmail.com
              <ArrowUpRight size={19} />
            </MagneticLink>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>MD SHAD</strong>
          <span>Electrical &amp; Computer Engineer</span>
        </div>
        <div className="footer-meta">
          <span>ITHACA, NY</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="footer-links">
          <a href="mailto:md04shad@gmail.com" aria-label="Email MD Shad">
            <Mail size={17} /> Email
          </a>
          <a
            href="https://github.com/mdshad10"
            target="_blank"
            rel="noreferrer"
            aria-label="MD Shad on GitHub"
          >
            <Github size={17} /> GitHub
          </a>
          <a href="#top">
            Back to top <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
