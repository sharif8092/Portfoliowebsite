import { useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="whatIDO" id="what-i-do">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          {/* Card 1: UI & UX Design */}
          <div
            className="what-content what-glass-card"
            ref={card1Ref}
            onMouseMove={(e) => handleMouseMove(e, card1Ref)}
          >
            <div className="what-card-spotlight"></div>
            <div className="what-card-header">
              <span className="what-badge">
                <span className="what-badge-dot"></span> INTERACTION &amp; HCI
              </span>
              <div className="what-icon-wrapper" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                  <circle cx="6" cy="7" r="1" fill="currentColor"></circle>
                  <circle cx="10" cy="7" r="1" fill="currentColor"></circle>
                </svg>
              </div>
            </div>

            <div className="what-content-in">
              <h3>UI &amp; UX DESIGN</h3>
              <div className="what-focus-label">FOCUS</div>
              <p>
                Designing intuitive digital interfaces and seamless workflows
                centered around user needs, research insights, and clear visual
                hierarchy.
              </p>
              <div className="what-skills-label">SKILLSET &amp; TOOLS</div>
              <div className="what-content-flex">
                <span className="what-tags">Figma</span>
                <span className="what-tags">UI Design</span>
                <span className="what-tags">UX Design</span>
                <span className="what-tags">HCI Ergonomics</span>
                <span className="what-tags">User Research</span>
                <span className="what-tags">Interaction Design</span>
                <span className="what-tags">Design Thinking</span>
              </div>
            </div>
          </div>

          {/* Card 2: Product Design */}
          <div
            className="what-content what-glass-card"
            ref={card2Ref}
            onMouseMove={(e) => handleMouseMove(e, card2Ref)}
          >
            <div className="what-card-spotlight"></div>
            <div className="what-card-header">
              <span className="what-badge">
                <span className="what-badge-dot"></span> SYSTEMS &amp; SPATIAL
              </span>
              <div className="what-icon-wrapper" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>

            <div className="what-content-in">
              <h3>PRODUCT DESIGN</h3>
              <div className="what-focus-label">FOCUS</div>
              <p>
                Bridging human-centered design principles with technological
                feasibility, shaping end-to-end digital experiences from concept
                to execution.
              </p>
              <div className="what-skills-label">SKILLSET &amp; TOOLS</div>
              <div className="what-content-flex">
                <span className="what-tags">Adobe InDesign</span>
                <span className="what-tags">Photoshop</span>
                <span className="what-tags">Illustrator</span>
                <span className="what-tags">Spatial Computing</span>
                <span className="what-tags">Design Systems</span>
                <span className="what-tags">Swiss Typography</span>
                <span className="what-tags">CS Systems Logic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
