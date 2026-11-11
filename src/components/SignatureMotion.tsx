import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowUpward } from "react-icons/md";
import "./styles/SignatureMotion.css";

gsap.registerPlugin(ScrollTrigger);

const KINETIC_LETTERS = [
  { char: "A", id: "k-1" },
  { char: "Q", id: "k-2" },
  { char: "S", id: "k-3" },
  { char: "A", id: "k-4" },
  { char: " ", id: "k-space" },
  { char: "J", id: "k-5" },
  { char: "A", id: "k-6" },
  { char: "V", id: "k-7" },
  { char: "E", id: "k-8" },
  { char: "D", id: "k-9" },
];

const SignatureMotion = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const kineticTrackRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Kinetic letters magnetic interaction
      const track = kineticTrackRef.current;
      if (track) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = track.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          letterRefs.current.forEach((letter) => {
            if (!letter) return;
            const lRect = letter.getBoundingClientRect();
            const letterCenterX = lRect.left + lRect.width / 2 - rect.left;
            const letterCenterY = lRect.top + lRect.height / 2 - rect.top;

            const dist = Math.hypot(mouseX - letterCenterX, mouseY - letterCenterY);
            const maxDist = 240;

            if (dist < maxDist) {
              const intensity = (1 - dist / maxDist) ** 1.8;
              const moveX = ((letterCenterX - mouseX) / dist) * -16 * intensity;
              const moveY = ((letterCenterY - mouseY) / dist) * -20 * intensity;
              const rot = ((mouseX - letterCenterX) / maxDist) * 14 * intensity;

              gsap.to(letter, {
                x: moveX,
                y: moveY,
                rotateZ: rot,
                duration: 0.35,
                ease: "power2.out",
                color: "#c2a4ff",
              });
            } else {
              gsap.to(letter, {
                x: 0,
                y: 0,
                rotateZ: 0,
                duration: 0.55,
                ease: "elastic.out(1, 0.4)",
                color: "transparent",
              });
            }
          });
        };

        const handleMouseLeave = () => {
          letterRefs.current.forEach((letter) => {
            if (!letter) return;
            gsap.to(letter, {
              x: 0,
              y: 0,
              rotateZ: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
              color: "transparent",
            });
          });
        };

        track.addEventListener("mousemove", handleMouseMove);
        track.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          track.removeEventListener("mousemove", handleMouseMove);
          track.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="signature-motion-section" ref={containerRef}>
      {/* Monumental Kinetic Typographic Display */}
      <div className="kinetic-typography-stage">
        <div className="kinetic-track" ref={kineticTrackRef}>
          <div className="kinetic-glow-backdrop" />
          <h1 className="kinetic-name-display" aria-label="AQSA JAVED">
            {KINETIC_LETTERS.map((item, index) =>
              item.char === " " ? (
                <span key={item.id} className="kinetic-space">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={item.id}
                  ref={(el) => (letterRefs.current[index] = el)}
                  className="kinetic-letter"
                  data-char={item.char}
                >
                  {item.char}
                </span>
              )
            )}
          </h1>
        </div>

        {/* Ticker marquee badge */}
        <div className="sig-ticker-ribbon">
          <div className="sig-ticker-content">
            <span>HUMAN-CENTERED DESIGN</span>
            <span className="sep">✦</span>
            <span>SYSTEMS LOGIC (BITS PILANI)</span>
            <span className="sep">✦</span>
            <span>PRODUCT INNOVATION (WOXSEN)</span>
            <span className="sep">✦</span>
            <span>HCI &amp; SPATIAL COMPUTING</span>
            <span className="sep">✦</span>
            <span>SWISS TYPOGRAPHY</span>
            <span className="sep">✦</span>
            <span>ACCESSIBLE EXPERIENCES</span>
            <span className="sep">✦</span>
            <span>HUMAN-CENTERED DESIGN</span>
            <span className="sep">✦</span>
            <span>SYSTEMS LOGIC (BITS PILANI)</span>
            <span className="sep">✦</span>
            <span>PRODUCT INNOVATION (WOXSEN)</span>
          </div>
        </div>
      </div>

      {/* Enhanced Status & Back to Top Bar */}
      <div className="sig-bottom-bar">
        <div className="sig-status-badge">
          <span className="sig-live-indicator" />
          <span>Available for Product Design Roles &amp; Research Collaborations</span>
        </div>
        <div className="sig-location-credit">
          <span>Based in Hyderabad, India</span>
          <span className="dot">•</span>
          <span>Open Worldwide</span>
        </div>
        <button className="sig-back-to-top" onClick={scrollToTop} data-cursor="disable">
          <span>Back to Top</span>
          <MdArrowUpward />
        </button>
      </div>
    </div>
  );
};

export default SignatureMotion;
