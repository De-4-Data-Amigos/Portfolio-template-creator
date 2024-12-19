import React, { useState } from 'react';
import "../assets/Toolbar.css";
import ChooseBackground from './ChooseBackground';
import EditableTextInputField from './EditableTextInputField';
import AddPicture from './AddPicture';

const Toolbar = ({ addComponent, children }) => {
  const [showChooseBackground, setShowChooseBackground] = useState(false);
  const [showAddPicture, setShowAddPicture] = useState(false);  // Tilføj en state for at vise/hide AddPicture modal

  function addText() {
    let gridName = "body";
    addComponent(<EditableTextInputField text="Test input if save"/>, gridName);
  }

  return (
    <div className="toolbar">
      <div style={{ display: 'flex', gap: '15px' }}>
        <div className="toolbar-item" onClick={addText}>
          <div className="toolbar-icon">T</div>
          <div className="toolbar-label">Text</div>
        </div>
        <div className="toolbar-item" onClick={() => setShowAddPicture(true)}>  
          <div className="toolbar-icon">🖼️</div>
          <div className="toolbar-label">Picture</div>
        </div>
        <div className="toolbar-item" onClick={() => setShowChooseBackground(true)}>
          <div className="toolbar-icon">🎨</div>
          <div className="toolbar-label">Background</div>
        </div>
      </div>
      {showChooseBackground && <ChooseBackground setShowModal={setShowChooseBackground} />}
      {showAddPicture && <AddPicture addComponent={addComponent} setShowModal={setShowAddPicture} />} 
      <div> 
        {children}
      </div>
    </div>
  );
};

export default Toolbar;
