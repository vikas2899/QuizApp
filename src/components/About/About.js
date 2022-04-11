import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./About.css";

const About = () => {
  const handleLinkedin = () => {
    window.open("https://www.linkedin.com/in/vikas-pandey-8a9349161");
  };

  return (
    <div className="about-container">
      <h2>Design and Developed by</h2>
      <br />
      <h4>Vikas Pandey</h4>
      <h4>vikas1pandey020@gmail.com</h4>
      <span className="about-icon" onClick={handleLinkedin}>
        <LinkedInIcon sx={{ color: "blue", fontSize: 40 }} />
      </span>
    </div>
  );
};

export default About;
