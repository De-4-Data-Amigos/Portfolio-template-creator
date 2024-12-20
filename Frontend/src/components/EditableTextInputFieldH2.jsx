import React from 'react';
import EditableTextInputField from './EditableTextInputField';

const EditableTextInputFieldH2 = ({ text, datapos }) => {
  return (
    <div style={{ margin: '8px 0' }} datapos={datapos}>
      <h2 style={{ fontSize: '1.5em', margin: 0 }}>
        <EditableTextInputField text={text}/>
      </h2>
    </div>
  );
};

export default EditableTextInputFieldH2;
