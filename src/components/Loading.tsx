import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isFinishing, setIsFinishing] = useState(false);
  const displayPercent = Math.min(Math.round(percent), 100);

  useEffect(() => {
    if (percent >= 100) {
      // Trigger cinematic smooth curtain lift
      const timer = setTimeout(() => {
        setIsFinishing(true);
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) {
            module.initialFX();
          }
        });
        // Unmount loader after exit animation finishes
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [percent, setIsLoading]);

  return (
    <div
      className={`dark-loader-screen ${isFinishing ? "loader-curtain-up" : ""}`}
    >
      {/* Ambient background glow */}
      <div className="loader-ambient-glow" />

      {/* Top branding */}
      <div className="loader-top-bar">
        <div className="loader-brand">
          <span className="loader-pulse-dot" />
          <span className="loader-brand-name">AQSA JAVED</span>
        </div>
        <div className="loader-subtitle">UI/UX &amp; PRODUCT DESIGNER</div>
      </div>

      {/* Center content */}
      <div className="loader-center-content">
        <div className="loader-eyebrow">PORTFOLIO • 2026</div>

        <div className="loader-counter">
          <span className="loader-number">{displayPercent}</span>
          <span className="loader-percent-symbol">%</span>
        </div>

        {/* Progress bar track */}
        <div className="loader-bar-track">
          <div
            className="loader-bar-fill"
            style={{ width: `${displayPercent}%` }}
          />
        </div>

        <div className="loader-status">
          {displayPercent >= 100
            ? "WELCOME"
            : "DESIGNING INTUITIVE EXPERIENCES..."}
        </div>
      </div>

      {/* Bottom tag */}
      <div className="loader-bottom-bar">
        <span>HUMAN-CENTERED DESIGN</span>
        <span className="loader-sep">•</span>
        <span>RESEARCH</span>
        <span className="loader-sep">•</span>
        <span>TECHNOLOGY</span>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  // Smooth, fast progressive counter reaching ~90% in ~1s
  const interval = setInterval(() => {
    if (percent < 50) {
      percent += Math.round(Math.random() * 6) + 3;
      setLoading(Math.min(percent, 50));
    } else if (percent < 88) {
      percent += Math.round(Math.random() * 4) + 2;
      setLoading(Math.min(percent, 88));
    } else if (percent < 95) {
      percent += 1;
      setLoading(Math.min(percent, 95));
    }
  }, 45);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      const finishInterval = setInterval(() => {
        if (percent < 100) {
          percent += 2;
          setLoading(Math.min(percent, 100));
        } else {
          clearInterval(finishInterval);
          resolve(100);
        }
      }, 15);
    });
  }

  // Safety fallback: if anything stalls, force finish at 2.8s
  setTimeout(() => {
    clearInterval(interval);
    setLoading(100);
  }, 2800);

  return { loaded, percent, clear };
};
