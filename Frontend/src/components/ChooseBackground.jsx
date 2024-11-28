import React, { useState } from 'react';
import '../assets/ChooseBackground.css'; // Tilføj din styling her

const images = [
  'background1.jpg',
  'background2.jpg',
  'background3.jpg',
    'background4.jpg',
    'background5.jpg',
    'background6.jpg',
    'background7.jpg',
    'background8.jpg',
    'background9.jpg',
    'background10.jpg',
  // Tilføj flere baggrundsbilleder efter behov
];

function ChooseBackground() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleBackgroundChange = (image) => {
    setSelectedImage(image);
    document.body.style.backgroundImage = `url(${image})`; // Opdaterer baggrunden
  };

  return (
    <div className="choose-background">
      <button onClick={() => setShowModal(true)} className="choose-btn">
        Vælg baggrund
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Vælg en baggrund</h2>
            <div className="image-grid">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`image-option ${
                    selectedImage === image ? 'selected' : ''
                  }`}
                  onClick={() => handleBackgroundChange(image)}
                >
                  <img src={image} alt={`Background ${index + 1}`} />
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(false)} className="save-btn">
              Gem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChooseBackground;
