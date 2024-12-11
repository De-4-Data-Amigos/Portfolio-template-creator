import React, { useState } from 'react';

const EditableTextInputField = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedText, setSavedText] = useState(initialText);

  const handleTextClick = () => setIsEditing(true);

  const handleInputChange = (e) => setSavedText(e.target.value);

  const handleInputBlur = () => setIsEditing(false);

  const penIcon = <span style={{ marginLeft: '8px', cursor: 'pointer' }}>✏️</span>; // Example edit icon

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {isEditing ? (
        <input
          type="text"
          value={savedText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <>
          <span onClick={handleTextClick} style={{ cursor: 'pointer' }}>
            {savedText}
          </span>
          <span onClick={handleTextClick}>{penIcon}</span>
        </>
      )}
    </span>
  );
};

export default EditableTextInputField;
