import React from "react";
import "./Modal.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

const Modal = ({ image, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <span className="close-btn" onClick={handleClose}>
          &times;
        </span>

        {/* Carousel for Images */}
        <Carousel
          showThumbs={false}
          infiniteLoop
          showStatus={false}
          className="carousel-container"
        >
          {imageData.map((image) => (
            <div key={image.id} className="carousel-slide">
              <img
                src={image.url}
                alt={image.name}
                className="carousel-image"
              />
              <h3>{image.name}</h3>
            </div>
          ))}
        </Carousel>

        {/* Image Details */}
        <h3>
          <strong>Name:</strong> {image.name}
        </h3>
        <p>
          <strong>Description:</strong> {image.description}
        </p>
        <p>
          <strong>Benefits:</strong> {image.benefits}
        </p>
        <p>
          <strong>Posture:</strong> {image.posture}
        </p>
        <p>
          <strong>Difficulty:</strong> {image.difficulty}
        </p>
        <p>
          <strong>Duration:</strong> {image.duration}
        </p>
        <p>
          <strong>Steps to do:</strong>
        </p>
        <ul className="steps-list">
          {image.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
