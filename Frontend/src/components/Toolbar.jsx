import React, { useState } from "react";
import "../assets/Toolbar.css";

const Toolbar = () => {
  const [selected, setSelected] = useState("DRIVE");

  const handleSelection = (mode) => {
    setSelected(mode);
  };

  return (
    <div className="toolbar-container">
      <div
        className={`toolbar-option ${selected === "WALK" ? "selected" : ""}`}
        onClick={() => handleSelection("WALK")}
      >
        <div className="toolbar-icon">🚶‍♂️</div>
        <div className="toolbar-label">WALK</div>
      </div>
      <div
        className={`toolbar-option ${selected === "BIKE" ? "selected" : ""}`}
        onClick={() => handleSelection("BIKE")}
      >
        <div className="toolbar-icon">🚴‍♂️</div>
        <div className="toolbar-label">BIKE</div>
      </div>
      <div
        className={`toolbar-option ${selected === "DRIVE" ? "selected" : ""}`}
        onClick={() => handleSelection("DRIVE")}
      >
        <div className="toolbar-icon">🚗</div>
        <div className="toolbar-label">DRIVE</div>
      </div>
    </div>
  );
};

export default Toolbar;
