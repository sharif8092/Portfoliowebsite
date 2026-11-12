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
  },
  {
    step: "02",
    title: "Define & Architect",
    description:
      "Transforming complex research findings and technological logic into clear information architecture, user journey maps, and structural wireframes.",
    tags: ["Information Architecture", "Journey Mapping", "User Flows", "Wireframing"],
  },
  {
    step: "03",
    title: "Design & Prototype",
    description:
      "Crafting intuitive visual interfaces, cohesive design systems, and dynamic interactive prototypes with meticulous attention to detail and hierarchy.",
    tags: ["UI Design", "Design Systems", "Interactive Prototyping", "Micro-interactions"],
  },
  {
    step: "04",
    title: "Validate & Iterate",
    description:
      "Testing solutions with real users, synthesizing feedback against technological constraints, and iteratively refining digital experiences for maximum impact.",
    tags: ["Usability Testing", "Feedback Synthesis", "Accessibility", "Continuous Refinement"],
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
            trigger: ".process-grid-wrapper",
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

        <div className="process-grid-wrapper">
          {/* Living Circuit Central Spine */}
          <div className="process-circuit-track">
            <div className="process-circuit-line">
              <div className="process-circuit-dot"></div>
            </div>
          </div>

          <div className="process-grid">
            {processSteps.map((item) => (
              <div className="process-card" key={item.step}>
                <div className="process-step">{item.step}</div>
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
