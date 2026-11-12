import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import SignatureMotion from "./SignatureMotion";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-circuit-line",
        { maxHeight: "0%", opacity: 0 },
        {
          maxHeight: "100%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 75%",
            end: "top 25%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    const el = titleRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * 0.15);
      yTo((e.clientY - (rect.top + rect.height / 2)) * 0.15);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ctx.revert();
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        {/* Living Circuit Plunging into Contact */}
        <div className="contact-circuit-lead">
          <div className="contact-circuit-line">
            <div className="contact-circuit-dot"></div>
          </div>
        </div>
        <div className="contact-header">
          <h3>Contact</h3>
          <h2 ref={titleRef} className="contact-magnetic-title">
            Let's create intuitive digital experiences <span>together.</span>
          </h2>
          <p>
            Have a project in mind, an opportunity to discuss, or just want to connect?
            Feel free to reach out.
          </p>
        </div>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:aqsaj732@gmail.com" data-cursor="disable">
                aqsaj732@gmail.com
              </a>
            </p>
            <h4>Location</h4>
            <p>Hyderabad, India</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com/in/aqsa-javed89"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="#"
              data-cursor="disable"
              className="contact-social"
              title="Behance profile to be added"
            >
              Behance (Coming Soon) <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Aqsa Javed</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>

        {/* Living Circuit Node Landing into Signature */}
        <div className="signature-circuit-beacon">
          <div className="signature-beacon-pulse"></div>
        </div>

        {/* Sri Venkat-Style Signature & Monumental Kinetic Name Motion */}
        <SignatureMotion />
      </div>
    </div>
  );
};

export default Contact;
