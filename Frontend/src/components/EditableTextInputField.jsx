import React, { useState } from 'react';

const EditableTextInputField = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInputValue(text); 
  };

  const handlePenClick = () => {
    setIsEditing(true);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} data-text={inputValue}>
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
          <span>{inputValue}</span>
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
   <EditableTextInputField text="Test input if save" data-pos= "0,0"/> */}

export default EditableTextInputField;
