import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  useGSAP(() => {
    let timeline: gsap.core.Timeline | null = null;

    function initWorkScroll() {
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      const boxes = document.querySelectorAll(".work-box");
      const section = document.querySelector(".work-section") as HTMLElement;
      if (!workFlex || !boxes.length || !section) return;

      // Kill previous instance if resizing or re-initializing
      if (timeline) {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      }

      // Reset x before measuring to guarantee 100% accurate bounding coordinates
      gsap.set(workFlex, { x: 0 });

      const lastBox = boxes[boxes.length - 1] as HTMLElement;
      const lastBoxRect = lastBox.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Center the final card horizontally if screen is wider than the card,
      // or maintain comfortable padding on smaller screens
      const rightPadding = Math.max(40, (viewportWidth - lastBox.offsetWidth) / 2);
      const targetTravel = Math.max(0, lastBoxRect.right - viewportWidth + rightPadding);

      // Pin duration: give ample vertical scroll travel so all 4 projects are comfortably experienced
      const pinDistance = Math.max(1800, Math.round(targetTravel * 1.35 + 300));

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${pinDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      // Animate cards across the viewport
      timeline.to(".work-flex", {
        x: -targetTravel,
        ease: "none",
        duration: 1,
      });

      // Generous hold at the end so the user can inspect the 4th project before unpinning
      timeline.to({}, { duration: 0.3 });
    }

    initWorkScroll();

    const handleResize = () => {
      initWorkScroll();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  // Aqsa Javed — Real Case Studies & Projects
  const projects = [
    {
      id: "01",
      title: "RAAHI — Driver Drowsiness Detection App",
      category: "Product Design & HCI",
      tools: "Figma Slides, HCI Ergonomics, ADAS Interaction Models, 3D Mascot",
      image: "/images/projects/raahi_cover.png",
      link: "https://www.figma.com/slides/1yxd6fB3wZeWLXaoihFZdb/Driver-Drowsiness--Copy-",
    },
    {
      id: "02",
      title: "Beyond Reality — Evolution of VR & AR",
      category: "Spatial Design & Research",
      tools: "Adobe InDesign, Photoshop, Spatial Interaction, HCI Literature Synthesis, 53 Pages",
      image: "/images/projects/beyond_reality_cover.png",
      link: "https://startling-stroopwafel-805e80.netlify.app/assets/aistudio/Final_Magazine_VR___AR_9aa001e7.pdf",
    },
    {
      id: "03",
      title: "Hanging Garden: Bloom — Editorial Travel Magazine",
      category: "Editorial Design & Typography",
      tools: "Adobe InDesign, Editorial Typography, Curated Color Grading, Layout Architecture",
      image: "/images/projects/hanging_garden_cover.jpg",
      link: "https://startling-stroopwafel-805e80.netlify.app/assets/aistudio/Aqsa-Magazine_3a00bb79.pdf",
    },
    {
      id: "04",
      title: "Ferrari F40 — Kinetic Typographic Poster",
      category: "Visual Identity & Swiss Typography",
      tools: "Adobe Illustrator, Photoshop, Swiss Grid Systems, Automotive Telemetry Typography",
      image: "/images/projects/ferrari_cover.png",
      link: "https://startling-stroopwafel-805e80.netlify.app/",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.id}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
