import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter";
import "./Gallery.css";
import images from "../../Data/ImageData";
import Modal from "../../components/Modal/Modal";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("user"));
      if (!storedData) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleViewChange = (Mode) => {
    setViewMode(Mode);
  };
  return (
    <>
      <div className="gallery-container">
        <h1 className="imageGallery_heading">Yoga Gallery</h1>

        {/* Category Filter */}
        <div className="filter-section">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="viewSwitcher">
          <button onClick={() => handleViewChange("grid")}>Grid View</button>
          <button onClick={() => handleViewChange("carousel")}>
            Carousel View
          </button>
          <button onClick={() => handleViewChange("list")}>List View</button>
        </div>

        {/* Grid Container */}
        {viewMode === "grid" && (
          <div className="gridContainer">
            {filteredImages.map((image) => (
              <div
                className="gridItem"
                onClick={() => handleImageClick(image)}
                key={image.image_id}
              >
                <img src={image.url} alt={image.name} />
              </div>
            ))}
          </div>
        )}

        {/* Carousel Container */}
        {viewMode === "carousel" && (
          <div className="carouselContainer">
            {filteredImages.map((image) => (
              <div
                className="carouselItem"
                onClick={() => handleImageClick(image)}
                key={image.image_id}
              >
                <img src={image.url} alt={image.name} />
              </div>
            ))}
          </div>
        )}

        {/* List Container */}
        {viewMode === "list" && (
          <div className="listContainer">
            {filteredImages.map((image) => (
              <div
                className="listItem"
                onClick={() => handleImageClick(image)}
                key={image.image_id}
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div className="listItemContent">
                  <h3>{image.name}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Image Details */}
        {selectedImage && <Modal image={selectedImage} onClose={handleClose} />}
      </div>
    </>
  );
};

export default Gallery;
