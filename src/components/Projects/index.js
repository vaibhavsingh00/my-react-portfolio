import React, { useCallback, useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

// Import all images from local folder
import graphic1 from "../../assets/images/graphic 1.jpg";
import brandingKit from "../../assets/images/graphic 2.png";
import ecommerceImg from "../../assets/images/e commerce.png";
import portfolioImg from "../../assets/images/pprtfolio 1.png";
import skyguardImg from "../../assets/images/skyguard.png";
import parcelDroneImg from "../../assets/images/drone dilivery.png";
import pneumoniaImg from "../../assets/images/nemoniaya detection.png";
import roadAccidentImg from "../../assets/images/jarvis project.png";
import travelVlogImg from "../../assets/images/video editing.png";
import eventReelImg from "../../assets/images/video editing (2).png";

// ---------------------------------------------------------------------------
// Data. Add / rename folders and projects here — nothing else needs to change.
// ---------------------------------------------------------------------------
const categories = [
  {
    name: "Web Development",
    id: "web-development",
    projects: [
      {
        name: "E-commerce Platform",
        description: "MERN stack with payments.",
        summary:
          "Developed a full-stack e-commerce site with cart, authentication, and Stripe payments.",
        image: ecommerceImg,
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com/yourusername/ecommerce",
        demo: "#"
      },
      {
        name: "Portfolio Website",
        description: "Personal portfolio site.",
        summary:
          "Built a responsive portfolio with animations using React and SCSS.",
        image: portfolioImg,
        tech: ["React", "SCSS", "CSS Animations"],
        github: "https://github.com/yourusername/portfolio",
        demo: "#"
      }
    ]
  },
  {
    name: "Artificial Intelligence",
    id: "ai-ml",
    projects: [
      {
        name: "Pneumonia Detection",
        description: "X-ray image analysis.",
        summary:
          "CNN deep learning model for detecting pneumonia with 90%+ accuracy.",
        image: pneumoniaImg,
        tech: ["Python", "TensorFlow", "Keras", "CNN"],
        github: "https://github.com/yourusername/pneumonia-detection",
        demo: "#"
      },
      {
        name: "Road Accident Prevention",
        description: "AI safety system.",
        summary:
          "AI-powered accident prevention using real-time video analytics.",
        image: roadAccidentImg,
        tech: ["Python", "OpenCV", "YOLO", "Computer Vision"],
        github: "https://github.com/yourusername/road-accident-ai"
      }
    ]
  },
  {
    name: "Graphic Design",
    id: "graphic-design",
    projects: [
      {
        name: "Modern Logo Design",
        description: "Minimalistic tech startup logo.",
        summary:
          "Designed a clean, modern logo using Adobe Illustrator, focusing on geometric balance.",
        image: graphic1,
        tech: ["Illustrator", "Typography", "Branding"],
        github: "https://github.com/yourusername/logo-design"
      },
      {
        name: "Branding Kit",
        description: "Full branding package.",
        summary:
          "Included typography, color palette, and mockups for social media branding.",
        image: brandingKit,
        tech: ["Illustrator", "Photoshop", "Brand Strategy"],
        github: "https://github.com/yourusername/branding-kit"
      }
    ]
  },
  {
    name: "Embedded Systems",
    id: "embedded-systems",
    projects: [
      {
        name: "SkyGuard SE",
        description: "AI surveillance drone.",
        summary:
          "GPS-based drone with AI object tracking and obstacle avoidance.",
        image: skyguardImg,
        tech: ["Arduino", "GPS", "Computer Vision", "Python"],
        github: "https://github.com/yourusername/skyguard"
      },
      {
        name: "Parcel Delivery Drone",
        description: "Autonomous delivery drone.",
        summary:
          "Integrated payload drop system and optimized delivery routes.",
        image: parcelDroneImg,
        tech: ["Raspberry Pi", "Flight Controller", "Route Optimization"],
        github: "https://github.com/yourusername/parcel-drone"
      }
    ]
  },
  {
    name: "Other Projects",
    id: "other-projects",
    projects: [
      {
        name: "Travel Vlog Edit",
        description: "Cinematic travel vlog.",
        summary:
          "Edited footage with transitions, color grading, and music sync.",
        image: travelVlogImg,
        tech: ["Premiere Pro", "Color Grading", "Audio Sync"],
        github: "https://github.com/yourusername/travel-vlog",
        demo: "#"
      },
      {
        name: "Event Highlight Reel",
        description: "College event highlights.",
        summary:
          "Produced a dynamic highlights video for social media promotion.",
        image: eventReelImg,
        tech: ["Premiere Pro", "After Effects", "Motion Graphics"],
        github: "https://github.com/yourusername/event-reel"
      }
    ]
  }
];

// How long the folder-flap animation plays before the contents view mounts.
// Keep in sync with the `.folder.opening .folder-front` transition in the SCSS.
const FOLDER_OPEN_DELAY = 520;

const Projects = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Escape closes whatever is topmost: project modal, then folder.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (selectedProject) setSelectedProject(null);
      else if (selectedCategory) setSelectedCategory(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject, selectedCategory]);

  const openFolder = useCallback(
    (category) => {
      if (animatingId) return;
      setAnimatingId(category.id);
      setTimeout(() => {
        setSelectedCategory(category);
        setAnimatingId(null);
      }, FOLDER_OPEN_DELAY);
    },
    [animatingId]
  );

  const closeFolder = useCallback(() => {
    setSelectedCategory(null);
    setSelectedProject(null);
  }, []);

  const openProject = (project, e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const closeProject = () => setSelectedProject(null);

  const handleCardKeyDown = (project, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(project, e);
    }
  };

  return (
    <>
      <div className="container projects-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Projects".split("")}
            idx={15}
          />
        </h1>

        {selectedCategory && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <button type="button" className="crumb root" onClick={closeFolder}>
              Projects
            </button>
            <span className="sep">/</span>
            <span className="crumb current" aria-current="page">
              {selectedCategory.name}
            </span>
          </nav>
        )}

        {!selectedCategory ? (
          <div className="folder-grid">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={`folder${animatingId === cat.id ? " opening" : ""}`}
                onClick={() => openFolder(cat)}
                aria-label={`Open ${cat.name} folder`}
              >
                <span className="folder-shadow" aria-hidden="true" />
                <span className="folder-icon" aria-hidden="true">
                  <span className="folder-papers" />
                  <span className="folder-back" />
                  <span className="folder-front" />
                </span>
                <span className="folder-label">{cat.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="folder-contents" key={selectedCategory.id}>
            <button type="button" className="back-btn" onClick={closeFolder}>
              <span className="arrow">←</span> Back to Projects
            </button>

            <div className="project-grid">
              {selectedCategory.projects.map((project, idx) => (
                <div
                  className="project-card"
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => openProject(project, e)}
                  onKeyDown={(e) => handleCardKeyDown(project, e)}
                >
                  <div className="thumb">
                    <img src={project.image} alt={project.name} />
                  </div>
                  <div className="card-body">
                    <p className="name">{project.name}</p>
                    <p className="desc">{project.description}</p>
                    <div className="tech-row">
                      {project.tech.map((t) => (
                        <span className="tech-pill" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="buttons">
                      <button
                        type="button"
                        className="btn github"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, "_blank");
                        }}
                      >
                        GitHub
                      </button>
                      {project.demo && (
                        <button
                          type="button"
                          className="btn demo"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demo, "_blank");
                          }}
                        >
                          Live Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProject}>
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.name}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-btn"
              onClick={closeProject}
              aria-label="Close project details"
            >
              ×
            </button>
            <div className="modal-image-wrap">
              <img
                className="modal-image"
                src={selectedProject.image}
                alt={selectedProject.name}
              />
            </div>
            <div className="modal-body">
              <h3>{selectedProject.name}</h3>
              <p className="modal-summary">{selectedProject.summary}</p>
              <div className="tech-row">
                {selectedProject.tech.map((t) => (
                  <span className="tech-pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="btn github"
                  onClick={() => window.open(selectedProject.github, "_blank")}
                >
                  GitHub
                </button>
                {selectedProject.demo && (
                  <button
                    type="button"
                    className="btn demo"
                    onClick={() =>
                      window.open(selectedProject.demo, "_blank")
                    }
                  >
                    Live Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Loader type="pacman" />
    </>
  );
};

export default Projects;