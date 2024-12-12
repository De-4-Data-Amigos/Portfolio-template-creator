import React, { useState } from 'react';
import "../assets/Toolbar.css";
import ChooseBackground from './ChooseBackground';

const Toolbar = ({ addText, children }) => {
  const [showChooseBackground, setShowChooseBackground] = useState(false);

  return (
    <div className="toolbar">
      <div style={{ display: 'flex', gap: '15px' }}> {/* Grupperer standard ikoner */}
        <div className="toolbar-item" onClick={addText}>
          <div className="toolbar-icon">T</div>
          <div className="toolbar-label">Text</div>
        </div>
        <div className="toolbar-item" onClick={() => alert("Picture functionality not implemented yet!")}>
          <div className="toolbar-icon">🖼️</div>
          <div className="toolbar-label">Picture</div>
        </div>
        <div className="toolbar-item" onClick={() => setShowChooseBackground(true)}>
          <div className="toolbar-icon">🎨</div>
          <div className="toolbar-label">Background</div>
        </div>
      </div>
      {showChooseBackground && <ChooseBackground setShowModal={setShowChooseBackground} />}
      <div> 
        {children}
      </div>
    </div>
  );
};

export default Toolbar;
