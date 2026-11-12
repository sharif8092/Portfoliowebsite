import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../context/LoadingProvider";
import { setProgress } from "./Loading";
import { setAllTimeline } from "./utils/GsapScroll";
import "./styles/SpatialPortrait.css";

gsap.registerPlugin(ScrollTrigger);

const SpatialPortrait = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backLayerRef = useRef<HTMLDivElement>(null);
  const portraitLayerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const { setLoading } = useLoading();
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );

  // 1. Loading synchronization
  useEffect(() => {
    const progress = setProgress((value) => setLoading(value));
    const img = new Image();
    img.src = "/images/aqsa_clean.png";
    img.onload = () => progress.loaded();
    img.onerror = () => progress.loaded();

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);

    setAllTimeline();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setLoading]);

  // 2. Interactive 3D Cursor Parallax
  useEffect(() => {
    let mouse = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.x = (e.clientX / innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const updateTilt = () => {
      current.x += (mouse.x - current.x) * 0.08;
      current.y += (mouse.y - current.y) * 0.08;

      if (stageRef.current) {
        const rotX = -current.y * 10;
        const rotY = current.x * 12;
        stageRef.current.style.transform = `rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg)`;
      }

      animationFrameId = requestAnimationFrame(updateTilt);
    };

    animationFrameId = requestAnimationFrame(updateTilt);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3. GSAP ScrollTrigger:
  // - Starting (Hero): CENTERED in viewport between AQSA JAVED and UI/UX Designer (opacity: 1)
  // - About Me: Glides smoothly to RIGHT SIDE (~150px from right edge) (opacity: 1)
  // - After About Me (What I Do, Education & Journey, Work): Fades out completely to 0 opacity!
  useEffect(() => {
    if (!containerRef.current) return;

    const landingEl = document.querySelector(".landing-section") as HTMLElement | null;
    const aboutEl = document.querySelector(".about-section") as HTMLElement | null;

    if (!landingEl || !aboutEl) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const getTargetX = () => {
        const cardWidth = containerRef.current?.offsetWidth || 280;
        // Positioned comfortably in About Me (~140px-180px from right edge)
        const rightMargin = Math.max(120, Math.min(200, window.innerWidth * 0.11));
        return window.innerWidth / 2 - rightMargin - cardWidth / 2;
      };

      if (isDesktop) {
        // Base state: Centered in Hero, 100% visible
        gsap.set(containerRef.current, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          opacity: 1,
          visibility: "visible",
          scale: 1,
          filter: "blur(0px)",
          pointerEvents: "none",
        });

        if (backLayerRef.current) {
          gsap.set(backLayerRef.current, { z: -35, scale: 0.98 });
        }
        if (portraitLayerRef.current) {
          gsap.set(portraitLayerRef.current, { z: 0 });
        }
        gsap.set(".spatial-pill", { opacity: 0.65, scale: 0.92 });

        // Journey Timeline: Ends within About Me so 1 scroll in About Me fades out the pic!
        const journeyTl = gsap.timeline({
          scrollTrigger: {
            trigger: landingEl,
            start: "top top",
            endTrigger: aboutEl,
            end: "bottom 95%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // 1. Inside Hero (0 -> 0.35): 3D depth expansion in center
        if (backLayerRef.current) {
          journeyTl.to(
            backLayerRef.current,
            {
              z: -90,
              scale: 1.12,
              opacity: 0.95,
              duration: 0.3,
              ease: "power1.inOut",
            },
            0
          );
        }

        journeyTl.to(
          ".pill-hci",
          {
            x: -45,
            z: 35,
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          0
        );

        journeyTl.to(
          ".pill-cs",
          {
            x: 45,
            z: -10,
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          0
        );

        // 2. Glides swiftly to the FAR RIGHT SIDE in About Me (0.3 -> 0.65)
        journeyTl.to(
          containerRef.current,
          {
            x: () => getTargetX(),
            scale: 0.95,
            opacity: 1,
            duration: 0.35,
            ease: "power1.inOut",
          },
          0.3
        );

        // 3. Briefly visible on the far right as user enters About Me (0.65 -> 0.75)
        // (Between 0.65 and 0.75, image is firmly on the right side at opacity 1)

        // 4. As soon as user does 1 scroll down in About Me: Fades out immediately! (0.75 -> 1.0)
        journeyTl.to(
          containerRef.current,
          {
            opacity: 0,
            scale: 0.82,
            y: -40,
            filter: "blur(10px)",
            duration: 0.25,
            ease: "power2.in",
          },
          0.75
        );
      } else {
        // Mobile: Centered in Hero, gently fades out before About Me
        gsap.set(containerRef.current, {
          opacity: 1,
          visibility: "visible",
        });

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: landingEl,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        mobileTl.to(
          containerRef.current,
          {
            opacity: 0,
            scale: 0.85,
            duration: 1,
            ease: "power1.inOut",
          },
          0.3
        );
      }
    });

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className={`spatial-container ${
        isDesktop ? "spatial-desktop" : "spatial-mobile"
      }`}
    >
      {/* 3D Perspective Stage */}
      <div ref={stageRef} className="spatial-stage">
        {/* ==================================================================
            LAYER 1: BACK LAYER (Silhouette + Ambient Halo + Wireframe Grid)
            ================================================================== */}
        <div ref={backLayerRef} className="spatial-layer layer-back">
          {/* Ambient Glowing Purple Nebula Halo */}
          <div className="spatial-halo" />

          {/* Spatial Grid & Coordinate Targeting */}
          <div className="spatial-grid-overlay">
            <span className="grid-corner tl">+</span>
            <span className="grid-corner tr">+</span>
            <span className="grid-corner bl">+</span>
            <span className="grid-corner br">+</span>
            <div className="grid-badge">
              <span>Z: -90mm</span>
              <span className="grid-dot" />
              <span>SPATIAL CORE</span>
            </div>
          </div>

          {/* Dark Silhouette Mask */}
          <img
            src="/images/aqsa_clean.png"
            alt="Back Silhouette"
            className="spatial-img silhouette-img"
          />
        </div>

        {/* ==================================================================
            FLOATING SPATIAL TEXT PILLS (In Between Layers)
            ================================================================== */}
        <div ref={badgesRef} className="spatial-pills-container">
          <div className="spatial-pill pill-hci">
            <span className="pill-dot" />
            <span>SPATIAL HCI</span>
          </div>
          <div className="spatial-pill pill-cs">
            <span className="pill-dot" />
            <span>BITS PILANI // CS</span>
          </div>
          <div className="spatial-pill pill-research">
            <span className="pill-dot" />
            <span>RESEARCH &bull; MDES</span>
          </div>
        </div>

        {/* ==================================================================
            LAYER 2: UNIFIED CONTINUOUS PORTRAIT (Zero Neck Break!)
            ================================================================== */}
        <div ref={portraitLayerRef} className="spatial-layer layer-portrait">
          <img
            src="/images/aqsa_clean.png"
            alt="Aqsa Javed — Product Designer"
            className="spatial-img portrait-main-img"
          />

          {/* Spatial UI Face Targeting Brackets */}
          <div className="face-target-ui">
            <div className="target-bracket-l" />
            <div className="target-bracket-r" />
            <span className="target-id">AQSA JAVED // 01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialPortrait;
