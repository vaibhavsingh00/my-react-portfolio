import React, { useEffect, useState } from "react";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

import htmlImg from "../../assets/images/logo1.png";
import cssImg from "../../assets/images/logo2.png";
import jsImg from "../../assets/images/logo3.png";
import reactImg from "../../assets/images/react.png";
import pythonImg from "../../assets/images/python.png";
import AdobeImg from "../../assets/images/adobe 1.png";
import AdobeImge from "../../assets/images/adobe 2.png";
import canva from "../../assets/images/canva.png";
import java from "../../assets/images/java.png";

const skillsData = [
  { name: "HTML", image: htmlImg },
  { name: "CSS", image: cssImg },
  { name: "JavaScript", image: jsImg },
  { name: "React", image: reactImg },
  { name: "Python", image: pythonImg },
  { name: "Adobe Illustrator", image: AdobeImg },
  { name: "Adobe Premiere Pro", image: AdobeImge },
  { name: "Canva", image: canva },
  { name: "Java", image: java },
];

const Skills = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* LEFT: your existing skills block (unchanged structure) */}
      <div className="skills-section">
        <h2 className="skills-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Skills".split("")}
            idx={15}
          />
        </h2>

        <div className="skills-container">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card">
              <img src={skill.image} alt={skill.name} className="skill-image" />
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: 3D model (iframe embed, transparent bg) */}
      <div className="skills-3d">
        <iframe
          className="spline-embed"
          title="skills-3d"
          src="https://my.spline.design/reactiveorb-VNCIM96gy8WbtQ0PwdJHqaiJ/"
          frameBorder="0"
          width="100%" 
          height="600px"
          allow="autoplay; fullscreen"
          loading="eager"
        />
      </div>
    </>
  );
};

export default Skills;
