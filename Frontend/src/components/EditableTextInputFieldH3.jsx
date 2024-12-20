import React from 'react';
import EditableTextInputField from './EditableTextInputField';

const EditableTextInputFieldH3 = ({ text, datapos }) => {
  return (
    <div style={{ margin: '8px 0' }} datapos={datapos}>
      <h3 style={{ fontSize: '1.17em', margin: 0 }}>
        <EditableTextInputField text={text} />
      </h3>
    </div>
  );
};

export default EditableTextInputFieldH3;
