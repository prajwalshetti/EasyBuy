// websocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    let reconnectTimeout;

    const connectWebSocket = () => {
      // Use the specific WebSocket path
      const socket = new WebSocket('ws://localhost:8000/ws');
      
      socket.onopen = () => {
        console.log('WebSocket Connected Successfully');
        setWs(socket);
        setIsConnected(true);
        reconnectAttempts = 0;

        // Keep the connection alive with ping/pong
        const pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000); // Send ping every 30 seconds

        // Clean up interval on socket close
        socket.addEventListener('close', () => clearInterval(pingInterval));
      };
      
      socket.onclose = (event) => {
        console.log('WebSocket Disconnected:', event.code, event.reason);
        setWs(null);
        setIsConnected(false);
        
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(`Attempting to reconnect... (${reconnectAttempts}/${maxReconnectAttempts})`);
          reconnectTimeout = setTimeout(connectWebSocket, 3000);
        }
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received message:', data);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      return socket;
    };

    const socket = connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (ws && isConnected) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  };
  
  return (
    <WebSocketContext.Provider value={{ ws, isConnected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);