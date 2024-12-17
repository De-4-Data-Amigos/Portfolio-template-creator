import React, { useState } from 'react';
import "../assets/Toolbar.css";
import ChooseBackground from './ChooseBackground';
import EditableTextInputField from './EditableTextInputField';

const Toolbar = ({addComponent, onTextUpdate, children }) => {
  const [showChooseBackground, setShowChooseBackground] = useState(false);

  function addText() {
    let gridName = "body";
    addComponent(<EditableTextInputField text="Test input if save" grid={gridName} onUpdate={onTextUpdate}/>, gridName);
  }

  return (
    <div className="toolbar">
      <div style={{ display: 'flex', gap: '15px' }}>
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
