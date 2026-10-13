import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import OthersFolders from "../OthersSection/OthersFolders";
import VideoGallery from "../VideoGallery/VideoGallery";
import { personalVideos, clientVideos } from "../../data/videoService";
import "./index.scss";

// Import all images from local folder
import roomzyImg from "../../assets/images/roomzy.png";
import intellioImg from "../../assets/images/intellio.png";
import eventroImg from "../../assets/images/eventro.png";
import skyguardImg from "../../assets/images/skyguard.png";
import parcelDroneImg from "../../assets/images/drone dilivery.png";
import pneumoniaImg from "../../assets/images/nemoniaya detection.png";
import roadAccidentImg from "../../assets/images/jarvis project.png";

// Import all Graphic Design work from src/assets/images/graphic
import financeYoutubeBanner from "../../assets/images/graphic/Blue and White Modern Finance Tips Youtube Banner.png";
import aiConceptArt1 from "../../assets/images/graphic/Gemini_Generated_Image_e23330e23330e233.png";
import aiConceptArt2 from "../../assets/images/graphic/Gemini_Generated_Image_ik51iiik51iiik51 (1).png";
import aiConceptArt3 from "../../assets/images/graphic/Gemini_Generated_Image_ymysddymysddymys.png";
import budgetReelCover1 from "../../assets/images/graphic/Green Modern Budget Tips Finance Influencer Instagram Reel Cover.png";
import budgetReelCover2 from "../../assets/images/graphic/Green Modern Budget Tips Finance Influencer Instagram Reel Cover (1).png";
import budgetReelCover3 from "../../assets/images/graphic/Green Modern Budget Tips Finance Influencer Instagram Reel Cover (2).png";
import creativePosterDesign from "../../assets/images/graphic/Untitled design.png";
import whyPhoneThumbnail from "../../assets/images/graphic/why phone.png";

// ---------------------------------------------------------------------------
// Data. Add / rename folders and projects here — nothing else needs to change.
// ---------------------------------------------------------------------------
const categories = [
  {
    name: "Web Development",
    id: "web-development",
    projects: [
      {
        name: "Roomzy — AI-Powered PG, Room, Flat & Roommate Discovery Platform",
        description:
          "Roomzy is an AI-powered PG, room, flat and roommate discovery platform designed to make relocation and accommodation discovery easier for students, freshers, interns, and working professionals.",
        summary:
          "Roomzy is an AI-powered PG, room, flat and roommate discovery platform designed to make relocation and accommodation discovery easier for students, freshers, interns, and working professionals.",
        image: roomzyImg,
        tech: ["React", "Node.js", "Express", "MongoDB", "AI Matching"],
        github: "https://github.com/vaibhavsingh00/roomzy",
        notDeployed: true
      },
      {
        name: "Intelligo.AI",
        description:
          "Intelligo.AI is a full-stack AI-powered SaaS application built with the PERN Stack (PostgreSQL, Express, React, Node.js). It offers a range of intelligent tools that help users generate articles, create blog titles, generate images, remove backgrounds or objects from images, and analyze resumes — all in a clean, responsive web interface.",
        summary:
          "Intelligo.AI is a full-stack AI-powered SaaS application built with the PERN Stack (PostgreSQL, Express, React, Node.js). It offers a range of intelligent tools that help users generate articles, create blog titles, generate images, remove backgrounds or objects from images, and analyze resumes — all in a clean, responsive web interface.",
        image: intellioImg,
        tech: ["PostgreSQL", "Express", "React", "Node.js", "PERN Stack", "AI Tools"],
        github: "https://github.com/vaibhavsingh00/Intellio.AI",
        demo: "https://intellio-ai-ruby.vercel.app/"
      },
      {
        name: "Eventora",
        description:
          "Eventora is a full-stack event booking and management platform built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. It provides seamless event discovery, two-factor OTP verification for registrations and bookings, role-based dashboards for users and organizers, dynamic capacity tracking, and automated email notifications.",
        summary:
          "Eventora is a full-stack event booking and management platform built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. It provides seamless event discovery, two-factor OTP verification for registrations and bookings, role-based dashboards for users and organizers, dynamic capacity tracking, and automated email notifications.",
        image: eventroImg,
        tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "MERN Stack"],
        github: "https://github.com/vaibhavsingh00/eventora",
        demo: "https://eventora-blue.vercel.app/"
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
        name: "Finance Tips — YouTube Banner & Thumbnail",
        description:
          "Modern YouTube banner and thumbnail design with clean visual branding and financial typography.",
        summary:
          "High-impact YouTube banner and promotional thumbnail designed for modern finance creators, focusing on visual hierarchy, typography, and clear branding.",
        image: financeYoutubeBanner,
        tech: ["YouTube Banner", "Thumbnail", "Graphic Design", "Photoshop"]
      },
      {
        name: "Budget Tips — Instagram Reel Cover (Vol. 1)",
        description:
          "High-CTR Instagram Reel cover created for finance influencer content.",
        summary:
          "Eye-catching vertical 9:16 Instagram Reel cover designed for personal finance and budgeting content, optimized for mobile feed readability.",
        image: budgetReelCover1,
        tech: ["Instagram Reel", "Cover Design", "Social Media", "Canva"]
      },
      {
        name: "Budget Tips — Instagram Reel Cover (Vol. 2)",
        description:
          "Modern finance influencer reel cover design featuring bold typography.",
        summary:
          "Engaging vertical reel cover variant designed to maximize views and click-through rates across Instagram Explore and Reels tabs.",
        image: budgetReelCover2,
        tech: ["Instagram Reel", "Visual Design", "Typography", "Branding"]
      },
      {
        name: "Budget Tips — Instagram Reel Cover (Vol. 3)",
        description:
          "Creative social media reel thumbnail with contrast-driven aesthetic.",
        summary:
          "Third edition of the budget tips series with enhanced contrast, icons, and aesthetic color palettes for finance creators.",
        image: budgetReelCover3,
        tech: ["Instagram Reel", "Reel Cover", "Content Creation", "Graphic Design"]
      },
      {
        name: "Why Phone — YouTube Thumbnail",
        description:
          "High-contrast YouTube video thumbnail designed for maximum click-through rate.",
        summary:
          "Dynamic YouTube thumbnail designed with high-contrast text, facial expression highlights, and compelling color accents to drive viewer interest.",
        image: whyPhoneThumbnail,
        tech: ["YouTube Thumbnail", "Graphic Design", "Visual Arts", "Photoshop"]
      },
      {
        name: "Creative Poster & Visual Design",
        description:
          "Custom visual composition showcasing typography balance and modern design aesthetics.",
        summary:
          "Artistic graphic design composition created for digital branding, poster displays, and marketing media.",
        image: creativePosterDesign,
        tech: ["Poster Design", "Visual Arts", "Branding", "Creative Design"]
      },
      {
        name: "AI Concept Art & Visual Design I",
        description:
          "Futuristic digital concept visual exploring lighting, textures, and atmospheric depth.",
        summary:
          "Creative digital artwork and concept visualization blending modern design principles with AI-assisted creative workflows.",
        image: aiConceptArt1,
        tech: ["Concept Art", "Digital Art", "Visual Design", "AI Arts"]
      },
      {
        name: "AI Concept Art & Visual Design II",
        description:
          "Surreal digital art composition with dynamic color grading and cinematic tone.",
        summary:
          "High-resolution digital visual composition exploring rich color gradients, surreal textures, and cinematic aesthetic styling.",
        image: aiConceptArt2,
        tech: ["Concept Art", "Surreal Art", "Color Grading", "Visual Arts"]
      },
      {
        name: "AI Concept Art & Visual Design III",
        description:
          "Cinematic digital artwork focusing on character depth, lighting, and detail.",
        summary:
          "Atmospheric digital composition with custom lighting contrast, intricate details, and cinematic color palettes.",
        image: aiConceptArt3,
        tech: ["Concept Art", "Digital Illustration", "Cinematic Visuals", "Design"]
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
    name: "Video Editing",
    id: "video-editing",
    isVideoEditingSection: true
  }
];

// How long the folder-flap animation plays before the contents view mounts.
// Keep in sync with the `.folder.opening .folder-front` transition in the SCSS.
const FOLDER_OPEN_DELAY = 520;

const Projects = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [searchParams, setSearchParams] = useSearchParams();
  const [animatingId, setAnimatingId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const categoryParam = searchParams.get("category");
  const subParam = searchParams.get("sub");

  const selectedCategory = categoryParam
    ? (categories.find((c) => c.id === categoryParam) ||
       ((categoryParam === "others" || categoryParam === "other-projects")
         ? categories.find((c) => c.id === "video-editing")
         : null))
    : null;

  const selectedSubcategory =
    selectedCategory && selectedCategory.id === "video-editing" ? subParam : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Escape closes whatever is topmost: project modal, then subcategory, then folder.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (selectedProject) {
        setSelectedProject(null);
      } else if (selectedSubcategory) {
        setSearchParams({ category: "video-editing" });
      } else if (selectedCategory) {
        setSearchParams({});
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject, selectedCategory, selectedSubcategory, setSearchParams]);

  const openFolder = useCallback(
    (category) => {
      if (animatingId) return;
      setAnimatingId(category.id);
      setTimeout(() => {
        setSearchParams({ category: category.id });
        setAnimatingId(null);
      }, FOLDER_OPEN_DELAY);
    },
    [animatingId, setSearchParams]
  );

  const closeFolder = useCallback(() => {
    setSearchParams({});
    setSelectedProject(null);
  }, [setSearchParams]);

  const handleSelectSubcategory = useCallback(
    (subId) => {
      if (subId) {
        setSearchParams({ category: "video-editing", sub: subId });
      } else {
        setSearchParams({ category: "video-editing" });
      }
    },
    [setSearchParams]
  );

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

        {selectedCategory && !selectedCategory.isVideoEditingSection && (
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
        ) : selectedCategory.isVideoEditingSection ? (
          selectedSubcategory === "personal" ? (
            <VideoGallery
              key="personal"
              categoryName="Personal Edits"
              categoryType="personal"
              videos={personalVideos}
              onBackToVideoEditing={() => handleSelectSubcategory(null)}
              onBackToProjects={closeFolder}
            />
          ) : selectedSubcategory === "client" ? (
            <VideoGallery
              key="client"
              categoryName="Client"
              categoryType="client"
              videos={clientVideos}
              onBackToVideoEditing={() => handleSelectSubcategory(null)}
              onBackToProjects={closeFolder}
            />
          ) : (
            <OthersFolders
              key="video-editing-folders"
              personalCount={personalVideos.length}
              clientCount={clientVideos.length}
              onSelectSubcategory={handleSelectSubcategory}
              onBackToProjects={closeFolder}
            />
          )
        ) : (
          <div className="folder-contents" key={selectedCategory.id}>
            <button type="button" className="back-btn" onClick={closeFolder}>
              <span className="arrow">←</span> Back to Projects
            </button>

            <div className="project-grid">
              {selectedCategory.projects && selectedCategory.projects.map((project, idx) => (
                <div
                  className="project-card"
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => openProject(project, e)}
                  onKeyDown={(e) => handleCardKeyDown(project, e)}
                >
                  <div className="thumb">
                    <img src={project.image} alt={project.name} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <p className="name">{project.name}</p>
                    <p className="desc">{project.description}</p>
                    {project.tech && project.tech.length > 0 && (
                      <div className="tech-row">
                        {project.tech.map((t) => (
                          <span className="tech-pill" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {(project.github || project.demo || project.notDeployed) && (
                      <div className="buttons">
                        {project.github && (
                          <button
                            type="button"
                            className="btn github"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.github, "_blank", "noopener,noreferrer");
                            }}
                          >
                            GitHub
                          </button>
                        )}
                        {project.notDeployed ? (
                          <button
                            type="button"
                            className="btn not-deployed"
                            disabled
                            onClick={(e) => e.stopPropagation()}
                            title="This project is not deployed"
                          >
                            This project is not deployed
                          </button>
                        ) : project.demo ? (
                          <button
                            type="button"
                            className="btn demo"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.demo !== "#") {
                                window.open(project.demo, "_blank", "noopener,noreferrer");
                              }
                            }}
                          >
                            Live Demo
                          </button>
                        ) : null}
                      </div>
                    )}
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
              {selectedProject.tech && selectedProject.tech.length > 0 && (
                <div className="tech-row">
                  {selectedProject.tech.map((t) => (
                    <span className="tech-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {(selectedProject.github || selectedProject.demo || selectedProject.notDeployed) && (
                <div className="buttons">
                  {selectedProject.github && (
                    <button
                      type="button"
                      className="btn github"
                      onClick={() =>
                        window.open(selectedProject.github, "_blank", "noopener,noreferrer")
                      }
                    >
                      GitHub
                    </button>
                  )}
                  {selectedProject.notDeployed ? (
                    <button
                      type="button"
                      className="btn not-deployed"
                      disabled
                      title="This project is not deployed"
                    >
                      This project is not deployed
                    </button>
                  ) : selectedProject.demo ? (
                    <button
                      type="button"
                      className="btn demo"
                      onClick={() => {
                        if (selectedProject.demo !== "#") {
                          window.open(selectedProject.demo, "_blank", "noopener,noreferrer");
                        }
                      }}
                    >
                      Live Demo
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Loader type="pacman" />
    </>
  );
};

export default Projects;