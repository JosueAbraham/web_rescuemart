import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  margin-top: 10px;

  input {
    flex: 1;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:last-child {
    background-color: #e74c3c;
    margin-left: 8px;
  }
`;

const ChatControls = ({ newMessage, setNewMessage, handleSendMessage, handleClearChat }) => {
  return (
    <ControlsContainer>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={handleSendMessage}>Enviar</button>
      <button onClick={handleClearChat}>Borrar todo</button>
    </ControlsContainer>
  );
};

export default ChatControls;
