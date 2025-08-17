import React, { useEffect, useState } from "react";
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

const Projects = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
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
          url: "#",
          github: "https://github.com/yourusername/logo-design"
        },
        {
          name: "Branding Kit",
          description: "Full branding package.",
          summary:
            "Included typography, color palette, and mockups for social media branding.",
          image: brandingKit,
          url: "#",
          github: "https://github.com/yourusername/branding-kit"
        }
      ]
    },
    {
      name: "Full Stack Development",
      id: "full-stack",
      projects: [
        {
          name: "E-commerce Platform",
          description: "MERN stack with payments.",
          summary:
            "Developed a full-stack e-commerce site with cart, authentication, and Stripe payments.",
          image: ecommerceImg,
          url: "#",
          github: "https://github.com/yourusername/ecommerce"
        },
        {
          name: "Portfolio Website",
          description: "Personal portfolio site.",
          summary:
            "Built a responsive portfolio with animations using React and SCSS.",
          image: portfolioImg,
          url: "#",
          github: "https://github.com/yourusername/portfolio"
        }
      ]
    },
    {
      name: "Drone & Robotics",
      id: "drone-robotics",
      projects: [
        {
          name: "SkyGuard SE",
          description: "AI surveillance drone.",
          summary:
            "GPS-based drone with AI object tracking and obstacle avoidance.",
          image: skyguardImg,
          url: "#",
          github: "https://github.com/yourusername/skyguard"
        },
        {
          name: "Parcel Delivery Drone",
          description: "Autonomous delivery drone.",
          summary:
            "Integrated payload drop system and optimized delivery routes.",
          image: parcelDroneImg,
          url: "#",
          github: "https://github.com/yourusername/parcel-drone"
        }
      ]
    },
    {
      name: "AI & ML",
      id: "ai-ml",
      projects: [
        {
          name: "Pneumonia Detection",
          description: "X-ray image analysis.",
          summary:
            "CNN deep learning model for detecting pneumonia with 90%+ accuracy.",
          image: pneumoniaImg,
          url: "#",
          github: "https://github.com/yourusername/pneumonia-detection"
        },
        {
          name: "Road Accident Prevention",
          description: "AI safety system.",
          summary:
            "AI-powered accident prevention using real-time video analytics.",
          image: roadAccidentImg,
          url: "#",
          github: "https://github.com/yourusername/road-accident-ai"
        }
      ]
    },
    {
      name: "Video Editing",
      id: "video-editing",
      projects: [
        {
          name: "Travel Vlog Edit",
          description: "Cinematic travel vlog.",
          summary:
            "Edited footage with transitions, color grading, and music sync.",
          image: travelVlogImg,
          url: "#",
          github: "https://github.com/yourusername/travel-vlog"
        },
        {
          name: "Event Highlight Reel",
          description: "College event highlights.",
          summary:
            "Produced a dynamic highlights video for social media promotion.",
          image: eventReelImg,
          url: "#",
          github: "https://github.com/yourusername/event-reel"
        }
      ]
    }
  ];

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

        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="category-section">
            <h2 className="category-title">{cat.name}</h2>
            <div className="images-container">
              {cat.projects.map((project, idx) => (
                <div className="image-box" key={idx}>
                  <img
                    src={project.image}
                    className="project-image"
                    alt={project.name}
                  />
                  <div className="content">
                    <p className="title">{project.name}</p>
                    <h4 className="description">{project.description}</h4>
                    <p className="summary">{project.summary}</p>
                    <div className="buttons">
                      <button
                        className="btn view"
                        onClick={() => window.open(project.url)}
                      >
                        View
                      </button>
                      <button
                        className="btn github"
                        onClick={() => window.open(project.github)}
                      >
                        GitHub
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Projects;
