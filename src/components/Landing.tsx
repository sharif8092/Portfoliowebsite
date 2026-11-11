import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              AQSA
              <br />
              <span>JAVED</span>
            </h1>
          </div>
          {children}
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">UI/UX Designer</div>
              <div className="landing-h2-2">Product Designer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">UI/UX Designer</div>
              <div className="landing-h2-info-1">Product Designer</div>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
