// AddPicture.jsx
import React, { useState } from 'react';
import '../assets/AddPicture.css';

const AddPicture = ({ addComponent, setShowModal }) => {
  const [url, setUrl] = useState('');

  const handleAddPicture = () => {
    if (url.trim()) {
      const imageComponent = (
        <div className="image-container">
          <img src={url} alt="Dynamic" />
        </div>
      );
      addComponent(imageComponent, "body");
      setUrl('');
      setShowModal(false);  // Luk modalen efter tilføjelsen
    } else {
      alert("Please enter a valid URL.");
    }
  };
  

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Picture</h2>
        <input
          type="text"
          placeholder="URL:"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <button onClick={handleAddPicture} className="save-btn">Add</button>
      </div>
    </div>
  );
};

export default AddPicture;
