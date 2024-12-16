import React from 'react';
import EditableTextInputField from './EditableTextInputField';

const EditableTextInputFieldH3 = ({ text, dataPos }) => {
  return (
    <div style={{ margin: '8px 0' }}>
      <h3 style={{ fontSize: '1.17em', margin: 0 }}>
        <EditableTextInputField text={text} dataPos={dataPos} />
      </h3>
    </div>
  );
};

export default EditableTextInputFieldH3;
