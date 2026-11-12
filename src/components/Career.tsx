import "./styles/Career.css";

const careerData = [
  {
    id: "01",
    tag: "NOW",
    role: "Master of Design (MDes)",
    org: "Product Design Innovation • Woxsen University",
    desc: 'Pursuing postgraduate studies focusing on Spatial Interaction, HCI, Cognitive Ergonomics, and Publication Design. Co-author of "Beyond Reality".',
    side: "left",
    strand: "HELIX STRAND α",
  },
  {
    id: "02",
    tag: "BSc",
    role: "BSc in Computer Science",
    org: "BITS Pilani, India",
    desc: "Foundation in software systems, algorithms, Human-Computer Interaction (HCI), and computer graphics, connecting engineering logic to human empathy.",
    side: "right",
    strand: "HELIX STRAND β",
  },
  {
    id: "03",
    tag: "RES",
    role: "Product Design & Research",
    org: "School of Arts & Design • Woxsen University",
    desc: "Designed the RAAHI ADAS Driver Drowsiness Detection mobile companion and authored the 53-page spatial computing research publication.",
    side: "left",
    strand: "HELIX STRAND α",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container" id="journey">
      <div className="career-container">
        <h2>
          Education <span>&amp;</span>
          <br /> Journey
        </h2>

        <div className="career-info career-dna-container">
          {/* Central DNA Double-Helix Spine */}
          <div className="career-dna-spine">
            <svg
              className="career-dna-svg"
              viewBox="0 0 60 700"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="dna-grad-alpha" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c2a4ff" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#aa42ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="dna-grad-beta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f40ff" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#d29bff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#aa42ff" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Base Pair Rungs */}
              <line x1="12" y1="110" x2="48" y2="110" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="20" y1="230" x2="40" y2="230" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="350" x2="48" y2="350" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="20" y1="470" x2="40" y2="470" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="12" y1="590" x2="48" y2="590" stroke="rgba(194, 164, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Intertwined Double-Helix Strands */}
              <path
                d="M 30,0 C 8,70 8,160 30,230 C 52,300 52,390 30,460 C 8,530 8,620 30,700"
                stroke="url(#dna-grad-alpha)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 30,0 C 52,70 52,160 30,230 C 8,300 8,390 30,460 C 52,530 52,620 30,700"
                stroke="url(#dna-grad-beta)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Living Circuit Scroll Beam */}
            <div className="career-timeline">
              <div className="career-dot" />
            </div>
          </div>

          {/* DNA Alternating Spiral Nodes */}
          <div className="career-dna-nodes">
            {careerData.map((item) => (
              <div
                className={`career-info-box career-dna-node career-node-${item.side}`}
                key={item.id}
              >
                {/* Nucleotide Connector Rung */}
                <div className="career-dna-rung" aria-hidden="true">
                  <span className="career-rung-line"></span>
                  <span className="career-rung-node"></span>
                </div>

                <div className="career-dna-card">
                  <div className="career-card-top">
                    <span className="career-strand-badge">{item.strand}</span>
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
