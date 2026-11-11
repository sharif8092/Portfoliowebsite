import {
  FaLinkedinIn,
  FaBehance,
  FaEnvelope,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import ResumeModal from "./ResumeModal";

const SocialIcons = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResumeOpen(true);
  };

  return (
    <>
      <div className="icons-section">
        <div className="social-icons" data-cursor="icons" id="social">
          <span>
            <a
              href="https://www.linkedin.com/in/aqsa-javed89"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn />
            </a>
          </span>
          <span>
            <a
              href="#"
              aria-label="Behance Profile (Coming Soon)"
              title="Behance (Coming Soon)"
            >
              <FaBehance />
            </a>
          </span>
          <span>
            <a
              href="mailto:aqsaj732@gmail.com"
              aria-label="Email Aqsa Javed"
              title="Email Aqsa Javed"
            >
              <FaEnvelope />
            </a>
          </span>
        </div>
        <button
          className="resume-button"
          onClick={handleResumeClick}
          aria-label="Open Resume"
          type="button"
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </button>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
};

export default SocialIcons;
