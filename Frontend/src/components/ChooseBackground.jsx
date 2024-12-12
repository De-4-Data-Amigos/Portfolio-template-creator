import React, { useState } from 'react';
import '../assets/ChooseBackground.css';
// https://wallpapercave.com/developer-wallpapers
import background1 from '../assets/backgrounds/background1.jpg';
// https://www.reddit.com/r/wallpapers/comments/bya50d/made_a_minimalistic_apple_developer_wallpaper/
import background2 from '../assets/backgrounds/background2.jpg';
// https://wallpapersden.com/developer-minimal-wallpaper/
import background3 from '../assets/backgrounds/background3.jpg';
// https://wallpapers.com/background/professional-web-developer-working-on-a-code-setup-j8ljvi05wloqs3ii.html
import background4 from '../assets/backgrounds/background4.jpg';
// https://wallpapercave.com/software-developer-wallpapers
import background5 from '../assets/backgrounds/background5.jpg';
// https://www.deviantart.com/mitra98up/art/Programmer-Wallpaper-844367238
import background6 from '../assets/backgrounds/background6.jpg';
// https://www.reddit.com/r/wallpaper/comments/21d8wm/web_developer_wallpaper_1920x1080/
import background7 from '../assets/backgrounds/background7.jpg';
// https://wallpapercave.com/web-developer-wallpapers
import background8 from '../assets/backgrounds/background8.jpg';
// https://wallpapercave.com/software-developer-wallpapers
import background9 from '../assets/backgrounds/background9.jpg';
// https://www.goodfon.com/minimalism/wallpaper-kod-kodirovanie-programmirovanie-chernyi-fon-minimalizm.html
import background10 from '../assets/backgrounds/background10.jpg';

const images = [
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7,
  background8,
  background9,
  background10,
];

function ChooseBackground({ setShowModal }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [customColor, setCustomColor] = useState('#ffffff');
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  const imagesPerPage = 3;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handleBackgroundChange = (image) => {
    setSelectedImage(image);
    document.body.style.backgroundImage = `url(${image})`;
    document.body.style.backgroundColor = '';
  };

  const handleColorChange = (color) => {
    setCustomColor(color);
    setSelectedImage(null);
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = color;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setGradientPosition({ x, y });
  };

  const handleSave = () => {
    setShowModal(false);  // Close the modal when the save button is clicked
  };

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div
        className="modal-content"
        onMouseMove={handleMouseMove}
        onClick={(e) => e.stopPropagation()}  // Prevents clicks inside the modal from closing it
        style={{
          background: `radial-gradient(ellipse at ${gradientPosition.x}% ${gradientPosition.y}%, #e0e0e0, #6e6e6e)`,
        }}
      >
        <h2>Choose a background</h2>
        <div className="image-grid">
          {images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage).map((image, index) => (
            <div
              key={index}
              className={`image-option ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => handleBackgroundChange(image)}
            >
              <img src={image} alt={`Background ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 0} className="pagination-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 74 74"
              height="34"
              width="34"
            >
              <circle strokeWidth="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
              <path
                fill="white"
                d="M49 35.5C49.8284 35.5 50.5 36.1716 50.5 37C50.5 37.8284 49.8284 38.5 49 38.5V35.5ZM24.9393 38.0607C24.3536 37.4749 24.3536 36.5251 24.9393 35.9393L34.4853 26.3934C35.0711 25.8076 36.0208 25.8076 36.6066 26.3934C37.1924 26.9792 37.1924 27.9289 36.6066 28.5147L28.1213 37L36.6066 45.4853C37.1924 46.0711 37.1924 47.0208 36.6066 47.6066C36.0208 48.1924 35.0711 48.1924 34.4853 47.6066L24.9393 38.0607ZM49 38.5L26 38.5V35.5L49 35.5V38.5Z"
              ></path>
            </svg>
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="pagination-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 74 74"
              height="34"
              width="34"
            >
              <circle strokeWidth="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
              <path
                fill="white"
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="color-picker">
          <label htmlFor="color-input">Or choose a color:</label>
          <input
            type="color"
            id="color-input"
            value={customColor}
            onChange={handleColorChange}
          />
        </div>
        <button onClick={handleSave} className="save-btn">Save</button>
      </div>
    </div>
  );
}

export default ChooseBackground;