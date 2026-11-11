import React, { useEffect } from "react";
import { FaDownload, FaXmark } from "react-icons/fa6";
import "./styles/ResumeModal.css";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div
        className="resume-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Aqsa Javed Resume"
      >
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="resume-modal-brand">
            <span className="resume-pulse-dot" />
            <div className="resume-title-wrap">
              <h3>AQSA JAVED</h3>
              <span className="resume-tag">PRODUCT DESIGNER // RESUME</span>
            </div>
          </div>

          <div className="resume-modal-actions">
            <a
              href="/images/resume.jpg"
              download="Aqsa_Javed_Resume.jpg"
              className="resume-download-btn"
              data-cursor="disable"
            >
              <FaDownload className="download-icon" />
              <span>DOWNLOAD</span>
            </a>

            <button
              type="button"
              className="resume-close-btn"
              onClick={onClose}
              aria-label="Close Resume"
              data-cursor="disable"
            >
              <FaXmark />
            </button>
          </div>
        </div>

        {/* Modal Body / Image Preview */}
        <div className="resume-modal-body">
          <div className="resume-image-wrapper">
            <img
              src="/images/resume.jpg"
              alt="Aqsa Javed - Product Designer Resume"
              className="resume-preview-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
