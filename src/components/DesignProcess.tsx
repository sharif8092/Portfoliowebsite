import { useEffect } from "react";
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
    strand: "HELIX STRAND α",
    side: "left",
  },
  {
    step: "02",
    title: "Define & Architect",
    description:
      "Transforming complex research findings and technological logic into clear information architecture, user journey maps, and structural wireframes.",
    tags: ["Information Architecture", "Journey Mapping", "User Flows", "Wireframing"],
    strand: "HELIX STRAND β",
    side: "right",
  },
  {
    step: "03",
    title: "Design & Prototype",
    description:
      "Crafting intuitive visual interfaces, cohesive design systems, and dynamic interactive prototypes with meticulous attention to detail and hierarchy.",
    tags: ["UI Design", "Design Systems", "Interactive Prototyping", "Micro-interactions"],
    strand: "HELIX STRAND α",
    side: "left",
  },
  {
    step: "04",
    title: "Validate & Iterate",
    description:
      "Testing solutions with real users, synthesizing feedback against technological constraints, and iteratively refining digital experiences for maximum impact.",
    tags: ["Usability Testing", "Feedback Synthesis", "Accessibility", "Continuous Refinement"],
    strand: "HELIX STRAND β",
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

const DesignProcess = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-circuit-line",
        { maxHeight: "0%", opacity: 0 },
        {
          maxHeight: "100%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-dna-wrapper",
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    });

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

        <div className="process-dna-wrapper">
          {/* Central DNA Double-Helix Spine */}
          <div className="process-dna-spine">
            <svg
              className="process-dna-svg"
              viewBox="0 0 60 920"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="process-dna-grad-alpha" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c2a4ff" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#aa42ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="process-dna-grad-beta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f40ff" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#d29bff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#aa42ff" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Nucleotide Base Pair Horizontal Cross Rungs */}
              <line x1="12" y1="110" x2="48" y2="110" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="220" x2="42" y2="220" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="330" x2="48" y2="330" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="440" x2="42" y2="440" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="550" x2="48" y2="550" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="660" x2="42" y2="660" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="770" x2="48" y2="770" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="880" x2="42" y2="880" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Sinuous Intertwined Double-Helix Wave Paths */}
              <path
                d="M 30,0 C 8,80 8,180 30,260 C 52,340 52,440 30,520 C 8,600 8,700 30,780 C 52,840 52,890 30,920"
                stroke="url(#process-dna-grad-alpha)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 30,0 C 52,80 52,180 30,260 C 8,340 8,440 30,520 C 52,600 52,700 30,780 C 8,840 8,890 30,920"
                stroke="url(#process-dna-grad-beta)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Living Circuit Central Spine */}
            <div className="process-circuit-track">
              <div className="process-circuit-line">
                <div className="process-circuit-dot"></div>
              </div>
            </div>
          </div>

          {/* DNA Alternating Spiral Step Nodes */}
          <div className="process-dna-nodes">
            {processSteps.map((item, index) => (
              <div
                className={`process-dna-node ${
                  index % 2 === 0 ? "process-node-left" : "process-node-right"
                }`}
                key={item.step}
              >
                {/* Nucleotide Connector Rung */}
                <div className="process-dna-rung" aria-hidden="true">
                  <span className="process-rung-line"></span>
                  <span className="process-rung-node"></span>
                </div>

                <div className="process-card process-dna-card">
                  <div className="process-card-header">
                    <span className="process-strand-badge">
                      {item.strand}
                    </span>
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
