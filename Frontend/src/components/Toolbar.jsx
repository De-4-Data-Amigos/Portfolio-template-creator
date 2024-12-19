import React, { useState } from 'react';
import "../assets/Toolbar.css";
import ChooseBackground from './ChooseBackground';
import EditableTextInputField from './EditableTextInputField';
import AddPicture from './AddPicture';
import ComponentChooserModal from './ComponentChooserModal';

const Toolbar = ({ addComponent, children }) => {
  const [showChooseBackground, setShowChooseBackground] = useState(false);
  const [showComponentChooser, setShowComponentChooser] = useState(false);
  const [componentToAdd, setComponentToAdd] = useState(null);

  const addText = () => {
    const textComponent = <EditableTextInputField text="New Text"/>;
    setComponentToAdd(textComponent);
    setShowComponentChooser(true);
  };

  const addPicture = () => {
    setShowComponentChooser(true);
    setComponentToAdd(<AddPicture addComponent={addComponent} setShowModal={setShowComponentChooser} />);
  };

  return (
    <div className="toolbar">
      <div style={{ display: 'flex', gap: '15px' }}>
        <div className="toolbar-item" onClick={addText}>
          <div className="toolbar-icon">T</div>
          <div className="toolbar-label">Text</div>
        </div>
        <div className="toolbar-item" onClick={addPicture}>  
          <div className="toolbar-icon">🖼️</div>
          <div className="toolbar-label">Picture</div>
        </div>
        <div className="toolbar-item" onClick={() => setShowChooseBackground(true)}>
          <div className="toolbar-icon">🎨</div>
          <div className="toolbar-label">Background</div>
        </div>
      </div>
      {showChooseBackground && <ChooseBackground setShowModal={setShowChooseBackground} />}
      {showComponentChooser && <ComponentChooserModal setShowModal={setShowComponentChooser} addComponent={addComponent} component={componentToAdd} />}
      <div> 
        {children}
      </div>
    </div>
  );
};

export default Toolbar;
