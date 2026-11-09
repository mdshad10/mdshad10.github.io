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
    detail:
      "We implemented a hardware-based ODE solver on the DE1-SoC FPGA to integrate the Lorenz system using a Digital Differential Analyzer and first-order Euler integration in fixed-point arithmetic. The DDA core ran entirely in synthesizable Verilog while the Hard Processor System provided high-level control, letting us configure parameters and initial conditions to explore the attractor's sensitivity to small perturbations. Solver outputs streamed to the HPS and rendered live on a VGA display, with a command-line interface for adjusting the Lorenz parameters, timestep, and animation speed during operation.",
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
    detail:
      "We designed a Mandelbrot set visualizer on the DE1-SoC FPGA that computes and renders a high-resolution fractal in real time. For every pixel in a 640x480 display, the system evaluates the complex iteration z(n+1) = z(n)^2 + c to determine whether the sequence diverges, coloring each pixel by how many iterations it took. The core ran in synthesizable Verilog with fixed-point arithmetic across parallel iterator pipelines writing to dedicated on-chip memory, while the HPS handled panning and zooming by recomputing the fractal whenever the viewport changed.",
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
    detail:
      "We developed a hardware-accelerated drum synthesizer on the DE1-SoC by simulating a damped 2D wave equation across a mesh of discretized nodes representing a drum's surface. Each node's amplitude was updated from its four nearest neighbors plus a damping term for energy loss and a nonlinear tension term for the classic pitch-glide of a real drum, sampled at 48 kHz and streamed to an audio DAC. The computation ran entirely in Verilog using 1.17 fixed-point arithmetic, with a parallel column architecture that let us synthesize more than 87 columns at once.",
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
    detail:
      "We combined microarchitectural components from earlier labs, a variable-latency multiplier, a five-stage pipelined TinyRV2 processor with bypassing, and a two-way set-associative cache, into complete single-core and four-core RISC-V systems. The four-core version gives each core a private instruction cache and shares a four-bank data cache over a custom ring network, and we wrote a multithreaded sorting benchmark using the bthread library to exercise it. Across five microbenchmarks the multicore system delivered up to a 2.38x speedup when parallel work dominated, though thread setup and shared-cache contention kept any benchmark from reaching the ideal 4x.",
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
    detail:
      "We designed and evaluated two pipelined processor microarchitectures for the TinyRV2 ISA to work through instruction set architecture, hazard handling, and processor-memory interfacing. The baseline handled data hazards by stalling the pipeline whenever an instruction depended on a value that had not yet been computed, while the alternative added bypassing to forward results from later pipeline stages back to earlier ones. Both designs included squashing logic for control hazards, and the bypassing design cut CPI by roughly 20 percent on a convolution benchmark with minimal added hardware.",
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
    detail:
      "We built a birdsong synthesizer on the RP2040 to recreate the call of a Northern Cardinal, breaking the song into chirps, swoops, and silences generated with direct digital synthesis. A sine lookup table combined with fixed-point arithmetic produced smooth frequency sweeps, which were sent to a DAC over SPI with amplitude envelopes to keep the transitions natural. A keypad let us play or record sequences, with debouncing handled by a finite state machine and timer interrupts keeping the synthesis timing precise.",
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
    detail:
      "We implemented two iterative integer multipliers in Verilog: a fixed-latency baseline and a variable-latency alternative, practicing datapath and control decomposition, FSMs, and streaming interfaces along the way. Both use a val/rdy stream interface and shift-and-add multiplication, but the alternative exploits runs of zeros in the multiplier operand to skip cycles. A priority encoder identifies those runs so the datapath can take variable-sized shifts and terminate as soon as the computation finishes, cutting the number of wasted cycles compared to the one-bit-per-cycle baseline.",
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
    detail:
      "We designed and evaluated two cache microarchitectures for the TinyRV2 processor to get hands-on experience with memory hierarchies, cache design, and finite-state-machine control. The baseline was a direct-mapped, write-back cache that stalled the processor on a miss, while the alternative added two-way set associativity with LRU replacement to reduce conflict misses. Across our benchmark patterns the alternative consistently cut miss rates and average memory access latency for workloads with conflict or temporal reuse, most notably a 70 percent latency reduction on one loop, while simpler sequential workloads saw little change.",
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
    detail:
      "We built a digital Galton Board on the RP2040 to model the statistical behavior of balls falling through repeated binary interactions. Each collision was a Bernoulli trial that deflected a ball left or right with equal probability, and as more balls fell the distribution across the bottom bins approximated a Gaussian curve. A DMA channel streamed a collision sound to an SPI DAC for every hit, and the VGA display rendered the board alongside a live histogram, ball count, and bounciness coefficient, all adjustable through a potentiometer and pushbutton.",
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
    detail:
      "We built a one-degree-of-freedom helicopter using the RP2040 to explore feedback control and real-time embedded programming. A ducted fan on a lever arm lifted against gravity as we varied thrust with PWM, while a complementary filter fused gyroscope and accelerometer data from an onboard IMU into a stable angle estimate. A PID controller running at a fixed 1 kilohertz update rate adjusted motor output to track a target angle, with the proportional, integral, and derivative terms tuned to give a fast, steady, oscillation-free response.",
  }
];

export const projects = projectCatalog
  .sort((a, b) => a.rank - b.rank)
  .map((project, index) => ({
    ...project,
    number: String(index + 1).padStart(2, "0")
  }));

export const projectFilters = ["All", "FPGA", "VLSI", "Research", "Computer Architecture", "Embedded Systems / Microcontrollers"];

export const experience = [
  {
    group: "Industry",
    order: 1,
    type: "Industry",
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

export const skillCategories = [
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

export const coursework = [
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

