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

import skill1 from "../../assets/images/1.png";
import skill2 from "../../assets/images/2.png";
import skill3 from "../../assets/images/3.png";
import skill4 from "../../assets/images/4.png";
import skill5 from "../../assets/images/5.png";
import skill6 from "../../assets/images/6.png";
import skill7 from "../../assets/images/7.png";

const skillsData = [
  { name: "HTML", image: htmlImg },
  { name: "CSS", image: cssImg },
  { name: "JavaScript", image: jsImg },
  { name: "React", image: reactImg },
  { name: "Python", image: pythonImg },
  { name: "Java", image: java },
  { name: "MongoDB", image: skill6 },
  { name: "GitHub", image: skill1 },
  { name: "Linux", image: skill5 },
  { name: "Adobe Photoshop", image: skill3 },
  { name: "Adobe Illustrator", image: AdobeImg },
  { name: "Adobe Premiere Pro", image: AdobeImge },
  { name: "CapCut", image: skill2 },
  { name: "Canva", image: canva },
  { name: "ChatGPT", image: skill4 },
  { name: "Claude AI", image: skill7 },
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
    <div className="skills-page">

      {/* LEFT / TOP: Skills */}
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
              <img
                src={skill.image}
                alt={skill.name}
                className="skill-image"
              />

              <p className="skill-name">
                {skill.name}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT / BOTTOM: 3D */}
      <div className="skills-3d">

        <iframe
          className="spline-embed"
          title="skills-3d"
          src="https://my.spline.design/reactiveorb-VNCIM96gy8WbtQ0PwdJHqaiJ/"
          frameBorder="0"
          width="100%"
          height="100%"
          allow="autoplay; fullscreen"
          loading="eager"
        />

      </div>

    </div>
  );
};

export default Skills;