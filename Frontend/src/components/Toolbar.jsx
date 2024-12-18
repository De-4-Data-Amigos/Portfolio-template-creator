import React, { useState } from 'react';
import "../assets/Toolbar.css";
import ChooseBackground from './ChooseBackground';
import EditableTextInputField from './EditableTextInputField';

function Toolbar({addComponent, onTextUpdate, children }){
  const [showChooseBackground, setShowChooseBackground] = useState(false);

  function addText() {
    let gridName = "body";
    addComponent(<EditableTextInputField grid={gridName} onUpdate={onTextUpdate}>Test input if save</EditableTextInputField>, gridName);
  }
  const mapped = React.Children.map(children,(child, index) => {
    let classes = "";
    if(child.type.name != "GridDeleteZone" && child.type.name != "RestoreState"){
      classes ="toolbar-item";
    }
    return (<div className={classes} key={index}>{child}</div>)
  });  
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
        {mapped}
      </div>
      {showChooseBackground && <ChooseBackground setShowModal={setShowChooseBackground} />}
    </div>
  );
};

export default Toolbar;
