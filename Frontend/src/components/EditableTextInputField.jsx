import React, { useState } from 'react';

const EditableTextInputField = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedText, setSavedText] = useState(text);
  const [inputValue, setInputValue] = useState(text);

  const handlePenClick = () => setIsEditing(true);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSaveClick = () => {
    setSavedText(inputValue);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setInputValue(savedText);
    setIsEditing(false);
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
          />
          <button onClick={handleSaveClick}>💾</button>
          <button onClick={handleCancelClick}>❌</button>
        </>
      ) : (
        <>
          <span>{savedText}</span>
          <span 
            style={{ cursor: 'pointer', fontFamily: 'JetBrainsMono', marginLeft: '8px' }}
            onClick={handlePenClick}
          >
            
            {'\udb81\udf76'} 
          </span>
        </>
      )}
    </span>
  );
};

export default EditableTextInputField;
