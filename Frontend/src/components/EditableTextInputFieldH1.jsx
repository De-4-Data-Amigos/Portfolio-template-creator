import React from 'react';
import EditableTextInputField from './EditableTextInputField';

const EditableTextInputFieldH1 = ({ text, dataPos }) => {
  return (
    <div style={{ margin: '8px 0' }}>
      <h1 style={{ fontSize: '2em', margin: 0 }}>
        <EditableTextInputField text={text} dataPos={dataPos} />
      </h1>
    </div>
  );
};

export default EditableTextInputFieldH1;
