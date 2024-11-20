//Kan slettes, brugte bare til test af knapper
import React from 'react';

const ButtonRow = () => {
  const buttonStyle = {
    display: 'inline-block',
    backgroundColor: '#333', // Sort/grå
    color: '#fff', // Hvid tekst
    padding: '30px 60px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px', // Kan fjernes for at holde dem helt firkantede
    cursor: 'pointer',
    textAlign: 'center',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <button style={buttonStyle}>Personal Trainer</button>
      <button style={buttonStyle}>Medical Staff</button>
      <button style={buttonStyle}>Developer</button>
    </div>
  );
};

export default ButtonRow;
