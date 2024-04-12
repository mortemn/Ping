// WebSocketProvider.jsx

import React, { useState, createContext } from 'react';

export const WebSocketContext = createContext({
  conn: null,
  setConn: () => {},
});

const WebSocketProvider = ({ children }) => {
  const [conn, setConn] = useState(null);

  return (
    <WebSocketContext.Provider value={{ conn, setConn }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
