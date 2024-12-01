import React, { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  // useEffect(() => {
  //   const videoElement = document.querySelector(".background-video");
  //   if (videoElement) {
  //     videoElement.playbackRate = 0.5; // Adjust the playback speed (e.g., 0.5 for slower playback)
  //   }
  // }, []);
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <video autoPlay loop muted className="background-video">
        <source src="/stars.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1>Find your next opportunity</h1>
        <div className="buttons">
          <button className="btn white-btn" onClick={() => navigate("/internships")}>New Grad →</button>
          <button className="btn black-btn">Internships →</button>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <p>stay in the loop</p>
          <p>Streaming to over 414470 members.</p>
        </div>
        <div className="email-subscription">
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
          />
          <button className="btn notify-btn">Notify me</button>
        </div>
        <p className="copyright">cvrve © 2024</p>
      </footer>
    </div>
  );
};

export default Homepage;