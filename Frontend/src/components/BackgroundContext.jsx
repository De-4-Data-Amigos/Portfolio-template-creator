// backgroundContext.js
import React, { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext();

export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState({ type: 'color', value: '#ffffff' });

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};


export default BackgroundContext;