import React, { useState } from 'react';

const EditableTextInputField = ({ children, grid, onUpdate, datapos}) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(children);
  const [text, setText] = useState(children);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSaveClick = () => {
    setIsEditing(false);
    setText(inputValue);
    onUpdate(inputValue, datapos, grid);
    //_text = inputValue;
    //children = inputValue;
  };

  const handleCancelClick = () => {
    setIsEditing(false); 
  };

  const handlePenClick = () => {
    setIsEditing(true);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} datapos={datapos}>
      {isEditing ? (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
            style={{ padding: '4px' }}
          />
          <button
            onClick={handleSaveClick}
            style={{
              cursor: 'pointer',
              fontFamily: 'JetBrainsMono',
              background: 'none',
              border: 'none',
              fontSize: '16px',
            }}
          >
            {'\uf0c7'} {/* Gem tekst ikon */}
          </button>
          <button
            onClick={handleCancelClick}
            style={{
              cursor: 'pointer',
              fontFamily: 'JetBrainsMono',
              background: 'none',
              border: 'none',
              fontSize: '16px',
            }}
          >
            {'\uf05c'} {/* Cancel input ikon */}
          </button>
        </div>
      ) : (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>{text}</span>
          <span
            style={{
              cursor: 'pointer',
              fontFamily: 'JetBrainsMono',
              marginLeft: '8px',
              fontSize: '16px',
            }}
            onClick={handlePenClick}
          >
            {'\udb81\udf76'} {/* Skriv heri ikon */}
          </span>
        </div>
      )}
    </div>
  );
};

{/* Add below in EditorPage.jsx, below {childrenArray} to test:
   <EditableTextInputField text="Test input if save" datapos= "0,0"/> */}

export default EditableTextInputField;
