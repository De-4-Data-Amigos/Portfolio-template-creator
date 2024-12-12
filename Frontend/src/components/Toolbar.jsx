import React, { useState } from "react";
import "../assets/Toolbar.css";

const Toolbar = ({ addText, openChooseBackground }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-item" onClick={addText}>
        <div className="toolbar-icon">T</div>
        <div className="toolbar-label">Text</div>
      </div>
      <div className="toolbar-item" onClick={() => alert("Picture functionality not implemented yet!")}>
        <div className="toolbar-icon">🖼️</div>
        <div className="toolbar-label">Picture</div>
      </div>
      <div className="toolbar-item" onClick={openChooseBackground}>
        <div className="toolbar-icon">🎨</div>
        <div className="toolbar-label">Background</div>
      </div>
    </div>
  );
};

export default Toolbar;