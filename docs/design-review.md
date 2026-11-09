# Portfolio UI review

The portfolio is the product: show working hardware and measured results, then make the supporting evidence easy to inspect. All project metrics, employment dates, education, and contact details come from the existing repository; none were invented for the redesign.

| # | Rule | Before | After and reason |
| --- | --- | --- | --- |
| 1 | Delete filler badges | No NEW/Beta hero pills; project tools and categories were styled as repeated pills. | No promotional badges. Categories are plain text; tools appear only inside project details. |
| 2 | Drop redundant labels | Repeated section headings, case labels, case numbers, and result labels competed with content. | One heading per section. Project rows contain title, category, and result, without redundant labels. The Cornell affiliation remains because it establishes context. |
| 3 | Remove random italics | “Me,” “Projects,” “Experience,” “Skills,” “Coursework,” and “Touch” used decorative italic faces. | No italic emphasis. Weight and accent color establish hierarchy. |
| 4 | Specific H1 | The H1 was the animated name “Md Shad.” | “I build processors, FPGA accelerators, and embedded systems.” Visitors immediately learn what the engineer does. |
| 5 | Emphasize CTA | The hero prioritized the name and media controls without a clear project CTA. | High-contrast “Explore my work” appears above the fold. Its 72px minimum height is 1.5× the 48px ghost secondary action. |
| 6 | One accent | Project cards used lime, violet, orange, and blue accents. | Vermilion (#b63820) consistently marks primary actions, links, selected filters, and results. Scientific image colors remain intact. |
| 7 | Design system | Four font families, numerous font sizes and weights, and multiple overriding stylesheets. | Instrument Sans for reading and Space Grotesk for headings. Two size roles: 16px body and 48px display (32px display on small screens); weights 400/600. Layout spacing uses multiples of 4px. Thin borders and focus outlines are optical exceptions. |
| 8 | More space | Dense mobile overrides reduced sections to 40px and used small text. | 80px mobile section padding and 128px desktop padding. Body line-height 1.5; prose capped at 72ch. The hero has its own compact spacing to keep the CTA visible. |
| 9 | Actual product | Rotating background media mixed collaboration photography, presentation imagery, simulation, and FPGA footage. Some project cards used abstract generated diagrams. | One actual FPGA Mandelbrot rendering leads the hero, with its real 43-iterator / 20ms result. Original diagnostics and schematics remain in project details, with full-size links. |
| 10 | Remove purple glows | Multicolor decorative graphics, gradients, and glow effects appeared throughout project treatments. | Warm neutral paper, solid surfaces, thin rules, and one accent. No decorative gradients or blur glows. Purple within real scientific imagery is source data. |
| 11 | Stop centering | Media controls and repeated card layouts directed attention away from a consistent reading edge. | Left-aligned headline, body, project rows, experience, and contact. No centered body copy. |
| 12 | Tabular numbers | Metrics lacked one global numeric treatment. | Global `font-variant-numeric: tabular-nums` keeps project results, dates, and counts aligned. |
| 13 | Pricing | No pricing table: this is an engineering portfolio. | Not applicable. Adding plans or a fake “Most popular” badge would add clutter and misrepresent the site. No pricing UI was introduced. |
| 14 | Ditch boxed icons | Skills, coursework, timeline, and contact treatments used repeated icon containers. | Plain text rows. Icons remain inline only where they communicate an action: open, expand, collapse, copy, or success. |
| 15 | Feedback states | Magnetic links, reveal animations, media cycling, and card flips added movement and complexity. | Shared hover, active, and visible focus states; selected filters use `aria-pressed`; native keyboard-accessible disclosures expose expanded state. Clipboard action has loading, disabled, success, and error feedback. Filter results announce counts and include an empty-state recovery path. Navigation links do not simulate loading or success. Reduced-motion preferences disable transitions. |
| 16 | Real copy | Real technical content existed alongside repeated generic contact prompts and decorative labels. | Existing project results lead: 120ns, 2.38×, 900ps, 12,800 nodes, and more. One specific contact invitation replaces repeated prompts. No invented testimonials, customers, or statistics. |
| 17 | Distinct type | Manrope plus multiple italic serif and monospace families fragmented the typography. | Space Grotesk + Instrument Sans, each limited to 400/600. No Inter or random display faces. |
| 18 | Kill card repetition | Repeated project, skill, coursework, and contact cards created a catalog of boxes. | A split hero, tabular project list, two-column experience rows, and simple skills index provide a clearer reading order. All 15 projects remain filterable. |
| 19 | Point of view | Oversized animated name, colorful cards, and ornamental typography competed for attention. | An engineering notebook: factual results in a ruled list, a real FPGA output, generous margins, and a restrained vermilion accent. |
| 20 | Delete to improve | Thousands of lines of layered CSS, two animation libraries, decorative diagrams, duplicate calls to contact, logo containers, and tool pills. | Replaced the old UI and removed its refinement stylesheet, Framer Motion, and GSAP. Folded coursework into one disclosure and removed the generic collaboration-software list. Kept useful technical evidence and the complete employment history. Original media files remain available; unused generated copies are removed by the production build. |

## Code and delivery

- `src/main.jsx`: React components and interaction states.
- `src/data.js`: existing technical content separated from rendering.
- `src/styles.css`: Tailwind v4 plus the small shared visual system.
- `npm run build`: compiles and syncs `index.html` and hashed assets into the repository root for GitHub Pages, preserving the existing deployment method.
- `npm run dev`, then open `/app.html`: development entry. The root `index.html` is the generated production entry.

## Validation

The production build was tested in Chromium at 360, 390, 768, 1024, and 1440px widths. Checks cover horizontal overflow, primary CTA visibility, all 15 projects, FPGA and VLSI filtering, mouse and keyboard disclosure operation, clipboard success, JavaScript errors, and axe WCAG A/AA checks. Screenshots were visually reviewed on desktop and mobile. Automated accessibility checks do not replace a complete manual accessibility audit.
