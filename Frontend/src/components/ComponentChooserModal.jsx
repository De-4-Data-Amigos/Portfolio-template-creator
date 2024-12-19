import React, { cloneElement } from 'react';

const ComponentChooserModal = ({ setShowModal, addComponent, component }) => {
  const handlePlacement = (location) => {
    addComponent(cloneElement(component, {"grid": location}), location);
    setShowModal(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Where do you want to place the component?</h2>
        <button onClick={() => handlePlacement('navbar')} className="modal-button">Navbar</button>
        <button onClick={() => handlePlacement('body')} className="modal-button">Body</button>
        <button onClick={() => handlePlacement('footer')} className="modal-button">Footer</button>
      </div>
    </div>
  );
};

export default ComponentChooserModal;
