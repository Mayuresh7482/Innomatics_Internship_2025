import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
      navigate("/yoga-poses");
  };
  return (
    <>
      <div className="landing-page ">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Yoga Santuary</h1>
            <p>
              Emrace balance,Strength, and inner peace on your transformative
              Yoga journey
            </p>
          </div>
          <button className="cta-button1" onClick={() => handleButtonClick()}>
            Explore Inner Peace
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
