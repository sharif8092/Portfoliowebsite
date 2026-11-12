import { useEffect } from "react";
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
    strand: "HELIX STRAND α",
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
    strand: "HELIX STRAND β",
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
    strand: "HELIX STRAND α",
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
    strand: "HELIX STRAND β",
    side: "right",
    desc: "A commemorative automotive typography poster honoring the legendary Ferrari F40, utilizing dynamic telemetry data, strict Swiss grids, and kinetic letter architecture.",
  },
];

const Work = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-circuit-line",
        { maxHeight: "0%", opacity: 0 },
        {
          maxHeight: "100%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-dna-wrapper",
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
    <section className="work-section section-container" id="work">
      <div className="work-container">
        <div className="work-header">
          <h2>
            Featured <span>Work</span>
          </h2>
          <p>Selected Case Studies, Spatial Interfaces &amp; Editorial Research</p>
        </div>

        <div className="work-dna-wrapper">
          {/* Central DNA Double-Helix Spine */}
          <div className="work-dna-spine">
            <svg
              className="work-dna-svg"
              viewBox="0 0 60 1400"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="work-dna-grad-alpha" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c2a4ff" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#aa42ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="work-dna-grad-beta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f40ff" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#d29bff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#aa42ff" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Nucleotide Base Pair Horizontal Cross Rungs */}
              <line x1="12" y1="140" x2="48" y2="140" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="320" x2="42" y2="320" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="500" x2="48" y2="500" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="680" x2="42" y2="680" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="860" x2="48" y2="860" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="18" y1="1040" x2="42" y2="1040" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="1220" x2="48" y2="1220" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Sinuous Intertwined Double-Helix Wave Paths */}
              <path
                d="M 30,0 C 8,120 8,240 30,360 C 52,480 52,600 30,720 C 8,840 8,960 30,1080 C 52,1200 52,1320 30,1400"
                stroke="url(#work-dna-grad-alpha)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 30,0 C 52,120 52,240 30,360 C 8,480 8,600 30,720 C 52,840 52,960 30,1080 C 8,1200 8,1320 30,1400"
                stroke="url(#work-dna-grad-beta)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Living Circuit Central Spine */}
            <div className="work-circuit-track">
              <div className="work-circuit-line">
                <div className="work-circuit-dot"></div>
              </div>
            </div>
          </div>

          {/* DNA Alternating Spiral Project Nodes */}
          <div className="work-dna-nodes">
            {projects.map((project, index) => (
              <div
                className={`work-dna-node ${
                  index % 2 === 0 ? "work-node-left" : "work-node-right"
                }`}
                key={project.id}
              >
                {/* Nucleotide Connector Rung */}
                <div className="work-dna-rung" aria-hidden="true">
                  <span className="work-rung-line"></span>
                  <span className="work-rung-node"></span>
                </div>

                <div className="work-box work-dna-card">
                  <div className="work-card-header">
                    <span className="work-strand-badge">{project.strand}</span>
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
