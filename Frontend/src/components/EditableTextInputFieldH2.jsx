import React from 'react';
import EditableTextInputField from './EditableTextInputField';

const EditableTextInputFieldH2 = ({ text, dataPos }) => {
  return (
    <div style={{ margin: '8px 0' }}>
      <h2 style={{ fontSize: '1.5em', margin: 0 }}>
        <EditableTextInputField text={text} dataPos={dataPos} />
      </h2>
    </div>
  );
};

export default EditableTextInputFieldH2;
