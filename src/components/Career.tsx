import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&amp;</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master of Design (MDes)</h4>
                <h5>Product Design Innovation • Woxsen University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing postgraduate studies focusing on Spatial Interaction, HCI,
              Cognitive Ergonomics, and Publication Design. Co-author of "Beyond Reality".
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BSc in Computer Science</h4>
                <h5>BITS Pilani, India</h5>
              </div>
              <h3>BSc</h3>
            </div>
            <p>
              Foundation in software systems, algorithms, Human-Computer Interaction
              (HCI), and computer graphics, connecting engineering logic to human empathy.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Product Design &amp; Research</h4>
                <h5>School of Arts &amp; Design • Woxsen University</h5>
              </div>
              <h3>RES</h3>
            </div>
            <p>
              Designed the RAAHI ADAS Driver Drowsiness Detection mobile companion
              and authored the 53-page spatial computing research publication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
