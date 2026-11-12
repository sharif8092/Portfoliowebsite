import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const careerData = [
  {
    id: "01",
    tag: "NOW",
    role: "Master of Design (MDes)",
    org: "Product Design Innovation • Woxsen University",
    desc: 'Pursuing postgraduate studies focusing on Spatial Interaction, HCI, Cognitive Ergonomics, and Publication Design. Co-author of "Beyond Reality".',
    side: "left",
    stepLabel: "MILESTONE 01",
  },
  {
    id: "02",
    tag: "BSc",
    role: "BSc in Computer Science",
    org: "BITS Pilani, India",
    desc: "Foundation in software systems, algorithms, Human-Computer Interaction (HCI), and computer graphics, connecting engineering logic to human empathy.",
    side: "right",
    stepLabel: "MILESTONE 02",
  },
  {
    id: "03",
    tag: "RES",
    role: "Product Design & Research",
    org: "School of Arts & Design • Woxsen University",
    desc: "Designed the RAAHI ADAS Driver Drowsiness Detection mobile companion and authored the 53-page spatial computing research publication.",
    side: "left",
    stepLabel: "MILESTONE 03",
  },
];

// Single Sinuous Spiral Path: Center (80,0) -> Left (15,180) -> Right (145,440) -> Left (15,660) -> Center (80,800)
const SPIRAL_PATH_D =
  "M 80,0 C 80,60 15,100 15,180 C 15,260 145,360 145,440 C 145,520 15,580 15,660 C 15,740 80,760 80,800";

const Career = () => {
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

    // Place dot initially at start of spiral curve
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

          // Merge: Single spiral draws itself!
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
    <div className="career-section section-container" id="journey">
      <div className="career-container">
        <h2>
          Education <span>&amp;</span>
          <br /> Journey
        </h2>

        <div className="career-info career-spiral-container" ref={containerRef}>
          {/* Single Spiral Spine with Merged Line Progress */}
          <div className="career-spiral-spine">
            <svg
              className="career-spiral-svg"
              viewBox="0 0 160 800"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="career-spiral-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f40ff" stopOpacity="0.4" />
                  <stop offset="30%" stopColor="#aa42ff" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#c2a4ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <filter id="career-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint Background Guide Track */}
              <path
                className="spiral-track-path"
                d={SPIRAL_PATH_D}
                stroke="rgba(194, 164, 255, 0.16)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Active Energy Progress Stroke */}
              <path
                ref={pathRef}
                className="spiral-progress-path"
                d={SPIRAL_PATH_D}
                stroke="url(#career-spiral-grad)"
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
                filter="url(#career-dot-glow)"
              />
            </svg>
          </div>

          {/* Alternating Spiral Nodes */}
          <div className="career-spiral-nodes">
            {careerData.map((item) => (
              <div
                className={`career-info-box career-spiral-node career-node-${item.side}`}
                key={item.id}
              >
                {/* Node Connector Beam */}
                <div className="career-node-anchor" aria-hidden="true">
                  <span className="career-anchor-dot"></span>
                </div>

                <div className="career-dna-card">
                  <div className="career-card-top">
                    <span className="career-strand-badge">{item.stepLabel}</span>
                    <span className="career-tag-pill">{item.tag}</span>
                  </div>
                  <div className="career-role">
                    <h4>{item.role}</h4>
                    <h5>{item.org}</h5>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
