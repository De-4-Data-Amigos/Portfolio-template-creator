// AddPicture.jsx
import React, { useState } from 'react';
import '../assets/AddPicture.css';

const AddPicture = ({ }) => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleAddPicture = () => {
    if (url.trim()) {

      setShowModal(false);
    } else {
      alert('Please enter a URL');
    }
  };
  

  return (
    <div>
        <div className="image-container" onClick={() => setShowModal(true)}>
          <img src={url} alt="Dynamic" />
        </div>
      {/* Modal */}
      {showModal && (
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
      )}
    </div>
  );
};

export default AddPicture;
