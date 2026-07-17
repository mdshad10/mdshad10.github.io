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
  BookOpen,
  BriefcaseBusiness,
  CircuitBoard,
  Cpu,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Radio,
  Zap
} from "lucide-react";
import heroImage from "../IMG_0005.JPG";
import fraudPresentationImage from "../assets/media/ai-fraud-presentation.png";
import profileImage from "../assets/img/profilepic.png";
import cornellSeal from "../assets/img/cornell-seal.svg";
import stuyvesantLogo from "../assets/img/stuyvesant-logo.svg";
import amdLogo from "../assets/img/amd-logo.png";
import spectrumLogo from "../assets/img/spectrum-logo.png";
import charterLogo from "../assets/img/charter-logo.png";
import experienceCornellLogo from "../assets/img/cornell-experience-logo.png";
import ewbCornellLogo from "../assets/img/ewb-cornell-logo.png";
import cslLogo from "../assets/img/csl-logo.png";
import fpgaDemo from "../assets/media/fpga-demo.mov";
import simulationDemo from "../assets/media/simulation-demo.mp4";
import "./styles.css";
import "./refinements.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Coursework", href: "#coursework" },
  { label: "Contact", href: "#contact" }
];

const heroMedia = [
  { type: "image", src: heroImage, label: "Systems Lab", format: "landscape", alt: "Md Shad collaborating on a desktop computer hardware build" },
  { type: "video", src: simulationDemo, label: "Architecture Simulation", format: "landscape" },
  { type: "image", src: fraudPresentationImage, label: "AI Fraud Presentation", format: "landscape", alt: "Md Shad presenting an AI fraud-prevention system at Spectrum" },
  { type: "video", src: fpgaDemo, label: "FPGA Prototype", format: "portrait" }
];

const projectCatalog = [
  {
    number: "01",
    rank: 5,
    title: "Hardware ODE Solver",
    category: "FPGA / Hardware–Software Co-Design",
    period: "Jan 2026 — Feb 2026",
    summary:
      "A fixed-point FPGA solver for the Lorenz system with HPS control and real-time VGA visualization.",
    impact: "Real-time chaotic-system integration",
    bullets: [
      "Implemented a synthesizable Euler-integration DDA core for three coupled differential equations.",
      "Added memory-mapped HPS controls for parameters, initial conditions, speed, pause, reset, and display management."
    ],
    tools: ["Verilog", "Cyclone V", "HPS", "VGA"],
    filters: ["FPGA"],
    image: "/assets/projects/hardware-ode-solver.jpg",
    imageAlt: "Lorenz attractors rendered by the hardware ODE solver",
    report: "/assets/reports/hardware-ode-solver.pdf",
    visual: "tpu",
    tone: "lime"
  },
  {
    number: "02",
    rank: 9,
    title: "Mandelbrot Set Visualizer",
    category: "Parallel FPGA Rendering",
    period: "Feb 2026 — Mar 2026",
    summary:
      "An interactive 640×480 Mandelbrot renderer using parallel fixed-point iterator pipelines and on-chip memory.",
    impact: "43 parallel iterators · 20 ms frame",
    bullets: [
      "Mapped concurrent iterators across DSP blocks and dedicated M10K memories to reduce contention.",
      "Built HPS-controlled pan and zoom with direct FPGA-to-VGA pixel output and performance monitoring."
    ],
    tools: ["Verilog", "Fixed-Point", "M10K", "VGA"],
    filters: ["FPGA"],
    image: "/assets/projects/mandelbrot-visualizer.jpg",
    imageAlt: "Mandelbrot set rendered on the FPGA-driven VGA display",
    report: "/assets/reports/mandelbrot-set-visualizer.pdf",
    visual: "cpu",
    tone: "violet"
  },
  {
    number: "03",
    rank: 10,
    title: "Multiprocessor Drum Synthesis",
    category: "FPGA Audio / Physical Modeling",
    period: "Mar 2026",
    summary:
      "A hardware-accelerated physical-modeling synthesizer that solves a damped 2D wave equation in real time.",
    impact: "12,800 nodes at 48 kHz",
    bullets: [
      "Parallelized column compute units using 1.17 fixed-point arithmetic, DSP blocks, and M10K memories.",
      "Streamed center-node amplitude to the onboard audio DAC for continuous synthesized drum output."
    ],
    tools: ["Verilog", "FPGA Audio", "DSP Blocks", "M10K"],
    filters: ["FPGA"],
    image: "/assets/projects/multiprocessor-drum-synthesis.jpg",
    imageAlt: "Labeled DE1-SoC controls for the multiprocessor drum synthesizer",
    report: "/assets/reports/multiprocessor-drum-synthesis.pdf",
    visual: "audio",
    tone: "orange"
  },
  {
    number: "04",
    rank: 1,
    title: "Ultra-Low-Latency Shack–Hartmann FPGA Reconstruction Engine",
    category: "Adaptive Optics / FPGA",
    period: "Jan 2026 — May 2026",
    summary:
      "An ultra-low-latency, fully streaming FPGA pipeline for real-time sensor-data reconstruction.",
    impact: "120 ns end-to-end latency",
    bullets: [
      "Built fixed-point datapaths with pipelined DSP blocks, BRAM, FSMs, and parallel compute architectures.",
      "Integrated DMA-based HPS–FPGA communication, TCP streaming, and deterministic validation at 50 MHz."
    ],
    tools: ["SystemVerilog", "Cyclone V", "DMA", "Fixed-Point DSP"],
    filters: ["FPGA"],
    image: "/assets/projects/shack-hartmann-diagnostics.png",
    imageAlt: "HCIPy and FPGA wavefront reconstruction diagnostic plots",
    website: "https://people.ece.cornell.edu/land/courses/ece5760/FinalProjects/s2026/sjb336_mss464_mjg397/sjb336_mss464_mjg397/sjb336_mss464_mjg397/index.html",
    visual: "tpu",
    tone: "lime"
  },
  {
    number: "05",
    rank: 3,
    title: "32 × 32 Ternary Content Addressable Memory (TCAM)",
    category: "Full-Custom VLSI",
    period: "Mar 2026 — May 2026",
    summary:
      "A 32×32-bit ternary content-addressable memory with fully parallel search and hierarchical priority encoding.",
    impact: "900 ps search latency",
    bullets: [
      "Designed ternary bitcells, dynamic matchlines, precharge circuitry, write drivers, and a 32-to-5 priority encoder.",
      "Verified schematic, extracted, timing, power, RC-delay, and matchline behavior."
    ],
    tools: ["VLSI", "Custom Layout", "SPICE", "Timing Analysis"],
    filters: ["VLSI"],
    image: "/assets/projects/tcam-top-level.png",
    imageAlt: "Top-level schematic for the 32 by 32 ternary content-addressable memory",
    report: "/assets/reports/tcam-final-project.pdf",
    visual: "cpu",
    tone: "violet"
  },
  {
    number: "06",
    rank: 2,
    title: "Multi-Core RISC-V System",
    category: "Computer Architecture",
    period: "Nov 2025 — Dec 2025",
    summary:
      "Single-core and four-core RISC-V systems with private L1 instruction caches and a shared banked L2 data cache.",
    impact: "Up to 2.38× speedup",
    bullets: [
      "Implemented shortest-path routing and round-robin arbitration on a ring interconnect.",
      "Developed C microbenchmarks to evaluate throughput, latency, scalability, and synchronization overhead."
    ],
    tools: ["RISC-V", "SystemVerilog", "Caches", "C"],
    filters: ["Computer Architecture"],
    image: "/assets/projects/multicore-riscv-system.png",
    imageAlt: "Four-core RISC-V memory and cache network architecture",
    report: "/assets/reports/multicore-riscv-system.pdf",
    visual: "sensor",
    tone: "orange"
  },
  {
    number: "07",
    rank: 4,
    title: "8×8 Mini-TPU",
    category: "AI Hardware / FPGA",
    period: "Research · 2025 — 2026",
    summary:
      "A scalable systolic-array accelerator and custom instruction interface for neural-network training and inference.",
    impact: "8×8 RTL compute array",
    bullets: [
      "Integrated pipelined MAC datapaths, activation logic, and on-chip buffering.",
      "Designed double-buffered weight loading across DRAM, BRAM, and local buffers."
    ],
    tools: ["SystemVerilog", "FPGA", "Python", "Custom ISA"],
    filters: ["FPGA", "Research"],
    visual: "tpu",
    tone: "blue"
  },
  {
    number: "08",
    rank: 6,
    title: "TinyRV2 Processor",
    category: "Computer Architecture",
    period: "Cornell ECE",
    summary:
      "A 32-bit, five-stage RISC-V processor with full bypassing, hazard detection, and stall control.",
    impact: "Five-stage pipelined datapath",
    bullets: [
      "Built the datapath and control across fetch, decode, execute, memory, and writeback.",
      "Validated forwarding, stalls, and hazards through targeted timing-aware tests."
    ],
    tools: ["RISC-V", "SystemVerilog", "RTL", "Verification"],
    filters: ["Computer Architecture"],
    image: "/assets/projects/tinyrv2-pipeline.png",
    imageAlt: "Five-stage TinyRV2 processor pipeline datapath with bypass paths",
    report: "/assets/reports/tinyrv2-pipelined-processor.pdf",
    visual: "cpu",
    tone: "violet"
  },
  {
    number: "09",
    rank: 15,
    title: "Birdsong Synthesizer",
    category: "Embedded Audio / DSP",
    period: "Real-Time Systems",
    summary:
      "A real-time Northern Cardinal call synthesizer running on an RP2040 microcontroller.",
    impact: "Interrupt-driven audio synthesis",
    bullets: [
      "Combined direct digital synthesis, ADSR envelopes, and fixed-point arithmetic.",
      "Drove an SPI DAC with deterministic timer interrupts."
    ],
    tools: ["RP2040", "Embedded C", "DSP", "SPI"],
    filters: ["Embedded Systems / Microcontrollers"],
    image: "/assets/projects/birdsong-synthesizer.png",
    imageAlt: "Spectrogram of a Northern Cardinal call used for the birdsong synthesizer",
    report: "/assets/reports/birdsong-synthesizer.pdf",
    visual: "audio",
    tone: "orange"
  },
  {
    number: "10",
    rank: 12,
    title: "Smart Basketball Hoop Scoring Tracker",
    category: "Embedded Sensing",
    period: "Hardware + Firmware",
    summary:
      "An infrared-sensor basketball scoring system built around an interrupt-driven finite-state machine.",
    impact: "Reliable event detection",
    bullets: [
      "Implemented debouncing, timing windows, and LCD, LED, and audio feedback.",
      "Designed deterministic sensor handling instead of polling."
    ],
    tools: ["FRDM-KL46Z", "C", "Sensors", "FSM"],
    filters: ["Embedded Systems / Microcontrollers"],
    image: "/assets/projects/basketball-hardware.jpg",
    imageAlt: "FRDM-KL46Z basketball scoring tracker hardware and break-beam circuit",
    website: "https://pages.github.coecis.cornell.edu/ece3140-sp2025/kab472-mss464/",
    visual: "sensor",
    tone: "blue",
    href: "https://github.com/mdshad10/Smart-Basketball-Hoop-Embedded-Systems"
  },
  {
    number: "11",
    rank: 11,
    title: "Self-Balancing Robot",
    category: "Embedded Control / Robotics",
    period: "Fall 2025",
    summary:
      "A two-wheeled robot using real-time feedback control, wireless tuning, and gesture-based motion commands.",
    impact: "Stable balancing for 15+ minutes",
    bullets: [
      "Ran a 1.2 kHz PID loop on the RP2040 with complementary-filter IMU sensor fusion.",
      "Hosted a Pico W web interface for live tuning and added wireless gesture control."
    ],
    tools: ["RP2040", "PID Control", "IMU", "Wi-Fi"],
    filters: ["Embedded Systems / Microcontrollers"],
    image: "/assets/projects/self-balancing-robot.png",
    imageAlt: "CAD assembly of the two-wheeled self-balancing robot",
    website: "https://ece4760.github.io/Projects/Fall2025/sjb336_jg244_mss464/index.html",
    visual: "sensor",
    tone: "blue"
  },
  {
    number: "12",
    rank: 8,
    title: "Variable-Latency Integer Multiplier",
    category: "Computer Architecture / RTL",
    period: "Cornell ECE",
    summary:
      "A streaming shift-and-add multiplier optimized to skip zero runs and terminate as soon as computation completes.",
    impact: "Variable-latency early termination",
    bullets: [
      "Used a priority encoder to skip consecutive zero bits instead of wasting shift cycles.",
      "Separated the datapath and FSM control while validating directed, random, and corner cases."
    ],
    tools: ["Verilog", "FSM", "RTL", "Verification"],
    filters: ["Computer Architecture"],
    image: "/assets/projects/integer-multiplier.png",
    imageAlt: "Variable-latency iterative integer multiplier datapath",
    report: "/assets/reports/iterative-integer-multiplier.pdf",
    visual: "cpu",
    tone: "violet"
  },
  {
    number: "13",
    rank: 7,
    title: "Two-Way Blocking Cache",
    category: "Memory Systems",
    period: "Cornell ECE",
    summary:
      "A two-way set-associative, write-back cache with LRU replacement for the TinyRV2 processor.",
    impact: "Up to 70% lower access latency",
    bullets: [
      "Built parallel tag/data paths, hit selection, dirty evictions, refills, and LRU tracking.",
      "Compared miss rate and average memory access latency against a direct-mapped baseline."
    ],
    tools: ["SystemVerilog", "Caches", "LRU", "Memory"],
    filters: ["Computer Architecture"],
    image: "/assets/projects/blocking-cache.png",
    imageAlt: "Two-way set-associative blocking cache datapath",
    report: "/assets/reports/blocking-cache.pdf",
    visual: "tpu",
    tone: "lime"
  },
  {
    number: "14",
    rank: 13,
    title: "Digital Galton Board",
    category: "Embedded Visualization / DMA",
    period: "Fall 2025",
    summary:
      "A real-time RP2040 simulation visualizing the Gaussian distribution created by repeated Bernoulli trials.",
    impact: "30 FPS VGA simulation",
    bullets: [
      "Rendered bouncing balls and a live histogram while exposing bounciness and ball-count controls.",
      "Used DMA-driven SPI audio to generate collision sounds with minimal CPU overhead."
    ],
    tools: ["RP2040", "VGA", "DMA", "SPI DAC"],
    filters: ["Embedded Systems / Microcontrollers"],
    image: "/assets/projects/galton-board.png",
    imageAlt: "Real-time VGA Digital Galton Board simulation and distribution histogram",
    report: "/assets/reports/digital-galton-board.pdf",
    visual: "sensor",
    tone: "orange"
  },
  {
    number: "15",
    rank: 14,
    title: "PID-Controlled 1D Helicopter",
    category: "Embedded Feedback Control",
    period: "Fall 2025",
    summary:
      "A one-degree-of-freedom helicopter platform using deterministic PID control and IMU sensor fusion.",
    impact: "1 kHz closed-loop control",
    bullets: [
      "Fused accelerometer and gyroscope measurements with a complementary filter for stable angle estimates.",
      "Added isolated PWM motor drive, live VGA visualization, and serial gain tuning."
    ],
    tools: ["RP2040", "PID", "IMU", "PWM"],
    filters: ["Embedded Systems / Microcontrollers"],
    report: "/assets/reports/pid-helicopter.pdf",
    visual: "audio",
    tone: "blue"
  }
];

const projects = projectCatalog
  .sort((a, b) => a.rank - b.rank)
  .map((project, index) => ({
    ...project,
    number: String(index + 1).padStart(2, "0")
  }));

const projectFilters = ["All", "FPGA", "VLSI", "Research", "Computer Architecture", "Embedded Systems / Microcontrollers"];

const experience = [
  {
    group: "Industry",
    order: 1,
    type: "Industry",
    icon: Cpu,
    logos: [amdLogo],
    date: "May 2026 — Present",
    place: "Advanced Micro Devices (AMD)",
    role: "Systems Design Engineer Intern",
    location: "San Jose, CA",
    bullets: [
      "Developing and debugging bare-metal validation software for pre-silicon and post-silicon SoC testing on ARM-based platforms.",
      "Analyzing cache coherency, DMA transactions, memory subsystems, and peripheral interfaces while building automation for hardware bring-up."
    ]
  },
  {
    group: "University",
    order: 1,
    type: "Research",
    icon: CircuitBoard,
    logos: [cslLogo],
    date: "Aug 2025 — May 2026",
    place: "Zhang Research Group",
    role: "Research Assistant",
    location: "Cornell University",
    bullets: [
      "Architected a scalable 8×8 RTL systolic-array accelerator for neural-network training and inference.",
      "Designed ASIC-oriented datapaths and double-buffered weight loading across DRAM, BRAM, and on-chip buffers."
    ]
  },
  {
    group: "University",
    order: 2,
    type: "Teaching",
    icon: BookOpen,
    logos: [experienceCornellLogo],
    date: "Jan 2025 — May 2026",
    place: "Cornell Engineering",
    role: "Teaching Assistant",
    location: "Ithaca, New York",
    subroles: [
      {
        title: "ECE 3140 / CS 3420: Embedded Systems",
        date: "Jan 2026 — May 2026",
        leader: "Led by Professor Kirstin Petersen",
        bullets: [
          "Mentor students in low-level C programming, memory-mapped I/O, interrupts, timers, peripheral interfacing, and real-time scheduling."
        ]
      },
      {
        title: "ECE 2300: Digital Logic and Computer Organization",
        date: "Jan 2025 — Dec 2025",
        leader: "Led by Professors Zhiru Zhang and Christopher Batten",
        bullets: [
          "Guided discussions on digital logic, computer organization, and FPGA architecture while debugging and optimizing Verilog designs."
        ]
      }
    ]
  },
  {
    group: "Industry",
    order: 2,
    type: "Industry",
    icon: BriefcaseBusiness,
    logos: [charterLogo, spectrumLogo],
    date: "May 2025 — Aug 2025",
    place: "Charter Communications / Spectrum",
    role: "Electrical Engineering Intern",
    location: "New York, New York",
    bullets: [
      "Improved network monitoring and reliability workflows across more than 400 fiber sites.",
      "Developed an XGBoost-based fraud-detection concept and analyzed power telemetry."
    ]
  },
  {
    group: "University",
    order: 4,
    type: "Campus Employment",
    icon: BriefcaseBusiness,
    logos: [experienceCornellLogo],
    date: "Nov 2024 — May 2026",
    place: "Cornell University Athletics",
    role: "Event / Game-Day Staff",
    location: "Ithaca, NY",
    bullets: [
      "Support event operations by ushering, managing ticketing, and coordinating parking logistics.",
      "Help deliver efficient game-day operations and a positive attendee experience."
    ]
  },
  {
    group: "University",
    order: 3,
    type: "Project Team",
    icon: CircuitBoard,
    logos: [ewbCornellLogo],
    logoClass: "timeline-brand-ewb",
    date: "Jan 2025 — Aug 2025",
    place: "Engineers Without Borders Cornell University Project Team",
    role: "Hardware Engineer",
    location: "Ithaca, NY",
    bullets: [
      "Integrated wiring, assembled and tested PCBs, and configured motor controllers for drone and rover platforms.",
      "Improved reliable, precise operation for northern leaf blight detection systems."
    ]
  }
];

const skillCategories = [
  {
    label: "Hardware & Lab",
    items: [
      "Oscilloscopes",
      "Logic Analyzers",
      "Multimeters",
      "Signal & Function Generators",
      "PCB Prototyping"
    ]
  },
  {
    label: "Digital Design & FPGA",
    items: [
      "RTL Design",
      "Clocking",
      "BRAM",
      "Pipelining",
      "FSMs",
      "Timing Closure",
      "Synthesis"
    ]
  },
  {
    label: "EDA & CAD",
    items: [
      "Intel Quartus Prime",
      "Xilinx Vivado",
      "LTspice",
      "Static Timing Analysis",
      "Cyclone V FPGA",
      "AutoCAD",
      "Revit"
    ]
  },
  {
    label: "Programming & Scripting",
    items: [
      "C",
      "C++",
      "Python",
      "Verilog",
      "SystemVerilog",
      "VHDL",
      "MATLAB",
      "Vitis HLS",
      "Java"
    ]
  },
  {
    label: "Collaboration & Version Control",
    items: [
      "GitHub",
      "Confluence",
      "SharePoint",
      "MS Office Suite (Word, Excel, PowerPoint)",
      "Slack"
    ]
  }
];

const coursework = [
  "Computer Architecture",
  "Intro to Digital (VLSI) Design",
  "Digital Logic & Computer Organization",
  "Introduction to Circuits for Electrical & Computer Engineers",
  "Introduction to Microelectronics",
  "Embedded Systems",
  "Hardware Acceleration via FPGA",
  "Digital Systems Design Using Microcontrollers",
  "Data Science for Engineers",
  "Foundations of Robotics",
  "Probability and Inference",
  "Linear Algebra for Engineers",
  "Differential Equations for Engineers"
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

function Header() {
  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
    >
      <a className="wordmark" href="#top" aria-label="Md Shad home">Md Shad</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </nav>
    </motion.header>
  );
}

function Hero() {
  const [activeMedia, setActiveMedia] = useState(0);
  const currentMedia = heroMedia[activeMedia];

  useEffect(() => {
    if (currentMedia.type !== "image") return undefined;
    const timer = window.setTimeout(
      () => setActiveMedia((activeMedia + 1) % heroMedia.length),
      7200
    );
    return () => window.clearTimeout(timer);
  }, [activeMedia, currentMedia.type]);

  useEffect(() => {
    const nextMedia = heroMedia[(activeMedia + 1) % heroMedia.length];

    if (nextMedia.type === "image") {
      const image = new Image();
      image.src = nextMedia.src;
      return undefined;
    }

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = nextMedia.src;
    video.load();

    return () => {
      video.removeAttribute("src");
      video.load();
    };
  }, [activeMedia]);

  const advanceMedia = () => {
    setActiveMedia((index) => (index + 1) % heroMedia.length);
  };

  return (
    <section className="hero" id="top">
      <AnimatePresence mode="sync" initial={false}>
        {currentMedia.type === "video" ? (
          <motion.video
            className={`hero-background hero-media-${currentMedia.format}`}
            key={currentMedia.src}
            src={currentMedia.src}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={advanceMedia}
            onError={advanceMedia}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1] }}
          />
        ) : (
          <motion.img
            className={`hero-background hero-media-${currentMedia.format}`}
            key={currentMedia.src}
            src={currentMedia.src}
            alt={currentMedia.alt}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
      <div className="hero-image-overlay" aria-hidden="true" />

      <div className="hero-martin-content">
        <motion.p
          className="hero-hello"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Hey there, I’m
        </motion.p>

        <h1 aria-label="Md Shad">
          <span className="hero-name-line">
            <motion.span
              className="hero-name-text"
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.45, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              Md Shad
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-martin-meta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65 }}
        >
          <div>
            <span>Based in New York, USA</span>
          </div>
          <div className="hero-role">
            <span>Electrical &amp;</span>
            <span>Computer Engineer</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-media-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span>{currentMedia.label}</span>
          <div>
            {heroMedia.map((media, index) => (
              <button
                type="button"
                className={activeMedia === index ? "active" : ""}
                onClick={() => setActiveMedia(index)}
                aria-label={`Show ${media.label}`}
                aria-pressed={activeMedia === index}
                key={media.label}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Intro() {
  const education = [
    {
      school: "Cornell University",
      credential: "B.S. in Electrical & Computer Engineering",
      detail: "Expected May 2027",
      location: "Ithaca, New York",
      logo: cornellSeal
    },
    {
      school: "Stuyvesant High School",
      credential: "High School Diploma",
      detail: null,
      location: "New York, New York",
      logo: stuyvesantLogo
    }
  ];

  return (
    <section className="intro section-shell" id="about">
      <div className="about-layout">
        <motion.figure className="about-photo reveal" whileHover={{ y: -2 }} transition={{ duration: 0.22 }}>
          <img src={profileImage} alt="Portrait of Md Shad" />
        </motion.figure>

        <div className="about-content">
          <div className="section-heading reveal">
            <h2>About <em>Me</em></h2>
          </div>

          <div className="about-education reveal">
            <div className="about-education-heading">
              <GraduationCap size={22} />
              <h3>Education</h3>
            </div>
            <div className="about-education-list">
              {education.map((item) => (
                <article className="about-education-card" key={item.school}>
                  <img className="education-logo" src={item.logo} alt={`${item.school} logo`} />
                  <div>
                    <h4>{item.school}</h4>
                    <p>{item.credential}</p>
                  </div>
                  <div className="about-education-meta">
                    {item.detail && <span>{item.detail}</span>}
                    <span>{item.location}</span>
                  </div>
                </article>
              ))}
            </div>
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
        <div className="chip-label">STREAM / 50 MHZ</div>
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

function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion();
  const projectLink = project.website || project.report || project.href;

  return (
    <motion.article
      className={`project-card project-card-${project.tone}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className={`project-graphic${project.image ? " project-graphic-image" : ""}`}>
        {project.image ? (
          <a
            className="project-thumbnail-link"
            href={project.report || project.website || project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={project.report ? `Read the ${project.title} report` : `Open the ${project.title} project page`}
          >
            <img className="project-thumbnail" src={project.image} alt={project.imageAlt} />
          </a>
        ) : (
          <ProjectGraphic type={project.visual} />
        )}
      </div>
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
        <div className="project-card-actions">
          {project.report && (
            <a className="project-report-link" href={project.report} target="_blank" rel="noreferrer">
              Read report <ArrowUpRight size={14} />
            </a>
          )}
          {project.website && (
            <a className="project-website-link" href={project.website} target="_blank" rel="noreferrer">
              Project page <ArrowUpRight size={14} />
            </a>
          )}
          {!project.report && !project.website && (
            <span>View project <ArrowUpRight size={14} /></span>
          )}
        </div>
        {projectLink ? (
          <a
            href={projectLink}
            target="_blank"
            rel="noreferrer"
            aria-label={project.website ? `Open the ${project.title} project page` : project.report ? `Read the ${project.title} report` : `Open ${project.title} on GitHub`}
          >
            {project.website ? <ArrowUpRight size={20} /> : project.report ? <BookOpen size={18} /> : <ArrowUpRight size={20} />}
          </a>
        ) : <Github size={19} aria-hidden="true" />}
      </div>
    </motion.article>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.filters.includes(activeFilter));

  return (
    <section className="projects" id="projects">
      <div className="section-shell">
        <div className="module-heading reveal">
          <h2>My <em>Projects</em></h2>
          <p>Selected engineering work demonstrating practical systems and well-architected implementations.</p>
          <div className="filter-pills" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                type="button"
                className={activeFilter === filter ? "active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </AnimatePresence>
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
  const experienceGroups = ["Industry", "University"];

  return (
    <section className="experience section-shell" id="experience">
      <div className="module-heading reveal">
        <h2>Professional <em>Experience</em></h2>
        <p>Research, teaching, and industry experience applying engineering theory to real systems.</p>
      </div>
      <div className="experience-groups">
        {experienceGroups.map((group) => (
          <section className="experience-group" key={group}>
            <h3 className="experience-group-title reveal">{group}</h3>
            <div className="experience-timeline">
              {experience
                .filter((item) => item.group === group)
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                const Icon = item.icon;
                return (
                  <article className="timeline-item reveal" key={`${item.place}-${item.role}`}>
                    <span className="timeline-dot" />
                    <div className="timeline-meta"><span>{item.date}</span><span>{item.location}</span></div>
                    <div className="timeline-card">
                      <div className={`timeline-brand ${item.logoClass || ""}`}>
                        {item.logos?.map((logo, logoIndex) => (
                          <img src={logo} alt="" aria-hidden="true" key={`${item.place}-${logoIndex}`} />
                        )) || <div className="timeline-icon"><Icon size={22} /></div>}
                      </div>
                      <div>
                        <p className="timeline-type">{item.type}</p>
                        <h3>{item.role}</h3>
                        <h4 className="timeline-company">{item.place}</h4>
                        {item.subroles ? (
                          <div className="timeline-subroles">
                            {item.subroles.map((subrole) => (
                              <section className="timeline-subrole" key={subrole.title}>
                                <h5>{subrole.title}</h5>
                                <span>{subrole.date}</span>
                                <p className="timeline-leader">{subrole.leader}</p>
                                <ul>{subrole.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                              </section>
                            ))}
                          </div>
                        ) : (
                          <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-shell skills-inner">
        <div className="module-heading reveal">
          <h2>Technical <em>Skills</em></h2>
          <p>Technologies and tools I use to move from architecture to working systems.</p>
        </div>

        <div className="skill-groups reveal">
          {skillCategories.map((category) => (
            <article className="skill-group" key={category.label}>
              <div className="skill-group-heading">
                <h3>{category.label}</h3>
              </div>
              <div className="skill-list">
                {category.items.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coursework() {
  return (
    <section className="coursework" id="coursework">
      <div className="section-shell">
        <div className="module-heading reveal">
          <h2>Relevant <em>Coursework</em></h2>
          <p>Selected Cornell ECE courses supporting my work across hardware, embedded systems, and intelligent computing.</p>
        </div>

        <div className="coursework-grid">
          {coursework.map((course, index) => (
            <motion.article
              className="coursework-card"
              whileHover={{ y: -7 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              key={course}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <BookOpen size={20} aria-hidden="true" />
              <h3>{course}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const contactCards = [
    { label: "Email", value: "mss464@cornell.edu", icon: Mail, href: "mailto:mss464@cornell.edu" },
    { label: "GitHub", value: "github.com/mdshad10", icon: Github, href: "https://github.com/mdshad10" },
    { label: "LinkedIn", value: "linkedin.com/in/mdshad4", icon: Linkedin, href: "https://linkedin.com/in/mdshad4" }
  ];

  return (
    <section className="contact section-shell" id="contact">
      <div className="module-heading reveal">
        <h2>Get In <em>Touch</em></h2>
        <p>Let’s talk about embedded systems, computer architecture, FPGA design, or your next engineering project.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-card-list">
          {contactCards.map((card) => {
            const Icon = card.icon;
            const content = (
              <article className="contact-info-card reveal">
                <div className="contact-info-icon"><Icon size={22} /></div>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
              </article>
            );
            return card.href ? <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={card.label}>{content}</a> : <div key={card.label}>{content}</div>;
          })}
        </div>

        <div className="contact-message reveal">
          <h3>Have any hardware openings or opportunities?</h3>
          <p>Feel free to contact me.</p>
          <MagneticLink className="contact-button" href="mailto:mss464@cornell.edu" aria-label="Email Md Shad">
            <Mail size={24} /><span>Send me an email</span><ArrowUpRight size={20} />
          </MagneticLink>
        </div>
      </div>
      <footer>
        <div><strong>Md Shad</strong><span>Electrical & Computer Engineer</span></div>
        <div><span><MapPin size={14} /> Ithaca, NY</span><a href="https://github.com/mdshad10" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </section>
  );
}

function App() {
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const smoothX = useSpring(cursorX, { stiffness: 90, damping: 26 });
  const smoothY = useSpring(cursorY, { stiffness: 90, damping: 26 });

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
      <motion.div className="cursor-glow" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Experience />
        <Projects />
        <Skills />
        <Coursework />
        <Contact />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
