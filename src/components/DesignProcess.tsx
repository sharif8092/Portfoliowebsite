import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/DesignProcess.css";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    step: "01",
    title: "Discover & Empathize",
    description:
      "Deeply understanding human behaviors, pain points, and systemic challenges through user interviews, qualitative observations, and problem space mapping.",
    tags: ["User Research", "Empathy Mapping", "Problem Discovery", "User Interviews"],
    stepLabel: "PHASE 01 // DISCOVERY",
    side: "left",
  },
  {
    step: "02",
    title: "Define & Architect",
    description:
      "Transforming complex research findings and technological logic into clear information architecture, user journey maps, and structural wireframes.",
    tags: ["Information Architecture", "Journey Mapping", "User Flows", "Wireframing"],
    stepLabel: "PHASE 02 // ARCHITECTURE",
    side: "right",
  },
  {
    step: "03",
    title: "Design & Prototype",
    description:
      "Crafting intuitive visual interfaces, cohesive design systems, and dynamic interactive prototypes with meticulous attention to detail and hierarchy.",
    tags: ["UI Design", "Design Systems", "Interactive Prototyping", "Micro-interactions"],
    stepLabel: "PHASE 03 // PROTOTYPING",
    side: "left",
  },
  {
    step: "04",
    title: "Validate & Iterate",
    description:
      "Testing solutions with real users, synthesizing feedback against technological constraints, and iteratively refining digital experiences for maximum impact.",
    tags: ["Usability Testing", "Feedback Synthesis", "Accessibility", "Continuous Refinement"],
    stepLabel: "PHASE 04 // VALIDATION",
    side: "right",
  },
];

const competencies = [
  "Figma & Design Tokens",
  "Adobe InDesign & Prepress",
  "Adobe Illustrator & Vectors",
  "Photoshop & Visual Curation",
  "Spatial Interaction & VR/AR",
  "HCI & Cognitive Ergonomics",
  "Product Design & Assistive UX",
  "Swiss Typography & Grid Systems",
  "Editorial Architecture & Book Design",
  "Design Systems & Component Architecture",
  "User Research & Usability Testing",
  "Computer Science Logic & Web Standards",
];

// Single Sinuous Spiral Path: Center (80,0) -> Left (15,180) -> Right (145,420) -> Left (15,660) -> Right (145,880) -> Center (80,1000)
const PROCESS_SPIRAL_PATH_D =
  "M 80,0 C 80,70 15,110 15,180 C 15,280 145,340 145,420 C 145,520 15,580 15,660 C 15,760 145,800 145,880 C 145,950 80,970 80,1000";

const DesignProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!el || !path || !dot) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    const startPt = path.getPointAtLength(0);
    gsap.set(dot, { attr: { cx: startPt.x, cy: startPt.y }, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        end: "bottom 60%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentLength = progress * length;

          // Single spiral draws itself!
          path.style.strokeDashoffset = `${Math.max(0, length - currentLength)}`;

          // Glowing dot rides right on the single spiral curve!
          const pt = path.getPointAtLength(currentLength);
          gsap.set(dot, {
            attr: { cx: pt.x, cy: pt.y },
            opacity: progress > 0.01 ? 1 : 0,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="design-process-section" id="process">
      <div className="design-process-container section-container">
        <div className="design-process-header">
          <h2>
            Design <span>&amp;</span>
            <br /> Methodology
          </h2>
          <p>From understanding technology to designing intuitive experiences</p>
        </div>

        <div className="process-spiral-wrapper" ref={containerRef}>
          {/* Single Spiral Spine with Merged Line Progress */}
          <div className="process-spiral-spine">
            <svg
              className="process-spiral-svg"
              viewBox="0 0 160 1000"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="process-spiral-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f40ff" stopOpacity="0.4" />
                  <stop offset="30%" stopColor="#aa42ff" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#c2a4ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <filter id="process-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint Background Guide Track */}
              <path
                className="spiral-track-path"
                d={PROCESS_SPIRAL_PATH_D}
                stroke="rgba(194, 164, 255, 0.16)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Active Energy Progress Stroke */}
              <path
                ref={pathRef}
                className="spiral-progress-path"
                d={PROCESS_SPIRAL_PATH_D}
                stroke="url(#process-spiral-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Electric Energy Dot Gliding on the Spiral */}
              <circle
                ref={dotRef}
                className="spiral-energy-dot"
                r="7"
                fill="#ffffff"
                stroke="#aa42ff"
                strokeWidth="3"
                filter="url(#process-dot-glow)"
              />
            </svg>
          </div>

          {/* Alternating Spiral Step Nodes */}
          <div className="process-spiral-nodes">
            {processSteps.map((item) => (
              <div
                className={`process-spiral-node process-node-${item.side}`}
                key={item.step}
              >
                {/* Node Anchor where Spiral touches card */}
                <div className="process-node-anchor" aria-hidden="true">
                  <span className="process-anchor-dot"></span>
                </div>

                <div className="process-card process-spiral-card">
                  <div className="process-card-header">
                    <span className="process-strand-badge">{item.stepLabel}</span>
                    <div className="process-step">{item.step}</div>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="process-tags">
                    {item.tags.map((tag) => (
                      <span className="process-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="competencies-section">
          <h3>Core Competencies &amp; Focus</h3>
          <div className="competencies-grid">
            {competencies.map((comp) => (
              <div className="competency-item" key={comp}>
                {comp}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
