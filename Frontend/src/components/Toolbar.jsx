import React, { useState } from 'react';
import "../assets/Toolbar.css";
import ChooseBackground from './ChooseBackground';
import EditableTextInputField from './EditableTextInputField';
import AddPicture from './AddPicture';
import ComponentChooserModal from './ComponentChooserModal';


function Toolbar({addComponent, onTextUpdate, children }){
  const [showChooseBackground, setShowChooseBackground] = useState(false);
  const [showComponentChooser, setShowComponentChooser] = useState(false);
  const [componentToAdd, setComponentToAdd] = useState(null);

  const addText = () => {
    const textComponent = <EditableTextInputField onUpdate={onTextUpdate}>New Text</EditableTextInputField>;
    setComponentToAdd(textComponent);
    setShowComponentChooser(true);
  };

  const addPicture = () => {
    setShowComponentChooser(true);
    setComponentToAdd(<AddPicture addComponent={addComponent} setShowModal={setShowComponentChooser} />);
  };

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
        <div className="toolbar-item" onClick={addPicture}>  
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
      {showComponentChooser && <ComponentChooserModal setShowModal={setShowComponentChooser} addComponent={addComponent} component={componentToAdd} />}
    </div>
  );
};

export default Toolbar;
