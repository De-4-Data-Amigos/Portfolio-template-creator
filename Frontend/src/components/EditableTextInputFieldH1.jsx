import React from 'react';
import EditableTextInputField from './EditableTextInputField';

const EditableTextInputFieldH1 = ({ text, datapos }) => {
  return (
    <div style={{ margin: '8px 0' }} datapos={datapos} >
      <h1 style={{ fontSize: '2em', margin: 0 }}>
        <EditableTextInputField text={text}/>
      </h1>
    </div>
  );
};

export default EditableTextInputFieldH1;
