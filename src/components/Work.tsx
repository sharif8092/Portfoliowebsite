import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "RAAHI — Driver Drowsiness Detection App",
    category: "Product Design & HCI",
    tools: ["Figma Slides", "HCI Ergonomics", "ADAS Interaction", "3D Mascot"],
    image: "/images/projects/raahi_cover.png",
    link: "https://www.figma.com/slides/1yxd6fB3wZeWLXaoihFZdb/Driver-Drowsiness--Copy-",
    stepLabel: "CASE STUDY 01",
    side: "left",
    desc: "A multimodal mobile companion app engineered to detect driver fatigue in commercial fleet drivers using cognitive ergonomics and conversational AI nudges.",
  },
  {
    id: "02",
    title: "Beyond Reality — Evolution of VR & AR",
    category: "Spatial Design & Research",
    tools: ["Adobe InDesign", "Photoshop", "Spatial Interaction", "53-Page Publication"],
    image: "/images/projects/beyond_reality_cover.png",
    link: "https://startling-stroopwafel-805e80.netlify.app/assets/aistudio/Final_Magazine_VR___AR_9aa001e7.pdf",
    stepLabel: "RESEARCH 02",
    side: "right",
    desc: "A comprehensive 53-page spatial computing research publication synthesizing VR/AR evolution, spatial ergonomics, perceptual latency, and futuristic UI paradigms.",
  },
  {
    id: "03",
    title: "Hanging Garden: Bloom — Editorial Travel Magazine",
    category: "Editorial Design & Typography",
    tools: ["Adobe InDesign", "Editorial Typography", "Color Grading", "Layout Architecture"],
    image: "/images/projects/hanging_garden_cover.jpg",
    link: "https://startling-stroopwafel-805e80.netlify.app/assets/aistudio/Aqsa-Magazine_3a00bb79.pdf",
    stepLabel: "PUBLICATION 03",
    side: "left",
    desc: "A luxury editorial travel publication showcasing experimental grid structures, bespoke Swiss typography, and high-fidelity visual narrative curation.",
  },
  {
    id: "04",
    title: "Ferrari F40 — Kinetic Typographic Poster",
    category: "Visual Identity & Swiss Typography",
    tools: ["Adobe Illustrator", "Photoshop", "Swiss Grid Systems", "Telemetry Typography"],
    image: "/images/projects/ferrari_cover.png",
    link: "https://startling-stroopwafel-805e80.netlify.app/",
    stepLabel: "VISUAL IDENTITY 04",
    side: "right",
    desc: "A commemorative automotive typography poster honoring the legendary Ferrari F40, utilizing dynamic telemetry data, strict Swiss grids, and kinetic letter architecture.",
  },
];

// Single Sinuous Spiral Path: Center (80,0) -> Left (15,250) -> Right (145,600) -> Left (15,950) -> Right (145,1230) -> Center (80,1400)
const WORK_SPIRAL_PATH_D =
  "M 80,0 C 80,100 15,160 15,250 C 15,380 145,480 145,600 C 145,740 15,820 15,950 C 15,1080 145,1140 145,1230 C 145,1330 80,1360 80,1400";

const Work = () => {
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

          // Single spiral path draws itself!
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
    <section className="work-section section-container" id="work">
      <div className="work-container">
        <div className="work-header">
          <h2>
            Featured <span>Work</span>
          </h2>
          <p>Selected Case Studies, Spatial Interfaces &amp; Editorial Research</p>
        </div>

        <div className="work-spiral-wrapper" ref={containerRef}>
          {/* Single Spiral Spine with Merged Line Progress */}
          <div className="work-spiral-spine">
            <svg
              className="work-spiral-svg"
              viewBox="0 0 160 1400"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="work-spiral-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f40ff" stopOpacity="0.4" />
                  <stop offset="30%" stopColor="#aa42ff" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#c2a4ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <filter id="work-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
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
                d={WORK_SPIRAL_PATH_D}
                stroke="rgba(194, 164, 255, 0.16)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Active Energy Progress Stroke */}
              <path
                ref={pathRef}
                className="spiral-progress-path"
                d={WORK_SPIRAL_PATH_D}
                stroke="url(#work-spiral-grad)"
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
                filter="url(#work-dot-glow)"
              />
            </svg>
          </div>

          {/* Alternating Spiral Project Nodes */}
          <div className="work-spiral-nodes">
            {projects.map((project) => (
              <div
                className={`work-spiral-node work-node-${project.side}`}
                key={project.id}
              >
                {/* Node Anchor where Spiral touches card */}
                <div className="work-node-anchor" aria-hidden="true">
                  <span className="work-anchor-dot"></span>
                </div>

                <div className="work-box work-spiral-card">
                  <div className="work-card-header">
                    <span className="work-strand-badge">{project.stepLabel}</span>
                    <span className="work-project-id">PROJECT {project.id}</span>
                  </div>

                  <WorkImage
                    image={project.image}
                    alt={project.title}
                    link={project.link}
                  />

                  <div className="work-info">
                    <div className="work-title">
                      <h4>{project.title}</h4>
                      <p className="work-category">{project.category}</p>
                    </div>
                    <p className="work-desc">{project.desc}</p>
                    <div className="work-tools-flex">
                      {project.tools.map((tool) => (
                        <span className="work-tool-pill" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
